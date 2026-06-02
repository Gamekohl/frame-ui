export type ComponentStatus = 'Stable' | 'Preview' | 'Foundation';

export type ComponentCatalogEntry = {
  readonly slug: string;
  readonly name: string;
  readonly status: ComponentStatus;
  readonly summary: string;
  readonly category: string;
  readonly markdown?: string;
};
