# Initialization

This reference file guides the first-time project setup — collecting the founder's idea, scaffolding the `startup/` workspace, and running the idea elaboration conversation.

It is loaded by the `whats-next` skill when no `startup/` directory exists. It is **not** a skill and should not be invoked independently.

---

## Context

You have determined that `startup/core.md` does not exist — this is a new project.

## Goal

Set up the `startup/` workspace, capture the founder's idea, and guide them through idea elaboration so the core project definition is established.

---

## Conversational discipline

These rules apply throughout the tier 1 elaboration conversation.

**Ask exactly one question at a time. Always.**

Do not stack questions. Do not ask a question and then add a follow-up in the same message. Do not list "a few things to think about." One question. Wait. Then respond. This is not a stylistic preference — it's how the conversation stays focused and how the founder actually thinks, rather than pattern-matches to what they think you want to hear.

**Tone — channel excitement into precision, not away from it.**

This conversation can feel like an interrogation if you're not careful. The founder just shared their idea — they're excited. Your job is to channel that excitement into precision, not dampen it.

- **Frame precision as a superpower, not a chore.** "The sharper we get this, the easier everything downstream becomes — you'll know exactly who to target, what to research, and what to build first."
- **When pushing back on vague answers, explain the cost of vagueness.** Don't just say "that's too broad" — say why: "If we leave this vague, we'll struggle to find the right people to interview later, and competitor research will be unfocused."
- **Celebrate specificity when you see it.** "That's a really crisp description — I can already picture the person who'd use this."
- **Normalize iteration.** "None of this is set in stone — we can always sharpen it later as you learn more. Right now we're going for 'good enough to act on.'"

**Depth:** Have at least 2–3 meaningful exchanges per dimension before proposing definitions. The conversation itself helps the founder think. Rushing to fill fields produces shallow answers that mislead everything downstream.

---

## How to run the conversation

### Step 1 — Check for existing project

Read the workspace for a `startup/core.md` file.

- **If it exists:** tell the founder their project is already initialized. Read the project name from the `name` field in the frontmatter. Explain that if they want to explore a new idea, the easiest way is to create a new folder and start from there — this avoids mixing contexts.
- **If it doesn't exist:** proceed to Step 2.

### Step 2 — Ask how far along they are

Ask the founder:

> "Before we dive in — where are you with this idea?
> 1. It's in my head, I haven't done much yet
> 2. I've put something together — a landing page, pitch, or one-pager
> 3. I've done customer discovery or built something (interviews, a prototype, paying users)"

Use `AskUserQuestion` with these three options.

**If they pick option 1:** continue to the Tier 1 flow below.

**If they pick option 2 or 3:** load the materials-based onboarding workflow:

```
.claude/skills/whats-next/references/with-progress.md
```

Pass the tier (2 or 3) as context. The reference file's instructions take over from this point — do not continue with the Tier 1 steps below.

---

## Tier 1 flow — idea in their head

### Step 3 — Ask what they're building

Ask the founder:

> "Tell me about your idea — what are you building and who is it for?"

Wait for their response. Store as `seed_description`.

### Step 4 — Suggest a project name

Read the `seed_description` and generate 2–3 short, catchy working titles that capture the idea's essence (e.g., for "an app that helps dog walkers find clients" → "DogWalk", "WalkFinder", "PawConnect").

Present them as a structured question with an extra option to type their own:

> "Let's give your project a working name — you can always change it later."
>
> 1. **{suggestion_1}**
> 2. **{suggestion_2}**
> 3. **{suggestion_3}**
> 4. **Something else** — type your own

Use `AskUserQuestion` with these options. If they pick "Something else", ask them to type a name.

Store the result as `project_name`.

### Step 5 — Set up the workspace

Tell the founder what is about to happen — no need to wait for confirmation, just set the context before the terminal output appears:

> "I'll set up your project workspace now. This creates a `startup/` folder with your project definition (`core.md`), a roadmap file (`plan.md`), always-on context for me across sessions (`AGENTS.md`), and folders for competitors, hypotheses, and research."

**STOP — create the workspace files now. Do not ask any questions. Do not engage with the idea further. Create all files below, then continue to Step 6.**

**1. Create directories:**

```bash
mkdir -p startup/hypotheses startup/competitors startup/research
```

**2. Write `startup/core.md`** — substitute `<project_name>` and `<seed_description>` with the actual values:

```markdown
---
version: 1
name: <project_name>
---

# <project_name>

## Seed Description

<seed_description>

## Core
```

**3. Write `startup/plan.md`** — substitute both `<today>` placeholders with today's date in `YYYY-MM-DD` format:

```markdown
---
version: 1
last_assessed: <today>
---

# Plan

## Current Focus

Define your idea — who it's for, what problem it solves, and how.

## Steps

- [ ] **Define the idea and target audience**

## Log

### <today>

Project initialized. Starting with idea definition.
```

**4. Write `startup/AGENTS.md`** — copy the content below exactly as shown, character for character. Do not paraphrase, summarize, or modify any wording:

