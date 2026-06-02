# Components

`@frame-ui/components` contains isolated UI primitives built on top of the foundation layer.

Structure rules for this workspace:

- each primitive lives in its own folder under `projects/components/<primitive>/src`
- TypeScript, CSS, and tests stay close together
- larger primitives can be split into small focused files with a local barrel entrypoint
- foundation owns global tokens and theme switching
- components own primitive-specific tokens and styles

## Current primitives

### `FrAlert`

Location:

- [alert.ts](/C:/Users/julia/Documents/frame-ui/projects/components/alert/src/alert.ts)
- [alert.css](/C:/Users/julia/Documents/frame-ui/projects/components/alert/src/styles/alert.css)
- [alert.spec.ts](/C:/Users/julia/Documents/frame-ui/projects/components/alert/src/tests/alert.spec.ts)

The primitive is a composition-friendly alert container:

- semantic alert surface
- `default` and `destructive` variants
- title and description slots
- tokenized styling with app-wide radius defaults

Usage:

```html
<section frAlert>
  <span aria-hidden="true">!</span>
  <div>
    <h5 frAlertTitle>Heads up</h5>
    <p frAlertDescription>
      You can add components and dependencies to your app using the cli.
    </p>
  </div>
</section>
```

### `FrAccordion`

Location:

- [accordion.ts](/C:/Users/julia/Documents/frame-ui/projects/components/accordion/src/accordion.ts)
- [accordion.css](/C:/Users/julia/Documents/frame-ui/projects/components/accordion/src/styles/accordion.css)
- [accordion.spec.ts](/C:/Users/julia/Documents/frame-ui/projects/components/accordion/src/tests/accordion.spec.ts)

The primitive follows the shadcn composition model:

- `FrAccordion`
- `FrAccordionItem`
- `FrAccordionTrigger`
- `FrAccordionContent`
- optional `FrAccordionIcon`

Supported behavior:

- `type="single"` and `type="multiple"`
- open/close content animation
- optional root-level `border` toggle
- `collapsible` support for single accordions
- disabled items
- tokenized trigger/content styling

Usage:

```html
<div frAccordion type="single" collapsible [defaultValue]="'item-1'">
  <section frAccordionItem value="item-1">
    <button frAccordionTrigger>
      <span>Is it accessible?</span>
      <span frAccordionIcon>+</span>
    </button>
    <div frAccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </div>
  </section>
</div>
```

### `FrButton`

Location:

- [button.ts](/C:/Users/julia/Documents/frame-ui/projects/components/button/src/button.ts)
- [button.css](/C:/Users/julia/Documents/frame-ui/projects/components/button/src/button.css)
- [button.spec.ts](/C:/Users/julia/Documents/frame-ui/projects/components/button/src/tests/button.spec.ts)

The directive is CSS-first:

- Angular signal inputs define semantic variants only
- CSS tokens define the actual visuals
- consumers can override globally or under a local selector scope
- components consume public `--frame-button-*` tokens directly with semantic fallbacks

Usage:

```html
<button frButton appearance="primary" size="md" type="button">
  <span frButtonIcon>+</span>
  <span frButtonLabel>Create</span>
</button>
```

Built-in inputs are intentionally small:

- `appearance`: `primary | outline | ghost`
- `loadingDisplay`: `replace | inline`
- `radius`: `none | sm | md | lg | full`
- `size`: `sm | md | lg`
- `disabled`: boolean
- `loading`: boolean

Default loading uses the built-in spinner and `loadingDisplay="replace"`, which hides the normal button content.

To keep the label visible while loading:

```html
<button frButton [loading]="true" loadingDisplay="inline" type="button">
  <span frButtonLabel>Saving</span>
</button>
```

To provide a custom loading indicator:

```html
<button frButton [loading]="true" type="button">
  <span frButtonLabel>Save</span>
  <span frButtonLoading>
    <svg viewBox="0 0 24 24" aria-hidden="true">...</svg>
  </span>
</button>
```

### `FrAvatar`

Location:

- [avatar.ts](/C:/Users/julia/Documents/frame-ui/projects/components/avatar/src/avatar.ts)
- [avatar.css](/C:/Users/julia/Documents/frame-ui/projects/components/avatar/src/styles/avatar.css)
- [avatar.spec.ts](/C:/Users/julia/Documents/frame-ui/projects/components/avatar/src/tests/avatar.spec.ts)

The primitive follows the shadcn composition model:

- `FrAvatar`
- `FrAvatarImage`
- `FrAvatarFallback`
- optional `FrAvatarIcon`
- optional `FrAvatarBadge`
- `FrAvatarGroup`
- `FrAvatarGroupCount`

Supported behavior:

- image/fallback composition
- fallback remains visible until the image loads
- fallback returns automatically on image error
- semantic size input: `sm | md | lg`
- avatar groups, overflow counts, and adornments
- tokenized sizing, radius, and surface styling

Usage:

```html
<span frAvatar>
  <img frAvatarImage src="/profile.png" alt="Sarah Chen" />
  <span frAvatarFallback>SC</span>
</span>

<div frAvatarGroup size="sm">
  <span frAvatar>
    <span frAvatarFallback>AB</span>
  </span>
  <span frAvatarGroupCount>+2</span>
</div>
```

### `FrBadge`

Location:

- [badge.ts](/C:/Users/julia/Documents/frame-ui/projects/components/badge/src/badge.ts)
- [badge.css](/C:/Users/julia/Documents/frame-ui/projects/components/badge/src/styles/badge.css)
- [badge.spec.ts](/C:/Users/julia/Documents/frame-ui/projects/components/badge/src/tests/badge.spec.ts)

The primitive displays a badge or a component that looks like a badge:

- `default`, `secondary`, `destructive`, `outline`, `ghost`, and `link` variants
- usable on spans, anchors, or custom elements
- optional `FrBadgeIcon`, `FrBadgeLabel`, and `FrBadgeSpinner` slots
- logical inline-start / inline-end icon positioning for RTL-friendly layout
- custom colors through normal classes or scoped CSS variables

Usage:

```html
<span frBadge variant="secondary">
  <span frBadgeIcon>+</span>
  <span frBadgeLabel>Verified</span>
</span>

<a frBadge variant="link" href="/docs">
  <span frBadgeLabel>Open Link</span>
  <span frBadgeIcon position="inline-end">+</span>
</a>
```

### `FrCheckbox`

Location:

- [checkbox.ts](/C:/Users/julia/Documents/frame-ui/projects/components/checkbox/src/checkbox.ts)
- [checkbox.css](/C:/Users/julia/Documents/frame-ui/projects/components/checkbox/src/checkbox.css)
- [checkbox.spec.ts](/C:/Users/julia/Documents/frame-ui/projects/components/checkbox/src/tests/checkbox.spec.ts)

The primitive is built on a native checkbox input:

- natural form and table behavior
- CSS-only styling
- signal input for `indeterminate`
- native `checked`, `disabled`, and `aria-invalid` support
- Angular reactive forms support via the native checkbox control accessor
- optional composition helpers: `FrCheckboxField` and `FrCheckboxLabel`

Usage:

```html
<label frCheckboxField>
  <input frCheckbox type="checkbox" />
  <span frCheckboxLabel>Accept terms</span>
</label>
```

The current token surface includes:

- `--frame-checkbox-root-size`
- `--frame-checkbox-root-bg`
- `--frame-checkbox-root-border`
- `--frame-checkbox-root-color`
- `--frame-checkbox-root-radius`
- `--frame-checkbox-root-hover-bg`
- `--frame-checkbox-root-hover-border`
- `--frame-checkbox-root-checked-bg`
- `--frame-checkbox-root-checked-border`
- `--frame-checkbox-root-checked-color`
- `--frame-checkbox-root-focus-shadow`
- `--frame-checkbox-root-disabled-opacity`

### `FrSwitch`

Location:

- [switch.ts](/C:/Users/julia/Documents/frame-ui/projects/components/switch/src/switch.ts)
- [switch.css](/C:/Users/julia/Documents/frame-ui/projects/components/switch/src/styles/switch.css)
- [switch.spec.ts](/C:/Users/julia/Documents/frame-ui/projects/components/switch/src/tests/switch.spec.ts)

The primitive is built on a native checkbox input styled as a switch:

