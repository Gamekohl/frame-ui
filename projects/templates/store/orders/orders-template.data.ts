import { createStoreNavigation } from '../shared/commerce-admin-template.registry';

export type OrderStatus = 'Payment review' | 'Ready to pick' | 'Packing' | 'Shipped' | 'Cancelled';

export type PaymentStatus = 'Paid' | 'Authorized' | 'Review' | 'Refunded';

export type OrderItem = {
  name: string;
  sku: string;
  quantity: number;
  price: number;
};

export type CommerceOrder = {
  id: string;
  customer: string;
  email: string;
  initials: string;
  channel: 'Online store' | 'Wholesale' | 'Marketplace';
  total: number;
  status: OrderStatus;
  payment: PaymentStatus;
  placed: string;
  priority: 'Standard' | 'Priority';
  shippingMethod: string;
  address: string;
  items: readonly OrderItem[];
  note: string;
  tracking?: string;
  carrier?: string;
};

export type ShipmentValue = {
  carrier: string;
  tracking: string;
  notifyCustomer: boolean;
};

export const ORDER_COLUMNS = [
  'select',
  'order',
  'customer',
  'channel',
  'total',
  'payment',
  'fulfillment',
  'placed',
  'actions',
];

export const ORDER_STATUSES: readonly ('All orders' | OrderStatus)[] = [
  'All orders',
  'Payment review',
  'Ready to pick',
  'Packing',
  'Shipped',
  'Cancelled',
];

export const SHIPPING_CARRIERS = ['DHL', 'UPS', 'DPD', 'FedEx'];

export const { mainNav: MAIN_NAV, adminNav: ADMIN_NAV } = createStoreNavigation('orders');

export const INITIAL_ORDERS: readonly CommerceOrder[] = [
  {
    id: 'ORD-2071',
    customer: 'Nora Patel',
    email: 'nora.patel@example.com',
    initials: 'NP',
    channel: 'Online store',
    total: 186,
    status: 'Payment review',
    payment: 'Review',
    placed: 'Today, 10:18',
    priority: 'Priority',
    shippingMethod: 'DHL Express',
    address: 'Kantstrasse 42, 10625 Berlin, Germany',
    items: [
      { name: 'Rail monitor arm', sku: 'OFF-RAIL-02', quantity: 1, price: 129 },
      { name: 'Cork standing mat', sku: 'OFF-MAT-01', quantity: 1, price: 57 },
    ],
    note: 'The bank shows a pending charge after the first payment attempt failed.',
  },
  {
    id: 'ORD-2070',
    customer: 'Theo Wagner',
    email: 'theo.wagner@example.com',
    initials: 'TW',
    channel: 'Online store',
    total: 258,
    status: 'Ready to pick',
    payment: 'Paid',
    placed: 'Today, 09:46',
    priority: 'Standard',
    shippingMethod: 'DHL Standard',
    address: 'Venloer Strasse 118, 50823 Cologne, Germany',
    items: [{ name: 'Rail monitor arm', sku: 'OFF-RAIL-02', quantity: 2, price: 129 }],
    note: 'Leave the parcel with the reception desk if nobody answers.',
  },
  {
    id: 'ORD-2069',
    customer: 'Amina Yusuf',
    email: 'amina.yusuf@northstar-studio.com',
    initials: 'AY',
    channel: 'Wholesale',
    total: 924,
    status: 'Packing',
    payment: 'Authorized',
    placed: 'Today, 08:55',
    priority: 'Priority',
    shippingMethod: 'UPS Business',
    address: 'Keizersgracht 391, 1016 EJ Amsterdam, Netherlands',
    items: [
      { name: 'Atlas desk lamp', sku: 'LGT-ATLAS-01', quantity: 8, price: 84 },
      { name: 'Cork standing mat', sku: 'OFF-MAT-01', quantity: 4, price: 63 },
    ],
    note: 'Pack lamps in two cartons and include the wholesale packing slip.',
  },
  {
    id: 'ORD-2068',
    customer: 'Lucas Meyer',
    email: 'lucas.meyer@example.com',
    initials: 'LM',
    channel: 'Marketplace',
    total: 84,
    status: 'Ready to pick',
    payment: 'Paid',
    placed: 'Yesterday, 17:32',
    priority: 'Standard',
    shippingMethod: 'DPD Classic',
    address: 'Leopoldstrasse 71, 80802 Munich, Germany',
    items: [{ name: 'Atlas desk lamp', sku: 'LGT-ATLAS-01', quantity: 1, price: 84 }],
    note: '',
  },
  {
    id: 'ORD-2067',
    customer: 'Elena Rossi',
    email: 'elena.rossi@example.com',
    initials: 'ER',
    channel: 'Online store',
    total: 192,
    status: 'Shipped',
    payment: 'Paid',
    placed: 'Yesterday, 14:08',
    priority: 'Standard',
    shippingMethod: 'DHL Standard',
    address: 'Via Torino 22, 20123 Milan, Italy',
    items: [{ name: 'Cork standing mat', sku: 'OFF-MAT-01', quantity: 3, price: 64 }],
    note: '',
    tracking: '00340434981234567890',
    carrier: 'DHL',
  },
  {
    id: 'ORD-2066',
    customer: 'Marek Nowak',
    email: 'marek.nowak@example.com',
    initials: 'MN',
    channel: 'Online store',
    total: 129,
    status: 'Cancelled',
    payment: 'Refunded',
    placed: 'Jul 20, 16:21',
    priority: 'Standard',
    shippingMethod: 'UPS Standard',
    address: 'Marszalkowska 87, 00-683 Warsaw, Poland',
    items: [{ name: 'Rail monitor arm', sku: 'OFF-RAIL-02', quantity: 1, price: 129 }],
    note: 'Customer requested cancellation before fulfillment started.',
  },
];
