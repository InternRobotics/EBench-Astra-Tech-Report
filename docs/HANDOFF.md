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

Light main reading areas, dark navigation/footer accents, restrained stars only in the masthead. Avoid turning each finding or chart into a card. The opening motivation precedes Benchmark Results, which introduces the experiment before showing metrics. The author removed the redundant 46.73% / 2 of 8 / 26 tasks / 510 episodes masthead summary strip; do not reintroduce it. The masthead includes all authors and affiliations from the preserved report layout, a working Evaluation Entrance and disabled arXiv Coming soon button. The arXiv URL does not exist yet. The author asked to withdraw the unfinished current PDF from the page: do not add PDF download buttons, page citations linking to it, or PDF links in supplementary dialogs. Keep the source draft for internal reference.

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


## Author copy revision 2

Remove the visible Introduction label. Preserve the opening prose as two paragraphs (model context + frontier question; EBench rationale), linking the first prose mention of EBench to https://github.com/InternRobotics/EBench. Rename the results chapter Benchmark Results. Its opening now gives the 26-task / 510-episode evaluation scope and open-source leaderboard comparison before the enlarged SR and Score. Then report second place behind OpenWAM-α and introduce capability differences. Footnote 1 explains the author's exclusion of Amapbot Group due to missing reliable model description and references. The note defines report scope without changing benchmark data.


## Reading order after setup revision

Opening motivation → benchmark scope and headline SR/Score → Experiment Setup (including complete ICL package card) → Complete benchmark comparison → General Analysis and cases. The matrix and its supplementary-result links now live in #comparison, after #setup. #overall retains the headline chart and comparison-scope footnote. Do not move the full comparison ahead of the experiment explanation.


## Frame-aligned ICL text and Matrix epigraph

The ICL frame viewer pairs each original image with its immediately preceding text input, displayed verbatim in a dedicated Frame Prompt panel with one-based source block numbers. The shared task annotation remains available under “Shared task prompt”; it is distinct from frame-specific text and no authoring prompts are added. Thumbnails, next/previous and range selection all update the same pair.

`dist/quote-effect.js` supplies a canvas digital-rain background confined to the Matrix quotation. Text stays centered in Allura with a right-aligned attribution. The animation has its own pause button, respects reduced-motion preference, and stops when offscreen or the document is hidden. The report body remains light.


## Navigation and ICL album revision (2026-09-19)

Shanghai AI Lab logo now precedes InternRobotics. The header stays sticky, including a second navigation row on phones. `report-navigation.js` provides the fixed left Contents toggle, current-section tracking, Escape collapse, and per-session preference. At >=1400 px an expanded outline reserves 230 px beside the body; on smaller screens it overlays and closes after selecting a link.

The Matrix quote now uses a lighter blue background with green characters. The on-card pause button is removed at the author's request; reduced-motion, offscreen and visibility handling remain. ICL frames and original text have equal-width/equal-height panels on desktop, readable labels, and previous/next controls outside the pair, plus keyboard arrows. Phones stack the panels. Data and source wording remain unchanged.


## Author clarification: ICL preparation and POC trajectories

A separate GPT-6-Astra instance at `high` reasoning effort reviews one training-set video trajectory per task and autonomously chooses the annotated keyframes and accompanying prompts. This provenance is now stated both in Experiment Setup and the ICL viewer; do not confuse it with the evaluation agent or publish authoring prompts. Format `high` as inline code. Composed POC tasks have no ground-truth trajectories, which is why their evaluation uses zero-shot rather than ICL. Atomic-skill training of comparison policies remains distinct from those unseen compositions. These details were explicitly supplied by the author on 2026-09-19.


## Complete task-attribute filters

The task heatmap and video library share a Task attribute selector with optgroups: Mobility (Mobile/Tabletop), Precision (Low/Medium/High), Task horizon (Short/Long). All seven options show counts computed from tasks.json. `matchesTaskGroup` uses the explicit field and value, so categories from different dimensions cannot be confused. The counts describe the complete task cohort; search and video-outcome filters may reduce the displayed results further.

## Conclusion and safety revision (2026-09-19)

The author supplied a new conclusion, titled “Conclusion and Insights: where shall we head to?”. Preserve its four directions: couple agents with on-device policies; transfer planning/exploration/recovery through intention imitation; turn experience into reusable tools and RSI; make safety part of execution. The RPent architectural reference links to official documentation. RSI, training-data efficiency, and hybrid benefits remain proposed directions rather than measured improvements.

