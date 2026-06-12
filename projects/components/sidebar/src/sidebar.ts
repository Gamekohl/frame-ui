import {
  Directive,
  ElementRef,
  HostListener,
  InjectionToken,
  booleanAttribute,
  computed,
  effect,
  inject,
  input,
  numberAttribute,
  output,
  signal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

export const FR_SIDEBAR_SIDES = ['left', 'right'] as const;
export const FR_SIDEBAR_VARIANTS = ['sidebar', 'floating', 'inset'] as const;
export const FR_SIDEBAR_COLLAPSIBLES = ['offcanvas', 'icon', 'none'] as const;
export const FR_SIDEBAR_MENU_BUTTON_SIZES = ['default', 'sm', 'lg'] as const;
export const FR_SIDEBAR_MENU_BUTTON_VARIANTS = ['default', 'outline'] as const;

export type FrSidebarSide = (typeof FR_SIDEBAR_SIDES)[number];
export type FrSidebarVariant = (typeof FR_SIDEBAR_VARIANTS)[number];
export type FrSidebarCollapsible = (typeof FR_SIDEBAR_COLLAPSIBLES)[number];
export type FrSidebarState = 'expanded' | 'collapsed';
export type FrSidebarMenuButtonSize = (typeof FR_SIDEBAR_MENU_BUTTON_SIZES)[number];
export type FrSidebarMenuButtonVariant = (typeof FR_SIDEBAR_MENU_BUTTON_VARIANTS)[number];

export const FR_SIDEBAR_PROVIDER = new InjectionToken<FrSidebarProvider>('FR_SIDEBAR_PROVIDER');

function coerceSide(value: unknown): FrSidebarSide {
  return value === 'right' ? 'right' : 'left';
}

function coerceVariant(value: unknown): FrSidebarVariant {
  return value === 'floating' || value === 'inset' ? value : 'sidebar';
}

function coerceCollapsible(value: unknown): FrSidebarCollapsible {
  return value === 'icon' || value === 'none' ? value : 'offcanvas';
}

function coerceMenuButtonSize(value: unknown): FrSidebarMenuButtonSize {
  return value === 'sm' || value === 'lg' ? value : 'default';
}

function coerceMenuButtonVariant(value: unknown): FrSidebarMenuButtonVariant {
  return value === 'outline' ? 'outline' : 'default';
}

function coerceOptionalNumber(value: unknown): number | null {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  const coerced = numberAttribute(value, Number.NaN);
  return Number.isFinite(coerced) ? coerced : null;
}

@Directive({
  selector: '[frSidebarProvider], frame-sidebar-provider',
  exportAs: 'frSidebarProvider',
  providers: [
    {
      provide: FR_SIDEBAR_PROVIDER,
      useExisting: FrSidebarProvider,
    },
  ],
  host: {
    class: 'frame-sidebar-provider',
    '[attr.data-state]': 'state()',
    '[attr.data-open]': 'open()',
    '[attr.data-mobile-open]': 'openMobile()',
    '[attr.data-mobile]': 'isMobile() ? "" : null',
    '[attr.data-resizing]': 'resizing() ? "" : null',
  },
})
export class FrSidebarProvider {
  private readonly document = inject(DOCUMENT);
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly internalOpen = signal(true);
  private readonly internalOpenMobile = signal(false);
  protected readonly resizing = signal(false);

  readonly defaultOpen = input(true, { transform: booleanAttribute });
  readonly openInput = input<boolean | null>(null, { alias: 'open' });
  readonly openChange = output<boolean>();
  readonly openMobileChange = output<boolean>();
  readonly shortcut = input('b');
  readonly keyboardShortcut = input(true, { transform: booleanAttribute });
  readonly isMobile = signal(false);

  readonly open = computed(() => this.openInput() ?? this.internalOpen());
  readonly openMobile = computed(() => this.internalOpenMobile());
  readonly state = computed<FrSidebarState>(() => (this.open() ? 'expanded' : 'collapsed'));

  constructor() {
    this.internalOpen.set(this.defaultOpen());

    effect(() => {
      if (this.openInput() === null) {
        this.internalOpen.set(this.defaultOpen());
      }
    });

    effect(() => {
      this.elementRef.nativeElement.style.setProperty('--frame-sidebar-state', this.state());
    });

    const defaultView = this.document.defaultView;
    if (!defaultView?.matchMedia) {
      return;
    }

    const mediaQuery = defaultView.matchMedia('(max-width: 768px)');
    const updateMobile = () => this.isMobile.set(mediaQuery.matches);
    updateMobile();
    mediaQuery.addEventListener?.('change', updateMobile);
  }

  setOpen(open: boolean): void {
    if (this.openInput() === null) {
      this.internalOpen.set(open);
    }

    this.openChange.emit(open);
  }

  setOpenMobile(open: boolean): void {
    this.internalOpenMobile.set(open);
    this.openMobileChange.emit(open);
  }

  setSidebarWidth(width: number): void {
    this.elementRef.nativeElement.style.setProperty('--frame-sidebar-width', `${width}px`);
  }

  setResizing(resizing: boolean): void {
    this.resizing.set(resizing);
  }

  toggleSidebar(): void {
    if (this.isMobile()) {
      this.setOpenMobile(!this.openMobile());
      return;
    }

    this.setOpen(!this.open());
  }

  @HostListener('document:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    if (!this.keyboardShortcut()) {
      return;
    }

    const key = this.shortcut().toLowerCase();
    if (event.key.toLowerCase() !== key || (!event.metaKey && !event.ctrlKey)) {
      return;
    }

    event.preventDefault();
    this.toggleSidebar();
  }
}

