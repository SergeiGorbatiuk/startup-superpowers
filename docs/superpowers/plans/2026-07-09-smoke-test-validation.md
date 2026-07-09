# Fake-Door & Paid-Traffic Validation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extend the `mvp` skill with two independent, contextually-selected validation techniques — fake-door and paid-traffic — exposed as agent *knowledge* (not workflows), plus lightweight "inventory awareness" so the agent surfaces them proactively.

**Architecture:** Two new Layer 2 reference files under `skills/mvp/references/` carry the knowledge; the `mvp` SKILL.md routes to them; `initial-mvp-design.md` gains fake-door as a recognized form; and three awareness touchpoints (`hypotheses-manager.md`, `whats-next/SKILL.md`, `using-startup-superpowers/SKILL.md`) let the agent notice and suggest these. Results reuse the existing `startup/mvp-plan.md` artifact — no new file type, no hook changes.

**Tech Stack:** Plain Markdown skill/agent/reference files (Claude Code plugin). No code, no automated test harness — validation is by inspection + convention-conformance.

## Global Constraints

- **No hardcoded benchmark numbers** — CTR/CPC/conversion figures are researched live via `web-researcher`, never stated as rules or quoted from memory.
- **No hardcoded tech/channel** — tools and ad channels appear only as labelled *illustrations*; the agent reasons from the product; explicit caution against over-constraining the founder toward a familiar default.
- **Knowledge, not a wizard** — no forced multi-step flows; references are read-then-reason, in the MVP skill's existing "reach for what fits, this is contextual, probably unique each time" voice.
- **Reference files are Layer 2** — plain markdown, no YAML frontmatter, under 500 lines, never auto-activate; loaded only when the owning skill points to them.
- **State reuses `startup/mvp-plan.md`** — no new artifact type; existing `validate-mvp-plan-md.mjs` hook is unaffected.
- **hypotheses-manager contract preserved** — it recommends only; never writes files; never talks to the founder.
- **Fake-door ethics** — graceful "coming soon" reveal; never take money for a nonexistent product without disclosure.

---

### Task 1: Create `references/fake-door.md`

**Files:**
- Create: `skills/mvp/references/fake-door.md`

**Interfaces:**
- Consumes: nothing (leaf knowledge file).
- Produces: a Layer 2 reference the `mvp` SKILL.md (Task 4) and `initial-mvp-design.md` (Task 3) route to by path `references/fake-door.md`.

- [ ] **Step 1: Write the file**

Create `skills/mvp/references/fake-door.md` with exactly this content:

```markdown
# Fake Door

This reference is *knowledge*, not a workflow. The `mvp` skill loads it when a fake door is a live option — the founder is choosing an MVP form, proposes one, or you spot a fit. There are no steps to march the founder through. Read it, then reason.

A fake door is a button, tier, feature, or link that isn't built — placed in front of real people to measure interest by counting who acts on it. The click is the signal: behavior, not stated opinion. "Would you use this?" is an opinion; clicking "Start free trial" for a thing that doesn't exist yet is behavior.

## The bar is higher than it used to be

The old case for a fake door was "faking it is cheaper than building it." That case has largely collapsed. Building a thin real slice — a working form, auth, a basic flow — is now an afternoon, not a month. So a fake door has to earn its place. Reach for it only when at least one of these holds:

- **The real thing is genuinely expensive, complex, risky, or slow to build** — real inventory, deep third-party integrations, regulated or payment-critical flows, ML that needs data you don't have yet, hardware.
- **You want signal *before* committing even the cheap build** — the goal is to decide *whether* to build at all, and a day saved across several dead ideas compounds.
- **The build would outrun the learning** — you'd spend the time polishing instead of finding out whether anyone cares.

When none of these hold, the honest advice is usually: *the fake door and the thin real slice cost about the same now — build the real one, you'll learn more and you won't have to throw it away.* Say that plainly. It is consistent with the MVP skill's standing view that building is cheap and audience is the scarce thing — a fake door no qualified person sees validates nothing, same as any other MVP.

## Keep it honest

A fake door shows people something that isn't there. Do it without burning trust:

- **Reveal gracefully.** The click leads to an honest "coming soon / early access / we're gauging interest" page — never a dead end, never a lie that costs the visitor something.
- **Never take money for something that doesn't exist without disclosure.** A pre-order or a priced waitlist is fine *if the founder is upfront*; a fake checkout that silently charges is not.
- **Don't waste the visitor.** If they gave you a click or an email, close the loop — tell them what happens next, offer to notify them.

## What it measures, and how to read it

The metric is the action on the fake door — click-through, or click-then-email. Instrument it with the same analytics the `scaffold-and-deploy.md` reference already wires: a tracked click event on the fake-door element, plus the reveal page. Nothing new to install.

Reading the result is contextual, and the comparison point must be *researched live, not assumed*. What counts as a strong click-through depends on the traffic source, the audience's temperature, and the ask. Never quote a fixed "good" rate from memory; when a benchmark matters, dispatch `web-researcher` to actualize it for this product, industry, and geography, and save the summary to `startup/research/`.

Hold the discipline the MVP skill uses elsewhere: a weak result from the *wrong* audience or *too short* a run is **inconclusive**, not negative. "Nobody clicked" only kills the assumption when the right people saw it in enough numbers.

## Where it fits the hypotheses

A fake door is most often the right behavioral move for `#solution` (does this specific thing land?), `#willingness_to_pay` (a priced gate is a fake door with a number on it), and sometimes `#urgency`. When the founder acts on one, record it as an MVP experiment in `startup/mvp-plan.md` — the `## Hypotheses Being Tested` backlinks and `## Experiments Log` carry the result into the same evidence trail as interviews and surveys. No separate artifact.