A Safety in execution subsection now follows emerging capabilities and precedes Case Studies, with a Contents link. Three keyboard-accessible tabs reuse coffee013, the qualitative Astra glasses recording, and apple006. Each separates recorded behavior from a prospective physical risk and a control question. Do not label glasses with a main-cohort seed or a score, and do not treat requested contact adjustments as verified contact. See REPORT-COPY.md for evidence provenance. Browser automation was unavailable during this revision; perform visual QA when its connection recovers.

## Timing/physical-constraint correction (2026-09-19)

Remove blanket statements that latency or safety cannot be assessed because they are not in the current manuscript. The author confirmed 30 Hz simulation and requested trajectory-based comparison with URDF and hardware limits. The conclusion no longer carries the unsolicited disclaimer. The limitations entry now opens Evaluation protocol and execution measurements, with a three-case timing table, separate clocks for simulator duration and policy wall duration, and joint-limit analysis methodology.

Reproduction: python scripts/analyze-execution-timing.py astra_web_evidence_20260918_core.zip. Output: dist/data/execution-timing.json. Values and definitions are documented in REPORT-COPY.md. No pure-inference latency or hardware-limit exceedance is inferred from policy wall time or sparse joint samples. The exact URDF/hardware comparison has not yet been incorporated into this calculation; do not substitute an unrelated robot configuration.

## Review changes accepted by the author (2026-09-19)

The author approved a light softening of the introduction and improvements from the review, with an explicit exception: **keep the precision analysis and its conclusions**. Extensive comparative video evidence will be presented in the formal report. Do not add the proposed attribute-confounding discussion or reduce the precision claim as a follow-up “fix”. The precision/mobile/horizon narrative and precision charts remain unchanged in this revision.

Implemented: a two-paragraph introduction that presents the bottlenecks as questions; correct tool-call versus eight-step transport-chunk feedback wording; protocol and metric-source popups; a sanitized 510-episode provenance manifest; source-preserving disclosure of final-digit Score differences; more specific controller handoff, recovery-supervision, and held-out tool evaluation questions in the conclusion. The author's current ICL preparation description (`high`) remains authoritative; historical effort metadata needs version reconciliation before making any change.

The source manifest is generated with `python scripts/build-protocol-manifest.py astra_web_evidence_20260918_core.zip`. It publishes allowlisted outcomes, holding/route metadata, retained batch labels, source hashes and seven submission URLs; no authoring prompts, account profiles or server paths. The one account-number-bearing source batch label is replaced with a neutral batch label. `npm run validate` checks all outcomes, aggregate holding/route counts and reported comparator totals. Existing benchmark values are preserved. Unknown comparator configuration fields are described as unestablished by the archived metadata; they are not invented.

## Task-level ICL overviews and concise annotations (2026-09-19)

The author clarified that every task needs its full keyframe overview, with the corresponding demonstration description, following IN-MANU's `ref/icl/bottle/keyframes_preview.jpg`. Default the ICL viewer to Overview. Keep Keyframes and Full prompt as secondary tabs; do not restore text/image input-block numbers or an always-expanded numeric dump in the main view.

Read-only source checkout: securityCFS/IN-MANU, branch research/robot-agent-harness, commit 814d3112772c7a6e06ded20ae90149530376f363. Its 12 tasks / 191 image hashes and original labels exactly match the existing actual runtime inputs. Its task overviews are imported unchanged. The other 14 tasks' original overviews come from the existing core archive, whose ref manifests are checked against the same displayed inputs. All 26 tasks now have `media/icl/<task>/keyframes_preview.jpg`.

`dist/data/icl-overviews.json` pairs each original overview with an exact Observed sequence/technique excerpt from that task's supplied context. Per-frame annotations are matched through the source image path, frame and camera, rather than inferred from neighboring UI text or a caption regex. The data records overview/image hashes and source revision/manifest hashes. Generate with `python scripts/build-icl-overviews.py analysis/IN-MANU astra_web_evidence_20260918_core.zip`. The actual `icl-packages.json` is unchanged, and its download remains the original complete input.

Validation covers 26 overview hashes, 365 frame/image/caption associations, and context membership of all overview descriptions. Render-function checks also exercised every overview, keyframe, and full-prompt view; live HTTP checks confirmed all 26 JPEGs. Browser automation remains unavailable, so no browser screenshot QA was claimed.


## Model references and chart simplification (2026-09-19)

Removed all “View numerical data” expanders and their duplicate tables from charts. The full comparison matrix, metric controls and hover/focus values remain. The existing sources dialog now includes citations for all eight models and official repository links for the seven comparison systems. GPT-6-Astra links to OpenAI’s official release; no verified public model repository was found, so no SDK or Codex repository is substituted.

