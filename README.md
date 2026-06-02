# FrameUI

Angular 21 library-first workspace for a shadcn-inspired FrameUI foundation.

## Current scope

The foundation currently includes:

- a minimal theme contract with light and dark defaults
- a documented semantic token contract for color, shape, and elevation
- CSS-variable based theme switching through an Angular provider and service
- a dedicated `components` workspace for isolated primitives
- small class utilities for future slot-based component overrides
- Vitest-powered unit test infrastructure

No components or directives are included yet.

## Commands

```bash
npm test
npm run build
```

## Library entrypoint

Import foundation APIs from `@frame-ui/foundation`.
Import primitives from `@frame-ui/components`.

## Foundation contract

The token contract is now intentionally small and semantic:

- surfaces: `background`, `foreground`, `surface`, `surface-foreground`
- supporting surfaces: `muted`, `muted-foreground`
- actions: `primary`, `primary-foreground`, `accent`, `accent-foreground`
- structure: `border`, `input`, `ring`
- shape: `radius-sm`, `radius-md`, `radius-lg`
- elevation: `shadow-sm`, `shadow-md`

Detailed token rules and a custom theme example live in [projects/foundation/README.md](/C:/Users/julia/Documents/frame-ui/projects/foundation/README.md).
