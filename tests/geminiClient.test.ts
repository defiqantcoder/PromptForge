import test from 'node:test';
import assert from 'node:assert/strict';
import {
  expandProjectIdea,
  generateGrillQuestions,
  generateRandomAppIdea,
} from '../src/services/geminiClient.ts';
import {
  canonicalizeLinuxPath,
  isTauriEnvironment,
  pickUbuntuDirectory,
} from '../src/services/tauriBridge.ts';
import { DEFAULT_PROJECT_STATE } from '../src/services/presets.ts';

test('tauriBridge canonicalizeLinuxPath rejects traversal and normalizes slashes', async () => {
  assert.equal(canonicalizeLinuxPath('').valid, false);
  assert.equal(canonicalizeLinuxPath('~/Projects/../secret').valid, false);
  assert.equal(canonicalizeLinuxPath('..\\escape').valid, false);

  const ok = canonicalizeLinuxPath('~/Projects//demo-app/');
  assert.equal(ok.valid, true);
  assert.equal(ok.canonicalPath, '/home/ubuntu/Projects/demo-app');

  const customHome = canonicalizeLinuxPath('~/Projects/specs', '/home/sinnoh/');
  assert.equal(customHome.valid, true);
  assert.equal(customHome.canonicalPath, '/home/sinnoh/Projects/specs');

  assert.equal(await pickUbuntuDirectory(), null);
});

test('geminiClient routes through Express fetch in browser mode and Tauri IPC in native mode', async () => {
  const originalWindow = (globalThis as any).window;
  const originalFetch = globalThis.fetch;

  try {
    // 1. Web preview mode (no __TAURI_INTERNALS__)
    delete (globalThis as any).window;
    assert.equal(isTauriEnvironment(), false);

    const fetchedUrls: string[] = [];
    globalThis.fetch = (async (input: RequestInfo | URL) => {
      fetchedUrls.push(String(input));
      return new Response(
        JSON.stringify({
          appName: 'WebApp',
          tagline: 'Tag',
          expandedIdea: 'Expanded',
          suggestedFeatures: ['Step 1'],
        }),
        { status: 200 }
      );
    }) as typeof fetch;

    const webResp = await expandProjectIdea({
      appName: 'Demo',
      coreIdea: 'A quick idea',
      targetPlatform: 'desktop',
      features: [],
    });
    assert.equal(webResp.appName, 'WebApp');
    assert.deepEqual(fetchedUrls, ['/api/gemini/expand']);

    // 2. Native Tauri desktop mode (__TAURI_INTERNALS__ present)
    const invokedCalls: Array<{ cmd: string; args: unknown }> = [];
    (globalThis as any).window = {
      __TAURI_INTERNALS__: {
        invoke: async (cmd: string, args: unknown) => {
          invokedCalls.push({ cmd, args });
          if ((args as any)?.endpoint === '/api/gemini/grill') {
            return { questions: [] };
          }
          return {
            appName: 'NativeApp',
            tagline: 'Desktop Tag',
            coreIdea: 'Native Idea',
            targetPlatform: 'desktop',
            features: ['Step A'],
            groundRules: DEFAULT_PROJECT_STATE.groundRules,
            clarifications: [],
            stackSummary: 'Tauri v2',
            architectureStyle: 'IPC',
          };
        },
      },
    };
    assert.equal(isTauriEnvironment(), true);

    const nativeRandom = await generateRandomAppIdea('productivity');
    assert.equal(nativeRandom.appName, 'NativeApp');

    const nativeGrill = await generateGrillQuestions(DEFAULT_PROJECT_STATE);
    assert.deepEqual(nativeGrill, { questions: [] });

    assert.equal(invokedCalls.length, 2);
    assert.equal(invokedCalls[0].cmd, 'gemini_proxy_request');
    assert.equal((invokedCalls[0].args as any).endpoint, '/api/gemini/random-idea');
    assert.equal(invokedCalls[1].cmd, 'gemini_proxy_request');
    assert.equal((invokedCalls[1].args as any).endpoint, '/api/gemini/grill');
  } finally {
    if (originalWindow === undefined) {
      delete (globalThis as any).window;
    } else {
      (globalThis as any).window = originalWindow;
    }
    globalThis.fetch = originalFetch;
  }
});
