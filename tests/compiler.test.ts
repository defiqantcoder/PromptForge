import test from 'node:test';
import assert from 'node:assert/strict';
import {
  compileSpecMd,
  compilePlanMd,
  compileTasksMd,
  compileAgentsMd,
  compilePlatformContract,
} from '../src/services/compiler.ts';
import { ProjectState } from '../src/types/project.ts';

const mockState: ProjectState = {
  id: 'test-1',
  appName: 'TestApp',
  tagline: 'A cool test app',
  coreIdea: 'Testing compiler functions',
  targetPlatform: 'desktop',
  features: ['Feature 1', 'Feature 2'],
  groundRules: {
    offlineFirst: true,
    highPerformance: true,
    localPrivacy: true,
    darkModeDefault: true,
  },
  clarifications: [
    {
      id: 'cl-1',
      category: 'Test Category',
      question: 'Test Question?',
      options: ['Option 1', 'Option 2'],
      selectedAnswer: 'Option 1',
    }
  ],
  proConfig: {
    stackSummary: 'Test Stack',
    architectureStyle: 'Test Architecture',
    testingStrategy: 'Test Testing',
    securityBoundary: 'Test Security',
    taskSlicingMode: 'hitl-first',
    customRules: ['Custom Rule 1', 'Custom Rule 2'],
    templateVariables: {
      accent_color: '#FF0000',
      primary_model: 'test-model',
      target_os: 'test-os',
      export_dir: 'test-dir'
    },
  },
  lastUpdated: new Date().toISOString(),
};

test('compiler test suite', async (t) => {
  await t.test('compileAgentsMd outputs all 10 required sections and interpolates variables', () => {
    const agentsMd = compileAgentsMd(mockState);
    assert.match(agentsMd, /## 1. Product/);
    assert.match(agentsMd, /## 2. Stack/);
    assert.match(agentsMd, /## 3. Repository Structure/);
    assert.match(agentsMd, /## 4. Commands/);
    assert.match(agentsMd, /## 5. Architecture/);
    assert.match(agentsMd, /## 6. Coding Conventions/);
    assert.match(agentsMd, /## 7. Testing/);
    assert.match(agentsMd, /## 8. Security/);
    assert.match(agentsMd, /## 9. Workflow & Clarification Decisions/);
    assert.match(agentsMd, /## 10. Generated Files/);
    assert.match(agentsMd, /Custom Rule 1/);
    assert.match(agentsMd, /#FF0000/);
  });

  await t.test('compileSpecMd generates EARS-formatted requirements and ground rules', () => {
    const specMd = compileSpecMd(mockState);
    assert.match(specMd, /When the user interacts with the workspace to feature 1, the system shall/);
    assert.match(specMd, /When the user interacts with the workspace to feature 2, the system shall/);
    assert.match(specMd, /offline resilience/i);
    assert.match(specMd, /latency budget/i);
    assert.match(specMd, /local security boundary/i);
    assert.match(specMd, /graceful recovery/i);
    assert.match(specMd, /Option 1/);
  });

  await t.test('compileTasksMd respects taskSlicingMode', () => {
    const tasksMdHitl = compileTasksMd(mockState);
    assert.match(tasksMdHitl, /\(HITL\)/);

    const stateAfk = { ...mockState, proConfig: { ...mockState.proConfig, taskSlicingMode: 'afk-autonomous' as const } };
    const tasksMdAfk = compileTasksMd(stateAfk);
    assert.match(tasksMdAfk, /\(AFK\)/);
  });

  await t.test('compilePlatformContract returns non-empty contracts for all platforms', () => {
    const platforms = ['stitch', 'aistudio', 'antigravity', 'copilot', 'canvas'] as const;
    platforms.forEach(platform => {
      const contract = compilePlatformContract(mockState, platform);
      assert.ok(contract.title.length > 0);
      assert.ok(contract.subtitle.length > 0);
      assert.ok(contract.badge.length > 0);
      assert.ok(contract.promptText.length > 0);
    });
  });

  await t.test('Edge cases: empty features, clarifications, and undefined template variables do not throw', () => {
    const emptyState = { ...mockState, features: [], clarifications: [], proConfig: { ...mockState.proConfig, templateVariables: {} } };
    assert.doesNotThrow(() => compileSpecMd(emptyState));
    assert.doesNotThrow(() => compileAgentsMd(emptyState));
    assert.doesNotThrow(() => compilePlatformContract(emptyState, 'stitch'));
  });

  await t.test('compileSpecMd normalizes feature line breaks to prevent list splitting', () => {
    const multilineState = { ...mockState, features: ['Export report\n- Delete records'] };
    const specMd = compileSpecMd(multilineState);
    assert.match(specMd, /1\. Export report - Delete records/);
    assert.doesNotMatch(specMd, /\n- Delete records/);
  });

  await t.test('compiler injects codingLanguage, Stitch UI direction/results, and recommends next workflow app', async () => {
    const { recommendBuildWorkflow } = await import('../src/services/compiler.ts');
    const richState: ProjectState = {
      ...mockState,
      targetPlatform: 'web',
      codingLanguage: 'typescript-react',
      codingLanguageNote: 'Prefer Radix primitives and Tailwind utilities',
      stitchUi: {
        visualDirection: 'Editorial dark dashboard with floating glass rails',
        uiClarifications: [
          {
            id: 'ui-1',
            category: 'Density',
            question: 'How dense?',
            options: ['Balanced whitespace'],
            selectedAnswer: 'Balanced whitespace',
          },
        ],
        ideaImages: [],
        uploadedResultName: 'stitch-export.html',
        uploadedResultContent: '<main><h1>Dashboard</h1></main>',
        uploadedResultNotes: 'Wire state filters to sidebar',
      },
    };

    const agentsMd = compileAgentsMd(richState);
    assert.match(agentsMd, /TypeScript \+ React/);
    assert.match(agentsMd, /Prefer Radix primitives/);

    const stitchContract = compilePlatformContract(richState, 'stitch');
    assert.match(stitchContract.promptText, /Editorial dark dashboard/);
    assert.match(stitchContract.promptText, /Balanced whitespace/);

    const webWorkflow = recommendBuildWorkflow(richState);
    assert.equal(webWorkflow.nextAppId, 'aistudio');
    assert.match(webWorkflow.nextPrompt, /stitch-export\.html/);
    assert.match(webWorkflow.nextPrompt, /Dashboard/);

    const rustWorkflow = recommendBuildWorkflow({
      ...richState,
      targetPlatform: 'desktop',
      codingLanguage: 'rust-tauri',
    });
    assert.equal(rustWorkflow.nextAppId, 'antigravity');
  });
});
