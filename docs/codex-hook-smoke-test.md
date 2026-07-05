# Codex Hook Smoke Test

Use this prompt in a fresh Codex thread after installing or refreshing the
Startup Superpowers plugin locally. The goal is to verify that Codex discovers,
trusts, and runs the plugin's non-blocking hooks.

```text
Smoke-test the Startup Superpowers plugin hooks in this workspace.

Important constraints:
- Do not use Bash, shell redirection, Python, Node, or cat to create or edit the test file.
- Use Codex's normal file-edit tool so the hook matcher sees an apply_patch file edit.
- Do not fix the intentionally invalid file until after you report the hook result.

Steps:
1. Open /hooks or the Codex hook management UI.
2. Report whether Startup Superpowers plugin hooks are listed.
3. Report whether those hooks are trusted and enabled. If Codex asks for review/trust, complete that review before continuing.
4. Create or overwrite startup/core.md with exactly this invalid content:

# Hook Smoke Test

This file is intentionally invalid.

5. After the edit, observe whether any hook status or advisory message appears. Look especially for:
   - status text like "Checking startup/core.md conventions..."
   - advisory context beginning with "Conventions check for startup/core.md"
   - nudges about missing YAML frontmatter or missing `## Core`
6. Report the result in this exact shape:

Hook discovery: listed / not listed
Hook trust: trusted / not trusted / not visible
Edit tool used: apply_patch / other / unknown
Status message observed: yes / no, plus exact text if visible
Advisory context observed: yes / no, plus exact text if visible
Write was blocked: yes / no
Conclusion: pass / fail / inconclusive

If the result is fail or inconclusive, do not guess. Say which layer failed:
discovery, trust, matcher, command execution, or advisory display.
```

Expected passing result:

- Hooks are listed in `/hooks`.
- Hooks are trusted and enabled.
- The file write succeeds.
- At least one validator runs after the edit.
- Codex shows either the hook status message or advisory context. The strongest
  pass signal is advisory context mentioning `startup/core.md`, missing YAML
  frontmatter, and missing `## Core`.

Notes:

- The hooks are advisory and must not block the write.
- A Bash-created file is not a valid smoke test for these hooks because Codex
  file validators are matched on `apply_patch`, `Edit`, or `Write`.
- The web-search preapproval hook is Claude-compatible legacy behavior. Codex
  does not currently document `WebSearch` or `WebFetch` as hook matcher targets,
  so this smoke test focuses on file-edit validators.
