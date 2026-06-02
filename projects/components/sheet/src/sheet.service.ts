import { Dialog, DialogConfig, DialogRef } from '@angular/cdk/dialog';
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

@Injectable({ providedIn: 'root' })
export class FrSheetService {
  private readonly dialog = inject(Dialog);

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

      return this.dialog.open<Result, FrSheetShellOptions, FrSheetShell>(
        FrSheetShell,
        this.withDefaultClasses(shellConfig),
      ) as unknown as FrSheetRef<Result, ComponentOrContext>;
    }

    return this.dialog.open<Result, Data, ComponentOrContext>(
      content,
      this.withDefaultClasses(config),
    );
  }

  closeAll(): void {
    this.dialog.closeAll();
  }

  private withDefaultClasses<Data, Result, Component>(
    config: DialogConfig<Data, DialogRef<Result, Component>>,
  ): DialogConfig<Data, DialogRef<Result, Component>> {
    return {
      ariaModal: true,
      autoFocus: 'first-tabbable',
      restoreFocus: true,
      ...config,
      maxHeight: config.maxHeight ?? '100dvh',
      maxWidth: config.maxWidth ?? '100vw',
      panelClass: mergeClassList(config.panelClass, DEFAULT_PANEL_CLASS),
      backdropClass: mergeClassList(config.backdropClass, DEFAULT_BACKDROP_CLASS),
    };
  }
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
  defaultClass: string,
): string[] {
  const classes = Array.isArray(classList)
    ? classList
    : classList
      ? classList.split(/\s+/)
      : [];

  return Array.from(new Set([defaultClass, ...classes].filter(Boolean)));
}
