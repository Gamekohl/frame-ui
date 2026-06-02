import { Directive, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: 'ng-template[frComboboxContent]',
  exportAs: 'frComboboxContent',
})
export class FrComboboxContent {
  readonly templateRef = inject(TemplateRef<unknown>);
}

@Directive({
  selector: '[frComboboxPanel], frame-combobox-panel',
  host: {
    class: 'frame-combobox__panel',
    role: 'listbox',
  },
})
export class FrComboboxPanel {}

@Directive({
  selector: '[frComboboxList], frame-combobox-list',
  host: {
    class: 'frame-combobox__list',
  },
})
export class FrComboboxList {}

@Directive({
  selector: '[frComboboxEmpty], frame-combobox-empty',
  host: {
    class: 'frame-combobox__empty',
    '[attr.hidden]': 'hidden() ? "" : null',
  },
})
export class FrComboboxEmpty {
  private readonly root = inject(FrComboboxRootLookup);

  protected hidden(): boolean {
    return this.root.visibleCount() > 0;
  }
}

@Directive({
  selector: '[frComboboxGroup], frame-combobox-group',
  host: {
    class: 'frame-combobox__group',
  },
})
export class FrComboboxGroup {}

@Directive({
  selector: '[frComboboxLabel], frame-combobox-label',
  host: {
    class: 'frame-combobox__label',
  },
})
export class FrComboboxLabel {}

@Directive({
  selector: '[frComboboxSeparator], frame-combobox-separator',
  host: {
    class: 'frame-combobox__separator',
    role: 'separator',
  },
})
export class FrComboboxSeparator {}

@Directive({
  selector: '[frComboboxCollection], frame-combobox-collection',
  host: {
    class: 'frame-combobox__collection',
  },
})
export class FrComboboxCollection {}

// Resolved by the root file to avoid a circular import in decorator metadata.
export abstract class FrComboboxRootLookup {
  abstract visibleCount(): number;
}
