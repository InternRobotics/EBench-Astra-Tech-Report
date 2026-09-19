# Fable interactive refresh: review and selective adoption

Reviewed remote `design/interactive-refresh`, including design commit `81b8d80` and tip `fb74188`. The branch diverges before recent author revisions, so its changes were ported selectively rather than replacing current files or merging old page structure.

## Adopted

- Shared SVG primitives, hover/focus tooltips and linked model highlighting from `viz.js`.
- Attribute dot-strip charts showing all eight systems, with emphasis controls instead of hiding systems. Numerical tables and the existing aggregation helper remain unchanged.
- Fourth benchmark-matrix view, GPT-6-Astra vs. field, with best/median reference and direct task-video access. Current task-gap analysis remains in the narrative.
- Perturbation slope chart in its supplementary dialog, paired ICL dumbbells in the ICL cases and appendix, and execution-time charts in Safety and the protocol dialog.
- Reading progress, back-to-top, section links and the mobile Contents position at the lower edge. Section links do not silently copy to the clipboard.
- Scoped figure styling. The current report typography, text, author layout, episode autoplay card and merged failure analysis are retained.

## Corrections and exclusions

1. **Wilson interval not adopted.** The proposed code calculates `wilson(taskMacroSR, 510)`. A task-macro mean is not a binomial proportion of 510 independent Bernoulli trials; flagging ignored clustering does not fix that estimand mismatch. A future interval should match the estimator and sampling design.
2. **Tied ranks corrected.** Dot ranks now equal one plus the number of strictly higher values; all tied best systems receive a ring. The original sorted-index rank assigned different ranks to ties.
3. **Current outcome views retained.** The older 26-row episode grid would repeat the just-merged outcome/task discussion and reintroduce controls the author had removed. The seven discussed task bars plus bottom expand/collapse remain intact.
4. **No restored key-number blocks or count-up.** Current prose emphasis is intentional. No masthead metric strip, PDF link, narrative rollback or reading-order change is introduced.
5. **Responsive/interaction fixes.** Task-difference values use a dedicated right column to avoid overlapping task names; paired plots reserve usable narrow-screen space; timing labels are shortened; full GPT-6-Astra labels are retained. Tooltips respond to keyboard focus and Escape and close with dialogs. The slope domain spans 0–1.
6. **No untested significance assertion.** The field-view caption no longer calls small differences “within the noise” without an analysis. It states the actual 15/20 per-task sample sizes and descriptive scope.

## Study Limitations

The footer expansion card is removed. A larger **Study Limitations** button beneath Conclusion opens the shared floating dialog. The complete text is preserved in `study-limitations-content`; sidebar and direct hash links open the same dialog. Protocol/execution measurements remain a separate existing entry.

## Validation

All existing JSON data and `narrative.js` are unchanged. `npm run check` and `npm run validate` include the adopted visualization module. `scripts/validate-refresh.mjs` renders SVG trees at 340/760 px and verifies eight-system coverage, tied ranks, field deltas, paired-score counts and finite, nonnegative geometry. Targeted checks retain the seven-task expansion behavior and episode autoplay/interaction synchronization. HTML nesting and preservation of the limitations text were checked.

Browser screenshot QA remains unavailable because the configured browser connection returns a malformed response. Fable's earlier screenshots do not establish visual correctness of this selectively integrated version.

## Subsequent content cleanup

Following the author's request and an independent redundancy review, the duplicate Safety timing figure is removed; the recorded execution timing dialog retains the three computed episode results and concise metric definitions. Unperformed URDF/hardware-limit comparison methods are removed from the report, together with reader-facing hash links and a duplicate ICL entry. Hashes remain in source assets for validation. Qualitative safety videos remain, with descriptions limited to recorded events and their safety implications. Coffee and fruit commentary now describes observations instead of giving editorial instructions. Video table links use “Video link” in the normal text font.

No report data or precision analysis changed. Syntax, data, ICL, episode alignment, insight and SVG checks pass after this cleanup.
