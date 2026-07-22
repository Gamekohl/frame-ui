import { ComponentType } from '@angular/cdk/portal';
import {
  Dialog,
  DialogConfig,
  DialogRef,
} from '@angular/cdk/dialog';
import { Injectable, TemplateRef, Type, inject } from '@angular/core';
import { valueToCssSize } from '@frame-ui-ng/components/utils';

import { FrModalFooterAction, FrModalShell, FrModalShellOptions } from './modal-shell';
import { FrModalRef } from './modal.ref';
import { FR_MODAL_PANEL_LAYOUT, FrModalPanelLayout } from './modal.tokens';

export type FrModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type FrModalConfig<Data = unknown, Result = unknown, Component = unknown> = DialogConfig<
  Data,
  DialogRef<Result, Component>
> & {
  /**
   * @deprecated Use `data` or the second `open()` argument instead.
   */
  bodyData?: unknown;
  /**
   * @deprecated Use `inputs` instead.
   */
  bodyInputs?: Record<string, unknown>;
  description?: string;
  footerActions?: FrModalFooterAction[];
  inputs?: Record<string, unknown>;
  scrollable?: boolean;
  showCloseButton?: boolean;
  size?: FrModalSize;
  stickyFooter?: boolean;
  title?: string;
};

const DEFAULT_PANEL_CLASS = 'frame-modal__overlay-pane';
const DEFAULT_BACKDROP_CLASS = 'frame-modal__backdrop';
const DEFAULT_MAX_WIDTH = 'calc(100vw - 2rem)';
const MODAL_LEAVE_ANIMATION_MS = 140;
const MODAL_CLOSE_PATCHED = Symbol('frModalClosePatched');

type AnimatedDialogRef<Result, Component> = DialogRef<Result, Component> & {
  [MODAL_CLOSE_PATCHED]?: boolean;
};

/** Service for opening modal dialogs. */
@Injectable({ providedIn: 'root' })
export class FrModalService {
  private readonly dialog = inject(Dialog);

  open<Result = unknown, Data = unknown, Component = unknown>(
    content: ComponentType<Component>,
    config?: FrModalConfig<Data, Result, Component>,
  ): FrModalRef<Component, Result>;
  open<Result = unknown, Data = unknown, Component = unknown>(
    content: ComponentType<Component>,
    data: Data,
    config?: Omit<FrModalConfig<Data, Result, Component>, 'data'>,
  ): FrModalRef<Component, Result>;
  open<Result = unknown, Data = unknown, Context = unknown>(
    content: TemplateRef<Context>,
    config?: FrModalConfig<Data, Result, Context>,
  ): FrModalRef<Context, Result>;
  open<Result = unknown, Data = unknown, ComponentOrContext = unknown>(
    content: ComponentType<ComponentOrContext> | TemplateRef<ComponentOrContext>,
    dataOrConfig?: Data | FrModalConfig<Data, Result, ComponentOrContext>,
    config?: Omit<FrModalConfig<Data, Result, ComponentOrContext>, 'data'>,
  ): FrModalRef<ComponentOrContext, Result> {
    const resolvedConfig = resolveOpenConfig(content, dataOrConfig, config);

    if (isComponentType(content) && hasShellOptions(resolvedConfig as FrModalConfig)) {
      const shellConfig: DialogConfig<FrModalShellOptions, DialogRef<Result, FrModalShell>> = {
        ...(withoutShellOptions(resolvedConfig) as unknown as DialogConfig<
          FrModalShellOptions,
          DialogRef<Result, FrModalShell>
        >),
        data: {
          bodyComponent: content as Type<unknown>,
          bodyData: resolvedConfig.bodyData ?? resolvedConfig.data,
          bodyInputs: resolvedConfig.inputs ?? resolvedConfig.bodyInputs,
          description: resolvedConfig.description,
          footerActions: resolvedConfig.footerActions,
          scrollable: resolvedConfig.scrollable,
          showCloseButton: resolvedConfig.showCloseButton,
          size: resolvedConfig.size,
          stickyFooter: resolvedConfig.stickyFooter,
          title: resolvedConfig.title,
        },
      };

      const dialogRef = this.dialog.open<Result, FrModalShellOptions, FrModalShell>(
        FrModalShell,
        this.withDefaultClasses(shellConfig),
      );

      return withModalLeaveAnimation(dialogRef) as unknown as FrModalRef<ComponentOrContext, Result>;
    }

    const dialogRef = this.dialog.open<Result, Data, ComponentOrContext>(
      content,
      this.withDefaultClasses(resolvedConfig),
    );

    return withModalLeaveAnimation(dialogRef) as unknown as FrModalRef<ComponentOrContext, Result>;
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
      maxWidth: DEFAULT_MAX_WIDTH,
      ...config,
      panelClass: mergeClassList(config.panelClass, DEFAULT_PANEL_CLASS),
      backdropClass: mergeClassList(config.backdropClass, DEFAULT_BACKDROP_CLASS),
      providers: withModalProviders(config.providers, modalPanelLayoutFromConfig(config)),
    };
  }
}

