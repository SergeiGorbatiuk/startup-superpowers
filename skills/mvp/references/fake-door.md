# Fake Door

This reference is *knowledge*, not a workflow. The `mvp` skill loads it when a fake door is a live option — the founder is choosing an MVP form, proposes one, or you spot a fit. There are no steps to march the founder through. Read it, then reason.

A fake door is a button, tier, feature, or link that isn't built — placed in front of real people to measure interest by counting who acts on it. The click is the signal: behavior, not stated opinion. "Would you use this?" is an opinion; clicking "Start free trial" for a thing that doesn't exist yet is behavior.

## Not the same as Wizard of Oz

They both feel "fake," but they fake different things and answer different questions. A fake door delivers *nothing* — it measures **demand** (does anyone even want this?) via the click, before you build anything. A Wizard of Oz delivers the *real outcome by hand* — the user gets a working experience while a human does manually what the product would automate — so it measures **whether the solution delivers**, not whether it's wanted. Use the fake door first to see if anyone wants it, then Wizard of Oz to deliver it manually to those who did. (In the form table, this is why a fake door is deployable and a Wizard of Oz is not.)

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
