import { RenderMode, ServerRoute } from '@angular/ssr';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

interface ComponentCatalogEntry {
  readonly slug: string;
}

interface BlockCatalogCategory {
  readonly id: string;
}

function loadComponentSlugs(): string[] {
  const filePath = join(
    process.cwd(),
    'projects',
    'docs',
    'public',
    'content',
    'components',
    'components.json',
  );
  const fileContents = readFileSync(filePath, 'utf-8');
  const entries = JSON.parse(fileContents) as ComponentCatalogEntry[];

  return entries.map((entry) => entry.slug);
}

function loadBlockCategorySlugs(): string[] {
  const filePath = join(
    process.cwd(),
    'projects',
    'docs',
    'public',
    'content',
    'blocks',
    'blocks.json',
  );
  const fileContents = readFileSync(filePath, 'utf-8');
  const entries = JSON.parse(fileContents) as BlockCatalogCategory[];

  return entries.map((entry) => entry.id);
}

export const serverRoutes: ServerRoute[] = [
  {
    path: 'templates/overview',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'charts/:type',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return [
        'area',
        'bar',
        'composed',
        'line',
        'pie',
        'donut',
        'sparkline',
        'heatmap',
        'radial',
      ].map((type) => ({ type }));
    },
  },
  {
    path: 'blocks/:category',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return loadBlockCategorySlugs().map((category) => ({ category }));
    },
  },
  {
    path: 'docs/components/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return loadComponentSlugs().map((slug) => ({ slug }));
    },
  },
  {
    path: 'templates/product-catalog',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'templates/inventory',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'templates/user-management',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'templates/roles-permissions',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'templates/settings',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'templates/orders',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'templates/suppliers',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'templates/audit-log',
    renderMode: RenderMode.Prerender,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
