# Jaace Theme

A minimal dark/light GitHub Pages theme. Pure HTML, CSS, and JS — no dependencies, no build step.

**Demo:** [jaace.github.io/theme](https://jaace.github.io/theme/)

## Usage

Add two lines to any HTML page:

```html
<!-- In <head> -->
<link rel="stylesheet" href="https://jaace.github.io/theme/style.css">

<!-- Before </body> -->
<script src="https://jaace.github.io/theme/theme.js"></script>
```

## What you get

- Dark/light mode with system preference detection and localStorage persistence
- Design tokens via CSS custom properties — override `--accent` to change the entire palette
- Pre-styled components: nav, hero, sections, code blocks, steps, callouts, footer
- Copy-to-clipboard buttons that just work

## Customization

Override any CSS variable on `:root` or `html` to customize:

```css
:root {
  --accent: #10b981;        /* change from amber to green */
  --max-width: 800px;       /* wider content */
  --font-mono: "JetBrains Mono", monospace;
}
```

## Components

| Component | Class | Description |
|-----------|-------|-------------|
| Nav | `nav`, `.nav-brand`, `.nav-right` | Top bar with brand, theme toggle, links |
| Hero | `.hero`, `.eyebrow`, `.tagline` | Page header with title and description |
| Section | `section > h2 + p` | Content sections with divider borders |
| Steps | `.steps > li > .step-num` | Numbered list with accent badges |
| Code block | `.code-wrap > .code-block` | Styled pre-formatted code |
| Copy button | `.code-copy-btn[data-copy]` | Clipboard button (auto-wired by theme.js) |
| Install CTA | `.install-cta > code + .copy-btn` | Hero-style command pill with copy |
| Callout | `.command-callout > .cmd + p` | Accent-highlighted callout box |
| Footer | `footer`, `.footer-note`, `.footer-links` | Bottom bar with attribution and links |

## Structure

```
docs/
├── style.css    The theme stylesheet (~430 lines)
├── theme.js     Auto-initializing behaviors (~60 lines)
└── index.html   Demo page / starter template
```
