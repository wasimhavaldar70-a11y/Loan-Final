import React, { useState } from 'react';
import { CreditCard, TrendingUp, CheckCircle2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PaymentsTabProps {
  payments: any[];
  setPayments: React.Dispatch<React.SetStateAction<any[]>>;
  loans: any[];
  activities: any[];
  setActivities: React.Dispatch<React.SetStateAction<any[]>>;
}

export default function PaymentsTab({
  payments,
  setPayments,
  loans,
  activities,
  setActivities
}: PaymentsTabProps) {
  const [isNewPaymentOpen, setIsNewPaymentOpen] = useState(false);
  const [newPaymentForm, setNewPaymentForm] = useState({
    loanId: '',
    amount: '',
    type: 'Interest',
    mode: 'UPI'
  });

  const formatINRLocal = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const totalCollectedToday = payments.reduce((acc, curr) => acc + curr.amount, 0) + 72100;

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-black text-[#0A1A36]">Collections & Payments Ledger</h3>
          <p className="text-xs text-slate-400">Record customer interest/principal collections and view accounting history</p>
        </div>
        <button
          onClick={() => setIsNewPaymentOpen(true)}
          className="flex items-center gap-1.5 bg-gradient-to-r from-[#DF9F28] to-[#D28F1B] text-[#0A1A36] px-4 py-2.5 rounded-xl text-xs font-black shadow-md hover:opacity-90 transition-all cursor-pointer"
        >
          <CreditCard className="w-4 h-4" />
          <span>Log Repayment</span>
        </button>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Today's Collections</span>
            <p className="text-2xl font-black text-[#0A1A36] mt-1">{formatINRLocal(totalCollectedToday)}</p>
          </div>
          <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Settlement Rate</span>
            <p className="text-2xl font-black text-blue-600 mt-1">94.8%</p>
          </div>
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Payment List */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/60 shadow-xs">
        <h4 className="text-sm font-black text-[#0A1A36] mb-4">Repayment History</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[9px] tracking-wider">
                <th className="pb-2.5">Receipt ID</th>
                <th className="pb-2.5">Loan ID</th>
                <th className="pb-2.5">Customer</th>
                <th className="pb-2.5">Collection Type</th>
                <th className="pb-2.5">Payment Mode</th>
                <th className="pb-2.5">Date</th>
                <th className="pb-2.5 text-right">Collected Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 font-medium text-slate-600">
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3 font-bold text-slate-400">{p.id}</td>
                  <td className="py-3 font-bold text-[#D28F1B]">{p.loanId}</td>
                  <td className="py-3 font-extrabold text-[#0B1E43]">{p.customerName}</td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase ${
                      p.type === 'Interest' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
                    }`}>
                      {p.type}
                    </span>
                  </td>
                  <td className="py-3 font-bold text-slate-500">{p.mode}</td>
                  <td className="py-3 text-slate-400">{p.date}</td>
                  <td className="py-3 text-right font-black text-[#0A1A36]">{formatINRLocal(p.amount)}</td>
                </tr>
              ))}
              {payments.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-6 text-center text-slate-400 font-bold italic">No payments logged yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Log Repayment Modal */}
      <AnimatePresence>
        {isNewPaymentOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[#0A1A36]/60 backdrop-blur-xs" onClick={() => setIsNewPaymentOpen(false)}></div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-md w-full p-6 relative z-10 shadow-2xl border border-slate-200"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-sm font-black text-[#0A1A36] flex items-center gap-2">
                  <CreditCard className="w-4.5 h-4.5 text-[#D28F1B]" />
                  Log Repayment Receipt
                </h3>
                <button onClick={() => setIsNewPaymentOpen(false)} className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!newPaymentForm.loanId || !newPaymentForm.amount) {
                    alert("Please fill in Loan ID and Payment Amount.");
                    return;
                  }
                  const targetLoan = loans.find(l => l.id === newPaymentForm.loanId);
                  if (!targetLoan) {
                    alert("Selected Loan ID is invalid.");
                    return;
                  }
                  const amt = parseFloat(newPaymentForm.amount);
                  const payId = `PAY-${Math.floor(100 + Math.random() * 900)}`;
                  const date = new Date();
                  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                  const formattedDate = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;

                  const newPay = {
                    id: payId,
                    loanId: targetLoan.id,
                    customerName: targetLoan.customerName,
                    amount: amt,
                    type: newPaymentForm.type,
                    mode: newPaymentForm.mode,
                    date: formattedDate
                  };

                  setPayments([newPay, ...payments]);
                  setActivities([
                    { id: `act-${Date.now()}`, text: `Recorded ₹${amt} ${newPaymentForm.type} payment for ${targetLoan.customerName}`, amount: amt, time: 'Just now', type: 'payment' },
                    ...activities
                  ]);

                  setNewPaymentForm({
                    loanId: '',
                    amount: '',
                    type: 'Interest',
                    mode: 'UPI'
                  });
                  setIsNewPaymentOpen(false);
                }}
                className="space-y-4 pt-4 text-slate-700 font-sans"
              >
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Select Active Gold Loan *</label>
                  <select
                    value={newPaymentForm.loanId}
                    onChange={(e) => setNewPaymentForm({ ...newPaymentForm, loanId: e.target.value })}
                    className="w-full text-xs p-2.5 border border-slate-200 bg-slate-50 rounded-xl font-bold font-sans"
                  >
                    <option value="">Choose loan ID...</option>
                    {loans.filter(l => l.status !== 'Closed').map(l => (
                      <option key={l.id} value={l.id}>{l.id} - {l.customerName} (₹{l.amount})</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Repayment Amount (₹) *</label>
                  <input
                    type="number"
                    required
                    value={newPaymentForm.amount}
                    onChange={(e) => setNewPaymentForm({ ...newPaymentForm, amount: e.target.value })}
                    className="w-full text-xs p-2.5 border border-slate-200 bg-slate-50 rounded-xl font-bold font-sans"
                    placeholder="e.g. 2400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Collection Type</label>
                    <select
                      value={newPaymentForm.type}
                      onChange={(e) => setNewPaymentForm({ ...newPaymentForm, type: e.target.value })}
                      className="w-full text-xs p-2.5 border border-slate-200 bg-slate-50 rounded-xl font-bold font-sans"
                    >
                      <option value="Interest">Interest Collection</option>
                      <option value="Principal">Principal Settlement</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Payment Mode</label>
                    <select
                      value={newPaymentForm.mode}
                      onChange={(e) => setNewPaymentForm({ ...newPaymentForm, mode: e.target.value })}
                      className="w-full text-xs p-2.5 border border-slate-200 bg-slate-50 rounded-xl font-bold font-sans"
                    >
                      <option value="UPI">UPI (GooglePay/PhonePe)</option>
                      <option value="Cash">Cash Ledger</option>
                      <option value="Card">Visa/Mastercard Terminal</option>
                      <option value="NetBanking">Net Banking</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-2 justify-end pt-2">
                  <button 
                    type="button" 
                    onClick={() => setIsNewPaymentOpen(false)}
                    className="text-xs text-slate-500 hover:text-slate-800 font-bold px-3 py-1.5 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs px-4 py-1.5 rounded-lg shadow cursor-pointer"
                  >
                    Log Repayment
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
