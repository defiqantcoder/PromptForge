import { after, before, describe, it } from 'node:test';
import assert from 'node:assert';
import express from 'express';
import { createApp } from '../server.ts';

describe('Archive Route (POST /api/export/bundle)', () => {
  let app: express.Application;
  let server: any;
  let port: number;
  const originalEnv = process.env.NODE_ENV;

  before(async () => {
    process.env.NODE_ENV = 'test';
    app = await createApp();
    await new Promise<void>((resolve) => {
      server = app.listen(0, '127.0.0.1', () => {
        port = server.address().port;
        resolve();
      });
    });
  });

  after(async () => {
    if (originalEnv === undefined) delete process.env.NODE_ENV;
    else process.env.NODE_ENV = originalEnv;
    if (server) {
      await new Promise<void>((resolve, reject) =>
        server.close((err: unknown) => (err ? reject(err) : resolve()))
      );
    }
  });

  const fetchBundle = async (body: unknown) => {
    return fetch(`http://127.0.0.1:${port}/api/export/bundle`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  };

  it('rejects invalid, missing, or array files payloads', async () => {
    for (const payload of [{}, { files: [] }]) {
      const res = await fetchBundle(payload);
      assert.strictEqual(res.status, 400);
      const data = await res.json();
      assert.strictEqual(data.error, 'Missing or invalid "files" object.');
    }
  });

  it('rejects files outside allowlist', async () => {
    const res = await fetchBundle({ files: { 'evil.sh': 'echo pwned' } });
    assert.strictEqual(res.status, 400);
    const data = await res.json();
    assert.match(data.error, /Invalid file name/);
  });

  it('rejects path traversal attempts', async () => {
    const res = await fetchBundle({ files: { '../plan.md': 'content' } });
    assert.strictEqual(res.status, 400);
    const data = await res.json();
    assert.match(data.error, /Invalid file name/);
  });

  it('handles non-string appName safely without throwing', async () => {
    const res = await fetchBundle({
      appName: 12345,
      files: { 'spec.md': '# Spec' },
    });
    assert.strictEqual(res.status, 200);
    assert.strictEqual(
      res.headers.get('content-disposition'),
      'attachment; filename="project-spec-bundle.zip"'
    );
  });

  it('creates valid ZIP bundle with allowed files and SHA256SUMS.txt', async () => {
    const res = await fetchBundle({
      appName: 'Test App!',
      files: {
        'plan.md': 'My plan',
        'spec.md': 'My spec',
        'COLLABORATION.md': 'My multi-agent board',
        '.continuerules': 'My local agent rules',
      },
    });

    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.headers.get('content-type'), 'application/zip');
    assert.strictEqual(
      res.headers.get('content-disposition'),
      'attachment; filename="test-app--spec-bundle.zip"'
    );

    const buffer = Buffer.from(await res.arrayBuffer());
    assert.strictEqual(buffer.readUInt32LE(0), 0x04034b50);

    const zipStr = buffer.toString('utf-8');
    assert.ok(zipStr.includes('plan.md'));
    assert.ok(zipStr.includes('spec.md'));
    assert.ok(zipStr.includes('SHA256SUMS.txt'));
    assert.ok(zipStr.includes('My plan'));
    assert.ok(zipStr.includes('My spec'));
  });
});
