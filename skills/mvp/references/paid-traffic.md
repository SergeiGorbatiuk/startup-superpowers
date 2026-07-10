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
