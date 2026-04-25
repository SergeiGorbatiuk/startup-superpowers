#!/usr/bin/env node
/**
 * validate-competitors-md.mjs — PostToolUse hook for `startup/competitors/*.md`.
 *
 * Fires after any Write/Edit tool call. If the affected file matches
 * `startup/competitors/*.md`, reads the file on disk and checks that
 * the markdown conventions are followed:
 *
 *   1. YAML frontmatter exists with `type` and `url`
 *   2. `type` is "direct" or "indirect"
 *   3. An H1 heading exists (the competitor's name)
 *
 * All checks are advisory — the hook always exits 0. Convention
 * violations are reported to stderr so Claude sees them as gentle
 * nudges, but nothing is ever blocked.
 *
 * No runtime dependencies. Plain Node ESM.
 */

import { readFileSync, existsSync } from "node:fs";

// ---------- entry point ----------------------------------------------------

let input;
try {
  input = JSON.parse(readFileSync(0, "utf-8"));
} catch {
  process.exit(0);
}

const toolInput = input.tool_input || {};
const filePath = toolInput.file_path;

if (
  !filePath ||
  !/(?:^|\/)startup\/competitors\/[^/]+\.md$/.test(filePath)
) {
  process.exit(0);
}

if (!existsSync(filePath)) {
  process.exit(0);
}

let content;
try {
  content = readFileSync(filePath, "utf-8");
} catch {
  process.exit(0);
}

const nudges = [];

// ---------- check frontmatter ----------------------------------------------

const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);

if (!fmMatch) {
  nudges.push(
    "This competitor file is missing YAML frontmatter. " +
      "Expected a frontmatter block with `type` (direct/indirect) and `url`."
  );
} else {
  const kvPairs = {};
  for (const line of fmMatch[1].split("\n")) {
    const m = line.match(/^(\w[\w-]*):\s*(.+)$/);
    if (m) kvPairs[m[1]] = m[2].trim();
  }

  if (!kvPairs.type) {
    nudges.push(
      "Frontmatter is missing `type`. Expected `type: direct` or `type: indirect`."
    );
  } else if (kvPairs.type !== "direct" && kvPairs.type !== "indirect") {
    nudges.push(
      `Frontmatter has type: "${kvPairs.type}". Expected "direct" or "indirect".`
    );
  }

  if (!kvPairs.url) {
    nudges.push(
      "Frontmatter is missing `url`. Adding the competitor's website URL helps with research."
    );
  }

  if (kvPairs.status && !["active", "archived"].includes(kvPairs.status)) {
    nudges.push(
      `Frontmatter has status: "${kvPairs.status}". Expected "active" or "archived" (or omit for active).`
    );
  }
}

// ---------- check H1 heading -----------------------------------------------

const h1Match = content.match(/^# .+$/m);

if (!h1Match) {
  nudges.push(
    "No H1 heading found. The competitor's name should appear as a `# Name` heading."
  );
}

// ---------- output nudges --------------------------------------------------

if (nudges.length > 0) {
  console.error(`Conventions check for ${filePath}:`);
  for (const n of nudges) console.error(`  - ${n}`);
}

process.exit(0);
