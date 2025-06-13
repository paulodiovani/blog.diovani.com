---
layout: post
title: Configuring Neovim 0.11 LSP from scratch
image: /assets/media/2025-06-13-configuring-neovim-011-lsp/cover-image.png
---

With the release of [Neovim 0.11] in March 2025, it now includes full LSP support, requiring only that:

1. A Language Server is available on the host
2. The respective LSP client is enabled (and optionally configured)

This makes it much easier to configure LSP clients, without the need for any extra plugins -- although some might still be useful.

Since a lot of people, me included, have been using LSP on Neovim through plugins and custom configurations, it makes it hard to write a _one-size-fits-all_ migration, so instead, let's dig into how to configure the new features from scratch, on a clean installation. This method will provide a bare-bones configuration that can be used to migrate from whatever plugins you have in a more understandable way.

## What is a Language Server?

> The Language Server Protocol (LSP) is an open, JSON-RPC-based protocol for use between source code editors or integrated development environments (IDEs) and servers that provide "language intelligence tools": programming language-specific features like code completion, syntax highlighting and marking of warnings and errors, as well as refactoring routines. The goal of the protocol is to allow programming language support to be implemented and distributed independently of any given editor or IDE. In the early 2020s, LSP quickly became a "norm" for language intelligence tools providers.
> -- [Language Server Protocol @ Wikipedia]

Before [LSP][Official page for Language Server Protocol] became popular, every editor or IDE had to implement its own language features, including autocomplete and documentation, either natively or by plugins. Because of this, deciding on an editor was much more a choice based on the languages it supported than just a personal preference.

Microsoft first created the Language Server Protocol for Visual Studio Code, and in June 2016 announced a collaboration with Red Hat and Codenvy to standardize the protocol's specification. After that, several other editors adopted LSP, including Neovim (starting in version 0.5).

### How LSP works

1. A Language Server runs on a separate process, independent of the editor. This server is responsible for parsing and interpreting a source code file or tree and producing information about it.
2. A tool -- usually an editor or IDE -- communicates with the server using JSON-RPC, sending messages to ask for autocomplete, diagnostics, definition, etc., and receives a response from the server with the relevant information about the code.

Below is an example for how a tool and a language server communicate during a routine editing session:

![lsp-json-rpc](/assets/media/2025-06-13-configuring-neovim-011-lsp/lsp-json-rpc.png)

Of course, the language server must have been installed first, but this can be handled automatically by editor plugins. Some popular Language Servers are `typescript-language-server` (Typescript/JavaScript), `solargraph` (Ruby), `rust-analyzer` (Rust), and `pyright`(Python), just to mention a few. Once installed, the editor or plugin will start the server on demand.

More details on how LSP works can be found in the [LSP overview page].

## LSP on Neovim

### A brief history

Before LSP features were introduced in Neovim 0.5, users would have to rely on plugins for that. Two excellent options were [Conquer of Completion] and [ALE] (which also supports `Vim`). These plugins had their own completion/diagnostics implementation and also included LSP features when they became popular. Both still work today, being used by a lot of people.

When Neovim introduced basic [LSP features in 0.5.0], integration with Language Servers became much easier, requiring just configuration to be used. These configurations were usually managed by the [nvim-lspconfig] plugin, which until its version 2.0.0 was the standard way to configure LSP Clients on Neovim. -- I myself have migrated from ALE, which I used to have in `Vim`, to the built-in LSP using `nvim-lspconfig` some years ago.

The built-in LSP evolved over time, adding more features and fixing issues, until finally in version `0.11` it is fully supported, not requiring any extra plugins. Although `nvim-lspconfig` can still be used to provide standard configurations for various language servers, as we can read in their README:

> nvim-lspconfig is a "data only" repo, providing basic, default Nvim LSP client configurations for various LSP servers.

### Step-by-step configuration using Neovim 0.11

To configure Neovim LSP from scratch, we will be using a clean installation.

> To allow experimenting without affecting existing configurations you can use a different config file (`nvim -u ~/.config/nvim-alternative.lua`) or run from a docker container (`docker run --rm -it archlinux bash`).

#### 1. Install Neovim and any desired language servers

