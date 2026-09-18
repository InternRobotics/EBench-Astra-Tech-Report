# EBench Astra report website — editing handoff

## Run and edit

This is a dependency-free static site. `dist/` contains the authored website source (it is not disposable build output). Run `npm run dev`, then open `http://127.0.0.1:4173/`. Use `npm run check` and `npm run validate` before shipping changes. Git LFS is required for MP4 and PDF assets: run `git lfs install` and `git lfs pull` after cloning.

- `dist/index.html`: report masthead, authors, links, section sequence.
- `dist/showcase.css`: current light report design and responsive overrides.
- `dist/style.css`: shared original chart, table, dialog and video primitives.
- `dist/app.js`: report narrative, main findings, case tabs, videos, supplementary dialogs.
- `dist/narrative.js`: source-grounded analytical synthesis; see `docs/REPORT-COPY.md` for the editorial brief and source map.
- `dist/charts.js`: SVG bar charts, metric/model selection, sortable task heatmap.
- `dist/showcase.js`: featured demo switching, case focus, stage controls, decorative canvas.
- `dist/research.js`: main-page comparison matrices, POC, behavioral evidence, episode dots, video library.
- `dist/data/`: chart/table data and selected-episode metadata. Raw field ID `FastWAM` remains stable; visible name is **Fast-WAM**.

## Current agreed presentation

The masthead pairs the official **InternRobotics** and **Shanghai AI Laboratory** logos. Use the original local assets in `dist/media/brand/`, preserving their proportions; see `docs/brand-assets.json` for provenance. The old “InterRobotics” spelling was incorrect. All user-facing model mentions use **GPT-6-Astra**, including charts, tables, controls and video captions. Canonical data key `Astra (ICL)` and existing asset filenames remain unchanged; normalize display labels rather than renaming source fields.

The latest author direction prioritizes three research questions: Astra versus VLA/WAM capability differences, failure patterns and research implications, and exploration/correction/within-episode experience use. Present dataset results before analysis. Do not compress the report into slogans or restore it verbatim; preserve explanatory substance and connect claims to evidence. The 26-task rollout library is one collapsed case card, not a standalone benchmark-promotion section. Chart colors are blue/indigo/cool gray; mustard, olive and salmon were explicitly rejected.

Light main reading areas, dark navigation/footer accents, restrained stars only in the masthead. Avoid turning each finding or chart into a card. Overall performance is the first main section. The author removed the redundant 46.73% / 2 of 8 / 26 tasks / 510 episodes masthead summary strip; do not reintroduce it. The masthead includes all authors and affiliations from the preserved report layout, a working Evaluation Entrance and disabled arXiv Coming soon button. The arXiv URL does not exist yet. The author asked to withdraw the unfinished current PDF from the page: do not add PDF download buttons, page citations linking to it, or PDF links in supplementary dialogs. Keep the source draft for internal reference.

The main benchmark table has three views: overall/task attributes, all 26 tasks, and distribution shifts. It includes all eight current systems, with shared absolute color scales, rounded heat cells, SR/Score switching and task sorting/filtering. Screenshot references supplied by the author are visual references only; their old model cohorts and numbers must not replace current data.

## Evidence and scientific boundaries

- The latest user-supplied `Ebench_Agent_report.pdf` is copied unchanged to `dist/report.pdf`. Its publication title and conclusion remain work in progress. The website title remains the Astra evaluation title.
- Main cohort: **26 tasks, 510 episodes, one-demo ICL throughout**. Task-macro SR **46.73%**, Score **0.6537**. Astra ranks second of eight.
- Episode counts: **237 successful / 188 incomplete with positive Score / 85 incomplete with zero Score**. Episode-weighted SR is 46.47%, distinct from task-macro SR.
- `report-figures.json` provides report-level rounded aggregates. `tasks.json` provides the retained task values. `episodes.json` contains only task, seed, SR, Score for the 510 retained episodes. `report-SOURCE_MAP.json` records supplied source hashes.
- The main library covers all 26 tasks via 27 supplied demos (one extra peg example); selected video frequency is not a success estimate.
- Coffee-beans episode 013 and fruit episode 015 are extracted from the full video archive and transcoded to browser-compatible H.264. Captions follow the PDF, not inferred hidden reasoning. Public action descriptions are quotes from the supplied report.
- Apple-to-fruit-bowl episode 006 adds a successful exploration/recovery example. Three public action notes link detection of a slip, obtaining a wider view, and changing the next transport strategy. The exact recording and terminal result are matched; see `docs/REPORT-COPY.md`. This is within-episode experience use, not demonstrated cross-episode learning.
- Case-study teacup, glasses, frame and gear videos are selected qualitative comparisons. Do not infer recovery frequency or benchmark success from visual local score labels.
- Frame/gear paired ICL studies each have four fresh paired seeds. Dishwasher has five historical comparisons with channel/date differences. These are separate from both the main cohort and the selected qualitative case videos.

