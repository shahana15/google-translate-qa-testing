/**
 * TranslatePage.js — Page Object for https://translate.google.com/
 *
 * Design intent:
 *  - Every selector Google's UI exposes lives HERE, and only here.
 *    If Google renames an aria-label or restructures the DOM, this is the
 *    only file that should need edits — the test specs stay untouched.
 *  - Locators prefer accessible attributes (role/name) over CSS classes,
 *    since Google's class names are obfuscated/rebuilt on deploy.
 *
 * Confirmed vs assumptions (updated after live-UI inspection):
 *   translatedOutput — there is NO aria-label "Translated text". Results
 *     live in c-wiz[role=region] with H2 "Translation results"; the string
 *     is span[lang]. Readiness is gated on the "Copy translation" button.
 *   currentSourceLanguageLabel / currentTargetLanguageLabel — still read
 *     the aria-selected tab in the toolbar. Languages chosen via the search
 *     dialog (e.g. Sinhala) may not show a selected quick-tab, so these can
 *     return '' for search-picked languages.
 *   clearSourceText — dedicated button name is still a best guess; keyboard
 *     select-all + delete fallback remains so the suite works either way.
 */

class TranslatePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;

    // --- Core panels -------------------------------------------------
    this.sourceTextarea = page.getByRole('combobox', { name: 'Source text' });
    this.translationResultsRegion = page
      .locator('c-wiz[role="region"]')
      .filter({ has: page.getByRole('heading', { name: 'Translation results' }) });
    this.translatedOutput = this.translationResultsRegion.locator('span[lang]').last();
    this.copyTranslationButton = page.getByRole('button', { name: 'Copy translation' });

    // --- Language controls -------------------------------------------
    this.moreSourceLanguagesButton = page.getByRole('button', { name: 'More source languages' });
    this.moreTargetLanguagesButton = page.getByRole('button', { name: 'More target languages' });
    this.languageSearchBox = page.getByRole('textbox', { name: 'Search languages' });
    this.swapLanguagesButton = page.getByRole('button', { name: /Swap languages/i });
    this.clearSourceButton = page.getByRole('button', { name: /clear (source )?text/i });
  }

  async goto() {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    await this.sourceTextarea.waitFor({ state: 'visible' });
  }

  async enterSourceText(text) {
    await this.sourceTextarea.click();
    await this.sourceTextarea.fill('');
    await this.sourceTextarea.fill(text);
  }

  async getTranslatedText({ timeout = 8000 } = {}) {
    await this.copyTranslationButton.waitFor({ state: 'visible', timeout });
    await this.page.waitForTimeout(800);
    await this.translatedOutput.waitFor({ state: 'visible', timeout: 3000 });
    const text = (await this.translatedOutput.innerText()).trim();
    if (!text) {
      const regionText = (await this.translationResultsRegion.innerText()).trim();
      return regionText.replace(/^Translation results\s*/i, '').trim();
    }
    return text;
  }

  _toolbarFor(moreButton) {
    return this.page.locator('div').filter({ has: moreButton }).first();
  }

  async _selectLanguage(scope, languageName) {
    const moreButton = scope === 'source' ? this.moreSourceLanguagesButton : this.moreTargetLanguagesButton;
    const toolbar = this._toolbarFor(moreButton);
    const quickTab = toolbar.getByRole('tab', { name: languageName, exact: true });

    if (await quickTab.first().isVisible().catch(() => false)) {
      await quickTab.first().click();
      return;
    }

    await moreButton.click();
    await this.languageSearchBox.fill(languageName);
    await this.page.getByRole('option', { name: languageName }).first().click();
  }

  async selectSourceLanguage(languageName) {
    return this._selectLanguage('source', languageName);
  }

  async selectTargetLanguage(languageName) {
    return this._selectLanguage('target', languageName);
  }

  async currentSourceLanguageLabel() {
    const toolbar = this._toolbarFor(this.moreSourceLanguagesButton);
    const selectedTab = toolbar.getByRole('tab', { selected: true });
    if (await selectedTab.first().isVisible().catch(() => false)) {
      return (await selectedTab.first().innerText()).trim();
    }
    return '';
  }

  async currentTargetLanguageLabel() {
    const toolbar = this._toolbarFor(this.moreTargetLanguagesButton);
    const selectedTab = toolbar.getByRole('tab', { selected: true });
    if (await selectedTab.first().isVisible().catch(() => false)) {
      return (await selectedTab.first().innerText()).trim();
    }
    return '';
  }

  async swapLanguages() {
    await this.swapLanguagesButton.click();
  }

  async clearSourceText() {
    if (await this.clearSourceButton.isVisible().catch(() => false)) {
      await this.clearSourceButton.click();
    } else {
      await this.sourceTextarea.click();
      await this.page.keyboard.press('Control+A');
      await this.page.keyboard.press('Delete');
    }
  }

  async getSourceText() {
    return (await this.sourceTextarea.innerText()).trim();
  }

  async coreControlsAreVisible() {
    const checks = await Promise.all([
      this.sourceTextarea.isVisible(),
      this.moreSourceLanguagesButton.isVisible(),
      this.moreTargetLanguagesButton.isVisible(),
      this.swapLanguagesButton.isVisible(),
    ]);
    return checks.every(Boolean);
  }

  async isSourceEmpty() {
    return (await this.getSourceText()) === '';
  }
}

module.exports = { TranslatePage };