## Building and shipping it

A fake door is a lighter landing-page form. If the founder decides to ship one, it flows through the normal MVP path: it is a form in `initial-mvp-design.md`, and `scaffold-and-deploy.md` builds and instruments it. Pair it with `paid-traffic.md` when the founder can't reach enough of the right people by hand — but that is a separate decision, not a requirement.
```

- [ ] **Step 2: Verify structure and constraints**

Run: `wc -l skills/mvp/references/fake-door.md && grep -n "web-researcher" skills/mvp/references/fake-door.md && grep -nc "^## " skills/mvp/references/fake-door.md`
Expected: line count well under 500; at least one `web-researcher` reference (proves live-research instruction present); 4–6 `##` sections. Then read the file top-to-bottom and confirm: no YAML frontmatter, no fixed benchmark percentages stated as rules, voice matches `initial-mvp-design.md`.

- [ ] **Step 3: Commit**

```bash
git add skills/mvp/references/fake-door.md
git commit -m "Add fake-door validation knowledge reference to mvp skill"
```

---

### Task 2: Create `references/paid-traffic.md`

**Files:**
- Create: `skills/mvp/references/paid-traffic.md`

**Interfaces:**
- Consumes: nothing (leaf knowledge file); references the `web-researcher` role brief and `startup/mvp-plan.md` conventions, both already established.
- Produces: a Layer 2 reference the `mvp` SKILL.md (Task 4) routes to by path `references/paid-traffic.md`.

- [ ] **Step 1: Write the file**

Create `skills/mvp/references/paid-traffic.md` with exactly this content:

