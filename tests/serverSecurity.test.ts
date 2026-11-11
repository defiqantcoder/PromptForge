import { after, before, describe, test } from 'node:test';
import assert from 'node:assert';
import express from 'express';
import request from 'supertest';
import { createApp } from '../server.js';

describe('Server Security Middleware', () => {
  let app: express.Express;
  const originalEnv = {
    nodeEnv: process.env.NODE_ENV,
    geminiKey: process.env.GEMINI_API_KEY,
  };

  before(async () => {
    process.env.NODE_ENV = 'production';
    process.env.GEMINI_API_KEY = 'test-key-12345';
    app = await createApp();
  });

  after(() => {
    if (originalEnv.geminiKey === undefined) delete process.env.GEMINI_API_KEY;
    else process.env.GEMINI_API_KEY = originalEnv.geminiKey;
    if (originalEnv.nodeEnv === undefined) delete process.env.NODE_ENV;
    else process.env.NODE_ENV = originalEnv.nodeEnv;
  });

  test('security headers are present on /api/ routes', async () => {
    const res = await request(app).get('/api/health');
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.headers['x-content-type-options'], 'nosniff');
    assert.strictEqual(res.headers['x-frame-options'], 'DENY');
    assert.strictEqual(res.headers['referrer-policy'], 'no-referrer');
    assert.strictEqual(res.headers['cross-origin-resource-policy'], 'same-origin');
  });

  test('localOriginGuard rejects cross-origin and spoofed localhost POSTs on /api/ in production', async () => {
    for (const badOrigin of [
      'https://malicious.example.com',
      'http://localhost.evil.com',
      'http://127.0.0.1.evil.com',
      'http://localhost@evil.com',
      'not-a-valid-origin',
    ]) {
      const res = await request(app)
        .post('/api/gemini/expand')
        .set('Origin', badOrigin)
        .send({});

      assert.strictEqual(res.status, 403, `Expected 403 for origin: ${badOrigin}`);
      assert.strictEqual(res.body.error, 'Cross-origin requests are not allowed.');
    }
  });

  test('localOriginGuard allows requests with no Origin to reach real handler', async () => {
    const res = await request(app).post('/api/gemini/expand').send({});
    assert.strictEqual(res.status, 400);
  });

  test('localOriginGuard allows exact local Origins and Tauri origin to reach real handler', async () => {
    for (const allowedOrigin of [
      'http://localhost:5173',
      'http://127.0.0.1:3000',
      'tauri://localhost',
    ]) {
      const res = await request(app)
        .post('/api/gemini/expand')
        .set('Origin', allowedOrigin)
        .send({});

      assert.strictEqual(res.status, 400, `Expected handler 400 for origin: ${allowedOrigin}`);
    }
  });

  test('rate limiter blocks after exceeding max requests', async () => {
    const testApp = express();
    testApp.use(express.json());

    const { createRateLimiter } = await import('../server/security.js');

    const limiter = createRateLimiter({
      windowMs: 1000,
      maxRequests: 2,
      skip: () => false,
    });

    testApp.use('/api', limiter);
    testApp.get('/api/test', (_req, res) => {
      res.json({ ok: true });
    });

    let res = await request(testApp).get('/api/test');
    assert.strictEqual(res.status, 200);

    res = await request(testApp).get('/api/test');
    assert.strictEqual(res.status, 200);

    res = await request(testApp).get('/api/test');
    assert.strictEqual(res.status, 429);
    assert.strictEqual(
      res.body.error,
      'Too many AI requests. Please wait a moment and try again.'
    );
  });
});
