import React, { useState } from 'react';
import { Plus, Search, FileText, X, Camera, Eye, Pencil, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CustomersTabProps {
  customers: any[];
  setCustomers: React.Dispatch<React.SetStateAction<any[]>>;
  loans: any[];
  activities: any[];
  setActivities: React.Dispatch<React.SetStateAction<any[]>>;
  setActiveInvoice: (invoice: any) => void;
  setEditingCustomer: (cust: any) => void;
}

export default function CustomersTab({
  customers,
  setCustomers,
  loans,
  activities,
  setActivities,
  setActiveInvoice,
  setEditingCustomer
}: CustomersTabProps) {
  const [isAddCustOpen, setIsAddCustOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newCustForm, setNewCustForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    aadhaar: '',
    pan: '',
    avatar: '',
    kycStatus: 'Pending'
  });

  const verifiedCount = customers.filter(c => c.kycStatus === 'Verified').length;
  const pendingCount = customers.filter(c => c.kycStatus === 'Pending' || c.kycStatus === 'Rejected').length;

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-black text-[#0A1A36]">Customer Registry</h3>
          <p className="text-xs text-slate-400">Manage customer credentials, contact info, and KYC statuses</p>
        </div>
        <button
          onClick={() => setIsAddCustOpen(true)}
          className="flex items-center gap-1.5 self-start bg-gradient-to-r from-[#DF9F28] to-[#D28F1B] text-[#0A1A36] px-4 py-2 rounded-xl text-xs font-black shadow-md hover:opacity-90 transition-all active:scale-[0.98] cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add Customer</span>
        </button>
      </div>

      {/* Quick Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Total Registered</span>
          <p className="text-xl font-black text-[#0A1A36] mt-1">{customers.length}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase">KYC Verified</span>
          <p className="text-xl font-black text-emerald-600 mt-1">{verifiedCount}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase">KYC Pending / Rejected</span>
          <p className="text-xl font-black text-amber-500 mt-1">{pendingCount}</p>
        </div>
      </div>

      {/* Customer List */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/60 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-50 mb-4">
          <h4 className="text-sm font-black text-[#0A1A36]">Active Accounts</h4>
          <div className="relative w-48 sm:w-64">
            <input
              type="text"
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-8 pr-3 py-1.5 border border-slate-200 rounded-lg focus:outline-hidden focus:border-amber-400 font-bold"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[9px] tracking-wider">
                <th className="pb-2.5">ID</th>
                <th className="pb-2.5">Name</th>
                <th className="pb-2.5">Phone & Email</th>
                <th className="pb-2.5">KYC Documents</th>
                <th className="pb-2.5">Address</th>
                <th className="pb-2.5">Active Loans</th>
                <th className="pb-2.5">KYC Status</th>
                <th className="pb-2.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 font-medium text-slate-600">
              {customers
                .filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.id.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((cust) => (
                  <tr key={cust.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 font-bold text-slate-400">{cust.id}</td>
                    <td className="py-3.5 font-extrabold text-[#0B1E43]">
                      <div className="flex items-center gap-2.5">
                        {cust.avatar ? (
                          <img 
                            src={cust.avatar} 
                            alt={cust.name} 
                            referrerPolicy="no-referrer"
                            className="w-8 h-8 rounded-full object-cover border border-slate-100 shadow-xs shrink-0" 
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-100 text-[#D28F1B] flex items-center justify-center font-black text-xs shrink-0 uppercase">
                            {cust.name ? cust.name.split(' ').map((n: any) => n[0]).join('').substring(0, 2) : 'CU'}
                          </div>
                        )}
                        <span>{cust.name}</span>
                      </div>
                    </td>
                    <td className="py-3.5">
                      <span className="block font-bold">{cust.phone}</span>
                      <span className="text-[10px] text-slate-400">{cust.email}</span>
                    </td>
                    <td className="py-3.5">
                      {cust.aadhaar || cust.pan ? (
                        <div className="space-y-1">
                          {cust.aadhaar && (
                            <span className="block text-[10px] text-slate-600 font-bold">
                              🪪 {cust.aadhaar.replace(/(\d{4})/g, '$1 ').trim()}
                            </span>
                          )}
                          {cust.pan && (
                            <span className="block text-[10px] text-[#D28F1B] font-extrabold uppercase">
                              💳 {cust.pan}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-slate-400 italic text-[10px]">None provided</span>
                      )}
                    </td>
                    <td className="py-3.5 text-slate-500 max-w-xs truncate">{cust.address}</td>
                    <td className="py-3.5">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-700 font-black rounded-md">{cust.activeLoansCount || 0}</span>
                    </td>
                    <td className="py-3.5">
                      <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider ${
                        cust.kycStatus === 'Verified' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                        cust.kycStatus === 'Pending' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                        'bg-rose-50 text-rose-600 border border-rose-100'
                      }`}>
                        {cust.kycStatus}
                      </span>
                    </td>
                    <td className="py-3.5 text-right">
                      <div className="flex justify-end items-center gap-1.5">
                        {(cust.activeLoansCount || 0) > 0 && (
                          <button
                            onClick={() => {
                              const matchingLoan = loans.find(l => l.customerName === cust.name);
                              setActiveInvoice({
                                id: `INV-2024-${Math.floor(100 + Math.random() * 900)}`,
                                loanId: matchingLoan?.id || 'SL-2024-1050',
                                customerName: cust.name,
                                phone: cust.phone,
                                email: cust.email,
                                aadhaar: cust.aadhaar,
                                pan: cust.pan,
                                item: matchingLoan?.pledgedItem || 'Gold Ornaments',
                                totalWeight: matchingLoan ? `${matchingLoan.weight} gm` : '25.3 gm',
                                principal: matchingLoan?.amount || 125000,
                                date: matchingLoan?.loanDate || '20 May 2024'
                              });
                            }}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-amber-50 hover:bg-amber-100 text-[#D28F1B] border border-amber-100/30 rounded-md text-[10px] font-bold transition-all cursor-pointer"
                            title="Send Monthly Invoice"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>Bill Dues</span>
                          </button>
                        )}
                        {cust.kycStatus !== 'Verified' && (
                          <button
                            onClick={() => {
                              const updated = customers.map(c => c.id === cust.id ? { ...c, kycStatus: 'Verified' } : c);
                              setCustomers(updated);
                              setActivities([{ id: `act-${Date.now()}`, text: `KYC Approved for ${cust.name}`, amount: null, time: 'Just now', type: 'update' }, ...activities]);
                            }}
                            className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-100 rounded-md text-[10px] font-bold cursor-pointer"
                          >
                            Approve KYC
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setEditingCustomer(cust);
                          }}
                          className="p-1 text-slate-400 hover:text-amber-500 hover:bg-slate-100 rounded-md cursor-pointer"
                          title="Edit Profile"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            alert(`Customer Profile:\n\nID: ${cust.id}\nName: ${cust.name}\nPhone: ${cust.phone}\nEmail: ${cust.email}\nAddress: ${cust.address}\nKYC Status: ${cust.kycStatus}`);
                          }}
                          className="p-1 text-slate-400 hover:text-[#0A1A36] hover:bg-slate-100 rounded-md cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Customer Modal */}
      <AnimatePresence>
        {isAddCustOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[#0A1A36]/60 backdrop-blur-xs" onClick={() => setIsAddCustOpen(false)}></div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-md w-full p-6 relative z-10 shadow-2xl border border-slate-200"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-sm font-black text-[#0A1A36] flex items-center gap-2">
                  <Users className="w-4.5 h-4.5 text-[#D28F1B]" />
                  Register New Customer
                </h3>
                <button onClick={() => setIsAddCustOpen(false)} className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!newCustForm.name || !newCustForm.phone) {
                    alert("Please fill in Name and Phone Number.");
                    return;
                  }
                  const newCust = {
                    id: `CUST-${Math.floor(100 + Math.random() * 900)}`,
                    name: newCustForm.name,
                    phone: newCustForm.phone,
                    email: newCustForm.email || 'no-email@suvarna.com',
                    address: newCustForm.address || 'Not Provided',
                    aadhaar: newCustForm.aadhaar || '',
                    pan: newCustForm.pan || '',
                    avatar: newCustForm.avatar || '',
                    kycStatus: newCustForm.kycStatus,
                    activeLoansCount: 0,
                    totalPledgedWeight: 0,
                    totalLoanAmount: 0,
                    registeredAt: 'Today'
                  };
                  setCustomers([newCust, ...customers]);
                  setActivities([{ id: `act-${Date.now()}`, text: `Registered customer ${newCust.name}`, amount: null, time: 'Just now', type: 'update' }, ...activities]);
                  setNewCustForm({ name: '', phone: '', email: '', address: '', aadhaar: '', pan: '', avatar: '', kycStatus: 'Pending' });
                  setIsAddCustOpen(false);
                }}
                className="space-y-4 pt-4 text-slate-700"
              >
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase block">Customer Profile Picture</label>
                  <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                    <div className="relative group shrink-0">
                      {newCustForm.avatar ? (
                        <img 
                          src={newCustForm.avatar} 
                          alt="Preview" 
                          referrerPolicy="no-referrer"
                          className="w-16 h-16 rounded-full object-cover border-2 border-amber-400 shadow-sm" 
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center font-black text-xl border-2 border-slate-100 uppercase">
                          {newCustForm.name ? newCustForm.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2) : 'CU'}
                        </div>
                      )}
                      <label className="absolute inset-0 bg-[#0A1A36]/70 rounded-full flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all cursor-pointer">
                        <Camera className="w-4 h-4 mb-0.5 text-amber-400" />
                        <span className="text-[7px] font-extrabold uppercase tracking-widest">Upload</span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setNewCustForm({ ...newCustForm, avatar: reader.result as string });
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                    </div>
                    
                    <div className="space-y-1 w-full text-left">
                      <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wide block">Or Preset Avatars:</span>
                      <div className="flex flex-wrap gap-2">
                        {[
                          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80',
                          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80',
                          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80',
                          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100&q=80',
                          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&h=100&q=80',
                          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&h=100&q=80'
                        ].map((url, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setNewCustForm({ ...newCustForm, avatar: url })}
                            className={`w-7 h-7 rounded-full overflow-hidden border-2 transition-all hover:scale-105 shrink-0 cursor-pointer ${newCustForm.avatar === url ? 'border-amber-500 ring-2 ring-amber-300' : 'border-slate-100 hover:border-slate-400'}`}
                          >
                            <img src={url} alt={`Preset ${idx + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Customer Full Name *</label>
                  <input
                    type="text"
                    required
                    value={newCustForm.name}
                    onChange={(e) => setNewCustForm({ ...newCustForm, name: e.target.value })}
                    className="w-full text-xs p-2.5 border border-slate-200 bg-slate-50 rounded-xl font-bold"
                    placeholder="e.g. Anand Shinde"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={newCustForm.phone}
                    onChange={(e) => setNewCustForm({ ...newCustForm, phone: e.target.value })}
                    className="w-full text-xs p-2.5 border border-slate-200 bg-slate-50 rounded-xl font-bold"
                    placeholder="e.g. +91 95451 00221"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Email Address</label>
                  <input
                    type="email"
                    value={newCustForm.email}
                    onChange={(e) => setNewCustForm({ ...newCustForm, email: e.target.value })}
                    className="w-full text-xs p-2.5 border border-slate-200 bg-slate-50 rounded-xl font-bold"
                    placeholder="e.g. anand@gmail.com"
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Aadhaar (12 Digits)</label>
                    <input
                      type="text"
                      maxLength={12}
                      value={newCustForm.aadhaar}
                      onChange={(e) => setNewCustForm({ ...newCustForm, aadhaar: e.target.value.replace(/\D/g, '') })}
                      className="w-full text-xs p-2.5 border border-slate-200 bg-slate-50 rounded-xl font-bold"
                      placeholder="e.g. 453298127432"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">PAN (10 Char)</label>
                    <input
                      type="text"
                      maxLength={10}
                      value={newCustForm.pan}
                      onChange={(e) => setNewCustForm({ ...newCustForm, pan: e.target.value.toUpperCase() })}
                      className="w-full text-xs p-2.5 border border-slate-200 bg-slate-50 rounded-xl font-bold uppercase"
                      placeholder="e.g. AHGPS9012K"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Residential Address</label>
                  <textarea
                    value={newCustForm.address}
                    onChange={(e) => setNewCustForm({ ...newCustForm, address: e.target.value })}
                    className="w-full text-xs p-2.5 border border-slate-200 bg-slate-50 rounded-xl font-bold h-20 resize-none"
                    placeholder="e.g. Flat 402, Royal Residency, Dadar West"
                  />
                </div>

                <div className="flex gap-2 justify-end pt-2">
                  <button 
                    type="button" 
                    onClick={() => setIsAddCustOpen(false)}
                    className="text-xs text-slate-500 hover:text-slate-800 font-bold px-3 py-1.5 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs px-4 py-1.5 rounded-lg shadow cursor-pointer"
                  >
                    Save Customer
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
