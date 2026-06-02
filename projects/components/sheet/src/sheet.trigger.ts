import {
  DestroyRef,
  Directive,
  ElementRef,
  TemplateRef,
  ViewContainerRef,
  booleanAttribute,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { FrSheetContent } from './sheet.content';
import { FrSheetRef, FrSheetService } from './sheet.service';

@Directive({
  selector: '[frSheetTrigger]',
  host: {
    class: 'frame-sheet__trigger',
    '[attr.aria-haspopup]': '"dialog"',
    '[attr.data-state]': 'isOpen() ? "open" : "closed"',
    '[attr.disabled]': 'disabled() ? "" : null',
    '[attr.aria-disabled]': 'disabled() ? "true" : null',
    '(click)': 'open()',
  },
})
export class FrSheetTrigger {
  private static readonly CUSTOM_PROPERTY_PREFIX = '--frame-sheet-';

  private readonly destroyRef = inject(DestroyRef);
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly sheet = inject(FrSheetService);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private sheetRef: FrSheetRef | null = null;

  readonly content = input<FrSheetContent | TemplateRef<unknown> | null>(null, {
    alias: 'frSheetTrigger',
  });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly opened = output<FrSheetRef>();
  readonly closed = output<unknown>();
  readonly isOpen = signal(false);

  open(): void {
    if (this.disabled() || this.isOpen()) {
      return;
    }

    const content = this.content();

    if (!content) {
      return;
    }

    const templateRef = content instanceof FrSheetContent ? content.templateRef : content;
    const config =
      content instanceof FrSheetContent
        ? content.buildConfig(this.viewContainerRef)
        : { viewContainerRef: this.viewContainerRef };

    this.sheetRef = this.sheet.open(templateRef, config);
    this.isOpen.set(true);
    this.opened.emit(this.sheetRef);
    queueMicrotask(() => this.syncCustomPropertiesToOverlay());

    this.sheetRef.closed.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((result) => {
      this.isOpen.set(false);
      this.sheetRef = null;
      this.closed.emit(result);
    });
  }

  private syncCustomPropertiesToOverlay(): void {
    const overlayElement = this.sheetRef?.overlayRef.overlayElement ?? null;

    if (!overlayElement) {
      return;
    }

    const sheetPanel = overlayElement.querySelector<HTMLElement>('.frame-sheet__panel') ?? overlayElement;
    const sourceStyles = getComputedStyle(this.elementRef.nativeElement);

    for (let index = 0; index < sourceStyles.length; index += 1) {
      const propertyName = sourceStyles.item(index);

      if (!propertyName.startsWith(FrSheetTrigger.CUSTOM_PROPERTY_PREFIX)) {
        continue;
      }

      const propertyValue = sourceStyles.getPropertyValue(propertyName);

      overlayElement.style.setProperty(propertyName, propertyValue);
      sheetPanel.style.setProperty(propertyName, propertyValue);
    }
  }
}
