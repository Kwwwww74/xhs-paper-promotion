# xhs-paper-promotion

把 AI / LLM / Agent / RAG / 机器学习论文转换成适合小红书发布的中文论文拆解文案。

项目既可以作为 Codex Skill 使用，也可以作为独立 Node.js CLI 工具，通过 OpenAI-compatible Responses API 生成内容。

## Features

- 支持论文标题、摘要、Introduction、Conclusion、实验结果输入
- 支持直接传入论文链接，例如 arXiv abstract 页、项目页、技术博客页
- 默认生成小红书论文拆解长文案
- 支持 Codex Skill 调用
- 支持 `.env` 配置 API
- 支持读取 `~/.codex/config.toml` 和 `~/.codex/auth.json`
- 内置 AI 论文安全边界，避免夸大模型能力、AGI、真实部署效果等

## Output Style

默认输出结构类似：

```text
[来源] 发了一篇 [方向] 的新论文：
《论文标题》

一句话概括：
这篇不是...，而是想解决一个更实际的问题：...

🙋问题背景

🐳论文做法

🌟关键设计

🍒论文结果

⛰️产品/研究意义

标签：
#...

封面文字：
主标题：...
副标题：...