function withModalLeaveAnimation<Result, Component>(
  dialogRef: DialogRef<Result, Component>,
): DialogRef<Result, Component> {
  const animatedRef = dialogRef as AnimatedDialogRef<Result, Component>;

  if (animatedRef[MODAL_CLOSE_PATCHED]) {
    return dialogRef;
  }

  animatedRef[MODAL_CLOSE_PATCHED] = true;
  const originalClose = dialogRef.close.bind(dialogRef) as DialogRef<Result, Component>['close'];
  let closeTimer: ReturnType<typeof setTimeout> | null = null;

  animatedRef.close = ((result?: Result, options?: Parameters<typeof originalClose>[1]) => {
    if (closeTimer) {
      return;
    }

    const overlayElement = dialogRef.overlayRef.overlayElement;
    const panel = overlayElement.querySelector<HTMLElement>('.frame-modal__panel');
    const backdrop = dialogRef.overlayRef.backdropElement;

    if (shouldSkipModalLeaveAnimation() || (!panel && !backdrop)) {
      originalClose(result, options);
      return;
    }

    overlayElement.setAttribute('data-closing', '');
    panel?.setAttribute('data-closing', '');
    backdrop?.setAttribute('data-closing', '');

    closeTimer = setTimeout(() => {
      closeTimer = null;
      originalClose(result, options);
    }, MODAL_LEAVE_ANIMATION_MS);
  }) as DialogRef<Result, Component>['close'];

  return dialogRef;
}

function shouldSkipModalLeaveAnimation(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return false;
  }

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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
    config.inputs,
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
    inputs: _inputs,
    scrollable: _scrollable,
    showCloseButton: _showCloseButton,
    size: _size,
    stickyFooter: _stickyFooter,
    title: _title,
    ...dialogConfig
  } = config;

  return dialogConfig;
}

function resolveOpenConfig<Data, Result, ComponentOrContext>(
  content: ComponentType<ComponentOrContext> | TemplateRef<ComponentOrContext>,
  dataOrConfig: unknown,
  config?: Omit<FrModalConfig<Data, Result, ComponentOrContext>, 'data'>,
): FrModalConfig<Data, Result, ComponentOrContext> {
  if (!isComponentType(content)) {
    return (dataOrConfig ?? {}) as FrModalConfig<Data, Result, ComponentOrContext>;
  }

  // Component opens support the shorthand `open(Component, data, config)` shape.
  if (config) {
    return {
      ...config,
      data: dataOrConfig as Data,
    } as FrModalConfig<Data, Result, ComponentOrContext>;
  }

  if (dataOrConfig === undefined) {
    return {} as FrModalConfig<Data, Result, ComponentOrContext>;
  }

  // Without a third argument, distinguish raw data from a full modal config by known keys.
  if (isModalConfig(dataOrConfig)) {
    return dataOrConfig as FrModalConfig<Data, Result, ComponentOrContext>;
  }

  return {
    data: dataOrConfig as Data,
  } as FrModalConfig<Data, Result, ComponentOrContext>;
}

const CONFIG_KEYS = new Set([
  'ariaDescribedBy',
  'ariaLabel',
  'ariaLabelledBy',
  'ariaModal',
  'autoFocus',
  'backdropClass',
  'bodyData',
  'bodyInputs',
  'closeOnDestroy',
  'closeOnNavigation',
  'data',
  'description',
  'direction',
  'disableClose',
  'footerActions',
  'height',
  'inputs',
  'maxHeight',
  'maxWidth',
  'minHeight',
  'minWidth',
  'panelClass',
  'positionStrategy',
  'providers',
  'restoreFocus',
  'role',
  'scrollable',
  'showCloseButton',
  'size',
  'stickyFooter',
  'title',
  'viewContainerRef',
  'width',
]);

function isModalConfig(value: unknown): value is FrModalConfig {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return false;
  }

  return Object.keys(value).some((key) => CONFIG_KEYS.has(key));
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

function modalPanelLayoutFromConfig<Data, Result, Component>(
  config: DialogConfig<Data, DialogRef<Result, Component>>,
): FrModalPanelLayout | null {
  const layout: FrModalPanelLayout = {
    height: valueToCssSize(config.height),
    maxHeight: valueToCssSize(config.maxHeight),
    maxWidth: valueToCssSize(config.maxWidth ?? (config.width ? DEFAULT_MAX_WIDTH : undefined)),
    minHeight: valueToCssSize(config.minHeight),
    minWidth: valueToCssSize(config.minWidth),
    width: valueToCssSize(config.width),
  };
  const hasLayout = Object.values(layout).some((value) => value !== undefined);

  return hasLayout ? layout : null;
}

function withModalProviders<Data, Result, Component>(
  providers: DialogConfig<Data, DialogRef<Result, Component>>['providers'],
  panelLayout: FrModalPanelLayout | null,
): DialogConfig<Data, DialogRef<Result, Component>>['providers'] {
  const defaultProviders = [
    { provide: FrModalRef, useExisting: DialogRef },
    ...(panelLayout ? [{ provide: FR_MODAL_PANEL_LAYOUT, useValue: panelLayout }] : []),
  ];

  if (typeof providers === 'function') {
    return (dialogRef, config, container) => [
      ...defaultProviders,
      ...providers(dialogRef, config, container),
    ];
  }

  return [...defaultProviders, ...(providers ?? [])];
}

