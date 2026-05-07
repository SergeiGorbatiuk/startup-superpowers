#!/usr/bin/env node
/**
 * auto-approve-startup.mjs — PreToolUse hook for files under `startup/`.
 *
 * Pre-approves Read/Write/Edit operations on any file within the project's
 * `startup/` directory, so that subagents (which cannot interactively prompt
 * for permission) can operate on plugin-managed state without manual approval.
 *
 * Emits `permissionDecision: "allow"` only for paths within `startup/`.
 * Falls through silently (exit 0, no output) for any other path.
 *
 * No runtime dependencies. Plain Node ESM.
 */

import { readFileSync } from "node:fs";

let input;
try {
  input = JSON.parse(readFileSync(0, "utf-8"));
} catch {
  process.exit(0);
}

const filePath = input.tool_input?.file_path;
if (!filePath) process.exit(0);

// Match paths within startup/ — handles both absolute and relative paths.
// Absolute: /Users/.../project/startup/core.md → matches /startup/
// Relative: startup/core.md → matches ^startup/
if (!/(?:^|\/)startup\//.test(filePath)) {
  process.exit(0);
}

console.log(
  JSON.stringify({
    hookSpecificOutput: {
      hookEventName: "PreToolUse",
      permissionDecision: "allow",
      permissionDecisionReason: "Plugin-managed file under startup/",
    },
  })
);

process.exit(0);
