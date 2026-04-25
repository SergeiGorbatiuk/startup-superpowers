---
name: competitors
description: Manages the founder's competitive landscape — discovering competitors, updating existing competitor files, adding new ones, and dispatching ad-hoc research. Use when the founder wants to explore competitors, do competitive research, update a competitor profile, or understand who else is solving their problem.
---

# Competitors

Manage the competitive landscape for the founder's project. This skill handles both working with existing competitor data and orchestrating new discovery when needed.

## Before you start

Read `startup/core.md` to load project context (name from frontmatter, seed description, and all fields under `## Core` — audience, problem, solution, ICP, geography, etc.). If this file does not exist, this usually means the project has not been started yet, and the idea has not yet benn properly discussed with the user.
Although this skill can technically be used without it, a well-thought description of what the user whant to build or discover is paramount for targeted and insightful research. Make the user know the project does not seem to be initilised and propose to do so via `/whats-next` (they can use this command, or you can refer to this skill yourself).

So, if the file does exist or user insists on going forward without, it, continue with the instructions that follow.

Check if `startup/competitors/` exists and contains any `.md` files.

Scaffold the folder if it doesn't exist yet:
```bash
mkdir -p startup/competitors
```

---

## When competitors already exist

Load and understand them for context. Infer intent from the conversation — don't mechanically ask "what do you want to do?" If the founder is:

- **Asking about a specific competitor** — load that file, discuss, help update it
- **Adding a new competitor** — help create a new file following the conventions below
- **Updating an existing competitor** — read the file, propose changes, get confirmation, write it back
- **Asking about the landscape broadly** — summarize what exists, grouped by type (direct/indirect), with key differentiators
- **Wanting deeper research on a specific competitor** — dispatch the `web-researcher` agent with a focused prompt about that competitor, update the file with findings, and save the full web-researcher output to `startup/research/{YYYY-MM-DD}-{competitor-slug}-research.md` with frontmatter `date`, `topic`, and `source_skill: competitors`
- **Archiving** — when a competitor is no longer relevant (e.g., after a pivot to a different market), set `status: archived` and add `archived_reason` to frontmatter with a one-line explanation. Archived competitors stay in place and can be restored by removing the status or setting it to `active`

When adding or updating competitor files, follow the file conventions:
- YAML frontmatter with `type` (`direct` or `indirect`), `url` (competitor's main website), and optionally `status` (`active` or `archived` — defaults to `active` when absent)
- H1 heading: the competitor's name
- `## Description` — what the company does and who it targets (2-3 sentences)
- `## Core Features` — bullet list of notable capabilities
- `## Notes` — comparison to the project, differentiation angles, founder comments

**Slug convention:** lowercase the name, replace spaces and non-alphanumeric characters with hyphens, collapse multiple hyphens. "Notion AI" -> `notion-ai`.

Read before writing, and if you need to make some updates and it might not be oobvious from the context, it's always better running them by the user.

---

## Research guidance

### Ad-hoc web search vs. dispatching web-researcher

Not every web question needs a subagent:

- **Inline `WebSearch` / `WebFetch` (you, the main agent):** single-fact lookups ("does Notion have a free tier?", "is ACME still operating?"), quick verification of a claim, one data point asked about in flow. Stays in conversation, no persistence needed.
- **Dispatch `web-researcher`:** multi-source passes that benefit from an isolated context (deep dive into a specific competitor's features and positioning, full landscape scan, cross-source verification of a competitive claim). Output is structured and gets saved to `startup/research/` for later reference.

Rough rule: one fact in flow → inline. Multi-source or results-should-persist → dispatch.

### Model choice when dispatching

When dispatching the `web-researcher` agent for competitor research, use a `fast` model unless the founder explicitly asks for a more thorough or higher-quality search. Competitor research is token-intensive due to web fetching, and a lighter model handles it well.

---

## When no competitors exist (or a large-scale competitor discovery or landscape reassessment needed)

If `startup/competitors/` is empty or the situation suggests that a profound research is needed, load the reference file:

```
.claude/skills/competitors/references/discovery.md
```

The reference file's instructions take over from this point.

---
