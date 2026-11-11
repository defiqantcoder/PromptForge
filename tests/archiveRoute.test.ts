import { describe, it, before, after } from 'node:test';
import assert from 'node:assert';
import express from 'express';
import { registerArchiveRoutes } from '../server/archiveRoute.ts';

describe('Archive Route (POST /api/export/bundle)', () => {
  let app: express.Application;
  let server: any;
  let port: number;

  before(async () => {
    app = express();
    app.use(express.json());
    registerArchiveRoutes(app);
    await new Promise<void>((resolve) => {
      server = app.listen(0, () => {
        port = server.address().port;
        resolve();
      });
    });
  });

  after(() => {
    if (server) {
      server.close();
    }
  });

  const fetchBundle = async (body: any) => {
    return fetch(`http://localhost:${port}/api/export/bundle`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  };

  it('rejects invalid or missing files object', async () => {
    const res = await fetchBundle({});
    assert.strictEqual(res.status, 400);
    const data = await res.json();
    assert.strictEqual(data.error, 'Missing or invalid "files" object.');
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

  it('creates valid ZIP bundle with allowed files and SHA256SUMS.txt', async () => {
    const res = await fetchBundle({
      appName: 'Test App!',
      files: {
        'plan.md': 'My plan',
        'spec.md': 'My spec',
      },
    });

    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.headers.get('content-type'), 'application/zip');
    assert.strictEqual(res.headers.get('content-disposition'), 'attachment; filename="test-app--spec-bundle.zip"');

    const buffer = Buffer.from(await res.arrayBuffer());

    // Check ZIP headers (PK\x03\x04)
    assert.strictEqual(buffer.readUInt32LE(0), 0x04034b50);

    // Convert buffer to string to check for contents loosely
    const zipStr = buffer.toString('utf-8');
    assert.ok(zipStr.includes('plan.md'));
    assert.ok(zipStr.includes('spec.md'));
    assert.ok(zipStr.includes('SHA256SUMS.txt'));
    assert.ok(zipStr.includes('My plan'));
    assert.ok(zipStr.includes('My spec'));
  });
});
