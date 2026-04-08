---
layout: post
title: Using Git Worktrees to enable parallel tasks from AI Agents
image: /assets/media/2026-04-07-parallel-agentic-workflow-using-git-worktrees/robots-working.png
image_credits: https://chatgpt.com
---

Git Worktree is a command added in Git 2.5, back in July 2015, more than 10 years from now, and allow users to have multiple Worktrees (multiple copies) of a single git repository located in different directories by sharing the same `.git` folder. Worktrees allow users to work on multiple branches simultaneously without need to `checkout` or `switch`, and without affecting each other.

Previously, I have used Git Worktrees to work on _monorepos_ -- who ever worked on a big _monorepo_ knows that a new clone can take several minutes to complete, producing lightweight copies and improving speed. But it was recently, with the adoption of AI Agents in software development that Git Worktrees have proved its true value.

## Developing with the help of AI Agents

The adoption of AI has allowed developers to increase productivity exponentially, to the point that former methods of project estimations don't apply anymore. -- What used to take days or weeks of work by writing code, now can be done in a matter of hours.

In this new scenario, we spend much more time designing systems and writing detailed specifications, or prompts, to be lent over to AI Agents for writing the actual code. Applications like Claude Code, Copilot, or Cursor, have evolved to the point to work almost fully unassisted, being able not only to write code, but also learn from it, test, fix, and improve.

### But what is an AI Agent?

The word _Agent_ can be a bit ambiguous due to how companies and applications based on AI (Artificial Intelligence, but mostly Large Language Models, or LLMs, in these cases) have been using and divulging them. The meaning of the word might also change over time in this fast-changing AI world.

So, to be explicit, we need to define what an _AI Agent_ is in the context of this blog post.

> An AI Agent is a software system that uses AI (Artificial Intelligence) to achieve goals or complete tasks on behalf of a user, whether a human or another AI Agent. Agents can reason, make decisions, and use other software systems autonomously, optionally requiring additional permissions or confirmation from their user.

### How do they work?

Given a prompt with its initial set of instructions, an AI Agent will perform a bunch of tasks to deliver what it was requested to. Some common tasks include:

- read and analyze the existing codebase
- read any documents it was pointed too, and others it may find
- use available MPC (Model Context Protocol) tools to gather extra information
- use several operating system tools, mostly command line applications
- ask additional questions for the user
- search the internet or fetch web pages
- produce text output for the user to read
- write to disk or use MCP and system tools to persist changes

With the use of additional configurations and scripts we leverage these capabilities to create more complex workflows, from _planning modes_, _deep-thinking models_, and _spec-driven development_, we ought to provide enough information (or context) for AI Agents to be able to perform development tasks from start to finish with minimal human interaction.

But these tasks handled to AI Agents often take time, which turns the developer into a spectator. In other words, it leaves the developer free to work on parallel tasks, being these to review and test a PR from a co-worker, analyze a bug, refactor some old code, or simply start that other task that has been sitting in the backlog.

This is where Git Worktrees make all the difference, allowing the user to start these parallel tasks without interrupting or affecting the ongoing AI Agent work.

## Use Git Worktrees to enable parallel tasks

To be able to do parallel tasks within the same repository -- by itself or also with an AI Agent -- a developer just has to add a new Worktree. From your primary repository Worktree, run:

```bash
git worktree add [-b NEW BRANCH] PATH [BASE BRANCH]
```

Where

- `PATH` is the destination directory for the Worktree. It is required.
- `NEW BRANCh` is the newly created branch name. Worktrees always create a new branch.
  If none is provided, it will use the path as branch name.
- `BASE BRANCH` is the branch used as a base, default to current branch.

I usually create Worktrees in sibling directories and based on main. E.g.

```bash
git worktree add -b my-new-branch ../my-new-worktree main
```

After creating a Git Worktree, simply move to its directory and start your AI Agent of choice (e.g. Claude Code), allowing to do parallel work.

```bash
cd ../my-new-worktree
claude
```

### Listing and removing Worktrees

To list all existing Worktrees along with their current branches, run:

```bash
git worktree list
```

And to remove an existing Worktree, run:

```bash
git worktree remove PATH
```

Check `git worktree --help` for more commands and options.

## Automate your workflow

You don't have to memorize these commands or repeat them every time of you end up using Worktrees on daily basis.

Instead, create a script or function to do the heavy lifting and place in your `.bashrc` or similar.

```bash
# Creates a new Git worktree in a sibling directory using the provided name suffix,
# switches to the new worktree's path.
#
# Arguments:
# - $1: Path suffix for worktree (e.g. new-feature => ../my-repos-new-feature). Also used as branch name.
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
You can include a line to start or favorite AI Agent or Editor.

## Conclusion and Caveats

## References

- [Git 2.5, including multiple worktrees and triangular workflows at GitHub Blog](https://github.blog/open-source/git/git-2-5-including-multiple-worktrees-and-triangular-workflows/)
- [Git Worktree at git-scm.com](https://git-scm.com/docs/git-worktree)
- [Spec-Driven Development at specdriven.ai](https://specdriven.ai/)
- [Spec-driven development at Wikipedia](https://en.wikipedia.org/wiki/Spec-driven_development)
- [Understanding Spec-Driven-Development: Kiro, spec-kit, and Tessl by Birgitta Böckeler](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html)
- [What is an AI agent? at Google Cloud](https://cloud.google.com/discover/what-are-ai-agents)
