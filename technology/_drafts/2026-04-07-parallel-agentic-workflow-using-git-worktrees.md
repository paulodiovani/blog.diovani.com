---
layout: post
title: Using multiple parallel AI Agents with Git Worktrees
---

The adoption of AI has allowed us developers to increase productivity exponentially, to the point that former methods of project estimations don't apply anymore. What used to take days or weeks of work by writing code, now can be done in a matter of hours.

In this new scenario, we spend much more time designing systems and writing detailed specifications, or prompts, to be lent over to AI Agents for writing the actual code. Agentic tools such as Claude Code, Copilot, or Cursor, have evolved to the point to work almost unassisted, being able not only to write code, but test, fix, and improve it.

But these tasks handled to AI Agents often take time, which turns the developer from a system designer to a spectator. In other words, it leaves the developer free to work on parallel tasks. This is where Git Worktrees come to help by providing a lightweight copy of repository in a faster way.

## But what is an AI Agent?

The word _Agent_ can be a bit ambiguous due to how companies and applications based on AI (Artificial Intelligence, but mostly Large Language Models, or LLMs, in these cases) have been using and divulge them. The meaning of the word might also change over time in this fast-changing AI world.

So, to be explicit, we need to define what an _AI Agent_ is in the context of this blog post.

> An AI Agent is a software system that uses AI to achieve goals or complete tasks on behalf of a user, whether a human or another AI Agent. Agents can reason, make decisions, and use other software systems autonomously, optionally requiring additional permissions or confirmation from their user.

### How does it work?

Given a prompt with its initial instructions, an AI Agent will perform a bunch of tasks to deliver what it was requested. Some common tasks include:

- read and analyze the existing codebase
- read any documents it was pointed too, and others it may find
- use available MPC (Model Context Protocol) tools to gather extra information
- use several operating system tools, mostly command line applications
- ask additional questions for the user
- search the internet or fetch web pages

With the use of additional configurations and scripts we leverage these capabilities to create more complex workflows, from _planning modes_, _deep-thinking models_, and _spec-driven development_, we ought to provide enough information (or context) for AI Agents to be able to perform development tasks from start to finish with minimal human interaction.

In the end, the output it produces will be delivered in text, written to the disk, or again by calling MCP or system tools. But just after a certain amount of time, which may take from seconds to hours.

During this time, a proactive developer will use its (not so) free time to do something in parallel. It can be review and test a PR from a co-worker, analyze a bug, refactor some old code, or simply start that other task that has been sitting in the backlog.

## Use Git Worktrees to enable parallel tasks

To be able to do parallel tasks within the same repository -- by itself or also with an AI Agent -- a developer can use Git Worktrees to create new copies without having to create a new clone.

Adding a new Git Worktree, is fast and easy, and provide extra advantages, such as:

- Shared history, so don't need to `git pull `repeatedly 
- Reduced disk space
- Isolated development, in comparison to switching branches

### How to add new Git Worktrees

To add a new git Worktrees simply run on your primary repository copy:

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
git worktree add ../my-project-faeture main
```

After creating a Git Worktree, simply move to its directory and start your AI Agent of choice, allowing to do parallel work.

```bash
cd ../my-project-faeture
claude
```

### Listing and removing Wortrees

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

- [Git Worktree at git-scm.com](https://git-scm.com/docs/git-worktree)
- [Spec-Driven Development at specdriven.ai](https://specdriven.ai/)
- [Spec-driven development at Wikipedia](https://en.wikipedia.org/wiki/Spec-driven_development)
- [Understanding Spec-Driven-Development: Kiro, spec-kit, and Tessl by Birgitta Böckeler](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html)
- [What is an AI agent? at Google Cloud](https://cloud.google.com/discover/what-are-ai-agents)
