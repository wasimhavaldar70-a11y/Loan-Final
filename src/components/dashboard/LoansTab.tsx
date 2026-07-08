import React, { useState } from 'react';
import { Plus, Search, FileText, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const formatINR = (val: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(val);
};

interface LoansTabProps {
  loans: any[];
  setLoans: React.Dispatch<React.SetStateAction<any[]>>;
  customers: any[];
  activities: any[];
  setActivities: React.Dispatch<React.SetStateAction<any[]>>;
  setActiveInvoice: (invoice: any) => void;
}

export default function LoansTab({
  loans,
  setLoans,
  customers,
  activities,
  setActivities,
  setActiveInvoice
}: LoansTabProps) {
  const [isNewLoanOpen, setIsNewLoanOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newLoanForm, setNewLoanForm] = useState({
    customerName: '',
    pledgedItem: '',
    weight: '',
    purity: '22K',
    amount: '',
    dueDate: '',
    interestRate: '1.2'
  });

  const formatINRLocal = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-black text-[#0A1A36]">Gold Loan Ledger</h3>
          <p className="text-xs text-slate-400">Manage open pledge books, interest, and status updates</p>
        </div>
        <button
          onClick={() => setIsNewLoanOpen(true)}
          className="flex items-center gap-1.5 bg-gradient-to-r from-[#DF9F28] to-[#D28F1B] text-[#0A1A36] px-4.5 py-2 rounded-xl text-xs font-black shadow-md hover:opacity-90 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>New Gold Loan</span>
        </button>
      </div>

      {/* Filter controls */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/60 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-1.5">
            {['All', 'Active', 'Overdue', 'Closed'].map((status) => (
              <button
                key={status}
                onClick={() => setSearchQuery(status === 'All' ? '' : status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  (searchQuery === status || (status === 'All' && !searchQuery))
                    ? 'bg-[#0A1A36] text-white'
                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
          <div className="relative w-48 sm:w-64">
            <input
              type="text"
              placeholder="Search by ID or customer..."
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
                <th className="pb-2.5">Loan ID</th>
                <th className="pb-2.5">Customer Name</th>
                <th className="pb-2.5">Pledge Item</th>
                <th className="pb-2.5">Appraisal Weight</th>
                <th className="pb-2.5">Sanctioned Amount</th>
                <th className="pb-2.5">Due Date</th>
                <th className="pb-2.5">Status</th>
                <th className="pb-2.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 font-medium text-slate-600">
              {loans
                .filter(l => 
                  l.customerName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                  l.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  l.status.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((loan) => (
                  <tr key={loan.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 font-bold text-[#D28F1B]">{loan.id}</td>
                    <td className="py-3.5">
                      <span className="block font-extrabold text-[#0B1E43]">{loan.customerName}</span>
                      <span className="text-[10px] text-slate-400">{loan.phone}</span>
                    </td>
                    <td className="py-3.5 font-bold">{loan.pledgedItem}</td>
                    <td className="py-3.5 font-bold text-slate-500">{loan.weight} gm <span className="text-[10px] text-slate-400">({loan.purity})</span></td>
                    <td className="py-3.5 font-black text-[#0A1A36]">{formatINRLocal(loan.amount)}</td>
                    <td className="py-3.5 text-slate-400">{loan.dueDate}</td>
                    <td className="py-3.5">
                      <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider ${
                        loan.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                        loan.status === 'Overdue' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                        'bg-slate-50 text-slate-400 border border-slate-100'
                      }`}>
                        {loan.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-right">
                      <div className="flex justify-end gap-1.5">
                        {loan.status !== 'Closed' && (
                          <>
                            <button
                              onClick={() => {
                                const updated = loans.map(l => l.id === loan.id ? { ...l, status: 'Closed' } : l);
                                setLoans(updated);
                                setActivities([{ id: `act-${Date.now()}`, text: `Loan ${loan.id} closed & items released`, amount: loan.amount, time: 'Just now', type: 'payment' }, ...activities]);
                              }}
                              className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-100 rounded-md text-[10px] font-bold cursor-pointer"
                            >
                              Release / Close
                            </button>
                            {loan.status !== 'Overdue' && (
                              <button
                                onClick={() => {
                                  const updated = loans.map(l => l.id === loan.id ? { ...l, status: 'Overdue' } : l);
                                  setLoans(updated);
                                  setActivities([{ id: `act-${Date.now()}`, text: `Loan ${loan.id} flagged as OVERDUE`, amount: null, time: 'Just now', type: 'update' }, ...activities]);
                                }}
                                className="px-2 py-1 bg-amber-50 hover:bg-amber-100 text-amber-600 border border-amber-100 rounded-md text-[10px] font-bold cursor-pointer"
                              >
                                Mark Overdue
                              </button>
                            )}
                          </>
                        )}
                        <button
                          onClick={() => {
                            const customerInfo = customers.find(c => c.name.toLowerCase() === loan.customerName.toLowerCase());
                            setActiveInvoice({
                              id: `INV-2024-${Math.floor(100 + Math.random() * 900)}`,
                              loanId: loan.id,
                              customerName: loan.customerName,
                              phone: loan.phone || customerInfo?.phone,
                              email: customerInfo?.email,
                              aadhaar: loan.aadhaar || customerInfo?.aadhaar,
                              pan: loan.pan || customerInfo?.pan,
                              item: loan.pledgedItem,
                              totalWeight: `${loan.weight} gm`,
                              principal: loan.amount,
                              date: loan.loanDate
                            });
                          }}
                          className="p-1 bg-slate-50 text-slate-500 hover:text-amber-500 hover:bg-amber-50 rounded-md cursor-pointer"
                          title="Print appraisal"
                        >
                          <FileText className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Gold Loan Modal */}
      <AnimatePresence>
        {isNewLoanOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[#0A1A36]/60 backdrop-blur-xs" onClick={() => setIsNewLoanOpen(false)}></div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-md w-full p-6 relative z-10 shadow-2xl border border-slate-200"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-sm font-black text-[#0A1A36]">Sanction New Gold Loan</h3>
                <button onClick={() => setIsNewLoanOpen(false)} className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!newLoanForm.customerName || !newLoanForm.amount || !newLoanForm.weight) {
                    alert("Please fill in Customer Name, Sanctioned Amount, and Gold Weight.");
                    return;
                  }
                  const amt = parseFloat(newLoanForm.amount);
                  const wt = parseFloat(newLoanForm.weight);
                  const newLoanId = `SL-2024-${Math.floor(1000 + Math.random() * 9000)}`;
                  const date = new Date();
                  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                  const formattedDate = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;

                  const newLoan = {
                    id: newLoanId,
                    customerName: newLoanForm.customerName,
                    pledgedItem: newLoanForm.pledgedItem || 'Gold Ornaments',
                    weight: wt,
                    purity: newLoanForm.purity,
                    amount: amt,
                    loanDate: formattedDate,
                    dueDate: newLoanForm.dueDate || '12 Dec 2026',
                    interestRate: parseFloat(newLoanForm.interestRate),
                    status: 'Active'
                  };

                  setLoans([newLoan, ...loans]);
                  setActivities([
                    { id: `act-${Date.now()}`, text: `Sanctioned Gold Loan ${newLoanId} for ${newLoan.customerName}`, amount: amt, time: 'Just now', type: 'loan' },
                    ...activities
                  ]);

                  setNewLoanForm({
                    customerName: '',
                    pledgedItem: '',
                    weight: '',
                    purity: '22K',
                    amount: '',
                    dueDate: '',
                    interestRate: '1.2'
                  });
                  setIsNewLoanOpen(false);
                }}
                className="space-y-4 pt-4 text-slate-700"
              >
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Customer Name *</label>
                  <select
                    value={newLoanForm.customerName}
                    onChange={(e) => setNewLoanForm({ ...newLoanForm, customerName: e.target.value })}
                    className="w-full text-xs p-2.5 border border-slate-200 bg-slate-50 rounded-xl font-bold"
                  >
                    <option value="">Select registered customer...</option>
                    {customers.map(c => (
                      <option key={c.id} value={c.name}>{c.name} ({c.phone})</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Pledge Item Description</label>
                  <input
                    type="text"
                    value={newLoanForm.pledgedItem}
                    onChange={(e) => setNewLoanForm({ ...newLoanForm, pledgedItem: e.target.value })}
                    className="w-full text-xs p-2.5 border border-slate-200 bg-slate-50 rounded-xl font-bold"
                    placeholder="e.g. 2 Gold Chains, 4 Bangles"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Gold Net Weight (gm) *</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={newLoanForm.weight}
                      onChange={(e) => setNewLoanForm({ ...newLoanForm, weight: e.target.value })}
                      className="w-full text-xs p-2.5 border border-slate-200 bg-slate-50 rounded-xl font-bold"
                      placeholder="e.g. 24.5"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Assayed Purity</label>
                    <select
                      value={newLoanForm.purity}
                      onChange={(e) => setNewLoanForm({ ...newLoanForm, purity: e.target.value })}
                      className="w-full text-xs p-2.5 border border-slate-200 bg-slate-50 rounded-xl font-bold"
                    >
                      <option value="24K">24 Karat (Fine)</option>
                      <option value="22K">22 Karat (Standard)</option>
                      <option value="18K">18 Karat (Jewellery)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Sanctioned Amount (₹) *</label>
                    <input
                      type="number"
                      required
                      value={newLoanForm.amount}
                      onChange={(e) => setNewLoanForm({ ...newLoanForm, amount: e.target.value })}
                      className="w-full text-xs p-2.5 border border-slate-200 bg-slate-50 rounded-xl font-bold"
                      placeholder="e.g. 150000"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Due Date</label>
                    <input
                      type="text"
                      value={newLoanForm.dueDate}
                      onChange={(e) => setNewLoanForm({ ...newLoanForm, dueDate: e.target.value })}
                      className="w-full text-xs p-2.5 border border-slate-200 bg-slate-50 rounded-xl font-bold"
                      placeholder="e.g. 24 Dec 2026"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Monthly Interest Rate (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newLoanForm.interestRate}
                    onChange={(e) => setNewLoanForm({ ...newLoanForm, interestRate: e.target.value })}
                    className="w-full text-xs p-2.5 border border-slate-200 bg-slate-50 rounded-xl font-bold"
                  />
                </div>

                <div className="flex gap-2 justify-end pt-2">
                  <button 
                    type="button" 
                    onClick={() => setIsNewLoanOpen(false)}
                    className="text-xs text-slate-500 hover:text-slate-800 font-bold px-3 py-1.5 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs px-4 py-1.5 rounded-lg shadow cursor-pointer"
                  >
                    Sanction Loan
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