References were checked against official repositories, project pages and arXiv. InternVLA-A1.5’s official project page links to the A-series repository; its BibTeX names an A1.5 repository that currently returns “Repository not found”, so the working project-page GitHub link is used. The A1.5 paper links directly to the PDF on the official project site. GigaBrain-0.7 code is in open-gigaai/giga-brain-0 (the repository README identifies version 0.7). No benchmark data changed.

Model references are now directly discoverable from the header and Contents via #model-references, plus a prominent entry in Experiment Setup. The former matrix-footnote entry is removed. The shared dialog opens with the eight citations before metric provenance. Hash links open it directly, including on initial load.

Model References entry moved to immediately below the EBench leaderboard paragraph in Benchmark Results, as a simple text link. Removed the separate Experiment Setup block and header item; Contents links to the new position. Secondary HTML captions and controls are enlarged to 13–15px, with readable contrast; main metric definitions use 15px and the model-comparison heading 19px.

Matrix quote animation uses only Latin letters and digits, with mostly green streams and occasional red streams (~1/23 passes). The hero Pause motion button and its JS dependency are removed; animation still honors reduced-motion preferences and tab visibility.

The duplicated task-gap chart below “Second overall, with sharply different strengths” is removed. Its named-model comparator, four cross-group filters and task-name ordering are merged into Complete benchmark comparison → GPT-6-Astra vs. field, alongside existing best/median references and SR/Score controls. The narrative retains its ranking interpretation and a link that selects the shared field tab.


## Analysis consolidation after review (2026-09-19)

The author accepts repetition inside dialogs and expandable views; keep those existing resources. Main-page cleanup removes the Featured demonstrations carousel (its teacup, frame and bookmark videos remain in their original evidence sections), moves the perturbation range chart into Distribution shifts as a Numerical comparison / Success-rate ranges switch, and links the analysis directly to that range view. The generalization appendix and All systems & task groups dialog are retained.

Emerging capabilities ends with one observation-based sentence; the RSI research discussion remains in Conclusion. The teacup/glasses complementarity statement appears once in the Case Studies introduction, rather than being reinjected under both tabs. Full interactions, safety cases, precision analysis, cross-groups and the seven-task outcome expansion are preserved. Range-view output and interaction readouts were checked against all 32 original condition values and eight ranges; no benchmark data changed.

The original fruit_015, apple_to_fruit_bowl_006 and collect_coffee_beans_013 behavior recordings are stitched overview / left wrist / right wrist. Their generic camera controls map Center to the first pane and Left to the second, with Right unchanged. This asset-specific correction also applies when the recordings appear in Safety. Other video layouts and the already-correct full interaction viewer are unchanged. Frame extraction confirmed all three layouts.


## Expanded case-study structure (2026-09-20)

Case Studies contains three always-visible sections: In-context learning, Adaptation and precision, and Compositional completion. The Contents outline includes all three. Task/video selection is local to each section, using a collapsible selector at the left (above the content on phones). Switching one section preserves the others. Keep the approved case prose and source recordings.

Contents opens by default on each page load and uses a labelled button at the upper left; do not restore the mid-page arrow handle. Desktop layouts reserve space for the open outline. Inline source links inside report paragraphs inherit the surrounding font and spacing, rather than the small standalone reference-link style.


## Navigation and presentation follow-up (2026-09-20)

The author's newer preference replaces the left collapsible case selectors with horizontal underline tabs, matching the comparison matrix. All three case-study sections remain expanded. OpenWAM examples are labelled Rollout 1 and Rollout 2. The outline uses consistent title capitalization, Score and Ranking, and And instead of ampersands; the icon-only toggle now sits in the header's upper-left corner.

References use numbered academic entries populated from the original RoboDojo citations; the author will supply updated BibTeX later. Study Limitations is a normal 16px link. The footer institution/date text is 15px, with duplicate entrance and return-to-top links removed. The floating return-to-top button is also removed. The hero includes a local SVG constellation-six watermark inspired by the Astra launch page, with gentle motion and a reduced-motion fallback; the light report body and data are unchanged.


## Shared recording multiview (2026-09-20)

The author flagged the remaining letterboxed All three layout in the coffee-bean behavior example. All stitched recordings in the shared evidence player now use Overview above Left wrist and Right wrist, with a common play/seek control. The new video-multiview.js crops three canvases from one decoded video; it respects cameraPosition() for overview-first and left-first source files. The source player's transparent box retains the entire viewport footprint so scrolling cannot pause a still-visible multiview. The existing episode interaction player remains unchanged.