```markdown
# Paid Traffic

This reference is *knowledge*, not a workflow. The `mvp` skill loads it when buying a little cold traffic is a live option — reach is the bottleneck on an experiment, or you spot that a founder waiting on slow manual distribution could get honest signal faster. There are no fixed steps. Read it, then reason from the founder's actual product and situation.

## What it is, and when it earns its place

Paid traffic is a *distribution mechanism*: paying to put an experiment in front of a small, honest slice of cold audience the founder can't reach by hand. It is orthogonal to what's on the page — it works the same whether the page is a fake door or a fully real product.

The MVP skill's standing view is that building is cheap and *audience is the scarce thing*. Paid traffic is one answer to "who will see this, and how" — the question that now matters more than "what will we build." It earns its place when manual, founder-driven reach (DMs, communities, a personal network) can't produce enough of the right eyeballs in reasonable time. It is not a first resort: if the founder can reach 30 of the exact right people directly, that is better signal, and free.

## The channel is a contextual choice — do not default

There is no right platform. The fit depends entirely on the product, the audience, and what's being tested. Reason it out per case; treat the following only as *illustrations of how to think*, never as a menu to pick from reflexively:

- **Search** captures people already looking for the problem — strong for existing, nameable pain.
- **Paid social** (Meta, TikTok, and others) interrupts people who weren't looking — strong for visual, impulse, or demonstrable products, and for surfacing demand people can't yet name.
- **Communities and niche platforms** (Reddit and the like) reach tight interest groups — strong when the audience clusters somewhere specific.

Be actively cautious not to over-constrain the founder toward whatever is most familiar. For many products paid social or a niche community will beat search; for others the reverse. When you are unsure, say so and reason it through with the founder rather than asserting a default.

## Small budgets, split to learn

The point of a small spend (the founder sets the number — often a modest lump sum) is not to acquire customers; it is to *learn which audience responds*. Split the budget into a few small, parallel micro-experiments across the segments or categories that look promising, so the result tells you *who* converted, not just *whether* someone did. One undifferentiated spend teaches much less than three small labelled ones.

## Benchmarks are researched live, never remembered

What counts as a healthy click-through, cost-per-click, or conversion drifts constantly and varies enormously by industry, geography, platform, and offer. **Do not quote figures from memory or bake them into advice.** When the founder needs a bar to judge against — before the campaign to set expectations, or after to interpret — dispatch `web-researcher` to actualize current norms for *this* product, industry, and region, and save the summary to `startup/research/` per the usual convention. Present researched numbers as current and approximate, not as laws.

## The automation ceiling is real and asymmetric

Be honest with the founder about what an agent can and can't do here — and note that it is contextual and changes over time:

- **Automatable by the agent:** the campaign *design* — segments, budget split, targeting logic, ad copy and headlines drawn from `core.md` and the hypotheses.
- **Always the founder's manual steps:** creating the ad account, connecting billing/payment, and passing identity or business verification. These are platform-gated; a first-timer must do them. Provide a clear checklist and expect to hand off here.
- **Automatable where a platform exposes it:** the *read-out* — pulling performance metrics back via an API or MCP, when one exists for the chosen platform. Access varies: some platforms' official tools are read-only (they report metrics but cannot create or change campaigns), some need setup, some offer nothing. Check the specific platform rather than assuming.

Do not promise hands-off campaign creation. The reliable division of labor is: agent designs and (where possible) reads results; founder owns the account, the money, and the "go live" click.

## Reading the result

Judge each segment's conversion against the *live-researched* benchmark, not a remembered one. Apply the same inconclusive-vs-negative discipline the MVP skill uses elsewhere: a flat result can mean "no demand" *or* "wrong audience / wrong creative / ran too short / too little traffic to be significant." Separate those before concluding anything about the hypothesis. A tiny sample is a reason to withhold judgment, not to declare failure.

## Where it fits

Record a paid-traffic run as part of the MVP experiment in `startup/mvp-plan.md`: note the channel, segments, and spend in `## Distribution Plan`, and log what each segment taught in `## Experiments Log`, with `## Hypotheses Being Tested` backlinks so the signal joins the same evidence trail as interviews and surveys. Paid traffic pairs naturally with a fake door (`fake-door.md`) but stands on its own behind any deployable experiment.
```

- [ ] **Step 2: Verify structure and constraints**

Run: `wc -l skills/mvp/references/paid-traffic.md && grep -n "web-researcher" skills/mvp/references/paid-traffic.md && grep -ni "read-only" skills/mvp/references/paid-traffic.md`
Expected: line count well under 500; `web-researcher` present (live-benchmark instruction); `read-only` present (honest automation-ceiling note). Then read top-to-bottom and confirm: no YAML frontmatter, no specific CPC/CTR/conversion numbers stated as rules, channels framed as illustrations not defaults.

- [ ] **Step 3: Commit**

```bash
git add skills/mvp/references/paid-traffic.md
git commit -m "Add paid-traffic validation knowledge reference to mvp skill"
```

---

### Task 3: Add fake-door to the MVP form inventory

**Files:**
- Modify: `skills/mvp/references/initial-mvp-design.md` (the "## Five MVP forms" table, currently lines ~48-57)

**Interfaces:**
- Consumes: `references/fake-door.md` (Task 1) — links to it by path.
- Produces: fake-door recognized as a selectable MVP form during the design conversation.

- [ ] **Step 1: Read the file to confirm the anchor**

Run: `grep -n "Five MVP forms" skills/mvp/references/initial-mvp-design.md`
Expected: matches the heading line; read the surrounding table (through the "Simple web app" row) to confirm exact text before editing.

- [ ] **Step 2: Replace the heading and table**

Replace this exact block:

```markdown
## Five MVP forms

