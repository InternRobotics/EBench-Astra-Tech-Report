# 实验完备性与可复现性审阅

审阅版本：`809fe38`；日期：2026-09-19。只读审阅网站、数据、LaTeX附录及core归档；未改网页、未运行新评测、未push。本文区分「当前描述性benchmark报告应交代的事实」与「进一步因果/泛化主张才需要的实验」。不把完成hybrid、RSI或真实机器人研究作为当前报告的发表前提。

## 总体结论

当前资料足以形成一份有实证支撑的benchmark分析报告：完整26-task结果、510条独立环境实例、可查的single-shot输入、成功和失败视频、公开动作记录、小规模paired ICL实验构成了完整主线。最需要补的是方法口径和来源说明，不是再堆更多demo。

没有发现P0（主队列分母或成功数错误、主结果不可成立）问题。P1主要是执行反馈粒度表述、跨系统匹配范围被写得过宽，以及读者看不见的恢复/持位/重跑与来源精度差异。既有数据已能修复其中大部分，不需要重新跑510集。

“8个系统”应理解为GPT-6-Astra加7个当前基线，不能写8个baseline。旧审计中Pi0/Pi0.5本地三run家族、XVLA、509条等问题属于旧比较表，不适用于当前云端逐集重算队列；本次没有沿用那些过期指控。

## 已独立复核的充分部分

1. `dist/data/episodes.json`：510个唯一task/seed，26 tasks；24任务各20集，microwave和make_sandwich各15集。独立重算task-macro SR=0.4673076923076923、Score=0.6537134166666667；237成功/188正分未完成/85零分未完成；micro SR=237/510=46.4706%。这与主标题和dot图相符。
2. `core.zip/evidence/main/episodes/*/episode_summary.json`恰510条；49集有terminal hold，共45540 steps，其中6集最终成功。这是已记录协议，不是额外独立样本。
3. 当前比较来源`data/cloud-main-data.json`明确是7个可归属云端submission加本地GPT-6-Astra；baseline已经有逐集结果支持，不应继续声称“只有旧聚合快照”。但完整成绩不等于环境/控制预算完全匹配。
4. `dist/data/icl-packages.json`与`docs/icl-assets.json`保留26任务的完整实际输入，417文本块、365图、每包10–18图；历史/当前边界、原始caption、数值精度、逐图hash均有。这比只写single-shot更可复查。
5. `dist/icl-viewer.js:55–59`正确显示8组新运行的成对实验、逐对Score回退、frame003的1032+520 holding steps，并将历史dishwasher分开。`seed000 repeats a scene`已明示；“fresh episodes”不是“全新unseen scenes”。
6. `dist/research.js:renderPoc`将POC放在主26任务外，明确组成未见、对象/原子技能已训练、test-time zero-shot，无未经确认的聚合成功率。作为定性POC展示是合适的。
7. `dist/narrative.js`多数因果边界已经写得正确：RGB/接触是待验证解释，视频不估计恢复频率，果汁cup/jug不等于拒绝指导，coffee不将1cm试抬宣传为涌现，RSI结论明确为未来方向。
8. 三案例timing脚本实际重跑输出到`analysis/review-timing-recomputed.json`，与`dist/data/execution-timing.json`逐字段相同；下文详细审计。

## P1：应在当前报告整理中优先处理

### P1-1 执行反馈粒度混用chunk与action batch

位置：`dist/index.html` Experiment Setup：“Updated observations arrive after each action chunk.”；`dist/app.js:28`又将最长工具返回间隔解释为action batch；`scripts/analyze-execution-timing.py`同时记录8-step chunks与action_calls。

core的`archive/research/ebench-audit-20260917/protocol-audit.md` A节、以及`archive/docs/direct-eef-architecture.md`说明：执行器按最多8个物理step作传输/回执分块，一次execute_eef可包含1–6个waypoint、每waypoint至多64步。**模型并非每8步重新看到图像/作决策，而是在整个工具调用返回后获得反馈。** 当前setup容易让读者把底层传输粒度误读成闭环决策频率，这正是报告“反馈与精细操作”论点的重要条件。

最小修复：统一术语为“tool/action batch后模型获得所选视图；内部每≤8步记录/确认execution chunks，不代表模型更新”。无需补实验。若保留chunk一词，必须在同段定义它与batch的区别。

