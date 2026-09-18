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

The author supplied the conclusion's argument in conversation: complementary agent/on-device control; transferring planning, exploration, and recovery through intention imitation; converting exploratory experience into reusable knowledge/tools and RSI; and safety beyond simulator feasibility. The English adaptation is in `dist/index.html`, with selective emphasis and continuous prose. These are proposed research directions, not implemented or evaluated gains. No latency comparison, hardware damage measurement, or retained cross-episode learning is claimed.

The supporting safety analysis follows emerging capabilities and precedes Case Studies. Its three interactive examples in `dist/research.js` reuse existing source-matched videos:

- Coffee `collect_coffee_beans_013-web.mp4`: public calls 21 and 45–47 request spoon/finger contact adjustments; terminal Score 0.50 / SR 0. These requests do not prove measured surface height or successful contact. The risk of forceful table contact is an interpretation, not a recorded force measurement.
- Glasses `astra-glasses.mp4`: the report's fine-manipulation comparison describes protruding temples and unfinished closure. Pinching/breakage is a possible real-world consequence, not observed damage. This selected case has no main-cohort seed attached and receives no fabricated score.
- Apple `apple_to_fruit_bowl_006-web.mp4`: the public recovery notes and server-confirmed success demonstrate why eventual success alone can hide intermediate object loss. The explanation of base-motion slip is attributed to the agent, not established as an independent causal finding.

Large pose corrections and coordination concerns follow the author's qualitative observations and `analysis/latex-review/analysis.tex`, Behavioral Implications. No unverified dishwasher-failure recording is relabeled as evidence: the existing selected dishwasher video is a successful episode. The older draft's broad bimanual-frequency and motor-damage claims are not represented as measured results.

RPent's planner/VLA-tool architecture was verified against its official documentation: https://rpent.readthedocs.io/en/latest/rst_source/development/architecture.html (accessed 2026-09-19). Only this architectural relation is cited; no external performance claims are imported.
