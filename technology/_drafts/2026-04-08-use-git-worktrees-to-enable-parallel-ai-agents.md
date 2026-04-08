---
layout: post
title: Using Git Worktrees to enable parallel tasks from AI Agents
image: /assets/media/2026-04-08-use-git-worktrees-to-enable-parallel-ai-agents/robots-working-by-chatgpt.png
image_credits: https://chatgpt.com
---

Git Worktree is a command added in Git 2.5, back in July 2015, more than 10 years from now, and allows users to have multiple Worktrees (copies) of a single git repository located in different directories while sharing the same `.git` folder. Worktrees allow users to work on different branches simultaneously without need to `checkout` or `switch` between them, and without affecting each other.

Previously, I have used Git Worktrees to work on _monorepos_ (whoever worked on a big _monorepo_ knows that a new clone can take several minutes to complete), producing lightweight copies and improving speed. But it was recently, with the adoption of AI Agents in software development that Git Worktrees have proved their true value.

## Developing with the help of AI Agents

The adoption of AI has allowed developers to increase productivity exponentially, to the point that former methods of project estimations don't apply anymore. -- What used to take days or weeks of work by writing code, now can be done in a matter of hours.

In this new scenario, we spend much more time designing systems and writing prompts to be lent over to AI Agents for writing the actual code. Applications like Claude Code, Copilot, or Cursor, have evolved to the point to work almost fully unassisted, being able not only to write code, but also learn from it, test, fix, and improve.

### But what is an AI Agent?

The word _Agent_ can be a bit ambiguous due to how companies and applications based on AI (Artificial Intelligence, but mostly Large Language Models) have been using and divulging them. The meaning of the word might also change over time in this fast-changing AI world.

So, to be explicit, we need to define what an _AI Agent_ is in the context of this blog post.

> An AI Agent is a software system that uses AI (Artificial Intelligence) to achieve goals or complete tasks on behalf of a user, whether a human or another AI Agent. Agents can reason, make decisions, and use other software systems autonomously, optionally requiring additional permissions or confirmation from their user.

### How do they work?

Given a prompt with its initial set of instructions, an AI Agent will perform a bunch of tasks to deliver what it was requested to. Some common tasks include:

- read and analyze the existing codebase
- read any documents it was pointed to, and others it may find
- use available MPC (Model Context Protocol) tools to gather extra information
- use several operating system tools, mostly command line applications
- ask additional questions for the user
- search the internet or fetch web pages
- produce text output for the user to read
- write to disk or use MCP and system tools to persist changes

With the use of additional configurations and scripts we leverage these capabilities to create more complex workflows, from _planning modes_, _reasoning models_, and _spec-driven development_, we ought to provide enough information (or context) for AI Agents to be able to perform development tasks from start to finish with minimal human interaction.

For those unfamiliar with these terms, here is a brief summary:

- **Plan mode** is a feature from AI Agents to write a detailed plan before executing the intended tasks. The AI Agent will analyze the codebase, read documents and ask clarifying questions before outputting the detailed plan to review and ask for confirmation to execute.
- **Reasoning models** are specialized models that use available information to generate predictions, make inferences, and draw conclusions, by breaking problems and analyzing them step by step.
- **Spec-Driven Development** is a methodology that prioritizes the creation of a precise, machine-readable specification document over immediate coding. This document becomes the source of truth for an AI Agent to use when writing the code.

But these workflows executed by AI Agents often take time, from a couple of minutes to several hours, which turns the developer into a spectator. In other words, it leaves the developer free to work on parallel tasks, such as review and test a pull request from a co-worker, analyze a bug, refactor some old code, or simply start that other task that has been sitting in the backlog.

This is where Git Worktrees make all the difference, allowing the user to do these parallel tasks without interrupting or affecting the ongoing AI Agent work.

## Use Git Worktrees to enable parallel tasks

To be able to do parallel tasks within the same repository -- by itself or also with an AI Agent -- a developer just has to add a new Worktree. From your primary repository Worktree, run:

```console
$ git worktree add [-b NEW BRANCH] PATH [BASE BRANCH]
```

Where

- `PATH` is the destination directory for the Worktree. It is required.
- `NEW BRANCH` is the newly created branch name. Worktrees always create a new branch.
  If none is provided, it will use the path as branch name.
- `BASE BRANCH` is the branch used as a base, default to current branch.

I usually create Worktrees in sibling directories and based on main. E.g.

```console
$ git worktree add -b my-new-branch ../my-new-worktree main
Added worktree: ../my-new-worktree
```

After creating a Git Worktree, simply move to its directory and start your AI Agent of choice (e.g. Claude Code), allowing the parallel work.

```console
$ cd ../my-new-worktree
$ claude
```

There is no limit for how many Worktrees one can add.

### Listing and removing Worktrees

To list all existing Worktrees along with their current branches, run:

