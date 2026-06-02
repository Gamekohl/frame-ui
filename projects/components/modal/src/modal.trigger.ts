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

import { FrModalContent } from './modal.content';
import { FrModalRef, FrModalService } from './modal.service';

@Directive({
  selector: '[frModalTrigger]',
  host: {
    class: 'frame-modal__trigger',
    '[attr.aria-haspopup]': '"dialog"',
    '[attr.data-state]': 'isOpen() ? "open" : "closed"',
    '[attr.disabled]': 'disabled() ? "" : null',
    '[attr.aria-disabled]': 'disabled() ? "true" : null',
    '(click)': 'open()',
  },
})
export class FrModalTrigger {
  private static readonly CUSTOM_PROPERTY_PREFIX = '--frame-modal-';

  private readonly destroyRef = inject(DestroyRef);
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly modal = inject(FrModalService);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private modalRef: FrModalRef | null = null;

  readonly content = input<FrModalContent | TemplateRef<unknown> | null>(null, {
    alias: 'frModalTrigger',
  });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly opened = output<FrModalRef>();
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

    const templateRef = content instanceof FrModalContent ? content.templateRef : content;
    const config =
      content instanceof FrModalContent
        ? content.buildConfig(this.viewContainerRef)
        : { viewContainerRef: this.viewContainerRef };

    this.modalRef = this.modal.open(templateRef, config);
    this.isOpen.set(true);
    this.opened.emit(this.modalRef);
    queueMicrotask(() => this.syncCustomPropertiesToOverlay());

    this.modalRef.closed.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((result) => {
      this.isOpen.set(false);
      this.modalRef = null;
      this.closed.emit(result);
    });
  }

  private syncCustomPropertiesToOverlay(): void {
    const overlayElement = this.modalRef?.overlayRef.overlayElement ?? null;

    if (!overlayElement) {
      return;
    }

    const modalPanel = overlayElement.querySelector<HTMLElement>('.frame-modal__panel') ?? overlayElement;
    const sourceStyles = getComputedStyle(this.elementRef.nativeElement);

    for (let index = 0; index < sourceStyles.length; index += 1) {
      const propertyName = sourceStyles.item(index);

      if (!propertyName.startsWith(FrModalTrigger.CUSTOM_PROPERTY_PREFIX)) {
        continue;
      }

      const propertyValue = sourceStyles.getPropertyValue(propertyName);

      overlayElement.style.setProperty(propertyName, propertyValue);
      modalPanel.style.setProperty(propertyName, propertyValue);
    }
  }
}