| Form | Best for | Deployable? |
|---|---|---|
| Landing page | Validating interest, messaging, willingness to sign up | Yes |
| Wizard of Oz | Validating the outcome without building the mechanism | No |
| Concierge MVP | Validating the full experience manually for a few people | No |
| Clickable demo | Validating UX flow without a real backend | Yes |
| Simple web app | When value can only be demonstrated with working software | Yes |
```

with:

```markdown
## MVP forms

| Form | Best for | Deployable? |
|---|---|---|
| Landing page | Validating interest, messaging, willingness to sign up | Yes |
| Fake door | Testing interest in a feature/tier that isn't built — the click is the signal | Yes |
| Wizard of Oz | Validating the outcome without building the mechanism | No |
| Concierge MVP | Validating the full experience manually for a few people | No |
| Clickable demo | Validating UX flow without a real backend | Yes |
| Simple web app | When value can only be demonstrated with working software | Yes |

A **fake door** is a lighter landing-page variant, but its bar is higher than it used to be: now that building a thin real slice is cheap, a fake door only earns its place when the real thing is genuinely expensive/complex/risky/slow to build, or when you want signal before committing even that cheap build. When it's a live option, load `references/fake-door.md` for the judgment and the honest-reveal rules before proposing it.
```

- [ ] **Step 3: Verify**

Run: `grep -n "Fake door" skills/mvp/references/initial-mvp-design.md && grep -n "references/fake-door.md" skills/mvp/references/initial-mvp-design.md`
Expected: both match. Confirm the table still renders (6 form rows) and no other reference to "Five MVP forms" remains: `grep -rn "Five MVP forms" skills/` should return nothing.

- [ ] **Step 4: Commit**

```bash
git add skills/mvp/references/initial-mvp-design.md
git commit -m "Add fake-door to the MVP form inventory with raised-bar judgment"
```

---

### Task 4: Route the `mvp` skill to the two references

**Files:**
- Modify: `skills/mvp/SKILL.md` (frontmatter `description`, line 3; and body — add a knowledge section after the "## When `startup/mvp-plan.md` exists" block, before "## After saving")

**Interfaces:**
- Consumes: `references/fake-door.md` (Task 1), `references/paid-traffic.md` (Task 2).
- Produces: activation on distribution/behavioral-signal intents + explicit routing to load the two references.

- [ ] **Step 1: Extend the description**

Replace this exact frontmatter line:

```
description: Guides the founder through designing and optionally building the simplest MVP or prototype that validates their current hypotheses. Use when the founder wants to build something to test assumptions, discusses what to build next, wants to interpret results from a live MVP, or is deciding whether the current approach is still right. Also use when a founder proposes something to build — the skill will check whether the proposed form is the simplest thing that generates honest signal.
```

with:

```
description: Guides the founder through designing and optionally building the simplest MVP or prototype that validates their current hypotheses. Use when the founder wants to build something to test assumptions, discusses what to build next, wants to interpret results from a live MVP, or is deciding whether the current approach is still right. Also use when a founder proposes something to build — the skill will check whether the proposed form is the simplest thing that generates honest signal. Also use when the founder wants cheap behavioral demand signal — a fake door (a not-yet-built feature or tier that logs real intent) or a small paid-traffic experiment to reach people they cannot reach by hand.
```

- [ ] **Step 2: Add the knowledge-routing section**

Find this exact line (end of the pre-existing section, currently line ~66):

```
**If the founder wants to archive:**
Archiving marks this MVP track as closed — the plan remains for reference but is no longer the active experiment. Read the file. Set `status: archived`, `last_updated: today`. Add a final log entry summarising the experiment outcome. Propose changes, get confirmation, write back.

---
```

Immediately after that `---`, insert this new section:

```markdown
## Fake-door and paid-traffic knowledge

