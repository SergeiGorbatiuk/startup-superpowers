# Startup Superpowers

A local-first ideas validation and exploration set of plugin for Claude Code that guides and helps builders with the most crucial stages necessary for creating something people want: competitors, hypotheses, interviews, surveys, and MVP design. 

## Getting started

### 1. Install the marketplace (only done once)


```
/plugin marketplace add SergeiGorbatiuk/startup-superpowers
```


### 2. Create a workspace folder

It is recommended to have a new repository/folder per idea you want to explore. This is because the idea can grow into an MVP, and the prototype's code will reside naturally in this new workspace. The plugin will keep it's artifacts in the `startup/` subdirectory once initialised.

For UNIX:
```
mkdir my-new-idea
cd my-new-idea
```

### 3. Activate the plugin for the project

```
/plugin install startup-superpowers@startup-superpowers
```
It is recommended to activte plugin for this given project (local scope)

### 4. Kickstart the work

Run `/whats-next` in Claude Code. On first run the agent will ask about your idea and set everything up. After that, `/whats-next` is your home base — run it any time you want to know where your project stands and what to focus on next.

## Usage

### Pro tips

* Use the **voice mode**. Don't worry to just dump whatever is on your mind: the more — the better. The agent will help you make sense of it all
    * In CLI, activate voice mode once via `/voice` and then long-press space to speak
    * In app UI, just use the mic icon
* All the project's artifacts in `startup/` folder are in markdown with frontmatters, which allows for viewing all that nicely with free tools like [Obsidian](https://obsidian.md/). The agent is linking artifacts to each other (e.g. hypotheses to interview observations), so one can view the state of the project as a graph, if preferred



### What the advisor can help with

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

State is stored as markdown files under `startup/` in your workspace. The advisor reads and writes these files — you can open them in any editor, commit them to git, or share them with co-founders.

Web research, interview analysis, and plan assessment run as isolated subagents so they don't bias each other.

## License

GNU General Public License v3.0
