import { Direction } from '@angular/cdk/bidi';
import { ComponentType } from '@angular/cdk/portal';
import { Dialog, DialogConfig, DialogRef } from '@angular/cdk/dialog';
import {
  DestroyRef,
  Directive,
  Injectable,
  TemplateRef,
  ViewContainerRef,
  booleanAttribute,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export type FrCommandDialogRef<Result = unknown, Component = unknown> = DialogRef<Result, Component>;
export type FrCommandDialogConfig<Data = unknown, Result = unknown, Component = unknown> = DialogConfig<
  Data,
  DialogRef<Result, Component>
>;

const DEFAULT_PANEL_CLASS = 'frame-command-dialog__overlay-pane';
const DEFAULT_BACKDROP_CLASS = 'frame-command-dialog__backdrop';

@Directive({
  selector: 'ng-template[frCommandDialog]',
  exportAs: 'frCommandDialog',
  standalone: true,
})
export class FrCommandDialog {
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

  buildConfig(viewContainerRef: ViewContainerRef): FrCommandDialogConfig {
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

@Directive({
  selector: '[frCommandDialogTrigger]',
  standalone: true,
  host: {
    class: 'frame-command-dialog__trigger',
    '[attr.aria-haspopup]': '"dialog"',
    '[attr.data-state]': 'isOpen() ? "open" : "closed"',
    '[attr.disabled]': 'disabled() ? "" : null',
    '[attr.aria-disabled]': 'disabled() ? "true" : null',
    '(click)': 'open()',
  },
})
export class FrCommandDialogTrigger {
  private readonly commandDialog = inject(FrCommandService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private dialogRef: FrCommandDialogRef | null = null;

  readonly content = input<FrCommandDialog | TemplateRef<unknown> | null>(null, {
    alias: 'frCommandDialogTrigger',
  });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly opened = output<FrCommandDialogRef>();
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

    const templateRef = content instanceof FrCommandDialog ? content.templateRef : content;
    const config =
      content instanceof FrCommandDialog
        ? content.buildConfig(this.viewContainerRef)
        : { viewContainerRef: this.viewContainerRef };

    this.dialogRef = this.commandDialog.open(templateRef, config);
    this.isOpen.set(true);
    this.opened.emit(this.dialogRef);

    this.dialogRef.closed.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((result) => {
      this.isOpen.set(false);
      this.dialogRef = null;
      this.closed.emit(result);
    });
  }
}

@Injectable({ providedIn: 'root' })
export class FrCommandService {
  private readonly dialog = inject(Dialog);

  open<Result = unknown, Data = unknown, Component = unknown>(
    content: ComponentType<Component>,
    config?: FrCommandDialogConfig<Data, Result, Component>,
  ): FrCommandDialogRef<Result, Component>;
  open<Result = unknown, Data = unknown, Context = unknown>(
    content: TemplateRef<Context>,
    config?: FrCommandDialogConfig<Data, Result, Context>,
  ): FrCommandDialogRef<Result, Context>;
  open<Result = unknown, Data = unknown, ComponentOrContext = unknown>(
    content: ComponentType<ComponentOrContext> | TemplateRef<ComponentOrContext>,
    config: FrCommandDialogConfig<Data, Result, ComponentOrContext> = {},
  ): FrCommandDialogRef<Result, ComponentOrContext> {
    const dialogRef = this.dialog.open<Result, Data, ComponentOrContext>(
      content,
      this.withDefaultClasses(config),
    );

    if (isComponentType(content)) {
      const host = dialogRef.componentRef?.location.nativeElement as HTMLElement | undefined;
      host?.style.setProperty('display', 'block');
      host?.style.setProperty('inline-size', '100%');
    }

    return dialogRef;
  }

  closeAll(): void {
    this.dialog.closeAll();
  }

  private withDefaultClasses<Data, Result, Component>(
    config: FrCommandDialogConfig<Data, Result, Component>,
  ): FrCommandDialogConfig<Data, Result, Component> {
    return {
      ariaModal: true,
      autoFocus: '[frCommandInput]',
      restoreFocus: true,
      width: 'min(calc(100vw - 2rem), 48rem)',
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

function mergeClassList(
  classList: string | string[] | undefined | null,
  defaultClass: string,
): string[] {
  const classes = Array.isArray(classList)
    ? classList
    : classList
      ? classList.split(/\s+/)
      : [];

  return Array.from(new Set([defaultClass, ...classes].filter(Boolean)));
}
