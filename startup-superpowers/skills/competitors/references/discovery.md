# Competitor Discovery

This reference file guides the competitor discovery process — building a research brief, dispatching web-researcher agents, reviewing results with the founder, and writing competitor files.

It is loaded by the `competitors` skill when a full discovery or landscape reassessment is needed. It is **not** a skill and should not be invoked independently.

---

## Context

You already have:
- `startup/core.md` — the project definition with seed description and whatever `## Core` fields are populated
- `startup/competitors/` — may be empty (first-time discovery) or already contain competitor files (reassessment)

## Goal

Discover or refresh the competitive landscape through structured web research and save findings as individual competitor files.

---

## First-time vs. reassessment

**If no competitors exist yet:** proceed to "Why this matters" below and deliver the framing before diving in.

**If competitors already exist:** skip the framing. Instead, briefly orient the founder:
- Note what's already saved (N direct, N indirect) and name them
- Frame this as looking for what's missing, what's changed, or what's emerged since the last look
- Carry the existing competitor list into the scout brief so the agent doesn't resurface what's already known

Then proceed directly to Step 1.

---

## Why this matters — framing for the founder

*(First-time discovery only — skip if competitors already exist)*

Before diving into questions, briefly frame why competitor discovery is a good thing:

- **Competitors are validation.** If other people are building solutions for this problem, it confirms the problem is real and worth solving. An empty competitive landscape is often a warning sign, not an opportunity.
- **Understanding alternatives sharpens your pitch.** Once you know what's out there, you can articulate exactly why your approach is different — to customers, investors, and yourself.
- **The best startups aren't in empty markets.** They're in markets where existing solutions leave gaps. Finding those gaps is what this exercise is about.

Don't be apologetic about finding competitors — present it as useful intelligence. "Good news: there's clearly a market here. Let's see what's out there and figure out where you fit."

---

## The single most important rule

**Ask exactly one question at a time. Always.**

Do not stack questions. Do not ask a question and then add a follow-up in the same message. Do not list "a few things to think about." One question. Wait. Then respond.

---

## How to run the conversation

Discovery happens in two phases: a lightweight scout to make sure we're looking in the right direction, then an optional deeper dive. This prevents wasting tokens on a broad search that turns out to be off-target.

### Step 1 — Build the research brief (one question at a time)

Establish three things before dispatching any research. Ask them sequentially — one at a time, wait for the answer before asking the next.

**Question 1:** Known competitors
> "Are there any competitors you're already aware of? Names, URLs, or even vague references — anything helps."

If they have none, that's fine. Note it.

**Question 2:** Focus areas
> "Are there specific aspects you want us to focus on — certain pricing models, integrations, target market segments, or features? Or should we keep the search broad for now?"

**Question 3:** Hard exclusions
> "Anything we should definitely exclude — certain company types, geographies, price points, or categories that aren't relevant?"

Once you have all three answers, confirm the brief back in a single compact summary:

> "Got it. I'll do a quick scout first — find the top 2–3 direct and 2–3 indirect competitors so we can make sure we're looking in the right direction. Then we can go deeper if needed."

---

### Step 2 — Phase 1: Scout (lightweight)

Dispatch **a single** Task call to the `web-researcher` agent. Use a `fast` model to keep this lightweight.

**Scout agent prompt:**

```
You are doing a QUICK SCOUT of the competitive landscape for the following project.

## Project context
Name: {name}
Description: {seed_description}
{core fields from ## Core: audience/ICP, problem, solution, geography — include whatever is filled in core.md}

## Research task
Find the TOP 2–3 DIRECT competitors and TOP 2–3 INDIRECT competitors. Focus on the most prominent, well-known players — this is a quick landscape scan, not an exhaustive search.

- Direct: products solving the same core problem for the same audience
- Indirect: adjacent tools, different-approach-same-outcome products, or partial substitutes

## Research brief
- Known competitors to include/expand on: {list or "none provided"}
- Already documented (do not resurface): {list existing competitor names, or "none"}
- Focus areas: {focus areas or "broad"}
- Hard exclusions: {exclusions or "none"}

IMPORTANT: Keep this focused. Return at most 3 direct + 3 indirect competitors. Stick to Tier 1 and Tier 2 sources — skip community/industry deep dives for now. Return a structured list following your output format.
```

