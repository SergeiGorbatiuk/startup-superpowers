# Startup Superpowers

> Validate before you build. Local-first, file-based, founder-friendly.

![version](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2FSergeiGorbatiuk%2Fstartup-superpowers%2Fmain%2F.claude-plugin%2Fplugin.json&query=%24.version&label=version&color=blue) ![license](https://img.shields.io/badge/license-GPL--3.0-blue) ![for Claude Code](https://img.shields.io/badge/for-Claude%20Code-orange) [![docs](https://img.shields.io/badge/docs-startupsuperpowers.io-036666)](https://docs.startupsuperpowers.io)

A local-first idea-validation co-pilot for Claude Code. It guides founders through the messy early work of figuring out whether an idea has legs — competitors, market, hypotheses, interviews, surveys, and an MVP — and keeps every artifact as plain markdown in your project, yours to read, edit, commit, and share.

![Plugin demo](assets/demo.gif)

**📖 [Read the full documentation →](https://docs.startupsuperpowers.io)**

## 🧭 What is Startup Superpowers?

A Claude Code plugin that turns idea-validation work into a conversation with a thoughtful co-founder — one that takes notes, runs research in the background, and never loses track of what you decided three weeks ago.

It is opinionated about *evidence before commitment*: discover competitors before sizing the market, write down hypotheses before doing interviews, run interviews before designing surveys, learn from real conversations before building an MVP.

**Key features:**

- **[Seven skills, one workflow](https://docs.startupsuperpowers.io/skills/overview)** — `/whats-next`, `/competitors`, `/market-research`, `/hypotheses`, `/interviews`, `/surveys`, `/mvp`. Use them through a guided plan or à la carte.
- **[All state on disk](https://docs.startupsuperpowers.io/concepts/workspace)** — every artifact is a markdown file under `startup/` in your project. No accounts, no database, no SaaS lock-in.
- **[Bias-isolated analysis](https://docs.startupsuperpowers.io/concepts/advisor)** — interview analysis, hypothesis assessment, and plan recommendations each run in isolation, reasoning on the files, not on your in-chat enthusiasm.
- **[Evidence → next move](https://docs.startupsuperpowers.io/concepts/evidence-graph)** — every hypothesis assessment yields the smallest observable next validation action, biased toward a real user-facing step instead of yet another research backlog.
- **Voice-first founder input** — designed for thinking out loud. Dump unstructured thoughts; the agent organises them into structured artifacts.
- **Obsidian-friendly graph** — artifacts carry frontmatter for filtering and link to each other via `[[slug]]` backlinks (e.g. hypotheses to supporting interview statements). Browse the evidence trail in any markdown editor.

## 🛠 Installation

It is recommended to have a new repository/folder per idea you want to explore — the idea can grow into an MVP, and the prototype's code will live naturally in that workspace. The plugin keeps its artifacts in the `startup/` subdirectory once initialised.

Pick the instructions for your client:

### Claude Code CLI


1. Add the marketplace (one-time, global)
```bash
/plugin marketplace add SergeiGorbatiuk/startup-superpowers
```

2. Create a workspace folder for your idea (in your shell)
```bash
! mkdir my-new-idea && cd my-new-idea
```

3. Install the plugin for this project (local scope recommended)
```bash
/plugin install startup-superpowers@startup-superpowers
```

4. Apply changes
```bash
/reload-plugins
```

5. Kick things off
```bash
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

## 📚 Learn more

Everything else lives in the docs:

- **[Quickstart](https://docs.startupsuperpowers.io/quickstart)** — your first session, from raw idea to a validation plan
- **[Skills overview](https://docs.startupsuperpowers.io/skills/overview)** — the founder journey, which skill to use when, and a page per skill
- **[The startup/ workspace](https://docs.startupsuperpowers.io/concepts/workspace)** — the files the plugin creates and who writes what
- **[Your plan](https://docs.startupsuperpowers.io/concepts/plan)** — how `core.md` and `plan.md` steer the journey, including pivots
- **[The evidence graph](https://docs.startupsuperpowers.io/concepts/evidence-graph)** — how interview statements become hypothesis verdicts
- **[How the advisor works](https://docs.startupsuperpowers.io/concepts/advisor)** — one question at a time, propose-before-write, voice input, and the no-telemetry stance

## 🧱 Philosophy

- **Skills guide, subagents execute, files are the handoff.** The plugin doesn't hide state behind APIs. Every interesting thing the agent does ends up as a file you can read.
- **Progressive disclosure.** Skills only load when their description matches what you're doing. The plugin is large but stays out of the way until you ask.
- **Hooks nudge, never block.** Convention checks surface gentle reminders on writes, but they never refuse to save your work.
- **Lean startup, applied pragmatically.** The workflow follows problem-solution fit and customer discovery, biased toward evidence over assumptions — but it never lectures you about it.

## 📚 Inspiration & Credits

Several frameworks and principles in this plugin are based on the work and comments of people who've written clearly about the messy early work of building a startup:

- **Rob Fitzpatrick** ([robfitz.com](https://robfitz.com/))
- **Justin Jackson** ([justinjackson.ca](https://justinjackson.ca))

## 📄 License

GNU General Public License v3.0
