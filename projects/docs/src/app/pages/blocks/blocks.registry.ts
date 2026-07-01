import blocksCatalog from '../../../../public/content/blocks/blocks.json';

import { AUTHENTICATION_BLOCK_IMPLEMENTATIONS } from './authentication/auth-blocks.data';
import { DASHBOARD_BLOCK_IMPLEMENTATIONS } from './dashboard/dashboard-blocks.data';
import { SETTINGS_BLOCK_IMPLEMENTATIONS } from './settings/settings-blocks.data';
import { BlockCatalogBlock, BlockCatalogCategory, BlockCategory, BlockImplementation } from './blocks.models';

const BLOCK_IMPLEMENTATIONS: Record<string, BlockImplementation> = {
  ...AUTHENTICATION_BLOCK_IMPLEMENTATIONS,
  ...DASHBOARD_BLOCK_IMPLEMENTATIONS,
  ...SETTINGS_BLOCK_IMPLEMENTATIONS,
};

function hydrateBlock(block: BlockCatalogBlock) {
  const implementation = BLOCK_IMPLEMENTATIONS[block.id];

  if (!implementation) {
    throw new Error(`Missing block implementation for "${block.id}".`);
  }

  return {
    ...block,
    ...implementation,
  };
}

export const BLOCK_CATEGORIES: readonly BlockCategory[] = (blocksCatalog as readonly BlockCatalogCategory[]).map(
  (category) => ({
    ...category,
    blocks: category.blocks.map((block) => hydrateBlock(block)),
  }),
);
