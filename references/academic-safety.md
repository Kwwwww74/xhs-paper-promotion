# Academic Safety

Use this checklist before finalizing copy. The goal is attractive but defensible academic communication.

## Never Invent

Do not invent:

- author names or affiliations
- journal, conference, publisher, impact factor, ranking, or peer-review status
- sample size, dataset name, model name, geography, date range, or experiment setting
- numerical results, p-values, effect sizes, accuracy, improvement percentages, or benchmarks
- citations, awards, media coverage, leaderboard rank, or "highly cited" status
- code availability, open-source status, license, reproducibility, demo link, or deployment readiness
- practical recommendations not stated by the paper

## Claim Strength

Use claim verbs according to evidence:

- strong evidence: `显示`, `发现`, `表明`
- bounded evidence: `提示`, `可能说明`, `在...条件下支持`
- conceptual paper: `提出`, `讨论`, `构建`, `重新解释`
- review paper: `总结`, `梳理`, `比较`, `指出`
- preprint or early evidence: `初步显示`, `提供了一个线索`, `仍需后续验证`

Avoid unless explicitly supported:

- `证明`
- `彻底颠覆`
- `首次发现`
- `解决了`
- `必然导致`
- `适用于所有人`
- `AGI 来了`
- `全面取代人类`
- `真实世界可直接部署`

## AI-Specific Safety

For AI papers:

- distinguish benchmark performance from real-world deployment performance
- avoid claiming human-level capability unless measured and supported
- state if results depend on a specific dataset, model, prompt, tool, simulator, or evaluation setting
- distinguish model capability, system design, agent workflow, and product readiness
- do not equate a demo with robust autonomous behavior
- do not imply open-source availability, reproducibility, or deployability unless stated
- mention cost, latency, tool reliability, safety, and environment assumptions when they materially affect interpretation

For agent papers:

- distinguish planning, tool use, memory, reflection, multi-agent coordination, and environment feedback
- avoid saying the agent "自主思考" or "真正理解" unless the paper uses and substantiates those terms
- phrase autonomous behavior as "在设定任务/环境/工具条件下完成多步操作"
- note when success depends on curated tasks, simulators, fixed tools, or human feedback

For RAG papers:

- distinguish retrieval quality, generation quality, grounding, citation quality, and end-to-end task success
- avoid saying a method "解决幻觉" unless the paper supports that exact scope
- specify the dataset or evaluation setup behind any claimed improvement

For evaluation or benchmark papers:

- avoid treating benchmark scores as general intelligence
- explain what the benchmark measures and what it does not measure
- mention data contamination, metric validity, and task realism when relevant

## Sensitive Domains

For medical, mental-health, nutrition, finance, education, law, and public-policy papers:

- do not turn findings into personal advice
- do not imply diagnosis, treatment, investment, or legal guidance
- do not overgeneralize from small or narrow samples
- preserve population and setting when known
- say "不能直接等同于..." when needed

## Correlation and Causation

If the paper is observational, correlational, qualitative, cross-sectional, or survey-based:

- avoid "导致", "提升了", "减少了" unless causal design supports it
- use "相关", "关联", "可能有关", "在样本中呈现出..."

If the paper uses randomized experiments, causal inference, longitudinal data, or natural experiments:

- still keep scope conditions visible
- avoid universal claims beyond the studied context

## Publication Status

When known, label status:

- `预印本`: "这还是预印本，结论需要后续同行评审和复现。"
- `会议论文`: "这是会议论文，适合关注方法和实验设定。"
- `期刊论文`: "这是期刊论文，但仍要看样本和方法边界。"
- `技术报告`: "这是技术报告，重点看方法、实验和可复现信息。"
- `综述`: "这是综述，价值在于整理脉络，不是单一新实验。"

## Final Safety Pass

Before returning:

- Replace hype with specific contribution.
- Replace absolute claims with scoped claims.
- Add one limitation if the post otherwise sounds too certain.
- Make clear which parts are from the paper and which are content packaging.
- Keep the final copy publishable without embarrassing the user academically.
- For LLM and agent papers, ensure every impressive claim names the task, benchmark, setting, or condition behind it.