@Directive({
  selector: '[frSidebar], frame-sidebar',
  host: {
    class: 'frame-sidebar',
    '[attr.data-side]': 'side()',
    '[attr.data-variant]': 'variant()',
    '[attr.data-collapsible]': 'collapsible()',
    '[attr.data-state]': 'provider?.state() ?? "expanded"',
    '[attr.data-mobile-open]': 'provider?.openMobile() ?? false',
  },
})
export class FrSidebar {
  readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  readonly provider = inject(FR_SIDEBAR_PROVIDER, { optional: true });
  readonly side = input<FrSidebarSide, unknown>('left', { transform: coerceSide });
  readonly variant = input<FrSidebarVariant, unknown>('sidebar', { transform: coerceVariant });
  readonly collapsible = input<FrSidebarCollapsible, unknown>('offcanvas', {
    transform: coerceCollapsible,
  });
  readonly minSize = input<number | null, unknown>(null, { transform: coerceOptionalNumber });
  readonly maxSize = input<number | null, unknown>(384, { transform: coerceOptionalNumber });
}

@Directive({
  selector: '[frSidebarTrigger]',
  host: {
    class: 'frame-sidebar__trigger',
    type: 'button',
    '[attr.aria-expanded]': 'provider?.open() ?? true',
    '[attr.aria-label]': 'ariaLabel()',
    '(click)': 'toggle()',
  },
})
export class FrSidebarTrigger {
  readonly provider = inject(FR_SIDEBAR_PROVIDER, { optional: true });
  readonly ariaLabel = input('Toggle sidebar', { alias: 'aria-label' });

  toggle(): void {
    this.provider?.toggleSidebar();
  }
}

@Directive({
  selector: '[frSidebarRail], frame-sidebar-rail',
  host: {
    class: 'frame-sidebar__rail',
    role: 'separator',
    tabindex: '0',
    'aria-label': 'Resize sidebar',
    'aria-orientation': 'vertical',
    '(click)': 'toggle()',
    '(pointerdown)': 'startResize($event)',
    '(keydown.enter)': 'toggle()',
    '(keydown.space)': 'toggle(); $event.preventDefault()',
  },
})
export class FrSidebarRail {
  private readonly document = inject(DOCUMENT);
  private readonly sidebar = inject(FrSidebar, { optional: true });
  private startX = 0;
  private startWidth = 0;
  private dragging = false;
  private suppressClick = false;
  private frameId = -1;
  private pendingWidth = 0;
  private resizeMinSize = 192;
  private resizeMaxSize = 384;

  readonly provider = inject(FR_SIDEBAR_PROVIDER, { optional: true });

  toggle(): void {
    if (this.suppressClick) {
      return;
    }

    this.provider?.toggleSidebar();
  }

