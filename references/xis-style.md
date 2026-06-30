# Xiaohongshu Style

Use this guide when writing titles, body copy, hashtags, and cover text for Xiaohongshu paper-promotion posts.

## Voice

- Energetic, specific, and useful.
- Friendly but not childish.
- Curious rather than sensational.
- Credible enough that a graduate student would not feel embarrassed reposting it.
- For AI, LLM, and agent accounts, sound like an informed reader who understands methods, benchmarks, and engineering constraints.
- Prefer "paper explainer account" voice: clear, opinionated, and product-aware, but not clickbait.
- Use conversational transitions such as "但问题是", "你可以简单理解成", "真正做产品时", and "这篇想解决的正是这个问题".

## Title Patterns

Generate a diverse set. Keep most titles between 12 and 28 Chinese characters.

- `信息差`: "原来...不是..."
- `问题式`: "...到底影响了什么？"
- `读者收益`: "读这篇，快速理解..."
- `研究对象`: "研究了...后，作者发现..."
- `方法亮点`: "用...数据重新看..."
- `轻反常识`: "我们可能误解了..."
- `选题入口`: "想研究...可以先看这篇"
- `工程视角`: "做...之前先看这个问题"

Avoid empty titles:

- "这篇论文太牛了"
- "重磅研究来了"
- "不看后悔"
- "彻底颠覆认知"
- "AI 又炸了"
- "AGI 要来了"
- "智能体彻底觉醒"

## Body Structure

Use this narrative paper-breakdown structure by default:

1. Source line: "[机构/团队/作者] 发了一篇 [方向] 的新论文：《标题》". Omit the source if the input does not support it.
2. One-sentence summary: "这篇不是...，而是想解决..."
3. 🙋 Problem section: explain why the problem exists and why current models/systems struggle.
4. 🐳 Method section: explain what the paper does with a simple mechanism or analogy.
5. 🌟 Key design section: name 2-4 design keywords, then explain each in plain language.
6. 🍒 Results section: include only metrics, benchmarks, or case studies explicitly provided by the input.
7. ⛰️ Meaning section: connect the paper to product, engineering, research, safety, evaluation, or industry implications.
8. Tags and cover text: place them after the article, not before it.

## Narrative Template

Follow this shape when the user asks for Xiaohongshu copy and does not provide another template:

```markdown
[来源] 发了一篇 [方向] 的新论文：
《[论文标题]》

一句话概括：
这篇不是 [常见表层理解]，而是想解决一个更实际的问题：[核心问题]。

🙋[问题为什么重要？]
[先写真实场景，再写冲突或难点。用短句，不要堆术语。]

🐳[论文做了什么？]
[解释方法。可以保留关键英文术语，但必须马上给中文解释。]

🌟关键设计：[设计1]+[设计2]+[设计3]

简单说就是三件事：

[设计1]
[1-3 句解释。]

[设计2]
[1-3 句解释。]

[设计3]
[1-3 句解释。]

🍒论文结果：
[列出明确给出的 benchmark、指标、案例或定性结论。没有数值就说明输入未给出具体数值。]

⛰️[更大的意义]
[写产品/工程/研究意义。要有判断，但不要夸大。]

标签：
#[标签] #[标签]

封面文字：
主标题：...
副标题：...
```

Do not start with a separate "标题候选" section. If title candidates are needed, put them after the article under "可选标题".

## Formatting

- Use short paragraphs.
- Use bullets for highlights.
- Avoid dense academic jargon unless the audience is specialized.
- Keep one idea per paragraph.
- Prefer concrete nouns and verbs.
- Do not overuse emojis. If the user wants emojis, use them sparingly.
- Keep the first three lines strong enough to stand alone in a feed preview.
- Keep whitespace generous between sections.
- Preserve important English method names, benchmark names, and metrics exactly when provided.
- When explaining a method, use "你可以简单理解成..." once if it helps.
- For metrics, use one metric per line when the input provides exact values.

## Copy Blocks

Reusable opening styles:

- "最近读到一篇很适合做选题入口的论文。它讨论的不是宏大的口号，而是一个很具体的问题：..."
- "如果你正在关注...，这篇论文值得放进待读清单。"
- "这篇论文有意思的地方在于，它没有简单问...，而是把问题拆成了..."
- "很多人讨论...时会直接跳到结论，但这篇论文先问了一个更基础的问题。"
- "这篇不适合只看榜单，它真正值得看的地方在实验设计。"
- "[团队] 发了一篇 [方向] 的新论文：《[标题]》"
- "一句话概括：这篇不是...，而是..."

Reusable transition styles:

- "它真正值得看的地方有三点："
- "对做研究的人来说，方法部分尤其值得看。"
- "对做工程的人来说，重点是这个流程能不能复用。"
- "不过，这篇论文的结论也有边界："
- "所以它更适合被理解为一个证据补充，而不是最终答案。"
- "但问题是，这些能力天然会互相影响。"
- "你可以简单理解成：..."
- "真正做产品时，..."
- "这篇提醒我们：..."

Reusable CTA styles:

- "适合先收藏，之后按方法和实验两部分精读。"
- "如果你在做相关选题，可以把它当作文献综述的入口。"
- "想看我继续拆这篇的实验设计，可以留言告诉我。"
- "如果你关注 Agent/RAG/AI 评测，这篇可以加入待读清单。"

## Hashtags

Use 6-12 hashtags. Mix these types:

- AI field: `#大语言模型`, `#LLM`, `#智能体`, `#AIAgent`, `#RAG`, `#多模态AI`
- method: `#论文精读`, `#文献综述`, `#Benchmark`, `#AI评测`, `#机器学习`
- audience: `#研究生`, `#博士日常`, `#科研选题`, `#学术写作`, `#算法工程师`, `#AI产品经理`
- content series: `#每日一篇论文`, `#AI论文`, `#论文分享`, `#读论文`

Do not use misleading trend tags unrelated to the paper.

## Cover Text

Make cover text legible and concrete:

- main line: 8-16 Chinese characters
- support line: 8-22 Chinese characters
- avoid long subtitles
- avoid claims that require nuance if the cover cannot show the nuance

Examples:

- 主标题: "Agent 不只是工具调用"
- 副标题: "一篇论文拆清核心机制"
- 主标题: "别只看榜单"
- 副标题: "先看评测怎么设计"
- 主标题: "RAG 不是塞文档"
- 副标题: "关键在检索与评测"
- 主标题: "代码 Agent 新思路"
- 副标题: "从规划到纠错"