- native checkbox and Angular reactive forms behavior
- `role="switch"` for assistive technology
- `default` and `sm` sizes
- disabled, invalid, focus, checked, and RTL-friendly states
- optional composition helpers for label, description, and error copy

Usage:

```html
<label frSwitchField>
  <input frSwitch type="checkbox" />
  <span frSwitchContent>
    <span frSwitchLabel>Airplane mode</span>
    <span frSwitchDescription>Disable wireless connections.</span>
  </span>
</label>
```

With reactive forms:

```html
<input frSwitch type="checkbox" formControlName="notifications" />
```

### `FrCombobox`

Location:

- [combobox.ts](/C:/Users/julia/Documents/frame-ui/projects/components/combobox/src/combobox.ts)
- [combobox.root.ts](/C:/Users/julia/Documents/frame-ui/projects/components/combobox/src/combobox.root.ts)
- [combobox.input.ts](/C:/Users/julia/Documents/frame-ui/projects/components/combobox/src/combobox.input.ts)
- [combobox.content.ts](/C:/Users/julia/Documents/frame-ui/projects/components/combobox/src/combobox.content.ts)
- [combobox.items.ts](/C:/Users/julia/Documents/frame-ui/projects/components/combobox/src/combobox.items.ts)
- [combobox.value.ts](/C:/Users/julia/Documents/frame-ui/projects/components/combobox/src/combobox.value.ts)
- [combobox.css](/C:/Users/julia/Documents/frame-ui/projects/components/combobox/src/styles/combobox.css)
- [combobox.spec.ts](/C:/Users/julia/Documents/frame-ui/projects/components/combobox/src/tests/combobox.spec.ts)

The primitive is an autocomplete input with suggestion content:

- single and multiple selection
- chips, chip input, and chip removal helpers
- clear button support through `showClear` and `FrComboboxClear`
- grouped lists, labels, separators, and collection wrappers
- custom object values through `itemToStringValue` and item `label`
- invalid, disabled, auto-highlight, popup, input-group, and RTL-friendly composition
- Angular reactive forms support through the shared ControlValueAccessor foundation

Usage:

```html
<div frCombobox [(value)]="framework" autoHighlight showClear>
  <input frComboboxInput placeholder="Select a framework" />
  <button frComboboxClear type="button">Clear</button>

  <ng-template frComboboxContent>
    <div frComboboxPanel>
      <p frComboboxEmpty>No items found.</p>
      <div frComboboxList>
        <button frComboboxItem value="next">Next.js</button>
        <button frComboboxItem value="sveltekit">SvelteKit</button>
      </div>
    </div>
  </ng-template>
</div>
```

Multiple selection:

```html
<div frCombobox multiple [(value)]="frameworks">
  <div frComboboxChips>
    <div #values="frComboboxValue" frComboboxValue>
      @for (item of values.values(); track item) {
        <span frComboboxChip [value]="item">{{ item }}</span>
      }
    </div>
    <input frComboboxChipsInput placeholder="Add framework" />
  </div>
</div>
```

`FrComboboxChip` renders a default remove button. Override it with `FrComboboxChipRemove` when custom markup is needed:

```html
<span frComboboxChip [value]="item">
  {{ item }}
  <button frComboboxChipRemove type="button">Remove</button>
</span>
```

### `FrDropdownMenu`

Location:

