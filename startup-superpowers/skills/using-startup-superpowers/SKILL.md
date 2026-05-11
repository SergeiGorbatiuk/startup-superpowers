---
name: using-startup-superpowers
description: Use at the start of any conversation about a startup idea, product validation, founder strategy, or work inside a `startup/` workspace. Establishes file conventions, voice-input handling, subagent dispatch rules, and how to update each artifact safely. Activate before invoking any other startup-superpowers skill.
---

# Using startup-superpowers

This skill carries the always-on context for the startup-superpowers plugin. When it activates, treat its contents as plugin-wide ground rules — file formats, voice-input handling, subagent dispatch — that apply across every other startup-superpowers skill. It is not a workflow to execute; it is the shared backdrop you operate against.

Load this before invoking `whats-next`, `competitors`, `hypotheses`, `interviews`, `market-research`, `surveys`, or `mvp`.

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
