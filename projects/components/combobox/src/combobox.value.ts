import {
  Directive,
  ElementRef,
  Renderer2,
  afterNextRender,
  booleanAttribute,
  inject,
  input,
} from '@angular/core';

import { FrCombobox, FrComboboxValue } from './combobox.root';

@Directive({
  selector: '[frComboboxChips], frame-combobox-chips',
  host: {
    class: 'frame-combobox__chips',
    '[attr.data-disabled]': 'root.disabled() ? "" : null',
    '[attr.data-invalid]': 'root.invalid() ? "" : null',
  },
})
export class FrComboboxChips {
  protected readonly root = inject(FrCombobox);
}

@Directive({
  selector: '[frComboboxValue], frame-combobox-value',
  exportAs: 'frComboboxValue',
  host: {
    class: 'frame-combobox__value',
  },
})
export class FrComboboxValueList {
  private readonly root = inject(FrCombobox);

  values(): FrComboboxValue[] {
    return this.root.selectedValues();
  }
}

@Directive({
  selector: '[frComboboxChip], frame-combobox-chip',
  exportAs: 'frComboboxChip',
  host: {
    class: 'frame-combobox__chip',
  },
})
export class FrComboboxChip {
  private readonly root = inject(FrCombobox);
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly renderer = inject(Renderer2);

  readonly value = input.required<FrComboboxValue>();
  readonly removable = input(true, { transform: booleanAttribute });

  constructor() {
    afterNextRender(() => this.attachDefaultRemoveButton());
  }

  remove(): void {
    if (this.root.disabled()) {
      return;
    }

    this.root.removeItem(this.value());
  }

  private attachDefaultRemoveButton(): void {
    const element = this.elementRef.nativeElement;

    if (!this.removable() || element.querySelector('[frComboboxChipRemove], [frcomboboxchipremove]')) {
      return;
    }

    const button = this.renderer.createElement('button') as HTMLButtonElement;
    const label = this.renderer.createText('×');
    this.renderer.setAttribute(button, 'type', 'button');
    this.renderer.setAttribute(button, 'aria-label', 'Remove selected item');
    this.renderer.setAttribute(button, 'data-default-remove', '');
    this.renderer.addClass(button, 'frame-combobox__chip-remove');
    this.renderer.appendChild(button, label);
    this.renderer.listen(button, 'click', (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      this.remove();
    });
    this.renderer.appendChild(element, button);
  }
}

@Directive({
  selector: 'button[frComboboxChipRemove]',
  host: {
    class: 'frame-combobox__chip-remove',
    type: 'button',
    '(click)': 'remove($event)',
  },
})
export class FrComboboxChipRemove {
  private readonly chip = inject(FrComboboxChip);

  protected remove(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.chip.remove();
  }
}

@Directive({
  selector: 'input[frComboboxChipsInput]',
  host: {
    class: 'frame-combobox__chips-input',
    '[attr.disabled]': 'root.disabled() ? "" : null',
    '[value]': 'root.query()',
    autocomplete: 'off',
    type: 'text',
    '(focus)': 'root.open()',
    '(input)': 'handleInput($event)',
    '(keydown)': 'handleKeydown($event)',
  },
})
export class FrComboboxChipsInput {
  protected readonly root = inject(FrCombobox);

  protected handleInput(event: Event): void {
    this.root.updateQuery((event.target as HTMLInputElement).value);
  }

  protected handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Backspace' && this.root.query() === '') {
      const values = this.root.selectedValues();
      const last = values.at(-1);

      if (last !== undefined) {
        this.root.removeItem(last);
      }
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.root.open();
      this.root.moveHighlight(1);
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      this.root.selectHighlighted();
    }
  }
}

@Directive({
  selector: '[frComboboxError], frame-combobox-error',
  host: {
    class: 'frame-combobox__error',
    'aria-live': 'polite',
  },
})
export class FrComboboxError {}
