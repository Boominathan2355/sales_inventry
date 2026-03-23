import React, { useState } from 'react';
import { initialProducts } from '../data/mockData';
import { 
  Plus, Search, Edit3, Trash2, Box, Filter, 
  MoreVertical, ArrowUpDown, ChevronLeft, ChevronRight 
} from 'lucide-react';

const InventoryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = initialProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container fade-in container">
      <div className="page-header-actions mb-10 flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Inventory Control</h1>
          <p className="text-secondary text-lg">Real-time stock monitoring and product lifecycle management</p>
        </div>
        <button className="btn btn-primary px-8 shadow-xl">
          <Plus size={20} />
          <span>Add New Product</span>
        </button>
      </div>

      <div className="card shadow-xl border-slate-100 p-8 mb-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-8">
          <div className="relative w-full lg:w-[500px]">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by SKU, Name or Category..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none focus:bg-white focus:ring-2 focus:ring-primary-500 transition-all rounded-2xl font-medium"
            />
          </div>
          <div className="flex gap-3 w-full lg:w-auto">
            <button className="flex-1 lg:flex-none btn btn-secondary px-6 py-4 rounded-2xl">
              <Filter size={18} />
              <span>Filter Results</span>
            </button>
            <button className="flex-1 lg:flex-none btn btn-secondary px-6 py-4 rounded-2xl">
              <ArrowUpDown size={18} />
              <span>Sort Order</span>
            </button>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {['All Items', 'Electronics', 'Furniture', 'Office', 'Accessories'].map((cat, i) => (
            <button key={cat} className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${
              i === 0 ? 'bg-primary-600 text-white shadow-lg shadow-primary-200' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
            }`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="card shadow-xl border-slate-100 overflow-hidden mb-12">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">Product Intelligence</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">Classification</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Unit Pricing</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest text-center">Availability</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest text-center">Warehouse Status</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map(product => (
                <tr key={product.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 flex-center rounded-xl bg-slate-50 text-slate-400 group-hover:bg-primary-600 group-hover:text-white transition-all">
                        <Box size={24} />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 text-base">{product.name}</span>
                        <span className="text-xs text-slate-400 font-medium uppercase tracking-widest">{product.sku}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-bold uppercase tracking-wider border border-indigo-100">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <span className="font-black text-slate-900 text-lg">${product.price.toFixed(2)}</span>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <div className="flex flex-col items-center">
                      <span className="font-bold text-slate-700 text-base">{product.stock}</span>
                      <span className="text-[10px] text-slate-400 uppercase font-black">{product.unit}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className={`px-4 py-2 rounded-full text-xs font-extrabold uppercase tracking-widest inline-block min-w-[120px] text-center border-2 ${
                      product.stock > 10 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                        : 'bg-amber-50 text-amber-700 border-amber-100'
                    }`}>
                      {product.stock > 10 ? 'Optimal Stock' : 'Low Inventory'}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-slate-200 rounded-lg text-slate-500 hover:text-primary-600 transition-colors" title="Edit">
                        <Edit3 size={18} />
                      </button>
                      <button className="p-2 hover:bg-rose-50 rounded-lg text-slate-400 hover:text-rose-600 transition-colors" title="Delete">
                        <Trash2 size={18} />
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
          <span className="text-sm font-semibold text-slate-500">
            Audit of <span className="text-slate-900">{filteredProducts.length}</span> individual product line items
          </span>
          <div className="flex items-center gap-3">
            <button className="w-12 h-12 flex-center rounded-2xl bg-white border border-slate-200 text-slate-400 disabled:opacity-30 transition-all">
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2 font-black text-slate-900">
              <span className="w-12 h-12 flex-center bg-primary-600 text-white rounded-2xl shadow-lg shadow-primary-200">1</span>
            </div>
            <button className="w-12 h-12 flex-center rounded-2xl bg-white border border-slate-200 text-slate-400 disabled:opacity-30 transition-all">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;
