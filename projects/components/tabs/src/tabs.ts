import {
  Directive,
  ElementRef,
  InjectionToken,
  booleanAttribute,
  computed,
  inject,
  input,
  model,
  output,
} from '@angular/core';

export const FR_TABS_ORIENTATIONS = ['horizontal', 'vertical'] as const;
export const FR_TABS_ACTIVATIONS = ['automatic', 'manual'] as const;
export const FR_TABS_LIST_VARIANTS = ['default', 'line'] as const;

export type FrTabsOrientation = (typeof FR_TABS_ORIENTATIONS)[number];
export type FrTabsActivation = (typeof FR_TABS_ACTIVATIONS)[number];
export type FrTabsListVariant = (typeof FR_TABS_LIST_VARIANTS)[number];

export const FR_TABS_ROOT = new InjectionToken<FrTabs>('FR_TABS_ROOT');

function coerceOrientation(value: unknown): FrTabsOrientation {
  return value === 'vertical' ? 'vertical' : 'horizontal';
}

function coerceActivation(value: unknown): FrTabsActivation {
  return value === 'manual' ? 'manual' : 'automatic';
}

function coerceListVariant(value: unknown): FrTabsListVariant {
  return value === 'line' ? 'line' : 'default';
}

@Directive({
  selector: '[frTabs], frame-tabs',
  exportAs: 'frTabs',
  providers: [
    {
      provide: FR_TABS_ROOT,
      useExisting: FrTabs,
    },
  ],
  host: {
    class: 'frame-tabs',
    '[attr.data-orientation]': 'orientation()',
  },
})
export class FrTabs {
  readonly defaultValue = input<string | null>(null);
  readonly orientation = input<FrTabsOrientation, unknown>('horizontal', {
    transform: coerceOrientation,
  });
  readonly activationMode = input<FrTabsActivation, unknown>('automatic', {
    transform: coerceActivation,
  });
  readonly value = model<string | null>(null);
  readonly valueChange = output<string>();

  select(value: string): void {
    this.value.set(value);
    this.valueChange.emit(value);
  }

  isSelected(value: string | null): boolean {
    const currentValue = this.value() ?? this.defaultValue();
    return !!value && currentValue === value;
  }
}

@Directive({
  selector: '[frTabsList], frame-tabs-list',
  host: {
    class: 'frame-tabs__list',
    role: 'tablist',
    '[attr.aria-orientation]': 'root?.orientation() ?? "horizontal"',
    '[attr.data-orientation]': 'root?.orientation() ?? "horizontal"',
    '[attr.data-variant]': 'variant()',
    '(keydown)': 'handleKeydown($event)',
  },
})
export class FrTabsList {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  protected readonly root = inject(FR_TABS_ROOT, { optional: true });

  readonly variant = input<FrTabsListVariant, unknown>('default', { transform: coerceListVariant });

  protected handleKeydown(event: KeyboardEvent): void {
    const triggers = this.triggers();
    const currentIndex = triggers.indexOf(event.target as HTMLElement);

    if (currentIndex < 0) {
      return;
    }

    const horizontal = this.root?.orientation() !== 'vertical';
    const previousKeys = horizontal ? ['ArrowLeft'] : ['ArrowUp'];
    const nextKeys = horizontal ? ['ArrowRight'] : ['ArrowDown'];

    if (nextKeys.includes(event.key)) {
      event.preventDefault();
      this.focusTrigger(triggers, currentIndex + 1);
      return;
    }

    if (previousKeys.includes(event.key)) {
      event.preventDefault();
      this.focusTrigger(triggers, currentIndex - 1);
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      this.focusTrigger(triggers, 0);
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      this.focusTrigger(triggers, triggers.length - 1);
    }
  }

  private focusTrigger(triggers: HTMLElement[], index: number): void {
    if (!triggers.length) {
      return;
    }

    const next = triggers[(index + triggers.length) % triggers.length];
    next.focus();

    if (this.root?.activationMode() === 'automatic') {
      next.click();
    }
  }

  private triggers(): HTMLElement[] {
    return Array.from(
      this.elementRef.nativeElement.querySelectorAll<HTMLElement>('[data-frame-tabs-trigger]:not([data-disabled])'),
    );
  }
}

@Directive({
  selector: 'button[frTabsTrigger], a[frTabsTrigger], [frTabsTrigger], frame-tabs-trigger',
  host: {
    class: 'frame-tabs__trigger',
    role: 'tab',
    '[attr.type]': 'isButton() ? "button" : null',
    '[attr.data-frame-tabs-trigger]': '""',
    '[attr.data-value]': 'value()',
    '[attr.data-active]': 'isActive() ? "" : null',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '[attr.aria-selected]': 'isActive() ? "true" : "false"',
    '[attr.aria-controls]': 'contentId()',
    '[attr.aria-disabled]': 'disabled() ? "true" : null',
    '[attr.tabindex]': 'disabled() ? -1 : isActive() ? 0 : -1',
    '[attr.disabled]': 'isButton() && disabled() ? "" : null',
    '(click)': 'handleClick($event)',
  },
})
export class FrTabsTrigger {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly root = inject(FR_TABS_ROOT, { optional: true });

  readonly value = input<string | null>(null);
  readonly active = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });

  protected readonly isActive = computed(() => this.active() || !!this.root?.isSelected(this.value()));
  protected readonly contentId = computed(() => (this.value() ? `frame-tabs-content-${this.value()}` : null));

  protected handleClick(event: Event): void {
    if (this.disabled()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    const value = this.value();
    if (value && this.root) {
      this.root.select(value);
    }
  }

  protected isButton(): boolean {
    return this.elementRef.nativeElement.tagName.toLowerCase() === 'button';
  }
}

@Directive({
  selector: '[frTabsContent], frame-tabs-content',
  host: {
    class: 'frame-tabs__content',
    role: 'tabpanel',
    '[attr.id]': 'contentId()',
    '[attr.data-value]': 'value()',
    '[attr.data-active]': 'isActive() ? "" : null',
    '[attr.hidden]': 'isActive() ? null : ""',
    '[attr.tabindex]': 'isActive() ? 0 : -1',
  },
})
export class FrTabsContent {
  private readonly root = inject(FR_TABS_ROOT, { optional: true });

  readonly value = input.required<string>();
  readonly active = input(false, { transform: booleanAttribute });

  protected readonly isActive = computed(() => this.active() || !!this.root?.isSelected(this.value()));
  protected readonly contentId = computed(() => `frame-tabs-content-${this.value()}`);
}
