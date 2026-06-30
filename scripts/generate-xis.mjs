#!/usr/bin/env node

import { mkdir, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

async function loadDotEnv() {
  const envPath = path.join(rootDir, ".env");

  try {
    const content = await readFile(envPath, "utf8");

    for (const rawLine of content.split(/\r?\n/)) {
      const line = rawLine.trim();
      if (!line || line.startsWith("#")) continue;

      const equalIndex = line.indexOf("=");
      if (equalIndex === -1) continue;

      const key = line.slice(0, equalIndex).trim();
      let value = line.slice(equalIndex + 1).trim();

      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      if (key && process.env[key] === undefined) {
        process.env[key] = value;
      }
    }
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
}

function unquoteTomlValue(value) {
  const trimmed = value.trim();

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }

  if (trimmed === "true") return true;
  if (trimmed === "false") return false;

  return trimmed;
}

function parseSimpleToml(content) {
  const data = {};
  let section = data;

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;

    const sectionMatch = line.match(/^\[([^\]]+)\]$/);
    if (sectionMatch) {
      const keys = sectionMatch[1].split(".");
      section = data;

      for (const key of keys) {
        section[key] ??= {};
        section = section[key];
      }

      continue;
    }

    const equalIndex = line.indexOf("=");
    if (equalIndex === -1) continue;

    const key = line.slice(0, equalIndex).trim();
    const value = line.slice(equalIndex + 1).split("#")[0].trim();
    section[key] = unquoteTomlValue(value);
  }

  return data;
}

async function readOptionalText(filePath) {
  try {
    return await readFile(filePath, "utf8");
  } catch (error) {
    if (error.code === "ENOENT") return "";
    throw error;
  }
}

async function loadCodexConfig() {
  const codexDir = path.join(os.homedir(), ".codex");
  const configText = await readOptionalText(path.join(codexDir, "config.toml"));
  const authText = await readOptionalText(path.join(codexDir, "auth.json"));
  const config = configText ? parseSimpleToml(configText) : {};
  let auth = {};

  if (authText) {
    try {
      auth = JSON.parse(authText);
    } catch {
      throw new Error("Could not parse ~/.codex/auth.json as JSON.");
    }
  }

  const providerName = config.model_provider;
  const provider = providerName
    ? config.model_providers?.[providerName]
    : undefined;

  return {
    apiKey: auth.OPENAI_API_KEY,
    model: config.model,
    apiBase: provider?.base_url,
    wireApi: provider?.wire_api,
  };
}

async function resolveRuntimeConfig() {
  await loadDotEnv();

  const codexConfig = await loadCodexConfig();
  const apiKey = process.env.OPENAI_API_KEY || codexConfig.apiKey;
  const model = process.env.OPENAI_MODEL || codexConfig.model || "gpt-5.5";
  const apiBase =
    process.env.OPENAI_API_BASE ||
    codexConfig.apiBase ||
    "https://api.openai.com/v1";
  const wireApi = process.env.OPENAI_WIRE_API || codexConfig.wireApi || "responses";

  return {
    apiKey,
    model,
    apiBase,
    wireApi,
  };
}