### P1-2 对齐任务/分母不等于共享全部协议

位置：`dist/index.html` setup “Task-specific physics horizons and camera-access restrictions are shared.”；`dist/app.js:22`同类表述；对照源`data/cloud-main-data.json.limitations`却明确写“Common task names and aggregation do not establish matched seeds, scene versions, observations, control interfaces or budgets.”

现有资料能证明：当前任务集合/计分聚合、逐任务分母、GPT-6-Astra实时三视图与EEF接口。尚不能仅凭这些证明：每个baseline真实相机输入/机器人状态、重规划频率、环境资产版本、训练checkpoint、相同环境seed或终态持位规则。历史示教额外含top视角和状态/动作数值；这也不是完全相同的信息条件。

不是要求取消基线比较：保留“在同一benchmark任务定义下的当前系统比较”成立。最小修复是加一张紧凑protocol matrix：已确认字段填写、未知字段标未归档；共享属性仅限已核验范围。模型出处/提交快照日期、checkpoint/训练设置（可得部分）、三类时钟与行动接口、额外参考信息应可追溯。无需公开任意手写prompt或账户/内部路径。

特别事项：core results-audit记录apple_from_shelf因场景修复整任务重跑，选用新20集并废弃旧20集；跨系统同scene hash未核验。这是一个具体版本匹配点，优先核对，不能笼统断言baseline同场景。

### P1-3 主队列恢复、terminal holding、场景重跑应有简短公开说明

现网页只泛称fresh history和自动holding；完整协议存在于原始归档而非可见附录。

已复核：49/510集（9.61%）有hold，其中6集最终成功，占全部237成功的2.53%；这不是“holding导致成功”的因果估计。routes为387 account、108 API、15 API→account。core审计还记录56集含续接、7集有API context restart（9次），主队列不是510次完全不中断的first-attempt执行。

这些不使server成绩无效。现有consolidator按任务/source整体替换和显式invalid过滤，审计没有best-score selection证据。应把“独立环境实例”“新起始history”“允许基础设施恢复”“server terminal score可含hold”分开描述。

最小修复：附录一个run accounting表，给510保留、20旧apple superseded、1旧utensils invalid、恢复与hold总数、6个有hold的最终成功。补一份不含敏感路径的canonical manifest（task/seed、route类别、是否continuation、policy/hold steps、最终score）。以当前完整server协议为主成绩，另给hold组单独的敏感性记录或decision-time outcome（未终态仍应标unresolved，而非擅自判失败）。

来源：core `archive/research/ebench-audit-20260917/results-audit.md`、`protocol-audit.md`，及510 summary原件。无需重跑。

### P1-4 主表总体Score与逐任务重算来自不同API口径，读者无法复现最后一位

`dist/data/report-SOURCE_MAP.json`已明确总体baseline来自`online-totals.json`的taskOverview，而组/任务来自`cloud-main-data.json`的episodeList→gmp。网页因此不是算错；问题是图注只写equal-weight means，未解释两来源。

| 系统 | 页面总体Score/taskOverview | 当前tasks.json任务均值（四位） |
|---|---:|---:|
| OpenWAM-α | .7005 | .7006 |
| Qwen-RobotManip | .6081 | .6082 |
| π0.5 | .5441 | .5442 |
| π0 | .4748 | .4747 |
| Fast-WAM | .3712 | .3711 |

`online-totals.json`来自2026-09-17 17:52–17:53 UTC，并有源响应hash。差异方向不一致，不能无证据说统一截断；也未找到确定的不同snapshot/预序列化精度根因。幅度小且不改变排序，但官网总体和逐任务导出不可假装同一个精确聚合。

最小修复：选定一个authority供全表，或明示“总体为portal-reported，分组为episode-derived，公开接口精度略有差异”，同时保留两列来源。不要静默改数。`scripts/validate-data.mjs`目前只核Astra SR、headline常量等，没有断言所有模型任务Score均值等于总体，应将这种差异列为显式允许/报告规则。

## P2：完善方法与解释，或进一步主张才需要的工作

### P2-1 属性共线，应避免把移动优势当成独立因果能力

