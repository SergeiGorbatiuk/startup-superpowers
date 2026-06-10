# Startup Superpowers

> Validate before you build. Local-first, file-based, founder-friendly.

![version](https://img.shields.io/badge/version-1.0.9-blue) ![license](https://img.shields.io/badge/license-GPL--3.0-blue) ![for Claude Code](https://img.shields.io/badge/for-Claude%20Code-orange)

A local-first idea-validation co-pilot for Claude Code. It guides founders through the messy early work of figuring out whether an idea has legs — competitors, market, hypotheses, interviews, surveys, and an MVP — and keeps every artifact as plain markdown in your project, yours to read, edit, commit, and share.

![Plugin demo](assets/demo.gif)

---

## 📑 Table of Contents

- [🧭 What is Startup Superpowers?](#-what-is-startup-superpowers)
- [🛠 Installation](#-installation)
- [🗺 The Founder Journey](#-the-founder-journey)
- [🎯 Which Skill Should I Use?](#-which-skill-should-i-use)
- [📚 Skills Reference](#-skills-reference)
- [💡 Why Startup Superpowers?](#-why-startup-superpowers)
- [✨ Pro Tips](#-pro-tips)
- [🧱 Philosophy](#-philosophy)
- [📄 License](#-license)


## 🧭 What is Startup Superpowers?

A Claude Code plugin that turns idea-validation work into a conversation with a thoughtful co-founder — one that takes notes, runs research in the background, and never loses track of what you decided three weeks ago.

It is opinionated about *evidence before commitment*: discover competitors before sizing the market, write down hypotheses before doing interviews, run interviews before designing surveys, learn from real conversations before building an MVP.

**Key features:**

- **Seven skills, one workflow** — `/whats-next`, `/competitors`, `/market-research`, `/hypotheses`, `/interviews`, `/surveys`, `/mvp`. Use them through a guided plan or à la carte.
- **All state on disk** — every artifact is a markdown file under `startup/` in your project. No accounts, no database, no SaaS lock-in.
- **Bias-isolated subagents** — interview analysis, hypothesis assessment, and plan recommendations each run in their own subagent, so they reason on the files, not on your in-chat enthusiasm.
- **Evidence → next move** — every hypothesis assessment yields the smallest observable next validation action, biased toward a real user-facing step instead of yet another research backlog.
- **Voice-first founder input** — designed for thinking out loud. Dump unstructured thoughts; the agent organises them into structured artifacts.
- **Obsidian-friendly graph** — all artefacts have frontmatters for filtering, and include links, e.g. hypotheses link to supporting interview statements via `[[slug]]`. Browse the evidence trail in any markdown editor.

---

## 🛠 Installation

It is recommended to have a new repository/folder per idea you want to explore — the idea can grow into an MVP, and the prototype's code will live naturally in that workspace. The plugin keeps its artifacts in the `startup/` subdirectory once initialised.

Pick the instructions for your client:

### Claude Code CLI

```bash
# 1. Add the marketplace (one-time, global)
/plugin marketplace add SergeiGorbatiuk/startup-superpowers

# 2. Create a workspace folder for your idea (in your shell)
! mkdir my-new-idea && cd my-new-idea

# 3. Install the plugin for this project (local scope recommended)
/plugin install startup-superpowers@startup-superpowers

# 4. Apply changes
/reload-plugins

# 5. Kick things off
/whats-next
```

On first run the agent will ask about your idea and set everything up. After that, `/whats-next` is your home base — run it any time you want to know where your project stands and what to focus on next.

### Claude Desktop App

> Only work in the **Code** tab of the app.

**1. Add the marketplace** (one-time):

1. Open the `Code` tab.
2. Click the "+" icon by the chat input → "Plugins" → "Manage Plugins".
3. Under "Personal Plugins" click "+" (Add plugin) → "Create Plugin" → "Add Marketplace".
4. In the URL field paste `SergeiGorbatiuk/startup-superpowers`, then click "Sync".

On certain app versions the interface does not clearly indicate success or failure of this step. To verify: click "+" under "Personal Plugins" again, then "Browse plugins". You should see `startup-superpowers` in the "Code" tab of the Directory window.

**2. Create a workspace folder for your idea** (in your shell, file manager, or however you usually do it):

```
mkdir my-new-idea
cd my-new-idea
```

Then open this folder in the Desktop app.

**3. Install the plugin for this project**:

1. In the `Code` tab, click the "+" icon by the chat input → "Plugins" → "Add plugin".
2. In the window that opens, navigate to the "Code" tab — you should find the "Startup superpowers" plugin there. If you can't find it, go back to step 1 and verify the marketplace installation.
3. Click the "+" to install globally, or click the card and choose "Install for this project" from the dropdown (recommended).

**4. Kick things off**: run `/whats-next` in the chat.

On first run the agent will ask about your idea and set everything up. After that, `/whats-next` is your home base.

---

## 🗺 The Founder Journey

Validation is rarely a straight line. `/whats-next` sits at the centre — it orients you, dispatches the right skill, and updates the plan based on what you discover.

```
                    ┌──────────────────────┐
                    │     /whats-next      │   ← always start here
                    │   orient & re-plan   │   ← always come back
                    └──────────┬───────────┘
                               │
       ┌────────────┬──────────┼──────────┬────────────┐
       ▼            ▼          ▼          ▼            ▼
  /competitors  /market-    /hypo-    /interviews  /surveys
                 research   theses
       │            │          │          │            │
       └────────────┴──────────┼──────────┴────────────┘
                               ▼
                          ┌─────────┐
                          │  /mvp   │
                          │ design  │
                          │ & ship  │
                          └─────────┘
```

Each skill writes to its own folder under `startup/` and links back to the others. Run `/whats-next` whenever you want to know where you are and what to do next.

---

## 🎯 Which Skill Should I Use?

```
Where are you right now?
│
├─ "I have an idea but don't know where to start" ──► /whats-next
│
├─ "Who else is doing this?" ──────────────────────► /competitors
│
├─ "Is the market big / right / worth it?" ────────► /market-research
│
├─ "What am I actually assuming is true?" ─────────► /hypotheses
│
├─ "I need to talk to customers" ──────────────────► /interviews
│
├─ "I want to test demand at scale" ───────────────► /surveys
│
└─ "I'm ready to build something testable" ────────► /mvp
```

When in doubt, run `/whats-next` and let the planner pick.

---

## 📚 Skills Reference

| Skill | What it does | When to use |
|---|---|---|
| `/whats-next` | Orients you on the project, manages next steps, detects pivots | Start of every session, after finishing any milestone, when you feel lost |
| `/competitors` | Discovers, classifies (direct/indirect, incumbent/scaleup/startup), and tracks competitors — mines real user feedback (what users love, complain about, and wish existed), and watches them over time for feature changes, pivots, deaths, and new entrants | Early in validation, after a pivot to re-map the landscape, or any time to refresh a stale landscape |
| `/market-research` | Researches market size, customer segments, buying behaviour, pricing, trends | Before committing to a segment, or to sanity-check the opportunity |
| `/hypotheses` | Captures and tracks testable assumptions (problem, solution, willingness to pay, urgency), and turns each into a concrete next validation action | Before any interview, or whenever you catch yourself saying "I think users will..." |
| `/interviews` | Drafts customer-discovery scripts and analyses transcripts against your hypotheses — surfacing what changed and the next move | Drafting a script for a new segment, or right after an interview |
| `/surveys` | Drafts and manages surveys (questions-only or Tally-backed) | After 5+ interviews when you want to test signals at larger scale |
| `/mvp` | Designs the smallest testable MVP and scaffolds the codebase | Once enough hypotheses are confirmed to justify building |

All skills work both inside the guided plan (driven by `/whats-next`) and standalone à la carte.

---

## 💡 Why Startup Superpowers?

Concrete things this plugin does that off-the-shelf chatbots don't:

### Local-first, file-based

Every artifact is plain markdown in `startup/`. No accounts, no SaaS, no lock-in. Commit it, share it, open it in Obsidian, grep it from the terminal. Your validation work is yours.

### Honest, optional feedback

No telemetry, ever — the plugin doesn't phone home. At a few big milestones the agent may offer an optional, anonymous feedback link, and that's the whole mechanism. Nothing is sent unless you choose to fill it in, and a single "stop asking" turns the offers off for good.

### Bias-isolated subagents

Interview analysis, hypothesis state assessment, and plan recommendations each run in their own subagent. They read the files and reason from evidence — they can't be swayed by an enthusiastic pitch you just made in the main chat.

### Competitor intelligence, not just a list

`/competitors` doesn't just name who else is out there — it tells you whether each one is a funded incumbent or an early startup, and (on request) mines real user feedback from review sites and communities: what users love, what they complain about, and what they wish existed. You end up with populated profiles and concrete gaps to aim at, not a folder of links. And because competitors don't stand still — they ship features, change pricing, pivot, or quietly shut down — a **watch** pass re-checks the whole landscape on demand: it refreshes each profile, archives the ones that died, surfaces new entrants, and keeps a dated change log so you can see how the field moved since last time.

### Pivot detection

When foundational fields in `core.md` shift (audience, problem, solution), `/whats-next` notices, walks you through which existing artifacts still apply, and re-plans accordingly. No silent drift.

### Voice-first founder input

Designed for thinking out loud. The plugin assumes you'll dump unstructured ramblings (the more the better) and that proper nouns may be mistranscribed. The agent makes sense of the mess and confirms before writing.

### Obsidian-friendly evidence graph

Interview statements link back to the hypotheses they touch via `[[slug]]`. The hypothesis manager greps across all interviews to assess status — so your decisions trace back to actual customer words, not summaries of summaries.

### Evidence becomes a next move, not a backlog

Most validation tools quietly turn into a prettier research folder. This one doesn't stop at a status label. Every time your hypotheses are assessed, each one also gets a **next validation action** — the smallest observable move: who to put it in front of, what to show them, and what answer would actually change your roadmap. It's biased toward a real user-facing step over "do more research," tailored to the assumption type (a conversation for a problem, a prototype for a solution, a price gate for willingness-to-pay). `/whats-next` then surfaces the single sharpest move alongside your strategic focus, so you always know the next awkward thing to do.

### One question at a time

Every conversational flow asks one focused question, never a wall of forms. This is a hard rule in the plugin's design, not a style preference.

---

## ✨ Pro Tips

> If you are using Claude desktop app, only work in the Code tab of the app.

- Use the **voice mode**. Don't worry about being structured — just dump whatever's on your mind. The more, the better. The agent will help you make sense of it all.
    - In CLI, activate voice mode once via `/voice` and then long-press space to speak.
    - In app UI, just use the mic icon.
- All artifacts in `startup/` are markdown with frontmatter, which means free tools like [Obsidian](https://obsidian.md/) can view them beautifully. The agent links artifacts to each other (e.g. hypotheses to interview observations), so you can see your project as a graph if you prefer.
- Commit `startup/` to git. The artifacts are designed to be human-readable diffs — you'll see your thinking evolve over time.

---

## 🧱 Philosophy

- **Skills guide, subagents execute, files are the handoff.** The plugin doesn't hide state behind APIs. Every interesting thing the agent does ends up as a file you can read.
- **Progressive disclosure.** Skills only load when their description matches what you're doing. The plugin is large but stays out of the way until you ask.
- **Hooks nudge, never block.** Convention checks surface gentle reminders on writes, but they never refuse to save your work.
- **Lean startup, applied pragmatically.** The workflow follows problem-solution fit and customer discovery, biased toward evidence over assumptions — but it never lectures you about it.

---

## 📄 License

GNU General Public License v3.0