```console
$ git worktree list
/home/diovani/Development/Git/blog.diovani.com    (main)
/home/diovani/Development/Git/my-new-worktree     (my-new-branch)
```

And to remove an existing Worktree, run:

```console
$ # git worktree remove PATH
$ git worktree remove ../my-new-worktree
Removed worktree: /home/diovani/Development/Git/my-new-worktree
```

Check `git worktree --help` for more commands and options.

### Automate your Git Worktree workflow

You don't have to memorize these commands or repeat them every time you end up using Worktrees on daily basis.

Instead, create a script or function to do the heavy lifting and place in your `.bashrc` or similar.

```bash
# Creates a new Git worktree in a sibling directory using the provided name suffix,
# switches to the new worktree's path.
#
# Arguments:
# - $1: Path suffix for worktree (e.g. new-feature => ../my-repos-new-feature).
#       Also used as branch name.
# - $2: (Optional) Base branch for the new worktree. Default to 'main'.
#
# Usage:
#   git_worktree new-feature [base_branch]
#
git_worktree() {
  local branch_name=$1
  local base_branch=${2:-main}
  local destination
  destination=../$(basename "$PWD")-${branch_name//\//-}

  git worktree add  -b "$branch_name" "$destination" "$base_branch"
  cd "$destination" || return
}
```

Update the function above as desired.

You can even include a line to start or favorite AI Agent or Editor.

## Conclusion and Caveats

There are a few caveats, though...

Since Git Worktrees are placed on different directories, you still need to set up your application (e.g. `bundle install`, `cargo build`), especially if you intend to run it or enable LSP (Language Server Protocol) servers. When starting services with `foreman start` or `docker-compose up` you must also be careful to avoid port conflicts or exhausting system resources.

Additionally, Worktrees can't share the same branch (e.g. can't have two different Worktrees pointing to `main` branch). Local history and memory from AI Agents will also not be shared across Worktrees.

These are all minor issues and easily avoided. I myself keep the application running on a main Worktree and use it for my primary task at hand, while using separate ones for less important work.

On the good side, using several Worktrees can greatly speed up the work for tasks that are expected to be done in parallel from start. For example, when writing a new API endpoint + its front-end consumer, or writing a library + use it from the main app.

Git Worktrees were made to enable parallel work on different branches many years ago, but looking at it today it feels like they were made for AI assisted development. 🤖

## Appendix: Using TMUX to switch across Git Worktrees

If you use [tmux](https://github.com/tmux/tmux/wiki) or [GNU screen](https://www.gnu.org/software/screen/) they can give even more power to Git Worktrees + Ai Agents.

These tools can be replaced by terminal tabs, or in-editor terminals, for switching between different Worktrees. But they provide an additional feature for the workflow proposed above: they are easily scriptable.

For example, I use `tmux`, so I can easily create a script to add a Worktree and start AI in a new tmux window on a single command.

```console
$ tmux new-window \; send-keys 'git worktree add ../my-worktree && cd ../my-worktree && claude' C-m
```

Putting it all together, we can create a new version of the previous function as follows.

```bash
# Create a new tmux window
# Add a new Git worktree in a sibling directory using the provided name suffix,
# CD to the new worktree's path and start claude.
#
# Arguments:
# - $1: Path suffix for worktree (e.g. new-feature => ../my-repos-new-feature).
#       Also used as branch name.
# - $2: (Optional) Base branch for the new worktree. Default to 'main'.
#
# Usage:
#   claude_worktree new-feature [base_branch]
#
claude_worktree() {
  local branch_name=$1
  local base_branch=${2:-main}
  local destination
  destination=../$(basename "$PWD")-${branch_name//\//-}

  tmux new-window \; \
    send-keys "git worktree add -b $branch_name $destination $base_branch" C-m \; \
    send-keys "cd $destination || return && claude" C-m \; \
}
```

Then you can move across tmux windows as normal with `C-b p` and `C-b n`.

## References

- [An Introduction To Plan Mode by Matt Pocock](https://www.aihero.dev/plan-mode-introduction)
- [Git 2.5, including multiple worktrees and triangular workflows at GitHub Blog](https://github.blog/open-source/git/git-2-5-including-multiple-worktrees-and-triangular-workflows/)
- [Git Worktree at git-scm.com](https://git-scm.com/docs/git-worktree)
- [Spec-Driven Development at specdriven.ai](https://specdriven.ai/)
- [Spec-driven development at Wikipedia](https://en.wikipedia.org/wiki/Spec-driven_development)
- [Understanding Spec-Driven-Development: Kiro, spec-kit, and Tessl by Birgitta Böckeler at MartinFowler.com](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html)
- [What is an AI agent? at Google Cloud](https://cloud.google.com/discover/what-are-ai-agents)
- [What is reasoning in AI? by Rina Diane Caballar, Cole Stryker at IBM](https://www.ibm.com/think/topics/ai-reasoning)
