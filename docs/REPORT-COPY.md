# Report narrative and evidence map

The author’s latest instruction is to synthesize the report around three research questions, not restore it word for word or reduce it to promotional headlines:

1. Where do Astra and conventional VLA/WAM policies each have advantages and disadvantages?
2. What failure patterns appear, and what questions do they raise for embodied research?
3. What do exploration, correction, and within-episode experience use suggest for future agents?

Report dataset results first. The page begins with overall results and the full eight-system comparison, including task groups, all 26 tasks, and perturbations. Introduction and setup establish the conditions before the analytical chapters. The discussion interprets observations and proposes research directions; it is not a finalized author-approved Implications section.

## Source mapping

| Web content | Supplied PDF / evidence |
| --- | --- |
| Introduction, benchmark choice | PDF p. 1–2 |
| Interface, demonstrations, execution budgets, settings | PDF p. 2–4; author’s POC clarification |
| Overall comparison | PDF p. 4–5; `report-figures.json` |
| Mobile manipulation, clutter, perturbations | PDF p. 5 |
| Precision, contact uncertainty | PDF p. 6 |
| Long-horizon completion, retry and feedback questions | PDF p. 6–7 |
| Coffee / fruit behavioral evidence | PDF p. 7–9 |
| Experience use and future research questions | PDF p. 9, plus Apple006 public action records |
| ICL frame / gear | PDF p. 9–10; separate paired ablation data |
| Teacup recovery / glasses packing comparisons | PDF p. 10–11 |

`dist/narrative.js` contains edited analytical paragraphs. `dist/data/report-copy.json` preserves 46 extracted source paragraphs, their PDF pages, and the PDF SHA256 for editorial comparison; it is not automatically rendered. `scripts/extract-report-copy.py` regenerates that reference from the supplied PDF. It normalizes PDF line breaks, ligatures and unresolved bibliography markers. The PDF remains unchanged.

The web adaptation retains claims and explanations relevant to the three questions, removes broken draft references, and links to the report or corresponding data. The conclusion was initially left provisional; the author supplied its substantive argument on 2026-09-19, and the current conclusion follows that argument (see below). The report’s frame paragraph has a cup/pen-holder wording inconsistency; web copy describes grasp orientation, bimanual coordination, and placement without silently resolving that source inconsistency.

## Added primary evidence: Apple006

The subagent audit identified `apple_to_fruit_bowl / 006` in the supplied core archive as a complete example of observing a failure, obtaining a wider view, and changing the next transport attempt using that experience. Public tool argument `reason` fields, not hidden reasoning, are quoted:

- Call 10: detects a possible slip from the finger gap and moves clear.
- Call 11: withdraws for a wider view to relocate the apple.
- Call 17: uses the arm alone, explicitly referring to the earlier base-motion slip.

Source: `astra_web_evidence_20260918_core.zip` → `astra_web_evidence_20260918/evidence/main/episodes/apple_to_fruit_bowl_006/public-action-records.json` and `episode_summary.json`. Terminal server result is SR 1 / Score 1, 1041 physics steps, 20 calls, no continuation. The archived demonstration used base shifts; the shared prompt already included grasp verification and retry guidance. The agent’s explanation is not an independent causal measurement of why the apple slipped.

The corresponding full-video archive recording is transcoded to H.264 in `dist/media/cases/apple_to_fruit_bowl_006-web.mp4`. `dist/data/apple-recovery-evidence.json` contains only the selected public action notes and relevant terminal metadata, without internal paths or account identifiers. The video and outcome refer to the same seed.

## Presentation decisions

- Blue, indigo, lavender and cool-gray series only. Model labels and direct values retain identification; do not restore mustard, olive or salmon series.
- The 26-task supplementary video collection is a single expandable card within Case Study, collapsed initially. It is not a separate benchmark promotion chapter.
- Every main analytical section starts from results or an observed sequence before interpretation.
- Do not turn every paragraph into a card. Prose uses readable widths, with charts and videos supporting it.
- No claims of measured cross-episode learning, recursive self-improvement, general recovery superiority, or confirmed POC aggregate performance.

The PDF/content audit was performed by a subagent and its final three wording corrections were applied: restrict the specialized-policy advantage to leading systems, describe failure patterns without claiming causal identification, and identify the apple failure as the first transport attempt rather than the start of the episode.

## Author-directed conclusion and safety analysis (2026-09-19)

The author supplied the conclusion's argument in conversation: complementary agent/on-device control; transferring planning, exploration, and recovery through intention imitation; converting exploratory experience into reusable knowledge/tools and RSI; and safety beyond simulator feasibility. The English adaptation is in `dist/index.html`, with selective emphasis and continuous prose. Do not infer that a measurement is unavailable just because it was absent from the draft report. The subsequent author correction and execution-log analysis below replace the earlier blanket disclaimer about timing and hardware analysis.

The supporting safety analysis follows emerging capabilities and precedes Case Studies. Its three interactive examples in `dist/research.js` reuse existing source-matched videos:

- Coffee `collect_coffee_beans_013-web.mp4`: public calls 21 and 45–47 request spoon/finger contact adjustments; terminal Score 0.50 / SR 0. These requests do not prove measured surface height or successful contact. The risk of forceful table contact is an interpretation, not a recorded force measurement.
- Glasses `astra-glasses.mp4`: the report's fine-manipulation comparison describes protruding temples and unfinished closure. Pinching/breakage is a possible real-world consequence, not observed damage. This selected case has no main-cohort seed attached and receives no fabricated score.
- Apple `apple_to_fruit_bowl_006-web.mp4`: the public recovery notes and server-confirmed success demonstrate why eventual success alone can hide intermediate object loss. The explanation of base-motion slip is attributed to the agent, not established as an independent causal finding.