  startResize(event: PointerEvent): void {
    if (!this.sidebar || !this.provider || this.provider.isMobile()) {
      return;
    }

    this.startX = event.clientX;
    this.startWidth = this.sidebar.elementRef.nativeElement.getBoundingClientRect().width;
    this.dragging = false;
    this.pendingWidth = this.startWidth;
    this.captureResizeBounds();
    this.provider.setResizing(true);
    event.preventDefault();

    const move = (moveEvent: PointerEvent) => this.resize(moveEvent);
    const up = () => {
      this.document.removeEventListener('pointermove', move);
      this.document.removeEventListener('pointerup', up);
      this.flushResize();
      this.provider?.setResizing(false);
      this.suppressClick = this.dragging;
      this.dragging = false;
      this.pendingWidth = 0;
      this.resizeMinSize = 192;
      this.resizeMaxSize = 384;
      setTimeout(() => {
        this.suppressClick = false;
      });
    };

    this.document.addEventListener('pointermove', move);
    this.document.addEventListener('pointerup', up, { once: true });
  }

  private resize(event: PointerEvent): void {
    if (!this.sidebar || !this.provider) {
      return;
    }

    const delta = event.clientX - this.startX;
    const direction = this.sidebar.side() === 'right' ? -1 : 1;
    const nextWidth = this.clampWidth(this.startWidth + delta * direction);

    if (Math.abs(delta) > 3) {
      this.dragging = true;
    }

    this.pendingWidth = nextWidth;

    if (this.frameId !== -1) {
      return;
    }

    this.frameId = requestAnimationFrame(() => {
      this.provider?.setSidebarWidth(this.pendingWidth);
      this.frameId = -1;
    });
  }

  private flushResize(): void {
    if (this.frameId !== -1) {
      cancelAnimationFrame(this.frameId);
      this.frameId = -1;
    }

    if (this.pendingWidth) {
      this.provider?.setSidebarWidth(this.pendingWidth);
    }
  }

  private clampWidth(width: number): number {
    return Math.min(Math.max(width, this.resizeMinSize), this.resizeMaxSize);
  }

  private captureResizeBounds(): void {
    if (!this.sidebar) {
      return;
    }

    const minSize = this.sidebar.minSize() ?? this.measureContentMinSize();
    const maxSize = this.sidebar.maxSize() ?? Number.POSITIVE_INFINITY;

    this.resizeMinSize = minSize;
    this.resizeMaxSize = Math.max(minSize, maxSize);
  }

  private measureContentMinSize(): number {
    if (!this.sidebar) {
      return 192;
    }

    const sidebarElement = this.sidebar.elementRef.nativeElement;
    const sidebarRect = sidebarElement.getBoundingClientRect();
    let measuredWidth = 0;

    for (const element of Array.from(sidebarElement.querySelectorAll<HTMLElement>('*'))) {
      if (element.hasAttribute('frSidebarRail') || element.tagName.toLowerCase() === 'frame-sidebar-rail') {
        continue;
      }

      const rect = element.getBoundingClientRect();
      const inlineStart = Math.max(0, rect.left - sidebarRect.left);
      measuredWidth = Math.max(measuredWidth, inlineStart + element.scrollWidth);
    }

    return Math.max(Math.ceil(measuredWidth), 192);
  }
}

@Directive({
  selector: '[frSidebarInset], frame-sidebar-inset',
  host: {
    class: 'frame-sidebar-inset',
  },
})
export class FrSidebarInset {}

@Directive({
  selector: '[frSidebarHeader], frame-sidebar-header',
  host: {
    class: 'frame-sidebar__header',
  },
})
export class FrSidebarHeader {}

@Directive({
  selector: '[frSidebarFooter], frame-sidebar-footer',
  host: {
    class: 'frame-sidebar__footer',
  },
})
export class FrSidebarFooter {}

@Directive({
  selector: '[frSidebarContent], frame-sidebar-content',
  host: {
    class: 'frame-sidebar__content',
  },
})
export class FrSidebarContent {}

@Directive({
  selector: '[frSidebarGroup], frame-sidebar-group',
  host: {
    class: 'frame-sidebar__group',
  },
})
export class FrSidebarGroup {}

