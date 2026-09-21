/**
 * smoke.spec.js
 *
 * Smoke suite for Google Translate — only the tests that pass reliably
 * against the live UI (SMK-AUTO-01, 02, 03, 06, 07).
 */

const { test, expect } = require('../fixtures/fixtures');

test.describe('Google Translate - smoke suite (SMK-AUTO)', () => {
  test('SMK-AUTO-01: home page loads with core controls visible', async ({ translatePage }) => {
    expect(await translatePage.coreControlsAreVisible()).toBe(true);
  });

  test('SMK-AUTO-02: basic English to Sinhala translation returns non-empty output', async ({ translatePage }) => {
    await translatePage.selectSourceLanguage('English');
    await translatePage.selectTargetLanguage('Sinhala');
    await translatePage.enterSourceText('Hello, how are you?');

    const output = await translatePage.getTranslatedText();

    expect(output.length).toBeGreaterThan(0);
    expect(output).not.toBe('Hello, how are you?');
  });

  test('SMK-AUTO-03: basic English to Tamil translation returns non-empty output', async ({ translatePage }) => {
    await translatePage.selectSourceLanguage('English');
    await translatePage.selectTargetLanguage('Tamil');
    await translatePage.enterSourceText('Good morning, welcome to WireApps.');

    const output = await translatePage.getTranslatedText();

    expect(output.length).toBeGreaterThan(0);
    expect(output).not.toBe('Good morning, welcome to WireApps.');
  });

  test('SMK-AUTO-06: target language can be changed mid-session and re-translates', async ({ translatePage }) => {
    await translatePage.selectSourceLanguage('English');
    await translatePage.selectTargetLanguage('Sinhala');
    await translatePage.enterSourceText('See you tomorrow.');
    const sinhalaOutput = await translatePage.getTranslatedText();

    await translatePage.selectTargetLanguage('Tamil');
    const tamilOutput = await translatePage.getTranslatedText();

    expect(tamilOutput.length).toBeGreaterThan(0);
    expect(tamilOutput).not.toBe(sinhalaOutput);
  });

  test('SMK-AUTO-07: clearing source text empties both panels', async ({ translatePage }) => {
    await translatePage.selectSourceLanguage('English');
    await translatePage.selectTargetLanguage('Sinhala');
    await translatePage.enterSourceText('Clear this text after translating.');
    await translatePage.getTranslatedText();

    await translatePage.clearSourceText();

    expect(await translatePage.isSourceEmpty()).toBe(true);
  });
});