Two validation techniques are available as knowledge the skill draws on when the situation fits — not workflows to run through. They are contextual and often unique per case. They compose (the classic smoke test is a fake door plus paid traffic) but neither implies the other — use both, one, or neither.

- **Fake door** — a not-yet-built feature, tier, or button that logs real intent; a lighter landing-page form. Load `references/fake-door.md` when a fake door is a live option (the founder is choosing or proposing a form, or you spot a fit). It carries the judgment for when a fake door still earns its place now that building is cheap, plus the honest-reveal rules.
- **Paid traffic** — buying a small slice of cold audience when the founder can't reach enough of the right people by hand. Load `references/paid-traffic.md` when reach is the bottleneck on an experiment. It applies to any deployable form, fake-doored or real, and covers contextual channel choice, small-budget segment-splitting, live benchmark research, and the honest automation ceiling.

Either technique's results are recorded in the existing `startup/mvp-plan.md` (`## Hypotheses Being Tested` backlinks, `## Distribution Plan`, `## Experiments Log`) — no separate artifact.

---
```

- [ ] **Step 3: Verify**

Run: `grep -n "references/fake-door.md" skills/mvp/SKILL.md && grep -n "references/paid-traffic.md" skills/mvp/SKILL.md && grep -n "behavioral demand signal" skills/mvp/SKILL.md`
Expected: all three match. Confirm the new section sits between the archive block and "## After saving `startup/mvp-plan.md`".

- [ ] **Step 4: Commit**

```bash
git add skills/mvp/SKILL.md
git commit -m "Route mvp skill to fake-door and paid-traffic knowledge references"
```

---

### Task 5: Make `hypotheses-manager` aware of behavioral tests as next actions

**Files:**
- Modify: `agents/hypotheses-manager.md` (the "How to write the next action" section — insert after the tag-aware bullet list, currently ending at line ~112)

**Interfaces:**
- Consumes: nothing new; extends existing next-action guidance.
- Produces: next-action recommendations that can propose a fake-door or small paid-traffic test, especially while interviews are in flight. Contract unchanged — still recommends only, never writes files, never talks to the founder.

- [ ] **Step 1: Confirm the anchor**

Run: `grep -n "choose the smallest observable move that fits the assumption" agents/hypotheses-manager.md`
Expected: matches the `#other` bullet line. This is the insertion point (insert immediately after it).

- [ ] **Step 2: Insert the awareness paragraph**

Find this exact line:

```
- `#other` → choose the smallest observable move that fits the assumption
```

Insert immediately after it (before the "**Zero-evidence hypotheses...**" paragraph):

```markdown

**Behavioral tests count as putting something in front of a human — and they parallelize.** A fake door (a not-yet-built feature or tier that logs real intent) or a small paid-traffic test is a legitimate next action, not a second-class one — most often for `#solution`, `#willingness_to_pay`, and `#urgency`. When interviews are underway (they take time), a cheap behavioral test can run in parallel to produce independent signal sooner; surface that as the next action when a hypothesis is a good fit — e.g. "while your interviews run, put a priced waitlist in front of {segment} and watch whether anyone commits." Keep it the *smallest* such move. You only name the action; the founder-facing depth on when each earns its place lives in the `mvp` skill.
```

- [ ] **Step 3: Verify**

Run: `grep -n "parallelize" agents/hypotheses-manager.md && grep -n "You return it as text" agents/hypotheses-manager.md`
Expected: the new paragraph matches; the existing "advisory output only" guarantee ("You return it as text") still present below it — confirming the no-write contract is intact.

- [ ] **Step 4: Commit**

```bash
git add agents/hypotheses-manager.md
git commit -m "Teach hypotheses-manager to suggest behavioral tests as next actions"
```

---

### Task 6: Surface the opportunity in `whats-next` quick orientation

**Files:**
- Modify: `skills/whats-next/SKILL.md` (the "### Quick orientation (default)" section — insert after the "Phrase it as both" paragraph, currently line ~45)

**Interfaces:**
- Consumes: nothing new; relies on hypothesis `## Next Action` sections already read in quick orientation.
- Produces: an offer (not a forced move) of a cheap parallel behavioral test when state fits. Does not restructure the plan or dispatch a subagent.

