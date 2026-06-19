import { ConnectedOverlayPositionChange, ConnectedPosition, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  DestroyRef,
  Directive,
  ElementRef,
  PLATFORM_ID,
  booleanAttribute,
  inject,
  input,
  numberAttribute,
  output,
  signal,
} from '@angular/core';
import { FrButton, FrButtonAppearance, FrButtonLabel, FrButtonSize } from '@frame-ui-ng/components/button';
import { FrPopoverAlignment, FrPopoverSide } from '@frame-ui-ng/components/popover';

export type FrConfirmPopoverResult = 'cancel' | 'confirm';

export type FrConfirmPopoverConfig = {
  align?: FrPopoverAlignment;
  alignOffset?: number;
  buttonSize?: FrButtonSize;
  cancelAppearance?: FrButtonAppearance;
  cancelLabel?: string;
  confirmAppearance?: FrButtonAppearance;
  confirmLabel?: string;
  description?: string;
  disabled?: boolean;
  side?: FrPopoverSide;
  sideOffset?: number;
  title?: string;
};

type ResolvedConfirmPopoverConfig = Required<
  Omit<FrConfirmPopoverConfig, 'description'>
> & {
  description?: string;
};

let nextConfirmPopoverId = 0;

/** Flexible confirmation popover trigger that can attach to any host element. */
@Directive({
  selector: `
    [frConfirmPopover],
    [frConfirmPopoverAlign],
    [frConfirmPopoverAlignOffset],
    [frConfirmPopoverButtonSize],
    [frConfirmPopoverCancelAppearance],
    [frConfirmPopoverCancelLabel],
    [frConfirmPopoverConfirmAppearance],
    [frConfirmPopoverConfirmLabel],
    [frConfirmPopoverDescription],
    [frConfirmPopoverDisabled],
    [frConfirmPopoverSide],
    [frConfirmPopoverSideOffset],
    [frConfirmPopoverTitle]
  `,
  exportAs: 'frConfirmPopover',
  host: {
    class: 'frame-confirm-popover__trigger',
    '[attr.aria-expanded]': 'isOpen()',
    '[attr.aria-haspopup]': '"dialog"',
    '[attr.data-state]': 'isOpen() ? "open" : "closed"',
    '(click)': 'handleClick($event)',
    '(keydown)': 'handleKeydown($event)',
  },
})
export class FrConfirmPopover {
  private readonly destroyRef = inject(DestroyRef);
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly overlay = inject(Overlay);
  private readonly platformId = inject(PLATFORM_ID);

  readonly config = input<FrConfirmPopoverConfig | string>({}, { alias: 'frConfirmPopover' });
  readonly align = input<FrPopoverAlignment | undefined>(undefined, { alias: 'frConfirmPopoverAlign' });
  readonly alignOffset = input<number | undefined, unknown>(undefined, {
    alias: 'frConfirmPopoverAlignOffset',
    transform: optionalNumberAttribute,
  });
  readonly buttonSize = input<FrButtonSize | undefined>(undefined, { alias: 'frConfirmPopoverButtonSize' });
  readonly cancelAppearance = input<FrButtonAppearance | undefined>(undefined, {
    alias: 'frConfirmPopoverCancelAppearance',
  });
  readonly cancelLabel = input<string | undefined>(undefined, { alias: 'frConfirmPopoverCancelLabel' });
  readonly confirmAppearance = input<FrButtonAppearance | undefined>(undefined, {
    alias: 'frConfirmPopoverConfirmAppearance',
  });
  readonly confirmLabel = input<string | undefined>(undefined, { alias: 'frConfirmPopoverConfirmLabel' });
  readonly description = input<string | undefined>(undefined, { alias: 'frConfirmPopoverDescription' });
  readonly disabled = input<boolean | undefined, unknown>(undefined, {
    alias: 'frConfirmPopoverDisabled',
    transform: optionalBooleanAttribute,
  });
  readonly side = input<FrPopoverSide | undefined>(undefined, { alias: 'frConfirmPopoverSide' });
  readonly sideOffset = input<number | undefined, unknown>(undefined, {
    alias: 'frConfirmPopoverSideOffset',
    transform: optionalNumberAttribute,
  });
  readonly title = input<string | undefined>(undefined, { alias: 'frConfirmPopoverTitle' });

  readonly closed = output<FrConfirmPopoverResult | undefined>({ alias: 'frConfirmPopoverClosed' });
  readonly cancelled = output<void>({ alias: 'frConfirmPopoverCancelled' });
  readonly confirmed = output<void>({ alias: 'frConfirmPopoverConfirmed' });

  protected readonly isOpen = signal(false);

  private overlayRef: OverlayRef | null = null;
  private panelRef: ComponentRef<FrConfirmPopoverPanel> | null = null;
  private currentSide: FrPopoverSide = 'bottom';

  constructor() {
    this.destroyRef.onDestroy(() => this.destroy());
  }

