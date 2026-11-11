import { Application, Request, Response } from 'express';
import { ProjectState } from '../src/types/project.js';
import {
  compileSpecMd,
  compilePlanMd,
  compileTasksMd,
  compileAgentsMd,
  interpolateVariables,
} from '../src/services/compiler.js';

interface ValidationWarning {
  code: string;
  field: string;
  message: string;
}

interface ValidationResult {
  valid: boolean;
  score: number;
  warnings: ValidationWarning[];
}

// Advance past each closing brace (or the end) once, even for malformed openers.
export function findUnresolvedTokens(text: string): string[] {
  const tokens: string[] = [];
  let cursor = 0;
  while (cursor < text.length) {
    const start = text.indexOf('{{', cursor);
    if (start === -1) break;
    const end = text.indexOf('}', start + 2);
    if (end === -1) break;
    if (end > start + 2 && text[end + 1] === '}') {
      tokens.push(text.slice(start + 2, end).trim());
      cursor = end + 2;
    } else {
      cursor = end + 1;
    }
  }
  return tokens;
}

type JsonObject = Record<string, unknown>;
const isObject = (value: unknown): value is JsonObject =>
  value !== null && typeof value === 'object' && !Array.isArray(value);
const isString = (value: unknown) => typeof value === 'string';
const isBoolean = (value: unknown) => typeof value === 'boolean';
const isStringArray = (value: unknown) => Array.isArray(value) && value.every(isString);

function optionalFields(object: JsonObject, fields: string[], check: (value: unknown) => boolean): boolean {
  return fields.every(key => !(key in object) || check(object[key]));
}

// Missing fields remain eligible for completeness warnings; present fields must be safe to consume.
function isValidationPayload(value: unknown): value is Partial<ProjectState> {
  if (!isObject(value) || Object.keys(value).length === 0) return false;
  if (!optionalFields(value, ['appName', 'coreIdea', 'tagline', 'targetPlatform', 'codingLanguage', 'codingLanguageNote'], isString)
    || !optionalFields(value, ['features'], isStringArray)) return false;
  if ('groundRules' in value && (!isObject(value.groundRules)
    || !optionalFields(value.groundRules, ['offlineFirst', 'highPerformance', 'localPrivacy', 'darkModeDefault'], isBoolean))) return false;
  if ('workflowProgress' in value && (!isObject(value.workflowProgress)
    || !optionalFields(value.workflowProgress, ['stitchDone', 'builderDone', 'polishDone'], isBoolean))) return false;
  if ('stitchUi' in value && (!isObject(value.stitchUi)
    || !optionalFields(value.stitchUi, ['visualDirection', 'uploadedResultName'], isString))) return false;
  if ('proConfig' in value) {
    const config = value.proConfig;
    if (!isObject(config)
      || !optionalFields(config, ['stackSummary', 'architectureStyle', 'testingStrategy', 'securityBoundary', 'taskSlicingMode'], isString)
      || !optionalFields(config, ['customRules'], isStringArray)
      || !optionalFields(config, ['templateVariables'], vars => isObject(vars) && Object.values(vars).every(isString))) return false;
  }
  if ('clarifications' in value && (!Array.isArray(value.clarifications)
    || !value.clarifications.every(item => isObject(item)
      && ['id', 'category', 'question'].every(key => isString(item[key]))
      && isStringArray(item.options)
      && optionalFields(item, ['selectedAnswer'], isString)))) return false;
  return true;
}

export function registerSpecValidateRoute(app: Application) {
  app.post('/api/specs/validate', (req: Request, res: Response) => {
    if (!isValidationPayload(req.body)) {
      return res.status(400).json({ error: 'Invalid or missing JSON payload' });
    }

    const state = req.body;
    const warnings: ValidationWarning[] = [];

    if (!state.appName || state.appName.trim() === '' || state.appName === 'My Awesome App') {
      warnings.push({ code: 'MISSING_APP_NAME', field: 'appName', message: 'App name is missing or placeholder.' });
    }

    if (!state.coreIdea || state.coreIdea.trim() === '') {
      warnings.push({ code: 'MISSING_CORE_IDEA', field: 'coreIdea', message: 'Core idea is missing.' });
    }

    if (!state.features || state.features.length === 0 || state.features.every(f => !f || f.trim() === '')) {
      warnings.push({ code: 'EMPTY_FEATURES', field: 'features', message: 'Features list is empty.' });
    }

    // Workflow Stitch check
    const workflow = state.workflowProgress || { stitchDone: false, builderDone: false, polishDone: false };
    if (!workflow.stitchDone) {
      const hasStitchUi = state.stitchUi && (state.stitchUi.visualDirection || state.stitchUi.uploadedResultName);
      if (!hasStitchUi) {
        warnings.push({
          code: 'MISSING_STITCH_UI',
          field: 'stitchUi',
          message: 'Missing visual direction or uploaded Stitch result for incomplete stitch workflow.'
        });
      }
    }

    // Token check
    const templateVars = state.proConfig?.templateVariables || {};
    const unresolvedTokens = new Set<string>();

    const checkTokens = (text: string) => {
      findUnresolvedTokens(text).forEach(t => unresolvedTokens.add(t));
    };

    if (state.coreIdea) checkTokens(interpolateVariables(state.coreIdea, templateVars));
    if (state.proConfig?.customRules) {
      state.proConfig.customRules.forEach(rule => checkTokens(interpolateVariables(rule, templateVars)));
    }

    // Note: We need a somewhat valid state to compile, compiler expects certain fields
    if (state.appName && state.coreIdea && state.targetPlatform && state.proConfig && state.groundRules) {
      try {
        const fullState = state as ProjectState;
        checkTokens(compileSpecMd(fullState));
        checkTokens(compilePlanMd(fullState));
        checkTokens(compileTasksMd(fullState));
        checkTokens(compileAgentsMd(fullState));
      } catch (e) {
        warnings.push({ code: 'COMPILATION_ERROR', field: 'markdown', message: 'Failed to compile markdown for token check.' });
      }
    }

    if (unresolvedTokens.size > 0) {
      warnings.push({
        code: 'UNRESOLVED_TOKENS',
        field: 'templateVariables',
        message: `Found unresolved tokens: ${Array.from(unresolvedTokens).join(', ')}`
      });
    }

    const score = Math.max(0, 100 - (warnings.length * 15));
    const valid = score > 50 && warnings.filter(w => w.code === 'MISSING_APP_NAME' || w.code === 'MISSING_CORE_IDEA').length === 0;

    const result: ValidationResult = {
      valid,
      score,
      warnings
    };

    res.status(200).json(result);
  });
}