## POC — user clarification

POC is an **independent validation experiment outside EBench's original 26 tasks**, not an ICL experiment. Compared VLA/WAM policies are retrained and evaluated on this experiment's constituent atomic skills. Objects and skills are familiar to those policies, but the composed evaluation tasks are unseen. Test-time execution is **zero-shot, without demonstrations**, including Astra. This probes composition/generalization and task understanding.

Four provided videos are included: Astra, π₀.₅, OpenWAM recording 1, OpenWAM recording 2. The author has not confirmed the two OpenWAM checkpoint identities or aggregate scores. Preserve supplied numbering, do not infer checkpoint names, and do not add quantitative POC claims. The experiment's full narrative is still being written.

## Pending author edits

The author explicitly said the previous Implications claims were not all correct and will provide revisions, then requested analysis of what the three research questions imply. The current discussion therefore poses concrete, evidence-grounded research directions rather than claiming evaluated improvements; do not treat final implications as approved. POC checkpoint labels and final analysis, arXiv URL, and publication copy remain author-owned open items.

## Assets and backups

All assets referenced by the running site are local and included in Git/LFS. Original multi-GB archives and machine-specific backup directories are not committed. Local backups preserve the earlier paper/report layout, the card version, and the continuous dark version. The current source can be edited remotely without those archives.

No external API credentials or account access are required. `.openai/` contains machine-specific site registration and is excluded from the remote handoff. Synchronizing this repository does not deploy the website.

Benchmark overview and Evaluation metrics links go to https://internrobotics.github.io/EBench-doc/getting-started/overview/; task exploration goes to https://internrobotics.github.io/EBench-doc/evaluation/task-showcase/. Report-specific comparison tables and ablations remain within this report. Keep the overall rate and secondary Score in one aligned typographic group, with the metric description above.

Use **single-shot ICL** consistently in edited page copy (the introductory expansion remains “Single-shot In-Context Learning (ICL)”). KaTeX 0.16.22 is copied from Gauge into `dist/vendor/katex/` with fonts and MIT license. `dist/model-math.js` renders the model names as `\pi_{0}` and `\pi_{0.5}`, including newly inserted tables, case controls, captions and SVG chart labels. Canonical Pi0/Pi05 data keys remain unchanged.

Reading hierarchy: retain selective semantic bold on decisive comparisons, failure patterns and action revisions; avoid uniformly emphasizing whole paragraphs. Both heatmaps use one shared absolute blue scale and choose black/white text from relative luminance, with a measured minimum contrast of 4.59:1 across 10,001 sampled values. Do not restore the previous fixed score threshold for text color.


## Complete historical ICL packages (2026-09-18)

- Setup now contains a compact visual card opening the actual reference input viewer. ICL case studies also link to their task package.
- `dist/icl-viewer.js` loads `dist/data/icl-packages.json`: all 26 main-cohort seed-000 packages, 417 original text blocks and 365 original PNGs. Every input is retained in order, including numeric excerpts and historical/current boundary markers. Only image paths are relocated. Complete input tab and per-task JSON download preserve source precision; the overview table rounds numbers for readability.
- Images are in `dist/media/icl/`; `docs/icl-assets.json` records the source archive, original data entries and hashes. `npm run validate` verifies every image hash and coverage. These assets total about 91 MB and load on demand.
- User explicitly distinguishes actual supplied ICL data (show completely) from casually written authoring prompts (do not publish). Do not expose original-user-prompts, annotation-batch templates, or initial execution prompts as report appendices.
- Source `episode` identifies the receiving evaluation run; historical source episodes are specified in the original annotations. Historical top-camera views are not live-policy observations. Demonstrations have no official source success labels.
- Paired ICL appendix now separates the eight fresh pairs from the five historical dishwasher comparisons; displays both SR and Score, regressions, and terminal holding caveats from appendix.tex. No main-cohort aggregate is changed.


## Author copy revision 1

The masthead title is “How Frontier Language Models Reshape Embodied Policies”, with subtitle “A Comprehensive Evaluation of GPT-6-Astra on EBench”. Introduction now precedes Overall performance, using the author's four paragraphs verbatim (including requested emphasis). This supersedes the previous results-first opening; quantitative results still precede General Analysis. The opening epigraph is “Welcome to the real world.” — The Matrix (1999), with a linked attribution. The launch date and qualitative framing in this opening are author-supplied copy, not newly verified benchmark findings.
