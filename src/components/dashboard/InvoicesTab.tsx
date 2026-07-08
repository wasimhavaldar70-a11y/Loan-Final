import React, { useState } from 'react';
import { Smartphone, RefreshCw, Eye, FileText } from 'lucide-react';

interface InvoicesTabProps {
  loans: any[];
  activities: any[];
  setActivities: React.Dispatch<React.SetStateAction<any[]>>;
  setActiveInvoice: (invoice: any) => void;
}

export default function InvoicesTab({
  loans,
  activities,
  setActivities,
  setActiveInvoice
}: InvoicesTabProps) {
  const [isSendingAll, setIsSendingAll] = useState(false);
  const [bulkSendCount, setBulkSendCount] = useState(0);
  const [bulkSendStep, setBulkSendStep] = useState('');

  const formatINRLocal = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const activeLoans = loans.filter(l => l.status !== 'Closed');

  const handleBroadcast = () => {
    setIsSendingAll(true);
    setBulkSendCount(0);
    setBulkSendStep("Fetching active loan registries...");
    
    let count = 0;
    
    const sendNext = () => {
      if (count < activeLoans.length) {
        const loan = activeLoans[count];
        setBulkSendStep(`Delivering PDF invoice to ${loan.customerName} via WhatsApp/SMS...`);
        setBulkSendCount(count + 1);
        
        const newAct = {
          id: `act-${Date.now()}-${count}`,
          text: `Auto Monthly Invoice INV-2024-${Math.floor(100+Math.random()*900)} dispatched to ${loan.customerName}`,
          amount: null,
          time: 'Just now',
          type: 'invoice'
        };
        setActivities(prev => [newAct, ...prev]);

        count++;
        setTimeout(sendNext, 750);
      } else {
        setBulkSendStep("Complete!");
        setTimeout(() => {
          setIsSendingAll(false);
          alert(`Success! Generated and dispatched monthly invoices to all ${activeLoans.length} active gold loan customers. Broadcast receipts logged in the System Registry.`);
        }, 1000);
      }
    };
    
    setTimeout(sendNext, 900);
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-black text-[#0A1A36]">Appraisal Certificates & Invoices</h3>
          <p className="text-xs text-slate-400">Access, preview, and print formal gold valuation certificates and tax receipts</p>
        </div>
        <div className="text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-xl font-bold flex items-center gap-1.5 self-start shrink-0">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></div>
          <span>Telecom API: Online</span>
        </div>
      </div>

      {/* Broadcast Panel */}
      <div className="bg-gradient-to-r from-amber-500/10 to-amber-600/5 p-5 rounded-3xl border border-amber-500/20 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5 relative overflow-hidden">
        <div className="space-y-1.5 max-w-2xl text-left">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-amber-500 text-[#0A1A36] text-[9px] font-black uppercase tracking-wider rounded-md">ERP Core</span>
            <span className="text-xs font-black text-[#0A1A36]">Monthly Invoice Broadcast Hub</span>
          </div>
          <h4 className="text-sm font-bold text-[#0A1A36]">Send Monthly Gold Loan Invoices to All Active Customers</h4>
          <p className="text-xs text-slate-600 leading-normal font-sans">
            Instantly compute monthly interest dues under sovereign guidelines (1.2% base + 18% GST), assemble appraisal certificates, and automatically dispatch PDF links via **WhatsApp API** and **SMS Relay** to all clients with active accounts.
          </p>
        </div>
        
        <div className="shrink-0 text-left md:text-right space-y-2">
          {isSendingAll ? (
            <div className="space-y-1.5 p-3 bg-[#0A1A36] text-white rounded-2xl border border-[#1B2B4C] min-w-56">
              <div className="flex items-center gap-2 justify-between">
                <span className="text-[9px] font-bold text-amber-400 uppercase tracking-wider">Processing Queue</span>
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
              </div>
              <p className="text-[10px] font-medium text-slate-300 leading-none truncate">{bulkSendStep}</p>
            </div>
          ) : (
            <button
              onClick={handleBroadcast}
              disabled={isSendingAll || activeLoans.length === 0}
              className="flex items-center justify-center gap-2 px-5 py-3 bg-[#0A1A36] text-white hover:bg-[#152747] font-black rounded-2xl text-xs uppercase tracking-wider shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer"
            >
              <Smartphone className="w-4 h-4 text-amber-400 stroke-[2.5]" />
              <span>Broadcast Invoices ({activeLoans.length})</span>
            </button>
          )}
          <p className="text-[9px] text-slate-400">Total outstanding billing queue: {activeLoans.length} active accounts</p>
        </div>
      </div>

      <div className="bg-white p-5 rounded-3xl border border-slate-200/60 shadow-xs">
        <h4 className="text-sm font-black text-[#0A1A36] mb-4">Past Documents</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[9px] tracking-wider">
                <th className="pb-2.5">Invoice ID</th>
                <th className="pb-2.5">Loan ID</th>
                <th className="pb-2.5">Customer Name</th>
                <th className="pb-2.5">Valued Item</th>
                <th className="pb-2.5">Appraised Value</th>
                <th className="pb-2.5">Date</th>
                <th className="pb-2.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 font-medium text-slate-600">
              {[
                { id: 'INV-2024-401', loanId: 'SL-2024-1050', customerName: 'Suresh Patil', item: 'Gold Chain (Heavy)', totalWeight: '25.30 gm', principal: 125000, date: '20 May 2024' },
                { id: 'INV-2024-402', loanId: 'SL-2024-1049', customerName: 'Amit Sharma', item: '2 Gold Bangles', totalWeight: '18.60 gm', principal: 85000, date: '19 May 2024' },
                { id: 'INV-2024-403', loanId: 'SL-2024-1048', customerName: 'Kavita Jadhav', item: 'Gold Necklace & Ring Set', totalWeight: '92.50 gm', principal: 450000, date: '15 May 2024' },
              ].map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5 font-bold text-slate-400">{inv.id}</td>
                  <td className="py-3.5 font-bold text-[#D28F1B]">{inv.loanId}</td>
                  <td className="py-3.5 font-extrabold text-[#0B1E43]">{inv.customerName}</td>
                  <td className="py-3.5">{inv.item} ({inv.totalWeight})</td>
                  <td className="py-3.5 font-black text-[#0A1A36]">{formatINRLocal(inv.principal)}</td>
                  <td className="py-3.5 text-slate-400">{inv.date}</td>
                  <td className="py-3.5 text-right">
                    <button
                      onClick={() => setActiveInvoice(inv)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-[#D28F1B] rounded-lg font-bold text-[10px] cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
