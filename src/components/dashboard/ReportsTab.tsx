import React from 'react';

interface ReportsTabProps {
  loans: any[];
}

export default function ReportsTab({ loans }: ReportsTabProps) {

  const formatINRLocal = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const totalLoanPortfolio = loans.reduce((acc, l) => acc + (l.status !== 'Closed' ? l.amount : 0), 0);

  return (
    <div className="space-y-6 text-left">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-black text-[#0A1A36]">Executive Reports</h3>
          <p className="text-xs text-slate-400">Business performance metrics, monthly audit logs, and interest ledger growth charts</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => alert("Exporting spreadsheet ledger to Excel...")} className="px-3 py-1.5 bg-slate-200/60 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold cursor-pointer">Export Excel</button>
          <button onClick={() => alert("Rendering PDF summary...")} className="px-3 py-1.5 bg-[#0A1A36] hover:bg-[#0A1A36]/90 text-white rounded-lg text-xs font-bold cursor-pointer">Export PDF</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Interest Accrued (MTD)</span>
          <p className="text-xl font-black text-emerald-600 mt-1">{formatINRLocal(totalLoanPortfolio * 0.012)}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase">New Disbursals (MTD)</span>
          <p className="text-xl font-black text-blue-600 mt-1">{formatINRLocal(totalLoanPortfolio)}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Average Ticket Size</span>
          <p className="text-xl font-black text-[#0A1A36] mt-1">{formatINRLocal(loans.length > 0 ? Math.round(totalLoanPortfolio / loans.length) : 0)}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase">NPA (Non-Perf. Assets)</span>
          <p className="text-xl font-black text-rose-500 mt-1">1.8% <span className="text-[9px] text-slate-400 font-medium">Excellent</span></p>
        </div>
      </div>

      <div className="bg-white p-5 rounded-3xl border border-slate-200/60 shadow-xs space-y-4">
        <h4 className="text-sm font-black text-[#0A1A36]">Interest Collection Growth (Weekly)</h4>
        <div className="h-48 flex items-end justify-between gap-4 pt-4 border-b border-slate-100 pb-2">
          {[
            { label: 'Week 1', value: 45000, height: '30%' },
            { label: 'Week 2', value: 68000, height: '48%' },
            { label: 'Week 3', value: 92000, height: '65%' },
            { label: 'Week 4', value: 125000, height: '88%' }
          ].map((bar, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end font-sans">
              <span className="text-[10px] font-bold text-slate-500">{formatINRLocal(bar.value)}</span>
              <div style={{ height: bar.height }} className="w-full max-w-16 bg-gradient-to-t from-[#D28F1B] to-[#DF9F28] rounded-t-lg transition-all hover:brightness-110"></div>
              <span className="text-[10px] text-slate-400 font-bold">{bar.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
