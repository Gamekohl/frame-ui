import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DocsComponentPageComponent } from '../../shared/components/docs-component-page/docs-component-page';
import { ComponentCatalogEntry } from '../../shared/models/component-catalog-entry.model';
import { CORNER_HANDLES_DOC } from './corner-handles.doc';

const CORNER_HANDLES_ENTRY = {
  slug: 'corner-handles',
  name: 'Corner Handles',
  status: 'Stable',
  summary:
    'Utility directive for adding blueprint corner handles to any component, container, or custom surface.',
  category: 'Utilities',
} satisfies ComponentCatalogEntry;

@Component({
  selector: 'docs-corner-handles-page',
  imports: [DocsComponentPageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <docs-component-page [doc]="doc" [component]="component" /> `,
})
export class CornerHandlesPageComponent {
  readonly doc = CORNER_HANDLES_DOC;
  readonly component = CORNER_HANDLES_ENTRY;
}
