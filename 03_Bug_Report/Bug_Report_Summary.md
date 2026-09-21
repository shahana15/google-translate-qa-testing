# Bug Report — Google Translate Web (Desktop & Mobile Browser)

| | |
|---|---|
| **Prepared by** | Shahana Sivasubramanium |
| **Date** | 21 September 2026 |
| **Where defects are tracked** | GitHub Issues — https://github.com/shahana15/google-translate-qa-testing/issues |
| **Total issues** | 19 (11 defects, 8 enhancement requests) |

The **Bug Report deliverable is the set of GitHub Issues linked above** — each issue holds the reproduction steps, expected vs actual result, environment and evidence. This page is the index: it lists every issue, its type, its severity label and the test case that found it, so any defect can be traced from test case → issue and back.

## Summary

| | Count |
|---|---:|
| Defects (`bug`) | 11 |
| — Medium | 8 |
| — Low | 2 |
| — Severity not yet labelled | 1 (#11) |
| — Critical / High | 0 |
| Enhancement requests (`enhancement`) | 8 |
| **Total open issues** | **19** |
| Closed | 0 |

Severity scale (Test Plan §11.1): Critical · High · Medium · Low. Issues are labelled `bug` or `enhancement`, with a `Medium` or `low` severity label where one was assigned.

## Defects (11)

| Issue | Title | Severity | Found by (test case) | Area |
|---|---|---|---|---|
| [#2](https://github.com/shahana15/google-translate-qa-testing/issues/2) | English-to-Tamil delivery-order translations do not preserve shipment context and 24-hour time meaning | Medium | FUNC-T-014 (High) | Translation quality |
| [#3](https://github.com/shahana15/google-translate-qa-testing/issues/3) | English-to-Tamil translation drops ellipsis punctuation from punctuation-heavy input | Low | FUNC-T-015 | Translation / punctuation |
| [#4](https://github.com/shahana15/google-translate-qa-testing/issues/4) | Voice input locks captured text while microphone is listening, preventing correction or deletion | Medium | FUNC-T-066 | Voice input |
| [#5](https://github.com/shahana15/google-translate-qa-testing/issues/5) | Tamil voice input does not distinguish "அகரம்" from "ஆகாரம்" when the initial long vowel is sustained | Medium | FUNC-T-067 | Voice input |
| [#6](https://github.com/shahana15/google-translate-qa-testing/issues/6) | Voice input microphone remains stuck in listening state when background noise is present | Medium | FUNC-T-064 | Voice input |
| [#7](https://github.com/shahana15/google-translate-qa-testing/issues/7) | PPTX / PDF translation transliterates "Slide" as "ஸ்லைடு" instead of the Tamil presentation-context term "வழங்கல் படலம்" | Medium | DOC-012 | Documents / localization |
| [#10](https://github.com/shahana15/google-translate-qa-testing/issues/10) | Tamil text copied from translated PDF is corrupted and contains mixed-script characters after paste | Medium | DOC-013 | Documents |
| [#11](https://github.com/shahana15/google-translate-qa-testing/issues/11) | Images mode displays previously translated image instead of newly pasted clipboard image after reopening the tab | *Not labelled* | IMG-006 (High) | Images |
| [#13](https://github.com/shahana15/google-translate-qa-testing/issues/13) | Clicking quick-access language shortcut tabs in Images mode does not switch the active language | Medium | LS-015, IME-009 | Images / language selection |
| [#16](https://github.com/shahana15/google-translate-qa-testing/issues/16) | Mixed English-Sinhala input leaves Sinhala phrase untranslated when target language is English | Medium | L10N-007 | Localization |
| [#17](https://github.com/shahana15/google-translate-qa-testing/issues/17) | Empty source text panel does not display a visible input placeholder or help text | Low | UI-PL-001 | UI |

## Enhancement requests (8)

| Issue | Title | Severity | Raised from (test case) |
|---|---|---|---|
| [#1](https://github.com/shahana15/google-translate-qa-testing/issues/1) | Offline translation failure message does not identify the no-internet condition | — | SMK-010 |
| [#8](https://github.com/shahana15/google-translate-qa-testing/issues/8) | Documents mode does not display the maximum permitted upload file size | — | DOC-003 |
| [#9](https://github.com/shahana15/google-translate-qa-testing/issues/9) | Oversized document uploads should show a clear size-specific rejection message and recovery guidance | — | DOC-005 |
| [#12](https://github.com/shahana15/google-translate-qa-testing/issues/12) | Use a clearer no-text message for images that contain no detectable text | low | IMG-003 |
| [#14](https://github.com/shahana15/google-translate-qa-testing/issues/14) | Indicate whether feedback screenshots are optional or required | low | FBK-029, FBK-031, FBK-032, FBK-033 |
| [#15](https://github.com/shahana15/google-translate-qa-testing/issues/15) | Improve English-to-Sinhala idiom translation and indicate figurative-language uncertainty | — | L10N-004 |
| [#18](https://github.com/shahana15/google-translate-qa-testing/issues/18) | Explain Documents-mode unavailability on Android mobile web | — | DOC-010 |
| [#19](https://github.com/shahana15/google-translate-qa-testing/issues/19) | Explain or provide an alternative when handwriting input is unavailable on Android mobile web | — | IME-010 |

## Defect distribution by area

| Area | Defects |
|---|---:|
| Voice input | 3 (#4, #5, #6) |
| Translation quality / text handling (incl. localization) | 4 (#2, #3, #7, #16) |
| Images mode | 2 (#11, #13) |
| Documents | 1 (#10) |
| UI | 1 (#17) |

## Notes

- Translation-quality items (#2, #7, #15, #16) reflect the behaviour of a machine-translation service on the execution dates; wording can vary between runs (Test Plan §4.2, §12). They were raised because the output loses or distorts meaning, not because a specific string was expected.
- Test-case Status is **Fail** only where a stated expected result was not met. Enhancement requests raised from a passing case (for example SMK-010, IMG-003, FBK-029) are recorded in that case's Comments and do not change its Pass status.
- Full reproduction steps, environment and screenshots/video are in each GitHub Issue, not repeated here.
