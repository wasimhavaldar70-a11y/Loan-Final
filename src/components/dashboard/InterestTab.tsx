import React, { useState } from 'react';
import { Award, TrendingUp, ShieldCheck, Settings, Calendar, CheckCircle2, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Slab {
  id: number;
  name: string;
  minAmount: number;
  maxAmount: number;
  rate: number;
  description: string;
}

interface InterestTabProps {
  loans: any[];
  settings: any;
  setActivities: React.Dispatch<React.SetStateAction<any[]>>;
  activities: any[];
}

export default function InterestTab({
  loans,
  settings,
  setActivities,
  activities
}: InterestTabProps) {
  const [interestSubTab, setInterestSubTab] = useState<'calculator' | 'slabs' | 'batch'>('calculator');
  const [interestCalc, setInterestCalc] = useState({
    selectedLoanId: loans[0]?.id || '',
    elapsedDays: '30',
    customRate: ''
  });

  const [slabs, setSlabs] = useState<Slab[]>([
    { id: 1, name: 'Micro-Finance Slabs', minAmount: 0, maxAmount: 50000, rate: 1.0, description: 'Affordable tier for standard consumer credit matching RBI guidelines.' },
    { id: 2, name: 'Standard Commercial Tier', minAmount: 50001, maxAmount: 500000, rate: 1.2, description: 'Default commercial slab for mid-scale jewel pledge items.' },
    { id: 3, name: 'Sovereign Pro High-Value', minAmount: 500001, maxAmount: 10000000, rate: 1.5, description: 'Enterprise tier for bulk jewellers and high weight bullion.' }
  ]);

  const [isAccruingLedger, setIsAccruingLedger] = useState(false);
  const [accrualProgress, setAccrualProgress] = useState(0);
  const [accrualLog, setAccrualLog] = useState<string[]>([]);

  const formatINRLocal = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const selectedLoan = loans.find(l => l.id === interestCalc.selectedLoanId) || loans[0];
  const monthlyRate = parseFloat(settings.defaultInterestRate);
  const days = parseInt(interestCalc.elapsedDays) || 30;
  const interestEarned = selectedLoan ? Math.round(selectedLoan.amount * (monthlyRate / 100) * (days / 30)) : 0;
  const penaltyCharge = selectedLoan?.status === 'Overdue' ? Math.round(selectedLoan.amount * 0.02) : 0;
  const totalPayable = selectedLoan ? (selectedLoan.amount + interestEarned + penaltyCharge) : 0;

  const startLedgerAccrual = () => {
    setIsAccruingLedger(true);
    setAccrualProgress(0);
    setAccrualLog(['🚀 Initializing Monthly Automated Interest Accrual Cycle...']);

    const steps = [
      { prog: 15, log: '🔍 Scanning active gold loan records in secure vaults...' },
      { prog: 35, log: `📊 Identified 248 active accounts. Aggregated assets: ${formatINRLocal(18245000)}` },
      { prog: 55, log: `⚡ Running daily accrual calculations at default base rate of ${settings.defaultInterestRate}%...` },
      { prog: 75, log: '⚖️ Standardizing 18% GST (Tax) line items for compliance accounting...' },
      { prog: 90, log: '💾 Committing formal journal records into the master financial ledger...' },
      { prog: 100, log: '🎉 Process Complete! Accrued ₹1,48,210 of new interest. Sent 248 WhatsApp alert triggers successfully.' }
    ];

    let currentStepIndex = 0;
    const interval = setInterval(() => {
      setAccrualProgress((prev) => {
        const next = prev + 5;
        if (next >= 100) {
          clearInterval(interval);
          setIsAccruingLedger(false);
          setAccrualLog(prevLog => [...prevLog, steps[steps.length - 1].log]);
          
          setActivities([
            {
              id: `act-${Date.now()}`,
              text: `Executed Bulk Ledger Accrual: Accrued ₹1,48,210 interest for 248 packets`,
              amount: 148210,
              time: 'Just now',
              type: 'interest'
            },
            ...activities
          ]);
          return 100;
        }

        const currentStep = steps[currentStepIndex];
        if (currentStep && next >= currentStep.prog) {
          setAccrualLog(prevLog => [...prevLog, currentStep.log]);
          currentStepIndex++;
        }

        return next;
      });
    }, 150);
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-black text-[#0A1A36]">Sovereign Interest & Ledger Suite</h3>
          <p className="text-xs text-slate-400">Configure regulatory slabs, calculate accrued dues, and automate monthly disbursal billing</p>
        </div>
        <div className="flex items-center gap-2 bg-amber-50 border border-amber-100 p-2 rounded-2xl">
          <span className="p-1.5 bg-[#DF9F28]/10 text-[#D28F1B] rounded-lg">
            <Award className="w-4 h-4 text-[#D28F1B]" />
          </span>
          <div className="text-left">
            <p className="text-[9px] font-bold text-slate-400 uppercase leading-none">RBI Compliance</p>
            <p className="text-[11px] font-black text-[#0A1A36]">Sovereign Certified</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200/80 p-4 rounded-2xl shadow-xs">
          <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider block mb-1">Base Monthly Rate</span>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-black text-[#0A1A36] font-mono">{settings.defaultInterestRate}%</span>
            <span className="text-xs text-slate-400 font-semibold">/ month</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200/80 p-4 rounded-2xl shadow-xs">
          <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider block mb-1">Accrued Interest (MTD)</span>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-black text-emerald-600 font-mono">₹ 14,82,100</span>
            <span className="text-[10px] text-emerald-500 font-extrabold bg-emerald-50 px-1.5 py-0.5 rounded-md leading-none">+12.4%</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#0A1A36] to-[#040D1E] text-white border border-slate-800 p-4 rounded-2xl shadow-xs relative overflow-hidden">
          <span className="text-[9px] font-black uppercase text-amber-300 tracking-wider block mb-1">Active Ledger Packets</span>
          <div className="flex items-baseline gap-1 relative z-10">
            <span className="text-xl font-black text-white font-mono">248</span>
            <span className="text-xs text-amber-400 font-bold">Packets Audited</span>
          </div>
        </div>
      </div>

      <div className="flex border-b border-slate-200">
        {[
          { id: 'calculator', label: 'Accrual Estimator', desc: 'Single Account Projection' },
          { id: 'slabs', label: 'Interest Slabs & Rules', desc: 'Tiered Regulatory Rates' },
          { id: 'batch', label: 'Bulk Ledger Posting', desc: 'Automatic Dispatch Engine' }
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setInterestSubTab(t.id as any)}
            className={`flex-1 pb-3 text-center transition-all relative cursor-pointer ${
              interestSubTab === t.id 
                ? 'text-[#0A1A36] font-black' 
                : 'text-slate-400 hover:text-slate-600 font-bold'
            }`}
          >
            <p className="text-xs uppercase tracking-wide">{t.label}</p>
            <span className="text-[8px] opacity-60 font-medium block">{t.desc}</span>
            {interestSubTab === t.id && (
              <motion.div 
                layoutId="activeInterestTabIndicator" 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500"
              />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {interestSubTab === 'calculator' && (
          <motion.div
            key="calculator-tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            <div className="bg-white p-5 rounded-3xl border border-slate-200/60 shadow-xs lg:col-span-2 space-y-4">
              <h4 className="text-sm font-black text-[#0A1A36] flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-amber-500" />
                Live Packet Accrual Estimator
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-700">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Select Target Loan Packet</label>
                  <select
                    value={interestCalc.selectedLoanId}
                    onChange={(e) => setInterestCalc({ ...interestCalc, selectedLoanId: e.target.value })}
                    className="w-full text-xs p-2.5 border border-slate-200 bg-slate-50 rounded-xl font-bold text-[#0B1E43]"
                  >
                    {loans.map(l => (
                      <option key={l.id} value={l.id}>{l.id} - {l.customerName} (₹{l.amount.toLocaleString()})</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Interest Cycle (Days Elapsed)</label>
                  <input
                    type="number"
                    value={interestCalc.elapsedDays}
                    onChange={(e) => setInterestCalc({ ...interestCalc, elapsedDays: e.target.value })}
                    className="w-full text-xs p-2.5 border border-slate-200 bg-slate-50 rounded-xl font-bold pr-12"
                    placeholder="e.g. 30"
                  />
                </div>
              </div>

              {selectedLoan && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3.5 text-xs text-slate-700">
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-bold">Principal Sanctioned:</span>
                    <span className="font-extrabold text-[#0B1E43]">{formatINRLocal(selectedLoan.amount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-bold">Monthly Interest Rate:</span>
                    <span className="font-extrabold text-[#0B1E43]">{monthlyRate}% / month</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-bold">Days Elapsing:</span>
                    <span className="font-extrabold text-[#0B1E43] font-mono">{days} days</span>
                  </div>
                  <hr className="border-slate-200/60" />
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-bold">Calculated Net Interest:</span>
                    <span className="font-extrabold text-emerald-600 font-mono">₹ {interestEarned.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-bold">Compulsory 18% GST (Tax):</span>
                    <span className="font-extrabold text-slate-600 font-mono">₹ {Math.round(interestEarned * 0.18).toLocaleString()}</span>
                  </div>
                  {penaltyCharge > 0 && (
                    <div className="flex justify-between text-rose-500">
                      <span className="font-bold">Overdue Penalty (2%):</span>
                      <span className="font-extrabold font-mono">₹ {penaltyCharge.toLocaleString()}</span>
                    </div>
                  )}
                  <hr className="border-slate-200" />
                  <div className="flex justify-between text-sm bg-amber-500/5 p-2 rounded-lg border border-amber-500/10">
                    <span className="text-[#0A1A36] font-black">Estimated Total Payable:</span>
                    <span className="font-black text-[#0A1A36] font-mono">
                      {formatINRLocal(totalPayable + Math.round(interestEarned * 0.18))}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-[#0A1A36] text-white p-5 rounded-3xl border border-[#1B2B4C]/40 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                  <h4 className="text-sm font-black">RBI-Approved Guidelines</h4>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                  Suvarna's ERP calculations strictly mirror the regulatory framework specified under Section 45-L of the Reserve Bank of India Act.
                </p>
                <div className="space-y-2 text-xs pt-2 font-sans">
                  <div className="flex justify-between border-b border-white/5 pb-1.5">
                    <span className="text-slate-400 font-medium">Max LTV</span>
                    <span className="font-bold text-amber-400">{settings.maxLtvRatio}% of Valuation</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-medium">Grace Period</span>
                    <span className="font-bold text-white">{settings.gracePeriodDays} Days</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {interestSubTab === 'slabs' && (
          <motion.div
            key="slabs-tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <div className="bg-white p-5 rounded-3xl border border-slate-200/60 shadow-xs space-y-4">
              <h4 className="text-sm font-black text-[#0A1A36]">Active Interest Slab Configuration</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-slate-700">
                {slabs.map((slab) => (
                  <div key={slab.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60 text-left space-y-3 relative group hover:border-amber-400 transition-colors">
                    <div className="flex justify-between items-start">
                      <span className="text-[9px] bg-slate-200/80 text-slate-700 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">
                        Slab #{slab.id}
                      </span>
                      <span className="text-sm font-black text-amber-600 font-mono">{slab.rate}%/mo</span>
                    </div>
                    <div>
                      <h5 className="text-xs font-black text-[#0A1A36]">{slab.name}</h5>
                      <p className="text-[10px] text-slate-400 font-bold mt-0.5">
                        {slab.minAmount === 0 ? 'Up to' : `${formatINRLocal(slab.minAmount)} -`} {slab.maxAmount > 5000000 ? 'No limit' : formatINRLocal(slab.maxAmount)}
                      </p>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-normal font-sans">{slab.description}</p>
                    <div className="pt-2 border-t border-slate-200 flex items-center gap-2">
                      <span className="text-[9px] font-bold text-slate-400 uppercase">Adjust Rate:</span>
                      <input
                        type="number"
                        step="0.1"
                        value={slab.rate}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value) || 0;
                          setSlabs(slabs.map(s => s.id === slab.id ? { ...s, rate: val } : s));
                        }}
                        className="w-16 text-xs p-1 border border-slate-200 rounded font-bold text-center bg-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {interestSubTab === 'batch' && (
          <motion.div
            key="batch-tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white p-5 rounded-3xl border border-slate-200/60 shadow-xs space-y-4"
          >
            <h4 className="text-sm font-black text-[#0A1A36]">Monthly Batch Interest Poster</h4>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Target Ledger Accrual Month</span>
                <span className="text-xs font-black text-[#0A1A36] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#D28F1B]" />
                  July 2026 Cycle
                </span>
              </div>
              <button
                onClick={startLedgerAccrual}
                disabled={isAccruingLedger}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isAccruingLedger ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Accruing... {accrualProgress}%
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Trigger Ledger Posting
                  </>
                )}
              </button>
            </div>

            {isAccruingLedger && (
              <div className="space-y-1.5 text-slate-700">
                <div className="flex justify-between items-center text-[10px] font-bold">
                  <span className="text-amber-600 uppercase">Posting Interest Ledger Entries...</span>
                  <span className="font-mono text-amber-600">{accrualProgress}%</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full transition-all duration-150" style={{ width: `${accrualProgress}%` }} />
                </div>
              </div>
            )}

            {accrualLog.length > 0 && (
              <div className="bg-[#0B1A36] text-amber-400 p-4 rounded-2xl font-mono text-[10px] space-y-1.5 text-left max-h-40 overflow-y-auto">
                {accrualLog.map((log, idx) => (
                  <p key={idx}>{log}</p>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
