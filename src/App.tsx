import React, { useState } from 'react';
import { 
  LayoutDashboard, Package, Receipt, Settings, Menu, 
  LogOut, Bell, Search, TrendingUp,
  ChevronRight, ArrowUpRight, Filter,
  Users2, ShoppingCart, BarChart3, Wallet, Plus
} from 'lucide-react';
import InventoryPage from './pages/InventoryPage';
import SalesPage from './pages/SalesPage';
import PartiesPage from './pages/PartiesPage';
import './App.scss';

type Page = 'dashboard' | 'inventory' | 'sales' | 'parties' | 'purchase' | 'reports' | 'settings';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className={`app-container ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <aside className="sidebar">
        <div className="sidebar-inner">
          <div className="sidebar-header">
            <div className="logo">
              <div className="logo-icon"><Package size={22} color="white" /></div>
              <h2>Inventra</h2>
            </div>
          </div>

          <nav className="sidebar-nav">
            <button 
              className={`nav-link ${activePage === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActivePage('dashboard')}
            >
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </button>
            <div className="nav-group">
              <span className="nav-group-label">Core Modules</span>
              <button 
                className={`nav-link ${activePage === 'parties' ? 'active' : ''}`}
                onClick={() => setActivePage('parties')}
              >
                <Users2 size={20} />
                <span>Parties</span>
              </button>
              <button 
                className={`nav-link ${activePage === 'inventory' ? 'active' : ''}`}
                onClick={() => setActivePage('inventory')}
              >
                <Package size={20} />
                <span>Inventory</span>
              </button>
            </div>
            
            <div className="nav-group">
              <span className="nav-group-label">Transactions</span>
              <button 
                className={`nav-link ${activePage === 'sales' ? 'active' : ''}`}
                onClick={() => setActivePage('sales')}
              >
                <Receipt size={20} />
                <span>Sales Invoices</span>
              </button>
              <button 
                className={`nav-link ${activePage === 'purchase' ? 'active' : ''}`}
                onClick={() => setActivePage('purchase')}
              >
                <ShoppingCart size={20} />
                <span>Purchases</span>
              </button>
            </div>

            <button 
              className={`nav-link ${activePage === 'reports' ? 'active' : ''}`}
              onClick={() => setActivePage('reports')}
            >
              <BarChart3 size={20} />
              <span>Reports</span>
            </button>
          </nav>

          <div className="sidebar-bottom">
            <button 
              className={`nav-link ${activePage === 'settings' ? 'active' : ''}`}
              onClick={() => setActivePage('settings')}
            >
              <Settings size={20} />
              <span>Settings</span>
            </button>
            <button className="nav-link logout">
              <LogOut size={20} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="top-nav">
          <div className="top-nav-inner container">
            <div className="nav-left">
              <button className="toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
                <Menu size={20} />
              </button>
              <div className="nav-search">
                <Search size={18} className="search-icon" />
                <input type="text" placeholder="Search invoices, parties or items..." />
              </div>
            </div>
            <div className="nav-right">
              <button className="action-btn">
                <Filter size={20} />
              </button>
              <div className="notification-wrapper">
                <button className="action-btn">
                  <Bell size={20} />
                  <span className="dot"></span>
                </button>
              </div>
              <div className="user-dropdown">
                <div className="avatar">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
                </div>
                <div className="user-meta">
                  <span className="name">Alex Richards</span>
                  <span className="role">Administrator</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="content-area">
          {activePage === 'dashboard' && <DashboardPage />}
          {activePage === 'inventory' && <InventoryPage />}
          {activePage === 'sales' && <SalesPage />}
          {activePage === 'parties' && <PartiesPage />}
          {activePage === 'purchase' && <div className="page-container"><h1>Purchases</h1><p>Purchases module is coming soon...</p></div>}
          {activePage === 'reports' && <div className="page-container"><h1>Reports</h1><p>Reports and Analytics coming soon...</p></div>}
          {activePage === 'settings' && <div className="page-container"><SettingsPage /></div>}
        </section>
      </main>
    </div>
  );
};

