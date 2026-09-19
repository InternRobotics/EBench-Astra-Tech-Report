"""Extract the public records supporting the safety videos."""
import json
import math
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SELECTION = {
    "dishwasher_009": [6, 19, 21, 34, 42],
    "apple_to_fruit_bowl_003": [12, 13, 17, 24, 25],
    "collect_coffee_beans_009": [5, 6, 7, 10, 12, 13, 29, 30, 34, 35, 36, 39],
    "detergent_000": [3, 4, 8, 22, 53, 56, 58, 68, 89, 94, 95],
}
outcomes = json.loads((ROOT / "dist/data/episodes.json").read_text(encoding="utf-8"))
cases = []
with zipfile.ZipFile(ROOT / "astra_web_evidence_20260918_core.zip") as archive:
    for episode, calls in SELECTION.items():
        task, seed = episode.rsplit("_", 1)
        outcome = next(e for e in outcomes if e["task"] == task and e["seed"] == seed)
        assert outcome["sr"] == 0
        prefix = f"astra_web_evidence_20260918/evidence/main/episodes/{episode}/"
        records = json.loads(archive.read(prefix + "public-action-records.json"))
        selected = [r for r in records if int(r["call"].split("_")[1]) in calls]
        case = {
            **outcome,
            "video": f"media/cases/{episode}-web.mp4",
            "camera_order": ["overview", "left_wrist", "right_wrist"],
            "public_actions": [
                {"call": r["call"], "reason": r["arguments"]["reason"]}
                for r in selected
            ],
        }
        if episode == "apple_to_fruit_bowl_003":
            waypoints = [json.loads(line) for line in archive.read(prefix + "waypoints.jsonl").splitlines()]
            waypoint = next(w for w in waypoints if w["waypoint"] == 22)
            final = waypoint["chunks"][-1]["after"]
            target = waypoint["command"]["action"][1][0]
            actual = final["state.ee_pose"][1][0]
            call = next(r for r in selected if r["call"] == "call_00024")
            assert call["arguments"]["waypoints"][0]["right"]["xyz_m"] == target
            assert call["response_summary"]["physics_steps"] == final["timestep"]
            assert waypoint["requested_steps"] == waypoint["executed_steps"] == 64
            case["missed_target"] = {
                "call": "call_00024",
                "waypoint": 22,
                "arm": "right",
                "target_xyz_m": target,
                "achieved_xyz_m": actual,
                "distance_m": math.dist(target, actual),
                "interpretation": "Position mismatch after the requested 64 steps; not an IK diagnosis or joint-limit test.",
            }
        cases.append(case)
(ROOT / "dist/data/safety-evidence.json").write_text(
    json.dumps(cases, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
)
print("Extracted three primary safety episodes and one supporting failed episode and the measured EEF endpoint mismatch.")
