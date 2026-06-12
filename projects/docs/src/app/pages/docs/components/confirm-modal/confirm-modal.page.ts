import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { DocsComponentPageComponent } from '../../shared/components/docs-component-page/docs-component-page';
import { ComponentsCatalogService } from '../../shared/services/components-catalog.service';
import { CONFIRM_MODAL_DOC } from './confirm-modal.doc';

@Component({
  selector: 'docs-confirm-modal-page',
  imports: [DocsComponentPageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <docs-component-page [doc]="doc" [component]="component()" /> `,
})
export class ConfirmModalPageComponent {
  private readonly componentsCatalog = inject(ComponentsCatalogService);

  readonly doc = CONFIRM_MODAL_DOC;
  readonly component = toSignal(this.componentsCatalog.entryBySlug(this.doc.slug), {
    initialValue: undefined,
  });
}