当前High的4任务全为Fixed且Short；Mobile只有Low13/Medium6，Fixed为Low1/Medium2/High4。mobile/tabletop差异与精度构成纠缠；long/short也不是同任务仅改变长度。现正文已有“does not separately isolate”保护，但“优势来自更大空间/视角调整”的解释仍应保持假说地位。补分组交叉表或matched-low/medium描述性对照即可，不需为了报告新造任务。若主张“机动性本身带来优势”，才需同任务移动/固定条件配对。

### P2-2 ICL标注的author clarification与历史元数据应调和版本

当前setup和HANDOFF声明另一个GPT-6-Astra high实例从training video选择标注，这是2026-09-19作者明确说明。归档`archive/research/ebench-icl-annotation-provenance-20260917/README.md`却记录历史标注session为xhigh，policy执行为high；14新增包写source_split=train，原12包未列该字段。不能直接认定作者说明错误，也不能自动让旧历史变成另一配置。

建议作者核对“描述当前最终流程，还是已跑510实际用的历史包”。用一行版本说明/manifest补齐即可；继续保留实际ICL输入，不公开原用户请求/临时标注prompt。示教场景与test seed重叠unknown不等于已泄漏，但不能说严格证明无重叠。

### P2-3 不确定性、单次submission与视频选择

每模型当前一份submission；15/20实例单任务的点估计不支持高精度能力排名外推。当前没有“显著”统计宣称，因此不是发表阻断。可以增任务内bootstrap的固定suite描述区间，清楚区别task-bootstrap的新任务外推；只有seed与版本核验后才作真正paired cross-model CI。

`dist/data/demo-videos.json`27段中23成功、4未完成（bottle003、coffee010、shop009、peg000），而主队列成功46.47%。这是“展示各任务可完成的行为”的精选集，不代表成功频率，网页已有selected标记基本合格。更好是在折叠库简介注明选择规则及23/4分布，不把可视案例密度当能力频率。不同模型teacup/glasses镜头版本不同，现已标qualitative，不能拿视频直接作受控恢复胜率。

### P2-4 paired ICL足以支持局部作用，不足以支持普遍提升

8对数据完整且混合效应如实展示：frame0/4→2/4，gear0/4→1/4；frame两对Score下降。无需为了保留这一探索性附录立刻扩成全510消融。若未来宣称“single-shot普遍提升”，最小扩展需预先选新任务层、固定未见seed、对两个条件等预算，不只补此前有提升的任务；也可分离image/text/state/action子成分，但这是归因研究而非当前必要补实验。

### P2-5 POC是有边界的演示，定量结论须等协议补齐

页面明确没有aggregate result，四视频和未确认OpenWAM编号可以继续展示。若要支持“unseen composition泛化优于VLA/WAM”，最少需要任务组合清单、训练原子技能/对象列表、验证组合未见的split、checkpoint、训练预算、每任务seed/指标和全量分母。无GT trajectory解释不提供ICL，但仍可以存在评测成功判据；不要把no GT误写成无法评分。

### P2-6 全量验证脚本与远程复现包

现`validate-data.mjs`没有对全部task Score、组别aggregate、timing脚本输出自动一致性核验；ICL图hash有独立校验较好。建议生成一个只含非敏感、足以重算的研究data release：主episode outcome与protocol flags、baseline sources/任务均值、精度规则、table生成代码、timing必要的脱敏waypoint endpoints。当前timing脚本依赖未入git的core.zip，网页JSON虽然有hash，远端Claude或读者无法仅clone复跑。这是可复现性体验缺口，不是计算失真。

## timing与physical constraints专项审计

### 已经正确的口径

- `scripts/analyze-execution-timing.py`使用作者确认30Hz，不把15FPS历史视频采样率当physics rate。
- 对三例，chunk executed_steps和公开tool response的累计physics-step差分分别加总验证到policy_physics_steps。
- policy wall time直接读summary，不以wall minus simulated伪造纯模型inference。所有三例hold为0，时钟范围一致。
- terminal chunk无after state但有executed_steps：计入时长、排除关节差分，处理正确。
- 最大关节速率明确为endpoint displacement/segment duration，非瞬时峰值；JSON警告需确认joint identity、角度unwrap与配置，未宣称超URDF限制。

