import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { ComponentsCatalogService } from './shared/services/components-catalog.service';

@Component({
  selector: 'app-docs',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './docs.html',
})
export class DocsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly componentsCatalog = inject(ComponentsCatalogService);

  readonly components = toSignal(this.componentsCatalog.entries$, { initialValue: [] });

  protected readonly selectedSlug = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('slug'))),
    { initialValue: null },
  );

  protected readonly accordionToc = [
    { id: 'installation', title: 'Installation' },
    { id: 'usage', title: 'Usage' },
    { id: 'composition', title: 'Composition' },
    { id: 'examples', title: 'Examples' },
    { id: 'rtl', title: 'RTL' },
  ];
}