function parseArgs(argv) {
  const args = {
    inputPath: null,
    outPath: null,
    urls: [],
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "--out" || arg === "-o") {
      args.outPath = argv[index + 1];
      index += 1;
      continue;
    }

    if (arg === "--url" || arg === "-u") {
      args.urls.push(argv[index + 1]);
      index += 1;
      continue;
    }

    if (arg === "--input" || arg === "-i") {
      args.inputPath = argv[index + 1];
      index += 1;
      continue;
    }

    if (!args.inputPath) {
      args.inputPath = arg;
      continue;
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  return args;
}

function extractUrls(text) {
  const urls = new Set();
  const labeledUrlPattern =
    /(?:论文链接|论文地址|paper\s*url|url|link|链接|地址)\s*[:：]\s*(https?:\/\/[^\s<>"'，。)）\]]+)/gi;
  const anyUrlPattern = /https?:\/\/[^\s<>"'，。)）\]]+/gi;

  for (const match of text.matchAll(labeledUrlPattern)) {
    urls.add(match[1]);
  }

  if (urls.size === 0) {
    for (const match of text.matchAll(anyUrlPattern)) {
      urls.add(match[0]);
    }
  }

  return [...urls];
}

function normalizeUrl(url) {
  if (/^https:\/\/arxiv\.org\/abs\//i.test(url)) return url;
  if (/^https:\/\/arxiv\.org\/pdf\//i.test(url)) {
    return url.replace("/pdf/", "/abs/").replace(/\.pdf$/i, "");
  }

  return url;
}

function htmlToText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|section|article|h1|h2|h3|li|tr)>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

function extractUsefulText(html, contentType) {
  if (contentType.includes("application/pdf")) {
    throw new Error(
      "PDF URL detected. Please use an abstract/project page URL, or paste the PDF text into the input file."
    );
  }

  if (
    !contentType.includes("text/html") &&
    !contentType.includes("text/plain") &&
    contentType
  ) {
    throw new Error(`Unsupported URL content type: ${contentType}`);
  }

  const text = contentType.includes("text/plain") ? html : htmlToText(html);
  return text.slice(0, 50000);
}

async function fetchUrlText(url) {
  const normalizedUrl = normalizeUrl(url);
  const response = await fetch(normalizedUrl, {
    headers: {
      Accept: "text/html,text/plain,application/xhtml+xml",
      "User-Agent": "xhs-paper-promotion/0.1",
    },
  });

  if (!response.ok) {
    throw new Error(`Could not fetch ${normalizedUrl}: HTTP ${response.status}`);
  }

  const contentType = response.headers.get("content-type") ?? "";
  const body = await response.text();
  const text = extractUsefulText(body, contentType);

  return {
    url: normalizedUrl,
    text,
  };
}

async function enrichPaperInputWithUrls(paperInput, cliUrls) {
  const urls = [...new Set([...cliUrls.filter(Boolean), ...extractUrls(paperInput)])];
  if (urls.length === 0) return paperInput;

  const fetched = [];

  for (const url of urls) {
    const result = await fetchUrlText(url);
    fetched.push(`来源链接：${result.url}\n\n抓取到的页面文本：\n${result.text}`);
  }

  return [
    paperInput.trim(),
    "以下是脚本根据论文链接抓取到的补充文本。生成时可以使用这些信息，但不要编造页面中没有的作者、机构、指标或结论。",
    ...fetched,
  ].join("\n\n---\n\n");
}

async function readStdin() {
  if (process.stdin.isTTY) return "";

  const chunks = [];
  for await (const chunk of process.stdin) {
    chunks.push(Buffer.from(chunk));
  }

  return Buffer.concat(chunks).toString("utf8");
}

async function readPaperInput(inputPath, urls = []) {
  if (inputPath) {
    return readFile(path.resolve(process.cwd(), inputPath), "utf8");
  }

  const stdinText = await readStdin();
  if (stdinText.trim()) return stdinText;

  if (urls.length > 0) {
    return `论文链接：\n${urls.join("\n")}`;
  }

  throw new Error(
    "Missing paper input. Usage: npm run generate -- examples/paper.md or npm run generate -- --url https://arxiv.org/abs/xxxx.xxxxx"
  );
}

async function readReference(relativePath) {
  return readFile(path.join(rootDir, relativePath), "utf8");
}

async function buildInstructions() {
  const files = [
    "SKILL.md",
    "references/paper-analysis.md",
    "references/llm-agent-positioning.md",
    "references/xhs-style.md",
    "references/academic-safety.md",
  ];

  const sections = await Promise.all(
    files.map(async (file) => {
      const content = await readReference(file);
      return `# ${file}\n\n${content}`;
    })
  );

  return [
    "You are running the xhs-paper-promotion skill outside Codex.",
    "Follow the skill and reference documents exactly.",
    "Return the final answer in Chinese Markdown.",
    "By default, produce one ready-to-post narrative Xiaohongshu paper-breakdown article: source/title, one-sentence summary, problem section, method section, key design section, results section, broader product/research meaning, tags, and cover text.",
    "Do not begin with a title-candidate list unless the user explicitly asks for title candidates first.",
    "Do not invent unsupported paper details, metrics, authors, venues, code status, or claims.",
    ...sections,
  ].join("\n\n---\n\n");
}

function extractOutputText(responseJson) {
  if (typeof responseJson.output_text === "string") {
    return responseJson.output_text;
  }

  const chunks = [];

  for (const item of responseJson.output ?? []) {
    for (const content of item.content ?? []) {
      if (content.type === "output_text" && typeof content.text === "string") {
        chunks.push(content.text);
      }
    }
  }

  return chunks.join("\n").trim();
}

async function createResponse({ apiKey, apiBase, wireApi, model, instructions, input }) {
  if (wireApi !== "responses") {
    throw new Error(
      `Unsupported wire_api "${wireApi}". This script currently supports "responses".`
    );
  }

  const response = await fetch(`${apiBase.replace(/\/$/, "")}/responses`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      instructions,
      input,
    }),
  });

  const responseText = await response.text();
  let responseJson;

  try {
    responseJson = JSON.parse(responseText);
  } catch {
    throw new Error(`API returned non-JSON response:\n${responseText}`);
  }

  if (!response.ok) {
    const message =
      responseJson.error?.message ??
      responseJson.message ??
      JSON.stringify(responseJson, null, 2);
    throw new Error(`OpenAI API error (${response.status}): ${message}`);
  }

  return responseJson;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const { apiKey, model, apiBase, wireApi } = await resolveRuntimeConfig();

  if (!apiKey || apiKey === "sk-your-api-key-here") {
    throw new Error(
      "Please set OPENAI_API_KEY in .env, your shell, or ~/.codex/auth.json."
    );
  }

  const paperInput = await readPaperInput(args.inputPath, args.urls);
  const enrichedPaperInput = await enrichPaperInputWithUrls(paperInput, args.urls);
  const instructions = await buildInstructions();

  const responseJson = await createResponse({
    apiKey,
    apiBase,
    wireApi,
    model,
    instructions,
    input: enrichedPaperInput,
  });

  const output = extractOutputText(responseJson);
  if (!output) {
    throw new Error(`No text output found:\n${JSON.stringify(responseJson, null, 2)}`);
  }

  if (args.outPath) {
    const outputPath = path.resolve(process.cwd(), args.outPath);
    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, `${output}\n`, "utf8");
    console.error(`Saved to ${outputPath}`);
  }

  console.log(output);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
