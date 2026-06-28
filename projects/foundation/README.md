# Foundation

`@frame-ui-ng/foundation` is the stable base layer for FrameUI.

Documentation: https://frame-ui.com

Current scope:

- CSS variables
- Angular theme switching via `data-theme` or a shared `.dark` class
- class merge helpers for future slot-based primitives
- Vitest unit tests

No primitives or complex components are included here.

## Tokens

The foundation tokens are intentionally semantic and small.

### Color tokens

- `--frame-background`: app/page background
- `--frame-foreground`: default readable text on `background`
- `--frame-surface`: raised or contained surfaces such as cards, panels, menus
- `--frame-surface-foreground`: readable text on `surface`
- `--frame-muted`: low-emphasis surfaces and fills
- `--frame-muted-foreground`: low-emphasis text
- `--frame-primary`: primary emphasis, usually the main action color
- `--frame-primary-foreground`: readable text on `primary`
- `--frame-accent`: secondary emphasis or selection highlight
- `--frame-accent-foreground`: readable text on `accent`
- `--frame-destructive`: destructive or error emphasis
- `--frame-destructive-foreground`: readable text on `destructive`
- `--frame-success`: success emphasis
- `--frame-success-foreground`: readable text on `success`
- `--frame-warning`: warning emphasis
- `--frame-warning-foreground`: readable text on `warning`
- `--frame-info`: informational emphasis
- `--frame-info-foreground`: readable text on `info`
- `--frame-border`: default border color
- `--frame-input`: input field chrome
- `--frame-ring`: focus ring color

### Shape tokens

- `--frame-radius-sm`
- `--frame-radius-md`
- `--frame-radius-lg`
- `--frame-radius-full`

The default FrameUI theme keeps `sm`, `md`, and `lg` at `0px` for the technical square look.
Override these tokens in the host app when a rounder theme is wanted.

### Elevation tokens

- `--frame-shadow-sm`
- `--frame-shadow-md`
- `--frame-shadow-lg`

Use `shadow` in `provideFrameUI` when the whole app should be flatter or more raised:

```ts
provideFrameUI({
  shadow: 'flat', // 'flat' | 'default' | 'raised'
});
```

## Token Rules

- Tokens must describe purpose, not implementation.
- Components should consume semantic tokens, never hardcoded theme colors.
- New tokens should be added only when multiple primitives need the same concept.
- Component-specific tokens should not be added to the foundation layer yet.

Good:

```css
color: var(--frame-foreground);
border-color: var(--frame-border);
```

Bad:

```css
color: #111827;
border-color: #e5e7eb;
```

Good token naming:

```css
--frame-primary
--frame-surface
```

Bad token naming:

```css
--frame-blue-500
--frame-card-border-hover
```

## Light And Dark

The foundation layer only models `light` and `dark`.

Brand, product, or campaign differences should be handled by the host app's tokens or by scoped CSS-variable overrides. They should not become additional registered theme names.

## Theme Ownership

The foundation layer should expose CSS tokens, not force itself to be the only dark mode owner.

There are two questions:

- Who controls light/dark: FrameUI or the app?
- Which root selector is used: `data-theme` or `.dark`?

### FrameUI controls `data-theme`

This is the current default:

```ts
provideFrameUI({
  defaultTheme: 'light',
  theme: {
    controlledBy: 'frame',
    using: 'data-theme',
  },
});
```

`ThemeService.setTheme('dark')` writes `html[data-theme="dark"]`.

### FrameUI controls `.dark`

Use this when FrameUI should control the theme, but the app expects a shared `.dark` selector:

```ts
provideFrameUI({
  theme: {
    controlledBy: 'frame',
    using: 'class',
  },
});
```

`ThemeService.setTheme('dark')` adds `.dark` to the root element, so both FrameUI tokens and Tailwind `dark:` utilities can react to the same switch.

### App controls `.dark`

Use this when Tailwind, an app shell, or another design layer already owns dark mode:

```ts
provideFrameUI({
  theme: {
    controlledBy: 'app',
    using: 'class',
  },
});
```

In this setup, FrameUI does not write light/dark state. It reads `html.dark` and keeps `ThemeService.theme()` in sync. Calling `ThemeService.setTheme()` throws because the app owns the switch.

### Bootstrap

Bootstrap apps usually use `data-bs-theme`. FrameUI does not need to observe that attribute for visual theming. Map FrameUI tokens to Bootstrap variables in CSS instead:

```css
:root {
  --frame-background: var(--bs-body-bg);
  --frame-foreground: var(--bs-body-color);
  --frame-border: var(--bs-border-color);
}
```

## Global Appearance Options

FrameUI components include small blueprint-style corner handles by default. Disable them for the whole app from the foundation provider:

```ts
provideFrameUI({
  disableCornerHandles: true,
});
```

Use scoped overrides for local brand moments:

```css
.marketing-hero {
  --frame-primary: oklch(0.69 0.19 38);
  --frame-primary-foreground: oklch(0.99 0.01 95);
  --frame-radius-lg: 1rem;
}
```

## Commands

```bash
npm install @frame-ui-ng/foundation
```
