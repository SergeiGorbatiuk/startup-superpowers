#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

function fail(message) {
  failures.push(message);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}

function assert(condition, message) {
  if (!condition) fail(message);
}

const manifestPath = ".codex-plugin/plugin.json";
assert(existsSync(join(root, manifestPath)), `${manifestPath} must exist`);

if (existsSync(join(root, manifestPath))) {
  const manifest = JSON.parse(read(manifestPath));
  assert(manifest.name === "startup-superpowers", "Codex manifest name must be startup-superpowers");
  assert(manifest.skills === "./skills/", "Codex manifest must expose ./skills/");
  assert(!Object.hasOwn(manifest, "agents"), "Codex manifest must not declare unsupported agents field");
}

const startupSkill = read("skills/using-startup-superpowers/SKILL.md");
assert(
  startupSkill.includes("Agent role briefs") &&
    startupSkill.includes("On Codex") &&
    startupSkill.includes("do not assume custom agents are registered"),
  "using-startup-superpowers must define portable Codex agent-role dispatch rules"
);

const skillFiles = [
  "skills/competitors/SKILL.md",
  "skills/hypotheses/SKILL.md",
  "skills/interviews/SKILL.md",
  "skills/market-research/SKILL.md",
  "skills/mvp/SKILL.md",
  "skills/surveys/SKILL.md",
  "skills/whats-next/SKILL.md",
  "skills/whats-next/references/initialization.md",
  "skills/whats-next/references/with-progress.md",
  "skills/interviews/references/transcript-analysis.md",
  "skills/competitors/references/discovery.md",
  "skills/competitors/references/user-feedback.md",
  "skills/competitors/references/watch.md",
  "skills/market-research/references/initial-market-research.md",
  "skills/hypotheses/references/initial-hypotheses.md",
  "skills/surveys/references/initial-survey-questions.md",
  "skills/mvp/references/initial-mvp-design.md",
];

for (const path of skillFiles) {
  const content = read(path);
  assert(!content.includes(".claude/skills"), `${path} must not hard-code .claude/skills paths`);
  assert(!content.includes(".Codex/agents"), `${path} must not claim Codex plugin agents live in .Codex/agents`);
}

const transcriptWorkflow = read("skills/interviews/references/transcript-analysis.md");
assert(
  transcriptWorkflow.includes("On Codex, prefer having the subagent return the complete analysis markdown") &&
    transcriptWorkflow.includes("the main agent writes"),
  "transcript-analysis workflow must keep Codex file writes owned by the main agent"
);

if (failures.length > 0) {
  console.error("Codex compatibility validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Codex compatibility validation passed.");
