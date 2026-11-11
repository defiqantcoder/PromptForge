import { describe, test, before, after } from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
import { createApp } from "../server.js";
import express from 'express';

describe('Server Security Middleware', () => {
  let app: express.Express;

  before(async () => {
    process.env.NODE_ENV = 'production'; // Prevents Vite from starting
    process.env.GEMINI_API_KEY = 'test-key';
    app = await createApp();
  });

  after(() => {
    delete process.env.GEMINI_API_KEY;
    delete process.env.NODE_ENV;
  });

  test('security headers are present on /api/ routes', async () => {
    const res = await request(app).get('/api/test-route-not-found');
    assert.strictEqual(res.headers['x-content-type-options'], 'nosniff');
    assert.strictEqual(res.headers['x-frame-options'], 'DENY');
    assert.strictEqual(res.headers['referrer-policy'], 'no-referrer');
    assert.strictEqual(res.headers['cross-origin-resource-policy'], 'same-origin');
  });

  test('localOriginGuard rejects cross-origin POST on /api/ in production', async () => {
    const res = await request(app)
      .post('/api/gemini/scaffold')
      .set('Origin', 'https://malicious.example.com')
      .send({ prompt: 'test' });

    assert.strictEqual(res.status, 403);
    assert.strictEqual(res.body.error, 'Cross-origin requests are not allowed.');
  });

  test('localOriginGuard allows requests with no Origin', async () => {
    const res = await request(app)
      .post('/api/gemini/scaffold')
      .send({ prompt: 'test' });

    assert.notStrictEqual(res.status, 403);
  });

  test('localOriginGuard allows local Origins', async () => {
    const res = await request(app)
      .post('/api/gemini/scaffold')
      .set('Origin', 'http://localhost:5173')
      .send({ prompt: 'test' });

    assert.notStrictEqual(res.status, 403);
  });

  test('rate limiter blocks after exceeding max requests', async () => {
    const testApp = express();
    testApp.use(express.json());

    const { createRateLimiter } = await import('../server/security.js');

    const limiter = createRateLimiter({
      windowMs: 1000,
      maxRequests: 2,
      skip: () => false
    });

    testApp.use('/api', limiter);
    testApp.get('/api/test', (req, res) => { res.json({ ok: true }); });

    let res = await request(testApp).get('/api/test');
    assert.strictEqual(res.status, 200);

    res = await request(testApp).get('/api/test');
    assert.strictEqual(res.status, 200);

    res = await request(testApp).get('/api/test');
    assert.strictEqual(res.status, 429);
    assert.strictEqual(res.body.error, 'Too many AI requests. Please wait a moment and try again.');
  });
});
