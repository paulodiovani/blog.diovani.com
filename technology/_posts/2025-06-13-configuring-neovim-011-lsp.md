---
layout: post
title: Configuring Neovim 0.11 LSP from scratch
---

With the release of [Neovim 0.11] in March 2025, it now includes full LSP support, requiring only that:

1. A Language Server is available and running
2. The respective LSP client is enabled (and optionally configured)

This makes much easier to configure LSP clients, without the need of any extra plugins -- Although some might still be useful.

Since a lot of people, me included, have been using LSP on Neovim through plugins and custom configurations, it makes hard to write a _one size fits all_ migration, so instead, let's dig into how to configure the new features from scratch, on a clean installation. This method will provide a bare-bones configuration that can be used to migrate from whatever plugins you have in a more understandable way.

# Sources and references

- [Language Server Protocol @ Wikipedia]
- [Migrate to vim.lsp.config (non-breaking) nvim-lspconfig#3483]
- [Neovim 0.11 features]
- [Neovim 0.11]
- [Official page for Language Server Protocol]
- [What's New in Neovim 0.11]
- [feat(lsp): add vim.lsp.config and vim.lsp.enable neovim#31031]

[Language Server Protocol @ Wikipedia]: https://en.wikipedia.org/wiki/Language_Server_Protocol
[Migrate to vim.lsp.config (non-breaking) nvim-lspconfig#3483]: https://github.com/neovim/nvim-lspconfig/issues/3494
[Neovim 0.11 features]: https://neovim.io/doc/user/news-0.11.html
[Neovim 0.11]: https://neovim.io/news/2025/03
[Official page for Language Server Protocol]: https://microsoft.github.io/language-server-protocol/
[What's New in Neovim 0.11]: https://gpanders.com/blog/whats-new-in-neovim-0-11/
[feat(lsp): add vim.lsp.config and vim.lsp.enable neovim#31031]:  https://github.com/neovim/neovim/pull/31031
