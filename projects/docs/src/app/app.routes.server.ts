import { RenderMode, ServerRoute } from '@angular/ssr';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

interface ComponentCatalogEntry {
  readonly slug: string;
}

interface BlockCatalogCategory {
  readonly id: string;
}

const STORE_TEMPLATE_PAGES = [
  'overview',
  'product-catalog',
  'inventory',
  'orders',
  'suppliers',
] as const;

const ADMINISTRATION_TEMPLATE_PAGES = [
  'user-management',
  'roles-permissions',
  'audit-log',
  'settings',
] as const;

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
    path: 'templates/store/:page',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return STORE_TEMPLATE_PAGES.map((page) => ({ page }));
    },
  },
  {
    path: 'templates/administration/:page',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return ADMINISTRATION_TEMPLATE_PAGES.map((page) => ({ page }));
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
