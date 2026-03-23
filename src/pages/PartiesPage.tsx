import React, { useState } from 'react';
import { initialParties } from '../data/mockData';
import { 
  Search, UserPlus, Phone, Mail, 
  MoreVertical, ArrowUpRight, ArrowDownLeft, Filter
} from 'lucide-react';

const PartiesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'customer' | 'vendor'>('all');

  const filteredParties = initialParties.filter(party => {
    const matchesSearch = party.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         party.phone.includes(searchTerm);
    const matchesTab = activeTab === 'all' || party.type === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="page-container fade-in container">
      <div className="page-header-actions mb-10 flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Directory</h1>
          <p className="text-secondary text-lg">Centralized management of customers, vendors and relationships</p>
        </div>
        <button className="btn btn-primary px-8 shadow-xl">
          <UserPlus size={20} />
          <span>Add New Party</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="card p-8 bg-emerald-50/50 border-emerald-100 flex items-center gap-6 shadow-lg shadow-emerald-500/5">
          <div className="w-16 h-16 flex-center rounded-2xl bg-emerald-100 text-emerald-600 shadow-sm">
            <ArrowUpRight size={32} />
          </div>
          <div>
            <p className="text-sm font-bold text-emerald-700 uppercase tracking-widest mb-1">Total Receivable</p>
            <h3 className="text-3xl font-black text-slate-900">$12,450.00</h3>
            <p className="text-xs text-emerald-600 font-medium mt-1">Across 24 active customers</p>
          </div>
        </div>
        
        <div className="card p-8 bg-rose-50/50 border-rose-100 flex items-center gap-6 shadow-lg shadow-rose-500/5">
          <div className="w-16 h-16 flex-center rounded-2xl bg-rose-100 text-rose-600 shadow-sm">
            <ArrowDownLeft size={32} />
          </div>
          <div>
            <p className="text-sm font-bold text-rose-700 uppercase tracking-widest mb-1">Total Payable</p>
            <h3 className="text-3xl font-black text-slate-900">$4,500.00</h3>
            <p className="text-xs text-rose-600 font-medium mt-1">Due to 12 verified vendors</p>
          </div>
        </div>
      </div>

      <div className="card shadow-xl border-slate-100 overflow-hidden mb-12">
        <div className="px-8 py-6 bg-white border-b border-slate-50">
          <div className="flex flex-col lg:flex-row items-center gap-6 justify-between">
            <div className="flex items-center p-1.5 bg-slate-100 rounded-2xl w-full lg:w-auto">
              {[
                { id: 'all', label: 'All Parties' },
                { id: 'customer', label: 'Customers' },
                { id: 'vendor', label: 'Vendors' }
              ].map(tab => (
                <button 
                  key={tab.id}
                  className={`flex-1 lg:flex-none px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    activeTab === tab.id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                  }`}
                  onClick={() => setActiveTab(tab.id as any)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 w-full lg:w-auto">
              <div className="relative flex-1 lg:w-80">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search by name or contact..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none focus:bg-white focus:ring-2 focus:ring-primary-500 rounded-xl transition-all font-medium"
                />
              </div>
              <button className="btn btn-secondary py-3 px-5 rounded-xl">
                <Filter size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/30">
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">Identify & Type</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">Communication Channel</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">Tax Identification</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Net Financial Balance</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredParties.map(party => (
                <tr key={party.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 flex-center rounded-2xl font-black text-lg shadow-sm border ${
                        party.type === 'customer' ? 'bg-indigo-50 border-indigo-100 text-indigo-600' : 'bg-amber-50 border-amber-100 text-amber-600'
                      }`}>
                        {party.name.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 text-base">{party.name}</span>
                        <span className={`text-[10px] uppercase font-black tracking-widest mt-1 ${
                          party.type === 'customer' ? 'text-indigo-500' : 'text-amber-600'
                        }`}>{party.type} Entity</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
                        <Phone size={14} className="text-slate-400" />
                        <span>{party.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-500 text-xs">
                        <Mail size={14} className="text-slate-400" />
                        <span>{party.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <code className="px-2 py-1 bg-slate-100 rounded text-xs font-bold text-slate-500">
                      {party.gstin || '— UNREGISTERED —'}
                    </code>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex flex-col items-end">
                      <span className={`text-lg font-black ${party.balance >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                        ${Math.abs(party.balance).toFixed(2)}
                      </span>
                      <span className="text-[10px] uppercase font-black text-slate-400 tracking-tighter">
                        {party.balance > 0 ? (party.type === 'customer' ? 'Receivable' : 'Payable') : 'Balanced'}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2.5 hover:bg-slate-200 rounded-xl text-slate-500 hover:text-primary-600 transition-colors" title="View Transaction Ledger">
                        <ArrowUpRight size={18} />
                      </button>
                      <button className="p-2.5 hover:bg-slate-200 rounded-xl text-slate-500 hover:text-slate-900 transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PartiesPage;
