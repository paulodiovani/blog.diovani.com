---
layout: post
title: Using AI to become a better developer
image: media/2025/sean-andrews-50-i-m-scared-dave-dec-17-2017-master.jpg
image_credits: https://www.artstation.com/artwork/n5oe6
---

We are living in a transforming era for software development. Since the advent of LLMs (Large Language Models) being used as developer tools, starting around 2022 with OpenAI and GitHub Copilot, we have been presented with a growing number of alternatives that are both incredibly useful and disturbingly invasive for our daily workflows.

While on one side of the coin these new tools help us be more productive, on the other, the term _Vibe Coding_ started gaining some attention and preoccupying developers and managers that our skills might not be improving or even be diminishing since the adoption of such tools.

So the big question is how to leverage productivity using AI while not becoming prisoners of these tools. -- And we already have excellent articles about this topic, like [Avoiding Skill Atrophy in the Age of AI by Addy Osmani]. -- I intend here to extend that conversation a little further, by sharing my experience and providing some practical examples on how to use AI tools on a daily basis while not being overwhelmed, distracted, or dependent on it.

## But what is "Vibe Coding"?

>  Vibe coding (or vibecoding) is an approach to producing software by depending on artificial intelligence (AI), where a person describes a problem in a few sentences as a prompt to a large language model (LLM) tuned for coding. The LLM generates software based on the description, shifting the programmer's role from manual coding to guiding, testing, and refining the AI-generated source code.[1][2][3] 
>
> -- [Vibe Coding @ Wikipedia]

The term was first introduced by [Andrej Karpathy in his tweet][Vibe Coding by Andrej Karpathy @ X] and refers to the possibility, thanks to LLMs and recent AI tools, to create computer programs without actually typing any code. For this reason, _Vibe Coding_ allows even for non-developers to write software.

It does, however, bring up new concerns, as mentioned above, and even more, like distanciating the gap between a beginner and an experienced developer.

## Using AI for software development

Getting back on track, let me show you some tips and tricks on how to improve your AI tools, and how to use them as part of your existing workflow, not replacing it.

### My toolset

As I mentioned, there are already plenty of tools to use AI and I don't have time or resources to try all of them. So I'm limiting the examples to the ones I use for Neovim or Terminal, and include some parallel examples for VS Code when possible.

My entire AI toolset at the time of writing this post is composed by:

- [Copilot.lua]
- ~~[Copilot Chat]~~
- [Code Companion] (replacing Copilot Chat)
- [Copilot CLI]
- ~~[Claude Code]~~
- [Aider] (replacing Claude Code)

BTW, GitHub Copilot is a great option for those who want to start using AI developer tools and don't want to dig into all the options or spend money in several licenses. Copilot is especially good because it allows you to select other models without extra costs -- We will see how to do that later in this post.

### Understand how AI and LLM works

### Try different models

### Avoid unwanted suggestions

### Customize and improve the System Prompt

### Use AI to build small pieces that are easier to review

### Create samples for AI to follow

### Don't neglect conventional sources or information

## References

- [A Comprehensive Guide to Vibe Coding Tools]
- [Avoiding Skill Atrophy in the Age of AI by Addy Osmani]
- [Coding with GitHub Copilot by Lycas Silve @ The Miners]
- [Intro to Artificial Intelligence by Beatriz Amante @ The Miners]
- [Timeline of artificial intelligence @ Wikipedia](https://en.wikipedia.org/wiki/Timeline_of_artificial_intelligence)
- [Vibe Coding @ Wikipedia]
- [Vibe Coding by Andrej Karpathy @ X]

[A Comprehensive Guide to Vibe Coding Tools]: https://madhukarkumar.medium.com/a-comprehensive-guide-to-vibe-coding-tools-2bd35e2d7b4f
[Aider]: https://github.com/paul-gauthier/aider
[Avoiding Skill Atrophy in the Age of AI by Addy Osmani]: https://addyo.substack.com/p/avoiding-skill-atrophy-in-the-age
[Claude Code]: https://docs.anthropic.com/en/docs/claude-code/overview
[Code Companion]: https://github.com/olimorris/codecompanion.nvim
[Coding with GitHub Copilot by Lycas Silve @ The Miners]: https://blog.codeminer42.com/coding-with-github-copilot/
[Copilot CLI]: https://docs.github.com/en/copilot/using-github-copilot/using-github-copilot-in-the-command-line
[Copilot Chat]: https://github.com/CopilotC-Nvim/CopilotChat.nvim
[Copilot.lua]: https://github.com/zbirenbaum/copilot.lua
[Intro to Artificial Intelligence by Beatriz Amante @ The Miners]: https://blog.codeminer42.com/intro-to-artificial-intelligence/
[Vibe Coding @ Wikipedia]: https://en.wikipedia.org/wiki/Vibe_coding
[Vibe Coding by Andrej Karpathy @ X]: https://x.com/karpathy/status/1886192184808149383
