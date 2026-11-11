import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DEFAULT_PROJECT_STATE,
  STARTER_TEMPLATES,
  FALLBACK_RANDOM_IDEAS,
} from '../src/services/presets.ts';
import { TOOLTIP_DICTIONARY } from '../src/services/tooltips.ts';

test('presets test suite', async (t) => {
  await t.test('TOOLTIP_DICTIONARY coverage', () => {
    Object.keys(TOOLTIP_DICTIONARY).forEach((key) => {
      const entry = TOOLTIP_DICTIONARY[key];
      assert.ok(entry.title.trim().length > 0, `Tooltip ${key} must have a non-empty title`);
      assert.ok(entry.description.trim().length > 0, `Tooltip ${key} must have a non-empty description`);
      assert.ok(entry.aiUsage.trim().length > 0, `Tooltip ${key} must have a non-empty aiUsage`);
    });
  });

  await t.test('DEFAULT_PROJECT_STATE coverage', () => {
    assert.ok(DEFAULT_PROJECT_STATE.appName.length > 0);
    assert.ok(DEFAULT_PROJECT_STATE.features.length > 0);
  });

  await t.test('STARTER_TEMPLATES coverage', () => {
    assert.ok(STARTER_TEMPLATES.length > 0);
    STARTER_TEMPLATES.forEach(template => {
      assert.ok(template.name.length > 0);
      assert.ok(template.state.appName.length > 0);
    });
  });

  await t.test('FALLBACK_RANDOM_IDEAS coverage', () => {
    assert.ok(FALLBACK_RANDOM_IDEAS.length > 0);
    FALLBACK_RANDOM_IDEAS.forEach(idea => {
      assert.ok(idea.appName.length > 0);
      assert.ok(idea.coreIdea.length > 0);
    });
  });

  await t.test('CODING_LANGUAGES and recent 3 blueprints helpers', async () => {
    const {
      CODING_LANGUAGES,
      MAX_RECENT_BLUEPRINTS,
      createInitialRecentBlueprints,
      upsertRecentBlueprint,
    } = await import('../src/services/presets.ts');

    assert.equal(MAX_RECENT_BLUEPRINTS, 3);
    assert.ok(CODING_LANGUAGES.length >= 8);
    CODING_LANGUAGES.forEach((lang) => {
      assert.ok(lang.bestFor.length > 0);
      assert.ok(lang.tradeoffs.length > 0);
    });

    const initial = createInitialRecentBlueprints();
    assert.equal(initial.length, 3);

    const customProject = {
      ...DEFAULT_PROJECT_STATE,
      id: 'custom-recent-99',
      appName: 'BrandNewStudio',
      lastUpdated: new Date().toISOString(),
    };
    const updated = upsertRecentBlueprint(initial, customProject);
    assert.equal(updated.length, 3);
    assert.equal(updated[0].id, 'custom-recent-99');
    assert.equal(updated[0].name, 'BrandNewStudio');
  });
});
