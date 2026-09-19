# Whole-episode interaction viewer

An interactive demonstration card in Experiment Setup includes three complete archived **public tool-call sequences**, the runtime initial prompt, and a link to each task's existing historical ICL package:

| Episode | Calls | Encoded frames | Terminal outcome |
| --- | ---: | ---: | --- |
| apple_to_fruit_bowl_006 | 20 | 130 | SR 1, score 1.0 |
| collect_coffee_beans_013 | 54 | 437 | SR 0, score 0.5 |
| fruit_015 | 66 | 380 | SR 0, score 0.6 |

The quotes are verbatim `arguments.reason` from the tool requests. Calls without a reason display a plain description of the gripper command, without quotation marks. Gripper `opening` is a normalized command, not a distance in metres. The original argument values remain in the expandable JSON.

The viewer distinguishes command execution success from the evaluator's terminal task result. Public response summaries are available; this is not a reconstruction of every model-facing observation, conversation message, or internal reasoning. The recorded video shows execution, while the historical images shown in the linked ICL viewer are actual demonstration inputs.

## Frame alignment

The existing videos are 4 fps encodes. Their frame counts equal the number of nonterminal execution chunks with an `after` state, individually checked for all three episodes. Frames are mapped in recorded chunk order, then assigned to tool calls using the cumulative `response_summary.physics_steps` boundaries. The final terminal chunk has no returned observation and contributes no additional frame. No proportional duration stretching or assumption that video seconds equal simulation seconds is used.

Source-code cross-check: IN-MANU branch `research/robot-agent-harness`, commit `814d3112772c7a6e06ded20ae90149530376f363`. `integrations/run_direct_eef.py` initializes the evaluator at `fps=4` and camera order overlook, left wrist, right wrist. `client/genmanip-client/src/genmanip_client/eval_client.py` records returned observations and skips absent/reset observations. Frame counts provide the per-episode check against the actual recordings.

## Reproduction and validation

Run `scripts/build-episode-interactions.py` with Python; it reads the core archive and checks frame counts with `analysis/ffmpeg.exe`. It exports allowlisted records into `dist/data/episodes/`. Original authoring requests, private output paths, account identifiers and unrelated provenance fields are not exported. Per-source SHA-256 hashes and the displayed video's hash are included.

`npm run validate` verifies all 140 calls, contiguous call/video intervals, 947 frames, media hashes, task/ICL links and terminal outcomes. `npm run check` checks JavaScript syntax. A local Node VM interaction check additionally exercised switching episodes, selecting calls, video-following text, single-action stopping, camera selection and gripper labels. HTTP checks confirmed the new assets load and video byte-range requests return 206.

Browser screenshot verification was unavailable because the configured browser connection returned a malformed response. No visual inspection of the rendered page is claimed.

## Playback and placement update

The demo card now sits in Experiment Setup. Muted looping playback starts when at least 25% of the video viewport is visible; leaving the viewport or hiding the browser tab pauses it. Interaction text follows the encoded video clock. Explicit pause and expanded log details suspend autoplay; case changes start a fresh playback state. The right-hand panel has a stable scrollable height to avoid shifting the page as calls change.

Node VM checks cover viewport/tab visibility, manual pause persistence, log inspection, call jumps, single-action stopping and case changes. HTML nesting checks verify the demo belongs to Setup.
