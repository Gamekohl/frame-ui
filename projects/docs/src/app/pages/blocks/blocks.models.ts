import { Type } from '@angular/core';

export type BlockPreviewDevice = 'desktop' | 'mobile';
export type BlockPreviewInputs = Record<string, unknown>;

export type BlockCatalogBlock = {
  readonly id: string;
  readonly category: string;
  readonly title: string;
  readonly description: string;
  readonly componentName: string;
};

export type BlockCatalogCategory = {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly icon: string;
  readonly blocks: readonly BlockCatalogBlock[];
};

export type BlockImplementation<TVariant extends string = string> = {
  readonly variant: TVariant;
  readonly componentCode: string;
  readonly previewComponent: Type<unknown>;
  readonly previewInputs: (options: { readonly device: BlockPreviewDevice }) => BlockPreviewInputs;
};

export type BlockDefinition<TVariant extends string = string> =
  BlockCatalogBlock & BlockImplementation<TVariant>;

export type BlockCategory = Omit<BlockCatalogCategory, 'blocks'> & {
  readonly blocks: readonly BlockDefinition[];
};
