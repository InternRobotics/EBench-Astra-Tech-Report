"""Publish allowlisted cohort metadata without prompts, accounts or host paths."""
import argparse
from collections import Counter
import hashlib
import json
from pathlib import Path
import zipfile


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('archive', type=Path)
    parser.add_argument('--output', type=Path, default=Path('dist/data/evaluation-provenance.json'))
    args = parser.parse_args()
    prefix = 'astra_web_evidence_20260918/'
    with zipfile.ZipFile(args.archive) as archive:
        raw_index = archive.read(prefix + 'evidence/main/canonical-index-original.json')
        index = json.loads(raw_index)
        rows = []
        for item in index:
            task, seed = item['task'], item['seed']
            raw = archive.read(prefix + f'evidence/main/episodes/{task}_{seed}/episode_summary.json')
            summary = json.loads(raw)
            result = summary['server_result']
            assert result['sr'] == item['sr'] and result['score'] == item['score']
            rows.append({
                'task': task, 'seed': seed,
                'retained_run': item['run'].replace('ebench_icl_account4_', 'ebench_icl_batch02_'),
                'sr': result['sr'], 'score': result['score'],
                'execution_routes': summary['routes'],
                'policy_physics_steps': summary.get('policy_physics_steps'),
                'terminal_hold_steps': summary.get('terminal_hold_steps', 0),
                'api_context_restarts': summary.get('api_context_restarts', 0),
                'has_continuation_metadata': bool(item.get('continuation')),
                'has_receipt_recovery_metadata': bool(item.get('receipt_recovery')),
                'summary_sha256': hashlib.sha256(raw).hexdigest(),
            })
        sources = json.loads(archive.read(prefix + 'data/online-totals.json'))
    rows.sort(key=lambda row: (row['task'], row['seed']))
    assert len(rows) == 510 and len({(r['task'], r['seed']) for r in rows}) == 510
    holds = [r for r in rows if r['terminal_hold_steps'] > 0]
    output = {
        'suite': 'EBench test-mini',
        'snapshot_date': '2026-09-17',
        'canonical_index_sha256': hashlib.sha256(raw_index).hexdigest(),
        'counts': {
            'tasks': len({r['task'] for r in rows}), 'episodes': len(rows),
            'terminal_hold_episodes': len(holds),
            'terminal_hold_steps': sum(r['terminal_hold_steps'] for r in rows),
            'successful_episodes_with_hold': sum(r['sr'] == 1 for r in holds),
            'execution_routes': dict(Counter(' → '.join(r['execution_routes']) for r in rows)),
        },
        'retention_notes': [
            {'task': 'apple_from_shelf', 'episodes': 20,
             'rule': 'The corrected-scene rerun replaces the entire earlier task cohort, rather than selecting the better result per seed.',
             'comparator_scene_alignment': 'Not established by the archived leaderboard metadata.'},
            {'task': 'utensils_to_holder', 'seed': '013',
             'rule': 'A run affected by a receipt-routing infrastructure error was invalidated and replaced.'},
        ],
        'metric_sources': {
            'overall_comparators': 'Leaderboard taskOverview reported totals.',
            'tasks_and_groups': 'EpisodeList-derived task means and equal-weight group means.',
            'precision_note': 'Some overall Score values differ from episode-derived means in the final displayed digit; the source values are retained, not silently reconciled.',
        },
        'comparator_submissions': [
            {k: entry[k] for k in ('model', 'url', 'retrieved_utc', 'sr', 'score', 'source_sha256')}
            for entry in sources
        ],
        'field_notes': {
            'execution_routes': 'Archived route categories only; no account or profile identifiers.',
            'policy_physics_steps': 'As recorded in the retained summary; stage-level logs are required to audit resumed executions.',
            'successful_episodes_with_hold': 'Final server successes among episodes with holding; not a causal estimate of gains from holding.',
            'has_continuation_metadata': 'Presence of canonical continuation metadata; not a complete count of every recovery mechanism.',
        },
        'episodes': rows,
    }
    args.output.write_text(json.dumps(output, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(json.dumps(output['counts']))


if __name__ == '__main__':
    main()
