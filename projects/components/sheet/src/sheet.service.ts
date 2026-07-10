import { Dialog, DialogConfig, DialogRef } from '@angular/cdk/dialog';
import { Overlay, PositionStrategy } from '@angular/cdk/overlay';
import { ComponentType } from '@angular/cdk/portal';
import { Injectable, TemplateRef, Type, inject } from '@angular/core';

import { FrSheetSide } from './sheet.primitives';
import { FrSheetFooterAction, FrSheetShell, FrSheetShellOptions } from './sheet-shell';

export type FrSheetRef<Result = unknown, Component = unknown> = DialogRef<Result, Component>;
export type FrSheetConfig<Data = unknown, Result = unknown, Component = unknown> = DialogConfig<
  Data,
  DialogRef<Result, Component>
> & {
  bodyData?: unknown;
  bodyInputs?: Record<string, unknown>;
  description?: string;
  footerActions?: FrSheetFooterAction[];
  scrollable?: boolean;
  showCloseButton?: boolean;
  side?: FrSheetSide;
  title?: string;
};

const DEFAULT_PANEL_CLASS = 'frame-sheet__overlay-pane';
const DEFAULT_BACKDROP_CLASS = 'frame-sheet__backdrop';
const SHEET_LEAVE_ANIMATION_MS = 160;
const SHEET_CLOSE_PATCHED = Symbol('frSheetClosePatched');

type AnimatedDialogRef<Result, Component> = DialogRef<Result, Component> & {
  [SHEET_CLOSE_PATCHED]?: boolean;
};

/** Service for opening sheet dialogs. */
@Injectable({ providedIn: 'root' })
export class FrSheetService {
  private readonly dialog = inject(Dialog);
  private readonly overlay = inject(Overlay);

  open<Result = unknown, Data = unknown, Component = unknown>(
    content: ComponentType<Component>,
    config?: FrSheetConfig<Data, Result, Component>,
  ): FrSheetRef<Result, Component>;
  open<Result = unknown, Data = unknown, Context = unknown>(
    content: TemplateRef<Context>,
    config?: FrSheetConfig<Data, Result, Context>,
  ): FrSheetRef<Result, Context>;
  open<Result = unknown, Data = unknown, ComponentOrContext = unknown>(
    content: ComponentType<ComponentOrContext> | TemplateRef<ComponentOrContext>,
    config: FrSheetConfig<Data, Result, ComponentOrContext> = {},
  ): FrSheetRef<Result, ComponentOrContext> {
    if (isComponentType(content) && hasShellOptions(config as FrSheetConfig)) {
      const shellConfig: DialogConfig<FrSheetShellOptions, DialogRef<Result, FrSheetShell>> = {
        ...(withoutShellOptions(config) as unknown as DialogConfig<
          FrSheetShellOptions,
          DialogRef<Result, FrSheetShell>
        >),
        data: {
          bodyComponent: content as Type<unknown>,
          bodyData: config.bodyData ?? config.data,
          bodyInputs: config.bodyInputs,
          description: config.description,
          footerActions: config.footerActions,
          scrollable: config.scrollable,
          showCloseButton: config.showCloseButton,
          side: config.side,
          title: config.title,
        },
      };

      const dialogRef = this.dialog.open<Result, FrSheetShellOptions, FrSheetShell>(
        FrSheetShell,
        this.withDefaultClasses(shellConfig, config.side),
      );

      return withSheetLeaveAnimation(dialogRef) as unknown as FrSheetRef<Result, ComponentOrContext>;
    }

    const dialogRef = this.dialog.open<Result, Data, ComponentOrContext>(
      content,
      this.withDefaultClasses(config, config.side),
    );

    return withSheetLeaveAnimation(dialogRef) as unknown as FrSheetRef<Result, ComponentOrContext>;
  }

  closeAll(): void {
    this.dialog.closeAll();
  }

