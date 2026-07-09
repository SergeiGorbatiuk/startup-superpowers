# Design: Fake-Door & Paid-Traffic Validation as Agent Knowledge

**Date:** 2026-07-09
**Status:** Approved design, pending implementation plan
**Scope:** Extend the existing `mvp` skill with two new validation techniques, exposed as agent *knowledge* (not a workflow), plus lightweight "inventory awareness" so the agent can surface them proactively.

---

## Problem

The plugin guides founders through idea validation, but one high-value technique is under-covered: cheap **behavioral** demand signal via a **fake door** (a button/tier/feature that isn't built, existing only to log intent) and/or a small **paid-traffic experiment** (buying ~$100–200 of cold audience to see whether real people act). Interviews and surveys capture what people *say*; this captures what they *do* with a little friction or money involved.

The `mvp` skill already owns landing pages (form #1), instrumentation tied to success criteria (`scaffold-and-deploy.md`: Vercel Analytics for clicks, Supabase for signups), a `## Distribution Plan`, and the persevere/iterate/pivot loop. What it lacks:

1. **Fake doors specifically** — a lighter-than-landing-page form, and the *judgment* of when it's still worth it.
2. **Paid traffic** — a distribution/audience mechanism; today `## Distribution Plan` only imagines founder-driven manual reach.
3. **Proactive surfacing** — the agent should *notice* when a hypothesis is a good candidate for a cheap behavioral test (e.g. interviews are underway and slow) and suggest it.

## Non-goals

- Not a new user-facing wizard or forced multi-step workflow. This is knowledge the agent draws on contextually.
- Not a new state artifact — results reuse `startup/mvp-plan.md`.
- Not hardcoded benchmarks or a fixed tool/channel stack (see Principles).
- Not attempting to automate ad-account creation/billing/verification (platform-gated, irreducibly manual).

---

## Organizing concept: an inventory, not a pipeline

Two **independent** techniques the agent is *aware of* and selects from contextually — fake door, paid traffic, both, one, or neither, judged case by case. They compose freely (the classic smoke test = fake door + paid traffic) but neither implies the other. The agent's job is **recognition + honest recommendation**, then it leans on the skills that already exist to execute.

---

## Design

### 1. Two knowledge references under the `mvp` skill

#### `skills/mvp/references/fake-door.md`
Knowledge, in the MVP skill's existing "reach for what fits, this is contextual" voice. Covers:

- **What a fake door is** — a button/tier/feature/link that isn't built, placed to measure interest by counting clicks; the click is behavioral signal, not stated opinion.
- **The raised modern bar (the core insight).** Building is cheap and fast now (wiring auth, a thin real slice = an afternoon), so the justification for a fake door has *inverted*. It is justified when the *real* thing is genuinely expensive, complex, risky, or slow to build (real inventory, heavy integrations, regulated flows, ML needing data you don't have), or when you want signal *before* committing even the cheap build. Otherwise the agent's honest advice is often: "the fake door and the thin real slice cost about the same now — build the real one, you'll learn more." This skepticism is consistent with the MVP skill's existing stance ("building is cheap; audience isn't"; "watch for vanity prototypes").
- **Ethics** — graceful "coming soon / early access" reveal; never take money for something that doesn't exist without disclosure; don't waste or mislead the visitor.
- **Instrumentation** — the fake-door click is the metric; reuse the analytics `scaffold-and-deploy.md` already wires (event/click tracking). This reference adds the *reveal page* + the *click event* pattern, not a new analytics stack.
- **Reading it** — click-through as behavioral signal, interpreted against a *live-researched* comparison (never a hardcoded rate); distinguish "wrong audience / ran too short" from "no demand" (mirrors MVP's inconclusive-vs-negative rule).

#### `skills/mvp/references/paid-traffic.md`
Knowledge reference. Paid traffic is framed as a **distribution + honest-audience mechanism**, applicable to *any* deployable experiment (fake-doored or fully real), used when the founder can't reach enough of the right people manually. Covers:

- **When it applies** — reach is the bottleneck; manual/founder-driven distribution can't produce enough honest signal in reasonable time.
- **Channel choice is contextual** — search = capturing existing intent; social (Meta/TikTok) = visual/interruption; Reddit/communities = niche. These are *illustrations*, not defaults; the agent reasons from the product. Explicitly cautions against over-constraining the founder toward one channel.
- **Small-budget segment-splitting** — run a few micro-experiments across promising segments/categories to learn *which* converts, rather than one undifferentiated spend.
- **Live benchmark research** — the agent dispatches `web-researcher` to actualize current CPC/CTR/conversion norms for *this* product/industry/geography before interpreting. Nothing about "good" rates is hardcoded; they drift and are context-specific.
- **Honest automation ceiling** — campaign *design* and *ad copy* are automatable by the agent; *account creation, billing, identity/business verification* are always the founder's manual steps (provide a checklist); *read-out* is automatable where a platform exposes an API/MCP, with honesty that some are read-only (can pull metrics, cannot create/modify campaigns). All contextual and likely unique each time.
- **Reading it** — per-segment conversion against the live-researched benchmark; same inconclusive-vs-negative discipline.

Research provenance for these references lives in `docs/superpowers/specs/` history (the deep-research pass dated 2026-07-09); illustrative examples that surfaced (Carrd, Plausible/PostHog, Google Ads read-only MCP) may appear *as examples only*, never as prescribed stack.

### 2. Fake door as a recognized MVP *form*
`skills/mvp/references/initial-mvp-design.md` "Five MVP forms" table gains **fake door** as a lighter-than-landing-page form, carrying the raised-bar judgment inline so the agent doesn't reach for it reflexively. (Table becomes six forms, or fake door is presented as a landing-page variant — implementer's call during planning.)

### 3. `mvp` SKILL.md routing
Thin routing lines added: load `references/fake-door.md` and/or `references/paid-traffic.md` when the situation calls for them. The skill description may need a light touch so it also activates when the founder discusses *distribution/reaching users* for an existing experiment, not only "building something."

### 4. Inventory awareness (the proactive part)
Three light touchpoints so the agent can *notice and suggest*, not merely respond when asked:

- **`agents/hypotheses-manager.md`** — its per-hypothesis next-action logic learns that a fake-door or small paid-traffic test is a candidate **behavioral** next action, tag-aware (`#willingness_to_pay`, `#urgency`, `#solution`), *especially when interviews are slow or in-flight* ("while you wait on interviews, here's a fast parallel signal"). It still only *recommends* — never executes, never writes files (unchanged contract).
- **`skills/whats-next/SKILL.md`** — orientation can surface the opportunity when project state fits (hypotheses defined, interviews underway).
- **`skills/using-startup-superpowers/SKILL.md` (Layer 0)** — one brief line naming the inventory's existence and pointing to the `mvp` skill for depth, so the awareness is present even when the MVP skill isn't loaded (i.e. mid-interview-phase). **Approved.**

### 5. State — reuse `mvp-plan.md`
A fake-door / paid-traffic run *is* an MVP experiment, so results flow into the existing `startup/mvp-plan.md` (`## Hypotheses Being Tested` backlinks, `## Experiments Log`, persevere/iterate/pivot). This feeds the hypothesis evidence trail exactly like interviews/surveys — **no new file type**, keeps it light. **Approved.** No hook changes required (the existing `validate-mvp-plan-md.mjs` still applies).

### 6. Cross-cutting principles (baked into both references)
- **No hardcoded numbers** — benchmarks researched live, in context.
- **No hardcoded tech/channel** — tools/channels are illustrations; the agent reasons from the product; explicit caution against over-constraining.
- **Knowledge, not a wizard** — no forced steps; the agent converses and drafts/updates `mvp-plan.md` only when it makes sense.
- **Honesty** about the automation ceiling and about fake-door ethics.

---

## Components & responsibilities

| Unit | Responsibility | Depends on |
|---|---|---|
| `references/fake-door.md` | Fake-door knowledge + raised-bar judgment + ethics + reveal/click instrumentation pattern | `scaffold-and-deploy.md` (analytics), `mvp-plan.md` |
| `references/paid-traffic.md` | Paid-traffic knowledge: contextual channels, segment-split, live benchmark research, automation ceiling, read-out | `web-researcher` agent, `mvp-plan.md` |
| `initial-mvp-design.md` (edit) | Fake door added to form inventory + selection judgment | — |
| `mvp/SKILL.md` (edit) | Routing to the two references; possible description touch | the two references |
| `hypotheses-manager.md` (edit) | Awareness that behavioral tests are candidate next actions (tag-aware, interviews-in-flight trigger) | — |
| `whats-next/SKILL.md` (edit) | Surface the opportunity during orientation | — |
| `using-startup-superpowers/SKILL.md` (edit) | One-line inventory awareness + pointer | — |

---

## Testing / validation

No automated test harness exists for these markdown skills; validation is by inspection and convention-conformance:

- The two references are Layer 2 (plain markdown, no frontmatter), under 500 lines, never auto-activate.
- No hardcoded benchmark numbers or prescribed stacks appear as requirements (only labelled examples).
- Edits to `hypotheses-manager.md` preserve its contract (recommends only; never writes files; never talks to founder).
- `mvp-plan.md` remains the sole state artifact; `validate-mvp-plan-md.mjs` unaffected.
- CLAUDE.md updated to document the two new references and the awareness touchpoints (the repo's convention is that CLAUDE.md mirrors the skill architecture).

---

## Open items for the implementation plan

- Exact placement of fake door in the forms table (sixth row vs. landing-page variant).
- Precise wording of the Layer 0 awareness line (must stay one line, harness-neutral).
- Whether the `mvp` skill description needs edit for distribution-side activation, or whether Layer 0 + hypotheses-manager awareness is enough.
