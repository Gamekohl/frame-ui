import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  FrAlert,
  FrAlertDescription,
  FrAlertIcon,
  FrAlertTitle,
  FrBadge,
  FrBreadcrumb,
  FrBreadcrumbItem,
  FrBreadcrumbLink,
  FrBreadcrumbList,
  FrBreadcrumbPage,
  FrBreadcrumbSeparator,
} from '@frame-ui/components';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { tablerAlertTriangle } from '@ng-icons/tabler-icons';
import { ComponentCatalogEntry } from '../../models/component-catalog-entry.model';
import { ComponentDoc } from '../../models/component-doc.model';
import { createComponentDocToc } from '../../utils/create-component-doc-toc';
import { DocsCodeBlockComponent } from '../docs-code-block/docs-code-block';
import { DocsPreviewCardComponent } from '../docs-preview-card';
import { DocsTocComponent } from '../docs-toc/docs-toc';
import { DocsTokenInspectorComponent } from '../docs-token-inspector/docs-token-inspector';

@Component({
  selector: 'docs-component-page',
  imports: [
    DocsPreviewCardComponent,
    DocsCodeBlockComponent,
    DocsTocComponent,
    DocsTokenInspectorComponent,
    FrAlert,
    FrAlertTitle,
    FrAlertDescription,
    NgIcon,
    FrAlertIcon,
    FrBadge,
    FrBreadcrumb,
    FrBreadcrumbList,
    FrBreadcrumbItem,
    FrBreadcrumbLink,
    FrBreadcrumbPage,
    FrBreadcrumbSeparator,
    RouterLink,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './docs-component-page.html',
  viewProviders: [provideIcons({ tablerAlertTriangle })],
})
export class DocsComponentPageComponent {
  readonly doc = input.required<ComponentDoc>();
  readonly component = input<ComponentCatalogEntry | null | undefined>(undefined);

  readonly toc = computed(() => createComponentDocToc(this.doc()));
}
