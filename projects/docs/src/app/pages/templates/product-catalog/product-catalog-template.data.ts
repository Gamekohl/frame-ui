export type ProductStatus = 'Active' | 'Draft' | 'Archived';
export type ProductVisibility = 'Storefront' | 'Hidden';
export type StockState = 'In stock' | 'Low stock' | 'Out of stock';
export type CatalogViewMode = 'table' | 'grid' | 'attention';

export type CatalogProduct = {
  id: number;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  status: ProductStatus;
  visibility: ProductVisibility;
  supplier: string;
  description: string;
  updated: string;
  incomingStock?: number;
  incomingEta?: string;
  incomingSupplier?: string;
  incomingOrder?: string;
};

export type ProductFormValue = Omit<
  CatalogProduct,
  'id' | 'updated' | 'incomingStock' | 'incomingEta' | 'incomingSupplier' | 'incomingOrder'
>;

export type TemplateNavItem = {
  label: string;
  icon: string;
  active: boolean;
  badge?: string | null;
  path?: string;
};

export const PRODUCT_CATEGORIES = [
  'Desk setup',
  'Lighting',
  'Furniture',
  'Storage',
  'Audio',
  'Accessories',
];

export const PRODUCT_STATUSES: ProductStatus[] = ['Active', 'Draft', 'Archived'];
export const PRODUCT_VISIBILITIES: ProductVisibility[] = ['Storefront', 'Hidden'];
export const PRODUCT_SUPPLIERS = [
  'Northline Goods',
  'Linear Systems',
  'Kin & Co',
  'Portsmith',
  'Quiet Field',
  'Keyline Studio',
  'Soundyard',
];
export const STOCK_FILTERS = ['All stock', 'In stock', 'Low stock', 'Out of stock'];
export const STATUS_FILTERS = ['All status', ...PRODUCT_STATUSES];

export const PRODUCT_COLUMNS = [
  'select',
  'product',
  'sku',
  'category',
  'price',
  'stock',
  'status',
  'visibility',
  'updated',
  'actions',
];

export const MAIN_NAV: TemplateNavItem[] = [
  { label: 'Overview', icon: 'tablerHome', active: false, badge: null },
  { label: 'Product catalog', icon: 'tablerBuildingStore', active: true, badge: null, path: '/templates/product-catalog' },
  { label: 'Inventory', icon: 'tablerDatabase', active: false, badge: '8' },
  { label: 'Orders', icon: 'tablerLayoutBoard', active: false, badge: null },
  { label: 'Customers', icon: 'tablerUsers', active: false, badge: null },
  { label: 'Store docs', icon: 'tablerFileText', active: false, badge: null },
];

export const ADMIN_NAV: TemplateNavItem[] = [
  { label: 'User management', icon: 'tablerUsers', active: false, path: '/templates/user-management' },
  {
    label: 'Roles & Permissions',
    icon: 'tablerShieldLock',
    active: false,
    path: '/templates/roles-permissions',
  },
  { label: 'Settings', icon: 'tablerSettings', active: false, path: '/templates/settings' },
  { label: 'Authentication', icon: 'tablerKey', active: false },
  { label: 'Security', icon: 'tablerShield', active: false },
  { label: 'Audit log', icon: 'tablerActivity', active: false },
  { label: 'Data exports', icon: 'tablerDatabase', active: false },
];

export const CATALOG_PRODUCTS: CatalogProduct[] = [
  {
    id: 1,
    name: 'Atlas desk lamp',
    sku: 'LGT-ATL-001',
    category: 'Lighting',
    price: 84,
    stock: 42,
    status: 'Active',
    visibility: 'Storefront',
    supplier: 'Northline Goods',
    description: 'Adjustable LED desk lamp with warm and cool light modes.',
    updated: 'Today, 09:12',
  },
  {
    id: 2,
    name: 'Rail monitor arm',
    sku: 'DSK-RMA-014',
    category: 'Desk setup',
    price: 129,
    stock: 9,
    status: 'Active',
    visibility: 'Storefront',
    supplier: 'Linear Systems',
    description: 'Single monitor arm with cable channel and quick-release mount.',
    updated: 'Today, 08:44',
  },
  {
    id: 3,
    name: 'Cork standing mat',
    sku: 'FUR-CSM-033',
    category: 'Furniture',
    price: 58,
    stock: 0,
    status: 'Active',
    visibility: 'Storefront',
    supplier: 'Kin & Co',
    description: 'Low-profile standing desk mat with cork top layer.',
    updated: 'Yesterday',
  },
  {
    id: 4,
    name: 'Docking station pro',
    sku: 'ACC-DSP-020',
    category: 'Accessories',
    price: 219,
    stock: 18,
    status: 'Draft',
    visibility: 'Hidden',
    supplier: 'Portsmith',
    description: 'USB-C dock with dual display output and pass-through charging.',
    updated: '2 days ago',
  },
  {
    id: 5,
    name: 'Acoustic desk panel',
    sku: 'FUR-ADP-008',
    category: 'Furniture',
    price: 146,
    stock: 6,
    status: 'Active',
    visibility: 'Storefront',
    supplier: 'Quiet Field',
    description: 'Clamp-on panel for shared desks and small studio spaces.',
    updated: '3 days ago',
  },
  {
    id: 6,
    name: 'Cable tray kit',
    sku: 'DSK-CTK-017',
    category: 'Desk setup',
    price: 39,
    stock: 73,
    status: 'Active',
    visibility: 'Storefront',
    supplier: 'Northline Goods',
    description: 'Under-desk cable tray with reusable ties and mounting screws.',
    updated: '4 days ago',
  },
  {
    id: 7,
    name: 'Notebook riser',
    sku: 'ACC-NBR-041',
    category: 'Accessories',
    price: 64,
    stock: 14,
    status: 'Draft',
    visibility: 'Hidden',
    supplier: 'Portsmith',
    description: '',
    updated: '5 days ago',
  },
  {
    id: 8,
    name: 'Focus keyboard',
    sku: 'ACC-FKB-052',
    category: 'Accessories',
    price: 118,
    stock: 31,
    status: 'Active',
    visibility: 'Storefront',
    supplier: 'Keyline Studio',
    description: 'Compact wireless keyboard with quiet switches.',
    updated: '1 week ago',
  },
  {
    id: 9,
    name: 'Archive storage box',
    sku: 'STR-ASB-026',
    category: 'Storage',
    price: 24,
    stock: 4,
    status: 'Active',
    visibility: 'Hidden',
    supplier: 'Kin & Co',
    description: 'Stackable document box with front label holder.',
    updated: '1 week ago',
  },
  {
    id: 10,
    name: 'Conference speaker',
    sku: 'AUD-CSP-011',
    category: 'Audio',
    price: 172,
    stock: 22,
    status: 'Archived',
    visibility: 'Hidden',
    supplier: 'Soundyard',
    description: 'Compact speakerphone for meeting rooms and team calls.',
    updated: '2 weeks ago',
  },
];
