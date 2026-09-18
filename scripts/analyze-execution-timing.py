"""Reproduce selected-episode timing and sampled joint-motion statistics.

Uses only archived execution metadata, never authoring prompts. Chunk endpoint
displacement / simulated duration is a segment-average velocity, not a sampled
instantaneous peak or a model-inference latency measurement.
"""
import argparse
import hashlib
import json
import statistics
import zipfile
from pathlib import Path


def analyze(archive, episode, hz):
    prefix = f"astra_web_evidence_20260918/evidence/main/episodes/{episode}/"
    source = {name: archive.read(prefix + name) for name in
              ("episode_summary.json", "waypoints.jsonl", "public-action-records.json")}
    summary = json.loads(source["episode_summary.json"])
    waypoints = [json.loads(line) for line in source["waypoints.jsonl"].splitlines() if line]
    actions = json.loads(source["public-action-records.json"])
    chunks = []
    max_joint = None
    joint_samples = 0
    for waypoint in waypoints:
        before = waypoint["before"]
        for chunk in waypoint["chunks"]:
            chunks.append({"steps": chunk["executed_steps"], "wall_timestamp": chunk["time"]})
            after = chunk.get("after")
            if after is None:
                # Terminal server responses have executed_steps but no next state.
                assert chunk.get("episode_result") is not None
                continue
            steps = after["timestep"] - before["timestep"]
            if steps > 0:
                assert steps == chunk["executed_steps"], (episode, waypoint["waypoint"])
                duration = steps / hz
                q0, q1 = before.get("state.joints"), after.get("state.joints")
                if q0 and q1:
                    assert len(q0) == len(q1)
                    joint_samples += len(q0)
                    for joint, (start, end) in enumerate(zip(q0, q1)):
                        rate = abs(end - start) / duration
                        if max_joint is None or rate > max_joint["abs_segment_average_rad_s"]:
                            max_joint = {"joint_index_zero_based": joint,
                                         "abs_segment_average_rad_s": rate,
                                         "q_before_rad": start, "q_after_rad": end,
                                         "step_before": before["timestep"],
                                         "step_after": after["timestep"],
                                         "waypoint": waypoint["waypoint"],
                                         "chunk": chunk["chunk"]}
            before = after
    # Only actions advancing physics contribute an action-observation interval.
    action_steps = []
    previous = 0
    for action in actions:
        step = action.get("response_summary", {}).get("physics_steps")
        if step is not None:
            assert step >= previous
            if step > previous:
                action_steps.append(step - previous)
            previous = step
    simulated = summary["policy_physics_steps"] / hz
    assert sum(x["steps"] for x in chunks) == summary["policy_physics_steps"]
    assert sum(action_steps) == summary["policy_physics_steps"]
    return {
        "episode": episode,
        "policy_physics_steps": summary["policy_physics_steps"],
        "simulated_execution_s": simulated,
        "policy_elapsed_s": summary["policy_elapsed_s"],
        "wall_to_sim_ratio": summary["policy_elapsed_s"] / simulated,
        "terminal_hold_steps": summary["terminal_hold_steps"],
        "api_context_restarts": summary["api_context_restarts"],
        "action_calls_advancing_physics": len(action_steps),
        "median_action_sim_s": statistics.median(action_steps) / hz,
        "max_action_sim_s": max(action_steps) / hz,
        "recorded_chunks": len(chunks),
        "chunk_steps": sorted({x["steps"] for x in chunks}),
        "joint_segment_samples": joint_samples,
        "max_abs_joint_segment_average": max_joint,
        "source_sha256": {name: hashlib.sha256(raw).hexdigest() for name, raw in source.items()},
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("archive", type=Path)
    parser.add_argument("--hz", type=float, default=30,
                        help="Physics step frequency supplied by the evaluation author")
    parser.add_argument("--output", type=Path, default=Path("dist/data/execution-timing.json"))
    args = parser.parse_args()
    assert args.hz > 0
    with zipfile.ZipFile(args.archive) as archive:
        rows = [analyze(archive, episode, args.hz) for episode in
                ("apple_to_fruit_bowl_006", "collect_coffee_beans_013", "utensils_to_holder_000")]
    result = {
        "physics_hz": args.hz,
        "frequency_source": "Evaluation author clarification, 2026-09-19",
        "scope": "Three selected main-cohort episodes, not a cohort-wide latency estimate.",
        "timing_definition": "policy_elapsed_s is the archived policy-phase wall duration; it includes model and execution-system time. steps / Hz is simulated duration. Their difference is not isolated model inference time.",
        "joint_definition": "Absolute raw joint endpoint displacement / segment simulated duration. Segment averages do not resolve within-segment peaks. Confirm joint identity and angle wrapping against the evaluated robot configuration before comparing limits.",
        "episodes": rows,
    }
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(result, indent=2) + "\n", encoding="utf-8")
    for row in rows:
        print(row["episode"], {key: round(row[key], 3) for key in
              ("simulated_execution_s", "policy_elapsed_s", "wall_to_sim_ratio", "median_action_sim_s", "max_action_sim_s")},
              "max joint segment average", round(row["max_abs_joint_segment_average"]["abs_segment_average_rad_s"], 3))


if __name__ == "__main__":
    main()