@Directive({
  selector: '[frSidebarGroupLabel], frame-sidebar-group-label',
  host: {
    class: 'frame-sidebar__group-label',
  },
})
export class FrSidebarGroupLabel {}

@Directive({
  selector: '[frSidebarGroupAction], frame-sidebar-group-action',
  host: {
    class: 'frame-sidebar__group-action',
    type: 'button',
  },
})
export class FrSidebarGroupAction {}

@Directive({
  selector: '[frSidebarGroupContent], frame-sidebar-group-content',
  host: {
    class: 'frame-sidebar__group-content',
  },
})
export class FrSidebarGroupContent {}

@Directive({
  selector: '[frSidebarMenu], frame-sidebar-menu',
  host: {
    class: 'frame-sidebar__menu',
    role: 'list',
  },
})
export class FrSidebarMenu {}

@Directive({
  selector: '[frSidebarMenuItem], frame-sidebar-menu-item',
  host: {
    class: 'frame-sidebar__menu-item',
    role: 'listitem',
  },
})
export class FrSidebarMenuItem {}

@Directive({
  selector: '[frSidebarMenuButton], a[frSidebarMenuButton], button[frSidebarMenuButton]',
  host: {
    class: 'frame-sidebar__menu-button',
    '[attr.data-active]': 'active() ? "" : null',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '[attr.data-size]': 'size()',
    '[attr.data-variant]': 'variant()',
    '[attr.aria-disabled]': 'disabled() ? "true" : null',
    '[attr.tabindex]': 'disabled() ? -1 : null',
    '(click)': 'handleClick($event)',
  },
})
export class FrSidebarMenuButton {
  readonly active = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly size = input<FrSidebarMenuButtonSize, unknown>('default', {
    transform: coerceMenuButtonSize,
  });
  readonly variant = input<FrSidebarMenuButtonVariant, unknown>('default', {
    transform: coerceMenuButtonVariant,
  });
  readonly tooltip = input<string | null>(null);

  handleClick(event: Event): void {
    if (this.disabled()) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
}

@Directive({
  selector: '[frSidebarMenuAction], frame-sidebar-menu-action',
  host: {
    class: 'frame-sidebar__menu-action',
    type: 'button',
    '[attr.data-show-on-hover]': 'showOnHover() ? "" : null',
  },
})
export class FrSidebarMenuAction {
  readonly showOnHover = input(false, { transform: booleanAttribute });
}

@Directive({
  selector: '[frSidebarMenuBadge], frame-sidebar-menu-badge',
  host: {
    class: 'frame-sidebar__menu-badge',
  },
})
export class FrSidebarMenuBadge {}

@Directive({
  selector: '[frSidebarMenuSub], frame-sidebar-menu-sub',
  host: {
    class: 'frame-sidebar__menu-sub',
    role: 'list',
  },
})
export class FrSidebarMenuSub {}

@Directive({
  selector: '[frSidebarMenuSubItem], frame-sidebar-menu-sub-item',
  host: {
    class: 'frame-sidebar__menu-sub-item',
    role: 'listitem',
  },
})
export class FrSidebarMenuSubItem {}

@Directive({
  selector: '[frSidebarMenuSubButton], a[frSidebarMenuSubButton], button[frSidebarMenuSubButton]',
  host: {
    class: 'frame-sidebar__menu-sub-button',
    '[attr.data-active]': 'active() ? "" : null',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '[attr.aria-disabled]': 'disabled() ? "true" : null',
    '(click)': 'handleClick($event)',
  },
})
export class FrSidebarMenuSubButton {
  readonly active = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });

  handleClick(event: Event): void {
    if (this.disabled()) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
}

@Directive({
  selector: '[frSidebarMenuSkeleton], frame-sidebar-menu-skeleton',
  host: {
    class: 'frame-sidebar__menu-skeleton',
    '[attr.data-show-icon]': 'showIcon() ? "" : null',
    '[style.--frame-sidebar-skeleton-width]': 'width()',
  },
})
export class FrSidebarMenuSkeleton {
  readonly showIcon = input(false, { transform: booleanAttribute });
  readonly width = input('72%');
}
