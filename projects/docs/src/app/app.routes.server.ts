import { RenderMode, ServerRoute } from '@angular/ssr';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

interface ComponentCatalogEntry {
  readonly slug: string;
}

function loadComponentSlugs(): string[] {
  const filePath = join(process.cwd(), 'projects', 'docs', 'public', 'content', 'components', 'components.json');
  const fileContents = readFileSync(filePath, 'utf-8');
  const entries = JSON.parse(fileContents) as ComponentCatalogEntry[];

  return entries.map((entry) => entry.slug);
}

export const serverRoutes: ServerRoute[] = [
  {
    path: 'docs/components/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return loadComponentSlugs().map((slug) => ({ slug }));
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
