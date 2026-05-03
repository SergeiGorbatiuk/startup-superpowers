#!/usr/bin/env node

/**
 * init-project.ts — Scaffolds startup/ with core.md, plan.md, and AGENTS.md.
 * Also adds a reference line to the project's CLAUDE.md.
 *
 * Usage:
 *   npx tsx scripts/init-project.ts --name "My Startup" --description "A tool for ..."
 *   bun run scripts/init-project.ts --name "My Startup"
 *
 * Options:
 *   --name         Project name (required)
 *   --description  Seed description (optional, defaults to "")
 *   --dir          Target directory (optional, defaults to cwd)
 */

import {
  mkdirSync,
  writeFileSync,
  existsSync,
  readFileSync,
  appendFileSync,
} from "node:fs";
import { join, resolve } from "node:path";

function parseArgs(argv: string[]): Record<string, string> {
  const result: Record<string, string> = {};
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith("--") && i + 1 < argv.length) {
      result[argv[i].slice(2)] = argv[i + 1];
      i++;
    }
  }
  return result;
}

const args = parseArgs(process.argv.slice(2));

if (!args.name) {
  console.error("Error: --name is required");
  process.exit(1);
}

const targetDir = resolve(args.dir || process.cwd());
const root = join(targetDir, "startup");

if (existsSync(root)) {
  console.error(
    `Error: ${root} already exists. Remove it first or use a different directory.`
  );
  process.exit(1);
}

mkdirSync(root, { recursive: true });
mkdirSync(join(root, "hypotheses"), { recursive: true });
mkdirSync(join(root, "competitors"), { recursive: true });
mkdirSync(join(root, "research"), { recursive: true });

// ---------------------------------------------------------------------------
// core.md — the single source of truth for the project definition
// ---------------------------------------------------------------------------

const seedDescription = args.description || "";

const coreMd = `---
version: 1
name: ${args.name}
---

# ${args.name}

## Seed Description

${seedDescription}

## Core
`;

writeFileSync(join(root, "core.md"), coreMd);

// ---------------------------------------------------------------------------
// plan.md — cumulative plan tracking current focus and next steps
// ---------------------------------------------------------------------------

const today = new Date().toISOString().split("T")[0];

const planMd = `---
version: 1
last_assessed: ${today}
---

# Plan

## Current Focus

Define your idea — who it's for, what problem it solves, and how.

## Steps

- [ ] **Define the idea and target audience**

## Log

### ${today}

Project initialized. Starting with idea definition.
`;

writeFileSync(join(root, "plan.md"), planMd);

// ---------------------------------------------------------------------------
// AGENTS.md — ambient context loaded via CLAUDE.md reference
// ---------------------------------------------------------------------------

const agents = `# Startup Advisor

This project uses the Startup Advisor workflow.

## Voice input

The founder may be using voice input. Voice transcription is unreliable with proper nouns — competitor names, product names, URLs, technical terms, and non-English words often come through garbled. When the input contains something that looks like a misheard name or an unintelligible fragment, ask the founder to clarify or spell it out rather than guessing.

## Project definition

The source of truth for the project definition is \`startup/core.md\`. It is a markdown file with:

- **YAML frontmatter** containing \`version\` (format version) and \`name\` (working project name)
- **\`## Seed Description\`** section with the founder's original description of what they're building
- **\`## Core\`** section with structured fields as \`- **Key:** Value\` list items (audience, problem, solution, geography, etc.) — these accumulate as the onboarding conversation progresses

Read \`startup/core.md\` at the start of any conversation that touches the startup idea, product, or strategy.

When updating \`core.md\`, read the current file first, modify the fields you need under \`## Core\` (using \`- **Key:** Value\` format), and write the file back. Leave the frontmatter and \`## Seed Description\` untouched. Propose changes to the founder and get confirmation before writing. Fields missing from \`## Core\` are not yet defined — don't push to fill everything at once.

## Plan

The project plan lives in \`startup/plan.md\`. It tracks the founder's current focus, next steps as a checklist, and a log of past assessments. The \`whats-next\` skill manages it — don't update it directly. When the founder asks about direction or next steps, invoke the \`whats-next\` skill which dispatches the lean-startup-advisor subagent for an independent assessment.

## Hypotheses

Hypotheses are testable assumptions about the project — things the founder believes but hasn't validated yet. Each hypothesis is a \`.md\` file in \`startup/hypotheses/\`.

Format: YAML frontmatter with \`status\` (untested/confirmed/invalidated), an H1 title (the testable statement), an Obsidian tag for type (#problem, #solution, #willingness_to_pay, #urgency, #other), a description, and an optional ## Notes section.

When the founder mentions a new assumption or risk in conversation, suggest capturing it as a hypothesis. Read the hypotheses folder before any conversation about validation, interviews, or pivots. To update a hypothesis, read the file first, propose the change, get confirmation, then write it back.

## Competitors

Competitors are tracked as individual \`.md\` files in \`startup/competitors/\`.

Format: YAML frontmatter with \`type\` (direct/indirect) and \`url\` (competitor's website), an H1 heading with the competitor name, and sections for Description, Core Features, and Notes.

When the founder mentions a competitor or asks about the competitive landscape, read the competitors folder for context. To add or update a competitor, follow the file conventions and get confirmation before writing.

## Web research

A \`web-researcher\` subagent is available for any research task that goes beyond a quick search — competitive landscape discovery, problem space validation, market signals, community discussion. Use it when the founder asks to research something or when research would meaningfully sharpen an assumption or decision.

Research summaries from web-researcher runs are saved to \`startup/research/\` as dated \`.md\` files. This preserves expensive research for future reference. The calling skill is responsible for writing the file after getting the agent's output.
`;

writeFileSync(join(root, "AGENTS.md"), agents);

// ---------------------------------------------------------------------------
// Add reference to project's CLAUDE.md
// ---------------------------------------------------------------------------

const MARKER = "<!-- startup-advisor -->";
const claudeMdPath = join(targetDir, "CLAUDE.md");
const reference = `\n${MARKER}\nFor startup project context and conventions, see [startup/AGENTS.md](startup/AGENTS.md).\n`;

if (existsSync(claudeMdPath)) {
  const existing = readFileSync(claudeMdPath, "utf-8");
  if (!existing.includes(MARKER)) {
    appendFileSync(claudeMdPath, reference);
    console.log(`✓ Added startup/AGENTS.md reference to existing CLAUDE.md`);
  } else {
    console.log(`  CLAUDE.md already references startup/AGENTS.md`);
  }
} else {
  writeFileSync(claudeMdPath, reference.trimStart());
  console.log(`✓ Created CLAUDE.md with startup/AGENTS.md reference`);
}

// ---------------------------------------------------------------------------
// Done
// ---------------------------------------------------------------------------

console.log(`✓ startup/ initialized for "${args.name}"`);
console.log(`  ${root}/`);
console.log(`  ├── core.md`);
console.log(`  ├── plan.md`);
console.log(`  ├── AGENTS.md`);
console.log(`  ├── hypotheses/`);
console.log(`  ├── competitors/`);
console.log(`  └── research/`);
