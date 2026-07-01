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
  const filePath = join(process.cwd(), 'projects', 'docs', 'public', 'content', 'components', 'components.json');
  const fileContents = readFileSync(filePath, 'utf-8');
  const entries = JSON.parse(fileContents) as ComponentCatalogEntry[];

  return entries.map((entry) => entry.slug);
}

function loadBlockCategorySlugs(): string[] {
  const filePath = join(process.cwd(), 'projects', 'docs', 'public', 'content', 'blocks', 'blocks.json');
  const fileContents = readFileSync(filePath, 'utf-8');
  const entries = JSON.parse(fileContents) as BlockCatalogCategory[];

  return entries.map((entry) => entry.id);
}

export const serverRoutes: ServerRoute[] = [
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
    path: 'templates/user-management',
    renderMode: RenderMode.Prerender,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
