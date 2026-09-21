# Google Translate — QA Assessment (Web, Desktop & Mobile Browser)

**Candidate:** Shahana Sivasubramanium
**Position applied for:** QA Engineer
**Prepared for:** WireApps
**Application under test:** https://translate.google.com/
**Assessment window:** 3 days · **Submission date:** 21 September 2026

This repository contains the complete QA assessment for Google Translate (web): planning, test design, execution, defect reporting and closure, plus a small supplementary Playwright automation suite.

## Deliverables

| # | Deliverable | Location |
|---|---|---|
| 1 | **Test Plan** (v1.8) | [`01_Test_Plan/`](01_Test_Plan/) |
| 2 | **Test Case Document** (v8 workbook — 298 cases: 288 executable + 10 designed-not-executed) | [`02_Test_Cases/`](02_Test_Cases/) |
| 3 | **Bug Report** — 19 GitHub Issues (11 defects, 8 enhancements) | [GitHub Issues](https://github.com/shahana15/google-translate-qa-testing/issues) · index: [`03_Bug_Report/Bug_Report_Summary.md`](03_Bug_Report/Bug_Report_Summary.md) |
| 4 | **Test Summary Report** | [`04_Test_Summary_Report/Test_Summary_Report.md`](04_Test_Summary_Report/Test_Summary_Report.md) |
| + | Supplementary Playwright smoke suite (5 tests, all passing) | [`automation/`](automation/) |

## Results at a glance

| | |
|---|---|
| Executable cases | 288 |
| Executed (Pass + Fail + Observation) | 237 (82.3 %) |
| Passed / Failed | 213 / 12 — 94.7 % pass rate |
| Blocked / Deferred | 6 / 45 (each with a recorded reason) |
| Designed, deliberately not executed (API, performance, load, spike, security) | 10 |
| Defects raised | 11 (0 Critical, 0 High, 8 Medium, 2 Low, 1 unlabelled) |
| Enhancement requests raised | 8 |
| Automated smoke run (21 Sep 2026, Chromium) | 5 passed, 0 failed, 0 flaky |
| Recommendation | Conditional acceptance — see the Test Summary Report |

## Repository structure

```
google-translate-qa-testing/
├── README.md                          ← this file
├── 01_Test_Plan/                      ← Test Plan
├── 02_Test_Cases/                     ← Test Case Document (Excel workbook)
├── 03_Bug_Report/
│   └── Bug_Report_Summary.md          ← index of all 19 GitHub Issues + traceability
├── 04_Test_Summary_Report/
│   └── Test_Summary_Report.md
└── automation/                        ← Playwright smoke suite
    ├── README.md                      ← full automation documentation
    ├── package.json · package-lock.json · playwright.config.js
    ├── pages/TranslatePage.js         ← Page Object
    ├── fixtures/fixtures.js
    ├── tests/smoke.spec.js
    └── evidence/                      ← screenshot of the latest passing run
```

## How to review this submission

1. Read the **Test Plan** for scope, approach, risk-based priorities and entry/exit criteria.
2. Open the **Test Case Document**. Start with the `00_Readme` tab (column and status definitions), then the module tabs. Each case has ID, Description (the *why*), Priority, Preconditions, Test Data, Steps, Expected Result, Actual Result, Status and Bug ID. Test data items are on the `Test_Data` tab.
3. Follow any **Bug ID** link to the GitHub Issue for reproduction steps and evidence, or use `03_Bug_Report/Bug_Report_Summary.md` for the full index.
4. Read the **Test Summary Report** for results, findings, what was *not* tested and why, and recommendations.
5. Optionally run the automation suite (below).

### Status values used in the workbook

| Status | Meaning |
|---|---|
| Pass | Every stated expected result was met |
| Fail | A stated expected result was not met — a GitHub Issue is linked in Bug ID |
| Blocked | Could not be executed because a dependency (device, tool, test data, reviewer) was unavailable |
| Deferred | Consciously not reached within the assessment window; reason recorded in Comments |
| Observation Recorded | Exploratory charters and DevTools observations — behaviour recorded, no pass/fail verdict |
| Designed — Not Executed | API / performance / load / spike / security cases designed but not run against a live third-party production service |

No case is marked Pass without having been executed.

## Running the automation suite

Full details are in [`automation/README.md`](automation/README.md). Quick start:

**Prerequisites:** Node.js 20+, npm, Git, internet access.

```bash
git clone https://github.com/shahana15/google-translate-qa-testing.git
cd google-translate-qa-testing/automation

npm ci                              # install pinned dependencies
npx playwright install chromium     # download the test browser
                                    # (Linux: npx playwright install --with-deps chromium)

npm test                            # run headless
npm run test:headed                 # run in a visible browser
npm run test:report                 # open the HTML report
```

**Configuration:** none required — no API keys or environment variables. Settings (base URL, timeouts, serial execution, retries, failure artefacts, browser projects) are in `automation/playwright.config.js`.

**Expected result:** `5 passed`. If a test fails, screenshots, video and a trace are saved to `automation/test-results/`; attach them to a GitHub Issue.

## Approach in brief

- **Manual, black-box functional and UI testing**, plus exploratory testing and error guessing.
- **Design techniques:** equivalence partitioning, boundary-value analysis (limit confirmed empirically at 5,000 characters), state-transition testing.
- **Risk-based execution:** the Priority column (High → Medium → Low) drove execution order.
- **No exact translation string is ever asserted** — machine-translation output varies. Meaning is judged with native-speaker review where available and otherwise recorded as "not assessed".
- **Ethical testing:** Share and feedback dialogs were exercised without submitting artificial feedback to a live service; API, load and security testing were designed but not run against a third-party production system.

## Tools

Excel (test cases) · GitHub Issues (defects) · Chrome and a real Android device · Chrome DevTools (network, console, offline and throttling) · Playwright (automation) · Markdown / GitHub (documentation).
