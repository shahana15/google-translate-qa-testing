# Test Summary Report — Google Translate Web (Desktop & Mobile Browser)

| | |
|---|---|
| **Project** | QA Assessment – Google Translate Web (Desktop & Mobile Browser), https://translate.google.com/ |
| **Prepared by** | Shahana Sivasubramanium |
| **Role applied for** | QA Engineer |
| **Client / Reviewer** | WireApps |
| **Report version** | 1.0 |
| **Report date** | 21 September 2026 |
| **Test Plan** | v1.8 (21 September 2026) |
| **Test Case Document** | v8 workbook — 298 rows (288 executable + 10 designed-not-executed) |
| **Bug Report** | GitHub Issues — https://github.com/shahana15/google-translate-qa-testing/issues (19 issues) |

---

## 1. Executive Summary

Google Translate's core text-translation function works reliably for the English, Sinhala and Tamil content tested. **44 of the 48 High-priority cases passed**; the other four are two logged defects (#2, #11), one deferred deep-link case (URL-002) and one blocked Firefox smoke case (SMK-007 — Firefox was not available). The passing High-priority cases cover: the site loading, translation from English into Sinhala and Tamil (and between Sinhala and Tamil) returning output in the correct script, language selection, search, auto-detect (English, Sinhala and Tamil input), swap, clear, copy and the 5,000-character limit (confirmed and tested at 4,999, 5,000 and over the limit). The site was also exercised on a real Android device in Chrome Mobile, where core translation worked.

**288 executable cases were designed; 237 (82.3 %) were executed and 51 were not.** Of the 225 cases with a pass/fail verdict, **213 passed and 12 failed (94.7 % pass rate)**. The 12 failing cases produced **11 defects**; the assessment also produced **8 usability/enhancement requests**, giving **19 GitHub Issues in total**. **No defect was labelled above Medium severity.**

The defects are concentrated in three areas rather than in the core translation path:

1. **Sinhala/Tamil translation quality and text handling** — a delivery-order sentence loses its commercial meaning in Tamil (#2), punctuation is dropped (#3), a Sinhala phrase in mixed input is left untranslated (#16), a presentation term is transliterated rather than translated (#7), and Tamil text copied out of a translated PDF is corrupted on paste (#10).
2. **Voice input** — the source text is locked while the microphone is listening (#4), the microphone can stay stuck in the listening state with background noise (#6), and a Tamil long vowel is not distinguished (#5).
3. **Images mode** — a previously translated image can remain displayed after a new image is pasted (#11), and the quick-access language tabs do not switch the language on a single click (#13).

**Recommendation: Conditional acceptance.** The product is suitable for everyday English/Sinhala/Tamil text translation. Users should be warned that Sinhala/Tamil output can lose meaning for figurative, commercial or mixed-language text, and the Images-mode and voice-input defects should be fixed before those modes are relied upon. Accessibility, all Firefox/cross-browser checks and several UI/URL checks were **not executed** (§8), so no conclusion is drawn about them.

---

## 2. Scope Tested

Testing followed the approach in Test Plan v1.8 (approach unchanged since v1.7): manual, black-box functional and UI testing plus exploratory testing, using equivalence partitioning, boundary-value analysis, state-transition testing and error guessing.

| In scope and tested | Not tested (by design — see Test Plan §3.2, §4.4) |
|---|---|
| Text translation (EN, SI, TA), auto-detect, swap, character limit | Native Android/iOS apps |
| Language selection and search | Languages other than English/Sinhala/Tamil |
| Clear, copy, listen, voice input, star/save, history, share, details, rating, Send feedback | Full API-contract testing |
| Images, Documents and Websites modes; handwriting/on-screen keyboard input pad | Performance, load and spike testing |
| Boundary and negative input; offline and slow-network behaviour | Security / penetration testing |
| Sinhala/Tamil localization; UAT-style user journeys | — |
| Real Android device (Chrome Mobile) | — |
| DevTools Network/Console **observation** (not API testing) | — |

Ten API, performance, load, spike and security cases were **designed but deliberately not executed** (Test Plan §4.4) — the target is a live third-party production service with no test environment, agreed thresholds or authorisation for intrusive testing. They carry no pass/fail result.

---

## 3. Test Environment

| Item | Detail |
|---|---|
| Application under test | https://translate.google.com/ (live production service — results reflect behaviour on the execution dates) |
| Desktop OS | Windows 11, version 25H2 |
| Primary browser | Google Chrome 153.0.8010.48 (64-bit) |
| Secondary browser | Mozilla Firefox — **not used** (not available during execution) |
| Real mobile device | Physical Android phone, Android 14, Chrome Mobile 153.0 |
| Network conditions | Standard broadband; Chrome DevTools Offline and Slow 3G used deliberately |
| Account | One test Google account for Saved/History cases |
| Automation | Playwright Test 1.63.0, Chromium (desktop) |
| Defect tracking | GitHub Issues |
| Report date | 21 September 2026 (automated run: 21 September 2026, 11:16 AM) |

---

## 4. Execution Summary

### 4.1 Overall results

| Status | Cases | % of 288 executable |
|---|---:|---:|
| **Pass** | 213 | 74.0 % |
| **Fail** | 12 | 4.2 % |
| **Observation Recorded** (exploratory charters and DevTools observations — no pass/fail verdict by definition) | 12 | 4.2 % |
| **Blocked** (dependency unavailable) | 6 | 2.1 % |
| **Deferred** (not reached in the time available) | 45 | 15.6 % |
| **Total executable** | **288** | **100 %** |
| Designed — Not Executed (API / performance / load / spike / security) | 10 | not counted above |

- **Executed** (Pass + Fail + Observation Recorded): **237 / 288 = 82.3 %**
- **Pass rate** of cases with a verdict: 213 / (213 + 12) = **94.7 %**

### 4.2 Results by priority

| Priority | Total | Pass | Fail | Obs. Recorded | Blocked | Deferred |
|---|---:|---:|---:|---:|---:|---:|
| High | 48 | 44 | 2 | 0 | 1 | 1 |
| Medium | 135 | 96 | 7 | 5 | 1 | 26 |
| Low | 105 | 73 | 3 | 7 | 4 | 18 |
| **Total** | **288** | **213** | **12** | **12** | **6** | **45** |

46 of the 48 High-priority cases were executed (95.8 %). The two not executed are **URL-002** (deep-link URL restores state — deferred) and **SMK-007** (Firefox smoke check — blocked, Firefox not available). Both High-priority failures (FUNC-T-014 → #2 and IMG-006 → #11) are logged as defects.

### 4.3 Results by module

| Module (workbook tab) | Total | Pass | Fail | Obs. | Blocked | Deferred |
|---|---:|---:|---:|---:|---:|---:|
| Smoke & Sanity | 10 | 9 | – | – | 1 | – |
| UAT scenarios | 12 | 12 | – | – | – | – |
| Core translation & supporting actions (`03_Func_Translation`) | 67 | 62 | 5 | – | – | – |
| Language selection | 25 | 24 | 1 | – | – | – |
| Documents / Websites / Images | 23 | 17 | 3 | – | 3 | – |
| Send feedback | 26 | 26 | – | – | – | – |
| Input methods (handwriting / on-screen keyboard) | 10 | 9 | 1 | – | – | – |
| Output actions | 17 | 16 | – | – | – | 1 |
| URL, navigation & settings | 13 | 1 | – | – | – | 12 |
| Boundary & negative | 19 | 19 | – | – | – | – |
| Localization | 9 | 7 | 1 | – | 1 | – |
| UI / UX | 18 | 4 | 1 | – | – | 13 |
| Responsive | 8 | 5 | – | – | – | 3 |
| Cross-browser | 6 | – | – | – | 1 | 5 |
| Accessibility | 12 | 2 | – | – | – | 10 |
| API observation (DevTools) | 6 | – | – | 6 | – | – |
| Exploratory charters | 7 | – | – | 6 | – | 1 |
| **Total** | **288** | **213** | **12** | **12** | **6** | **45** |

---

## 5. Automated Smoke Suite (supplementary)

A small Playwright suite automates five stable smoke flows against the live site. It supplements — it does not replace — the manual pack.

| Automated test | Related manual case | Result |
|---|---|---|
| SMK-AUTO-01 Home page loads with core controls visible | SMK-001 | Pass |
| SMK-AUTO-02 English → Sinhala returns non-empty output | SMK-002 | Pass |
| SMK-AUTO-03 English → Tamil returns non-empty output | Core translation cases (`03_Func_Translation`) | Pass |
| SMK-AUTO-06 Target language changed mid-session re-translates | SMK-003 / SMK-009 | Pass |
| SMK-AUTO-07 Clearing source text leaves the source panel empty | SMK-005 | Pass |

**Run of 21 September 2026, 11:16 AM — Chromium: 5 passed, 0 failed, 0 flaky, 0 skipped, total time 48.3 s.** Evidence: `automation/evidence/playwright-run-2026-09-21.png`. Setup and run instructions: `automation/README.md`.

Three further flows (swap direction, swap text carry-over, auto-detect of Sinhala) were dropped from the suite because they did not run reliably against the live UI; they remain covered by the manual cases (swap: SMK-004 and FUNC-T-044/055; auto-detect: LS-009 to LS-011).

---

## 6. Defect Summary

**19 GitHub Issues** were raised: **11 defects** (label `bug`) and **8 enhancement requests** (label `enhancement`). Every issue traces to a test case; the full mapping is in `03_Bug_Report/Bug_Report_Summary.md`.

| Severity (GitHub label) | Defects |
|---|---:|
| Critical | 0 |
| High | 0 |
| Medium | 8 |
| Low | 2 |
| Not yet labelled | 1 (#11) |
| **Total defects** | **11** |

| Issue | Defect | Severity | Found by |
|---|---|---|---|
| [#2](https://github.com/shahana15/google-translate-qa-testing/issues/2) | English→Tamil delivery-order sentence loses shipment context and 24-hour time meaning | Medium | FUNC-T-014 (High) |
| [#3](https://github.com/shahana15/google-translate-qa-testing/issues/3) | English→Tamil translation drops ellipsis punctuation | Low | FUNC-T-015 |
| [#4](https://github.com/shahana15/google-translate-qa-testing/issues/4) | Voice input locks captured text while the microphone is listening | Medium | FUNC-T-066 |
| [#5](https://github.com/shahana15/google-translate-qa-testing/issues/5) | Tamil voice input does not distinguish "அகரம்" from "ஆகாரம்" | Medium | FUNC-T-067 |
| [#6](https://github.com/shahana15/google-translate-qa-testing/issues/6) | Microphone stuck in listening state with background noise | Medium | FUNC-T-064 |
| [#7](https://github.com/shahana15/google-translate-qa-testing/issues/7) | Document translation transliterates "Slide" instead of using the Tamil presentation term | Medium | DOC-012 |
| [#10](https://github.com/shahana15/google-translate-qa-testing/issues/10) | Tamil text copied from translated PDF is corrupted on paste | Medium | DOC-013 |
| [#11](https://github.com/shahana15/google-translate-qa-testing/issues/11) | Images mode shows the previous image instead of a newly pasted one | *(unlabelled)* | IMG-006 (High) |
| [#13](https://github.com/shahana15/google-translate-qa-testing/issues/13) | Quick-access language tabs in Images mode do not switch language | Medium | LS-015, IME-009 |
| [#16](https://github.com/shahana15/google-translate-qa-testing/issues/16) | Mixed English–Sinhala input leaves the Sinhala phrase untranslated | Medium | L10N-007 |
| [#17](https://github.com/shahana15/google-translate-qa-testing/issues/17) | Empty source panel shows no placeholder or help text | Low | UI-PL-001 |

The 8 enhancement requests (#1, #8, #9, #12, #14, #15, #18, #19) cover clearer error and guidance messages (offline error, oversized upload, no-text image, feedback screenshot optional/required), missing information (maximum upload size), unexplained feature unavailability on Android mobile web (Documents mode, handwriting input) and idiom handling in Sinhala. They are user-experience improvements rather than functional faults.

**Translation-quality observations** (recorded, not raised as functional defects, per Test Plan §4.2): English idiom "It's raining cats and dogs today" → Sinhala was reviewed by a native speaker and the intended meaning was **not preserved** (L10N-004; related enhancement #15).

**Network/console observations** (six DevTools observations, no pass/fail verdict): translation requests were observed as XHR calls returning HTTP 200 in every observed run, including at the 5,000-character limit; one reference timing of about 489 ms was recorded for a single translation (a single observation, not a performance result); no console errors attributable to the translation workflow were seen; and the offline case showed a "Translation error" message with a "Try again" button, after which translation recovered without a page reload.

---

## 7. Key Findings

1. **The core path is solid.** The High-priority core-translation, language-selection, auto-detect, swap, clear, copy, listen and boundary cases passed; the only High-priority failures are #2 (Tamil semantic accuracy) and #11 (Images mode), URL-002 was not reached and SMK-007 (Firefox) was blocked. The 5,000-character limit was confirmed empirically and behaved consistently at 4,999, 5,000 and above.
2. **Sinhala/Tamil script rendering is sound.** No missing-glyph boxes were found in the exploratory Sinhala/Tamil charter (EXP-001); the risk is *meaning*, not display. Meaning-related issues (#2, #7, #16) are the most important quality findings.
3. **Non-core modes are less mature than text mode.** Images mode carries two of the defects (#11, #13), and Documents mode gives users no upload-size guidance (#8, #9).
4. **Error handling is functional but terse.** Offline and failed-URL/failed-upload states are recoverable and the interface stays responsive, but messages do not always say what went wrong (#1, #9, #12).
5. **Mobile web has gaps that are not explained to the user.** On a real Android device, Documents mode and handwriting input are absent with no explanation (#18, #19).

---

## 8. Not Executed, Blocked and Deferred

| Area | Cases | Status | Reason |
|---|---:|---|---|
| Accessibility (screen reader, axe scan, contrast, zoom 200 %/400 %, landmarks, keyboard order) | 10 | Deferred | NVDA / axe DevTools not available in the time window; only keyboard reachability (ACC-001, ACC-003) executed |
| UI/UX polish (empty-state, focus indicator, zoom, wrap, Enter/Shift+Tab, placeholder checks) | 13 | Deferred | Lower-priority cosmetic checks; time reallocated to functional and localization risk |
| URL deep-link parameters, header navigation and settings | 12 | Deferred | Secondary navigation checks not reached; includes High-priority **URL-002** |
| Cross-browser (Chrome vs Firefox comparison) | 5 deferred + 1 blocked | Deferred / Blocked | Firefox was not available, so no Firefox testing was executed; the comparison cases were deferred or blocked |
| Firefox smoke check (SMK-007) | 1 | Blocked | Firefox not available during execution |
| Responsive emulation (iPhone 14, Pixel 7, iPad Air) | 3 | Deferred | Not reached; mobile coverage came from real-Android execution instead |
| Documents interface size limit and over-limit upload | 2 | Blocked | The interface does not state a maximum size (see enhancements #8, #9) |
| Corrupt-image rejection (IMG-004) | 1 | Blocked | Corrupt test file (TD-043) was not prepared |
| Idiom meaning to Sinhala (L10N-006) | 1 | Blocked | No native Sinhala reviewer available |
| Details control for an unsupported language pair (DET-002) | 1 | Deferred | Suitable language pair not identified in time |
| Exploratory charter EXP-003 (rapid state changes) | 1 | Deferred | Time-boxed; other six charters executed |
| Designed-only API / performance / load / spike / security | 10 | Designed — Not Executed | No environment, thresholds or authorisation (Test Plan §4.4) |

Nothing in this table is counted as passed.

---

## 9. Variances Between the Original Plan (v1.7) and Execution

The counts and tab list were brought into line in Test Plan v1.8; the execution variances below are reported here because a plan does not record results.

| Plan v1.7 statement | Actual |
|---|---|
| 245 executable + 10 designed-not-executed cases (255 total) | **288 executable + 10 designed-not-executed (298 total).** Two tabs were added after the plan was written — `UAT_Testcase` (12 cases) and `feedback` (26 cases) — plus further cases in existing tabs. Plan v1.8 carries the corrected counts |
| 19 tabs; 48 test-data items (TD-001 – TD-048) | Tab set differs from the v1.7 list (tabs added/renamed); 61 test-data items are held in `Test_Data`. Plan v1.8 carries both corrections |
| High-priority cases all executed | 46 of 48 executed; **URL-002 deferred, SMK-007 blocked (no Firefox)** |
| NVDA and axe DevTools used for accessibility | Not used; accessibility largely deferred (§8) |
| One Chrome, one Firefox and one real-Android run | Chrome and real Android completed; **Firefox not run** (not available) |
| Automation not in the original plan | Five-test Playwright smoke suite added as a supplement (§5) |

---

## 10. Exit Criteria Assessment (Test Plan §8)

| Exit criterion | Result |
|---|---|
| Every High-priority case executed with a real result; Medium executed as capacity allows; anything not reached stays Deferred with a reason | **Partly met** — 46 / 48 High executed (URL-002 deferred, SMK-007 blocked); Medium/Low not reached are Deferred with reasons (§8) |
| Designed-only cases marked "Designed — Not Executed" with no pass/fail result | **Met** — 10 / 10 |
| All defects logged as GitHub Issues with steps, severity, priority and evidence, referenced from the originating test case | **Met** — 19 issues, each traceable to a test case |
| Test Summary Report completed with actual final counts; quality and network observations reported as observations | **Met** — this document |

---

## 11. Risks and Residual Risk

| Risk | Impact |
|---|---|
| **Accessibility is unverified** beyond basic keyboard reachability | Unknown compliance with WCAG 2.1 AA; should not be assumed accessible |
| **Cross-browser coverage is thin** (Chrome on desktop and Android only; no Firefox, Safari, Edge or iOS) | Browser-specific defects may exist |
| **Live third-party product** | Translations and UI change between runs; results reflect the execution dates |
| **Native-language review was limited** | Meaning-preservation was assessed only where a reviewer was available; other Sinhala/Tamil output was judged on function (script, display) |
| **Deep-link/URL and header-navigation behaviour unverified** | Bookmarked or shared translation links are untested |

---

## 12. Recommendations

**For the product (from the defects found)**

1. Fix or clearly warn about meaning loss for commercial, figurative and mixed-language text in Sinhala/Tamil (#2, #7, #15, #16).
2. Make voice input recoverable: allow editing while listening, and auto-stop the microphone with background noise (#4, #6); review Tamil long-vowel recognition (#5).
3. Correct Images mode: replace stale results when a new image is pasted, and make the quick-access language tabs respond to one click (#11, #13).
4. Fix Tamil text corruption when copying from translated PDFs (#10).
5. Improve guidance messages: offline error, upload size limit and oversized-file rejection, no-text image, feedback screenshot optional/required, and unavailable features on Android mobile web (#1, #8, #9, #12, #14, #18, #19); add a placeholder to the empty source panel (#17).

**For further testing**

1. Complete the accessibility cases with NVDA and axe DevTools.
2. Execute the deep-link (URL-002 to URL-006), navigation and mode-switching cases.
3. Widen cross-browser coverage (full Chrome/Firefox comparison, plus Safari/Edge) and run the device-emulation cases.
4. Obtain native Sinhala and Tamil reviewers for a systematic meaning-preservation pass.
5. Extend the Playwright suite (swap, auto-detect, additional browsers) once selectors are stable.

---

## 13. Conclusion and Sign-off

The planned process — planning, design, execution, defect logging and reporting — was completed within the assessment window, with the priority column driving execution order and every unexecuted case recorded honestly as Deferred or Blocked rather than passed. Google Translate's core translation function is **fit for everyday use with known, documented limitations**; the 19 raised issues and the unexecuted areas above define what remains before broader confidence is warranted.

| | |
|---|---|
| **Prepared by** | Shahana Sivasubramanium — QA Engineer (applicant) |
| **Date** | 21 September 2026 |
| **Overall recommendation** | Conditional acceptance |

### Supporting documents

- Test Plan v1.8 — `01_Test_Plan/`
- Test Case Document v8 — `02_Test_Cases/`
- Bug Report — GitHub Issues + `03_Bug_Report/Bug_Report_Summary.md`
- Automation suite and run evidence — `automation/`
