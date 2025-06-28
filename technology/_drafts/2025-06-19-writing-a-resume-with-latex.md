---
layout: post
title: Using LaTeX to Write a Beautiful, Clean, and Professional Resume
image: /assets/media/2025-06-19-writing-a-resume-with-latex/latex-project-logo.svg
---

I've come from a generation that used to print their resumes to be delivered personally to a company's office. Of course, that was before the COVID-19 Pandemic, when most of us, developers, used to work on-site.

Today we just send the PDF version of our resumes by email, and even have tools that can help us create one, such as exporting the PDF versions of our [LinkedIn] profiles, or using an AI to create one based on a detailed description or another source.

But writing your own resume has its benefits. You have more control over the content, formatting, and styles; you will naturally review the content whenever you update it and can improve the text; and you can more easily adjust it for the role you seek.

To write your own resume you can use whatever text editor you want, and the most obvious choice is to use a WYSIWYG editor, like MS Word, LibreOffice, or Google Docs. But there is another great option, which I recently started using, and makes a developer (or a scientist) feel much more at home when writing: [LaTeX].

## Why LaTeX?

[LaTeX] (read _Lay-tech_) is a typesetting system originally designed for production of technical or scientific documentation, and it is widely used to write articles, papers, books, or slides, usually exported as PDF.

Different from formats like _Open Document_ or _Office Open XML_, LaTeX is intended to be written using a plain text editor, and have tools to help with its syntax and packages, such as [TexLab] -- A [Language Server Protocol] implementations for LaTeX. For these reasons, writing LaTeX is very similar to writing a computer program using a programming language.

Besides that, it is very easy to separate content from presentation, so you can change the design of your resume without having to copy-paste its content if needed.

### Setup and required tools

To start writing with LaTeX on your own computer, you just need:

1. A text editor. It can be any text editor of your choice, like Neovim or VS Code.
2. A [TeX Live] distribution.
3. (Optional) [TexLab] or some editor plugin.

Alternatively, if you prefer to use web-based tools or just want to write a few documents:

1. Create an account and use [Overleaf].

## Writing a resume using LaTeX

### The fast and easy way

If you're in a hurry or just don't want to dig too much into the [TeX] language specifics, just pick up one of the [resume templates from Overleaf].

Either download/copy its contents or open in Overleaf itself. Edit its contents, and render the PDF with `pdflatex Your_Name_Resume.tex`.

### The do-it-yourself way

If you, on the other hand, prefer to write your resume from the top down, create a file with named `Your_Name_Resume.tex` (e.g. `Tony_Stark_Resume.tex`) and start writing.

Of course, this post would not be complete without a step-by-step tutorial, so we'll be creating a simple example resume below, using a fantasy character, and explaining some of the concepts behind Tex and LaTeX.

I'm not going into detail about each syntax or command. For more details, check the LaTeX documentation at [The LaTeX Project][LaTeX], the [Overleaf Documentation], or package-specific documentation on [CTAN].

#### The document preamble

The **preamble** is the part of the document that comes before the `\begin{document}` environment. It's where you define the document's structure, style, and any packages or macros you want to use.

The minimum to start writing is as follows.

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

  New York, NY • tony@tonystarkindustries.com • (212) 555-IRON \\
  www.tonystarkindustries.com \\
  LinkedIn: /tonystark • GitHub: /ironmantech
