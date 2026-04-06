# CLAUDE.md

## What this repo is

A minimal, reusable GitHub Pages theme. Pure HTML/CSS/JS — no build system, no dependencies, no Jekyll.

Deployed to `jaace.github.io/theme/`. Other projects consume it via:
```html
<link rel="stylesheet" href="https://jaace.github.io/theme/style.css">
<script src="https://jaace.github.io/theme/theme.js"></script>
```

## File structure

```
docs/               GitHub Pages source (served from /docs on main)
├── .nojekyll       Disables Jekyll processing
├── style.css       The theme stylesheet — CSS custom properties, components, dark/light mode
├── theme.js        Auto-initializing JS — theme toggle + copy-to-clipboard
└── index.html      Demo page and starter template
```

## Design tokens

All colors, fonts, and spacing are defined as CSS custom properties in `:root`. Light mode overrides are in `[data-theme="light"]`. Consuming pages can override any variable.

## Key conventions

- Theme toggle button must have `id="theme-toggle"` with child `.icon-sun` and `.icon-moon` SVGs
- Copy buttons use `.copy-btn` (hero-style) or `.code-copy-btn[data-copy]` (code-block-style) with child `.icon-copy` and `.icon-check` SVGs
- All content containers use `max-width: var(--max-width)` centered with `margin: 0 auto`
- Sections are separated by `border-top: 1px solid var(--border)`

## Making changes

This theme is consumed by other repos via direct URL. Changes to `style.css` or `theme.js` propagate to all consuming sites after GitHub Pages CDN cache clears (~10 min). Be careful with breaking changes to class names or CSS variable names.
