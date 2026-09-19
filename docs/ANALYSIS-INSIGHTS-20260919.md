# Cross-group findings and study limitations

Recomputed from `dist/data/tasks.json`, `astra-main-episodes.json` and `report-generalization.csv`; exported by `scripts/build-analysis-insights.py` to `analysis-insights.json`. Source hashes are included. Subgroup means use unrounded per-task success rates with equal task weights, not pooled episode counts.

## Verified additions

- Mobile × short horizon: 12 tasks, GPT-6-Astra 73.1944% versus OpenWAM-α 65.2778%, a 7.9167 pp advantage and first among eight systems. Mobile × long horizon: seven tasks, 28.0952% versus 51.4286%.
- Fixed × low/medium precision: three tasks, GPT-6-Astra 31.6667%, Qwen-RobotManip 91.6667%. This supports examining execution difficulties beyond the high-precision group; it does not by itself identify depth estimation or bimanual coordination as causal mechanisms. Links connect the analysis to actual selected videos and historical context.
- Four-condition range: GPT-6-Astra 6.60 pp, the smallest of eight systems; OpenWAM-α 16.92, Qwen-RobotManip 21.53. Mixed: 46.15%, first, with 60/130 successes versus OpenWAM-α's 58/130. The object condition covers 24 tasks, the other conditions 26. These are observed ranges across conditions, not matched clean-to-perturbed drops or an isolated measurement of prior knowledge.
- Task-level comparison: nine rank-1 and five rank-2 results using competition ranking (one plus the number of strictly better systems). Nine first places include **four** ties, not three: perfume, salt, bottle and shop. The last two have zero success for every model. There are five outright wins and two positive-rate shared wins. Six tasks rank sixth or seventh: coffee, dishwasher, flip cup, put glass, detergent and tighten nut. Install gear ranks fifth. The chart uses GPT-6-Astra minus the strongest other system per task, with optional fixed comparator and subgroup filters.
- Zero-score shares, with **all episodes of each task as denominator**: install gear 15/20 (75%); utensils 13/20 (65%); put glass 10/20 (50%); tighten nut, peg and shop 0/20; bottle 6/20 (30%). A zero score is lack of scored progress, not proof of no physical progress. The interactive stacked bars retain complete successes, incomplete positive-score episodes and zero-score episodes.

The previous precision narrative is preserved unchanged. New fixed-base analysis is a separate subsection.

## Limitations

A collapsed card at the end of the report, after Conclusion, covers quota-limited testing beyond the completed 26-task / 510-episode main run, coupled benchmark dimensions, missing cross-episode skill-accumulation comparisons, and harness integration results **not yet reported here**. It does not disclose unpublished plans or results. The text explicitly explains the role of execution demonstrations and logs in strengthening interpretations, alongside the limits of selected qualitative cases.

All high-precision tasks are fixed-base; all long-horizon tasks are mobile. Cross-group statistics make these overlaps visible but do not orthogonalize task geometry, scoring and manipulation requirements.

## Checks

`npm run check` and `npm run validate` cover syntax, derived figures, source hashes, rank ties, category counts and existing data. Local Node VM interaction checks exercised subgroup selection, comparator changes, gap filters, perturbation readouts and seven/all-task failure views. New assets return HTTP 200. Static checks verify unique anchors and Limitations after Conclusion and collapsed by default.

The configured browser connection still returns a malformed response, so rendered screenshot inspection was unavailable.

The final limitations card expands from its summary or when following the Limitations anchor. Its full text is retained; the default footer view shows only the title and a brief description.