  private withDefaultClasses<Data, Result, Component>(
    config: DialogConfig<Data, DialogRef<Result, Component>>,
    side: FrSheetSide = 'right',
  ): DialogConfig<Data, DialogRef<Result, Component>> {
    return {
      ariaModal: true,
      autoFocus: 'first-tabbable',
      restoreFocus: true,
      ...config,
      maxHeight: config.maxHeight ?? '100dvh',
      maxWidth: config.maxWidth ?? '100vw',
      positionStrategy: config.positionStrategy ?? this.getSheetPositionStrategy(side),
      panelClass: mergeClassList(
        config.panelClass,
        DEFAULT_PANEL_CLASS,
        `${DEFAULT_PANEL_CLASS}--${side}`,
      ),
      backdropClass: mergeClassList(config.backdropClass, DEFAULT_BACKDROP_CLASS),
    };
  }

  private getSheetPositionStrategy(side: FrSheetSide): PositionStrategy {
    const strategy = this.overlay.position().global();

    switch (side) {
      case 'bottom':
        return strategy.bottom('0').left('0');
      case 'left':
        return strategy.left('0').top('0');
      case 'top':
        return strategy.left('0').top('0');
      case 'right':
      default:
        return strategy.right('0').top('0');
    }
  }
}

function withSheetLeaveAnimation<Result, Component>(
  dialogRef: DialogRef<Result, Component>,
): DialogRef<Result, Component> {
  const animatedRef = dialogRef as AnimatedDialogRef<Result, Component>;

  if (animatedRef[SHEET_CLOSE_PATCHED]) {
    return dialogRef;
  }

  animatedRef[SHEET_CLOSE_PATCHED] = true;
  const originalClose = dialogRef.close.bind(dialogRef) as DialogRef<Result, Component>['close'];
  let closeTimer: ReturnType<typeof setTimeout> | null = null;

  animatedRef.close = ((result?: Result, options?: Parameters<typeof originalClose>[1]) => {
    if (closeTimer) {
      return;
    }

    const overlayElement = dialogRef.overlayRef.overlayElement;
    const panel = overlayElement.querySelector<HTMLElement>('.frame-sheet__panel');
    const backdrop = dialogRef.overlayRef.backdropElement;

    if (shouldSkipSheetLeaveAnimation() || (!panel && !backdrop)) {
      originalClose(result, options);
      return;
    }

    overlayElement.setAttribute('data-closing', '');
    panel?.setAttribute('data-closing', '');
    backdrop?.setAttribute('data-closing', '');

    closeTimer = setTimeout(() => {
      closeTimer = null;
      originalClose(result, options);
    }, SHEET_LEAVE_ANIMATION_MS);
  }) as DialogRef<Result, Component>['close'];

  return dialogRef;
}

function shouldSkipSheetLeaveAnimation(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return false;
  }

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function isComponentType(value: unknown): value is ComponentType<unknown> {
  return typeof value === 'function';
}

function hasShellOptions(config: FrSheetConfig): boolean {
  return [
    config.bodyData,
    config.bodyInputs,
    config.description,
    config.footerActions,
    config.scrollable,
    config.showCloseButton,
    config.side,
    config.title,
  ].some((value) => value !== undefined);
}

function withoutShellOptions<Data, Result, Component>(
  config: FrSheetConfig<Data, Result, Component>,
): DialogConfig<Data, DialogRef<Result, Component>> {
  const {
    bodyData: _bodyData,
    bodyInputs: _bodyInputs,
    description: _description,
    footerActions: _footerActions,
    scrollable: _scrollable,
    showCloseButton: _showCloseButton,
    side: _side,
    title: _title,
    ...dialogConfig
  } = config;

  return dialogConfig;
}

function mergeClassList(
  classList: string | string[] | undefined,
  ...defaultClasses: Array<string | null | undefined>
): string[] {
  const classes = Array.isArray(classList)
    ? classList
    : classList
      ? classList.split(/\s+/)
      : [];

  return Array.from(
    new Set([...defaultClasses, ...classes].filter((className): className is string => !!className)),
  );
}

