import {
  DestroyRef,
  Directive,
  ElementRef,
  afterNextRender,
  booleanAttribute,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';

import { FR_COMMAND, FR_COMMAND_GROUP } from './command.tokens';

@Directive({
  selector: 'button[frCommandItem]',
  exportAs: 'frCommandItem',
  standalone: true,
  host: {
    class: 'frame-command__item',
    '[attr.aria-disabled]': 'disabled() ? "true" : null',
    '[attr.aria-selected]': 'isHighlighted() ? "true" : "false"',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '[attr.data-hidden]': 'isVisible() ? null : ""',
    '[attr.data-highlighted]': 'isHighlighted() ? "" : null',
    '[attr.data-selected]': 'isSelected() ? "" : null',
    '[attr.disabled]': 'disabled() ? "" : null',
    role: 'option',
    type: 'button',
    '(click)': 'select()',
    '(mouseenter)': 'highlightSelf()',
  },
})
export class FrCommandItem {
  private readonly destroyRef = inject(DestroyRef);
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly command = inject(FR_COMMAND);
  private readonly group = inject(FR_COMMAND_GROUP, { optional: true });
  private mutationObserver: MutationObserver | null = null;

  readonly disabled = input(false, { transform: booleanAttribute });
  readonly itemKeywords = input<readonly string[] | string>([], { alias: 'keywords' });
  readonly itemLabel = input<string | null>(null, { alias: 'label' });
  readonly valueInput = input<unknown>(undefined, { alias: 'value' });
  readonly itemSelected = output<unknown>({ alias: 'selected' });

  readonly resolvedLabel = signal('');
  readonly label = computed(() => this.itemLabel() ?? this.resolvedLabel());
  readonly keywords = computed(() => {
    const keywords = this.itemKeywords();
    return typeof keywords === 'string'
      ? keywords.split(/\s*,\s*/).filter(Boolean)
      : [...keywords];
  });
  readonly value = computed(() => this.valueInput() ?? this.label());
  readonly visible = computed(() => this.command.filteredItemVisible(this.label(), this.keywords()));

  constructor() {
    this.command.registerItem(this);
    this.group?.registerItem(this);
    this.destroyRef.onDestroy(() => {
      this.mutationObserver?.disconnect();
      this.command.unregisterItem(this);
      this.group?.unregisterItem(this);
    });

    afterNextRender(() => {
      this.refreshResolvedLabel();
      this.observeTextChanges();
    });

    effect(() => {
      this.label();
      this.keywords();
      this.command.visibleCount();
    });
  }

  isVisible(): boolean {
    return this.visible();
  }

  isHighlighted(): boolean {
    return this.command.isHighlighted(this);
  }

  isSelected(): boolean {
    return this.command.isItemSelected(this.value());
  }

  scrollIntoView(): void {
    this.elementRef.nativeElement.scrollIntoView?.({
      block: 'nearest',
      inline: 'nearest',
    });
  }

  select(): void {
    if (this.disabled() || !this.isVisible()) {
      return;
    }

    this.command.selectItem(this);
    this.itemSelected.emit(this.value());
  }

  protected highlightSelf(): void {
    const index = this.command.visibleItems().indexOf(this);

    if (index >= 0) {
      this.command.highlightedIndex.set(index);
    }
  }

  private resolveLabel(): string {
    return this.elementRef.nativeElement.textContent?.trim() ?? '';
  }

  private refreshResolvedLabel(): void {
    this.resolvedLabel.set(this.resolveLabel());
  }

  private observeTextChanges(): void {
    if (typeof MutationObserver === 'undefined' || this.itemLabel() !== null) {
      return;
    }

    this.mutationObserver = new MutationObserver(() => this.refreshResolvedLabel());
    this.mutationObserver.observe(this.elementRef.nativeElement, {
      characterData: true,
      childList: true,
      subtree: true,
    });
  }
}

@Directive({
  selector: '[frCommandItemIcon]',
  standalone: true,
  host: {
    class: 'frame-command__item-icon',
    'aria-hidden': 'true',
  },
})
export class FrCommandItemIcon {}

@Directive({
  selector: '[frCommandShortcut]',
  standalone: true,
  host: {
    class: 'frame-command__shortcut',
    'aria-hidden': 'true',
  },
})
export class FrCommandShortcut {}
