import { NgComponentOutlet } from '@angular/common';
import { Component, Injector, Type, inject } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

import { FrButton, FrButtonAppearance, FrButtonLabel } from '@frame-ui-ng/components/button';
import {
  FrModalBody,
  FrModalDescription,
  FrModalFooter,
  FrModalHeader,
  FrModalPanel,
  FrModalTitle,
} from './modal.primitives';
import { FR_MODAL_DATA } from './modal.tokens';

export type FrModalFooterAction = {
  appearance?: FrButtonAppearance;
  ariaLabel?: string;
  close?: boolean;
  disabled?: boolean;
  label: string;
  result?: unknown;
};

export type FrModalShellOptions = {
  bodyComponent: Type<unknown>;
  bodyData?: unknown;
  bodyInputs?: Record<string, unknown>;
  description?: string;
  footerActions?: FrModalFooterAction[];
  scrollable?: boolean;
  showCloseButton?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  stickyFooter?: boolean;
  title?: string;
};

/** Default shell for modal content, title, and footer actions. */
@Component({
  selector: 'frame-modal-shell',
  imports: [
    FrButton,
    FrButtonLabel,
    FrModalBody,
    FrModalDescription,
    FrModalFooter,
    FrModalHeader,
    FrModalPanel,
    FrModalTitle,
    NgComponentOutlet,
  ],
  template: `
    <div
      frModalPanel
      [size]="options.size ?? 'md'"
      [showCloseButton]="options.showCloseButton ?? true"
      [scrollable]="options.scrollable ?? false"
      [stickyFooter]="options.stickyFooter ?? false"
    >
      @if (options.title || options.description) {
        <div frModalHeader>
          @if (options.title) {
            <h2 frModalTitle>{{ options.title }}</h2>
          }

          @if (options.description) {
            <p frModalDescription>{{ options.description }}</p>
          }
        </div>
      }

      <div frModalBody>
        <ng-container
          [ngComponentOutlet]="options.bodyComponent"
          [ngComponentOutletInputs]="options.bodyInputs ?? {}"
          [ngComponentOutletInjector]="bodyInjector"
        />
      </div>

      @if (options.footerActions?.length) {
        <div frModalFooter>
          @for (action of options.footerActions; track action.label) {
            <button
              frButton
              type="button"
              [appearance]="action.appearance ?? 'primary'"
              [disabled]="action.disabled ?? false"
              [attr.aria-label]="action.ariaLabel ?? null"
              (click)="handleAction(action)"
            >
              <span frButtonLabel>{{ action.label }}</span>
            </button>
          }
        </div>
      }
    </div>
  `,
})
export class FrModalShell {
  private readonly dialogRef = inject(DialogRef<unknown>);
  private readonly injector = inject(Injector);
  readonly options = inject<FrModalShellOptions>(DIALOG_DATA);
  readonly bodyInjector = Injector.create({
    parent: this.injector,
    providers: [
      {
        provide: FR_MODAL_DATA,
        useValue: this.options.bodyData,
      },
    ],
  });

  handleAction(action: FrModalFooterAction): void {
    if (action.close ?? true) {
      this.dialogRef.close(action.result);
    }
  }
}


