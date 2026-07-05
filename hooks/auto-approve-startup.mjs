#!/usr/bin/env node
/**
 * auto-approve-startup.mjs — PreToolUse hook for files under `startup/`.
 *
 * Pre-approves file operations on any path within the project's `startup/`
 * directory, so subagents (which cannot interactively prompt for permission)
 * can operate on plugin-managed state without manual approval.
 *
 * Cross-harness: emits both Claude Code's `hookSpecificOutput.permissionDecision`
 * and Cursor's top-level `permission` field. Each harness reads what it
 * recognises and ignores the rest.
 *
 * Falls through silently (exit 0, no output) for any path outside `startup/`.
 *
 * No runtime dependencies. Plain Node ESM.
 */

import { readFileSync } from "node:fs";
import { affectedFilesFromHookInput } from "./lib/affected-files.mjs";

let input;
try {
  input = JSON.parse(readFileSync(0, "utf-8"));
} catch {
  process.exit(0);
}

const filePaths = affectedFilesFromHookInput(input);
if (filePaths.length === 0) process.exit(0);

// Match paths within startup/ — handles both absolute and relative paths.
// Absolute: /Users/.../project/startup/core.md → matches /startup/
// Relative: startup/core.md → matches ^startup/
if (!filePaths.every((filePath) => /(?:^|\/)startup\//.test(filePath))) {
  process.exit(0);
}

console.log(
  JSON.stringify({
    hookSpecificOutput: {
      hookEventName: "PreToolUse",
      permissionDecision: "allow",
      permissionDecisionReason: "Plugin-managed file under startup/",
    },
    permission: "allow",
  })
);

process.exit(0);