---

### Step 3 — Save scout research and review with the founder

Save the raw web-researcher output to `startup/research/{YYYY-MM-DD}-competitive-landscape-scout.md` before presenting to the founder:

```markdown
---
date: {today}
topic: Competitive landscape scout — {project name}
source_skill: competitors
---

# Research: Competitive landscape scout — {project name}

{Full web-researcher output}
```

Then present the scout results as a compact summary:

> **Direct competitors (N):** [Name 1], [Name 2], ...
> **Indirect competitors (N):** [Name 1], [Name 2], ...

Walk through each briefly — one sentence on what they do.

Then ask:

> "Does this look like the right landscape? Any of these off-base, or any obvious gaps — companies you expected to see?"

If the founder flags issues, adjust the brief and re-scout. The goal is to confirm we're searching in the right direction before investing in a deeper pass.

---

### Step 4 — Phase 2: Expand (optional)

Once the founder confirms the scout is on track, **save the scout results first** (follow the file-writing format in Step 6 below). Then offer to expand:

> "I've saved those {N} competitors. Want me to do a deeper search for up to 5 more? This takes a bit more time and tokens — or we can stop here and come back to it later."

If the founder wants to expand, dispatch **one** Task call to the `web-researcher` agent:

```
You are EXPANDING a competitive landscape scan for the following project.

## Project context
Name: {name}
Description: {seed_description}
{core fields from ## Core: audience/ICP, problem, solution, geography — include whatever is filled in core.md}

## Already discovered
{list all competitors already saved — names and types, including any that existed before this session}

## Research task
Find UP TO 5 additional competitors (mix of direct and indirect) that were NOT already discovered. Go deeper: check community sources (Reddit, Hacker News), niche directories, and industry publications. Look for smaller or newer entrants that a quick search might miss.

## Research brief
- Focus areas: {focus areas or "broad"}
- Hard exclusions: {exclusions or "none"}

IMPORTANT: Do NOT repeat competitors already listed above. Return at most 5 new findings. Return a structured list following your output format.
```

### Step 5 — Save expansion research and review results

Save the raw expansion findings to `startup/research/{YYYY-MM-DD}-competitive-landscape-expansion.md`:

```markdown
---
date: {today}
topic: Competitive landscape expansion — {project name}
source_skill: competitors
---

# Research: Competitive landscape expansion — {project name}

{Full web-researcher output}
```

Then present the new findings the same way as the scout. Ask the founder to confirm which to keep. If they flag more gaps, dispatch targeted follow-ups — but default to wrapping up. The goal is a useful landscape, not an exhaustive one.

---

### Step 6 — Write the files

For each kept competitor:

1. **Derive the slug:** lowercase the name, replace spaces and non-alphanumeric characters with hyphens, collapse multiple hyphens. Examples: "Notion AI" -> `notion-ai`, "G2.com" -> `g2-com`.

2. **Write `startup/competitors/{slug}.md`** with this structure:

```markdown
---
type: direct
url: https://example.com
---

# {Name}

## Description

{What the company does and who it targets — 2-3 sentences.}

## Core Features

- {Feature 1}
- {Feature 2}
- {Feature 3}

## Notes

{How they compare to the project: overlaps, gaps, differentiation angle. Include founder comments if any were made during review.}
```

Use `type: direct` or `type: indirect` in the frontmatter. The `url` is the competitor's main website.

---

## Completion criteria

- Competitor files written to `startup/competitors/`
- The founder has reviewed and confirmed the set

---

## What comes next

Briefly confirm how many competitors were saved and what type (e.g., "Saved 4 competitors — 2 direct, 2 indirect.").

Give the founder a sense of progress and connect this work forward:
- Now they have a map of the landscape — they can speak clearly about how their approach differs when talking to potential customers or investors
- Competitor awareness strengthens interview conversations: the founder can probe whether people have tried these alternatives and what was missing

Then mention natural next steps without pushing:
- **Competitive positioning** — how the project differentiates from what was found
- **Hypothesis exploration** — if not done yet