- [ ] **Step 1: Confirm the anchor**

Run: `grep -n "Offer to jump into whatever the current focus or the next action points to." skills/whats-next/SKILL.md`
Expected: matches the end of the "Phrase it as both" paragraph.

- [ ] **Step 2: Insert the offer paragraph**

Find this exact line:

```
Phrase it as both, e.g.: *"Strategically you're on {Current Focus}. The sharpest concrete move right now is {next action from hypothesis X}."* If the user completed something since last time, check it off in `plan.md`. Offer to jump into whatever the current focus or the next action points to.
```

Insert immediately after it (as a new paragraph):

```markdown

If the sharpest move is stalled on slow feedback — interviews scheduled but not yet done, and a `#solution`, `#willingness_to_pay`, or `#urgency` hypothesis is waiting on them — consider surfacing a cheap parallel behavioral test (a fake door or a small paid-traffic run) as the concrete move, and point the founder at the `mvp` skill to shape it. Offer it; never force it. This is a conversational nudge, not a plan change.
```

- [ ] **Step 3: Verify**

Run: `grep -n "cheap parallel behavioral test" skills/whats-next/SKILL.md`
Expected: matches. Confirm the surrounding "Quick orientation does not restructure the plan" rule (later in the section) still stands unmodified — the new text is an offer, consistent with it.

- [ ] **Step 4: Commit**

```bash
git add skills/whats-next/SKILL.md
git commit -m "Surface parallel behavioral-test opportunity in whats-next orientation"
```

---

### Task 7: Add Layer 0 inventory awareness

**Files:**
- Modify: `skills/using-startup-superpowers/SKILL.md` (insert a new short subsection after the "## Hypotheses" section, currently ending at line ~38, before "## Competitors")

**Interfaces:**
- Consumes: nothing; points to the `mvp` skill for depth.
- Produces: always-on awareness so the agent can suggest these techniques even when the `mvp` skill isn't loaded (e.g. mid-interview-phase).

- [ ] **Step 1: Confirm the anchor**

Run: `grep -n "To update a hypothesis, read the file first, propose the change, get confirmation, then write it back." skills/using-startup-superpowers/SKILL.md`
Expected: matches the end of the "## Hypotheses" section.

- [ ] **Step 2: Insert the awareness subsection**

Find this exact line:

```
When the founder mentions a new assumption or risk in conversation, suggest capturing it as a hypothesis. Read the hypotheses folder before any conversation about validation, interviews, or pivots. To update a hypothesis, read the file first, propose the change, get confirmation, then write it back.
```

Insert immediately after it (as a new subsection, before "## Competitors"):

```markdown

## Behavioral validation techniques

