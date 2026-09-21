/**
 * fixtures.js — extends Playwright's base `test` with a ready-to-use
 * `translatePage` fixture.
 *
 * Why this exists: without it, every spec has to write
 *   const translate = new TranslatePage(page); await translate.goto();
 * itself — which is exactly the kind of setup duplication POM is supposed
 * to eliminate. With a fixture, the page object is constructed and
 * navigated ONCE per test, automatically, and injected by name.
 */

const base = require('@playwright/test');
const { TranslatePage } = require('../pages/TranslatePage');

exports.test = base.test.extend({
  translatePage: async ({ page }, use) => {
    const translatePage = new TranslatePage(page);
    await translatePage.goto();
    await use(translatePage);
  },
});

exports.expect = base.expect;
