import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { combineLatest } from 'rxjs';
import {
  tablerDeviceDesktop,
  tablerDeviceMobile,
  tablerLayoutDashboard,
  tablerLock,
} from '@ng-icons/tabler-icons';
import { FrCornerHandles } from '@frame-ui-ng/components';
import { FrTabsModule } from '@frame-ui-ng/components/tabs';

import { DocsCodeBlockComponent } from '../docs/shared/components/docs-code-block/docs-code-block';
import { BLOCK_CATEGORIES } from './blocks.registry';
import { BlockDefinition, BlockPreviewDevice, BlockPreviewInputs } from './blocks.models';

type ViewMode = 'code' | 'preview';
type DeviceMode = BlockPreviewDevice;

@Component({
  selector: 'docs-blocks-page',
  imports: [
    DocsCodeBlockComponent,
    FrCornerHandles,
    FrTabsModule,
    NgComponentOutlet,
    NgIcon,
    RouterLink,
  ],
  templateUrl: './blocks.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({
      tablerDeviceDesktop,
      tablerDeviceMobile,
      tablerLayoutDashboard,
      tablerLock,
    }),
  ],
})
export class BlocksPage {
  private readonly destroyRef = inject(DestroyRef);
  private readonly route = inject(ActivatedRoute);

  protected readonly categories = BLOCK_CATEGORIES;
  protected readonly selectedCategoryId = signal(BLOCK_CATEGORIES[0].id);
  protected readonly selectedId = signal(BLOCK_CATEGORIES[0].blocks[0].id);
  protected readonly viewMode = signal<ViewMode>('preview');
  protected readonly deviceMode = signal<DeviceMode>('desktop');

  protected readonly selectedCategory = computed(() => {
    return this.categories.find((category) => category.id === this.selectedCategoryId()) ?? this.categories[0];
  });

  protected readonly selectedBlock = computed(() => {
    return this.selectedCategory().blocks.find((block) => block.id === this.selectedId()) ?? null;
  });

  constructor() {
    combineLatest([this.route.paramMap, this.route.fragment])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([paramMap, fragment]) => {
        const categoryId = paramMap.get('category') ?? BLOCK_CATEGORIES[0].id;
        const category = this.categories.find((entry) => entry.id === categoryId) ?? this.categories[0];
        const block = category.blocks.find((entry) => entry.id === fragment) ?? category.blocks[0];

        this.selectedCategoryId.set(category.id);
        this.viewMode.set('preview');

        if (block) {
          this.selectedId.set(block.id);
        }
      });
  }

  protected selectBlock(block: BlockDefinition): void {
    this.selectedId.set(block.id);
    this.viewMode.set('preview');
  }

  protected setViewMode(block: BlockDefinition, mode: string | null): void {
    if (mode !== 'preview' && mode !== 'code') {
      return;
    }

    this.selectedId.set(block.id);
    this.viewMode.set(mode);
  }

  protected setDeviceMode(block: BlockDefinition, mode: string | null): void {
    if (mode !== 'desktop' && mode !== 'mobile') {
      return;
    }

    this.selectedId.set(block.id);
    this.deviceMode.set(mode);
  }

  protected previewInputs(block: BlockDefinition): BlockPreviewInputs {
    const device = this.selectedId() === block.id ? this.deviceMode() : 'desktop';

    return block.previewInputs({ device });
  }
}
