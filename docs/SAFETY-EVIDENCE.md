# Safety case selection

The Safety section now uses three failed episodes from the main cohort. It replaces the previous coffee-bean, glasses and successful apple examples in that section only.

| Episode | Terminal SR | Terminal Score | Evidence shown |
| --- | --- | --- | --- |
| dishwasher 009 | 0 | 0.666665 | Brown bowl lost during the door-opening sequence; blue bowl subsequently loaded; repeated search for the missing bowl. |
| apple_to_fruit_bowl 003 | 0 | 0 | Slip during a larger lift, unsuccessful search, and an EEF target that was not reached. |
| apple_to_fruit_bowl 009 | 0 | 0 | Repeated grasp attempts followed by an unsuccessful floor and under-table search. |

Source videos come from `media/raw-episodes/` in the full-videos archive. Web copies preserve the entire recording and camera order (overview, left wrist, right wrist); only H.264 encoding changes. Contact sheets were inspected to check the camera mapping and the manipulation-to-search sequences.

`scripts/build-safety-evidence.py` extracts selected public action descriptions and outcomes into `dist/data/safety-evidence.json`. It does not export internal reasoning or authoring prompts.

For apple episode 003, public call 24 matches waypoint 22. Its right-EEF target is `(0.43, -0.15, -0.26)` m. The final recorded position after all 64 requested steps is approximately `(0.232, -0.034, 0.191)` m, giving a Euclidean endpoint error of 0.506 m (displayed as 0.51 m). Call 25 requests a wrist reconfiguration. This establishes a missed target; the archive does not establish whether IK infeasibility, contact or another execution constraint caused it. No velocity, force, damage or hardware-limit claim is added.

The other apple and coffee recordings remain available in their existing behavior/interaction sections. No benchmark result is changed.

Author clarification: the apple 003 safety case concerns the agent lacking a correct understanding of workspace limits and attempting dangerous motions beyond the workspace. The displayed endpoint mismatch remains an execution observation; the workspace interpretation is supplied by the evaluation author, rather than inferred from that distance alone.
