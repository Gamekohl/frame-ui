import { Directive, ElementRef, inject, input } from '@angular/core';

import { FR_COMMAND } from './command.tokens';

/** Command input component primitive. */
@Directive({
  selector: 'input[frCommandInput]',
  standalone: true,
  host: {
    class: 'frame-command__input',
    '[attr.aria-disabled]': 'command.disabled() ? "true" : null',
    '[attr.disabled]': 'command.disabled() ? "" : null',
    '[attr.placeholder]': 'placeholder()',
    autocomplete: 'off',
    role: 'searchbox',
    spellcheck: 'false',
    type: 'text',
    '[value]': 'command.query()',
    '(input)': 'handleInput()',
  },
})
export class FrCommandInput {
  private readonly elementRef = inject<ElementRef<HTMLInputElement>>(ElementRef);
  protected readonly command = inject(FR_COMMAND);

  readonly placeholder = input('Type a command or search...');

  protected handleInput(): void {
    this.command.setQuery(this.elementRef.nativeElement.value);
  }
}
