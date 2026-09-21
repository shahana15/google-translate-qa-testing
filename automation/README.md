# Google Translate — Playwright Smoke Suite

A small, supplementary automated smoke suite for **https://translate.google.com/**, built with [Playwright Test](https://playwright.dev/) and the Page Object Model.

> **Status:** supplementary. The four required assessment deliverables are the Test Plan, Test Case Document, Bug Report and Test Summary Report. This suite automates five of the most stable smoke flows already covered manually in the test-case workbook. It deliberately does **not** try to automate the full manual pack (298 cases): Google Translate is a live third-party site whose DOM and accessible labels can change without notice, so a large automated suite would be disproportionate for the assessment and prone to flakiness unrelated to product quality.

## Latest verified run

| | |
|---|---|
| Date | 21 September 2026, 11:16 AM |
| Project / browser | `chromium` (Desktop Chrome profile) |
| Result | **5 passed · 0 failed · 0 flaky · 0 skipped** |
| Total time | 48.3 s |
| Evidence | [`evidence/playwright-run-2026-09-21.png`](evidence/playwright-run-2026-09-21.png) |

## What is covered

| Test ID | Scenario | Related manual case |
|---|---|---|
| SMK-AUTO-01 | Home page loads with core controls visible (source box, both language selectors, swap button) | SMK-001 |
| SMK-AUTO-02 | English → Sinhala translation returns non-empty output that differs from the input | SMK-002 |
| SMK-AUTO-03 | English → Tamil translation returns non-empty output that differs from the input | Core translation cases |
| SMK-AUTO-06 | Changing the target language mid-session re-translates to a different result | SMK-003, SMK-009 |
| SMK-AUTO-07 | Clearing the source text empties the source panel | SMK-005 |

Three earlier candidates — swap reverses the language labels, swap carries the output text into the source box, and auto-detect identifies Sinhala input — were **removed** because they did not pass reliably against the live UI (see the note at the top of `tests/smoke.spec.js`). They stay covered by the manual cases (swap: SMK-004, FUNC-T-044, FUNC-T-055; auto-detect: LS-009 to LS-011) and are candidates for a future iteration once their selectors are stable.

## Project structure

```
automation/
├── package.json
├── package-lock.json
├── playwright.config.js
├── pages/
│   └── TranslatePage.js     ← Page Object: every selector AND every query
│                               (visible? empty? what text?) lives here.
│                               Specs never see a raw Locator.
├── fixtures/
│   └── fixtures.js          ← builds and navigates TranslatePage once per test
│                               and injects it as `translatePage`
├── tests/
│   └── smoke.spec.js        ← the five test cases; only call translatePage.*
│                               methods and assert on plain values
├── evidence/
│   └── playwright-run-2026-09-21.png
└── README.md
```

### Page Object Model, applied strictly

- **Separation of concerns** — `tests/smoke.spec.js` describes *behaviour* ("select Sinhala, type text, expect non-empty output"); `pages/TranslatePage.js` is the only file that knows *how* to find or read anything on the page.
- **No locator leakage** — every public method on `TranslatePage` returns a plain boolean or string (`coreControlsAreVisible()`, `isSourceEmpty()`, `getTranslatedText()`), so specs never touch a Playwright `Locator`.
- **One instantiation per test** — the `translatePage` fixture constructs and navigates the page object once and injects it; no spec calls `new TranslatePage(page)`.
- **One place to fix drift** — if Google renames an aria-label or restructures a control, only `TranslatePage.js` changes.
- **Accessible selectors first** — locators prefer role/name over CSS classes, because Google's class names are obfuscated and rebuilt on deploy.

## Prerequisites

- **Node.js 20 or later** (Playwright 1.63 requires it) — check with `node --version`
- **npm** (bundled with Node.js)
- **Git**
- Internet access to `https://translate.google.com/`

## Installation

```bash
# 1. Clone the repository and move into the automation folder
git clone https://github.com/shahana15/google-translate-qa-testing.git
cd google-translate-qa-testing/automation

# 2. Install dependencies (uses the versions pinned in package-lock.json)
npm ci

# 3. Download the Chromium browser used by Playwright
npx playwright install chromium
```

On **Linux** (a fresh machine or CI), install the operating-system libraries Chromium needs as well:

```bash
npx playwright install --with-deps chromium
```

On Windows and macOS, the plain `npx playwright install chromium` is enough.

## Configuration

No API keys, accounts or environment variables are needed — the suite drives the public Google Translate UI. All settings live in `playwright.config.js`:

| Setting | Value | Why |
|---|---|---|
| `baseURL` | `https://translate.google.com/` | Target site |
| `testDir` | `./tests` | Location of specs |
| `timeout` | 30 s per test | Upper bound for one test |
| `expect.timeout` | 8 s | Wait for assertions |
| `actionTimeout` | 10 s | Wait for clicks / fills |
| `workers` / `fullyParallel` | `1` / `false` | Runs serially to avoid rate-limiting and overlapping sessions on a live third-party site |
| `retries` | `1` | Absorbs one transient network hiccup; a test that needed a retry is reported as *flaky* |
| `trace`, `screenshot`, `video` | on failure only | Keeps artefacts small but gives evidence for a bug report |
| `reporter` | `list` + `html` (`open: 'never'`) | Console output plus an HTML report |
| Projects | `chromium` (Desktop Chrome) | Firefox and WebKit are present but commented out |

To add another browser, uncomment its line in the `projects` array of `playwright.config.js`, then run `npx playwright install firefox` (or `webkit`).

## Execution

```bash
# Run all tests, headless (default)
npm test

# Watch the tests run in a visible browser window
npm run test:headed

# Open the HTML report from the last run
npm run test:report

# Run a single test by name
npx playwright test -g "SMK-AUTO-02"

# Record fresh selectors against the live site (see "Maintenance" below)
npm run codegen
```

Expected outcome of a healthy run:

```
5 passed (≈ 48s)
```

## Reading the results

- **Console** — one line per test with pass/fail and timing.
- **HTML report** — `npm run test:report` opens `playwright-report/index.html`.
- **If a test fails** — Playwright automatically saves a screenshot, video and trace to `test-results/`. Attach these to a GitHub Issue exactly as for a manually found defect; a failing automated check is valid evidence for the Bug Report.

`test-results/` and `playwright-report/` are regenerated on every run and are git-ignored (see `.gitignore`), so they are not committed.

## Maintenance

Google can change accessible labels without notice. If tests that previously passed start failing on a *locator* (timeout waiting for an element), run `npm run codegen`, click through the same flow, compare the selectors Playwright suggests with `pages/TranslatePage.js`, and update only that file. Notes recorded in `TranslatePage.js`:

- The translated text is read from the results region (heading "Translation results"); there is no "Translated text" aria-label.
- The dedicated clear-button name is a best guess, so `clearSourceText()` falls back to select-all + delete, which works either way.
- The selected-language helpers read the toolbar's selected tab and can return an empty string for languages chosen through the search dialog rather than a quick tab.

## Known limitations

- Chromium only; Firefox and WebKit are configured but disabled.
- Assertions check that output is **non-empty and different from the input** — never an exact translated string, because machine-translation output is not deterministic (Test Plan §4.2).
- Runs against the live production site, so a failure can also mean the site was slow, rate-limited or changed.
