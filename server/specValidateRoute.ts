import { Application, Request, Response } from 'express';
import { ProjectState } from '../src/types/project.js';
import {
  compileSpecMd,
  compilePlanMd,
  compileTasksMd,
  compileAgentsMd,
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

function findUnresolvedTokens(text: string, templateVariables: Record<string, string> = {}): string[] {
  const tokens = text.match(/\{\{([^}]+)\}\}/g) || [];
  return tokens
    .map(t => t.slice(2, -2).trim())
    .filter(t => t in templateVariables);
}

export function registerSpecValidateRoute(app: Application) {
  app.post('/api/specs/validate', (req: Request, res: Response) => {
    if (!req.body || typeof req.body !== 'object' || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'Invalid or missing JSON payload' });
    }

    const state = req.body as Partial<ProjectState>;
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
    let unresolvedTokens = new Set<string>();

    const checkTokens = (text: string) => {
      findUnresolvedTokens(text, templateVars).forEach(t => unresolvedTokens.add(t));
    };

    if (state.coreIdea) checkTokens(state.coreIdea);
    if (state.proConfig?.customRules) {
      state.proConfig.customRules.forEach(rule => checkTokens(rule));
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