```
# Startup Advisor

This project uses the Startup Advisor workflow.

## Voice input

The founder may be using voice input. Voice transcription is unreliable with proper nouns — competitor names, product names, URLs, technical terms, and non-English words often come through garbled. When the input contains something that looks like a misheard name or an unintelligible fragment, ask the founder to clarify or spell it out rather than guessing.

## Project definition

The source of truth for the project definition is `startup/core.md`. It is a markdown file with:

- **YAML frontmatter** containing `version` (format version) and `name` (working project name)
- **`## Seed Description`** section with the founder's original description of what they're building
- **`## Core`** section with structured fields as `- **Key:** Value` list items (audience, problem, solution, geography, etc.) — these accumulate as the onboarding conversation progresses

Read `startup/core.md` at the start of any conversation that touches the startup idea, product, or strategy.

When updating `core.md`, read the current file first, modify the fields you need under `## Core` (using `- **Key:** Value` format), and write the file back. Leave the frontmatter and `## Seed Description` untouched. Propose changes to the founder and get confirmation before writing. Fields missing from `## Core` are not yet defined — don't push to fill everything at once.

## Plan

The project plan lives in `startup/plan.md`. It tracks the founder's current focus, next steps as a checklist, and a log of past assessments. The `whats-next` skill manages it — don't update it directly. When the founder asks about direction or next steps, invoke the `whats-next` skill which dispatches the lean-startup-advisor subagent for an independent assessment.

## Hypotheses

Hypotheses are testable assumptions about the project — things the founder believes but hasn't validated yet. Each hypothesis is a `.md` file in `startup/hypotheses/`.

Format: YAML frontmatter with `status` (untested/confirmed/invalidated), an H1 title (the testable statement), an Obsidian tag for type (#problem, #solution, #willingness_to_pay, #urgency, #other), a description, and an optional ## Notes section.

When the founder mentions a new assumption or risk in conversation, suggest capturing it as a hypothesis. Read the hypotheses folder before any conversation about validation, interviews, or pivots. To update a hypothesis, read the file first, propose the change, get confirmation, then write it back.

## Competitors

Competitors are tracked as individual `.md` files in `startup/competitors/`.

Format: YAML frontmatter with `type` (direct/indirect) and `url` (competitor's website), an H1 heading with the competitor name, and sections for Description, Core Features, and Notes.

When the founder mentions a competitor or asks about the competitive landscape, read the competitors folder for context. To add or update a competitor, follow the file conventions and get confirmation before writing.

## Web research

A `web-researcher` subagent is available for any research task that goes beyond a quick search — competitive landscape discovery, problem space validation, market signals, community discussion. Use it when the founder asks to research something or when research would meaningfully sharpen an assumption or decision.

Research summaries from web-researcher runs are saved to `startup/research/` as dated `.md` files. This preserves expensive research for future reference. The calling skill is responsible for writing the file after getting the agent's output.
```

**5. Update `CLAUDE.md`:**

Read `CLAUDE.md` first (it may already exist). If it already contains `<!-- startup-advisor -->`, skip this step. Otherwise, append these two lines:

```
<!-- startup-advisor -->
For startup project context and conventions, see [startup/AGENTS.md](startup/AGENTS.md).
```

If `CLAUDE.md` does not exist yet, create it with those two lines as the full content.

### Step 6 — Classify the idea and load the elaboration reference

Read the `seed_description` and classify the idea:

**Customer type:**

| Signal in description | Type |
|---|---|
| Companies, enterprises, teams, organizations, SaaS-for-business, B2B explicitly | `b2b` |
| Consumers, individuals, personal use, general public, B2C explicitly | `b2c` |
| Ambiguous, very short, or mixed signals | Ask the founder |

**If ambiguous on customer type**, ask using a structured question:

1. **Businesses** (B2B) — selling to companies, teams, or organizations
2. **Consumers** (B2C) — selling to individual people
3. **Not sure yet** — still figuring this out

**Load the appropriate reference file:**

| Customer type | Reference file |
|---|---|
| B2C or not sure | `.claude/skills/whats-next/references/b2c-painkiller.md` |
| B2B | `.claude/skills/whats-next/references/b2b-painkiller.md` |

Read the reference file and follow the instructions within it. Pass `seed_description` and `project_name` as context so the conversation doesn't start cold.

### Step 7 — Create the first plan

After idea elaboration is complete (core.md has been written with at least Audience/ICP and Problem), propose the first real plan. At this point you have all the context — you just ran the elaboration conversation and the artifact directories are empty. No need to dispatch the advisor subagent for this.

Read `startup/core.md` and `startup/plan.md`. Based on what you know about the idea, propose a short plan for the next milestone — typically 2–3 concrete steps. Apply lean startup thinking: what would most reduce the founder's risk right now? For most ideas that means some combination of understanding the competitive landscape and surfacing the key assumptions as testable hypotheses, but use your judgment — not every idea follows the same sequence.

Present the proposed plan to the founder conversationally, get confirmation, and update `startup/plan.md` with the Current Focus, Steps, and a Log entry explaining your reasoning.

The scaffold created a "Define your idea" step that is now complete — mark it `[x]` in the Steps list before adding the new steps.

---

## Completion criteria

- `startup/core.md` exists with `version` and `name` in frontmatter, a `## Seed Description` section, and at least **Audience** (or **ICP**) and **Problem** under `## Core`
- `startup/AGENTS.md` exists
- `startup/plan.md` exists with a substantive plan (not just the initial scaffold)
- `CLAUDE.md` references `startup/AGENTS.md`
