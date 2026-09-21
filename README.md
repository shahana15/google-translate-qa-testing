# Google Translate – QA Assessment

**Candidate:** Shahana Sivasubramanium
**Position:** QA Engineer
**Prepared for:** WireApps
**Application tested:** https://translate.google.com/ (web, desktop and mobile browser)

This repository has my QA assessment for Google Translate: the test plan, test cases, bug report, test summary report and a small Playwright automation suite.

## Deliverables

| # | Deliverable | Location |
|---|---|---|
| 1 | Test Plan (v1.8) | [01_Test_Plan](01_Test_Plan/) |
| 2 | Test Case Document (298 cases: 288 executable, 10 designed but not executed) | [02_Test_Cases](02_Test_Cases/) |
| 3 | Bug Report – 19 GitHub Issues (11 defects, 8 enhancements) | [GitHub Issues](https://github.com/shahana15/google-translate-qa-testing/issues) and [index](03_Bug_Report/Bug_Report_Summary.md) |
| 4 | Test Summary Report | [04_Test_Summary_Report](04_Test_Summary_Report/Test_Summary_Report.md) |
| + | Playwright smoke tests (5 tests, all passing) | [automation](automation/) |

## Results

- 288 executable cases: 237 executed, 213 passed, 12 failed
- 6 blocked and 45 deferred, each with a reason in the Comments column
- 10 API, performance, load, spike and security cases were designed but not run, because the site is a live third-party service
- 11 defects (8 Medium, 2 Low, 1 not labelled) and 8 enhancement requests
- Recommendation: conditional acceptance (see the Test Summary Report)

## Running the automation tests

You need Node.js 20 or later, npm and Git.

```bash
git clone https://github.com/shahana15/google-translate-qa-testing.git
cd google-translate-qa-testing/automation
npm ci
npx playwright install chromium
npm test
```

Other commands: `npm run test:headed` (visible browser) and `npm run test:report` (HTML report).

**Configuration:** none needed. There are no API keys or environment variables. Settings are in `automation/playwright.config.js`.

**Expected result:** `5 passed`. More detail is in [automation/README.md](automation/README.md).
