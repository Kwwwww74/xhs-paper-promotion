---
name: xhs-paper-promotion
description: Generate Xiaohongshu-style promotional copy for AI, large language model, agent, multimodal, RAG, evaluation, alignment, and machine learning papers. Use when the user asks for Chinese social media titles, post copy, hashtags, cover text, research highlights, technical breakdowns, or content packaging for an arXiv paper, conference paper, preprint, abstract, PDF, technical report, benchmark, model release, agent framework, or AI research finding.
---

# Xiaohongshu Paper Promotion

## Overview

Turn AI and machine learning papers into credible, readable Xiaohongshu posts for paper-promotion accounts. Preserve factual accuracy while translating technical contributions into hooks, takeaways, technical explanations, and publishing assets.

## Reference Loading

- Read `references/paper-analysis.md` when the paper input is long, technical, incomplete, or needs faithful extraction.
- Read `references/llm-agent-positioning.md` when the paper is about LLMs, agents, RAG, multimodal systems, evaluation, alignment, tool use, planning, memory, code agents, model releases, or AI applications.
- Read `references/xhs-style.md` when generating titles, post body, hashtags, cover text, or multiple style variants.
- Read `references/academic-safety.md` before finalizing claims, especially for AI safety, medical, psychology, finance, education, public-policy, or deployment-heavy papers.

## Input Handling

Accept any of these inputs:

- paper title, abstract, keywords, author summary, notes, or BibTeX
- PDF text, screenshots, copied sections, arXiv/DOI/conference/journal metadata
- model cards, benchmark tables, leaderboard notes, project pages, GitHub summaries, or technical blogs
- the user's rough opinion, account positioning, target audience, or desired tone

If the paper content is insufficient, ask for the missing abstract or core findings only when necessary. Otherwise, proceed with clear uncertainty labels such as "根据摘要可见", "如果论文全文支持这一点", or "目前输入里没有看到具体实验结果".

## Workflow

1. Extract the paper card:
   - title
   - field
   - research question
   - task or scenario
   - method, data, model, system, or benchmark
   - main findings
   - contribution
   - limitations or caveats
   - likely reader value
2. Decide the primary audience:
   - AI researchers or graduate students
   - algorithm engineers
   - AI product managers
   - founders or indie builders
   - general AI readers
   - account-specific niche, if provided
3. Convert the paper into post angles:
   - why this paper matters now
   - what technical idea, benchmark, workflow, or evaluation design is worth noticing
   - what readers can learn, reuse, compare, or question
   - what should not be overread
4. Generate publishing assets:
   - title candidates
   - main post copy
   - paper highlights
   - technical breakdown
   - suitable audience
   - hashtags
   - cover text
5. Run an academic and AI-claim safety pass:
   - remove invented details
   - distinguish benchmark performance, demo performance, and real-world performance
   - preserve limitations, assumptions, and deployment constraints

## Default Output

Return one ready-to-post Chinese Xiaohongshu article by default. Prefer a narrative paper-breakdown format over a report-like list. Use the template below unless the user asks for another format.

```markdown
[机构/团队/作者信息，如果输入支持] 发了一篇 [方向] 的新论文：
《论文标题》

一句话概括：
这篇论文不是只在做 [表层能力/单点指标]，而是想解决一个更实际的问题：[核心问题]。

🙋[问题背景小标题？]
[用口语解释这个问题为什么重要。先写用户/研究/产品场景，再写现有方法为什么容易出问题。]

🐳[论文方法小标题？]
[解释论文做了什么。用一个简单类比或一句通俗转译，把核心方法讲清楚。]

🌟关键设计：[关键词1]+[关键词2]+[关键词3]
简单说就是三件事：

[设计1]
[解释为什么这个设计解决了冲突或提升了稳定性。]

[设计2]
[解释它和普通做法有什么区别。]

[设计3]
[解释它对训练、推理、评测或产品使用有什么价值。]

🍒论文结果：
[只写输入中明确给出的实验结果、benchmark、指标或案例。没有具体数值时，写“摘要里没有给出具体数值，但提到...”]

⛰️[产品/行业/研究意义总结]
[把论文放回真实 AI 产品、模型能力组合、评测、可解释性、安全审计或工程落地语境。最后给一个克制但有观点的总结。]

标签：
#...

封面文字：
主标题：...
副标题：...
```

If useful, add a short "可选标题" block after the article with 3-6 title candidates. Do not put title candidates before the article unless the user asks for a title list first.

## Style Variants

When useful, provide two or three versions:

- `专业可信版`: restrained, precise, suitable for scholars, graduate students, and research accounts.
- `流量友好版`: more vivid and hook-driven, suitable for Xiaohongshu discovery traffic, but still fact-safe.
- `工程读者版`: emphasize implementation ideas, benchmarks, agent workflow, deployment constraints, and reproduction value.

For titles, include a mix of:

- information-gap titles
- practical takeaway titles
- field-specific titles
- beginner-friendly titles
- question titles
- mild contrarian titles, only when supported by the paper

## Claim Rules

- Do not invent authors, institutions, sample sizes, datasets, results, publication venues, awards, rankings, citations, code availability, open-source status, or metrics.
- Do not say "证明", "颠覆", "首次", "封神", "必看", or "彻底解决" unless the paper explicitly supports the claim and the user asks for a stronger marketing tone.
- Use "提出", "发现", "显示", "讨论", "提示", "提供了一个视角" for normal claims.
- Use "可能", "有助于", "在...条件下", "对于...场景" when evidence is bounded.
- Distinguish peer-reviewed papers from preprints if known.
- Keep limitations visible when they affect interpretation.
- For AI papers, distinguish benchmark results from real-world performance.
- For agent papers, distinguish demo success, benchmark success, and reliable autonomous deployment.
- Do not claim a model or agent "会自主思考", "具备真正智能", "取代人类", or "通向 AGI" unless the paper explicitly and narrowly supports that framing.

## Xiaohongshu Defaults

- Titles: 12-28 Chinese characters when possible.
- Body: 700-1200 Chinese characters by default for the narrative paper-breakdown template, unless the user requests a different length.
- Paragraphs: short, skimmable, with clear line breaks.
- Tone: energetic but credible; avoid fake excitement.
- Hashtags: 6-12 tags mixing field, method, audience, and content format.
- Cover text: 1 main line plus 1 support line, punchy and legible.
- Preserve the user's template rhythm: source/title, one-sentence summary, problem, method, key design, results, and broader meaning.
- Use emoji section markers sparingly and consistently: 🙋 for the problem, 🐳 for the method, 🌟 for key design, 🍒 for results, ⛰️ for broader meaning.

## AI Account Defaults

- Favor "懂技术但不端着" over generic popular science.
- Explain one key mechanism rather than listing every experiment.
- Mention the task, benchmark, dataset, model, or scenario behind impressive numbers.
- Name practical value carefully: research inspiration, engineering reference, evaluation framework, product idea, or reading list.
- Prefer "这篇适合关注 Agent/RAG/评测的人收藏" over broad claims like "AI 从业者必看".

## Final Check

Before replying, verify:

- The copy is based only on provided or clearly labeled inferred information.
- The hook matches the paper's actual contribution.
- The technical breakdown is understandable without distorting the method.
- The post can attract attention without damaging scholarly credibility.
- The result is ready to paste into a Xiaohongshu publishing workflow.