Beyond interviews and surveys, two cheap behavioral tests are part of the toolkit: a **fake door** (a not-yet-built feature or tier that logs real intent) and a **small paid-traffic experiment** (buying a little cold audience when the founder can't reach the right people by hand). They are contextual and often unique per case — use both, one, or neither. When a hypothesis looks like a good candidate (often `#willingness_to_pay`, `#urgency`, or `#solution`, especially while slower interview feedback is still in flight), suggest one. The `mvp` skill carries the depth: when each earns its place, the honest automation ceiling, and how to run it.
```

- [ ] **Step 3: Verify**

Run: `grep -n "Behavioral validation techniques" skills/using-startup-superpowers/SKILL.md && grep -nc "^## " skills/using-startup-superpowers/SKILL.md`
Expected: the subsection matches; section count increased by one. Confirm it sits between "## Hypotheses" and "## Competitors", and stays tight (a single paragraph — this is always-on context).

- [ ] **Step 4: Commit**

```bash
git add skills/using-startup-superpowers/SKILL.md
git commit -m "Add Layer 0 awareness of behavioral validation techniques"
```

---

### Task 8: Document the new capability in CLAUDE.md

**Files:**
- Modify: `CLAUDE.md` (the repo-layout tree's `mvp/` block, and the note immediately below the "Runtime (target project)" tree that lists undocumented skills)

**Interfaces:**
- Consumes: all prior tasks (documents what they created).
- Produces: CLAUDE.md mirrors the new skill architecture, per repo convention.

- [ ] **Step 1: Confirm the anchors**

Run: `grep -n "initial-mvp-design.md" CLAUDE.md && grep -n "surveys/. and .mvp/. skills" CLAUDE.md`
Expected: the first matches the mvp reference tree entry; the second matches the "> Note:" line about undocumented skills. Read both regions to capture exact whitespace/alignment before editing.

- [ ] **Step 2: Extend the mvp tree block**

Replace this exact block (in the plugin layout tree):

```
    └── mvp/
        ├── SKILL.md                       # MVP skill (Layer 1)
        └── references/
            ├── initial-mvp-design.md     # Layer 2: first-time MVP design
            └── scaffold-and-deploy.md    # Layer 2: scaffold + deploy workflow
```

with:

```
    └── mvp/
        ├── SKILL.md                       # MVP skill (Layer 1)
        └── references/
            ├── initial-mvp-design.md     # Layer 2: first-time MVP design
            ├── scaffold-and-deploy.md    # Layer 2: scaffold + deploy workflow
            ├── fake-door.md              # Layer 2 (knowledge): when/how to use a fake door
            └── paid-traffic.md           # Layer 2 (knowledge): small paid-traffic experiments
```

Note: match the existing indentation exactly (spaces, not tabs) as read in Step 1; adjust the comment-column alignment to match the file's convention.

- [ ] **Step 3: Update the undocumented-skills note**

Replace this exact line:

```
> Note: the `surveys/` and `mvp/` skills and their hooks are present in the plugin but not yet documented in the per-system sections below. Surveys and MVP runtime artifacts (`startup/surveys/*.md`, `startup/mvp-plan.md`) are implied by the hook checks.
```

with:

```
> Note: the `surveys/` and `mvp/` skills and their hooks are present in the plugin but not yet documented in the per-system sections below. Surveys and MVP runtime artifacts (`startup/surveys/*.md`, `startup/mvp-plan.md`) are implied by the hook checks. The `mvp` skill also carries two Layer 2 *knowledge* references — `fake-door.md` and `paid-traffic.md` — that the agent draws on contextually (not workflows). Awareness of these behavioral techniques is seeded in the Layer 0 `using-startup-superpowers` skill and in the `hypotheses-manager` next-action logic, so the agent can suggest them proactively; their results reuse `startup/mvp-plan.md`.
```

- [ ] **Step 4: Verify**

Run: `grep -n "fake-door.md" CLAUDE.md && grep -n "paid-traffic.md" CLAUDE.md && grep -n "behavioral techniques" CLAUDE.md`
Expected: all match. Confirm the tree still aligns visually.

- [ ] **Step 5: Commit**

```bash
git add CLAUDE.md
git commit -m "Document fake-door and paid-traffic knowledge in CLAUDE.md"
```

---

## Self-Review

**1. Spec coverage** — every spec section maps to a task:
- Spec §1 fake-door.md → Task 1. Spec §1 paid-traffic.md → Task 2.
- Spec §2 fake door as MVP form → Task 3.
- Spec §3 mvp SKILL.md routing + description → Task 4.
- Spec §4 awareness: hypotheses-manager → Task 5; whats-next → Task 6; Layer 0 → Task 7.
- Spec §5 reuse mvp-plan.md → no code change needed; asserted in fake-door.md/paid-traffic.md (Tasks 1–2) and CLAUDE.md note (Task 8). No hook change (constraint honored).
- Spec §6 cross-cutting principles → Global Constraints + baked into Tasks 1–2 content.
- Spec "testing/validation" → per-task Verify steps + Task 8 CLAUDE.md update.
- Spec "open items": fake door placement resolved (landing-page variant + own table row, Task 3); Layer 0 wording resolved (Task 7); mvp description edit resolved (yes — Task 4 Step 1).

**2. Placeholder scan** — no "TBD/TODO/implement later"; every content step carries the full literal file text; verify steps carry exact commands + expected results. `{segment}` inside quoted example strings is illustrative prose the agent fills at runtime, not a plan placeholder.

**3. Type consistency** — file paths are consistent across tasks (`skills/mvp/references/fake-door.md`, `skills/mvp/references/paid-traffic.md`); cross-references between files use those exact paths; heading names referenced in verify greps ("Fake door", "Behavioral validation techniques", "parallelize") match the inserted text exactly.
