import { Directive, ElementRef, contentChild, inject, input } from '@angular/core';

import {
  FrDropdownMenuItem,
  FrDropdownMenuLabel,
  FrDropdownMenuSeparator,
} from '@frame-ui-ng/components/dropdown-menu';
import { FrSelectContent } from './select.content';
import { FrSelectItemIndicator } from './select.value';

/** Group slot for select. */
@Directive({
  selector: '[frSelectGroup], frame-select-group',
  host: {
    class: 'frame-select__group',
  },
})
export class FrSelectGroup {}

/** Label slot for select. */
@Directive({
  selector: '[frSelectLabel], frame-select-label',
  hostDirectives: [FrDropdownMenuLabel],
  host: {
    class: 'frame-select__label',
  },
})
export class FrSelectLabel {}

/** Separator slot for select. */
@Directive({
  selector: '[frSelectSeparator], frame-select-separator',
  hostDirectives: [FrDropdownMenuSeparator],
  host: {
    class: 'frame-select__separator',
  },
})
export class FrSelectSeparator {}

/** Item slot for select. */
@Directive({
  selector: 'button[frSelectItem]',
  hostDirectives: [FrDropdownMenuItem],
  host: {
    class: 'frame-select__item',
    '[attr.data-has-custom-indicator]': 'customIndicator() ? "" : null',
    '[attr.data-indicator-position]': 'indicatorPosition()',
    '[attr.data-state]': 'isSelected() ? "checked" : "unchecked"',
    '(click)': 'handleClick()',
  },
})
export class FrSelectItem {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly content = inject(FrSelectContent);
  protected readonly customIndicator = contentChild(FrSelectItemIndicator);

  readonly itemLabel = input<string | null>(null, { alias: 'label' });
  readonly value = input.required<string | null>();

  protected indicatorPosition() {
    return this.content.select?.indicatorPosition() ?? 'start';
  }

  protected isSelected(): boolean {
    return this.content.select?.value() === this.value();
  }

  ngAfterViewInit(): void {
    this.content.select?.registerItem(this.value(), this.resolveLabel());
  }

  protected handleClick(): void {
    this.content.select?.selectValue(this.value(), this.resolveLabel());
  }

  private resolveLabel(): string {
    if (this.itemLabel() !== null) {
      return this.itemLabel()!;
    }

    const parts = Array.from(this.elementRef.nativeElement.children as HTMLCollectionOf<HTMLElement>)
      .filter((child) => !child.classList.contains('frame-select__item-indicator'))
      .map((child) => child.textContent?.trim() ?? '')
      .filter(Boolean);

    if (parts.length > 0) {
      return parts.join(' ');
    }

    return this.elementRef.nativeElement.textContent?.trim() ?? this.value();
  }
}