Large pose corrections and coordination concerns follow the author's qualitative observations and `analysis/latex-review/analysis.tex`, Behavioral Implications. No unverified dishwasher-failure recording is relabeled as evidence: the existing selected dishwasher video is a successful episode. The older draft's broad bimanual-frequency and motor-damage claims are not represented as measured results.

RPent's planner/VLA-tool architecture was verified against its official documentation: https://rpent.readthedocs.io/en/latest/rst_source/development/architecture.html (accessed 2026-09-19). Only this architectural relation is cited; no external performance claims are imported.

## Timing and physical constraints: author correction and calculation

The author clarified that the simulator frequency is 30 Hz and that timing/physical-constraint analysis should use logged timestamps, steps, joint states, URDF limits, and real-robot specifications. Removed the conclusion's blanket disclaimer and replaced the generic Scope and limitations popup with Evaluation protocol and execution measurements. The conclusion now calls for concrete timing and motion-limit analysis rather than suggesting such analysis requires physical deployment trials.

`scripts/analyze-execution-timing.py` reads three selected main-cohort episodes directly from `astra_web_evidence_20260918_core.zip`. Reproduce with `python scripts/analyze-execution-timing.py astra_web_evidence_20260918_core.zip`. The output `dist/data/execution-timing.json` records source SHA256 hashes, the author-supplied frequency, calculations, and definitions. It publishes no raw prompts, host paths, or account identifiers.

| Episode | Policy steps | Simulated seconds | Policy wall seconds | Longest action batch, simulated seconds |
| --- | ---: | ---: | ---: | ---: |
| apple_to_fruit_bowl_006 | 1041 | 34.70 | 729.84 | 2.13 |
| collect_coffee_beans_013 | 3500 | 116.67 | 5050.40 | 6.40 |
| utensils_to_holder_000 | 2000 | 66.67 | 2658.43 | 4.00 |

All three have zero terminal-hold steps. The script verifies that recorded chunk execution and public-action step increments both sum to policy_physics_steps. Terminal chunks have executed_steps but no final joint-state observation; their steps count toward timing but they are excluded from joint finite differences. This is a three-case analysis, not a 510-episode aggregate.

Policy wall duration includes the execution system as well as model processing. Pure inference requires appropriately bounded request/response timestamps and separation of tool wall time; wall duration minus simulated duration is not that measurement. The chunk time field alone is not a model-request start/end pair. The script does not label either metric as pure model latency.

Joint displacement over the logged step interval yields segment-average angular velocity. The largest absolute segment averages are approximately 2.321, 1.889, and 1.902 rad/s, respectively. State samples are typically eight steps apart, so these are not instantaneous peaks. No matching evaluated-robot URDF/hardware limits or joint-name map has been incorporated into this calculation; it makes no numerical compliance/violation claim. The appendix explains how to perform that comparison once the exact configuration is aligned. Request-level latency decomposition and physical-limit ratios remain additional analyses, not grounds to declare the source logs unusable.

## Author-approved review implementation

The author explicitly requested light introduction edits and accepted other review improvements, while preserving the precision argument because a larger comparative video corpus will appear in the formal report. No precision subgroup caveat, cross-tab or new precision analysis has been inserted; the existing precision narrative and figures remain unchanged.

The introduction keeps its original two-paragraph structure and research question, but replaces paradigm-shift/consensus/unimaginable/effortless-bypass claims with early experimental motivation. Conclusion changes preserve the four author-provided directions while defining event-based control handoff, recovery training units, and frozen-tool evaluation on new tasks. Precision remains a clear execution bottleneck; feedback timing is supported separately by the execution protocol.

The protocol popup now distinguishes the <=8-step transport chunk from the full tool-call sequence, documents corrected-scene apple cohort replacement and invalid utensils013 replacement, and publishes summary-derived holding/route counts. `evaluation-provenance.json` is a privacy-filtered manifest generated by `scripts/build-protocol-manifest.py`; it is cross-checked against all current episode outcomes. Data-source notes retain portal overall values and episode-derived task/group values, explicitly listing final-digit Score differences rather than silently altering reported data. No comparator camera/scene/budget equivalence is asserted beyond archived evidence.

This revision does not run new experiments or claim that recovery rates, whole-cohort inference timing, matched hardware limits, POC aggregate results, or cross-task RSI have now been measured. Those remain separately scoped analyses. Browser automation was unavailable; source/data and live HTTP checks were used.

## ICL overview correction

The default demonstration view now presents the original task-level keyframe contact sheet together with a concise, verbatim Observed sequence/technique excerpt from the same task's supplied ICL context. This responds to the author's reference to IN-MANU/ref/icl/bottle/keyframes_preview.jpg. The source checkout at 814d311 has 12 tasks (191 frames), all byte/label-matched to the website; the core archive supplies the remaining 14. There was no detected mismatch in those existing runtime image/label pairs; the old presentation conflated a short image label with the complete prompt and omitted task overviews.

All 26 overviews are original source JPEGs, not reconstructed montages or AI-generated illustrations. Keyframes now show the exact source phase keyed by image path, frame and camera. State/action arrays and original captions are secondary disclosures. Full prompt retains all actual input text/images with numerical records collapsed for readability, plus an unchanged original-input download. Neither annotation-generation requests nor arbitrary author prompts are imported. See icl-overviews.json for source hashes and scripts/build-icl-overviews.py for reproduction.
