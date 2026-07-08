import React from 'react';
import { Landmark } from 'lucide-react';

interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  staffCount: number;
  ledgerAmount: number;
  status: 'Open' | 'Closed';
}

interface BranchesTabProps {
  branches: Branch[];
  setBranches: React.Dispatch<React.SetStateAction<Branch[]>>;
  setActivities: React.Dispatch<React.SetStateAction<any[]>>;
  activities: any[];
}

export default function BranchesTab({
  branches,
  setBranches,
  setActivities,
  activities
}: BranchesTabProps) {

  const formatINRLocal = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="space-y-6 text-left">
      <div>
        <h3 className="text-lg font-black text-[#0A1A36]">Company Store Outlets</h3>
        <p className="text-xs text-slate-400">Track liquid cash ceilings, ledger capacities and operational statuses of your registered outlets</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {branches.map((br) => (
          <div key={br.id} className="bg-white p-5 rounded-3xl border border-slate-200/60 shadow-xs flex flex-col justify-between">
            <div className="space-y-3.5">
              <div className="flex justify-between items-start">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono text-slate-400 font-bold">{br.id}</span>
                  <h4 className="text-sm font-black text-[#0A1A36]">{br.name}</h4>
                </div>
                <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider ${
                  br.status === 'Open' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'
                }`}>
                  {br.status}
                </span>
              </div>

              <div className="space-y-2 text-xs pt-1.5 text-slate-600 font-sans">
                <p>📍 {br.address}</p>
                <p>📞 {br.phone}</p>
                <div className="flex justify-between font-bold text-[11px] pt-1.5 border-t border-slate-50">
                  <span className="text-slate-400">Active Staff:</span>
                  <span className="text-[#0B1E43]">{br.staffCount} Officers</span>
                </div>
                {br.ledgerAmount > 0 && (
                  <div className="flex justify-between font-bold text-[11px]">
                    <span className="text-slate-400">Cash Ceiling:</span>
                    <span className="text-[#0B1E43]">{formatINRLocal(br.ledgerAmount)}</span>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => {
                const newCap = prompt("Specify new liquid cash ceiling amount (₹):", br.ledgerAmount.toString());
                if (newCap && !isNaN(Number(newCap))) {
                  const updated = branches.map(b => b.id === br.id ? { ...b, ledgerAmount: Number(newCap) } : b);
                  setBranches(updated);
                  setActivities([{ id: `act-${Date.now()}`, text: `Adjusted ledger capacity for ${br.name}`, amount: null, time: 'Just now', type: 'update' }, ...activities]);
                }
              }}
              className="mt-5 w-full py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold rounded-xl text-center cursor-pointer"
            >
              Adjust Ledger Limit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
