import React, { useState, useMemo } from 'react';
import { initialInvoices, initialProducts, initialParties } from '../data/mockData';
import { 
  Plus, Search, Download, Eye, ArrowLeft, 
  Save, X, FileText, ChevronLeft, ChevronRight, 
  MoreVertical, Calendar, BadgePercent, Receipt, Users2
} from 'lucide-react';

type SalesView = 'list' | 'create';

const SalesPage: React.FC = () => {
  const [view, setView] = useState<SalesView>('list');
  
  if (view === 'create') {
    return <CreateInvoiceView onBack={() => setView('list')} />;
  }

  return (
    <div className="page-container fade-in container">
      <div className="page-header-actions mb-10 flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Sales Invoices</h1>
          <p className="text-secondary text-lg">Generate and manage your business transactions with ease</p>
        </div>
        <button className="btn btn-primary" onClick={() => setView('create')}>
          <Plus size={20} />
          <span>New Invoice</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="card p-6 flex items-center gap-5 hoverable">
          <div className="w-12 h-12 flex-center rounded-xl bg-indigo-50 text-primary-600">
            <Receipt size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-secondary">Total Invoices</p>
            <h3 className="text-2xl font-bold text-slate-900">1,284</h3>
          </div>
        </div>
        
        <div className="card p-6 flex items-center gap-5 hoverable">
          <div className="w-12 h-12 flex-center rounded-xl bg-emerald-50 text-success-600">
            <BadgePercent size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-secondary">Tax Collected</p>
            <h3 className="text-2xl font-bold text-slate-900">$8,420.00</h3>
          </div>
        </div>

        <div className="card p-6 flex items-center gap-5 hoverable">
          <div className="w-12 h-12 flex-center rounded-xl bg-amber-50 text-warning-600">
            <Users2 size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-secondary">Active Customers</p>
            <h3 className="text-2xl font-bold text-slate-900">482</h3>
          </div>
        </div>

        <div className="card p-6 flex items-center gap-5 hoverable">
          <div className="w-12 h-12 flex-center rounded-xl bg-rose-50 text-danger-600">
            <MoreVertical size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-secondary">Pending Actions</p>
            <h3 className="text-2xl font-bold text-slate-900">12</h3>
          </div>
        </div>
      </div>

      <div className="card shadow-xl border-slate-100 overflow-hidden mb-12">
        <div className="px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-50">
          <div className="relative w-full md:w-96">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search invoice #, customer or date..." 
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none focus:bg-white focus:ring-2 focus:ring-primary-500 transition-all rounded-xl"
            />
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button className="btn btn-secondary flex-1 md:flex-none">
              <Download size={18} />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Invoice Details</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Customer</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Date</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Tax Information</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Amount</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Status</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {initialInvoices.map(invoice => (
                <tr key={invoice.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 flex-center rounded-lg bg-indigo-50 text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-all">
                        <FileText size={20} />
                      </div>
                      <div>
                        <span className="block font-bold text-slate-900 text-base">{invoice.id}</span>
                        <span className="text-xs text-slate-400 font-medium uppercase tracking-tighter">Proforma</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex-center text-xs font-bold text-slate-600 ring-2 ring-white">
                        {invoice.customerName.charAt(0)}
                      </div>
                      <span className="font-semibold text-slate-700">{invoice.customerName}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-slate-500 font-medium">{invoice.date}</td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      invoice.isGst ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}>
                      {invoice.isGst ? 'GST 18%' : 'Tax Exempt'}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right font-black text-slate-900 text-lg">${invoice.total.toFixed(2)}</td>
                  <td className="px-8 py-5 text-right">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest inline-block min-w-[100px] text-center ${
                      invoice.status === 'paid' ? 'bg-emerald-100 text-emerald-800' : 
                      invoice.status === 'pending' ? 'bg-amber-100 text-amber-800' : 
                      'bg-rose-100 text-rose-800'
                    }`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-slate-200 rounded-lg text-slate-500 hover:text-slate-900 transition-colors" title="View">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 hover:bg-slate-200 rounded-lg text-slate-500 hover:text-slate-900 transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-8 py-6 bg-slate-50/30 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-slate-100">
          <span className="text-sm font-semibold text-slate-500">Showing <span className="text-slate-900">1-10</span> of <span className="text-slate-900">1,284</span> invoices</span>
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 flex-center rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-slate-900 hover:border-slate-300 disabled:opacity-50 transition-all">
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-1">
              {[1, 2, 3].map(page => (
                <button 
                  key={page} 
                  className={`w-10 h-10 flex-center rounded-xl font-bold transition-all ${
                    page === 1 ? 'bg-primary-600 text-white shadow-lg shadow-primary-200' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button className="w-10 h-10 flex-center rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-slate-900 hover:border-slate-300 transition-all">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface InvoiceItem {
  productId: string;
  searchTerm: string;
  quantity: number;
  price: number;
  discount: number;
  total: number;
}

const ProductSearchInput: React.FC<{
  value: string;
  searchTerm: string;
  onSelect: (productId: string) => void;
  onSearchChange: (term: string) => void;
}> = ({ value, searchTerm, onSelect, onSearchChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const filteredProducts = useMemo(() => {
    if (!searchTerm) return [];
    return initialProducts.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.sku.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const selectedProduct = initialProducts.find(p => p.id === value);

  return (
    <div className="relative product-search-container">
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input 
          type="text" 
          placeholder="Search product name or SKU..."
          value={isOpen ? searchTerm : (selectedProduct?.name || searchTerm)}
          onChange={(e) => {
            onSearchChange(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 focus:border-primary-600 focus:ring-4 focus:ring-primary-100 rounded-xl transition-all"
        />
      </div>
      
      {isOpen && filteredProducts.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/80 border border-slate-100 shadow-xl rounded-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200 glass">
          {filteredProducts.map(p => (
            <div 
              key={p.id} 
              className="p-4 hover:bg-slate-50 cursor-pointer flex items-center justify-between border-b border-slate-50 last:border-none transition-colors"
              onClick={() => {
                onSelect(p.id);
                setIsOpen(false);
              }}
            >
              <div className="flex flex-col">
                <span className="font-bold text-slate-900">{p.name}</span>
                <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">{p.sku}</span>
              </div>
              <div className="text-right">
                <span className="block font-black text-slate-900">${p.price}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest ${
                  p.stock > 10 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                }`}>
                  {p.stock} in stock
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const CreateInvoiceView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [customerName, setCustomerName] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [items, setItems] = useState<InvoiceItem[]>([{ productId: '', searchTerm: '', quantity: 1, price: 0, discount: 0, total: 0 }]);
  const [isGst, setIsGst] = useState(true);

  const subtotal = useMemo(() => items.reduce((acc, item) => acc + (item.price * item.quantity), 0), [items]);
  const totalDiscount = useMemo(() => items.reduce((acc, item) => acc + (item.discount || 0), 0), [items]);
  const tax = useMemo(() => (isGst ? (subtotal - totalDiscount) * 0.18 : 0), [subtotal, totalDiscount, isGst]);
  const total = useMemo(() => subtotal - totalDiscount + tax, [subtotal, totalDiscount, tax]);

  const addItem = () => setItems([...items, { productId: '', searchTerm: '', quantity: 1, price: 0, discount: 0, total: 0 }]);
  
  const removeItem = (index: number) => {
    if (items.length > 1) {
      const newItems = items.filter((_, i) => i !== index);
      setItems(newItems);
    }
  };

  const updateItem = (index: number, field: keyof InvoiceItem, value: any) => {
    const newItems = [...items];
    const item = { ...newItems[index], [field]: value };
    
    if (field === 'productId') {
      const product = initialProducts.find(p => p.id === value);
      item.productId = value as string;
      item.price = product ? product.price : 0;
      item.searchTerm = product ? product.name : '';
      
      if (index === items.length - 1 && value !== '') {
        setTimeout(() => addItem(), 0);
      }
    } else if (field === 'searchTerm') {
      item.searchTerm = value as string;
    } else if (field === 'quantity') {
      item.quantity = value as number;
    } else if (field === 'price') {
      item.price = value as number;
    } else if (field === 'discount') {
      item.discount = value as number;
    }
    
    item.total = (item.price * item.quantity) - (item.discount || 0);
    newItems[index] = item;
    setItems(newItems);
  };

  const handleFinalize = () => {
    alert(`Invoice finalized for ${customerName || 'Anonymous customer'}. Total: $${total.toFixed(2)}`);
    onBack();
  };

  return (
    <div className="page-container fade-in container">
      <div className="page-header-actions mb-10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="w-10 h-10 flex-center rounded-full bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition-all">
            <ArrowLeft size={20} />
          </button>
          <div className="flex flex-col">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Create New Invoice</h1>
            <p className="text-secondary text-base">Sales <span className="mx-2 text-slate-300">›</span> New Entry</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button onClick={onBack} className="btn btn-secondary px-8 py-3">Cancel</button>
          <button onClick={handleFinalize} className="btn btn-primary px-8 py-3 shadow-xl">
            <Save size={20} />
            <span>Save Invoice</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="card p-8 border-slate-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 flex-center rounded-xl bg-indigo-50 text-primary-600">
                <Users2 size={22} />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Customer Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  Select Customer
                  <Users2 size={12} />
                </label>
                <select 
                  className="p-select w-full bg-slate-50 border-none focus:ring-4 focus:ring-primary-100 transition-all font-medium py-3 rounded-xl"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                >
                  <option value="">Select an existing customer</option>
                  {initialParties.filter(p => p.type === 'customer').map(p => (
                    <option key={p.id} value={p.name}>{p.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  Invoice Date
                  <Calendar size={12} />
                </label>
                <input 
                  type="date" 
                  className="p-input w-full bg-slate-50 border-none focus:ring-4 focus:ring-primary-100 transition-all font-medium py-3 rounded-xl"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="card p-8 border-slate-100 overflow-visible">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex-center rounded-xl bg-emerald-50 text-success-600">
                  <FileText size={22} />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Invoice Items</h2>
              </div>
              <button 
                onClick={addItem}
                className="btn btn-secondary py-2.5 px-6 rounded-xl text-sm"
              >
                <Plus size={18} />
                <span>Add Line Item</span>
              </button>
            </div>

            <div className="items-table-premium">
              <div className="th-row text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <div>Product Description</div>
                <div className="text-center">Qty</div>
                <div className="text-right">Price</div>
                <div className="text-right">Discount</div>
                <div className="text-right">Total</div>
                <div></div>
              </div>
              
              <div className="space-y-2 mt-4">
                {items.map((item, index) => (
                  <div key={index} className="item-row-p group">
                    <ProductSearchInput 
                      value={item.productId}
                      searchTerm={item.searchTerm}
                      onSelect={(pid) => updateItem(index, 'productId', pid)}
                      onSearchChange={(term) => updateItem(index, 'searchTerm', term)}
                    />
                    
                    <input 
                      type="number" 
                      className="p-input text-center font-bold bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-primary-100"
                      value={item.quantity}
                      onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 1)}
                      min="1"
                    />
                    
                    <div className="text-right">
                      <input 
                        type="number" 
                        className="p-input text-right font-bold bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-primary-100 w-full"
                        value={item.price}
                        onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value) || 0)}
                      />
                    </div>

                    <div className="text-right">
                      <input 
                        type="number" 
                        className="p-input text-right font-bold bg-rose-50/50 text-rose-600 border-none rounded-xl focus:ring-2 focus:ring-rose-100 w-full"
                        value={item.discount}
                        onChange={(e) => updateItem(index, 'discount', parseFloat(e.target.value) || 0)}
                        placeholder="0.00"
                      />
                    </div>
                    
                    <div className="text-right font-black text-slate-900 total-val pr-2">
                       ${item.total.toFixed(2)}
                    </div>
                    
                    <div className="flex justify-center">
                      <button 
                        onClick={() => removeItem(index)}
                        className="w-10 h-10 flex-center rounded-xl text-slate-300 hover:bg-rose-50 hover:text-rose-600 transition-all opacity-0 group-hover:opacity-100"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="card p-8 bg-slate-900 text-white shadow-2xl relative overflow-hidden border-none premium-shadow">
            {/* Decal Background with Glow */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 summary-stack h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-10 pb-6 border-b border-white/10">
                  <div className="w-12 h-12 flex-center rounded-2xl bg-white/5 text-primary-400 border border-white/5">
                    <Receipt size={26} />
                  </div>
                  <h2 className="text-2xl font-black italic tracking-tighter">Order Summary</h2>
                </div>
                
                <div className="space-y-6">
                  <div className="flex justify-between items-center group">
                    <span className="text-sm font-bold text-slate-400 group-hover:text-white transition-colors">Subtotal</span>
                    <span className="text-lg font-bold">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  {totalDiscount > 0 && (
                    <div className="flex justify-between items-center group text-rose-400">
                      <span className="text-sm font-bold group-hover:text-rose-300 transition-colors">Total Discount</span>
                      <span className="text-lg font-black">-${totalDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center group border-t border-white/5 pt-6">
                    <div className="flex flex-col">
                      <span className="font-bold text-sm text-slate-400 group-hover:text-white transition-colors">Regional Tax</span>
                      <span className="text-[10px] text-slate-400 uppercase tracking-widest font-black opacity-60">GST 18% applied</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={isGst}
                          onChange={(e) => setIsGst(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                      </label>
                      <span className="text-lg font-bold">${tax.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-white/10 space-y-8">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-widest font-black text-primary-400 text-gradient">Grand Total Payable</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-5xl font-black text-white tracking-tighter decoration-primary-500/20 underline decoration-2 underline-offset-8">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
                
                <button 
                  onClick={handleFinalize}
                  className="w-full btn btn-primary py-4 text-lg font-black shadow-xl hover:scale-[1.03] active:scale-[0.98] transition-all"
                >
                  <Save size={22} />
                  <span>Finalize & Print</span>
                </button>
              </div>
            </div>
          </div>
          
          <div className="card p-6 bg-slate-50 border-slate-100 flex items-start gap-4">
            <div className="w-10 h-10 flex-center rounded-xl bg-white text-slate-400 border border-slate-200 shrink-0">
              <FileText size={20} />
            </div>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              Tax calculation is based on current regional GST regulations (18%). You can toggle regional tax for tax-exempt customers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesPage;