\end{document}
```

Anything that starts with `\` is a command. Commands can receive options between `[]` or arguments, either by following the command or inside `{}`.

Environments are sections with typesetting effects to be applied, and are written between the `\begin{name}` and `\end{name}` commands, where `name` is the environment name. There are some predefined environments, with `document` being the most important, as it holds most of the document content.

New paragraphs are started with double blank lines. Intentional line breaks can be included with `\\`, while `\break` is a page break.

We will update the preamble when we need to update the document format or include features for other packages.

#### Writing sections

The `\section`, `\subsection`, and `\subsubsection` are commands used to split the content of the document into different sections, define the section title and, if wanted, produce a table of contents for them.

We will be using the `*` version of these commands (`\section*`, `\subsection*`, ...), which omits the numbering. Let's also use the `itemize` environment to create some lists.

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

  New York, NY • tony@tonystarkindustries.com • (212) 555-IRON \\
  www.tonystarkindustries.com \\
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

Now edit your version with your own info. Notice that special characters like `&` must be escaped with a `\`.

Once you have done editing, use the `pdflatex` command to generate a PDF file. This command creates some references on first run that are used later, so the recommendation is to run it twice.

```bash
pdflatex Tony_Stark_Resume.tex
pdflatex Tony_Stark_Resume.tex
```

This will generate the `Tony_Stark_Resume.pdf` file on the same directory.

Here is the PDF version for a quick view.

<object data="/assets/media/2025-06-19-writing-a-resume-with-latex/v1/Tony_Stark_Resume.pdf" width="100%" height="400" type='application/pdf'></object>

#### Changing font and styles

Now our resume is complete, but it is rather plain. To change styles and make it look better we can use a different set of packages.

- `enumitem` is used to redefine spacing in lists
- `fancyhdr` allows customizing headers and footers
- `fontawesome` allows using [Font Awesome] icons
- `geometry` is used to set page size and margins.
- `hyperref` allows adding hyperlinks to the document
- `lastpage` creates a reference for the last page
- `titlesec` allows customizing section titles styles
- `xcolor` allows using different colors in the document
- LaTeX includes some font packages, for example, `FiraSans`

These are all included with TeX Live, so there is no need to install anything new. If you want, however, some extra packages that are not included, follow their installation instructions. Note that for some packages to work it is necessary to use an alternative command, usually `xelatex` or `lualatex`.

Some commands can be used to customize text as well.

- `\textsc` small caps
- `\textit` italic
- `\textbf` bold
- `\huge`, `Large`, `large` big text
- `\small` small text

Here are the included lines in the preamble, changing font, margins, title styles, and links.

```tex
\usepackage[left = 25.4mm, right = 25.4mm, top = 25.4mm, bottom = 25.4mm]{geometry}
\usepackage[colorlinks = true, urlcolor = black, linkcolor = black]{hyperref}
\usepackage{enumitem}
\usepackage{fancyhdr}
\usepackage{fontawesome}
\usepackage{lastpage}
\usepackage{titlesec}
\usepackage{xcolor}

\setlist{parsep = 0pt, topsep = 0pt, partopsep = 1pt, itemsep = 1pt, leftmargin = 6mm, label = $\diamond$}

\setlength\parindent{0mm}

\usepackage{FiraSans}
\renewcommand{\familydefault}{\sfdefault}

\definecolor{cvblue}{HTML}{304263}

\titleformat{\section}{\Large\color{cvblue}}{\thesection}{1em}{\textsc}[\vspace*{-1.5ex}\hrulefill]
\titleformat{\subsection}{\large}{\thesubsection}{1em}{\textbf}