  open(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const config = this.resolvedConfig();

    if (config.disabled) {
      return;
    }

    if (!this.overlayRef) {
      this.overlayRef = this.createOverlay(config);
    }

    if (!this.overlayRef.hasAttached()) {
      this.panelRef = this.overlayRef.attach(new ComponentPortal(FrConfirmPopoverPanel));
      this.panelRef.instance.cancelled.subscribe(() => this.close('cancel'));
      this.panelRef.instance.confirmed.subscribe(() => this.close('confirm'));
      this.syncCustomPropertiesToOverlay();
    }

    this.updatePanelInputs(config);
    this.isOpen.set(true);
  }

  close(result?: FrConfirmPopoverResult): void {
    this.detachPanel({ dispose: true });
    this.closed.emit(result);

    if (result === 'confirm') {
      this.confirmed.emit();
      return;
    }

    if (result === 'cancel') {
      this.cancelled.emit();
    }
  }

  toggle(): void {
    if (this.isOpen()) {
      this.close();
      return;
    }

    this.open();
  }

  protected handleClick(event: Event): void {
    event.preventDefault();
    this.toggle();
  }

  protected handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.close();
      return;
    }

    if (this.isNativeInteractiveElement()) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggle();
    }
  }

  private createOverlay(config: ResolvedConfirmPopoverConfig): OverlayRef {
    this.currentSide = config.side;

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.elementRef.nativeElement)
      .withPositions(buildConfirmPopoverPositions(config))
      .withPush(true)
      .withViewportMargin(12);

    positionStrategy.positionChanges.subscribe((event) => this.handlePositionChange(event));

    const overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'frame-popover__backdrop',
      panelClass: [
        'frame-popover-overlay',
        'frame-confirm-popover-overlay',
        `frame-popover-overlay--${config.side}`,
      ],
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
    });

    overlayRef.backdropClick().subscribe(() => this.close());
    overlayRef.keydownEvents().subscribe((event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        this.close();
      }
    });

    return overlayRef;
  }

  private handlePositionChange(event: ConnectedOverlayPositionChange): void {
    const pair = event.connectionPair;
    const side: FrPopoverSide = pair.overlayY === 'top'
      ? 'bottom'
      : pair.overlayY === 'bottom'
        ? 'top'
        : pair.overlayX === 'start'
          ? 'right'
          : 'left';

    this.currentSide = side;
    this.panelRef?.setInput('side', side);
    this.overlayRef?.removePanelClass([
      'frame-popover-overlay--top',
      'frame-popover-overlay--right',
      'frame-popover-overlay--bottom',
      'frame-popover-overlay--left',
    ]);
    this.overlayRef?.addPanelClass(`frame-popover-overlay--${side}`);
  }

  private updatePanelInputs(config: ResolvedConfirmPopoverConfig): void {
    const panelRef = this.panelRef;

    if (!panelRef) {
      return;
    }

    const panelId = `frame-confirm-popover-${nextConfirmPopoverId++}`;

    panelRef.setInput('buttonSize', config.buttonSize);
    panelRef.setInput('cancelAppearance', config.cancelAppearance);
    panelRef.setInput('cancelLabel', config.cancelLabel);
    panelRef.setInput('confirmAppearance', config.confirmAppearance);
    panelRef.setInput('confirmLabel', config.confirmLabel);
    panelRef.setInput('description', config.description);
    panelRef.setInput('descriptionId', config.description ? `${panelId}-description` : null);
    panelRef.setInput('side', this.currentSide);
    panelRef.setInput('title', config.title);
    panelRef.setInput('titleId', `${panelId}-title`);
  }

  private resolvedConfig(): ResolvedConfirmPopoverConfig {
    const config = this.config();
    const baseConfig: FrConfirmPopoverConfig = typeof config === 'string' ? { title: config } : config;

    return {
      align: this.align() ?? baseConfig.align ?? 'center',
      alignOffset: this.alignOffset() ?? baseConfig.alignOffset ?? 0,
      buttonSize: this.buttonSize() ?? baseConfig.buttonSize ?? 'sm',
      cancelAppearance: this.cancelAppearance() ?? baseConfig.cancelAppearance ?? 'outline',
      cancelLabel: this.cancelLabel() ?? baseConfig.cancelLabel ?? 'Cancel',
      confirmAppearance: this.confirmAppearance() ?? baseConfig.confirmAppearance ?? 'primary',
      confirmLabel: this.confirmLabel() ?? baseConfig.confirmLabel ?? 'Confirm',
      description: this.description() ?? baseConfig.description,
      disabled: this.disabled() ?? baseConfig.disabled ?? false,
      side: this.side() ?? baseConfig.side ?? 'bottom',
      sideOffset: this.sideOffset() ?? baseConfig.sideOffset ?? 8,
      title: this.title() ?? baseConfig.title ?? 'Are you sure?',
    };
  }

  private syncCustomPropertiesToOverlay(): void {
    const overlayPane = this.overlayRef?.overlayElement;
    const panel = overlayPane?.querySelector<HTMLElement>('.frame-confirm-popover__content');

    if (!overlayPane || !panel || typeof getComputedStyle === 'undefined') {
      return;
    }

    const sourceStyles = getComputedStyle(this.elementRef.nativeElement);

    // Overlay content is portaled, so copy popover-compatible token overrides from the trigger.
    for (let index = 0; index < sourceStyles.length; index += 1) {
      const propertyName = sourceStyles.item(index);

      if (!propertyName.startsWith('--frame-popover-') && !propertyName.startsWith('--frame-confirm-popover-')) {
        continue;
      }

      const propertyValue = sourceStyles.getPropertyValue(propertyName);
      overlayPane.style.setProperty(propertyName, propertyValue);
      panel.style.setProperty(propertyName, propertyValue);
    }
  }

  private isNativeInteractiveElement(): boolean {
    const tagName = this.elementRef.nativeElement.tagName.toLowerCase();

    return ['a', 'button', 'input', 'select', 'textarea'].includes(tagName);
  }

  private destroy(): void {
    this.detachPanel({ dispose: true });
  }

  private detachPanel(options: { dispose?: boolean } = {}): void {
    this.overlayRef?.detach();
    this.panelRef = null;
    this.isOpen.set(false);

    if (options.dispose) {
      this.overlayRef?.dispose();
      this.overlayRef = null;
    }
  }
}

