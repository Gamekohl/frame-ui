import { DOCUMENT, isPlatformBrowser, NgComponentOutlet } from '@angular/common';
import { CdkConnectedOverlay, CdkOverlayOrigin, ConnectedPosition } from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  PLATFORM_ID,
  Type,
  afterNextRender,
  computed,
  effect,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { FrButton } from '@frame-ui-ng/components';

import { DocsTokenInspectorTarget } from '../../models/component-doc.model';
import { CodeHighlightService } from '../../services/code-highlight.service';
import { DocsCodeBlockComponent } from '../docs-code-block/docs-code-block';

type MeasuredInspectorTarget = {
  id: string;
  label: string;
  description: string | undefined;
  area: number;
  rect: {
    left: number;
    top: number;
    width: number;
    height: number;
  };
  tokenValues: Array<{
    name: string;
    value: string;
  }>;
};

@Component({
  selector: 'docs-token-inspector',
  imports: [
    NgComponentOutlet,
    CdkConnectedOverlay,
    CdkOverlayOrigin,
    FrButton,
    DocsCodeBlockComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './docs-token-inspector.html',
  styleUrl: './docs-token-inspector.css',
})
export class DocsTokenInspectorComponent {
  private static readonly HIGHLIGHT_PADDING = 8;

  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  private readonly highlighter = inject(CodeHighlightService);
  private readonly platformId = inject(PLATFORM_ID);

  readonly component = input.required<Type<unknown>>();
  readonly inputs = input<Record<string, unknown>>({});
  readonly containerClass = input<string | undefined>(undefined);
  readonly targets = input.required<DocsTokenInspectorTarget[]>();
  readonly layout = input<'popover' | 'side-panel'>('popover');

  private readonly canvasRef = viewChild<ElementRef<HTMLElement>>('canvas');
  private readonly previewHostRef = viewChild<ElementRef<HTMLElement>>('previewHost');

  readonly measuredTargets = signal<MeasuredInspectorTarget[]>([]);
  readonly activeTargetId = signal<string | null>(null);
  readonly pinnedTargetId = signal<string | null>(null);
  readonly canvasWidth = signal(0);
  readonly tokenHtmlByName = signal<Record<string, SafeHtml>>({});
  readonly activeTarget = computed(() => {
    const activeId = this.pinnedTargetId() ?? this.activeTargetId();

    return this.measuredTargets().find((target) => target.id === activeId) ?? null;
  });
  readonly visibleTarget = computed(() => {
    const explicit = this.activeTarget();

    if (explicit) {
      return explicit;
    }

    if (this.layout() === 'side-panel') {
      return this.measuredTargets()[0] ?? null;
    }

    return null;
  });

  readonly overlayPositions: ConnectedPosition[] = [
    {
      originX: 'end',
      originY: 'center',
      overlayX: 'start',
      overlayY: 'center',
      offsetX: 16,
    },
    {
      originX: 'end',
      originY: 'center',
      overlayX: 'end',
      overlayY: 'center',
      offsetX: -16,
    },
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top',
      offsetY: 12,
    },
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'bottom',
      offsetY: -12,
    },
    {
      originX: 'end',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'top',
      offsetY: 12,
    },
    {
      originX: 'end',
      originY: 'top',
      overlayX: 'end',
      overlayY: 'bottom',
      offsetY: -12,
    },
  ];

  private resizeObserver: ResizeObserver | null = null;
  private mutationObserver: MutationObserver | null = null;

  constructor() {
    effect(() => {
      this.targets();
      this.inputs();
      this.scheduleMeasurement();
    });

    effect(() => {
      const tokenNames = [
        ...new Set(
          this.measuredTargets().flatMap((target) => target.tokenValues.map((token) => token.name)),
        ),
      ];

      void this.ensureTokenHighlights(tokenNames);
    });

    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) {
        return;
      }

      this.observeResize();
      this.scheduleMeasurement();
    });

    this.destroyRef.onDestroy(() => {
      this.resizeObserver?.disconnect();
      this.resizeObserver = null;
      this.mutationObserver?.disconnect();
      this.mutationObserver = null;
    });
  }

  setActive(id: string): void {
    if (this.pinnedTargetId()) {
      return;
    }

    this.activeTargetId.set(id);
  }

  clearActive(): void {
    if (this.layout() === 'side-panel') {
      return;
    }

    if (this.pinnedTargetId()) {
      return;
    }

    this.activeTargetId.set(null);
  }

  togglePinned(id: string): void {
    if (this.pinnedTargetId() === id) {
      this.pinnedTargetId.set(null);
      this.activeTargetId.set(id);
      return;
    }

    this.pinnedTargetId.set(id);
    this.activeTargetId.set(id);
  }

  clearPinned(): void {
    this.pinnedTargetId.set(null);
    this.activeTargetId.set(null);
  }

  tokenHtml(name: string): SafeHtml | null {
    return this.tokenHtmlByName()[name] ?? null;
  }

  private scheduleMeasurement(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    window.setTimeout(() => {
      this.measureTargets();
    });
  }

  private measureTargets(): void {
    const canvas = this.canvasRef()?.nativeElement;

    if (!canvas) {
      return;
    }

    const canvasRect = canvas.getBoundingClientRect();
    this.canvasWidth.set(canvasRect.width);
    const measuredTargets = this.targets()
      .map((target) => {
        const element = canvas.querySelector<HTMLElement>(target.selector);

        if (!element) {
          return null;
        }

        const rect = element.getBoundingClientRect();
        const styles = getComputedStyle(element);

        return {
          id: target.id,
          label: target.label,
          description: target.description,
          area: rect.width * rect.height,
          rect: {
            left: rect.left - canvasRect.left - DocsTokenInspectorComponent.HIGHLIGHT_PADDING,
            top: rect.top - canvasRect.top - DocsTokenInspectorComponent.HIGHLIGHT_PADDING,
            width: rect.width + DocsTokenInspectorComponent.HIGHLIGHT_PADDING * 2,
            height: rect.height + DocsTokenInspectorComponent.HIGHLIGHT_PADDING * 2,
          },
          tokenValues: target.tokens.map((name) => ({
            name,
            value: styles.getPropertyValue(name).trim() || 'not set',
          })),
        } as MeasuredInspectorTarget;
      })
      .filter((target): target is MeasuredInspectorTarget => target !== null)
      .sort((left, right) => right.area - left.area);

    this.measuredTargets.set(measuredTargets);

    if (!measuredTargets.length) {
      this.activeTargetId.set(null);
      this.pinnedTargetId.set(null);
      return;
    }

    const activeId = this.activeTargetId();
    const pinnedId = this.pinnedTargetId();

    if (activeId && !measuredTargets.some((target) => target.id === activeId)) {
      this.activeTargetId.set(null);
    }

    if (pinnedId && !measuredTargets.some((target) => target.id === pinnedId)) {
      this.pinnedTargetId.set(null);
    }

    if (this.layout() === 'side-panel' && !this.pinnedTargetId() && !this.activeTargetId()) {
      this.activeTargetId.set(measuredTargets[0]?.id ?? null);
    }
  }

  private observeResize(): void {
    const canvas = this.canvasRef()?.nativeElement;
    const previewHost = this.previewHostRef()?.nativeElement;

    if (!canvas) {
      return;
    }

    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        this.measureTargets();
      });
      this.resizeObserver.observe(canvas);
      if (previewHost) {
        this.resizeObserver.observe(previewHost);
      }
    }

    if (previewHost && typeof MutationObserver !== 'undefined') {
      this.mutationObserver = new MutationObserver(() => {
        this.scheduleMeasurement();
      });
      this.mutationObserver.observe(previewHost, {
        attributes: true,
        childList: true,
        subtree: true,
      });
    }

    if (!this.resizeObserver) {
      this.document.defaultView?.addEventListener('resize', () => {
        this.measureTargets();
      });
    }
  }

  private async ensureTokenHighlights(tokenNames: string[]): Promise<void> {
    if (!tokenNames.length) {
      return;
    }

    const existing = this.tokenHtmlByName();
    const missing = tokenNames.filter((tokenName) => !existing[tokenName]);

    if (!missing.length) {
      return;
    }

    const highlightedEntries = await Promise.all(
      missing.map(async (tokenName) => {
        const html = await this.highlighter.highlight({
          code: `var(${tokenName})`,
          language: 'css',
        });

        return [tokenName, html] as const;
      }),
    );

    this.tokenHtmlByName.update((current) => {
      const next = { ...current };

      for (const [tokenName, html] of highlightedEntries) {
        next[tokenName] = html;
      }

      return next;
    });
  }
}
