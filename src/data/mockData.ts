export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  unit: string;
}

export interface SaleItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Invoice {
  id: string;
  customerName: string;
  partyId?: string; // Link to Party
  date: string;
  items: SaleItem[];
  subtotal: number;
  tax: number;
  total: number;
  isGst: boolean;
  status: 'paid' | 'pending' | 'cancelled';
}

export interface Party {
  id: string;
  name: string;
  type: 'customer' | 'vendor';
  phone: string;
  email: string;
  gstin?: string;
  address: string;
  balance: number;
}

export const initialProducts: Product[] = [
  { id: '1', name: 'MacBook Pro 14"', sku: 'MBP-14-M2', category: 'Electronics', price: 1999, stock: 15, unit: 'pcs' },
  { id: '2', name: 'Mac Studio', sku: 'MST-M2-ULT', category: 'Electronics', price: 3999, stock: 2, unit: 'pcs' },
  { id: '3', name: 'Pro Display XDR', sku: 'PDX-32-6K', category: 'Electronics', price: 4999, stock: 0, unit: 'pcs' },
  { id: '4', name: 'Magic Keyboard', sku: 'MK-TRK-NUM', category: 'Accessories', price: 199, stock: 50, unit: 'pcs' },
  { id: '5', name: 'Office Chair', sku: 'FUR-OCH-01', category: 'Furniture', price: 299, stock: 8, unit: 'pcs' },
];

export const initialParties: Party[] = [
  { id: 'P1', name: 'TechSolutions Inc', type: 'customer', phone: '9876543210', email: 'billing@techsolutions.com', gstin: '27AAAAA0000A1Z5', address: 'Mumbai, Maharashtra', balance: 1200 },
  { id: 'P2', name: 'Creative Design Studio', type: 'customer', phone: '9123456780', email: 'hello@creativedesign.in', address: 'Bangalore, Karnataka', balance: -500 },
  { id: 'P3', name: 'Global Distributors', type: 'vendor', phone: '9988776655', email: 'sales@globaldist.com', gstin: '29BBBBB1111B1Z2', address: 'Delhi, NCR', balance: 4500 },
];

export const initialInvoices: Invoice[] = [
  {
    id: 'INV-2023-001',
    customerName: 'TechSolutions Inc',
    partyId: 'P1',
    date: '2023-11-20',
    items: [
      { productId: '1', name: 'MacBook Pro 14"', quantity: 2, price: 1999, total: 3998 },
    ],
    subtotal: 3998,
    tax: 719.64,
    total: 4717.64,
    isGst: true,
    status: 'paid',
  },
  {
    id: 'INV-2023-002',
    customerName: 'Creative Design Studio',
    partyId: 'P2',
    date: '2023-11-21',
    items: [
      { productId: '4', name: 'Magic Keyboard', quantity: 5, price: 199, total: 995 },
    ],
    subtotal: 995,
    tax: 0,
    total: 995,
    isGst: false,
    status: 'pending',
  },
];
