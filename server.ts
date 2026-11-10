import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

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

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '2mb' }));

  // Health & API Key readiness endpoint
  app.get('/api/health', (_req, res) => {
    const hasKey = Boolean(
      process.env.GEMINI_API_KEY &&
        process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY' &&
        process.env.GEMINI_API_KEY.trim().length > 5
    );
    res.json({
      status: 'ok',
      geminiConfigured: hasKey,
      model: 'gemini-3.8-flash',
    });
  });

  // 1. Expand / Flesh Out Idea endpoint
  app.post('/api/gemini/expand', async (req, res) => {
    try {
      const { appName, coreIdea, targetPlatform, features } = req.body || {};
      if (!coreIdea || typeof coreIdea !== 'string') {
        res.status(400).json({ error: 'Please enter at least a rough phrase or sentence for your app idea first.' });
        return;
      }

      const ai = getAiClient();
      const response = await ai.models.generateContent({
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
      });

      const rawText = (response.text ?? '{}').trim();
      const parsed = JSON.parse(rawText);
      res.json(parsed);
    } catch (error: any) {
      console.error('Gemini expand error:', error);
      res.status(500).json({
        error:
          error?.message ||
          'Could not reach Gemini AI to flesh out your idea. Your existing text has been safely preserved.',
      });
    }
  });

  // 2. Generate a Random App Idea with AI
  app.post('/api/gemini/random-idea', async (req, res) => {
    try {
      const { categoryHint } = req.body || {};
      const seedCategories = [
        'a local-first Ubuntu creative audio or visual utility',
        'a smart personal productivity or focus ritual workstation',
        'an interactive neighborhood community or hobbyist catalog app',
        'a calm personal finance, recipe, or hardware tinkering organizer',
        'a visual study companion or interactive science sandbox',
      ];
      const chosenTheme =
        categoryHint || seedCategories[Math.floor(Math.random() * seedCategories.length)];

      const ai = getAiClient();
      const response = await ai.models.generateContent({
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
      });

      const rawText = (response.text ?? '{}').trim();
      const parsed = JSON.parse(rawText);
      res.json(parsed);
    } catch (error: any) {
      console.error('Gemini random-idea error:', error);
      res.status(500).json({
        error:
          error?.message ||
          'Could not generate a random AI idea right now. Try again or pick a starter template.',
      });
    }
  });

  // 3. Socratic Interrogator ("Grill Me" 3-Question Interview)
  app.post('/api/gemini/grill', async (req, res) => {
    try {
      const { appName, coreIdea, targetPlatform, features, groundRules } = req.body || {};
      if (!coreIdea || typeof coreIdea !== 'string') {
        res.status(400).json({ error: 'Please describe your app idea first so PromptForge knows what to ask.' });
        return;
      }

      const ai = getAiClient();
      const response = await ai.models.generateContent({
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
      });

      const rawText = (response.text ?? '{}').trim();
      const parsed = JSON.parse(rawText);
      res.json(parsed);
    } catch (error: any) {
      console.error('Gemini grill error:', error);
      res.status(500).json({
        error:
          error?.message ||
          'Gemini took too long or encountered an error while generating interview questions. Your current progress is safe.',
      });
    }
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

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`PromptForge Workstation server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
