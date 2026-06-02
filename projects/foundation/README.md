# Foundation

`@frame-ui/foundation` is the stable base layer for the FrameUI.

Current scope:

- CSS-variable token contract
- Angular theme switching via `data-theme` or a shared `.dark` class
- class merge helpers for future slot-based primitives
- Vitest unit tests

No primitives or complex components are included here.

## Token Contract

The foundation token contract is intentionally semantic and small.

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
- `--frame-border`: default border color
- `--frame-input`: input field chrome
- `--frame-ring`: focus ring color

### Shape tokens

- `--frame-radius-sm`
- `--frame-radius-md`
- `--frame-radius-lg`

### Elevation tokens

- `--frame-shadow-sm`
- `--frame-shadow-md`

## Contract Rules

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

The foundation layer should expose a token contract, not force itself to be the only dark mode owner.

There are two recommended ownership models:

- library-managed: the FrameUI writes the active theme to the root element
- externally managed: another system such as Tailwind owns the root selector and the FrameUI follows it

### Library-managed with `data-theme`

This is the current default:

```ts
provideFrameUI({
  defaultTheme: 'light',
});
```

### Library-managed with Tailwind's `.dark` class

If you want the FrameUI service to be the single source of truth, but Tailwind utilities should respond too, switch to class strategy:

```ts
provideFrameUI({
  strategy: 'class',
  className: 'dark',
});
```

`ThemeService.setTheme('dark')` now adds `.dark` to the root element, so both the FrameUI tokens and Tailwind `dark:` utilities react to the same switch.

### Externally managed by Tailwind or another app shell

If the host app already owns dark mode, let the FrameUI observe instead of write:

```ts
provideFrameUI({
  strategy: 'class',
  mode: 'observe',
  className: 'dark',
});
```

In this mode the library does not write to the DOM. It reads the current root class and keeps `ThemeService.theme()` in sync with that external source of truth.

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
npm run build
npm test
```
