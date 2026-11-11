import assert from 'node:assert/strict';
import { once } from 'node:events';
import { test } from 'node:test';
import { setTimeout as nodeSetTimeout } from 'node:timers';
import { createApp } from './server.ts';

test('Gemini routes share key checks, cancel deadlines, and keep provider errors private', async () => {
  const originalEnv = { key: process.env.GEMINI_API_KEY, mode: process.env.NODE_ENV };
  process.env.NODE_ENV = 'production';
  const app = await createApp();
  const server = app.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const address = server.address();
  assert.ok(address && typeof address !== 'string');
  const base = `http://127.0.0.1:${address.port}`;
  const clientFetch = globalThis.fetch;
  const realSetTimeout = globalThis.setTimeout;
  const realClearTimeout = globalThis.clearTimeout;
  const realConsoleError = console.error;
  const timers = new Set<number | ReturnType<typeof setTimeout>>();
  const logs: unknown[][] = [];
  let mode = 'success';
  let providerCalls = 0;
  let signal: AbortSignal | undefined;
  const secret = 'provider-secret-do-not-expose';
  globalThis.setTimeout = ((callback: () => void, delay?: number, ...args: unknown[]) => {
    const timer = nodeSetTimeout(callback, delay === 30000 && mode === 'timeout' ? 0 : delay, ...args);
    if (delay === 30000) timers.add(timer);
    return timer;
  }) as typeof setTimeout;
  globalThis.clearTimeout = ((timer) => {
    timers.delete(timer as ReturnType<typeof setTimeout>);
    realClearTimeout(timer);
  }) as typeof clearTimeout;
  console.error = (...args) => { logs.push(args); };
  globalThis.fetch = (async (_input, init) => {
    providerCalls++;
    signal = init?.signal ?? undefined;
    assert.ok(signal instanceof AbortSignal);
    if (mode === 'timeout') {
      return new Promise<Response>((_, reject) => {
        signal!.addEventListener('abort', () => reject(new Error(secret)), { once: true });
      });
    }
    if (mode === 'error' || mode === 'upstream-timeout') {
      return new Response(JSON.stringify({ error: { code: 400, message: mode === 'error' ? secret : 'TIMEOUT', status: 'INVALID_ARGUMENT' } }), { status: 400 });
    }
    return new Response(JSON.stringify({ candidates: [{ content: { parts: [{ text: mode === 'invalid-json' ? 'invalid' : '{"ok":true}' }] } }] }), { status: 200 });
  }) as typeof fetch;
  const routes = [
    ['expand', 'Could not reach Gemini AI to flesh out your idea. Your existing text has been safely preserved.'],
    ['random-idea', 'Could not generate a random AI idea right now. Try again or pick a starter template.'],
    ['grill', 'Gemini took too long or encountered an error while generating interview questions. Your current progress is safe.'],
  ];
  const post = (route: string) => clientFetch(`${base}/api/gemini/${route}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ coreIdea: 'A study app' }),
  });
  try {
    for (const key of [undefined, '', '   ', 'MY_GEMINI_API_KEY', ' MY_GEMINI_API_KEY ', ...Array.from({ length: 5 }, (_, i) => ` ${'x'.repeat(i + 1)} `), ' abcdef ']) {
      if (key === undefined) delete process.env.GEMINI_API_KEY;
      else process.env.GEMINI_API_KEY = key;
      const configured = key === ' abcdef ';
      const health = await clientFetch(`${base}/api/health`).then(r => r.json());
      assert.equal(health.geminiConfigured, configured);
      for (const [route] of routes) {
        const before = providerCalls;
        const response = await post(route);
        assert.equal(response.status, configured ? 200 : 503);
        await response.json();
        assert.equal(providerCalls - before, configured ? 1 : 0);
        assert.equal(timers.size, 0);
      }
    }
    process.env.GEMINI_API_KEY = 'synthetic-test-key';
    for (const [route, errorMessage] of routes) {
      for (mode of ['success', 'invalid-json', 'error', 'upstream-timeout', 'timeout']) {
        const response = await post(route);
        const body = await response.json();
        assert.equal(response.status, ({ success: 200, 'invalid-json': 502, error: 500, 'upstream-timeout': 500, timeout: 504 })[mode]);
        if (mode === 'success') assert.deepEqual(body, { ok: true });
        if (mode === 'error' || mode === 'upstream-timeout') assert.equal(body.error, errorMessage);
        if (mode === 'timeout') {
          assert.equal(body.error, 'Gemini took too long. Your existing text has been safely preserved.');
          assert.equal(signal?.aborted, true);
        }
        assert.equal(JSON.stringify(body).includes(secret), false);
        assert.equal(timers.size, 0);
      }
    }
    assert.equal(logs.length, 6);
    for (const log of logs) assert.deepEqual(log, ['Gemini request failed', { category: 'generation_failure' }]);
  } finally {
    globalThis.fetch = clientFetch;
    globalThis.setTimeout = realSetTimeout;
    globalThis.clearTimeout = realClearTimeout;
    console.error = realConsoleError;
    for (const timer of timers) realClearTimeout(timer);
    if (originalEnv.key === undefined) delete process.env.GEMINI_API_KEY;
    else process.env.GEMINI_API_KEY = originalEnv.key;
    if (originalEnv.mode === undefined) delete process.env.NODE_ENV;
    else process.env.NODE_ENV = originalEnv.mode;
    await new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
  }
});