@Component({
  selector: 'frame-confirm-popover-panel',
  imports: [FrButton, FrButtonLabel],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="frame-popover__content frame-confirm-popover__content"
      role="alertdialog"
      [attr.aria-describedby]="descriptionId()"
      [attr.aria-labelledby]="titleId()"
      [attr.data-side]="side()"
    >
      <div class="frame-popover__header frame-confirm-popover__header">
        <h3 class="frame-popover__title frame-confirm-popover__title" [id]="titleId()">
          {{ title() }}
        </h3>

        @if (description()) {
          <p class="frame-popover__description frame-confirm-popover__description" [id]="descriptionId()">
            {{ description() }}
          </p>
        }
      </div>

      <div class="frame-popover__footer frame-confirm-popover__footer">
        <button
          frButton
          type="button"
          [appearance]="cancelAppearance()"
          [size]="buttonSize()"
          (click)="cancelled.emit()"
        >
          <span frButtonLabel>{{ cancelLabel() }}</span>
        </button>
        <button
          frButton
          type="button"
          [appearance]="confirmAppearance()"
          [size]="buttonSize()"
          (click)="confirmed.emit()"
        >
          <span frButtonLabel>{{ confirmLabel() }}</span>
        </button>
      </div>
    </div>
  `,
})
export class FrConfirmPopoverPanel {
  readonly buttonSize = input<FrButtonSize>('sm');
  readonly cancelAppearance = input<FrButtonAppearance>('outline');
  readonly cancelLabel = input('Cancel');
  readonly confirmAppearance = input<FrButtonAppearance>('primary');
  readonly confirmLabel = input('Confirm');
  readonly description = input<string | undefined>(undefined);
  readonly descriptionId = input<string | null>(null);
  readonly side = input<FrPopoverSide>('bottom');
  readonly title = input('Are you sure?');
  readonly titleId = input.required<string>();

  readonly cancelled = output<void>();
  readonly confirmed = output<void>();
}

function buildConfirmPopoverPositions(options: {
  align: FrPopoverAlignment;
  alignOffset: number;
  side: FrPopoverSide;
  sideOffset: number;
}): ConnectedPosition[] {
  const primary = buildPosition(options.side, options);
  const fallback = buildPosition(oppositeSide(options.side), options);

  return [primary, fallback];
}

function buildPosition(
  side: FrPopoverSide,
  options: {
    align: FrPopoverAlignment;
    alignOffset: number;
    sideOffset: number;
  },
): ConnectedPosition {
  if (side === 'top' || side === 'bottom') {
    const isBottom = side === 'bottom';

    return {
      originX: options.align,
      originY: isBottom ? 'bottom' : 'top',
      overlayX: options.align,
      overlayY: isBottom ? 'top' : 'bottom',
      offsetX: options.alignOffset,
      offsetY: isBottom ? options.sideOffset : -options.sideOffset,
    };
  }

  const isRight = side === 'right';

  return {
    originX: isRight ? 'end' : 'start',
    originY: verticalPosition(options.align),
    overlayX: isRight ? 'start' : 'end',
    overlayY: verticalPosition(options.align),
    offsetX: isRight ? options.sideOffset : -options.sideOffset,
    offsetY: options.alignOffset,
  };
}

function verticalPosition(align: FrPopoverAlignment): 'top' | 'center' | 'bottom' {
  if (align === 'center') {
    return 'center';
  }

  return align === 'start' ? 'top' : 'bottom';
}

function oppositeSide(side: FrPopoverSide): FrPopoverSide {
  if (side === 'top') {
    return 'bottom';
  }

  if (side === 'bottom') {
    return 'top';
  }

  if (side === 'left') {
    return 'right';
  }

  return 'left';
}

function optionalBooleanAttribute(value: unknown): boolean | undefined {
  return value == null ? undefined : booleanAttribute(value);
}

function optionalNumberAttribute(value: unknown): number | undefined {
  return value == null ? undefined : numberAttribute(value);
}
