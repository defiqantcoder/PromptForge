import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type, type GenerateContentParameters } from '@google/genai';
import { fileURLToPath } from 'url';

dotenv.config();

const PORT = 3000;

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

function isGeminiConfigured(): boolean {
  const key = process.env.GEMINI_API_KEY?.trim();
  return Boolean(key && key !== 'MY_GEMINI_API_KEY' && key.length > 5);
}

class GeminiTimeoutError extends Error {}

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

const MAX_TEXT_LENGTH = 20_000;
const MAX_SHORT_LENGTH = 500;
const MAX_FEATURES = 30;

function isValidOptionalString(value: unknown, maxLen = MAX_SHORT_LENGTH): boolean {
  return value === undefined || (typeof value === 'string' && value.length <= maxLen);
}

function isValidOptionalFeatures(value: unknown): boolean {
  return (
    value === undefined ||
    (Array.isArray(value) &&
      value.length <= MAX_FEATURES &&
      value.every((f) => typeof f === 'string' && f.length <= MAX_SHORT_LENGTH))
  );
}

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

export async function createApp() {
  const app = express();
  app.disable('x-powered-by');
  app.use(express.json({ limit: '2mb' }));

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
    if (coreIdea.length > MAX_TEXT_LENGTH) {
      res.status(400).json({ error: 'App idea text exceeds the maximum allowed length.' });
      return;
    }
    if (!isValidOptionalString(appName) || !isValidOptionalString(targetPlatform, 32)) {
      res.status(400).json({ error: 'Invalid app metadata payload.' });
      return;
    }
    if (!isValidOptionalFeatures(features)) {
      res.status(400).json({ error: 'Invalid features payload.' });
      return;
    }

    await executeGeminiJsonRoute(
      {
        model: 'gemini-3.8-flash',
        contents: `You are PromptForge, a friendly product architect that translates rough, plain-English app thoughts into clear, jargon-free specifications.

Current App Name: ${appName || 'Untitled App'}
Target Device: ${targetPlatform || 'desktop'}
Rough Idea: ${coreIdea}
Current Main Steps: ${Array.isArray(features) ? features.join('; ') : 'None yet'}

Expand this rough idea into:
1. A crisp, memorable app name (if the current one is generic or empty, improve it; otherwise keep it).
2. A 1-sentence plain-English tagline.
3. A rich, well-structured 2-paragraph plain-English description of what the app does, who it helps, and how it feels to use (avoid obscure compiler/database jargon).
4. 5 to 6 concrete, step-by-step user flows written in everyday language.`,
        config: {
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
      seedCategories[Math.floor(Math.random() * seedCategories.length)];

    await executeGeminiJsonRoute(
      {
        model: 'gemini-3.8-flash',
        contents: `Invent an original, practical, and inspiring application idea around the theme: "${chosenTheme}".
Make it concrete, distinctive, and immediately understandable by a non-technical builder.
Include:
- A catchy appName and 1-sentence tagline
- A 2-paragraph plain-English coreIdea explaining what problem it solves and how people interact with it
- targetPlatform ('desktop', 'web', 'mobile', or 'cli')
- 5 specific plain-English user steps (features)
- 3 tailored multiple-choice clarification questions (with 3 concise options each and a default selectedAnswer)
- Recommended stackSummary and architectureStyle for Pro mode.`,
        config: {
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

  // 3. Socratic Interrogator ("Grill Me" 3-Question Interview)
  app.post('/api/gemini/grill', requireGeminiKey, async (req, res) => {
    const { appName, coreIdea, targetPlatform, features, groundRules } = req.body || {};
    if (!coreIdea || typeof coreIdea !== 'string' || !coreIdea.trim()) {
      res.status(400).json({ error: 'Please describe your app idea first so PromptForge knows what to ask.' });
      return;
    }
    if (coreIdea.length > MAX_TEXT_LENGTH) {
      res.status(400).json({ error: 'App idea text exceeds the maximum allowed length.' });
      return;
    }
    if (!isValidOptionalString(appName)) {
      res.status(400).json({ error: 'Invalid app name.' });
      return;
    }
    if (!isValidOptionalString(targetPlatform, 32)) {
      res.status(400).json({ error: 'Invalid target platform.' });
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

    await executeGeminiJsonRoute(
      {
        model: 'gemini-3.8-flash',
        contents: `Analyze this application specification and generate 3 sharp, friendly multiple-choice clarification questions ("Grill Me") that uncover missing product details, edge cases, or user experience choices.

App Name: ${appName || 'Untitled App'}
Target Device: ${targetPlatform || 'desktop'}
Core Idea: ${coreIdea}
Main Steps: ${Array.isArray(features) ? features.join(' | ') : ''}
Ground Rules: ${JSON.stringify(groundRules || {})}

Rules for the 3 questions:
- Write questions in plain, everyday English (no intimidating jargon).
- Each question must have 3 distinct, practical multiple-choice options (under 12 words each).
- Prefix the best option with "(Recommended) ".
- Set selectedAnswer to that recommended first option.`,
        config: {
          systemInstruction:
            'You are a Socratic product coach. Return exactly 3 high-value multiple-choice questions in valid JSON.',
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

  // 4. Context-Aware Single-Field Fill with AI
  const FILL_FIELD_GUIDANCE: Record<string, { label: string; instruction: string }> = {
    appName: {
      label: 'App Name',
      instruction:
        'Generate a crisp, memorable 1-3 word application name in "value" based on the core idea, tagline, target device, and steps.',
    },
    tagline: {
      label: 'One-Sentence Summary',
      instruction:
        'Write a warm, plain-English 1-sentence summary (under 18 words) in "value" describing what the app does and who it helps.',
    },
    coreIdea: {
      label: 'Big Idea (Plain English)',
      instruction:
        'Write 2 clear, jargon-free paragraphs in "value" explaining the app purpose, target users, and day-to-day experience using any prior app name, tagline, platform, and steps.',
    },
    nextStep: {
      label: 'Next User Step',
      instruction:
        'Suggest 1 concrete, high-value plain-English user action step in "value" that complements the existing steps without duplicating them.',
    },
    stackSummary: {
      label: 'Preferred Tech Stack Summary',
      instruction:
        'Suggest a concise 1-line tech stack summary in "value" tailored to the target device, app idea, ground rules, and clarifications.',
    },
    architectureStyle: {
      label: 'System Architecture Pattern',
      instruction:
        'Suggest a clear 1-sentence architecture pattern in "value" matching the stack, ground rules (offline/privacy/speed), and clarification decisions.',
    },
    testingStrategy: {
      label: 'Verification & Testing Rules',
      instruction:
        'Suggest a practical 1-sentence testing and verification strategy in "value" aligned with the target platform, stack, and features.',
    },
    securityBoundary: {
      label: 'Security & Filesystem Boundary',
      instruction:
        'Suggest a concrete 1-sentence security & data privacy boundary in "value" reflecting the ground rules, platform, and app features.',
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
  };

  app.post('/api/gemini/fill-field', requireGeminiKey, async (req, res) => {
    const { field, context } = req.body || {};
    if (!field || typeof field !== 'string' || !(field in FILL_FIELD_GUIDANCE)) {
      res.status(400).json({ error: 'Unsupported field requested for AI fill.' });
      return;
    }
    if (!context || typeof context !== 'object' || Array.isArray(context)) {
      res.status(400).json({ error: 'Invalid project context payload.' });
      return;
    }

    const serializedContext = JSON.stringify(context);
    if (serializedContext.length > MAX_TEXT_LENGTH * 2) {
      res.status(400).json({ error: 'Project context exceeds the maximum allowed length.' });
      return;
    }

    const guidance = FILL_FIELD_GUIDANCE[field];
    await executeGeminiJsonRoute(
      {
        model: 'gemini-3.8-flash',
        contents: `You are PromptForge, helping a builder fill out one specific field using everything already entered in prior sections.

Target Field: ${field} (${guidance.label})
Task: ${guidance.instruction}

Existing Project Context (JSON):
${serializedContext}

Return valid JSON with "value" (and "secondaryValue" only when Target Field is "templateVariable"). Avoid jargon in Simple/Balanced fields and stay consistent with all prior sections.`,
        config: {
          systemInstruction:
            'You are a thoughtful product architect. Read all prior sections carefully and return strictly valid JSON with a smart, tailored answer for the requested field.',
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

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  return app;
}

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
