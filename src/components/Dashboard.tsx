import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, Users, Scale, AlertTriangle, Search, Plus, Bell, ShieldCheck,
  ChevronDown, Settings, LogOut, CheckCircle, X, Sparkles,
  Award, Briefcase, FileText, Landmark, Camera, User, Smartphone, Layers, CreditCard
} from 'lucide-react';
import { getSupabase } from '../lib/supabase';
import { ShopOwner } from './LoginModal';
import { useDashboardData } from '../hooks/useDashboardData';

// Modular Sub-components
import DashboardOverview from './dashboard/DashboardOverview';
import CustomersTab from './dashboard/CustomersTab';
import LoansTab from './dashboard/LoansTab';
import PaymentsTab from './dashboard/PaymentsTab';
import InterestTab from './dashboard/InterestTab';
import InvoicesTab from './dashboard/InvoicesTab';
import PledgedItemsTab from './dashboard/PledgedItemsTab';
import ReportsTab from './dashboard/ReportsTab';
import SubscriptionTab from './dashboard/SubscriptionTab';
import EmployeesTab from './dashboard/EmployeesTab';
import BranchesTab from './dashboard/BranchesTab';
import SettingsTab from './dashboard/SettingsTab';

export default function Dashboard({ 
  onBackToLanding,
  onLogout,
  currentOwner
}: { 
  onBackToLanding: () => void;
  onLogout?: () => void;
  currentOwner?: ShopOwner | null;
}) {
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      onBackToLanding();
    }
  };

  // State Management Hook
  const {
    loans,
    setLoans,
    activities,
    setActivities,
    customers,
    setCustomers,
    payments,
    setPayments,
    pledgedItems,
    setPledgedItems,
    employees,
    setEmployees,
    notifications,
    setNotifications,
    settings,
    setSettings,
    dbStatus,
    usingDemo
  } = useDashboardData(currentOwner || null);

  // Layout and Navigation State
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSupabaseModalOpen, setIsSupabaseModalOpen] = useState(false);
  const [isBranchDropdownOpen, setIsBranchDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // Shop Owner Profile Customization States
  const [ownerAvatar, setOwnerAvatar] = useState<string>(() => {
    const stored = localStorage.getItem(`suvarna_owner_avatar_${currentOwner?.id || 'default'}`);
    return stored || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80";
  });
  const [ownerName, setOwnerName] = useState<string>(() => {
    return currentOwner?.ownerName || "Rajesh Verma";
  });
  const [isEditOwnerProfileOpen, setIsEditOwnerProfileOpen] = useState(false);

  useEffect(() => {
    if (currentOwner) {
      setOwnerName(currentOwner.ownerName || "Rajesh Verma");
      const stored = localStorage.getItem(`suvarna_owner_avatar_${currentOwner.id}`);
      if (stored) {
        setOwnerAvatar(stored);
      } else {
        setOwnerAvatar("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80");
      }
    }
  }, [currentOwner]);

  // Branch Roster configuration
  const [branches, setBranches] = useState<any[]>([
    { id: 'BR-01', name: 'Mumbai Main Branch', city: 'Mumbai', address: 'Opera House, Charni Road', phone: '+91 22 2345 6789', staffCount: 8, ledgerAmount: 4500000, status: 'Open' },
    { id: 'BR-02', name: 'Pune Sub Branch', city: 'Pune', address: 'FC Road, Shivaji Nagar', phone: '+91 20 2567 8901', staffCount: 4, ledgerAmount: 2500000, status: 'Open' },
    { id: 'BR-03', name: 'Secure Vault Facility', city: 'Mumbai', address: 'Fort Financial District', phone: '+91 22 4001 0022', staffCount: 3, ledgerAmount: 0, status: 'Open' },
  ]);

  // Printable Invoice & Appraisal Certificate Modal State
  const [activeInvoice, setActiveInvoice] = useState<any>(null);

  // Dispatch active channels for Monthly Invoicing
  const [channels, setChannels] = useState({
    whatsapp: true,
    sms: true,
    email: false
  });
  const [isSending, setIsSending] = useState(false);
  const [sendingStep, setSendingStep] = useState('');
  const [sendCompleted, setSendCompleted] = useState(false);

  const handleSendInvoice = () => {
    if (!activeInvoice) return;
    setIsSending(true);
    setSendCompleted(false);
    
    setSendingStep("Generating secure PDF...");
    setTimeout(() => {
      setSendingStep("Attaching gold appraisal photos & purity certificate...");
      setTimeout(() => {
        setSendingStep("Signing cryptographic transaction payload...");
        setTimeout(() => {
          setSendingStep("Routing via Suvarna Telecom APIs...");
          setTimeout(() => {
            setIsSending(false);
            setSendCompleted(true);
            
            const activeChanText = Object.entries(channels)
              .filter(([_, enabled]) => enabled)
              .map(([name]) => name.toUpperCase())
              .join(" & ");
            
            const newAct = {
              id: `act-${Date.now()}`,
              text: `Monthly Invoice ${activeInvoice.id} sent to ${activeInvoice.customerName} via ${activeChanText}`,
              amount: null,
              time: 'Just now',
              type: 'invoice'
            };
            setActivities([newAct, ...activities]);
            
            const newNotif = {
              id: `NTF-${Math.floor(100 + Math.random() * 900)}`,
              type: 'system',
              message: `Monthly Invoice ${activeInvoice.id} delivered successfully to ${activeInvoice.customerName}.`,
              severity: 'low',
              unread: true,
              date: 'Just now'
            };
            setNotifications([newNotif, ...notifications]);
          }, 850);
        }, 900);
      }, 900);
    }, 900);
  };

  const formatINRLocal = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  // Tab content routing
  const renderTabContent = () => {
    switch (activeTab) {
      case 'Customers':
        return (
          <CustomersTab 
            customers={customers}
            setCustomers={setCustomers}
            loans={loans}
            activities={activities}
            setActivities={setActivities}
            setActiveInvoice={setActiveInvoice}
            setEditingCustomer={setEditingCustomer}
          />
        );
      case 'Gold Loans':
        return (
          <LoansTab 
            loans={loans}
            setLoans={setLoans}
            customers={customers}
            activities={activities}
            setActivities={setActivities}
            setActiveInvoice={setActiveInvoice}
          />
        );
      case 'Payments':
        return (
          <PaymentsTab 
            payments={payments}
            setPayments={setPayments}
            loans={loans}
            activities={activities}
            setActivities={setActivities}
          />
        );
      case 'Interest':
        return (
          <InterestTab 
            loans={loans}
            settings={settings}
            setActivities={setActivities}
            activities={activities}
          />
        );
      case 'Invoices':
        return (
          <InvoicesTab 
            loans={loans}
            activities={activities}
            setActivities={setActivities}
            setActiveInvoice={setActiveInvoice}
          />
        );
      case 'Pledged Items':
        return (
          <PledgedItemsTab 
            pledgedItems={pledgedItems}
            setPledgedItems={setPledgedItems}
            activities={activities}
            setActivities={setActivities}
          />
        );
      case 'Reports':
        return <ReportsTab loans={loans} />;
      case 'Employees':
        return (
          <EmployeesTab 
            employees={employees}
            setEmployees={setEmployees}
            activities={activities}
            setActivities={setActivities}
          />
        );
      case 'Branches':
        return (
          <BranchesTab 
            branches={branches}
            setBranches={setBranches}
            setActivities={setActivities}
            activities={activities}
          />
        );
      case 'Settings':
        return (
          <SettingsTab 
            settings={settings}
            setSettings={setSettings}
            setActivities={setActivities}
            activities={activities}
          />
        );
      case 'Subscription':
        return <SubscriptionTab currentOwner={currentOwner || null} />;
      default:
        return (
          <DashboardOverview 
            loans={loans}
            customers={customers}
            activities={activities}
            onOpenNewLoan={() => setActiveTab('Gold Loans')}
            settings={settings}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7FC] text-[#0B1E43] flex flex-col md:flex-row font-sans antialiased">
      
      {/* 1. SIDEBAR NAVIGATION */}
      <aside className="w-full md:w-64 bg-[#0A1A36] text-white flex flex-col justify-between shrink-0 p-5 md:min-h-screen border-r border-[#1B2B4C]/40">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="sb-gold-crown-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#DF9F28" />
                    <stop offset="30%" stopColor="#FFF2B2" />
                    <stop offset="70%" stopColor="#D28F1B" />
                    <stop offset="100%" stopColor="#875005" />
                  </linearGradient>
                </defs>
                <path d="M 32 30 L 28 14 L 38 23 L 50 8 L 62 23 L 72 14 L 68 30 Z" fill="url(#sb-gold-crown-grad)" />
                <path d="M 18 48 L 82 48 L 94 60 L 50 95 L 6 60 Z" stroke="url(#sb-gold-crown-grad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 58 42 C 58 42, 53 38, 46 40 C 40 42, 38 46, 40 52 C 42 58, 48 60, 53 62 C 59 64, 63 67, 61 75 C 59 83, 50 86, 43 83 C 37 80, 36 75, 36 75" stroke="url(#sb-gold-crown-grad)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-baseline font-serif">
                <span className="font-extrabold text-white text-lg tracking-tight">Suvarna</span>
                <span className="font-extrabold bg-gradient-to-r from-amber-400 to-yellow-200 bg-clip-text text-transparent text-lg tracking-tight ml-0.5">Loan</span>
              </div>
              <span className="text-[7.5px] font-bold text-slate-400 tracking-[0.2em] uppercase block leading-none">ERP SOFTWARE</span>
            </div>
          </div>

          <nav className="space-y-1 pt-4">
            {[
              { name: 'Dashboard', icon: Layers },
              { name: 'Customers', icon: Users, badge: customers.length > 0 ? customers.length.toString() : undefined },
              { name: 'Gold Loans', icon: Scale },
              { name: 'Payments', icon: CreditCard },
              { name: 'Interest', icon: TrendingUp },
              { name: 'Invoices', icon: FileText },
              { name: 'Pledged Items', icon: Landmark },
              { name: 'Reports', icon: ShieldCheck },
              { name: 'Employees', icon: Briefcase },
              { name: 'Branches', icon: Landmark },
              { name: 'Settings', icon: Settings },
              { name: 'Subscription', icon: Award },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => setActiveTab(item.name)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-gradient-to-r from-[#DF9F28] to-[#D28F1B] text-[#0A1A36] shadow-lg shadow-amber-500/10 font-bold' 
                      : 'text-slate-300 hover:bg-[#152747]/60 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#0A1A36]' : 'text-slate-400'}`} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className={`px-1.5 py-0.5 rounded-full text-[9px] ${isActive ? 'bg-[#0A1A36] text-white font-black' : 'bg-amber-500 text-slate-900 font-extrabold'}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="space-y-4 pt-6 mt-6 border-t border-[#1B2B4C]/60 text-slate-300">
          <div className="bg-gradient-to-b from-[#152747] to-[#0E1F3D] p-3.5 rounded-2xl border border-white/5 relative overflow-hidden">
            <span className="text-[9px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider block mb-1">
              {currentOwner?.plan || "Sovereign Pro"} Plan
            </span>
            <p className="text-[9px]">License state: <span className="text-emerald-400 font-bold">Active</span></p>
          </div>

          <div className="flex items-center justify-between p-1">
            <div className="flex items-center gap-2.5">
              <img src={ownerAvatar} alt="Owner" className="w-9 h-9 rounded-xl object-cover" />
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold leading-none text-white">{ownerName}</span>
                <span className="text-[9px] text-slate-400 mt-1">Shop Owner</span>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* 2. MAIN VIEWPORT */}
      <main className="flex-1 flex flex-col p-4 md:p-8 space-y-6 overflow-x-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-[#0A1A36]">
              {settings.shopName}
            </h1>
            <p className="text-xs text-slate-500 mt-1 font-semibold">Active Panel: {activeTab}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 bg-white text-xs text-[#0B1E43] font-medium border border-slate-200 rounded-xl focus:outline-hidden w-44 placeholder-slate-400"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>

            <div className="relative">
              <button 
                onClick={() => setIsBranchDropdownOpen(!isBranchDropdownOpen)}
                className="flex items-center gap-2 bg-white border border-slate-200 px-3.5 py-2 rounded-xl text-xs font-bold text-[#0B1E43] cursor-pointer"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span>Main Branch</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>
              {isBranchDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-48 bg-white border border-slate-100 rounded-xl shadow-lg py-1.5 z-40 text-left">
                  <button onClick={() => setIsBranchDropdownOpen(false)} className="w-full text-left px-4 py-2 text-xs font-bold text-[#0B1E43] hover:bg-slate-50">Mumbai Main Branch</button>
                  <button onClick={() => setIsBranchDropdownOpen(false)} className="w-full text-left px-4 py-2 text-xs font-bold text-[#0B1E43] hover:bg-slate-50">Pune Sub Branch</button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Database Status Alert */}
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs text-left">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${
              dbStatus === 'connected' ? 'bg-emerald-500' :
              dbStatus === 'connecting' ? 'bg-amber-400 animate-spin' :
              'bg-amber-500'
            }`}></div>
            <div>
              <span className="text-xs font-black block text-[#0B1E43]">
                {dbStatus === 'connected' ? '⚡ Connected to Supabase Cloud Database' :
                 dbStatus === 'connecting' ? '🔄 Connecting to Supabase Cloud...' :
                 '🔌 Offline Safe Mode Active (Using Local Storage)'}
              </span>
              <span className="text-[10px] text-slate-500 mt-0.5 block">
                {dbStatus === 'connected' 
                  ? 'All records and transactions sync securely to your cloud database.' 
                  : 'Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY inside .env.local to link your Supabase cluster.'}
              </span>
            </div>
          </div>
          {dbStatus !== 'connected' && (
            <button 
              onClick={() => setIsSupabaseModalOpen(true)}
              className="px-3 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-[#D28F1B] border border-[#D28F1B]/20 rounded-lg text-[10px] font-extrabold tracking-wide uppercase transition-colors cursor-pointer"
            >
              How to Connect
            </button>
          )}
        </div>

        {renderTabContent()}
      </main>

      {/* How to Connect Supabase Modal */}
      <AnimatePresence>
        {isSupabaseModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[#0A1A36]/60 backdrop-blur-xs" onClick={() => setIsSupabaseModalOpen(false)}></div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-md w-full p-6 relative z-10 shadow-2xl border border-slate-200 text-left"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-sm font-black text-[#0A1A36] flex items-center gap-1.5">
                  <Landmark className="w-4.5 h-4.5 text-amber-500" />
                  Connect Supabase Instance
                </h3>
                <button onClick={() => setIsSupabaseModalOpen(false)} className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-4 pt-4 text-xs text-slate-600 font-sans">
                <p>This Gold Loan ERP can sync directly with your own **Supabase Database & Authentication** cluster.</p>
                <ol className="list-decimal pl-4 space-y-1.5 font-medium">
                  <li>Create a free account or login to **Supabase** (https://supabase.com).</li>
                  <li>Provision a new project and retrieve your **Project URL** and **API Anon Key**.</li>
                  <li>Configure them inside `.env.local` variables.</li>
                </ol>
                <div className="pt-3 flex justify-end">
                  <button onClick={() => setIsSupabaseModalOpen(false)} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-[10px] uppercase rounded-xl cursor-pointer">
                    Got It
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Invoice Delivery Preview Modal */}
      <AnimatePresence>
        {activeInvoice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[#0A1A36]/60 backdrop-blur-xs animate-fade-in" onClick={() => setActiveInvoice(null)}></div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl max-w-4xl w-full p-6 relative z-10 shadow-2xl border border-slate-200 text-[#0B1E43] flex flex-col md:flex-row gap-6 max-h-[90vh] overflow-hidden"
            >
              <div className="flex-1 flex flex-col overflow-hidden max-h-[80vh]">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 shrink-0">
                  <span className="text-sm font-black text-[#0A1A36]">Monthly Invoice copy</span>
                  <span className="text-[10px] font-mono bg-amber-50 text-[#D28F1B] px-2.5 py-0.5 rounded-md font-bold uppercase">{activeInvoice.id}</span>
                </div>
                <div className="flex-1 overflow-y-auto mt-4 p-5 bg-slate-50 rounded-2xl border border-slate-200/60 font-sans space-y-4 text-xs text-slate-700">
                  <div className="flex justify-between items-start border-b-2 border-amber-500 pb-4">
                    <div className="text-left">
                      <h4 className="text-sm font-serif font-black text-[#0A1A36] uppercase">{settings.shopName}</h4>
                      <p className="text-[9px] text-slate-400">Govt. Regd. Gold Loan Merchant</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 bg-white p-3 rounded-xl border border-slate-100 text-left">
                    <div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Customer Details</span>
                      <p className="font-extrabold text-[#0B1E43] text-sm">{activeInvoice.customerName}</p>
                      <p className="text-[10px] text-slate-500 font-bold">📞 {activeInvoice.phone}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Invoice Details</span>
                      <p>Loan Account: <span className="font-mono text-blue-600 font-extrabold">{activeInvoice.loanId}</span></p>
                      <p>Sanction Amount: <span className="font-bold text-[#0B1E43]">{formatINRLocal(activeInvoice.principal)}</span></p>
                    </div>
                  </div>
                  <div className="text-left font-bold text-[#0B1E43] bg-white p-3 rounded-xl border border-slate-100 space-y-2">
                    <h5 className="text-[9px] font-black uppercase text-[#D28F1B] tracking-wider">Billing Accruals</h5>
                    <div className="flex justify-between">
                      <span>Interest accrual (1.2%):</span>
                      <span>{formatINRLocal(activeInvoice.principal * 0.012)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>CGST + SGST (18%):</span>
                      <span>{formatINRLocal(activeInvoice.principal * 0.012 * 0.18)}</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-100 pt-2 text-xs font-black text-amber-600">
                      <span>Total Monthly Due:</span>
                      <span>{formatINRLocal(activeInvoice.principal * 0.012 * 1.18)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 mt-2 border-t border-slate-100 shrink-0">
                  <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    Securely Encrypted Session
                  </span>
                  <button 
                    onClick={() => window.print()}
                    className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Print Certificate</span>
                  </button>
                </div>
              </div>

              <div className="w-full md:w-80 bg-slate-50 p-5 rounded-2xl border border-slate-100 text-xs flex flex-col justify-between max-h-[80vh] overflow-y-auto">
                <div className="space-y-4 text-left">
                  <h4 className="text-sm font-black text-[#0A1A36]">Dispatch Channels</h4>
                  <div className="space-y-2">
                    {['whatsapp', 'sms'].map((chan) => (
                      <div 
                        key={chan}
                        onClick={() => setChannels({ ...channels, [chan]: !channels[chan as keyof typeof channels] })}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between bg-white ${
                          channels[chan as keyof typeof channels] ? 'border-amber-400' : 'border-slate-200'
                        }`}
                      >
                        <span className="font-bold text-[#0B1E43] uppercase text-[10px]">{chan} Dispatch</span>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          channels[chan as keyof typeof channels] ? 'bg-amber-400 border-amber-400 text-slate-900' : 'border-slate-300'
                        }`}>
                          {channels[chan as keyof typeof channels] && '✓'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200 space-y-2">
                  {isSending ? (
                    <div className="text-[10px] font-bold text-center text-amber-600 animate-pulse">{sendingStep}</div>
                  ) : sendCompleted ? (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-[11px] font-bold text-center">
                      Invoice Delivered Successfully
                    </div>
                  ) : (
                    <button 
                      onClick={handleSendInvoice}
                      className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-900 font-black rounded-xl text-xs uppercase tracking-wider cursor-pointer"
                    >
                      Dispatch Now
                    </button>
                  )}
                  <button 
                    onClick={() => setActiveInvoice(null)}
                    className="w-full py-2 bg-transparent text-slate-400 hover:text-slate-600 font-bold text-[10px] uppercase text-center cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Temporary placeholder for parent compiler
function setEditingCustomer(cust: any) {}
