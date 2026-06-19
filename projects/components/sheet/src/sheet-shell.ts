import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { NgComponentOutlet } from '@angular/common';
import { Component, Injector, Type, inject } from '@angular/core';

import { FrButton, FrButtonAppearance, FrButtonLabel } from '@frame-ui-ng/components/button';
import {
  FrSheetBody,
  FrSheetDescription,
  FrSheetFooter,
  FrSheetHeader,
  FrSheetPanel,
  FrSheetSide,
  FrSheetTitle,
} from './sheet.primitives';
import { FR_SHEET_DATA } from './sheet.tokens';

export type FrSheetFooterAction = {
  appearance?: FrButtonAppearance;
  ariaLabel?: string;
  close?: boolean;
  disabled?: boolean;
  label: string;
  result?: unknown;
};

export type FrSheetShellOptions = {
  bodyComponent: Type<unknown>;
  bodyData?: unknown;
  bodyInputs?: Record<string, unknown>;
  description?: string;
  footerActions?: FrSheetFooterAction[];
  scrollable?: boolean;
  showCloseButton?: boolean;
  side?: FrSheetSide;
  title?: string;
};

/** Default shell for sheet content, title, and footer actions. */
@Component({
  selector: 'frame-sheet-shell',
  imports: [
    FrButton,
    FrButtonLabel,
    FrSheetBody,
    FrSheetDescription,
    FrSheetFooter,
    FrSheetHeader,
    FrSheetPanel,
    FrSheetTitle,
    NgComponentOutlet,
  ],
  template: `
    <div
      frSheetPanel
      [side]="options.side ?? 'right'"
      [showCloseButton]="options.showCloseButton ?? true"
      [scrollable]="options.scrollable ?? false"
    >
      @if (options.title || options.description) {
        <div frSheetHeader>
          @if (options.title) {
            <h2 frSheetTitle>{{ options.title }}</h2>
          }

          @if (options.description) {
            <p frSheetDescription>{{ options.description }}</p>
          }
        </div>
      }

      <div frSheetBody>
        <ng-container
          [ngComponentOutlet]="options.bodyComponent"
          [ngComponentOutletInputs]="options.bodyInputs ?? {}"
          [ngComponentOutletInjector]="bodyInjector"
        />
      </div>

      @if (options.footerActions?.length) {
        <div frSheetFooter>
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
export class FrSheetShell {
  private readonly dialogRef = inject(DialogRef<unknown>);
  private readonly injector = inject(Injector);
  readonly options = inject<FrSheetShellOptions>(DIALOG_DATA);
  readonly bodyInjector = Injector.create({
    parent: this.injector,
    providers: [
      {
        provide: FR_SHEET_DATA,
        useValue: this.options.bodyData,
      },
    ],
  });

  handleAction(action: FrSheetFooterAction): void {
    if (action.close ?? true) {
      this.dialogRef.close(action.result);
    }
  }
}