\pagestyle{fancy}
\fancyhf{} % clear existing header/footer entries
\renewcommand{\headrulewidth}{0pt}
\fancyfoot[R]{page \thepage \hspace{1pt} of \pageref{LastPage}}
```

And for the name and contact information, including font awesome icons.

```tex
  \begin{center}
    \Large Tony \textbf{\textsc{Stark}}\normalsize
  \end{center}

  \textsc{New York, NY} •
  \faEnvelope\ \href{mailto:tony@starkindustries.com}{tony@starkindustries.com} •
  \faPhone\ (212) 555-IRON \\
  \faGlobe\ \href{https://www.starkindustries.com}{www.starkindustries.com} •
  \faLinkedin\ \href{http://www.linkedin.com/tonystark}{/tonystark} •
  \faGithub\ \href{http://github.com/ironmantech}{/ironmantech}
```

<object data="/assets/media/2025-06-19-writing-a-resume-with-latex/v2/Tony_Stark_Resume.pdf" width="100%" height="400" type='application/pdf'></object>

#### Creating custom commands

It is already much better, but our `\subsection` headers do not look great, and since they have several elements (role, company, dates) we could use different styles for each.

One way of doing that is to create a custom command with the `\newcommand` command. This allows encapsulating formatting for reuse with minimal repetition. Another option is using the `\renewcommand`, which acts the same, but allows changing existing commands.

Let's create a `\titleelements` command to allow displaying elements with different styles for a subsection.

```tex
\newcommand\titleelements[4]{
  \textsc{#1} at \textit{#2} \\
  #3 \hfill\mbox{\textbf{#4}}
}
```

And update our subsections like this:

```tex
\subsection*{
  \titleelements{CEO \& Founder}{Stark Industries}{New York, NY}{1998 – Present}
}
```

<object data="/assets/media/2025-06-19-writing-a-resume-with-latex/v3/Tony_Stark_Resume.pdf" width="100%" height="400" type='application/pdf'></object>

#### Adding a sidebar

It already looks great. It is legible and well organized. But we can do better.

So let's include a sidebar -- LinkedIn style -- to grab attention for our personal info and skills, while leaving the main area for the rest.

There are several ways of doing this, like using the `minipage` or `wrapfigure` packages, but they struggle to work with page breaks. The `tcolorbox` package works fine with page breaks, but only if all columns have enough content. What worked best for me was using the `paracol` package along with `tikz` to draw a background.

First, update or add the following to the preamble. Notice we also reduced the margins to better fit the columns in the page.

```tex
\usepackage[left = 6mm, right = 12mm, top = 6mm, bottom = 12mm]{geometry}
\usepackage[colorlinks = true, urlcolor = white, linkcolor = white]{hyperref}
\usepackage[explicit]{titlesec}
\usepackage{paracol}
\usepackage{tikz}

\setlength{\footskip}{6mm}
\fancyfoot[R]{page \thepage \hspace{1pt} of \pageref*{LastPage}}

% Add a sidebar background to every page
\AddToHook {shipout/background}{
  \begin{tikzpicture}[remember picture, overlay]
    \fill[cvblue]
      (current page.north west) rectangle
      ([xshift=0.3\textwidth + 12mm]current page.south west);
  \end{tikzpicture}
}
```

Then, wrap the left and right contents with the `paracol` environment, then with the `leftcolumn` and `rightcolumn` environments.

We are using different title formats for the left and right columns, so we are defining them inside the environments.

```tex
\begin{document}
  \setcolumnwidth{0.3\textwidth}
  \setlength\columnsep{18mm}

  \begin{paracol}{2}
    \begin{leftcolumn}
      \color{white}
      \titleformat{\section}{\color{white}}{\thesection}{1em}{\textbf{\textsc{#1}}}[\vspace*{-1.5ex}\hrulefill\vspace*{-1ex}]

      % left content
    \end{leftcolumn}

    \begin{rightcolumn}
      \titleformat{\section}{\Large\color{cvblue}}{\thesection}{1em}{\textsc{#1}}[\vspace*{-1.5ex}\hrulefill]
      \titleformat{\subsection}{}{\thesubsection}{1em}{#1}

      % right content
    \end{rightcolumn}
  \end{paracol}
\end{document}
```

Here is the final TeX document.

```tex
% !TeX spellcheck = en_US
% !TeX program = pdflatex
%
% Author: Paulo Diovani (paulodiovani, blog.diovani.com)

\documentclass[11pt, a4paper]{article}

\usepackage[T1]{fontenc}
\usepackage[utf8]{inputenc}
\usepackage[english]{babel}
\usepackage[stretch = 25, shrink = 25, tracking=true, letterspace=30]{microtype}
\usepackage[left = 6mm, right = 12mm, top = 6mm, bottom = 12mm]{geometry}
\usepackage[colorlinks = true, urlcolor = white, linkcolor = white]{hyperref}
\usepackage[explicit]{titlesec}
\usepackage{enumitem}
\usepackage{fancyhdr}
\usepackage{fontawesome}
\usepackage{lastpage}
\usepackage{paracol}
\usepackage{tikz}
\usepackage{xcolor}

\setlist{parsep = 0pt, topsep = 0pt, partopsep = 1pt, itemsep = 1pt, leftmargin = 6mm, label = $\diamond$}

\setlength\parindent{0mm}

\usepackage{FiraSans}
\renewcommand{\familydefault}{\sfdefault}

\definecolor{cvblue}{HTML}{304263}

\newcommand\titleelements[4]{
  \textsc{#1} at \textit{#2} \\
  #3 \hfill\mbox{\textbf{#4}}
}

\pagestyle{fancy}
\fancyhf{} % clear existing header/footer entries
\renewcommand{\headrulewidth}{0pt}
\setlength{\footskip}{6mm}
\fancyfoot[R]{page \thepage \hspace{1pt} of \pageref*{LastPage}}

% Add a sidebar to every page
\AddToHook {shipout/background}{
  \begin{tikzpicture}[remember picture, overlay]
    \fill[cvblue]
      (current page.north west) rectangle
      ([xshift=0.3\textwidth + 12mm]current page.south west);
  \end{tikzpicture}
}

\begin{document}
  \setcolumnwidth{0.3\textwidth}
  \setlength\columnsep{18mm}

  \begin{paracol}{2}
    \begin{leftcolumn}
      \color{white}
      \titleformat{\section}{\color{white}}{\thesection}{1em}{\textbf{\textsc{#1}}}[\vspace*{-1.5ex}\hrulefill\vspace*{-1ex}]

      \Large Tony \textbf{\textsc{Stark}}\normalsize

      \section*{Contact Info}
      \faMapPin\ \textsc{New York, NY} \\
      \faEnvelope\ \href{mailto:tony@tonystarkindustries.com}{tony@tonystarkindustries.com} \\
      \faPhone\ (212) 555-IRON \\
      \faGlobe\ \href{https://www.tonystarkindustries.com}{www.tonystarkindustries.com} \\
      \faLinkedin\ \href{http://www.linkedin.com/tonystark}{/tonystark} \\
      \faGithub\ \href{http://github.com/ironmantech}{/ironmantech}

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
    \end{leftcolumn}

    \begin{rightcolumn}
      \titleformat{\section}{\Large\color{cvblue}}{\thesection}{1em}{\textsc{#1}}[\vspace*{-1.5ex}\hrulefill]
      \titleformat{\subsection}{}{\thesubsection}{1em}{#1}

      \section*{Summary}
      Visionary technologist, entrepreneur, and inventor with decades of experience in advanced robotics, artificial intelligence, energy systems, and defense technologies. Proven leader with a history of building billion-dollar enterprises, launching transformative technologies, and directing global-level initiatives. Equally adept in executive leadership, R\&D, and direct field application.

      \section*{Experience}
        \subsection*{
          \titleelements{CEO \& Founder}{Stark Industries}{New York, NY}{1998 – Present}
        }
        \begin{itemize}
          \item Transformed a traditional weapons manufacturer into a global leader in clean energy, AI, and cutting-edge consumer technologies.
          \item Developed the Iron Man Armor Series, featuring proprietary arc reactor technology, smart targeting, autonomous flight, and life support systems.
          \item Led R\&D teams in the creation of J.A.R.V.I.S., F.R.I.D.A.Y., and multiple other AI platforms.
          \item Oversaw the transition of Stark Industries from military contracts to sustainable technology leadership after initiating the company’s ethical pivot.
          \item Negotiated strategic partnerships with S.H.I.E.L.D., Wakandan Design Group, and the U.S. Government.
        \end{itemize}

        \subsection*{
          \titleelements{Founder \& Founding Member}{Avengers Initiative}{\phantom{}}{2008 – Present}
        }
        \begin{itemize}
          \item Coordinated high-level operations as a founding Avenger, addressing planetary and interdimensional threats.
          \item Engineered team support technologies, including the Avengers Tower Command Center, Hulkbuster armor, and global threat-monitoring networks.
          \item Led crisis response during the Battle of New York, Ultron Uprising, and Infinity Conflict.
        \end{itemize}

      \section*{Education}
        \subsection*{
          \titleelements{Bachelor of Science in Electrical Engineering and Physics}{Massachusetts Institute of Technology (MIT)}{\phantom{}}{Graduated at age 17}
        }

      \section*{Additional Information}
      \begin{itemize}
        \item Security Clearance: Level 10 (former) – S.H.I.E.L.D.
        \item Languages: English (native), fluent in machine code, some Wakandan dialect
        \item Hobbies: Vintage car restoration, cocktail crafting, extreme sports
        \item Known Aliases: Iron Man
      \end{itemize}
    \end{rightcolumn}
  \end{paracol}
\end{document}
```

And the generated PDF.

<object data="/assets/media/2025-06-19-writing-a-resume-with-latex/v4/Tony_Stark_Resume.pdf" width="100%" height="400" type='application/pdf'></object>

#### Further steps

If your resume is too large to write everything in a single file, split the sections into smaller files and include them with the `\input{path/to/file}` command. If you want to add a picture, use the `graphicx` package.

There are plenty other options or formatting to explore. You can even keep two or more layouts for different occasions, and swap them without touching the content.

I hope this blog post serves as both an introduction to LaTeX and a source of ideas for creating a good-looking, clear, and readable resume for your needs.

## Source and References

- [A Beginner's Guide to LaTeX for ATS-friendly resumes]
- [CTAN Comprehensive TeX Archive Network][CTAN]
- [Overleaf Documentation]
- [TeX User Group]
- [The LaTeX Project][LaTeX]

- Tony Stark Resume contents created by [ChatGPT]. Here is the prompt used:

  > Write a resume for Tony Stark, based on the Marvel Comics Character.

[A Beginner's Guide to LaTeX for ATS-friendly resumes]: https://medium.com/@subhanusroy/a-beginners-guide-to-latex-for-ats-friendly-resumes-ab0919930a30
[CTAN]: https://ctan.org/
[ChatGPT]: https://chatgpt.com
[Font Awesome]: https://fontawesome.com/
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
