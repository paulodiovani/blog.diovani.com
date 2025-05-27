---
layout: post
title: Using AI to become a better developer
image: media/2025/sean-andrews-50-i-m-scared-dave-dec-17-2017-master.jpg
image_credits: https://www.artstation.com/artwork/n5oe6
---

We are living in a transforming era for software development. Since the advent of LLMs (Large Language Models) being used as developer tools, starting around 2022 with OpenAI and gitHub Copilot, we have been presented with a growing number of alternatives that are both incredibly useful and disturbingly invasive for our daily workflows.

While on one side of the coin these new tools help us be more productive, on the other, the term _vibe coding_ started gaining some attention and preoccupying developers and managers that our skills might not be improving or even diminishing since the adoption of such tools.

So the big question is how to leverage productivity using AI while not becoming prisoners to them. -- And we already have excellent articles about this topic, like [Avoiding Skill Atrophy in the Age of AI by Addy Osmani].

I intend here to extend that article a little by sharing my experience and providing some practical examples on how to use AI tools on a daily basis while not being overwhelmed, distracted, or dependent on it.

## My toolset

As I mentioned, there are already plenty of tools to use AI and I don't have time or resources to try all of them. So I'm limiting these examples with the ones I use for Neovim or Terminal, and include some parallel examples for VS Code when possible.

My entire AI toolset when writing this post is composed by:

- [Copilot.lua]
- ~~[Copilot Chat]~~
- [Code Companion] (replacing Copilot Chat)
- [Copilot CLI]
- ~~[Claude Code]~~
- [Aider] (replacing Claude Code)

BTW, the GitHub Copilot is a great option for those who want to start using AI developer tools and don't want to dig into all the options or spend money in several licenses. Copilot is especially good because it allows you to select other models without extra costs -- We will see how to do that later in this post.

## References

- [Timeline of artificial intelligence @ Wikipedia](https://en.wikipedia.org/wiki/Timeline_of_artificial_intelligence)
- [Avoiding Skill Atrophy in the Age of AI by Addy Osmani]

[Aider]: https://github.com/paul-gauthier/aider
[Avoiding Skill Atrophy in the Age of AI by Addy Osmani]: https://addyo.substack.com/p/avoiding-skill-atrophy-in-the-age
[Claude Code]: https://docs.anthropic.com/en/docs/claude-code/overview
[Code Companion]: https://github.com/olimorris/codecompanion.nvim
[Copilot CLI]: https://docs.github.com/en/copilot/using-github-copilot/using-github-copilot-in-the-command-line
[Copilot Chat]: https://github.com/CopilotC-Nvim/CopilotChat.nvim
[Copilot.lua]: https://github.com/zbirenbaum/copilot.lua
