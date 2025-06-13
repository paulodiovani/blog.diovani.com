---
layout: post
title: Configuring Neovim 0.11 LSP from scratch
---

With the release of [Neovim 0.11] in March 2025, it now includes full LSP support, requiring only that:

1. A Language Server is available and running
2. The respective LSP client is enabled (and optionally configured)

This makes much easier to configure LSP clients, without the need of any extra plugins -- Although some might still be useful.

Since a lot of people, me included, have been using LSP on Neovim through plugins and custom configurations, it makes hard to write a _one size fits all_ migration, so instead, let's dig into how to configure the new features from scratch, on a clean installation. This method will provide a bare-bones configuration that can be used to migrate from whatever plugins you have in a more understandable way.

## What is a Language Server?

> The Language Server Protocol (LSP) is an open, JSON-RPC-based protocol for use between source code editors or integrated development environments (IDEs) and servers that provide "language intelligence tools": programming language-specific features like code completion, syntax highlighting and marking of warnings and errors, as well as refactoring routines. The goal of the protocol is to allow programming language support to be implemented and distributed independently of any given editor or IDE. In the early 2020s, LSP quickly became a "norm" for language intelligence tools providers.
> -- [Language Server Protocol @ Wikipedia]

Before [LSP][Official page for Language Server Protocol] became popular, every editor or IDE had to implement its own language features, including autocomplete and documentation, either natively or by plugins. Because if this, deciding by an editor was much more a choice among the languages it supported than just a personal preference.

Microsoft first created the Language Server Protocol for Visual Studio Code, and in June 2016 announced a collaboration with Red Hat and Codenvy to standardize the protocol's specification. After that, several other editors adopted LSP, including Neovim (starting in version 0.5).

### How LSP works

1. A Language Server runs on a separate process, independent of the editor. This server is responsible by parsing and interpreting a source code file or tree and produces information about it.
2. A tool -- usually an editor or IDE -- communicates with the server using JSON-RPC, sending messages to ask for autocomplete, diagnostics, definition, etc., and receives a response from the server with the relevant information about the code.

Below is an example for how a tool and a language server communicate during a routine editing session:

![lsp-json-rpc](/assets/media/2025-06-13-configuring-neovim-011-lsp/lsp-json-rpc.png)

Of course, the language server must have been installed first, but this can be handled automatically by editor plugins. Some popular Language Servers are `typescript-language-server` (Typescript/JavaScript), `solargraph` (Ruby), `rust-analyzer` (Rust), and `pyright`(Python), just to mention some.

More details on how LSP works can be read in the [LSP overview page].

## LSP on Neovim

### A brief history

### Step by step config using Neovim 0.11

## Conclusion

## Sources and references

- [LSP & Neovim; A Retrospective!]
- [Language Server Protocol @ Wikipedia]
- [Migrate to vim.lsp.config (non-breaking) nvim-lspconfig#3483]
- [Neovim 0.11 features]
- [Neovim 0.11]
- [Official page for Language Server Protocol]
- [What's New in Neovim 0.11]
- [feat(lsp): add vim.lsp.config and vim.lsp.enable neovim#31031]

[LSP & Neovim; A Retrospective!]: https://www.vikasraj.dev/blog/lsp-neovim-retrospective
[LSP overview page]: https://microsoft.github.io/language-server-protocol/overviews/lsp/overview/
[Language Server Protocol @ Wikipedia]: https://en.wikipedia.org/wiki/Language_Server_Protocol
[Migrate to vim.lsp.config (non-breaking) nvim-lspconfig#3483]: https://github.com/neovim/nvim-lspconfig/issues/3494
[Neovim 0.11 features]: https://neovim.io/doc/user/news-0.11.html
[Neovim 0.11]: https://neovim.io/news/2025/03
[Official page for Language Server Protocol]: https://microsoft.github.io/language-server-protocol/
[What's New in Neovim 0.11]: https://gpanders.com/blog/whats-new-in-neovim-0-11/
[feat(lsp): add vim.lsp.config and vim.lsp.enable neovim#31031]:  https://github.com/neovim/neovim/pull/31031
