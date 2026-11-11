import assert from 'node:assert/strict';
import { once } from 'node:events';
import { test } from 'node:test';
import { createApp } from '../server.ts';
import { ProjectState } from '../src/types/project.js';

test('specValidateRoute: validates project state and identifies missing elements', async () => {
  const app = await createApp();
  const server = app.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const address = server.address();
  assert.ok(address && typeof address !== 'string');
  const base = `http://127.0.0.1:${address.port}`;

  const validProject: ProjectState = {
    id: 'test-123',
    appName: 'Valid App',
    tagline: 'A cool app',
    coreIdea: 'This is a core idea.',
    targetPlatform: 'desktop',
    features: ['Feature 1', 'Feature 2'],
    groundRules: { offlineFirst: true, highPerformance: true, localPrivacy: true, darkModeDefault: true },
    clarifications: [],
    proConfig: {
      stackSummary: 'React',
      architectureStyle: 'MVC',
      testingStrategy: 'TDD',
      securityBoundary: 'Local',
      taskSlicingMode: 'hitl-first',
      customRules: [],
      templateVariables: {}
    },
    workflowProgress: {
      stitchDone: true,
      builderDone: false,
      polishDone: false
    },
    lastUpdated: new Date().toISOString()
  };

  try {
    // Test 1: Complete valid payload
    const res1 = await fetch(`${base}/api/specs/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validProject)
    });
    assert.equal(res1.status, 200);
    const data1 = await res1.json();
    assert.equal(data1.valid, true);
    assert.equal(data1.warnings.length, 0);
    assert.equal(data1.score, 100);

    // Test 2: Missing appName/coreIdea
    const missingCoreProject = { ...validProject, appName: '', coreIdea: '' };
    const res2 = await fetch(`${base}/api/specs/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(missingCoreProject)
    });
    assert.equal(res2.status, 200);
    const data2 = await res2.json();
    assert.equal(data2.valid, false); // should be false if coreIdea or appName missing
    assert.ok(data2.warnings.some((w: any) => w.code === 'MISSING_APP_NAME'));
    assert.ok(data2.warnings.some((w: any) => w.code === 'MISSING_CORE_IDEA'));

    // Test 3: Empty features
    const emptyFeaturesProject = { ...validProject, features: [] };
    const res3 = await fetch(`${base}/api/specs/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(emptyFeaturesProject)
    });
    const data3 = await res3.json();
    assert.equal(data3.valid, true); // Still valid if score > 50 and core elements exist
    assert.ok(data3.warnings.some((w: any) => w.code === 'EMPTY_FEATURES'));

    // Test 4: Unresolved tokens
    const tokensProject = {
      ...validProject,
      coreIdea: 'My app is {{app_type}} with {{missing}}',
      proConfig: {
        ...validProject.proConfig,
        templateVariables: { app_type: 'app_type', missing: 'missing' }
      }
    };
    const res4 = await fetch(`${base}/api/specs/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tokensProject)
    });
    const data4 = await res4.json();
    assert.ok(data4.warnings.some((w: any) => w.code === 'UNRESOLVED_TOKENS'));

    // Test 5: Missing visual direction when stitchDone is false
    const missingStitchProject = { ...validProject, workflowProgress: { stitchDone: false, builderDone: false, polishDone: false } };
    const res5 = await fetch(`${base}/api/specs/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(missingStitchProject)
    });
    const data5 = await res5.json();
    assert.ok(data5.warnings.some((w: any) => w.code === 'MISSING_STITCH_UI'));

    // Test 6: Malformed payload
    const res6 = await fetch(`${base}/api/specs/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });
    assert.equal(res6.status, 400);
  } finally {
    server.close();
  }
});
