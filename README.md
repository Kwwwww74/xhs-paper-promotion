# xhs-paper-promotion

把 AI / LLM / Agent / RAG / 机器学习论文转成可信的小红书推广文案。

这个目录既可以作为 Codex skill 使用，也可以通过 OpenAI API key 独立运行。

## Codex Skill 调用

安装到：

```bash
~/.codex/skills/xhs-paper-promotion
```

然后在 Codex 里输入：

```text
Use $xhs-paper-promotion

下面是论文内容，请按“来源 + 论文标题 + 一句话概括 + 问题背景 + 方法解释 + 关键设计 + 论文结果 + 产品/研究意义”的小红书论文拆解模板生成文案：
...
```

## API 独立调用

你可以用两种方式配置 API。

### 方式 A：模仿 Codex 配置读取

把示例配置复制到 Codex 配置目录：

```bash
mkdir -p ~/.codex
cp config.toml.example ~/.codex/config.toml
cp auth.json.example ~/.codex/auth.json
```

然后编辑：

```text
~/.codex/config.toml
~/.codex/auth.json
```

`config.toml` 里配置模型、base_url 和 wire_api：

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

脚本会请求：

```text
{base_url}/responses
```

如果你的网关实际接口是 `https://vip.zxyfedu.com/v1/responses`，就把 `base_url` 改成：

```toml
base_url = "https://vip.zxyfedu.com/v1"
```

`auth.json` 里配置 API key：

```json
{
  "OPENAI_API_KEY": "sk-your-api-key-here"
}
```

不要把真实 `auth.json` 提交到 GitHub。

### 方式 B：项目内 `.env`

也可以创建项目自己的 `.env`：

```bash
cp .env.example .env
```

然后把 `.env` 里的 `OPENAI_API_KEY` 换成你的 API key。

如果同时存在 `.env` 和 `~/.codex/config.toml`，脚本优先使用 `.env` 里的配置。

运行示例：

```bash
npm run generate -- examples/paper.md
```

也可以直接给论文链接，脚本会先抓取网页内容再生成：

```bash
npm run generate -- --url https://arxiv.org/abs/xxxx.xxxxx
```

或者在输入文件里写：

```text
论文链接：https://arxiv.org/abs/xxxx.xxxxx
```

推荐使用 arXiv abstract 页、论文项目页、技术博客页。PDF 链接暂不自动解析；如果只有 PDF，请先复制摘要、Introduction、Conclusion 或实验结果到输入文件。

也可以把结果保存到文件：

```bash
npm run generate -- examples/paper.md --out outputs/post.md
```

输入文件可以放论文标题、摘要、Introduction、Conclusion、实验结果，内容越完整，生成结果越稳。

默认输出是一篇可直接发布的小红书长文案，而不是标题候选列表。模板大致是：

```text
[来源] 发了一篇 [方向] 的新论文：《标题》

一句话概括：...

🙋问题背景
🐳论文做法
🌟关键设计
🍒论文结果
⛰️产品/研究意义

标签：
封面文字：
```
