import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { FrBadge } from '@frame-ui/components';
import { DocsTocComponent } from '../shared/components/docs-toc/docs-toc';
import { DocsTocItem } from '../shared/components/docs-toc/docs-toc.types';
import { ComponentsCatalogService } from '../shared/services/components-catalog.service';

@Component({
  selector: 'app-all-components',
  imports: [FrBadge, RouterLink, DocsTocComponent],
  templateUrl: './all-components.html',
  styleUrl: './all-components.scss',
})
export class AllComponents {
  private readonly componentsCatalog = inject(ComponentsCatalogService);

  readonly components = toSignal(this.componentsCatalog.entries$, { initialValue: [] });

  protected readonly toc: DocsTocItem[] = [{ id: 'components', title: 'Components' }];
}
