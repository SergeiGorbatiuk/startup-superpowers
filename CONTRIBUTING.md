# Contributing


## Project layout

The plugin source lives under [startup-superpowers/](startup-superpowers/). The founder-facing runtime state (`startup/`) is created inside the target project, not here.

```
startup-superpowers/
├── .claude-plugin/plugin.json   # Manifest + hook registrations
├── agents/                      # Bias-isolated subagents (web-researcher, advisor, ...)
├── hooks/                       # PreToolUse / PostToolUse hooks
└── skills/<skill-name>/
    ├── SKILL.md                 # Layer 1 entrypoint
    └── references/*.md          # Layer 2 workflows
```

See [CLAUDE.md](CLAUDE.md) for the full architectural overview.

## Knowledge layers — progressive disclosure

Skills are organized in three layers so context loads only when needed:

| Layer | Where | Loaded | Purpose |
|---|---|---|---|
| **0** | `skills/using-startup-superpowers/SKILL.md` | When any startup task is in scope (description match) | System overview, artifact formats, conventions, voice handling, subagent dispatch |
| **1** | `skills/<skill>/SKILL.md` | When skill description matches | How to work with an artifact type — file conventions, status management, routing |
| **2** | `skills/<skill>/references/*.md` | Explicitly read by Layer 1 | A single end-to-end workflow (e.g. first-time generation, post-interview analysis) |

**Rules of thumb:**
- Layer 0 describes **what** things are and loads via skill activation, not by injecting files into the target project.
- Layer 1 describes **how** to work with them — keep it under ~500 lines.
- Layer 2 describes **how to run a specific workflow** end-to-end. Reference files have no frontmatter and never auto-activate; the owning skill instructs the agent to read them.
- Use Layer 2 for one-shot flows (first-time setup, initial discovery) that shouldn't keep firing once the artifact exists.

## Adding a new skill

1. Create `startup-superpowers/skills/<your-skill>/SKILL.md` with YAML frontmatter (`name`, `description`). The description is what triggers activation — make it specific.
2. If the skill has a first-time workflow or a heavy branch, put it in `references/<workflow>.md` and have `SKILL.md` route to it conditionally.
3. Define the artifact format: where files live under `startup/`, what frontmatter they carry, what sections are required.
4. Add a hook to validate the artifact format (see below).
5. Document the skill, artifact, and hook in [CLAUDE.md](CLAUDE.md) under the same sections used by existing systems.

## Adding or modifying a subagent

Subagents (e.g. `web-researcher`, `interview-analyst`) live in `startup-superpowers/agents/`. Use them when:

- The work needs **bias isolation** from the main conversation (assessment, analysis).
- The work is **heavy** and would otherwise blow up the main context window (web research).

Subagents receive their tools via frontmatter. If a subagent needs to write under `startup/`, the auto-approval hook will handle permissions — no manual permission prompts.

## Why hooks exist

Hooks enforce a **predictable project structure**. The plugin is a collection of skills written and extended over time, and every skill assumes that artifacts created by other skills follow the documented conventions (frontmatter keys, required sections, slug rules). Without enforcement, drift is inevitable and downstream skills break in subtle ways.

There are two kinds of hooks, both registered inline in [startup-superpowers/.claude-plugin/plugin.json](startup-superpowers/.claude-plugin/plugin.json):

### PreToolUse hooks — permissions

- **Inline WebSearch/WebFetch allow** — subagents can't prompt interactively, so these tools are pre-approved for them.
- **[auto-approve-startup.mjs](startup-superpowers/hooks/auto-approve-startup.mjs)** — pre-approves `Read`/`Write`/`Edit` on paths inside `startup/`. Lets subagents (e.g. `interview-analyst`) write plugin-managed state without manual approval. Falls through silently for any other path.

### PostToolUse hooks — convention validation

One `validate-*.mjs` hook per artifact type. Each one:

1. Reads tool input from stdin as JSON.
2. Ignores files outside its concern (exit 0).
3. Checks frontmatter, headings, and required sections against the documented format.
4. Writes advisory messages to stderr **but always exits 0** — hooks nudge, they never block writes.

This means new skills can rely on `startup/competitors/*.md`, `startup/hypotheses/*.md`, etc. having a known shape, and a contributor adding a new artifact type can immediately get convention enforcement by dropping in a new `validate-<thing>.mjs` and registering it in `plugin.json`.

### Writing a new validation hook

- Plain Node ESM, no external dependencies.
- Read stdin → parse JSON → extract `tool_input.file_path`.
- If the path isn't yours, exit 0 silently.
- Check what you care about; write friendly nudges to stderr.
- Always exit 0.

Pattern-match an existing hook like [validate-hypotheses-md.mjs](startup-superpowers/hooks/validate-hypotheses-md.mjs) and adapt.

## Key conventions to preserve

These are hard rules across the codebase — please don't break them when contributing:

- **One question at a time** in any conversational flow.
- **Read before writing** — always read `core.md` (or any aggregate artifact) before editing, so you don't clobber unrelated sections.
- **Propose before writing** — show the founder what you're about to write and confirm.
- **Hooks nudge, never block** — convention violations produce advisory messages, not errors.
- **Skills stay under ~500 lines** — push detailed workflows into `references/`.
