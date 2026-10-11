---
name: web-design-guidelines
description: Review UI code for Web Interface Guidelines compliance. Use when asked to "review my UI", "check accessibility", "audit design", "review UX", or "check my site against best practices".
author: vercel
version: 1.0.0
argument-hint: <file-or-pattern>
---

# Web Interface Guidelines

Review UI/frontend files for compliance with Web Interface Guidelines.

## How It Works
1. Fetch or refer to the latest rules from the source below.
2. Read the specified target files (or prompt user if not specified).
3. Check the code against all rules across Accessibility, Focus States, Forms, Animation, Typography, Content Handling, Images, and Performance.
4. Output findings in the terse `file:line` format with high signal-to-noise.

## Guidelines Source
- **Live Source:** `https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md`
- **Reference:** `https://github.com/voltagent/awesome-design-md`

---

## Core Guidelines & Rules

### Accessibility
- **Icon-only buttons:** Must have an `aria-label` or `<span className="sr-only">`.
- **Form controls:** Need `<label>` (with `htmlFor`) or an accessible `aria-label`.
- **Interactive elements:** Need keyboard handlers (`onKeyDown` / `onKeyUp`) if custom.
- **Semantic HTML:** Use `<button>` for actions, `<a>`/`<Link>` for navigation. Never use `<div onClick>`.
- **Images:** Need meaningful `alt` attribute (or `alt=""` if strictly decorative).
- **Decorative icons:** Must have `aria-hidden="true"`.
- **Async updates:** Realtime updates, toasts, or validation alerts need `aria-live="polite"` or `role="status"`.
- **Headings:** Hierarchical `<h1>`–`<h6>` structure without skipping levels; include skip link for main content.
- **Anchor scrolls:** Use `scroll-margin-top` on heading anchors.
- **Media:** Captions or transcripts for audio/video; controls need keyboard navigation.

### Focus States
- **Visible focus rings:** Every interactive element must have visible focus (e.g. `focus-visible:ring-2 focus-visible:ring-offset-2` or equivalent).
- **Never suppress outlines without replacement:** Never use `outline-none` or `outline: none` without a custom `:focus-visible` ring.
- **Use `:focus-visible` over `:focus`:** Avoid showing focus rings on pointer/mouse clicks.
- **Compound controls:** Group focus with `:focus-within`.
- **Sticky headers / overlays:** Must not obscure or cover the currently focused element.

### Forms & Inputs
- **Autocomplete & Names:** Inputs need `autocomplete` and meaningful `name` attributes.
- **Input types:** Use specific semantic types (`email`, `tel`, `url`, `number`) and appropriate `inputmode`.
- **Never block paste:** Do not attach `onPaste` with `preventDefault`.
- **Clickable labels:** Ensure clicking the label focuses the control (`htmlFor` or wrapping `<label>`).
- **Spellcheck:** Disable spellcheck on email addresses, auth codes, and usernames (`spellCheck={false}`).
- **Checkboxes & Radios:** Label + input must share a single, generous hit target with no dead click zones.
- **Submit buttons:** Keep button enabled until network request actually starts; display spinner/loading text during request.
- **Inline errors:** Render validation errors inline next to the field; auto-focus first invalid field upon submission.
- **Placeholders:** End placeholder text with an ellipsis `…` and show realistic example patterns.
- **Prevent password manager interference:** Set `autocomplete="off"` on non-auth search or token fields.

### Animation & Micro-interactions
- **Reduced motion:** Strictly respect `prefers-reduced-motion` (provide reduced/instant variant).
- **Compositor properties only:** Animate `transform` and `opacity` only.
- **Avoid `transition: all`:** Explicitly list transitioned CSS properties (e.g. `transition-colors`, `transition-transform`).
- **Transform origin:** Set explicit `transform-origin`.
- **SVG transforms:** Apply transforms to `<g>` wrappers with `transform-box: fill-box; transform-origin: center`.
- **Interruptible animations:** Respond immediately to user interrupts mid-animation.
- **Autoplay motion:** Loops >5s need pause/stop controls; muted loops must stop under `prefers-reduced-motion`.

### Typography
- **Ellipsis:** Use Unicode `…` instead of three periods `...`.
- **Quotes:** Use curly typographic quotes `“` `”` / `‘` `’` instead of straight quotes `"` / `'`.
- **Non-breaking spaces:** Use non-breaking spaces for units and shortcuts (e.g. `10&nbsp;MB`, `⌘&nbsp;K`).
- **Loading states:** End loading strings with `…` (e.g. `"Loading…"`, `"Saving…"`).
- **Tabular figures:** Use `tabular-nums` / `font-variant-numeric: tabular-nums` for numeric data columns, timers, and comparisons.
- **Headings wrap:** Use `text-wrap: balance` or `text-wrap: pretty` on titles and headings to prevent typographical widows.

### Content Handling
- **Overflow & text containers:** Handle arbitrary length text with `truncate`, `line-clamp-*`, or `break-words`.
- **Flex child truncation:** Flex children containing truncated text must declare `min-w-0`.
- **First-class empty states:** Never render blank voids or broken layouts for empty arrays or strings. Provide informative empty state UI.
- **User input variability:** Account for extra short, standard, and excessively long user text without breaking layout boundaries.

### Images & Assets
- **Layout shift prevention:** `<img>` or Next.js `<Image>` requires explicit `width` and `height` to prevent Cumulative Layout Shift (CLS).
- **Lazy loading:** Below-the-fold images should use `loading="lazy"`.
- **Critical hero images:** Above-the-fold hero images must use `priority` or `fetchpriority="high"`.

### Performance & DOM
- **Large lists (>50 items):** Virtualize using `@tanstack/react-virtual` or CSS `content-visibility: auto`.
- **Zero layout thrashing:** Never read layout dimensions (`getBoundingClientRect`, `offsetHeight`, `offsetWidth`, `scrollTop`) inside active render paths.
- **Batch DOM operations:** Avoid interleaving read/write operations.
- **Controlled inputs:** Keep controlled state updates lightweight per keystroke; prefer uncontrolled or debounced handlers where appropriate.

---

## Output Format
When reviewing, output findings concisely in terse `file:line` format:

```
path/to/Component.tsx:42 - [Rule Category] Issue description (how to fix)
```
