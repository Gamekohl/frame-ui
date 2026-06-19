import { Directive, booleanAttribute, computed, inject, input, signal } from '@angular/core';

import { FrCommandItem } from './command.item';
import { FR_COMMAND_GROUP } from './command.tokens';

/** Group slot for command. */
@Directive({
  selector: '[frCommandGroup]',
  exportAs: 'frCommandGroup',
  standalone: true,
  providers: [{ provide: FR_COMMAND_GROUP, useExisting: FrCommandGroup }],
  host: {
    class: 'frame-command__group',
    '[attr.aria-label]': 'heading()',
    '[attr.data-hidden]': 'hidden() ? "" : null',
    role: 'group',
  },
})
export class FrCommandGroup {
  private readonly items = new Set<FrCommandItem>();
  private readonly itemsVersion = signal(0);

  readonly forceMount = input(false, { transform: booleanAttribute });
  readonly heading = input<string | null>(null);

  readonly hidden = computed(() => {
    this.itemsVersion();
    return !this.forceMount() && Array.from(this.items).every((item) => !item.isVisible());
  });

  registerItem(item: FrCommandItem): void {
    this.items.add(item);
    this.bumpItems();
  }

  unregisterItem(item: FrCommandItem): void {
    this.items.delete(item);
    this.bumpItems();
  }

  private bumpItems(): void {
    this.itemsVersion.update((value) => value + 1);
  }
}

/** Heading slot for a command group. */
@Directive({
  selector: '[frCommandGroupHeading]',
  standalone: true,
  host: {
    class: 'frame-command__group-heading',
  },
})
export class FrCommandGroupHeading {}

