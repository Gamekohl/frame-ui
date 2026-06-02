import { Directive, ElementRef, inject } from '@angular/core';

import { FrCombobox } from './combobox.root';

@Directive({
  selector: 'input[frComboboxInput]',
  host: {
    class: 'frame-combobox__input',
    '[attr.aria-disabled]': 'root.disabled() ? "true" : null',
    '[attr.aria-expanded]': 'root.isOpen() ? "true" : "false"',
    '[attr.aria-invalid]': 'root.invalid() ? "true" : null',
    '[attr.disabled]': 'root.disabled() ? "" : null',
    '[attr.data-has-value]': 'root.hasValue() ? "true" : "false"',
    '[value]': 'root.displayValue()',
    autocomplete: 'off',
    role: 'combobox',
    type: 'text',
    '(blur)': 'handleBlur()',
    '(focus)': 'root.open()',
    '(input)': 'handleInput()',
    '(keydown)': 'handleKeydown($event)',
  },
})
export class FrComboboxInput {
  protected readonly root = inject(FrCombobox);
  private readonly elementRef = inject<ElementRef<HTMLInputElement>>(ElementRef);

  protected handleInput(): void {
    this.root.updateQuery(this.elementRef.nativeElement.value);
  }

  protected handleBlur(): void {
    this.root.touch();
  }

  protected handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.root.open();
      this.root.moveHighlight(1);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.root.open();
      this.root.moveHighlight(-1);
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      this.root.selectHighlighted();
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      this.root.close();
    }
  }
}

@Directive({
  selector: 'button[frComboboxTrigger]',
  host: {
    class: 'frame-combobox__trigger',
    '[attr.aria-expanded]': 'root.isOpen() ? "true" : "false"',
    '[attr.disabled]': 'root.disabled() ? "" : null',
    role: 'combobox',
    type: 'button',
    '(click)': 'root.isOpen() ? root.close() : root.open()',
  },
})
export class FrComboboxTrigger {
  protected readonly root = inject(FrCombobox);
}

@Directive({
  selector: 'button[frComboboxClear]',
  host: {
    class: 'frame-combobox__clear',
    '[attr.hidden]': 'hidden() ? "" : null',
    type: 'button',
    '(click)': 'root.clear()',
  },
})
export class FrComboboxClear {
  protected readonly root = inject(FrCombobox);

  protected hidden(): boolean {
    return !this.root.showClear() || !this.root.hasValue();
  }
}
