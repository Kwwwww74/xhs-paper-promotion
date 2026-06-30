<div align="center">

# 🍠 xhs-paper-promotion

**中文** | [English](./README.md)

把 AI / LLM / Agent / RAG / 机器学习论文转换成适合小红书发布的中文论文拆解文案。

[![GitHub stars](https://img.shields.io/github/stars/Kwwwww74/xhs-paper-promotion?style=social)](https://github.com/Kwwwww74/xhs-paper-promotion/stargazers)
[![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)

</div>

这个项目有两种用法：

- 作为 Codex Skill 使用
- 作为独立 Node.js CLI 工具使用，通过 OpenAI-compatible Responses API 生成内容

## ✨ 功能特点

- 生成小红书论文拆解长文案
- 支持论文标题、摘要、Introduction、Conclusion、实验结果输入
- 支持论文链接，例如 arXiv abstract 页、项目页、技术博客页
- 支持 Codex Skill 调用：`$xhs-paper-promotion`
- 支持 `.env` 配置 API
- 支持读取 `~/.codex/config.toml` 和 `~/.codex/auth.json`
- 内置 AI 论文安全边界，避免夸大模型能力、AGI、真实部署效果或没有依据的 benchmark 结论

## 📝 默认输出风格

默认输出类似下面这种结构：

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
```

## 📁 项目结构

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

## ⚙️ 环境要求

- Node.js 18+
- 一个支持 Responses API 的 OpenAI-compatible API key

项目不需要额外安装 npm 依赖。

## 🧩 作为 Codex Skill 使用

把整个项目目录放到：

```bash
~/.codex/skills/xhs-paper-promotion
```

然后重启 Codex，或者打开一个新线程。

使用示例：

```text
Use $xhs-paper-promotion

请把这篇论文生成小红书论文拆解文案：

论文标题：
...

摘要：
...

实验结果：
...
```

也可以直接给论文链接：

```text
Use $xhs-paper-promotion

论文链接：
https://arxiv.org/abs/xxxx.xxxxx

请生成小红书论文拆解文案。
```

## 🚀 作为 CLI 使用

从输入文件生成：

```bash
npm run generate -- examples/paper.md
```

从论文链接生成：

```bash
npm run generate -- --url https://arxiv.org/abs/xxxx.xxxxx
```

从只包含链接的示例文件生成：

```bash
npm run generate -- examples/link-only.md
```

把结果保存到文件：

```bash
npm run generate -- examples/paper.md --out outputs/post.md
```

从链接生成并保存到文件：

```bash
npm run generate -- --url https://arxiv.org/abs/xxxx.xxxxx --out outputs/post.md
```

直接运行 Node 脚本：

```bash
node scripts/generate-xhs.mjs examples/paper.md
node scripts/generate-xhs.mjs --url https://arxiv.org/abs/xxxx.xxxxx
```

通过 stdin 输入：

```bash
cat examples/paper.md | npm run generate
```

## 🔐 API 配置

### 方式 A：使用 `.env`

创建本地 `.env` 文件：

```bash
cp .env.example .env
```

编辑 `.env`：

```env
OPENAI_API_KEY=sk-your-api-key-here
OPENAI_MODEL=gpt-5.5
OPENAI_API_BASE=https://api.openai.com/v1
OPENAI_WIRE_API=responses
```

如果你使用 OpenAI-compatible 网关，可以这样写：

```env
OPENAI_API_KEY=sk-your-api-key-here
OPENAI_MODEL=gpt-5.4
OPENAI_API_BASE=https://vip.zxyfedu.com
OPENAI_WIRE_API=responses
```

脚本会请求：

```text
{OPENAI_API_BASE}/responses
```

### 方式 B：使用 Codex 风格配置

CLI 也可以读取：

```text
~/.codex/config.toml
~/.codex/auth.json
```

复制示例文件：

```bash
mkdir -p ~/.codex
cp config.toml.example ~/.codex/config.toml
cp auth.json.example ~/.codex/auth.json
```

`config.toml` 示例：

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

`auth.json` 示例：

```json
{
  "OPENAI_API_KEY": "sk-your-api-key-here"
}
```

如果 `.env` 和 Codex 风格配置同时存在，脚本优先读取 `.env`。

## 📌 输入示例

完整输入：

```md
目标读者：算法工程师 / AI 产品经理
风格：小红书论文拆解长文案
正文长度：800-1200 字左右

论文链接：
https://arxiv.org/abs/xxxx.xxxxx

论文标题：
...

Abstract：
...

Introduction / Conclusion / 实验结果：
...
```

只有链接的输入：

```md
目标读者：算法工程师 / AI 产品经理
风格：小红书论文拆解长文案

论文链接：
https://arxiv.org/abs/xxxx.xxxxx
```

推荐使用这些链接类型：

- arXiv abstract 页
- 论文项目页
- 技术博客页
- 包含摘要和实验结果的 HTML 页面

PDF 链接暂不自动解析。如果你只有 PDF，建议把摘要、Introduction、Conclusion 或实验结果复制到输入文件里。

## 🛡️ 安全提示

- 不要提交 `.env`、`auth.json`、`config.toml` 或真实 API key。
- 不要编造作者、机构、benchmark、指标、代码开源状态或模型发布状态。
- 不要在论文没有明确支持的情况下写 AGI、意识、自主思考、真实部署可用等结论。
- 写 benchmark 结果时，尽量保留任务、数据集和评测设置。

## ⭐ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=Kwwwww74/xhs-paper-promotion&type=Date)](https://star-history.com/#Kwwwww74/xhs-paper-promotion&Date)