- [dropdown-menu.ts](/C:/Users/julia/Documents/frame-ui/projects/components/dropdown-menu/src/dropdown-menu.ts)
- [dropdown-menu.root.ts](/C:/Users/julia/Documents/frame-ui/projects/components/dropdown-menu/src/dropdown-menu.root.ts)
- [dropdown-menu.content.ts](/C:/Users/julia/Documents/frame-ui/projects/components/dropdown-menu/src/dropdown-menu.content.ts)
- [dropdown-menu.trigger.ts](/C:/Users/julia/Documents/frame-ui/projects/components/dropdown-menu/src/dropdown-menu.trigger.ts)
- [dropdown-menu.items.ts](/C:/Users/julia/Documents/frame-ui/projects/components/dropdown-menu/src/dropdown-menu.items.ts)
- [dropdown-menu.position.ts](/C:/Users/julia/Documents/frame-ui/projects/components/dropdown-menu/src/dropdown-menu.position.ts)
- [dropdown-menu.types.ts](/C:/Users/julia/Documents/frame-ui/projects/components/dropdown-menu/src/dropdown-menu.types.ts)
- [dropdown-menu.css](/C:/Users/julia/Documents/frame-ui/projects/components/dropdown-menu/src/dropdown-menu.css)
- [dropdown-menu-panel.css](/C:/Users/julia/Documents/frame-ui/projects/components/dropdown-menu/src/dropdown-menu-panel.css)
- [dropdown-menu-item.css](/C:/Users/julia/Documents/frame-ui/projects/components/dropdown-menu/src/dropdown-menu-item.css)
- [dropdown-menu-motion.css](/C:/Users/julia/Documents/frame-ui/projects/components/dropdown-menu/src/dropdown-menu-motion.css)
- [dropdown-menu.spec.ts](/C:/Users/julia/Documents/frame-ui/projects/components/dropdown-menu/src/tests/dropdown-menu.spec.ts)

The primitive is organized into smaller composition parts:

- root and submenu containers own trigger mode and close timing
- content and panel directives own positioning, overlay surface, and debug visibility
- trigger directives own hover opening and close coordination
- item directives own selectable and presentational states
- CSS is split into panel, item, and motion partials behind one entry file

Usage:

```html
<div frDropdownMenu triggerMode="both">
  <button [frDropdownMenuTrigger]="menu" type="button">Open</button>

  <ng-template #menu="frDropdownMenuContent" frDropdownMenuContent side="bottom">
    <div frDropdownMenuPanel>
      <div frDropdownMenuLabel>Workspace</div>

      <button frDropdownMenuItem type="button">
        <span>Create new file</span>
        <span frDropdownMenuShortcut>Ctrl+N</span>
      </button>

      <button frDropdownMenuCheckboxItem [checked]="true" type="button">
        <span frDropdownMenuItemIndicator>+</span>
        <span>Show bookmarks bar</span>
      </button>

      <div frDropdownMenuSeparator></div>

      <div frDropdownMenuSub>
        <button [frDropdownMenuSubTrigger]="shareMenu" type="button">
          <span>Share</span>
        </button>

        <ng-template #shareMenu="frDropdownMenuContent" frDropdownMenuSubContent side="right">
          <div frDropdownMenuPanel>
            <button frDropdownMenuItem type="button">Copy link</button>
          </div>
        </ng-template>
      </div>
    </div>
  </ng-template>
</div>
```

Core inputs:

- `FrDropdownMenu.triggerMode`: `click | hover | both`
- `FrDropdownMenu.closeDelay`: number
- `FrDropdownMenuContent.side`: `top | right | bottom | left`
- `FrDropdownMenuContent.align`: `start | center | end`
- `FrDropdownMenuContent.sideOffset`: number
- `FrDropdownMenuContent.alignOffset`: number
- `FrDropdownMenuContent.debugVisible`: boolean

Available building blocks:

- `FrDropdownMenu`
- `FrDropdownMenuTrigger`
- `FrDropdownMenuContent`
- `FrDropdownMenuPanel`
- `FrDropdownMenuItem`
- `FrDropdownMenuCheckboxItem`
- `FrDropdownMenuRadioGroup`
- `FrDropdownMenuRadioItem`
- `FrDropdownMenuLabel`
- `FrDropdownMenuSeparator`
- `FrDropdownMenuShortcut`
- `FrDropdownMenuSub`
- `FrDropdownMenuSubTrigger`
- `FrDropdownMenuSubContent`

Current behavior includes:

- click, hover, or combined trigger modes
- nested submenus that stay open while hovering the active menu tree
- checkbox and radio menu items
- side-aware open animation
- optional always-open debug mode for styling work

### `FrField`

Location:

- [field.ts](/C:/Users/julia/Documents/frame-ui/projects/components/field/src/field.ts)
- [field.css](/C:/Users/julia/Documents/frame-ui/projects/components/field/src/styles/field.css)
- [field.spec.ts](/C:/Users/julia/Documents/frame-ui/projects/components/field/src/tests/field.spec.ts)

