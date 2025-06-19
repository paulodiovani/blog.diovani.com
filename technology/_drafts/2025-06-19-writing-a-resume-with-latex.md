---
layout: post
title: Writing a Resume with LaTeX
image: /assets/media/2025-06-19-writing-a-resume-with-latex/latex-project-logo.svg
---

I've come from a generation that used to print their resumes to be delivered personally to a company's office. Of course, that was before the COVID-19 Pandemic, when most of us, developers, used to work on-site.

Today we just send the PDF version of our resume by e-mail, and even have tools that can help create one, such as exporting the PDF versions of your [LinkedIn] profile, or using an AI tool to create one based on a detailed description or another source.

But writing your own resume have its benefits. You have more control over the content, formatting, and styles; you will naturally review the content whenever you update it and can improve the text; and you can more easily adjust it for the role you seek.

To write your own resume you can use whatever text editor you want, and the most obvious choice is to use a WYSIWYG editor, like MS Word, LibreOffice, or Google Docs. But there is another great option, which I recently started using, which makes a developer (or a scientist) feel much more at home when writing: [LaTeX].

## Why LaTeX?

[LaTeX] (read _Lay-tech_) is a typesetting system originally designed for production of technical or scientific documentation, and it is widely used to write articles, papers, books, or slides, usually exported as PDF.

Different from formats like _Open Document_ or _Office Open XML_, LaTeX is intended to be written using a plain text editor, and have tools to help with its syntax and packages, such as [TexLab] -- A [Language Server Protocol] implementations for LaTeX. For these reasons, writing LaTeX is very similar to write a computer program using a programming language.

Besides that, it is very easy to separate content from presentation, so you can change the design of your resume without having to copy-paste its content if needed.

### Setup and required tools

To starting writing with LaTeX in your own computer, you just need:

1. A text editor. It can be any text editor of your choice, like Neovim or VS Code.
2. A [TeX Live] distribution.
3. (Optional) [TexLab] or some editor plugin.

Alternative, if you prefer to use web-based tools or just want to write a few documents:

1. Create an account and use [Overleaf].

## Writing a resume using LaTeX

### The fast and easy way

If you're in a hurry or just don't want to dig too much into the [TeX] language specifics, just pick up one of the [resume templates from Overleaf].

Either download/copy its contents or edit in Overleaf itself. Edit its contents, and render the PDF with `pdflatex Your_Name_Resume.tex`.

### The do-it-yourself way

If you, OTOH, prefer to write your resume from top down, create a file with named `Your_Name_Resume.tex` extensions (e.g. `Tony_Stark_Resume.tex`) and start writing.

Of couse, this post would not complete without a step-by-step tutorial, so we'll be creating a simple resume as example below, using a fantasy character, and explaining some of the concepts behind Tex and LaTeX.

I'm not going deep about each syntax or command. Please, check the LaTeX documentation at [The LaTeX Project][LaTeX] or the [Overleaf Documentation] for details.

#### The document preamble

The **preamble** is the part of the document that comes before the `\begin{document}` command. It's where you define the document's structure, style, and any packages or macros you want to use.

The minimum to start writing is as follows.


Now editor you version to
```tex
\documentclass[11pt, a4paper]{article} 

\usepackage[T1]{fontenc}
\usepackage[utf8]{inputenc}
\usepackage[english]{babel}
\usepackage[stretch = 25, shrink = 25, tracking=true, letterspace=30]{microtype}  

\setlength\parindent{0mm}

\begin{document}
  \begin{center}
    \huge \textbf{Tony Stark}
  \end{center}

  New York, NY • tony@starkindustries.com • (212) 555-IRON \\
  www.starkindustries.com \\
  LinkedIn: /tonystark • GitHub: /ironmantech
\end{document}
```

Anything that starts with `\` is a command. Commands can receive options between `[]` or arguments, either by following the command or inside `{}`.

Environments are sections with typesetting effects to be applied, and are written between the `\begin{name}` and `\end{name}` commands, where `name` is the environment name. There are some predefined environments, being `document` the most important, which holds most of the document content.

New paragraphs are started with double blank lines. Intentional line breaks can be included with `\\`, while `\break` is a page break.

We will update the preamble when we need to update the document format or include features for other packages.

#### Writing sections

The `\section`, `\subsection` and `\subsubection` are commands used to split the content of the document into different sections and, if wanted, produce a table of contents for them.

We will be using the `*` version of these commands (`\section*`, `\subsection*`, ...), which omits the numbering. Let's also use the `itemize` environment to creater some lists.

```tex
\documentclass[11pt, a4paper]{article} 

\usepackage[T1]{fontenc}
\usepackage[utf8]{inputenc}
\usepackage[english]{babel}
\usepackage[stretch = 25, shrink = 25, tracking=true, letterspace=30]{microtype}  

