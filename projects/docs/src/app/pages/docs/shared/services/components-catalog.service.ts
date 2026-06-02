import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { shareReplay } from 'rxjs';
import { map } from 'rxjs/operators';
import { ComponentCatalogEntry } from '../models/component-catalog-entry.model';

@Injectable({
  providedIn: 'root',
})
export class ComponentsCatalogService {
  private readonly http = inject(HttpClient);

  readonly entries$ = this.http
    .get<ComponentCatalogEntry[]>('/content/components/components.json')
    .pipe(shareReplay({ bufferSize: 1, refCount: true }));

  entryBySlug(slug: string) {
    return this.entries$.pipe(map((entries) => entries.find((entry) => entry.slug === slug) ?? null));
  }
}
