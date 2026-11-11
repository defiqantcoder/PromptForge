import { securityHeadersMiddleware, createRateLimiter, localOriginGuard } from './server/security.js';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'node:fs';
import path from 'path';
import crypto from 'node:crypto';
import dotenv from 'dotenv';
import { GoogleGenAI, ThinkingLevel, Type, type GenerateContentParameters } from '@google/genai';
import { fileURLToPath } from 'url';
import { registerSpecValidateRoute } from './server/specValidateRoute.js';
import { registerArchiveRoutes } from './server/archiveRoute.ts';

dotenv.config();

const PORT = 3000;

const ALLOWED_AI_MODELS = new Set([
  'gemini-3.5-flash-lite',
  'gemini-3.6-flash',
  'gemini-3.8-flash',
  'gemini-3.1-pro-preview',
  'gemini-4-argon',
]);

/**
 * Resolves a validated Gemini model ID and low-latency thinkingConfig from the request body.
 */
function resolveAiModelConfig(reqBody: Record<string, unknown> | undefined) {
  const nestedContext =
    reqBody?.context && typeof reqBody.context === 'object'
      ? (reqBody.context as Record<string, unknown>)
      : undefined;
  const candidate =
    typeof reqBody?.aiModel === 'string'
      ? reqBody.aiModel
      : typeof nestedContext?.aiModel === 'string'
      ? (nestedContext.aiModel as string)
      : 'gemini-3.8-flash';
  const model = ALLOWED_AI_MODELS.has(candidate) ? candidate : 'gemini-3.8-flash';
  const thinkingLevel =
    model === 'gemini-3.5-flash-lite' ? ThinkingLevel.MINIMAL : ThinkingLevel.LOW;
  return { model, thinkingConfig: { thinkingLevel } };
}

/**
 * Initializes and returns a GoogleGenAI client instance with the configured API key.
 */
function getAiClient(): GoogleGenAI {
  return new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

/**
 * Checks if the Gemini API key is configured and valid.
 */
function isGeminiConfigured(): boolean {
  const key = process.env.GEMINI_API_KEY?.trim();
  return Boolean(key && key !== 'MY_GEMINI_API_KEY' && key.length > 5);
}

class GeminiTimeoutError extends Error {}

/**
 * Generates content using the Gemini AI with a 30-second timeout.
 * @param ai The GoogleGenAI instance.
 * @param params The parameters for content generation.
 */
async function generateContentWithTimeout(ai: GoogleGenAI, params: GenerateContentParameters) {
  const controller = new AbortController();
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      ai.models.generateContent({
        ...params,
        config: { ...params.config, abortSignal: controller.signal },
      }),
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => {
          reject(new GeminiTimeoutError());
          controller.abort();
        }, 30000);
      }),
    ]);
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Validates if the given value is an optional string (undefined or string).
 * @param value The value to check.
 */
function isValidOptionalString(value: unknown): boolean {
  return value === undefined || typeof value === 'string';
}

/**
 * Validates if the given value is an optional array of strings.
 * @param value The value to check.
 */
function isValidOptionalFeatures(value: unknown): boolean {
  return (
    value === undefined ||
    (Array.isArray(value) && value.every((f) => typeof f === 'string'))
  );
}

interface ImageInput {
  mimeType?: string;
  dataUrl?: string;
}

/**
 * Builds the contents payload for multimodal requests, including the text prompt and optional inline images.
 * @param prompt The text prompt.
 * @param images An optional array of ImageInput objects.
 */
function buildMultimodalContents(prompt: string, images?: unknown) {
  const parts: Array<Record<string, unknown>> = [{ text: prompt }];
  if (Array.isArray(images)) {
    for (const img of images as ImageInput[]) {
      if (typeof img?.dataUrl === 'string') {
        const match = img.dataUrl.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);
        if (match) {
          parts.push({
            inlineData: {
              mimeType: match[1],
              data: match[2],
            },
          });
        }
      }
    }
  }
  return parts.length === 1 ? prompt : [{ role: 'user', parts }];
}

