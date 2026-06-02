import { ComponentType } from '@angular/cdk/portal';
import {
  Dialog,
  DialogConfig,
  DialogRef,
} from '@angular/cdk/dialog';
import { Injectable, TemplateRef, Type, inject } from '@angular/core';

import { FrModalFooterAction, FrModalShell, FrModalShellOptions } from './modal-shell';
import { FR_MODAL_DATA } from './modal.tokens';

export type FrModalRef<Result = unknown, Component = unknown> = DialogRef<Result, Component>;
export type FrModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type FrModalConfig<Data = unknown, Result = unknown, Component = unknown> = DialogConfig<
  Data,
  DialogRef<Result, Component>
> & {
  bodyData?: unknown;
  bodyInputs?: Record<string, unknown>;
  description?: string;
  footerActions?: FrModalFooterAction[];
  scrollable?: boolean;
  showCloseButton?: boolean;
  size?: FrModalSize;
  stickyFooter?: boolean;
  title?: string;
};

const DEFAULT_PANEL_CLASS = 'frame-modal__overlay-pane';
const DEFAULT_BACKDROP_CLASS = 'frame-modal__backdrop';

@Injectable({ providedIn: 'root' })
export class FrModalService {
  private readonly dialog = inject(Dialog);

  open<Result = unknown, Data = unknown, Component = unknown>(
    content: ComponentType<Component>,
    config?: FrModalConfig<Data, Result, Component>,
  ): FrModalRef<Result, Component>;
  open<Result = unknown, Data = unknown, Context = unknown>(
    content: TemplateRef<Context>,
    config?: FrModalConfig<Data, Result, Context>,
  ): FrModalRef<Result, Context>;
  open<Result = unknown, Data = unknown, ComponentOrContext = unknown>(
    content: ComponentType<ComponentOrContext> | TemplateRef<ComponentOrContext>,
    config: FrModalConfig<Data, Result, ComponentOrContext> = {},
  ): FrModalRef<Result, ComponentOrContext> {
    if (isComponentType(content) && hasShellOptions(config as FrModalConfig)) {
      const shellConfig: DialogConfig<FrModalShellOptions, DialogRef<Result, FrModalShell>> = {
        ...(withoutShellOptions(config) as unknown as DialogConfig<
          FrModalShellOptions,
          DialogRef<Result, FrModalShell>
        >),
        data: {
          bodyComponent: content as Type<unknown>,
          bodyData: config.bodyData ?? config.data,
          bodyInputs: config.bodyInputs,
          description: config.description,
          footerActions: config.footerActions,
          scrollable: config.scrollable,
          showCloseButton: config.showCloseButton,
          size: config.size,
          stickyFooter: config.stickyFooter,
          title: config.title,
        },
      };

      return this.dialog.open<Result, FrModalShellOptions, FrModalShell>(
        FrModalShell,
        this.withDefaultClasses(shellConfig),
      ) as unknown as FrModalRef<Result, ComponentOrContext>;
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
      maxWidth: 'calc(100vw - 2rem)',
      ...config,
      panelClass: mergeClassList(config.panelClass, DEFAULT_PANEL_CLASS),
      backdropClass: mergeClassList(config.backdropClass, DEFAULT_BACKDROP_CLASS),
    };
  }
}

function isComponentType(value: unknown): value is ComponentType<unknown> {
  return typeof value === 'function';
}

function hasShellOptions(config: FrModalConfig): boolean {
  return [
    config.bodyData,
    config.bodyInputs,
    config.description,
    config.footerActions,
    config.scrollable,
    config.showCloseButton,
    config.size,
    config.stickyFooter,
    config.title,
  ].some((value) => value !== undefined);
}

function withoutShellOptions<Data, Result, Component>(
  config: FrModalConfig<Data, Result, Component>,
): DialogConfig<Data, DialogRef<Result, Component>> {
  const {
    bodyData: _bodyData,
    bodyInputs: _bodyInputs,
    description: _description,
    footerActions: _footerActions,
    scrollable: _scrollable,
    showCloseButton: _showCloseButton,
    size: _size,
    stickyFooter: _stickyFooter,
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
