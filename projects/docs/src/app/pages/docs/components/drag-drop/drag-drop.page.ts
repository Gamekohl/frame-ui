import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { DocsComponentPageComponent } from '../../shared/components/docs-component-page/docs-component-page';
import { ComponentsCatalogService } from '../../shared/services/components-catalog.service';
import { DRAG_DROP_DOC } from './drag-drop.doc';

@Component({
  selector: 'docs-drag-drop-page',
  imports: [DocsComponentPageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <docs-component-page [doc]="doc" [component]="component()" /> `,
})
export class DragDropPageComponent {
  private readonly componentsCatalog = inject(ComponentsCatalogService);

  readonly doc = DRAG_DROP_DOC;
  readonly component = toSignal(this.componentsCatalog.entryBySlug(this.doc.slug), {
    initialValue: undefined,
  });
}