const DashboardPage: React.FC = () => (
  <div className="page-container fade-in container">
    <div className="welcome-header flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Executive Overview</h1>
        <p className="text-secondary text-lg">Predictive analytics and real-time business health monitoring.</p>
      </div>
      <div className="flex gap-3">
        <button className="btn btn-secondary px-6 py-3 rounded-xl shadow-sm">
          <Plus size={18} />
          <span>Quick Purchase</span>
        </button>
        <button className="btn btn-primary px-6 py-3 rounded-xl shadow-lg">
          <Plus size={18} />
          <span>New Sale Invoice</span>
        </button>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      <div className="card p-8 bg-white border-slate-100 shadow-xl group hover:border-primary-200 transition-all">
        <div className="flex justify-between items-start mb-6">
          <div className="w-14 h-14 flex-center rounded-2xl bg-indigo-50 text-indigo-600 group-hover:bg-primary-600 group-hover:text-white transition-all shadow-sm">
            <TrendingUp size={28} />
          </div>
          <div className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-black flex items-center gap-1">
            <TrendingUp size={12} />
            <span>+14.5%</span>
          </div>
        </div>
        <span className="text-sm font-bold text-slate-400 uppercase tracking-widest block mb-1">Gross Revenue</span>
        <h3 className="text-3xl font-black text-slate-900">$128,430.00</h3>
        <p className="text-xs text-slate-400 mt-2 font-medium">Updated 5 minutes ago</p>
      </div>

      <div className="card p-8 bg-white border-slate-100 shadow-xl group hover:border-emerald-200 transition-all">
        <div className="flex justify-between items-start mb-6">
          <div className="w-14 h-14 flex-center rounded-2xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">
            <ArrowUpRight size={28} />
          </div>
          <div className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-black flex items-center gap-1">
            <TrendingUp size={12} />
            <span>+8.2%</span>
          </div>
        </div>
        <span className="text-sm font-bold text-slate-400 uppercase tracking-widest block mb-1">Accounts Receivable</span>
        <h3 className="text-3xl font-black text-slate-900 text-emerald-600">$12,450.00</h3>
        <p className="text-xs text-slate-400 mt-2 font-medium">Pending from 24 customers</p>
      </div>

      <div className="card p-8 bg-white border-slate-100 shadow-xl group hover:border-purple-200 transition-all">
        <div className="flex justify-between items-start mb-6">
          <div className="w-14 h-14 flex-center rounded-2xl bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-all shadow-sm">
            <Wallet size={28} />
          </div>
          <div className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-black flex items-center gap-1">
            <TrendingUp size={12} />
            <span>+12.1%</span>
          </div>
        </div>
        <span className="text-sm font-bold text-slate-400 uppercase tracking-widest block mb-1">Liquid Assets</span>
        <h3 className="text-3xl font-black text-slate-900">$8,420.00</h3>
        <p className="text-xs text-slate-400 mt-2 font-medium">Cash and bank balance</p>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 card bg-white border-slate-100 shadow-xl overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Financial Trajectory</h3>
            <p className="text-sm text-slate-500 font-medium">Weekly performance comparison</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-primary-600"></span>
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Sales</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-slate-200"></span>
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Purchase</span>
            </div>
          </div>
        </div>
        <div className="p-8">
          <div className="h-[300px] flex items-end justify-between gap-6">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                <div className="w-full flex items-end gap-1 h-full">
                  <div 
                    className="flex-1 bg-primary-600 rounded-t-lg transition-all group-hover:bg-primary-500 shadow-lg shadow-primary-200" 
                    style={{ height: `${30 + Math.random() * 60}%` }}
                  ></div>
                  <div 
                    className="flex-1 bg-slate-100 rounded-t-lg transition-all group-hover:bg-slate-200" 
                    style={{ height: `${20 + Math.random() * 40}%` }}
                  ></div>
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card bg-white border-slate-100 shadow-xl">
        <div className="p-8 border-b border-slate-50">
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">Key Relationships</h3>
          <p className="text-sm text-slate-500 font-medium">Recently active accounts</p>
        </div>
        <div className="p-4">
          <div className="space-y-2">
            {[
              { name: 'TechSolutions Inc', balance: 1200, type: 'blue', initials: 'TS' },
              { name: 'Global Distributors', balance: -4500, type: 'purple', initials: 'GD' },
              { name: 'Creative Agency', balance: 850, type: 'indigo', initials: 'CA' },
            ].map((party, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer group">
                <div className={`w-12 h-12 flex-center rounded-xl font-bold text-sm ${
                  party.type === 'blue' ? 'bg-blue-50 text-blue-600' :
                  party.type === 'purple' ? 'bg-purple-50 text-purple-600' :
                  'bg-indigo-50 text-indigo-600'
                }`}>
                  {party.initials}
                </div>
                <div className="flex-1">
                  <span className="block font-bold text-slate-900 text-sm group-hover:text-primary-600 transition-colors">{party.name}</span>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${party.balance > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {party.balance > 0 ? 'Receivable' : 'Payable'}: ${Math.abs(party.balance).toFixed(2)}
                  </span>
                </div>
                <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-900 transition-all group-hover:translate-x-1" />
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-4 flex-center gap-2 text-sm font-black text-primary-600 uppercase tracking-widest hover:bg-primary-50 rounded-2xl transition-all">
            <span>Access All Parties</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  </div>
);

const SettingsPage: React.FC = () => (
  <div className="fade-in container">
    <div className="mb-10">
      <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">System Preferences</h1>
      <p className="text-secondary text-lg">Identity management and global configuration settings.</p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div className="lg:col-span-2 space-y-8">
        <div className="card p-10 bg-white border-slate-100 shadow-xl rounded-3xl">
          <h3 className="text-xl font-bold text-slate-900 mb-2">Corporate Identity</h3>
          <p className="text-slate-500 font-medium mb-10">Define how your brand appears on documents and invoices.</p>
          
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Legal Business Name</label>
                <input 
                  type="text" 
                  defaultValue="Alex Richards Store" 
                  className="w-full px-5 py-4 bg-slate-50 border-none focus:bg-white focus:ring-2 focus:ring-primary-500 rounded-2xl font-bold transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Tax Registration (GSTIN)</label>
                <input 
                  type="text" 
                  defaultValue="27AAAAA0000A1Z5" 
                  className="w-full px-5 py-4 bg-slate-50 border-none focus:bg-white focus:ring-2 focus:ring-primary-500 rounded-2xl font-bold transition-all"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Registered Address</label>
              <textarea 
                rows={3}
                defaultValue="123 Business Avenue, Suite 500, Financial District"
                className="w-full px-5 py-4 bg-slate-50 border-none focus:bg-white focus:ring-2 focus:ring-primary-500 rounded-2xl font-bold transition-all resize-none"
              ></textarea>
            </div>

            <div className="pt-4">
              <button className="btn btn-primary px-10 py-4 shadow-xl shadow-primary-900/10">
                Update Identity Profile
              </button>
            </div>
          </div>
        </div>

        <div className="card p-10 bg-white border-slate-100 shadow-xl rounded-3xl">
          <h3 className="text-xl font-bold text-slate-900 mb-2">Security & Access</h3>
          <p className="text-slate-500 font-medium mb-8">Maintain account integrity and access logs.</p>
          
          <div className="flex items-center justify-between p-6 bg-rose-50 border border-rose-100 rounded-2xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex-center rounded-xl bg-white text-rose-600 shadow-sm">
                <LogOut size={24} />
              </div>
              <div>
                <h4 className="font-bold text-rose-900">Danger Zone</h4>
                <p className="text-sm text-rose-700 font-medium">Permanently disable account access</p>
              </div>
            </div>
            <button className="px-6 py-2.5 bg-white text-rose-600 border border-rose-200 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all">
              Terminate
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div className="card p-8 bg-slate-900 text-white shadow-2xl rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Settings size={120} />
          </div>
          <h3 className="text-xl font-bold mb-6 relative z-10">System Status</h3>
          <div className="space-y-6 relative z-10">
            <div className="flex justify-between items-center py-3 border-b border-slate-800">
              <span className="text-slate-400 text-sm font-medium">Version</span>
              <span className="font-bold">v2.4.0-premium</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-slate-800">
              <span className="text-slate-400 text-sm font-medium">Cloud Sync</span>
              <span className="text-emerald-400 font-bold flex items-center gap-2">
                <TrendingUp size={14} /> Active
              </span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-slate-400 text-sm font-medium">API Latency</span>
              <span className="font-bold">24ms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default App;
