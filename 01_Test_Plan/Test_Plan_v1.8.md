# Test Plan — Google Translate Web (Desktop & Mobile Browser) QA Assessment

| | |
|---|---|
| **Project** | QA Assessment – Google Translate Web (Desktop & Mobile Browser), https://translate.google.com/ |
| **Prepared by** | Shahana Sivasubramanium |
| **Role Applied For** | QA Engineer |
| **Client / Reviewer** | WireApps |
| **Version** | 1.8 |
| **Date** | 21 September 2026 |

### Version History

| Version | Date | Author | Changes |
|---|---|---|---|
| 1.0 | 17 Sep 2026 | Shahana Sivasubramanium | Initial draft |
| 1.1 | 18 Sep 2026 | Shahana Sivasubramanium | Added success metrics, test data strategy, tools table, API testing approach, designed-but-not-executed strategy, Limitations |
| 1.2 | 18 Sep 2026 | Shahana Sivasubramanium | Project title clarified to *Web (Desktop & Mobile Browser)*; added URL/deep-link verification approach (§4.5); added verification-method (oracle) definitions (§4.6); added feature inventory taken from the live UI (§3.3); entry criteria made URL-specific; success metrics extended; schedule corrected so execution and defect logging run Day 2–3; deliverables updated to the 19-tab test-case pack; limitations extended (no requirements specification, translation non-determinism, per-language feature availability) |
| 1.3 | 18 Sep 2026 | Shahana Sivasubramanium | **No cases removed.** Added a **Description** column to every case (the *why*, separate from the Title's *what*); added placeholder, Enter-key and Tab-order cases (§3.3); extended voice-input coverage for silence, manual cancel and background noise; added safe (cancel-only) Share and Rate/Suggest-an-edit cases, with Submit explicitly deferred by design to avoid sending artificial feedback to a live production service; reworded "every visible control" to "material controls observed in the test environment" |
| 1.4 | 18 Sep 2026 | Shahana Sivasubramanium | **Simplified for practical execution within the assessment window.** Test Case Document reduced to 13 practical columns (Test Case ID, Module/Feature, Title, Description, Priority, Preconditions, Test Data, Steps, Expected Result, Actual Result, Status, Bug ID, Comments); removed Req ID, Test Type, Exec Day, Execution Group, Verification Method, Severity, Environment, Evidence and Executed By/Date as separate columns — severity, environment and evidence now live in the GitHub Issue referenced by Bug ID for any failed case. Corrected the case-count statement: the workbook holds **245 executable cases plus 10 designed-not-executed cases (255 total)** — confirmed by direct count, not estimated. Execution order is now driven by the existing **Priority** column (High first) rather than a separate Execution Group; the Test Summary Report will state actual executed/passed/failed/deferred totals. Fixed the Deliverables section, which still said "v1.2." Corrected all dates to the real working date. Functional translation cases no longer Block on an unavailable native reviewer — the functional (script/UI) result and the meaning-preservation observation are recorded and judged separately |
| 1.5 | 18 Sep 2026 | Shahana Sivasubramanium | **Review corrections.** Removed the contradictory "2-day execution window" wording — the assessment window is stated as **3 days** throughout, with execution running in the time remaining after planning and test-case design. Confirmed the Test Case Document tab count by direct inspection (**19 tabs**, no Traceability tab) and removed all traceability references. Workbook Readme corrected: "Designed **for execution**" rather than "designed and executed", and the Designed — Not Executed definition rewritten without the "17_API_Observation-adjacent" wording. Replaced every Description that restated its Title with risk-based wording (161 rows). Removed the obsolete **O1–O4** oracle labels and `Readme L-n` references left over from the 22-column version, and the "Day-1 baseline" term replaced with "first-run baseline". Fixed capitalisation/typos ("Sinhala-to-Tamil", "Tamil-to-Sinhala", "ALL-CAPS"). Relaxed over-strict expected results for sentence segmentation (FUNC-T-008), line breaks (FUNC-T-009) and URL/email usability (FUNC-T-014). Added the "record as **Not assessed** if no native reviewer is available" rule to FUNC-T-001 – FUNC-T-006 and L10N-005 – L10N-007. Removed the specific Google Search URL parameter assertion from §3.3. **No test case added or removed: 245 executable + 10 designed-not-executed (255 total) is unchanged.** Test Case Document reissued as **v6** |
| 1.6 | 18 Sep 2026 | Shahana Sivasubramanium | **Final review corrections before design freeze.** Corrected the FUNC-T-020 Description, which described a target-language change while the case tests a **source**-language change. Relaxed FUNC-T-008 (no sentence-mark counting), FUNC-T-011 (extent of output rather than reviewer-identified final sentence), FUNC-T-016, FUNC-T-021 and FUNC-T-025 so that live-service variation is recorded as an observation rather than failed, each carrying the "Not assessed if no native reviewer" rule. Added **Observation Recorded** to the workbook Readme status list so the workbook matches §4.8 and §8. Replaced "run and evidenced" with "executed and documented in Actual Result" for passing cases — evidence remains mandatory on the GitHub Issue for a failure. Clarified in the workbook Readme that web handwriting is in scope while native-app handwriting is not. **No test case added or removed (245 + 10 = 255).** Test Case Document reissued as **v7** |
| 1.7 | 18 Sep 2026 | Shahana Sivasubramanium | **Wording cleanups only; design frozen.** Capitalised "Selected" in the Limitations table. Aligned the FUNC-T-001 – FUNC-T-004 titles with the optional-native-review rule so the title no longer promises meaning confirmation the Expected Result treats as optional. Corrected the FUNC-T-012 Description to cover times as well as numbers and dates. Made the SMK-003 first-run baseline wording match SMK-002. Restricted **Observation Recorded** in the workbook Readme to DevTools observation and exploratory charters. **No test case added or removed (245 + 10 = 255).** Test Case Document reissued as **v8** |
| 1.8 | 21 Sep 2026 | Shahana Sivasubramanium | **Aligned with the executed Test Case Document; approach, scope and priorities unchanged.** Case counts updated to **288 executable cases plus 10 designed-not-executed cases (298 total)** — the workbook gained the `UAT_Testcase` and `feedback` tabs and further cases in existing tabs during execution. Tab list (§10) and test-data count (§5.2: 61 items, TD-001 – TD-061) updated. Feature-coverage table (§3.3) re-pointed to the case IDs actually used in the workbook (clear, copy, listen, voice, save and history cases are `FUNC-T-###`; the mode-tab presence check is SMK-008; the URL-as-input case is FUNC-T-016). Added a risk row for unavailable browsers/tools (§13): Firefox, NVDA and axe DevTools were not available during execution, so the affected cases are recorded **Blocked** or **Deferred** with a reason — actual results are reported in the Test Summary Report, not in this plan. Case IDs cited in earlier history rows are as at that version; where cases were later inserted, current IDs differ (for example the URL/email case is now FUNC-T-016). |

---

## 1. Introduction

This document defines the scope, approach and criteria for manually testing the web-based translation product **Google Translate** at **https://translate.google.com/**, on desktop browsers and mobile browsers. Native Android/iOS applications are not tested.

The purpose is to demonstrate a structured, industry-standard manual QA process — planning through execution and reporting — within a 3-day assessment window, following the standard **STLC**: Requirement Analysis → Test Planning → Test Case Design → Test Execution → Defect Reporting → Test Closure.

## 2. Objectives

**Primary Objective**

Verify that Google Translate's core translation functionality, language handling, supporting actions and UI behave correctly and consistently across desktop web and mobile browser viewports, for English, Sinhala and Tamil sample content.

**Secondary Objectives**

- Identify functional, UI, localization and usability defects.
- Evaluate handling of script-specific edge cases (Sinhala/Tamil).
- Demonstrate a repeatable, documented manual test process.

**Success Metrics**

- Every **High-priority** case (§4.1) — the URL entry point, translation both directions, language selection/search/detection/swap, clear, copy, listen, source and language-search placeholders, Enter/Tab keyboard behaviour, confirmed boundary limits, Sinhala/Tamil rendering, one Chrome run, one Firefox run, one real-Android run — executed with a real Actual Result and Status within the 3-day assessment window — in the execution time remaining after planning and test-case design.
- Every defect logged as a GitHub Issue with reproduction steps, severity and priority, and referenced by Bug ID from the test case that found it.
- Medium-priority cases executed as time allows after High is complete; anything not reached stays **Deferred** with a one-line reason, never marked Pass.
- Material controls observed in the test environment during the assessment (§3.3) are each mapped to a test case or recorded as a conscious out-of-scope decision.

## 3. Scope

### 3.1 In Scope

| Area | Details |
|---|---|
| Entry point | Accessibility of the application at the expected URL; address-bar deep-link parameters (`sl`, `tl`, `text`, `op`) |
| Core translation | Text input/output, auto-detect, language swap, character-limit behaviour, transliteration display |
| Languages | English, Sinhala, Tamil (sample-based, per assignment instructions) |
| Language selection | Source/target selectors, quick-access language tabs, expand/collapse, language search, full language grid |
| Supporting actions | Clear, copy, listen, microphone/voice input, star/save, history, share, look-up details, rating/feedback |
| Alternative input | Handwriting pad and on-screen keyboard offered inside the **web** interface |
| Other modes | Images, Documents, Websites |
| Header / navigation | Navigation menu, appearance/theme control, settings, apps launcher, account control, mode tabs |
| UI / UX | Layout, loading and empty states, error presentation, character counter, text wrapping, zoom |
| Cross-browser | Chrome (primary), Firefox (secondary) |
| Responsive / mobile web | Chrome DevTools emulation (iPhone 14, Pixel 7, iPad Air) + real Android device checks |
| Accessibility | Keyboard operation, focus order and visibility, accessible names, screen-reader announcement, WCAG 2.1 AA contrast, zoom 200%, reflow 400%, language context |
| Localization / i18n | Sinhala/Tamil script rendering, conjunct forms, mixed-script input, idiom meaning via native review |
| API-layer observation | Structured DevTools Network/Console observation only (§4.3) |

### 3.2 Out of Scope

| Area | Reason |
|---|---|
| Native Android/iOS Google Translate apps | Assignment points to the web URL |
| App-only features: Conversation mode, live camera translate, offline language packs | Not present in the web application under test |
| Languages other than English/Sinhala/Tamil | Assignment notes sample languages are sufficient |
| Full API/backend testing (Postman/Swagger) | No documented public API for the free web client; designed only (§4.4) |
| Performance / load / spike testing | No test environment, no agreed threshold, no authorisation against a live third-party production service; designed only |
| Security / penetration testing | Outside assignment scope and authorisation; designed only |

### 3.3 Feature Inventory Taken from the Live UI (18 Sep 2026)

Coverage is driven by the application as it actually is. The feature inventory below is based on **material controls observed during test design in the selected browser/device configuration**; each maps to at least one test case or to an explicit out-of-scope decision. Feature availability may vary by language pair, account state, browser, viewport and live product release. This inventory happened at **test-design time**; it records what a control is and does, not that the corresponding case has already been executed — execution status is tracked separately in the Status column of the Test Case Document. The "Covered by" column was re-pointed to the workbook's current case IDs in v1.8.

Two controls identified late in design are explicitly named here because they change expected results: the **Details / Search with Google control opens a Google Search experience using the translated text** — not a generic "further information" panel — and for supported single-word translations an additional **dictionary/details view** may appear (Definitions/Translations tabs, numbered senses, synonym chips, "See dictionary" link, its own listen icon). Exact URL parameters, labels and panel layout are recorded as observed behaviour and are not treated as fixed requirements. The rating control is a single icon whose tooltip reads "Rate this translation"; activating it opens a small thumbs-up/thumbs-down popup with a **"Suggest an edit"** link, which is a *separate*, larger dialog with an editable translation field, a data-use disclosure ("...may be shown, without identifying you, to other users"), and Cancel/Submit. The handwriting pad additionally offers a **"Classic"** style dropdown (handwriting style) distinct from the keyboard-icon **"Select Input Tool"** dropdown next to it — two different controls, not one.

| UI area | Controls observed | Covered by |
|---|---|---|
| Header | Navigation menu, appearance/theme, settings, Google apps launcher, account | NAV-001 – NAV-006 |
| Mode tabs | Text, Images, Documents, Websites | SMK-008, NAV-007, DOC / WEB / IMG cases |
| Language controls | Detected-source label ("English - Detected"), source & target quick tabs, expand/collapse chevrons, language search with clear and back controls, full multi-column language grid | LS-001 – LS-024, LS-PL-001 |
| Source panel | Text area, clear (X), microphone, listen, character counter, input-method (pencil) control | FUNC-T-040 – 043 (clear), FUNC-T-037 – 038 (listen), FUNC-T-052 – 054 and 061 – 067 (voice), UI-002, UI-PL-001 – 003, IME-001 – IME-010 |
| Input pad | Handwriting area, candidate suggestions, punctuation row, backspace, enter, "Multiple languages", on-screen keyboard, close | IME-001 – IME-010 |
| Output panel | Translated text, transliteration line, star/save, listen, copy, details (Google) control, thumbs up/down, share, "Send feedback" | FUNC-T-028 – 035 (copy), FUNC-T-036 – 039 (listen), FUNC-T-047 – 049 and 057 (save), TRL-001 – 004, DET-001 – 003, SRCH-001, RATE-001 – 003, SHR-001 – 003, FBK-001 – 002 and the `feedback` tab (FBK-003 – 033), OUT-001 – 002 |
| Home shortcuts | History, Saved | FUNC-T-050 – 051, 058 – 060 (History); FUNC-T-047 – 049, 057, 060 (Saved) |
| Address bar | `?sl=…&tl=…&text=…&op=translate` | URL-001 – URL-006 |

Decisions recorded deliberately: the **web handwriting pad is in scope** because it is part of the interface under test; native-app handwriting/camera/offline features are not. Rating and feedback controls are in scope at Low priority because they are visible user-facing actions; only their non-destructive behaviour is verified, not Google's internal handling of submitted feedback.

## 4. Test Approach

- **Type:** Manual, black-box functional and UI testing, plus exploratory testing and error guessing.
- **Design techniques:** Feature-based design, equivalence partitioning, boundary value analysis, state-transition testing.
  - *Boundary value analysis* — empty, whitespace-only, 1 character, limit−1, limit, limit+ (the limit is confirmed empirically in BN-004 before the limit cases run, never assumed).
  - *Equivalence partitioning* — Latin-script vs Sinhala/Tamil-script vs mixed-script vs non-word/symbol vs empty input.
  - *State transition* — swap twice restores the original state; clear during an in-flight request; target language changed during an in-flight request; detected → manual → detected source mode.
  - *Error guessing* — numbers, emoji, punctuation-only, idioms, mismatched manual source language, interrupted connectivity.
- **Test independence:** Every case is self-contained. The standard precondition is a fresh page load with both panels empty; required state is created inside the case's own steps. Case IDs are referenced for context only, never for state.
- **Execution prioritisation:** Risk-based, expressed per case in the **Priority** column (§4.1); High-priority cases are executed first within the available time.

### 4.1 Risk-Based Test Execution Priority

*(Execution priority — distinct from defect Priority P1–P4 in §11.2.)*

| Execution Priority | Area | Reason |
|---|---|---|
| High | URL entry point, core translation, input/output handling | Core purpose of the product |
| High | Language selection, detection, swap | Essential user flow |
| Medium | Clear, copy, listen, save, history, share, details, input methods | Supporting functionality |
| Medium | Boundary/negative, localization, responsive, cross-browser, accessibility | Risk and compatibility |
| Low | Cosmetic UI, rating/feedback, auxiliary navigation | Lower functional risk |

### 4.2 Translation Accuracy Validation Approach

Translation output is not deterministic and multiple valid phrasings exist, so **no test case asserts an exact expected translation string**. Quality is assessed by:

1. Simple phrases whose intended meaning is agreed in advance.
2. Consistency against the recorded first-run baseline for the same input.
3. Preservation of meaning, reviewed by a native Sinhala/Tamil speaker.
4. Where output looks questionable but is not clearly wrong, it is logged as **"Translation-quality observation — requires native-language validation"**, never as a functional defect.

### 4.3 API Testing Approach

The free web client exposes no documented public API, so Postman/Swagger-style testing cannot be performed against it. As a **supplementary observation only**, DevTools Network and Console checks are made: request method and status observed for a standard translation, structural consistency across repeated identical inputs, behaviour at the confirmed character limit, behaviour when offline, single-request timing, and console errors. **Nothing in this area is passed or failed against an assumed contract**, and no response status is stated as required. Google's separately documented Cloud Translation API is a different product and is not exercised.

### 4.4 Designed-but-Not-Executed Test Cases

Full API, performance, load/spike and security cases are **designed to the same standard but not executed**, because there is no test environment, no agreed threshold or concurrency target, and no authorisation to generate load or run probes against a third-party production service. Each is labelled **"Designed — Not Executed"** with its constraint, carries no Pass/Fail result, and **contains no invented threshold or user count** — each refers to the requirement that would have to be defined in this Test Plan first.

Stated once, for the record: **performance, load, spike, security and full API-contract tests were designed but not executed.** The assessment target is a live third-party production service; no controlled environment, agreed service-level targets, test credentials or authorisation for intrusive testing was provided. Browser DevTools observations, where executed, are reported as observations only and are not substitutes for API, performance, load or security testing.

### 4.5 URL and Deep-Link Verification Approach

Two distinct concerns are tested separately and must not be confused:

- **Application URL** — the product is reachable at the expected address and loads its interface (SMK-001). Any locale or parameter suffix the site adds is recorded, not failed.
- **Deep-link parameters** — the address bar carries `sl`, `tl`, `text` and `op`; these are verified to reflect the current state, to restore state when opened in a new tab, to work with `sl=auto`, and to degrade gracefully for an unsupported language code or over-long text (URL-001 – URL-006).
- **A URL as translation input** — a link inside the text to be translated is a separate functional case (FUNC-T-016).

### 4.6 How Expected Results Are Judged

No case asserts an exact machine-translation string (§4.2). Where the application's behaviour is not otherwise published, the behaviour observed on the **first** execution run is recorded in Comments as the first-run baseline, and later runs are compared against that record — an expected result is never rewritten during execution to match what the application did.

For translation cases specifically, the **functional** result (output is displayed, in the correct target script, UI behaves correctly) and the **meaning-preservation** result (reviewed by a native Sinhala/Tamil speaker, where available) are judged and recorded separately in Comments. A missing native reviewer records the meaning-preservation part as "Not assessed" — it does not Block or Fail the functional case, which can still Pass on its own evidence.

### 4.7 Execution Plan for the Remaining Assessment Window

The Test Case Document holds **288 executable cases plus 10 designed-not-executed cases (298 total)** — a broad, traceable regression suite, not something one tester runs, evidences and reports on on top of planning and design in the remaining window. Rather than imply otherwise, execution follows risk-based priority within the 3-day assessment window: execution order is driven by the existing **Priority** column (§4.1), High-priority cases are executed first, medium- and low-priority cases are executed as capacity allows, and every case's real state is recorded in **Status**:

| Order | Priority | Approx. focus |
|---|---|---|
| 1st | High | URL entry point, core translation both directions, language selection/search/detection/swap, clear, copy, listen, both placeholder checks, Enter/Tab keyboard behaviour, confirmed boundary limits, Sinhala/Tamil rendering, one Chrome run, one Firefox run, one real-Android run, safe (cancel-only) Share/Rate checks |
| 2nd, if time allows | Medium | Voice-input conditions, History/Saved, one happy path each for Documents/Websites/Images/handwriting, deep-link parameters, boundary/localization/responsive/cross-browser/accessibility cases not already covered above |
| Not reached | — | Marked **Deferred** with a one-line reason in Comments — never left blank, and never marked Pass without being executed |
| Out of scope by design | — | The 10 API/performance/load/spike/security cases — unchanged, see §4.4 |

A case can be executed ahead of its default order if time allows, but nothing is marked Pass without being actually executed and documented in Actual Result (evidence remains mandatory on the GitHub Issue for any failure), and the Test Summary Report states the real final counts — not the plan above.

### 4.8 Exploratory Testing

Seven time-boxed charters, each with a mission, areas, time-box and **exit criteria**, covering Sinhala/Tamil script risk, real-device mobile interaction, rapid state changes, the non-text modes, input limits and error recovery, first-time discoverability, and a control-by-control sweep of the whole interface. Charters are recorded with Status **Observation Recorded** (defined in the workbook Readme), never Pass, and any defect found is logged like any other.

## 5. Test Environment

| Category | Details |
|---|---|
| Application under test | https://translate.google.com/ |
| Desktop browsers | Chrome, Firefox — **exact build recorded at execution time** ("latest" is not an acceptable record) |
| Mobile emulation | Chrome DevTools — iPhone 14, Pixel 7, iPad Air profiles |
| Real device check | Android phone, Chrome Mobile — model and OS build recorded; results take precedence over emulation |
| OS | Windows 11 (build recorded) |
| Accounts | One test Google account for signed-in Saved/History cases; signed-out behaviour tested separately |
| Assistive tooling | NVDA, axe DevTools |
| Network | Standard broadband; DevTools throttling (Slow 3G) and Offline used deliberately |

The environment actually used (browser builds, OS version, device and Android version) is recorded in the Test Summary Report, §3.

### 5.1 Real Device vs Emulation

Emulation reproduces viewport and input mode, not real rendering, GPU or on-screen keyboard behaviour. Real-device cases cover on-screen keyboard occlusion, orientation change, split screen and app switching; where results differ, the real device is authoritative.

### 5.2 Test Data Strategy

61 identified, reusable data items (`TD-001` – `TD-061`) held on a dedicated tab, each with an ID, language, category, character length and the **actual content** — not a description. Categories: simple phrases (EN/SI/TA), single word, multi-sentence, multiline, leading/trailing whitespace, 300-word paragraph, numbers, punctuation, URL/email, empty, whitespace-only, single character, symbols, emoji, limit−1 / limit / limit+ generated strings, mixed script, idioms and proverbs, complex Sinhala/Tamil conjuncts, long unbroken string, ALL CAPS, repeat-consistency input, documents (.docx/.pdf/.pptx/.xlsx plus unsupported and oversized), URLs (valid/malformed/non-existent), images (English/Sinhala/no text/corrupt/low quality) and a spoken phrase.

### 5.3 Tools

| Purpose | Tool |
|---|---|
| Test case management | Excel / Google Sheets |
| Defect tracking | GitHub Issues |
| Cross-browser | Chrome, Firefox |
| Responsive emulation | Chrome DevTools |
| Network / console observation | Chrome DevTools |
| Accessibility | NVDA, axe DevTools, DevTools Accessibility pane |
| Evidence capture | Screenshot tool / GoFullPage |
| Documentation | Markdown, GitHub, Google Drive |

## 6. Roles and Responsibilities

| Role | Responsibility |
|---|---|
| QA Engineer (self) | Planning, design, execution, defect logging, reporting |
| Native-language reviewer (supporting) | Sinhala/Tamil meaning-preservation review, recorded as a quality observation |

*(Single-person assessment; if no native reviewer is available, the meaning-preservation observation is recorded as "Not assessed" — the functional translation case is still executed and judged on its own evidence, per §4.6.)*

## 7. Entry Criteria

- The expected application URL (**https://translate.google.com/**) is accessible and the Google Translate interface loads in the primary test browser.
- Test cases are designed and reviewed against this Test Plan.
- Chrome and the core test data (§5.2) are available — this is enough to start execution.
- Additional dependencies (a signed-in Google account, prepared document/image files, a real Android device, Firefox, NVDA, axe DevTools) are needed only for the specific cases that use them. A case whose dependency isn't available is marked **Blocked** with the reason recorded, not treated as a reason to delay the rest of execution.

## 8. Exit Criteria

- Every High-priority case executed with a real Actual Result and Status; Medium-priority cases executed as capacity allows; anything not reached stays **Deferred** with a reason (§4.7).
- Designed-only cases marked **"Designed — Not Executed"**, carrying no Pass/Fail result.
- All defects logged as GitHub Issues with reproduction steps, severity, priority and evidence, and referenced by Bug ID from the originating test case.
- Test Summary Report completed with actual final counts, including translation-quality observations and network observations reported as observations rather than verdicts.

## 9. Suspension / Resumption Criteria

- **Suspension:** the application becomes unavailable, or a critical environment/tooling issue blocks execution.
- **Resumption:** the blocker is resolved or a workaround is confirmed and recorded.

## 10. Test Deliverables

1. **Test Plan** (this document, v1.8)
2. **Test Case Document** (workbook, v8 base — extended with the `UAT_Testcase` and `feedback` tabs and completed with execution results) — **20 tabs**: `00_Readme`, `Test_Data`, `Smoke_Sanity`, `UAT_Testcase`, `03_Func_Translation`, `04_Func_Language_Selection`, `06_Func_Doc_Web_Image`, `feedback`, `07_Func_Input_Methods`, `08_Func_Output_Actions`, `09_Func_URL_Nav_Settings`, `10_Boundary_Negative`, `11_Localization`, `12_UI_UX`, `13_Responsive`, `14_Cross_Browser`, `15_Accessibility`, `17_API_Observation`, `16_Exploratory_Charters`, `18_Designed_Not_Executed` — **288 executable cases plus 10 designed-not-executed cases (298 total)**. Clear, copy, listen, voice-input, save and history cases are held in `03_Func_Translation`; share, details, rating, transliteration and Send-feedback entry cases in `08_Func_Output_Actions`; the full Send-feedback dialog cases in `feedback`; and end-user scenario cases in `UAT_Testcase`.

   Each executable case includes: **Test Case ID, Module/Feature, Title, Description, Priority, Preconditions, Test Data, Steps, Expected Result, Actual Result, Status, Bug ID, Comments.** Some tabs carry an additional **Enhancement** column that links a usability enhancement request raised from a case that itself passed. The Title states *what* is being checked; the Description states *why* the case matters or the risk it protects against. Actual Result and Status are completed during execution. Bug ID is populated only when a case fails, and links to the corresponding GitHub Issue. Environment details, severity, defect priority, reproduction evidence, screenshots and videos are recorded in the Bug Report for failed cases, not duplicated on every row — the Test Summary Report records the overall browsers/devices used and final execution totals.
3. **Bug Report** (GitHub Issues + the `Bug_Report_Summary.md` index)
4. **Test Summary Report**

Supplementary (not a required deliverable): a Playwright smoke-automation suite in the `automation/` folder of the repository.

## 11. Defect Management Process

Defects are logged as GitHub Issues with: Summary, Environment (exact versions), Steps to Reproduce, Expected Result, Actual Result, Severity, Priority, Status, Evidence, and the originating test case ID.

### 11.1 Severity

| Severity | Description |
|---|---|
| Critical | Core translation unusable; no workaround |
| High | Major feature broken or clearly wrong; workaround difficult |
| Medium | Minor functional/UI defect with a workaround |
| Low | Cosmetic or copy-level issue |

### 11.2 Priority

| Priority | Description |
|---|---|
| P1 – Must Fix | Blocks core use |
| P2 – Should Fix | Noticeable user impact |
| P3 – Fix When Possible | Minor impact |
| P4 – Low | Cosmetic/enhancement |

Translation-quality observations and network/timing observations are recorded in the Test Summary Report and are **not** raised as defects unless evidence supports a functional fault.

## 12. Limitations

| Not Executed / Limited | Justification |
|---|---|
| Full API testing | No documented public API for the free web client; calling undocumented internal endpoints is not authorised API testing. Selected DevTools Network/Console observations may be performed as part of the manual test cycle — observation-only checks, not API-contract testing (§4.3); contract cases designed only |
| Performance testing | No controlled environment, no baseline, no agreed threshold |
| Load / spike testing | Would send burst traffic to live third-party production infrastructure without authorisation |
| Security testing | Probing a third-party production system without written authorisation is outside testing ethics |
| No requirements specification | There is no customer requirements document for a third-party production application; cases are traced to observed features and this Test Plan instead, stated explicitly in the Test Case Document Readme |
| Translation non-determinism | Output wording can vary between runs; no exact expected translation string is asserted anywhere in the pack |
| Per-language feature availability | Details, rating, transliteration and input methods are offered only for some language pairs; those cases record observed availability rather than assuming presence |
| Device emulation | Emulation is not equivalent to real-device rendering or keyboard behaviour |
| Native-language dependency | Native-language review supplements functional testing. If a reviewer is unavailable, semantic quality is recorded as "Not assessed"; it is not treated as a functional test failure or blocker, and the functional translation case is still executed and judged (§4.6) |

## 13. Risks and Assumptions

| Risk / Assumption | Mitigation |
|---|---|
| Live, frequently updated third-party product | Results reflect behaviour on the execution date, recorded in the Test Summary; baseline rule applied |
| Pack is broader than the remaining assessment window | Priority column drives execution order; unexecuted cases marked Deferred, never Pass |
| A planned browser or tool is unavailable during execution (Firefox, NVDA, axe DevTools) | Affected cases are marked **Blocked** or **Deferred** with the reason recorded, never Pass; the gap and its impact are stated in the Test Summary Report |
| No access to native mobile apps | Explicitly out of scope |
| Rate limiting or CAPTCHA during repeated testing | Observed and recorded; testing paced to avoid abuse triggers |

## 14. Schedule

| Task | Day |
|---|---|
| Test Planning | Day 1 |
| Test Case Design | Day 1 |
| Test Execution (web + mobile) | Day 2–3 |
| Defect Logging & Retesting | Day 2–3 |
| Test Summary Report | Day 3 |
| Final Submission | Day 3 |

## 15. Terms / Acronyms

| Term | Definition |
|---|---|
| STLC | Software Testing Life Cycle |
| UI | User Interface |
| TD-nnn | Test data identifier |
| DNE | Designed — Not Executed |
| WCAG 2.1 AA | Web Content Accessibility Guidelines 2.1, Level AA |
| P1–P4 | Defect priority levels |
