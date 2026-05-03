# Startup Superpowers

A local-first ideas validation and exploration plugin for Claude Code that guides and helps builders with the most crucial stages necessary for creating something people want: competitors, hypotheses, interviews, surveys, and MVP design. 

## Getting started

### 1. Install the marketplace (only done once)

**For Claude Code CLI:**
```
/plugin marketplace add SergeiGorbatiuk/startup-superpowers
```

**For Claude desktop app:**

1. Open the `Code` tab
2. Find the "+" icon by the chat input, and go to "Plugins" -> "Manage Plugins"
3. Under "Personal Plugins" section click "+" (Add plugin) -> "Create Plugin" -> "Add Marketpalce"
4. In the URL field, paste `SergeiGorbatiuk/startup-superpowers`, then "Sync"

On cerain app versions, the interface does not clearly indicate success or failure of this operation. To verify, again click "+" under "Personal Plugins", then "Browse plugins". You should be able to see "startup-superpowers" in the "Code" tab of the Direcotry window.


### 2. Create a workspace folder

It is recommended to have a new repository/folder per idea you want to explore. This is because the idea can grow into an MVP, and the prototype's code will reside naturally in this new workspace. The plugin will keep it's artifacts in the `startup/` subdirectory once initialised.

For UNIX:
```
mkdir my-new-idea
cd my-new-idea
```

### 3. Activate the plugin for the project

**For Claude Code CLI:**
```
/plugin install startup-superpowers@startup-superpowers
```
It is recommended to activte plugin for this given project (local scope)

**For Claude desktop app:**

1. In the `Code` tab of the app, find the "+" icon by the chat input, go to "Plugins" -> "Add plugin"
2. Navigate to "Code" tab of the newly opened window, there you should find "Startup superpowers" plugin in the respective tab (yeah, they love tabs). If you can't find the plugin, come back to step 1 and verify the marketplace installation
3. Click on the "+" sign to install plugin globally, or click on the card, and in the dropdown install menu choose "Intall for this project" (recommended)



### 4. Kickstart the work

Run `/whats-next` in Claude Code. On first run the agent will ask about your idea and set everything up. After that, `/whats-next` is your home base — run it any time you want to know where your project stands and what to focus on next.

## Usage

> If you are using Claude desktop app, only work in the Code tab of the app

### Pro tips

* Use the **voice mode**. Don't worry to just dump whatever is on your mind: the more — the better. The agent will help you make sense of it all
    * In CLI, activate voice mode once via `/voice` and then long-press space to speak
    * In app UI, just use the mic icon
* All the project's artifacts in `startup/` folder are in markdown with frontmatters, which allows for viewing all that nicely with free tools like [Obsidian](https://obsidian.md/). The agent is linking artifacts to each other (e.g. hypotheses to interview observations), so one can view the state of the project as a graph, if preferred



### What the plugin can help with

| Skill | What it does |
|---|---|
| `/whats-next` | Orients you on the project, manages next steps, detects pivots |
| `/competitors` | Discovers and tracks competitors |
| `/market-research` | Researches market size, segments, and trends |
| `/hypotheses` | Creates and tracks testable assumptions |
| `/interviews` | Drafts interview scripts and analyzes transcripts |
| `/surveys` | Drafts and manages customer surveys |
| `/mvp` | Designs and scaffolds your MVP |

### How it works

There are two ways to use the plugin:

**Guided flow** — run `/whats-next`. The agent assesses where you are, dispatches an independent lean-startup advisor to recommend what comes next, and puts that into a plan (`startup/plan.md`). Each time you come back, it picks up where you left off — checking off progress, extending the plan, and pointing you to the right skill for the next step. This is the recommended path if you're new to idea validation or want structure.

**À la carte** — if you already know what you need, invoke any skill directly (`/competitors`, `/hypotheses`, `/interviews`, etc.). Each skill works independently — you don't have to follow a prescribed sequence.

Either way, all state is stored as markdown files under `startup/` in your workspace. You can open them in any editor, commit them to git, or share them with co-founders. Web research, interview analysis, and plan assessment run as isolated subagents so they don't bias each other.

## License

GNU General Public License v3.0