The primitive composes labels, controls, helper text, errors, and grouped form sections:

- `FrFieldSet` and `FrFieldLegend` for semantic grouped controls
  - `FrFieldGroup` for stacked related fields
  - `FrField` for a single field row
  - `FrFieldContent` for grouping a control, description, and error beside a label
  - `FrFieldLabel`, `FrFieldDescription`, `FrFieldSeparator`, and `FrFieldError`
  - `invalid` state on `FrField`
  - `FrFieldError` accepts projected content or an `errors` string/object input

Usage:

```html
<fieldset frFieldSet>
  <legend frFieldLegend>Profile</legend>
  <p frFieldDescription>This appears on invoices and emails.</p>

  <div frFieldGroup>
    <div frField>
      <label frFieldLabel for="name">Full name</label>
      <input frInput id="name" placeholder="Evil Rabbit" />
      <p frFieldDescription>This appears on invoices and emails.</p>
    </div>

    <div frField invalid>
      <label frFieldLabel for="username">Username</label>
      <input frInput id="username" aria-invalid="true" />
      <p frFieldError>Choose another username.</p>
    </div>

      <div frField>
        <label frFieldLabel for="team">Team</label>
        <div frFieldContent>
          <input frInput id="team" placeholder="FrameUIs" />
          <p frFieldDescription>Shown on release notes and shared workspaces.</p>
        </div>
      </div>
  </div>
</fieldset>
```

### `FrInput`

Location:

- [input.ts](/C:/Users/julia/Documents/frame-ui/projects/components/input/src/input.ts)
- [input.primitive.ts](/C:/Users/julia/Documents/frame-ui/projects/components/input/src/input.primitive.ts)
- [input.css](/C:/Users/julia/Documents/frame-ui/projects/components/input/src/styles/input.css)
- [input.spec.ts](/C:/Users/julia/Documents/frame-ui/projects/components/input/src/tests/input.spec.ts)

The primitive is built on the native input element and ships a small field helper set:

- `input[frInput]`
- `frame-input-field`
- `frame-input-header`
- `frame-input-control`
- `frame-input-field-group`
- `frame-input-group`
- `frame-input-group-addon`
- `input[frInputGroupInput]`
- `frame-input-group-text`
- `frame-input-label`
- `frame-input-description`
- `frame-input-error`
- `frame-input-badge`

Supported behavior:

- native text, email, search, url, password, and file input support
- input-group composition for inline text and icon addons
- button-group composition with inputs and buttons
- reactive-forms compatibility through Angular's native input control accessor
- disabled and invalid styling hooks
- helper primitives for labels, descriptions, and error copy
- CSS that stays simple enough for upcoming input-group and input-otp work

Usage:

```html
<div frInputField>
  <div frInputHeader>
    <label frInputLabel for="email">Email</label>
    <span frInputBadge>Beta</span>
  </div>
  <div frInputControl>
    <input frInput id="email" placeholder="name@example.com" type="email" />
  </div>
  <p frInputDescription>We'll send updates to this address.</p>
</div>
```

### `FrSelect`

Location:

- [select.ts](/C:/Users/julia/Documents/frame-ui/projects/components/select/src/select.ts)
- [select.root.ts](/C:/Users/julia/Documents/frame-ui/projects/components/select/src/select.root.ts)
- [select.content.ts](/C:/Users/julia/Documents/frame-ui/projects/components/select/src/select.content.ts)
- [select.items.ts](/C:/Users/julia/Documents/frame-ui/projects/components/select/src/select.items.ts)
- [select.value.ts](/C:/Users/julia/Documents/frame-ui/projects/components/select/src/select.value.ts)
- [select.css](/C:/Users/julia/Documents/frame-ui/projects/components/select/src/styles/select.css)
- [select-trigger.css](/C:/Users/julia/Documents/frame-ui/projects/components/select/src/styles/select-trigger.css)
- [select-content.css](/C:/Users/julia/Documents/frame-ui/projects/components/select/src/styles/select-content.css)
- [select-item.css](/C:/Users/julia/Documents/frame-ui/projects/components/select/src/styles/select-item.css)
- [select.spec.ts](/C:/Users/julia/Documents/frame-ui/projects/components/select/src/tests/select.spec.ts)