| episode | policy steps | sim s | policy wall s | 最大action batch sim s | 最大原始segment平均 rad/s |
|---|---:|---:|---:|---:|---:|
| apple_to_fruit_bowl_006 | 1041 | 34.700 | 729.841 | 2.133 | 2.321 |
| collect_coffee_beans_013 | 3500 | 116.667 | 5050.403 | 6.400 | 1.889 |
| utensils_to_holder_000 | 2000 | 66.667 | 2658.425 | 4.000 | 1.902 |

这三例足以展示“模拟动作时间、系统wall时间、模型反馈间隔不同”；不够估计整套的p50/p95成本，也不能比较VLA/WAM响应优势。当前页面明确three selected，可以保留。

### 具体尚缺的测量

1. 推理拆分：请求submit/response complete与tool start/end、排队/RPC/图像处理分开；流式token时间不是同一个量。现脚本没有做这一拆分，文案用“supports analysis”而非已测纯推理是合适的。
2. 关节映射/URDF：当前最大三例都落joint_index=7；先核对它是什么关节、是否有reset/IK跳变、角度周期，再比较limit。不能从rawindex直接命名电机或作损伤断言。
3. 稀疏段均值只能捕捉样本间总变化；低于限速不能证明段内没超限。确认连续展开且段均值大于上限可作候选违规证据，仍应区分设定target、实际q与测量误差。
4. 加速度：相邻segment速度应以各segment中点时间差做导数，不能简单用同一8/30常数处理所有4/5/8-step段；结果是平滑估计，不是瞬时冲击。力/扭矩/碰撞不能仅由RGB或稀疏q推出。
5. 别把全套route/continuation直接套入当前selected脚本：`analyze`假设单序列monotonic cumulative steps、齐全waypoints和相同clock，当前三例满足。推广到510前要处理续接归零、重发dedupe、hold、缺文件，不能只for510调用假设都一样。

## 最小可执行补充工作的优先表

| 优先 | 工作 | 最小范围/交付 | 是否当前报告必须新增模型评测 |
|---|---|---|---|
| A | 方法口径修复 | chunk/batch定义、shared字段matrix、hold/recovery/rerun账本、Score双来源说明 | 否，已有档案即可 |
| A | 可重算release | 去敏canonical manifest、统一score authority/规则、自动核task+group+timing一致性 | 否 |
| B | baseline可比性核验 | 7个submission映射checkpoint和scene/config/version；优先核apple修复版本 | 否，先查元数据；只有关键不匹配才补小范围重跑 |
| B | 全队列时延描述 | 510日志coverage表，按route/成功失败/continuation分层sim、wall、actionbatch分布；纯inference仅对有完整时间边界的subset | 否，先离线分析 |
| B | 物理约束初筛 | 精确URDF+jointmap，三例先验算unwrap、vel limit ratios；异常窗口补高频state回放 | 不需模型重评；必要时确定性回放 |
| C | 接触/反馈因果检查 | 先选2精度任务与1粗操作任务，固定每任务≥10相同seed；只改变batch上限或contact feedback其中一个因素 | 仅在要主张某机制导致失败时需要 |
| C | 恢复能力定量 | 预定义扰动时刻/幅度，同状态初始化，各模型同可观测性/预算；报告恢复率、原成功goal再次丢失、代价 | 仅在要声称稳定恢复优势时需要 |
| C | ICL平均作用 | 预注册未用于挑选的任务/seed strata，ZS vs整包ICL；样本量先据所需效应估计，不能承诺固定小样本显著 | 当前局部8对结论无需 |
| C | POC正式对比 | 确认4视频对应checkpoint、skill/composition split、成功判据；每composition统一seeds，保留所有结果 | POC继续定性展示无需；要定量外推时需要 |
| D | hybrid/intention imitation/RSI | 分别设无agent、无memory、未提炼tool的对照；held-out未来任务验证提升与代价 | 完全属于后续研究，不是当前报告门槛 |

## 建议保留的结论强度

可坚定写：这一固定benchmark上，单示教GPT-6-Astra的结果具有竞争力，性能结构与领先专门策略不同；高精度/长程完成存在明显短板；选定执行记录展现动作后修订、重新观察和同episode内经验使用。

应作为解释/未来方向写：为什么这些差异出现，混合控制是否有效，经验是否能跨任务累积、是否减少示教成本，以及实际硬件安全。这不削弱报告，而是让每个结论对应自己的证据层级。
