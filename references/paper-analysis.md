# Paper Analysis

Use this guide to extract a faithful paper card before writing promotional copy.

## Extraction

Capture only what the input supports:

- `题目`: official title or user-provided title
- `领域`: discipline, subfield, and paper type
- `研究问题`: what the paper tries to explain, measure, improve, or challenge
- `任务场景`: reasoning, coding, retrieval, planning, tool use, multimodal understanding, evaluation, alignment, deployment, or another concrete scenario
- `研究对象`: model, agent framework, dataset, benchmark, corpus, system, user setting, or analysis target
- `方法`: prompting, fine-tuning, RL, synthetic data, retrieval, benchmark design, experiment, survey, review, case study, or theoretical framework
- `主要发现`: concrete results, relationships, framework, mechanism, benchmark outcome, or argument
- `贡献`: why the paper adds value compared with existing knowledge
- `局限`: constraints in sample, dataset, external validity, measurement, assumptions, benchmark scope, cost, reproducibility, or causal interpretation
- `读者价值`: what a reader can learn or apply carefully

## Conversion

Translate academic content into reader-facing language:

- research gap -> "过去大家容易忽略的问题"
- method/data -> "这篇论文可信的地方"
- benchmark/model contribution -> "给后续研究提供了可比较的基准或工具"
- system design -> "值得借鉴的技术路线"
- evaluation result -> "在特定任务和指标下的表现"
- limitation -> "阅读时要注意的边界"
- theoretical contribution -> "提供了一个新解释框架"
- empirical contribution -> "用实验或数据补上了一个证据缺口"

## Handling Weak Input

If the user provides only a title:

- avoid inventing findings
- write a "选题角度版" rather than a result-based promo
- ask for abstract if the user wants a final publishable post

If the user provides only an abstract:

- write from the abstract
- label uncertain details
- avoid claims about full-paper limitations unless stated

If the user provides full text:

- prioritize abstract, introduction, method, experiments/results, discussion, limitations, and conclusion
- avoid overfitting to a single sentence

If the user provides a project page or model release:

- distinguish paper claims, project claims, demo claims, and repo claims
- do not infer open-source, licensing, or reproducibility unless stated

## Audience Mapping

Choose one primary audience unless the user specifies otherwise:

- `AI 研究生`: emphasize paper-reading value, research gap, experiment design, limitations, and thesis inspiration
- `算法工程师`: emphasize implementation hints, benchmark setup, ablations, reproducibility, and engineering tradeoffs
- `AI 产品经理`: emphasize scenario, workflow, user value, adoption constraints, and product risk
- `创业者/独立开发者`: emphasize prototype ideas and what can be borrowed carefully
- `泛 AI 读者`: emphasize one clear concept and why it matters now
- `账号粉丝`: match the account's known niche and recurring columns

## Angle Bank

Use these angles when supported:

- "一个常见误解被重新检验"
- "一个热门能力背后的评测问题"
- "一个新 benchmark 让问题更可比较"
- "这篇论文适合作为 Agent/RAG/评测选题入口"
- "重点不在模型更大，而在流程怎么设计"
- "它没有给万能答案，但给了有用边界"
- "如果你在做相关研究，可以重点看方法和实验部分"
