# md2pdf

![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-1.1.0-orange?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-blue?style=for-the-badge&logo=typescript&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-Vanilla-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Node](https://img.shields.io/badge/Node-18.0+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Platform](https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey?style=for-the-badge)

A comprehensive TypeScript-based tool that converts Markdown files to PDF with full support for Mermaid diagrams, math equations, syntax highlighting, and custom themes.

> **Fully Functional CLI & Library API** — supports basic, extended, and GitHub-Flavored Markdown out of the box.

---

## Description

Document generation often requires stitching together multiple tools to render diagrams, equations, and code blocks correctly. **md2pdf** solves this by bundling `markdown-it`, `mermaid`, `katex`, and `puppeteer` into a unified pipeline. 

It accepts input via CLI arguments or programmatic API, compiles the markdown, applies one of 12 professional CSS themes, and renders a polished PDF.

---

## Features

| Feature | Details |
| --- | --- |
| **Mermaid diagrams** | Full support for Flowcharts, Sequence diagrams, Gantt charts, etc. |
| **Math equations** | KaTeX support for inline (`$`) and block (`$$`) math equations |
| **Syntax highlighting** | Highlights 190+ programming languages via `highlight.js` |
| **GitHub-Flavored Markdown** | Tables, task lists, footnotes, and more |
| **12 Professional Themes** | Includes styles like `google`, `microsoft-365`, `github`, and `academic` |
| **Custom Themes** | Pass custom CSS or variables to match corporate branding |
| **PDF Options** | Configurable page size (A4, Letter, etc.), orientation, margins |
| **Batch Conversion** | Wildcard matching to convert multiple files at once |
| **Dual Interface** | Use it as a CLI tool or import it as a Node.js library (`MarkdownConverter`) |

---

## Installation

Clone or navigate to the repository and install dependencies:

```bash
cd src/md2pdf
npm install
npm run build
```

**Requires Node.js 18.0+**

---

## Usage

```console
node dist/cli.js <input> [output] [options]

Arguments:
  <input>               Input markdown file
  [output]              Output PDF file (optional, defaults to input name with .pdf)

Options:
  -t, --theme <theme>   Theme to use (default, github, academic, minimal, dark, corporate, ibm, technical-report, book, executive-report, google, microsoft-365)
  -p, --page-size <size> Page size (A4, A3, A5, Letter, Legal, Tabloid)
  -o, --orientation <o>  Page orientation (portrait, landscape)
  -m, --margins <m>      Page margins (e.g., "20mm" or "20mm 30mm 20mm 30mm")
  --no-mermaid          Disable Mermaid diagram rendering
  --no-math             Disable math equation rendering
  --no-syntax-highlight Disable syntax highlighting
  --toc                 Enable table of contents
  --title <title>       Document title
  --author <author>     Document author
  --header-footer       Display header and footer
  --config <path>       Path to JSON configuration file
  -v, --verbose         Verbose output
  -h, --help            Show help and exit
```

If no arguments are provided, the help message is displayed.

---

## Usage Examples

### Convert a file with the Google Material theme

```bash
node dist/cli.js input.md output.pdf --theme google
```

### Advanced layout flags

```bash
node dist/cli.js report.md report.pdf --theme academic --page-size A4 --orientation portrait --margins "25mm"
```

### Batch conversion

```bash
node dist/cli.js batch "*.md" --output-dir ./pdfs --theme microsoft-365
```

### Using a JSON configuration file

Create a `config.json` file:

```json
{
  "theme": "github",
  "pageSize": "A4",
  "enableMermaid": true,
  "themeCustomization": {
    "colors": {
      "primary": "#0366d6"
    }
  }
}
```

Then run:

```bash
node dist/cli.js input.md --config config.json
```

### Library usage

```typescript
import { convertMarkdownToPDF } from 'md2pdf';

await convertMarkdownToPDF('input.md', 'output.pdf', {
  theme: 'dark',
  pageSize: 'Letter',
  enableMermaid: true,
  enableMath: true
});
```

---

## Output Themes

By default, **md2pdf** bundles 12 tested themes. To see a list with descriptions in your terminal:

```bash
node dist/cli.js themes
```

| Theme | Description |
| --- | --- |
| `default` | Clean, professional styling |
| `github` | GitHub-style documentation |
| `academic` | Academic paper formatting |
| `minimal` | Minimalist design |
| `dark` | Dark mode theme |
| `corporate` | Corporate/business style |
| `ibm` | IBM Design Language inspired |
| `technical-report`| Technical documentation |
| `book` | Book-style formatting |
| `executive-report`| Executive summary style |
| `google` | Google Material styling |
| `microsoft-365` | Microsoft 365 Fluent UI styling |

---

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a full list of version changes. This project follows [Semantic Versioning](https://semver.org/).

---

## License

This project is licensed under the **MIT License**. See [LICENSE.txt](LICENSE.txt) for full details.

```text
MIT License -- Copyright (c) 2026 Isaac Gabriel Gozzo Rinkevicius
```