\setlength\parindent{0mm}

\begin{document}
  \begin{center}
    \huge \textbf{Tony Stark}
  \end{center}

  New York, NY • tony@starkindustries.com • (212) 555-IRON \\
  www.starkindustries.com \\
  LinkedIn: /tonystark • GitHub: /ironmantech

  \section*{Summary}
  Visionary technologist, entrepreneur, and inventor with decades of experience in advanced robotics, artificial intelligence, energy systems, and defense technologies. Proven leader with a history of building billion-dollar enterprises, launching transformative technologies, and directing global-level initiatives. Equally adept in executive leadership, R\&D, and direct field application.

  \section*{Core Competences}
  \begin{itemize}
    \item Artificial Intelligence \& Robotics
    \item Advanced Weapon Systems
    \item Sustainable Clean Energy
    \item Aerospace Engineering
    \item Crisis Management \& Tactical Leadership
    \item Public Speaking \& Government Liaison
    \item Cybersecurity \& Defense Infrastructure
    \item Strategic Innovation \& IP Development
  \end{itemize}

  \section*{Experience}
    \subsection*{CEO \& Founder \\
      Stark Industries, New York, NY \\
      1998 – Present}
    \begin{itemize}
      \item Transformed a traditional weapons manufacturer into a global leader in clean energy, AI, and cutting-edge consumer technologies.
      \item Developed the Iron Man Armor Series, featuring proprietary arc reactor technology, smart targeting, autonomous flight, and life support systems.
      \item Led R\&D teams in the creation of J.A.R.V.I.S., F.R.I.D.A.Y., and multiple other AI platforms.
      \item Oversaw the transition of Stark Industries from military contracts to sustainable technology leadership after initiating the company’s ethical pivot.
      \item Negotiated strategic partnerships with S.H.I.E.L.D., Wakandan Design Group, and the U.S. Government.
    \end{itemize}

    \subsection*{Co-Founder \& Founding Member \\
      Avengers Initiative, Global \\
      2008 – Present}
    \begin{itemize}
      \item Coordinated high-level operations as a founding Avenger, addressing planetary and interdimensional threats.
      \item Engineered team support technologies, including the Avengers Tower Command Center, Hulkbuster armor, and global threat-monitoring networks.
      \item Led crisis response during the Battle of New York, Ultron Uprising, and Infinity Conflict.
    \end{itemize}

  \section*{Education}
    \subsection*{Massachusetts Institute of Technology (MIT) \\
      Bachelor of Science in Electrical Engineering and Physics}
    Graduated at age 17

  \section*{Additional Information}
  \begin{itemize}
    \item Security Clearance: Level 10 (former) – S.H.I.E.L.D.
    \item Languages: English (native), fluent in machine code, some Wakandan dialect
    \item Hobbies: Vintage car restoration, cocktail crafting, extreme sports
    \item Known Aliases: Iron Man
  \end{itemize}
\end{document}
```

#### Generating a PDF

Now editor you version with your info. Notice that special characters like `&` must be escaped with a `\`.

Once you have done editing, use the `pdflatex` command to generate a PDF file. This command creates some meta files on first run that are used later, so the recommendation is to run it twice.

```bash
pdflatex Tony_Stark_Resume.tex
pdflatex Tony_Stark_Resume.tex
```

This will generate the `Tony_Stark_Resume.pdf` file on the same directory.

Here is the PDF version for a quick view.

<object data="/assets/media/2025-06-19-writing-a-resume-with-latex/v1/Tony_Stark_Resume.pdf" width="100%" height="400" type='application/pdf'></object>

## Source and References

- Tony Stark Resume contents created by [ChatGPT]
- [A Beginner's Guide to LaTeX for ATS-friendly resumes]
- [Overleaf Documentation]
- [TeX User Group]
- [The LaTeX Project][LaTeX]

[A Beginner's Guide to LaTeX for ATS-friendly resumes]: https://medium.com/@subhanusroy/a-beginners-guide-to-latex-for-ats-friendly-resumes-ab0919930a30
[ChatGPT]: https://chatgpt.com
[LaTex]: https://www.latex-project.org/
[Language Server Protocol]: https://microsoft.github.io/language-server-protocol
[LinkedIn]: https://www.linkedin.com/
[Overleaf Documentation]: https://www.overleaf.com/learn
[Overleaf]: https://www.overleaf.com/
[TeX Live]: https://www.tug.org/texlive/
[TeX User Group]: https://tug.org/
[TeX]: https://en.wikipedia.org/wiki/TeX
[TexLab]: https://github.com/latex-lsp/texlab
[resume templates from Overleaf]: https://www.overleaf.com/latex/templates?q=resume
