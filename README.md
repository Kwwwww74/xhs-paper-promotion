<div align="center">

# 🍠 xhs-paper-promotion

**English** | [中文](./README.zh-CN.md)

Turn AI / LLM / Agent / RAG / machine learning papers into Chinese Xiaohongshu-style paper explainer posts.

[![GitHub stars](https://img.shields.io/github/stars/Kwwwww74/xhs-paper-promotion?style=social)](https://github.com/Kwwwww74/xhs-paper-promotion/stargazers)
[![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)

</div>

This project can be used in two ways:

- as a Codex Skill
- as a standalone Node.js CLI powered by an OpenAI-compatible Responses API

## ✨ Features

- Generate long-form Xiaohongshu paper breakdown posts
- Support paper title, abstract, introduction, conclusion, and experiment results
- Support paper links such as arXiv abstract pages, project pages, and technical blogs
- Support Codex Skill invocation with `$xhs-paper-promotion`
- Support `.env` API configuration
- Support Codex-style config from `~/.codex/config.toml` and `~/.codex/auth.json`
- Include safety rules to avoid overstating model capability, AGI claims, deployment readiness, or unsupported benchmark results

## 📝 Output Style

The default output follows this structure:

```text
[Source] published a new paper in [field]:
《Paper Title》

One-sentence summary:
This paper is not just about ..., but about solving a more practical problem: ...

🙋 Problem background

🐳 What the paper does

🌟 Key design

🍒 Paper results

⛰️ Product / research meaning

Tags:
#...

Cover text:
Main title: ...
Subtitle: ...
```

## 📁 Project Structure

```text
xhs-paper-promotion/
├── SKILL.md
├── README.md
├── README.zh-CN.md
├── package.json
├── config.toml
├── auth.json
├── agents/
│   └── openai.yaml
├── references/
│   ├── academic-safety.md
│   ├── llm-agent-positioning.md
│   ├── paper-analysis.md
│   └── xhs-style.md
├── inputs/
│   ├── paper.md
│   └── link.md
└── scripts/
    └── generate-xhs.mjs
```

## ⚙️ Requirements

- Node.js 18+
- An API key for an OpenAI-compatible Responses API

No npm dependencies are required.

## 🧩 Use as a Codex Skill

Install the folder to:

```bash
~/.codex/skills/xhs-paper-promotion
```

Then restart Codex or open a new thread.

Example:

```text
Use $xhs-paper-promotion

Please turn this paper into a Xiaohongshu-style paper explainer post:

Paper title:
...

Abstract:
...

Results:
...
```

You can also provide a paper link:

```text
Use $xhs-paper-promotion

Paper link:
https://arxiv.org/abs/xxxx.xxxxx

Please generate a Xiaohongshu paper explainer post.
```

## 🚀 Use as a CLI

Generate from an input file:

```bash
npm run generate -- examples/paper.md
```

Generate from a paper link:

```bash
npm run generate -- --url https://arxiv.org/abs/xxxx.xxxxx
```

Generate from a link-only example file:

```bash
npm run generate -- examples/link-only.md
```

Save output to a file:

```bash
npm run generate -- examples/paper.md --out outputs/post.md
```

Save output from a URL:

```bash
npm run generate -- --url https://arxiv.org/abs/xxxx.xxxxx --out outputs/post.md
```

Run the script directly:

```bash
node scripts/generate-xhs.mjs examples/paper.md
node scripts/generate-xhs.mjs --url https://arxiv.org/abs/xxxx.xxxxx
```

Use stdin:

```bash
cat examples/paper.md | npm run generate
```

## 🔐 API Configuration

### Option A: `.env`

Create a local `.env` file:

```bash
cp .env.example .env
```

Edit `.env`:

```env
OPENAI_API_KEY=sk-your-api-key-here
OPENAI_MODEL=gpt-5.5
OPENAI_API_BASE=https://api.openai.com/v1
OPENAI_WIRE_API=responses
```

For an OpenAI-compatible gateway:

```env
OPENAI_API_KEY=sk-your-api-key-here
OPENAI_MODEL=gpt-5.4
OPENAI_API_BASE=https://vip.zxyfedu.com
OPENAI_WIRE_API=responses
```

The script calls:

```text
{OPENAI_API_BASE}/responses
```

### Option B: Codex-style config

The CLI can also read:

```text
~/.codex/config.toml
~/.codex/auth.json
```

Create example files:

```bash
mkdir -p ~/.codex
cp config.toml.example ~/.codex/config.toml
cp auth.json.example ~/.codex/auth.json
```

Example `config.toml`:

```toml
model_provider = "suocode_com"
model = "gpt-5.4"
review_model = "gpt-5.4"
model_reasoning_effort = "xhigh"
disable_response_storage = true
network_access = "enabled"
windows_wsl_setup_acknowledged = true

[model_providers.suocode_com]
name = "suocode_com"
base_url = "https://vip.zxyfedu.com"
wire_api = "responses"
requires_openai_auth = true
```

Example `auth.json`:

```json
{
  "OPENAI_API_KEY": "sk-your-api-key-here"
}
```

If both `.env` and Codex-style config exist, `.env` takes priority.

## 📌 Input Examples

Full paper input:

```md
Target audience: algorithm engineers / AI product managers
Style: long-form Xiaohongshu paper explainer
Length: around 800-1200 Chinese characters

Paper link:
https://arxiv.org/abs/xxxx.xxxxx

Paper title:
...

Abstract:
...

Introduction / Conclusion / Results:
...
```

Link-only input:

```md
Target audience: algorithm engineers / AI product managers
Style: long-form Xiaohongshu paper explainer

Paper link:
https://arxiv.org/abs/xxxx.xxxxx
```

Recommended URL types:

- arXiv abstract pages
- paper project pages
- technical blog pages
- HTML pages with abstracts and results

PDF URLs are not automatically parsed. If you only have a PDF, paste the abstract, introduction, conclusion, or experiment results into the input file.

## 🛡️ Safety Notes

- Do not commit `.env`, `auth.json`, `config.toml`, or real API keys.
- Do not invent authors, institutions, benchmarks, metrics, code availability, or open-source status.
- Do not claim AGI, consciousness, autonomous thinking, or real-world deployment readiness unless the paper explicitly supports it.
- For benchmark results, preserve the task, dataset, and evaluation setting.

## ⭐ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=Kwwwww74/xhs-paper-promotion&type=Date)](https://star-history.com/#Kwwwww74/xhs-paper-promotion&Date)