First we need to install `neovim` (if you haven't yet) and the desired language servers. I'll use `typescript-language-server` for the following examples.

```bash
# install on Arch Linux
# check the command for your distribution
pacman -Sy git neovim nodejs npm typescript-language-server

# Check if we have Neovim v0.11 or newer
nvim --version
```

#### 2. Get a Node.js/Typescript project for testing

To be able to test, we need a typescript project. Any project will do, so if you don't have a project at hand, fetch some open source one, such as the old [microsoft/TypeScript-Node-Starter].

```bash
git clone https://github.com/microsoft/TypeScript-Node-Starter.git typescript-project
cd typescript-project
npm install
```

Feel free to check the project.

```bash
nvim
# in Neovim, open Netrw
:30 Lexplore
```

![neovim-ts-project](/assets/media/2025-06-13-configuring-neovim-011-lsp/neovim-ts-project.png)

#### 3. Use a different color scheme

Although not necessary, you might want to select a different color scheme for a better look. Neovim includes some by default, you can use one of them or install a different one.

Create a file at `~/.config/nvim/init.lua` and include these lines.

```lua
-- Neovim config

-- Set colorscheme
vim.cmd [[colorscheme unokai]]
```

![neovim-unokai-colorscheme](/assets/media/2025-06-13-configuring-neovim-011-lsp/neovim-unokai-colorscheme.png)

#### 4. Configure and initialize the LSP Client

Now, add these lines in the `~/.config/nvim/init.lua`.

```lua
-- Configure LSP clients

-- Set default root markers for all clients
vim.lsp.config('*', {
  root_markers = { '.git' },
})

-- Set configuration for typescript language server
vim.lsp.config('ts_ls', {
  cmd = { 'typescript-language-server', '--stdio' },
  filetypes = { 'javascript', 'javascriptreact', 'typescript', 'typescriptreact' },
})

-- Enable Typescript Language Server
vim.lsp.enable('ts_ls')
```

To view other configuration options, check `:help lsp-config`.

Restart your Neovim and run `:checkhealth vim.lsp` to confirm it is active.

![neovim-lsp-active](/assets/media/2025-06-13-configuring-neovim-011-lsp/neovim-lsp-active.png)

#### 5. Usage

Neovim LSP includes some mappings by default.

- Hover `K`
- Autocomplete (omnifunc) `ctrl+x ctrl+o`
- Code actions `gra`

Check other default mappings with `:help lsp-defaults`.

![neovim-lsp-autocomplete](/assets/media/2025-06-13-configuring-neovim-011-lsp/neovim-lsp-autocomplete.png)

You might want to create some extra mappings of your own, I have these, for example:

```vim
" use ctrl+space for code completion with omni function
inoremap <C-Space> <C-x><C-o>
inoremap <C-@> <C-x><C-o>
```

```lua
vim.keymap.set("n", "gD", vim.lsp.buf.definition, { desc = "LSP: Go to definition" })
vim.keymap.set("n", "grt", vim.lsp.buf.type_definition, { desc = "LSP: Type Definition" })
```

### Extra plugins and configurations

This is all that you really need to start using LSP with Neovim 0.11, without any extra plugins.

However, some plugins might be really useful to help set up or configure LSP clients. Here are some of them, with a brief explanation.

- [nvim-lspconfig] is still a good choice, as it provides default configuration for several LSP Clients.
- [mason.nvim] and [mason-lspconfig.nvim] allows installing and configuring Language Server from within Neovim.
- [nvim-cmp] and [nvim-cmp-lsp] provides extra completion features with a better UI.
- [fzf-lua] or [telescope.nvim] can use custom pickers for code actions or other selectable options.

## Conclusion

The intention of this article is to both show how Neovim 0.11 can use Language Server without any extra plugins, and to provide a concise way to set up LSP clients, allowing users to either start from scratch or migrate their old setups without digging into specific migration guides.

However, if you have an old setup that still works, think twice before migrating. Built-in Neovim LSP might have a simpler setup or even be faster, but it is not a required upgrade as long as alternative plugins are not deprecated.

## Sources and references

- [LSP & Neovim; A Retrospective!]
- [Language Server Protocol @ Wikipedia]
- [Migrate to vim.lsp.config (non-breaking) nvim-lspconfig#3483]
- [Neovim 0.11 features]
- [Neovim 0.11]
- [Official page for Language Server Protocol]
- [What's New in Neovim 0.11]
- [feat(lsp): add vim.lsp.config and vim.lsp.enable neovim#31031]

[ALE]: https://github.com/dense-analysis/ale
[Conquer of Completion]: https://github.com/neoclide/coc.nvim
[LSP & Neovim; A Retrospective!]: https://www.vikasraj.dev/blog/lsp-neovim-retrospective
[LSP features in 0.5.0]: https://github.com/neovim/neovim/commit/a5ac2f45ff84a688a09479f357a9909d5b914294
[LSP overview page]: https://microsoft.github.io/language-server-protocol/overviews/lsp/overview/
[Language Server Protocol @ Wikipedia]: https://en.wikipedia.org/wiki/Language_Server_Protocol
[Migrate to vim.lsp.config (non-breaking) nvim-lspconfig#3483]: https://github.com/neovim/nvim-lspconfig/issues/3494
[Neovim 0.11 features]: https://neovim.io/doc/user/news-0.11.html
[Neovim 0.11]: https://neovim.io/news/2025/03
[Official page for Language Server Protocol]: https://microsoft.github.io/language-server-protocol/
[What's New in Neovim 0.11]: https://gpanders.com/blog/whats-new-in-neovim-0-11/
[feat(lsp): add vim.lsp.config and vim.lsp.enable neovim#31031]:  https://github.com/neovim/neovim/pull/31031
[fzf-lua]: https://github.com/ibhagwan/fzf-lua
[mason-lspconfig.nvim]: https://github.com/mason-org/mason-lspconfig.nvim
[mason.nvim]: https://github.com/mason-org/mason.nvim
[microsoft/TypeScript-Node-Starter]: https://github.com/microsoft/TypeScript-Node-Starter
[nvim-cmp-lsp]: https://github.com/hrsh7th/cmp-nvim-lsp
[nvim-cmp]: https://github.com/hrsh7th/nvim-cmp
[nvim-lspconfig]: https://github.com/neovim/nvim-lspconfig
[telescope.nvim]: https://github.com/nvim-telescope/telescope.nvim
