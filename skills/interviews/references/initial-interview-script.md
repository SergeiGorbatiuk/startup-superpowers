# Initial Interview Script

This reference file guides the first-time script-drafting conversation — helping the founder shape a customer discovery interview script tailored to their target segment, desired length, and their own facilitation experience.

It is loaded by the `interviews` skill when no scripts exist yet (or when the founder explicitly wants a guided draft). It is **not** a skill and should not be invoked independently.

---

## Context

You already have:
- `startup/core.md` — the project definition; `## Core` contains at least `Audience` (ideally also `Problem`)
- `startup/hypotheses/*.md` — one or more testable hypotheses (ideally ≥3; proceed even if fewer)
- An empty (or newly created) `startup/interview-scripts/` directory

## Goal

Produce **one well-scoped script** — written to a single `.md` file — that the founder can use for customer discovery interviews with their target segment. The script must be tailored to three inputs: segment, desired length, and the founder's interview experience.

The script is organized around **topics to explore**, not a fixed list of questions. Each topic is a learning theme tied to the hypotheses, risks, or decisions it probes, with a few example questions underneath as *starting points* — not a sequence to march through. This keeps interviews free-flowing rather than survey-like: the founder anchors on what they're trying to learn and improvises the exact wording in the moment. (Pre-planning exact questions is fragile to wording, delivery, and sequencing, and tends to produce rigid, low-truth conversations.)

---

## The single most important rule

**Ask exactly one question at a time. Always.**

Do not stack questions. Do not ask a question and then add a follow-up in the same message. Do not list "a few things to think about." One question. Wait. Then respond.

---

## How to run the conversation

### Opening

Acknowledge the project briefly from `core.md`. Frame in one sentence:

> "Let's draft an interview script you can use for customer discovery. I'll tailor it to your segment, how long you want the interviews to be, and how much facilitating experience you have."

Then go to Step 1.

### Step 1 — Confirm the target persona

Read the `Audience` field from `core.md` and reflect it back. Ask whether this script is for that segment or for a narrower / different one. If the founder wants a narrower slice (e.g. "actually, just solo designers in the US, not agencies"), capture that.

A single script should serve a single persona. If the founder describes two distinct personas in one breath, ask them which one to start with — mention that a second script can be drafted later.

### Step 2 — Agree on length

Ask how long they want the interviews to be. Length sizes the number of **topics** (each topic carries 2–4 starting questions). Offer four options with short trade-off notes:

- **15 min** — very tight, ~2 topics, easy to land with busy people, low depth
- **30 min** — the workhorse length, 3–4 topics, good for most discovery
- **45 min** — room for depth and follow-ups, 4–5 topics, harder to schedule
- **60 min** — only when the subject genuinely needs it, 5–6 topics, risks fatigue on both sides

Bias toward fewer, deeper topics. Going deep on the one topic that matters beats skimming all of them.

### Step 3 — Gauge experience

Ask whether they've run customer discovery interviews before. Three buckets:

- **never** — first time
- **a few** — done a handful, not fully comfortable yet
- **plenty** — done many, comfortable improvising

### Step 4 — Tailor and announce the plan

Before drafting, announce in one short message what the script will look like given their answers. Use this matrix:

Experience tunes how much scaffolding sits under each topic — not the topic structure itself.

- **never + 45 or 60 min** — flag that long interviews are hard to run well on a first try. Suggest dropping to 30 min. If they insist on longer, proceed — but give each topic the fuller treatment below and include extra facilitation prompts inline.
- **never + 15 or 30 min** — fewer topics (~2–3), 3–4 starting questions per topic, heavily scripted opening and closing, inline facilitation reminders (let them finish, resist filling silence, follow the thread).
- **a few + any length** — standard density (topic count per the length matrix), 2–3 starting questions per topic, opening and closing written out but short.
- **plenty + any length** — leaner script, 1–2 starting questions per topic, lighter scaffolding, trust the founder to improvise within each topic.

The founder can override the tailoring.

### Step 5 — Map hypotheses to topics

Load `startup/hypotheses/*.md`. Cluster related hypotheses into **topics** — a topic is the learning theme that a small group of hypotheses (or a standalone risk/decision) sits under. A topic usually probes one or more hypotheses; it does not have to be one-hypothesis-per-topic. Surface the mapping to the founder — e.g.:

> "I'll fold your 'designers track invoices in spreadsheets' and 'chasing clients feels awkward' hypotheses into one topic about how invoicing actually works for them today — they're really one conversation. Your willingness-to-pay hypothesis is better tested by observing what they already spend money on, so I'll make it a topic anchored on past spending behavior rather than asking about price directly."

Each topic will carry `[[hypothesis-slug]]` backlinks to the hypotheses it probes — that linkage is the "why it matters" for the topic and feeds the hypothesis evidence trail later. A topic can also be tied to a risk or decision with no matching hypothesis; in that case prose carries the "why" and backlinks may be absent.

Don't mechanically turn every hypothesis into a topic. Some hypotheses (e.g. pricing specifics) are better tested by experiments than interviews — say so, and leave them off the script.

If fewer than 3 hypotheses exist, work with what's there and flag that the script can be sharpened later once more hypotheses are defined.

### Step 6 — Draft section by section

Propose **Opening** first — show the exact text. Ask for feedback. Revise once if needed.

Then propose **Topics to Explore** — show each topic with its heading, its `**Why it matters:**` line (the `[[hypothesis-slug]]` backlinks plus a one-line "What we want to learn"), and its starting questions. Lead the section with the anti-rigidity blockquote (see the template in Step 8). Ask for feedback. Revise.

Then propose **Closing** — show the exact text. Ask for feedback. Revise.

One section at a time. One question at a time when gathering feedback.

### Step 7 — Reflect the whole script back

Show the full proposed script (all four sections stitched together) so the founder sees the whole picture. Ask for confirmation before writing.

### Step 8 — Write the file

Derive the slug from the title: lowercase, replace spaces and non-alphanumeric characters with hyphens, collapse multiples.

Write `startup/interview-scripts/{slug}.md` with this structure:

```markdown
---
status: draft
length_minutes: {15|30|45|60}
target_persona: {one-line segment descriptor}
---

# {Title — segment + focus}

## Target Persona

{2–4 sentences: who this script is for, their context, why they were chosen for this round.}

## Opening

{What the founder says at the start: purpose of the call, consent to record, the "not a sales call" framing, rapport-setting.}

## Topics to Explore

> These are topics, not a script. Let the conversation lead — go deep where it gets interesting, and don't force your way through every topic.

### 1. {Topic as a learning theme, not a question}
**Why it matters:** [[hypothesis-slug]], [[another-hypothesis-slug]]
What we want to learn: {one line of plain intent}

Starting questions (prompts, not a checklist):
- "{Open, past-behavior question}"
- "{Another starter}"
- {Optional inline facilitation reminder for less-experienced founders}

### 2. {Next topic}
**Why it matters:** [[hypothesis-slug]]
What we want to learn: {one line}

Starting questions:
- "{Starter}"
- "{Starter}"

## Closing

{Wrap-up: "anything I didn't ask that I should have?", referrals ask if appropriate, thank-you, next step if relevant.}

## Notes

{Optional — facilitation tips, reminders for the founder, things to avoid.}
```

Default `status: draft`. If the founder says the script is ready to use, write `status: ready` instead.

---

## Style guidelines for the starting questions

These govern the starting questions under each topic. They are examples to anchor the founder — the founder should expect to improvise the exact wording in the moment.

- **Open, not leading.** "Tell me about the last time..." beats "Don't you find it frustrating when...?"
- **Past behavior over hypothetical.** "Walk me through what you did last time" beats "would you pay for X?" — people are bad at predicting their own future behavior.
- **One idea per question.** If it has an "and" in it, split it.
- **Avoid pitching.** The script should not describe or hint at the solution. The goal is learning, not selling.
- **Short.** Long questions invite short answers.

---

## Completion criteria

- File written to `startup/interview-scripts/{slug}.md`
- Frontmatter includes `status`, `length_minutes`, `target_persona`
- H1 and all four required sections present: `## Target Persona`, `## Opening`, `## Topics to Explore`, `## Closing`
- `## Topics to Explore` leads with the anti-rigidity blockquote, and each topic has a heading, a `**Why it matters:**` line, and starting questions
- Founder has confirmed the final content

---

## What comes next

Briefly confirm the save: "Saved to `startup/interview-scripts/{slug}.md`."

Then mention natural next steps without pushing:

- **Schedule and run interviews** — find 5–10 people from the target segment to talk to
- **Draft a second script** — if they have a meaningfully different adjacent segment
- **Revisit after a few runs** — the first version is never the final; questions that don't land, or unexpectedly rich threads, inform the next revision

Let the founder decide where to go next.
