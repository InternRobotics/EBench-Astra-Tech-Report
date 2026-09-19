# Third-round copy review response

The review targets `a6d87f5`. Applied against the current page after the intervening copy cleanup and the author's confirmation that the evaluation protocol governs input descriptions.

## Applied

- Compare task categories with task categories in the analysis overview and first research question.
- Present capability differences in the order: task ranks, task subgroups, perturbation conditions. Existing figures and links are reused.
- Introduce perturbations as a separate comparison axis rather than evidence specifically about the mobile subgroup.
- Keep outcome distributions distinct from the mechanisms investigated in execution videos.
- Merge the coffee example; introduce the reference's instruction-priority rule before describing fruit-task adaptation.
- Connect recovery success to the safety cases where recovery fails.
- Describe Execution Demo as recorded requests, action explanations, responses and evaluation results.
- Simplify budget wording and improve the results transition and Amapbot footnote grammar.
- Answer the introduction's capability-frontier and research-implication questions in the conclusion.
- Give perturbation coverage its own heading inside the existing Limitations dialog.

## Already resolved

The input specification, distinction between elapsed steps and the step limit, zero terminal credit, safety labels and redundant interface instructions had been corrected after the reviewed commit.

## Suggestions adapted or not adopted

- Overall rank is derived from task-averaged performance, not by averaging per-task ranks.
- Zero terminal credit does not establish that an episode never reached a scored state earlier.
- The protocol does not establish that all cross-system input and execution settings are identical.
- Perturbation results across the full task set do not directly establish robustness of the mobile-task lead.
- The preceding analysis already includes cross-model comparisons, and selected case recordings have different object variants and viewpoints. The case-study transition therefore says “same tasks,” not “same scenes.”
- A task-type-versus-difficulty conclusion is not measured here. The conclusion instead connects task-level results with observed interpretation, recovery and execution behavior.
- Benchmark-specific training data and a single ICL trajectory are different forms of adaptation; this is not an accounting of either model family's full pretraining data.

Report numbers, original action quotes and the author-preserved precision narrative are unchanged. Syntax/data checks and HTML structure checks pass.
