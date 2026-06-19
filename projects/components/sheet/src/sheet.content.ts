import { Direction } from '@angular/cdk/bidi';
import {
  Directive,
  TemplateRef,
  ViewContainerRef,
  booleanAttribute,
  inject,
  input,
} from '@angular/core';

import { FrSheetConfig } from './sheet.service';

/** Content slot for sheet. */
@Directive({
  selector: 'ng-template[frSheetContent]',
  exportAs: 'frSheetContent',
})
export class FrSheetContent {
  readonly templateRef = inject(TemplateRef<unknown>);

  readonly ariaLabel = input<string | null>(null, { alias: 'aria-label' });
  readonly ariaLabelledBy = input<string | null>(null, { alias: 'aria-labelledby' });
  readonly ariaDescribedBy = input<string | null>(null, { alias: 'aria-describedby' });
  readonly backdropClass = input<string | string[] | null>(null);
  readonly closeOnDestroy = input(true, { transform: booleanAttribute });
  readonly closeOnNavigation = input(true, { transform: booleanAttribute });
  readonly direction = input<Direction | null>(null);
  readonly disableClose = input(false, { transform: booleanAttribute });
  readonly height = input<string | null>(null);
  readonly id = input<string | null>(null);
  readonly maxHeight = input<string | null>(null);
  readonly maxWidth = input<string | null>(null);
  readonly minHeight = input<string | null>(null);
  readonly minWidth = input<string | null>(null);
  readonly panelClass = input<string | string[] | null>(null);
  readonly role = input<'dialog' | 'alertdialog'>('dialog');
  readonly width = input<string | null>(null);

  buildConfig(viewContainerRef: ViewContainerRef): FrSheetConfig {
    return {
      ariaLabel: this.ariaLabel() ?? undefined,
      ariaLabelledBy: this.ariaLabelledBy() ?? undefined,
      ariaDescribedBy: this.ariaDescribedBy() ?? undefined,
      backdropClass: this.backdropClass() ?? undefined,
      closeOnDestroy: this.closeOnDestroy(),
      closeOnNavigation: this.closeOnNavigation(),
      direction: this.direction() ?? undefined,
      disableClose: this.disableClose(),
      height: this.height() ?? undefined,
      id: this.id() ?? undefined,
      maxHeight: this.maxHeight() ?? undefined,
      maxWidth: this.maxWidth() ?? undefined,
      minHeight: this.minHeight() ?? undefined,
      minWidth: this.minWidth() ?? undefined,
      panelClass: this.panelClass() ?? undefined,
      role: this.role(),
      viewContainerRef,
      width: this.width() ?? undefined,
    };
  }
}