/**
 * Executes a Gemini AI request and sends a JSON response to the client.
 * @param params The parameters for content generation.
 * @param res The Express response object.
 * @param failureMessage The message to log and send on failure.
 */
async function executeGeminiJsonRoute(
  params: GenerateContentParameters,
  res: express.Response,
  failureMessage: string
) {
  try {
    const ai = getAiClient();
    const response = await generateContentWithTimeout(ai, params);

    const rawText = (response.text ?? '{}').trim();
    let parsed: unknown;
    try {
      parsed = JSON.parse(rawText);
    } catch {
      res.status(502).json({
        error: 'Received an invalid response from the AI. Your existing text has been safely preserved.',
      });
      return;
    }
    res.json(parsed);
  } catch (error: unknown) {
    if (error instanceof GeminiTimeoutError) {
      res.status(504).json({
        error: 'Gemini took too long. Your existing text has been safely preserved.',
      });
      return;
    }
    console.error('Gemini request failed', { category: 'generation_failure' });
    res.status(500).json({ error: failureMessage });
  }
}

/**
 * Creates and configures the Express application.
 */
export async function createApp() {
  const app = express();
  app.disable('x-powered-by');
  app.use(express.json({ limit: '25mb' }));

  const rateLimiter = createRateLimiter({
    windowMs: 60000,
    maxRequests: 1000,
    skip: () => process.env.NODE_ENV === 'test'
  });

  app.use('/api', securityHeadersMiddleware);
  app.use('/api', rateLimiter);
  app.use('/api', localOriginGuard);
  registerArchiveRoutes(app);
  registerSpecValidateRoute(app);

  const requireGeminiKey = (_req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (!isGeminiConfigured()) {
      res.status(503).json({
        error: 'PromptForge needs a valid Gemini API Key to work. Please set it in your environment variables.',
      });
      return;
    }
    next();
  };

  // Health & API Key readiness endpoint
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      geminiConfigured: isGeminiConfigured(),
      model: 'gemini-3.8-flash',
    });
  });

  // 1. Expand / Flesh Out Idea endpoint
  app.post('/api/gemini/expand', requireGeminiKey, async (req, res) => {
    const { appName, coreIdea, targetPlatform, features } = req.body || {};
    if (!coreIdea || typeof coreIdea !== 'string' || !coreIdea.trim()) {
      res.status(400).json({ error: 'Please enter at least a rough phrase or sentence for your app idea first.' });
      return;
    }
    if (!isValidOptionalString(appName) || !isValidOptionalString(targetPlatform)) {
      res.status(400).json({ error: 'Invalid app metadata payload.' });
      return;
    }
    if (!isValidOptionalFeatures(features)) {
      res.status(400).json({ error: 'Invalid features payload.' });
      return;
    }

    const { model, thinkingConfig } = resolveAiModelConfig(req.body);
    await executeGeminiJsonRoute(
      {
        model,
        contents: `You are PromptForge, a friendly product architect that translates rough, plain-English app thoughts into clear, jargon-free specifications.

Current App Name: ${appName || 'Untitled App'}
Target Device: ${targetPlatform || 'desktop'}
Rough Idea: ${coreIdea}
Current Feature List: ${Array.isArray(features) ? features.join('; ') : 'None yet'}

Expand this rough idea into:
1. A crisp, memorable app name (if the current one is generic or empty, improve it; otherwise keep it).
2. A 1-sentence plain-English tagline.
3. A rich, well-structured 2-paragraph plain-English description of what the app does, who it helps, and how it feels to use (avoid obscure compiler/database jargon).
4. 5 to 6 concrete, practical features written in everyday language.`,
        config: {
          thinkingConfig,
          systemInstruction:
            'Always respond with valid JSON matching the requested schema. Use clear, warm, non-intimidating language suitable for both non-coders and developers.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              appName: {
                type: Type.STRING,
                description: 'Polished name for the application.',
              },
              tagline: {
                type: Type.STRING,
                description: 'Short 1-sentence summary of the app value.',
              },
              expandedIdea: {
                type: Type.STRING,
                description: '2-paragraph expanded plain-English product description.',
              },
              suggestedFeatures: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: '5 to 6 plain-language user steps or core capabilities.',
              },
            },
            required: ['appName', 'tagline', 'expandedIdea', 'suggestedFeatures'],
          },
        },
      },
      res,
      'Could not reach Gemini AI to flesh out your idea. Your existing text has been safely preserved.'
    );
  });

  // 2. Generate a Random App Idea with AI
  app.post('/api/gemini/random-idea', requireGeminiKey, async (req, res) => {
    const { categoryHint } = req.body || {};
    if (!isValidOptionalString(categoryHint)) {
      res.status(400).json({ error: 'Invalid category hint.' });
      return;
    }
    const seedCategories = [
      'a local-first Ubuntu creative audio or visual utility',
      'a smart personal productivity or focus ritual workstation',
      'an interactive neighborhood community or hobbyist catalog app',
      'a calm personal finance, recipe, or hardware tinkering organizer',
      'a visual study companion or interactive science sandbox',
    ];
    const chosenTheme =
      (typeof categoryHint === 'string' && categoryHint.trim()) ||
      seedCategories[crypto.randomInt(seedCategories.length)];

    const { model, thinkingConfig } = resolveAiModelConfig(req.body);
    await executeGeminiJsonRoute(
      {
        model,
        contents: `Invent an original, practical, and inspiring application idea around the theme: "${chosenTheme}".
Make it concrete, distinctive, and immediately understandable by a non-technical builder.
Include:
- A catchy appName and 1-sentence tagline
- A 2-paragraph plain-English coreIdea explaining what problem it solves and how people interact with it
- targetPlatform ('desktop', 'web', 'mobile', or 'cli')
- 5 specific plain-English features
- 5 tailored multiple-choice clarification questions (with 3 concise options each and a default selectedAnswer)
- Recommended stackSummary and architectureStyle for Pro mode.`,
        config: {
          thinkingConfig,
          systemInstruction:
            'Generate an imaginative, realistic software application concept with zero filler jargon. Return strictly valid JSON.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              appName: { type: Type.STRING },
              tagline: { type: Type.STRING },
              coreIdea: { type: Type.STRING },
              targetPlatform: {
                type: Type.STRING,
                description: 'One of: desktop, web, mobile, cli',
              },
              features: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              groundRules: {
                type: Type.OBJECT,
                properties: {
                  offlineFirst: { type: Type.BOOLEAN },
                  highPerformance: { type: Type.BOOLEAN },
                  localPrivacy: { type: Type.BOOLEAN },
                  darkModeDefault: { type: Type.BOOLEAN },
                },
                required: ['offlineFirst', 'highPerformance', 'localPrivacy', 'darkModeDefault'],
              },
              clarifications: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    category: { type: Type.STRING },
                    question: { type: Type.STRING },
                    options: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                    },
                    selectedAnswer: { type: Type.STRING },
                  },
                  required: ['id', 'category', 'question', 'options', 'selectedAnswer'],
                },
              },
              stackSummary: { type: Type.STRING },
              architectureStyle: { type: Type.STRING },
            },
            required: [
              'appName',
              'tagline',
              'coreIdea',
              'targetPlatform',
              'features',
              'groundRules',
              'clarifications',
              'stackSummary',
              'architectureStyle',
            ],
          },
        },
      },
      res,
      'Could not generate a random AI idea right now. Try again or pick a starter template.'
    );
  });

  // 3. Socratic Interrogator ("Grill Me" Dynamic 3-Question Interview)
  app.post('/api/gemini/grill', requireGeminiKey, async (req, res) => {
    const {
      appName,
      tagline,
      coreIdea,
      targetPlatform,
      codingLanguage,
      codingLanguageNote,
      features,
      groundRules,
      clarifications,
      proConfig,
      stitchUi,
    } = req.body || {};
    if (!coreIdea || typeof coreIdea !== 'string' || !coreIdea.trim()) {
      res.status(400).json({ error: 'Please describe your app idea first so PromptForge knows what to ask.' });
      return;
    }
    if (!isValidOptionalString(appName) || !isValidOptionalString(tagline) || !isValidOptionalString(targetPlatform)) {
      res.status(400).json({ error: 'Invalid app metadata payload.' });
      return;
    }
    if (!isValidOptionalFeatures(features)) {
      res.status(400).json({ error: 'Invalid features payload.' });
      return;
    }
    if (
      groundRules !== undefined &&
      (typeof groundRules !== 'object' || groundRules === null || Array.isArray(groundRules))
    ) {
      res.status(400).json({ error: 'Invalid ground rules payload.' });
      return;
    }

    const aiModelConfig = resolveAiModelConfig(req.body);
    await executeGeminiJsonRoute(
      {
        model: aiModelConfig.model,
        contents: `Analyze ALL current entries in this application specification and generate 5 sharp, friendly multiple-choice clarification questions ("Grill Me") that dynamically adapt to what the user has already entered and uncover remaining missing details, edge cases, data storage, onboarding, error states, or UX choices.

App Name: ${appName || 'Untitled App'}
Tagline: ${tagline || 'None yet'}
Target Device: ${targetPlatform || 'desktop'}
Coding Language: ${codingLanguage || 'auto'} ${codingLanguageNote ? `(${codingLanguageNote})` : ''}
Core Idea: ${coreIdea}
Feature List: ${Array.isArray(features) ? features.join(' | ') : ''}
Ground Rules: ${JSON.stringify(groundRules || {})}
Previous Clarifications (KEEP & DO NOT REPEAT THESE TOPICS OR QUESTIONS): ${JSON.stringify(clarifications || [])}
Pro Config: ${JSON.stringify(proConfig || {})}
Stitch UI Direction: ${JSON.stringify(stitchUi ? { visualDirection: stitchUi.visualDirection, uploadedResultName: stitchUi.uploadedResultName } : {})}

Rules for the 5 questions:
- Write questions in plain, everyday English (no intimidating jargon).
- Strictly avoid repeating any topic or question already covered in Previous Clarifications—dig into NEW unaddressed areas.
- Adapt directly to the user's current features, platform, coding language, and prior answers.
- Each question must have 3 distinct, practical multiple-choice options.
- Prefix the best option with "(Recommended) ".
- Set selectedAnswer to that recommended first option.`,
        config: {
          systemInstruction:
            'You are a Socratic product coach. Return exactly 5 fresh, non-duplicate high-value multiple-choice questions in valid JSON.',
          thinkingConfig: aiModelConfig.thinkingConfig,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              questions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    category: {
                      type: Type.STRING,
                      description: 'Short plain-English topic like User Flow, Data & Privacy, or Visual Polish',
                    },
                    question: { type: Type.STRING },
                    options: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                    },
                    selectedAnswer: { type: Type.STRING },
                  },
                  required: ['id', 'category', 'question', 'options', 'selectedAnswer'],
                },
              },
            },
            required: ['questions'],
          },
        },
      },
      res,
      'Gemini took too long or encountered an error while generating interview questions. Your current progress is safe.'
    );
  });

  // 4. Context-Aware Single-Field Fill with AI (uses all other filled fields & supports unlimited refinements)
  const FILL_FIELD_GUIDANCE: Record<string, { label: string; instruction: string }> = {
    appName: {
      label: 'App Name',
      instruction:
        'Generate a crisp, memorable 1-3 word application name in "value" based on ALL other filled fields (tagline, coreIdea, targetPlatform, codingLanguage, features, stitchUi).',
    },
    tagline: {
      label: 'One-Sentence Summary',
      instruction:
        'Write a warm, plain-English 1-sentence summary in "value" describing what the app does and who it helps using all other filled fields.',
    },
    coreIdea: {
      label: 'Big Idea (Plain English)',
      instruction:
        'Write clear, jargon-free paragraphs in "value" explaining the app purpose, target users, and day-to-day experience using ALL other filled fields (appName, tagline, platform, codingLanguage, features, groundRules, clarifications).',
    },
    nextStep: {
      label: 'Next Feature',
      instruction:
        'Suggest 1 concrete, high-value plain-English feature in "value" that complements the existing feature list without duplicating any item.',
    },
    codingLanguageNote: {
      label: 'Coding Language Notes',
      instruction:
        'Suggest helpful plain-English library, framework, or version notes in "value" tailored to the chosen codingLanguage, targetPlatform, groundRules, and features.',
    },
    stackSummary: {
      label: 'Preferred Tech Stack Summary',
      instruction:
        'Suggest a concise tech stack summary in "value" tailored to the codingLanguage, targetPlatform, app idea, ground rules, and clarifications.',
    },
    architectureStyle: {
      label: 'System Architecture Pattern',
      instruction:
        'Suggest a clear 1-sentence architecture pattern in "value" matching the codingLanguage, stack, ground rules, and clarification decisions.',
    },
    testingStrategy: {
      label: 'Verification & Testing Rules',
      instruction:
        'Suggest a practical testing and verification strategy in "value" aligned with the codingLanguage, targetPlatform, stack, and features.',
    },
    securityBoundary: {
      label: 'Security & Filesystem Boundary',
      instruction:
        'Suggest a concrete security & data privacy boundary in "value" reflecting the ground rules, platform, codingLanguage, and app features.',
    },
    templateVariable: {
      label: 'Dynamic Template Token',
      instruction:
        'Suggest 1 useful new template variable NOT already in existing templateVariables: put a short snake_case key in "value" and a sensible default string in "secondaryValue".',
    },
    customRule: {
      label: 'Persistent AI Coding Rule',
      instruction:
        'Suggest 1 concise, actionable coding or UX convention in "value" that is NOT already in existing customRules and fits the project.',
    },
    stitchVisualDirection: {
      label: 'Stitch UI Visual Direction',
      instruction:
        'Describe a vivid, cohesive UI layout, color mood, and component hierarchy in "value" for Google Stitch based on all other filled fields.',
    },
    stitchScreenNotes: {
      label: 'Stitch Screen / Menu Prompt Notes',
      instruction:
        'Describe the exact layout zones, navigation affordances, states (loading, empty, active), and interactive controls in "value" for this specific Google Stitch screen/menu/modal based on all filled fields.',
    },
    uploadedResultNotes: {
      label: 'Stitch Result Handoff Notes',
      instruction:
        'Summarize in "value" how the next coding tool should wire interactive logic, state, and edge cases onto the Stitch UI based on all filled fields.',
    },
    localAgentNotes: {
      label: 'Local AI Agent Rules (Ollama / Continue)',
      instruction:
        'Write concise local-first instructions in "value" for Ollama & Continue (.continuerules) specifying small focused edits, coding style, and verification commands tailored to this project.',
    },
    multiAgentProtocol: {
      label: 'Multi-Agent Coordination Protocol',
      instruction:
        'Write clear coordination rules in "value" for COLLABORATION.md explaining how parallel agents claim lanes, avoid file collisions, and signal handoffs.',
    },
  };

  app.post('/api/gemini/fill-field', requireGeminiKey, async (req, res) => {
    const { field, context, currentValue, variationNonce } = req.body || {};
    if (!field || typeof field !== 'string' || !(field in FILL_FIELD_GUIDANCE)) {
      res.status(400).json({ error: 'Unsupported field requested for AI fill.' });
      return;
    }
    if (!context || typeof context !== 'object' || Array.isArray(context)) {
      res.status(400).json({ error: 'Invalid project context payload.' });
      return;
    }

    const aiModelConfig = resolveAiModelConfig(req.body);
    const serializedContext = JSON.stringify(context);
    const guidance = FILL_FIELD_GUIDANCE[field];
    const currentValueText =
      typeof currentValue === 'string' && currentValue.trim()
        ? `\nCurrent Field Draft (user clicked Fill with AI again — refine, elevate, or offer a fresh complementary alternative instead of repeating identically):\n${currentValue.trim()}\nVariation Seed: ${variationNonce ?? 'next'}`
        : '';

    await executeGeminiJsonRoute(
      {
        model: aiModelConfig.model,
        contents: `You are PromptForge, helping a builder fill out one specific field using EVERY OTHER filled field across the entire project.

Target Field: ${field} (${guidance.label})
Task: ${guidance.instruction}${currentValueText}

Full Project Context (JSON):
${serializedContext}

Return valid JSON with "value" (and "secondaryValue" only when Target Field is "templateVariable"). Avoid jargon in Simple/Balanced fields and stay consistent with all other filled sections.`,
        config: {
          systemInstruction:
            'You are a thoughtful product architect. Read every filled field in the context carefully and return strictly valid JSON with a smart, tailored answer for the requested field.',
          thinkingConfig: aiModelConfig.thinkingConfig,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              value: {
                type: Type.STRING,
                description: 'Smart context-aware value for the target field.',
              },
              secondaryValue: {
                type: Type.STRING,
                description: 'Optional secondary value (used as token value when field is templateVariable).',
              },
            },
            required: ['value'],
          },
        },
      },
      res,
      `Could not fill ${guidance.label} with AI right now. Your existing text has been safely preserved.`
    );
  });

  // 5. Mini "Grill Me" Quick Follow-Up Questions for Specific Sections (supports multimodal images for Stitch UI)
  const MINI_GRILL_TOPICS: Record<string, string> = {
    idea: 'Clarify the core user problem, audience, or daily workflow so the Big Idea description becomes much sharper.',
    features: 'Clarify missing user interactions or edge cases so a concrete new feature can be added to the Feature List.',
    groundRules: 'Clarify offline behavior, speed expectations, or data privacy expectations.',
    codingLanguage: 'Clarify developer ergonomics, target ecosystem, or deployment priorities to refine coding language notes.',
    proArch: 'Clarify technical architecture, testing coverage, or security constraints for AGENTS.md.',
    stitchUi: 'Grill the user specifically about visual UI design (layout density, navigation pattern, color mood, typography, and component style) using any attached reference images.',
  };

  app.post('/api/gemini/mini-grill', requireGeminiKey, async (req, res) => {
    const { topic, context, images } = req.body || {};
    if (!topic || typeof topic !== 'string' || !(topic in MINI_GRILL_TOPICS)) {
      res.status(400).json({ error: 'Unsupported mini-grill topic.' });
      return;
    }
    if (!context || typeof context !== 'object' || Array.isArray(context)) {
      res.status(400).json({ error: 'Invalid project context payload.' });
      return;
    }

    const prompt = `Generate 2 quick, friendly multiple-choice helper questions focused on "${topic}" (${MINI_GRILL_TOPICS[topic]}) so the user can add concrete detail to their app.

Full Project Context (JSON):
${JSON.stringify(context)}

Rules:
- Keep questions short and plain-English.
- Each question must have 3 practical options, prefixing the best option with "(Recommended) ".
- Set selectedAnswer to that recommended option.`;

    const { model, thinkingConfig } = resolveAiModelConfig(req.body);
    await executeGeminiJsonRoute(
      {
        model,
        contents: buildMultimodalContents(prompt, images),
        config: {
          thinkingConfig,
          systemInstruction:
            'You are a friendly product & UI design coach. Return strictly valid JSON with 2 targeted multiple-choice questions.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              questions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    category: { type: Type.STRING },
                    question: { type: Type.STRING },
                    options: { type: Type.ARRAY, items: { type: Type.STRING } },
                    selectedAnswer: { type: Type.STRING },
                  },
                  required: ['id', 'category', 'question', 'options', 'selectedAnswer'],
                },
              },
            },
            required: ['questions'],
          },
        },
      },
      res,
      'Could not generate mini-grill questions right now. Your active form text is safe.'
    );
  });

  // 6. Google Stitch "Surprise Me" UI Concept Generator (with optional uploaded idea images)
  app.post('/api/gemini/stitch-surprise', requireGeminiKey, async (req, res) => {
    const { context, images } = req.body || {};
    if (!context || typeof context !== 'object' || Array.isArray(context)) {
      res.status(400).json({ error: 'Invalid project context payload.' });
      return;
    }

    const prompt = `Invent an inspiring, cohesive visual UI design direction for Google Stitch tailored to this application (and analyzing any attached inspiration images if provided).

Full Project Context (JSON):
${JSON.stringify(context)}

Return:
- designConceptName: short evocative theme name
- visualDirection: a rich plain-English UI brief describing color palette, surface materials, spatial layout, typography mood, and key interactions
- uiClarifications: 3 multiple-choice UI design questions (layout, navigation, visual density) with 3 practical options each (best prefixed with "(Recommended) ") and selectedAnswer set to that recommended option.`;

    const { model, thinkingConfig } = resolveAiModelConfig(req.body);
    await executeGeminiJsonRoute(
      {
        model,
        contents: buildMultimodalContents(prompt, images),
        config: {
          thinkingConfig,
          systemInstruction:
            'You are a world-class UI/UX designer preparing a visual brief for Google Stitch. Return strictly valid JSON.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              designConceptName: { type: Type.STRING },
              visualDirection: { type: Type.STRING },
              uiClarifications: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    category: { type: Type.STRING },
                    question: { type: Type.STRING },
                    options: { type: Type.ARRAY, items: { type: Type.STRING } },
                    selectedAnswer: { type: Type.STRING },
                  },
                  required: ['id', 'category', 'question', 'options', 'selectedAnswer'],
                },
              },
            },
            required: ['designConceptName', 'visualDirection', 'uiClarifications'],
          },
        },
      },
      res,
      'Could not generate a Surprise Me UI idea right now. Your existing visual notes are safe.'
    );
  });

  // 7. Coding Language Advisor ("What is best for what?")
  app.post('/api/gemini/recommend-language', requireGeminiKey, async (req, res) => {
    const { context } = req.body || {};
    if (!context || typeof context !== 'object' || Array.isArray(context)) {
      res.status(400).json({ error: 'Invalid project context payload.' });
      return;
    }

    const allowedIds = [
      'typescript-react',
      'rust-tauri',
      'python',
      'dart-flutter',
      'kotlin-android',
      'swift-ios',
      'go',
      'csharp-dotnet',
    ];

    const { model, thinkingConfig } = resolveAiModelConfig(req.body);
    await executeGeminiJsonRoute(
      {
        model,
        contents: `Analyze this app specification and advise the builder in plain English on which coding language is best for what—and which single language fits their app best.

Full Project Context (JSON):
${JSON.stringify(context)}

Choose recommendedId from: ${allowedIds.join(', ')}.
Return summary, tradeoffs, and 4 practical comparisons explaining what each language is best for and why to consider or skip it.`,
        config: {
          thinkingConfig,
          systemInstruction:
            'You are a friendly principal engineer explaining coding language trade-offs in plain, jargon-free English. Return strictly valid JSON.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              recommendedId: { type: Type.STRING },
              recommendedLabel: { type: Type.STRING },
              summary: { type: Type.STRING },
              tradeoffs: { type: Type.STRING },
              comparisons: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    language: { type: Type.STRING },
                    bestFor: { type: Type.STRING },
                    whyConsiderOrSkip: { type: Type.STRING },
                  },
                  required: ['language', 'bestFor', 'whyConsiderOrSkip'],
                },
              },
            },
            required: [
              'recommendedId',
              'recommendedLabel',
              'summary',
              'tradeoffs',
              'comparisons',
            ],
          },
        },
      },
      res,
      'Could not fetch AI coding language advice right now. You can still select any language manually.'
    );
  });

  if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    const indexHtmlPath = path.join(distPath, 'index.html');
    const cachedIndexHtml = fs.existsSync(indexHtmlPath)
      ? fs.readFileSync(indexHtmlPath, 'utf-8')
      : null;
    app.use(express.static(distPath));
    app.get('*', rateLimiter, (_req, res) => {
      if (!cachedIndexHtml) {
        res.status(404).send('Not found');
        return;
      }
      res.type('html').send(cachedIndexHtml);
    });
  }

  return app;
}

/**
 * Starts the Express server.
 */
async function startServer() {
  const host = process.env.HOST || '127.0.0.1';
  const app = await createApp();
  app.listen(PORT, host, () => {
    console.log(`PromptForge Workstation server running on http://${host}:${PORT}`);
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  startServer();
}