The primitive follows a trigger-first composition model:

- `button[frSelect]`
- `frame-select-value`
- `frame-select-icon`
- `FrSelectContent` on `ng-template`
- `frame-select-panel`
- `frame-select-group`
- `frame-select-label`
- `frame-select-item`
- `frame-select-item-indicator`
- `frame-select-separator`
- `frame-select-error`

Supported behavior:

- selected value and placeholder handling
- built-in selection checkmark with optional custom indicator override
- grouped items and separators
- invalid and disabled trigger states
- Angular reactive forms support through the shared custom control foundation
- `item-aligned` and `popper` positioning
- scrollable lists
- RTL support
- styling and interaction built on the dropdown-menu overlay primitives

Usage:

```html
<button [frSelect]="fruitMenu" [(value)]="fruit" indicatorPosition="end" type="button">
  <frame-select-value placeholder="Select a fruit"></frame-select-value>
  <span frSelectIcon>+</span>
</button>

<ng-template #fruitMenu="frSelectContent" frSelectContent>
  <frame-select-panel>
    <frame-select-group>
      <frame-select-item value="apple">
        <span>Apple</span>
      </frame-select-item>
      <frame-select-item value="banana">
        <span>Banana</span>
      </frame-select-item>
    </frame-select-group>
  </frame-select-panel>
</ng-template>
```

### `FrVirtualViewport`

Location:

- [virtual-scroll.ts](/C:/Users/julia/Documents/frame-ui/projects/components/virtual-scroll/src/virtual-scroll.ts)
- [virtual-scroll.viewport.ts](/C:/Users/julia/Documents/frame-ui/projects/components/virtual-scroll/src/virtual-scroll.viewport.ts)
- [virtual-scroll.for.ts](/C:/Users/julia/Documents/frame-ui/projects/components/virtual-scroll/src/virtual-scroll.for.ts)
- [virtual-scroll.content.ts](/C:/Users/julia/Documents/frame-ui/projects/components/virtual-scroll/src/virtual-scroll.content.ts)
- [virtual-scroll.engine.ts](/C:/Users/julia/Documents/frame-ui/projects/components/virtual-scroll/src/virtual-scroll.engine.ts)
- [virtual-scroll.css](/C:/Users/julia/Documents/frame-ui/projects/components/virtual-scroll/src/styles/virtual-scroll.css)
- [virtual-scroll.spec.ts](/C:/Users/julia/Documents/frame-ui/projects/components/virtual-scroll/src/tests/virtual-scroll.spec.ts)

The primitive is a headless virtual scrolling foundation for large vertical lists, with optional default list styling:

- `FrVirtualViewport` owns scroll state, range math, overscan, and imperative scrolling
- `FrVirtualContent` applies the before/after padding that creates the full scroll height
- `*frVirtualFor` renders only the visible slice of the input collection
- `FrVirtualList` provides a bordered surface for standalone virtualized lists
- `FrVirtualPanel` disables nested scrolling when the viewport is hosted inside another panel
- `FrVirtualItem` and `FrVirtualItemMeta` provide default row styling
- filtering and sorting stay outside the primitive
- v1 supports fixed-size rows and is structured to allow dynamic-size measurement later

Usage:

```html
<div frVirtualList>
  <div
    frVirtualViewport
    [height]="'20rem'"
    [itemSize]="36"
    [overscan]="4"
    #viewport="frVirtualViewport"
  >
    <div frVirtualContent>
      <button
        frVirtualItem
        type="button"
        *frVirtualFor="let item of items; let index = index; trackBy: trackItem"
      >
        <span>{{ index + 1 }}. {{ item.label }}</span>
        <span frVirtualItemMeta>{{ item.meta }}</span>
      </button>
    </div>
  </div>
</div>
```

Imperative API:

- `scrollToIndex(index, alignment?)`
- `measure()`

Current inputs:

- `FrVirtualViewport.itemSize`: number
- `FrVirtualViewport.overscan`: number
- `FrVirtualViewport.height`: string

## Stylesheet entrypoint

Import the primitive styles from:

```css
@import "../../components/src/styles/components.css";
```

## Commands

```bash
npm run build:components
npm run test:components
```

