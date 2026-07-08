import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Users, Scale, FileText, ArrowUpRight, ArrowDownRight, Landmark, BadgeAlert, Plus } from 'lucide-react';

interface DashboardOverviewProps {
  loans: any[];
  customers: any[];
  activities: any[];
  onOpenNewLoan: () => void;
  settings: any;
}

export default function DashboardOverview({
  loans,
  customers,
  activities,
  onOpenNewLoan,
  settings
}: DashboardOverviewProps) {

  const formatINRLocal = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  // Calculations
  const totalLoanPortfolio = loans.reduce((acc, l) => acc + (l.status !== 'Closed' ? l.amount : 0), 0);
  const totalCustomers = customers.length;
  const totalGoldWeight = loans.reduce((acc, l) => acc + (l.status !== 'Closed' ? l.weight : 0), 0) / 1000; // in kg
  const totalOutstanding = loans.reduce((acc, l) => acc + (l.status !== 'Closed' ? l.amount * (1 + (l.interestRate || 1.2)/100) : 0), 0);

  const activeLoansCount = loans.filter(l => l.status === 'Active').length;
  const overdueLoansCount = loans.filter(l => l.status === 'Overdue').length;
  const closedLoansCount = loans.filter(l => l.status === 'Closed').length;
  const totalLoansCount = loans.length;

  const activePct = totalLoansCount > 0 ? (activeLoansCount / totalLoansCount) : 0;
  const overduePct = totalLoansCount > 0 ? (overdueLoansCount / totalLoansCount) : 0;

  const activeAngle = activePct * 360;
  const overdueAngle = activeAngle + (overduePct * 360);

  return (
    <div className="space-y-6 text-left">
      
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        
        {/* Card 1: Total Portfolio */}
        <motion.div 
          whileHover={{ y: -4, scale: 1.01 }}
          className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-xs hover:shadow-md transition-all flex items-center justify-between group cursor-pointer"
        >
          <div className="space-y-2 text-left">
            <span className="text-[10px] font-extrabold text-slate-400 tracking-wider uppercase block">Total Loan Portfolio</span>
            <h3 className="text-xl md:text-2xl font-black text-[#0A1A36] tracking-tight">{formatINRLocal(totalLoanPortfolio)}</h3>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-0.5 text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md text-[10px] font-black">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+12.5%</span>
              </span>
              <span className="text-[10px] text-slate-400 font-bold">vs last month</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center border border-amber-500/20 text-[#D28F1B] shrink-0 shadow-inner group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
            <span className="text-lg font-black font-mono">₹</span>
          </div>
        </motion.div>

        {/* Card 2: Total Customers */}
        <motion.div 
          whileHover={{ y: -4, scale: 1.01 }}
          className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-xs hover:shadow-md transition-all flex items-center justify-between group cursor-pointer"
        >
          <div className="space-y-2 text-left">
            <span className="text-[10px] font-extrabold text-slate-400 tracking-wider uppercase block">Total Customers</span>
            <h3 className="text-xl md:text-2xl font-black text-[#0A1A36] tracking-tight">{totalCustomers.toLocaleString()}</h3>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-0.5 text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md text-[10px] font-black">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+8.2%</span>
              </span>
              <span className="text-[10px] text-slate-400 font-bold">vs last month</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20 text-blue-600 shrink-0 shadow-inner group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
            <Users className="w-6 h-6" />
          </div>
        </motion.div>

        {/* Card 3: Total Gold Weight */}
        <motion.div 
          whileHover={{ y: -4, scale: 1.01 }}
          className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-xs hover:shadow-md transition-all flex items-center justify-between group cursor-pointer"
        >
          <div className="space-y-2 text-left">
            <span className="text-[10px] font-extrabold text-slate-400 tracking-wider uppercase block">Total Gold Pledged</span>
            <h3 className="text-xl md:text-2xl font-black text-[#0A1A36] tracking-tight">{totalGoldWeight.toFixed(3)} kg</h3>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-0.5 text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md text-[10px] font-black">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+5.6%</span>
              </span>
              <span className="text-[10px] text-slate-400 font-bold">vs last month</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20 text-[#00A896] shrink-0 shadow-inner group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
            <Scale className="w-6 h-6" />
          </div>
        </motion.div>

        {/* Card 4: Total Outstanding */}
        <motion.div 
          whileHover={{ y: -4, scale: 1.01 }}
          className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-xs hover:shadow-md transition-all flex items-center justify-between group cursor-pointer"
        >
          <div className="space-y-2 text-left">
            <span className="text-[10px] font-extrabold text-slate-400 tracking-wider uppercase block">Total Outstanding</span>
            <h3 className="text-xl md:text-2xl font-black text-[#0A1A36] tracking-tight">{formatINRLocal(totalOutstanding)}</h3>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-0.5 text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md text-[10px] font-black">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+10.3%</span>
              </span>
              <span className="text-[10px] text-slate-400 font-bold">vs last month</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-rose-500/10 rounded-2xl flex items-center justify-center border border-rose-500/20 text-rose-600 shrink-0 shadow-inner group-hover:bg-rose-500 group-hover:text-white transition-colors duration-300">
            <FileText className="w-6 h-6" />
          </div>
        </motion.div>

      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Collections Chart Card */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/60 shadow-xs lg:col-span-2 text-left space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-black text-[#0A1A36]">Collections & Disbursals Tracker</h4>
              <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">Real-time daily operations scale</p>
            </div>
            <div className="flex items-center gap-4 text-[10px] font-extrabold">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-amber-400 rounded-xs"></span>
                <span className="text-slate-500">Accrued Interest</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-[#0A1A36] rounded-xs"></span>
                <span className="text-slate-500">Disbursed Principal</span>
              </div>
            </div>
          </div>

          {/* Simple Chart Bar Representation */}
          <div className="h-44 flex items-end justify-between gap-3 pt-6 border-b border-slate-100 pb-2">
            {[
              { label: '01 Jul', int: 4200, principal: 45000 },
              { label: '02 Jul', int: 5600, principal: 92000 },
              { label: '03 Jul', int: 3900, principal: 30000 },
              { label: '04 Jul', int: 7100, principal: 120000 },
              { label: '05 Jul', int: 6400, principal: 85000 },
              { label: '06 Jul', int: 8100, principal: 150000 },
              { label: 'Today', int: 11200, principal: 195000 }
            ].map((d, i) => {
              const maxVal = 210000;
              const intHeight = `${(d.int / maxVal) * 100}%`;
              const prinHeight = `${(d.principal / maxVal) * 100}%`;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end font-sans">
                  <div className="w-full flex justify-center items-end gap-1 h-36">
                    <div style={{ height: intHeight }} className="w-2 sm:w-3 bg-amber-400 rounded-t-xs hover:brightness-95 transition-all"></div>
                    <div style={{ height: prinHeight }} className="w-2 sm:w-3 bg-[#0A1A36] rounded-t-xs hover:brightness-110 transition-all"></div>
                  </div>
                  <span className="text-[9px] text-slate-400 font-bold leading-none">{d.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Donut Chart & Live Rates Card */}
        <div className="space-y-6">
          
          {/* Packet Distribution Donut */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200/60 shadow-xs text-left space-y-4">
            <h4 className="text-sm font-black text-[#0A1A36]">Packet Distribution</h4>
            <div className="flex items-center justify-around gap-4">
              <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 42 42">
                  <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#E2E8F0" strokeWidth="4.5" />
                  {totalLoansCount > 0 && (
                    <>
                      <circle 
                        cx="21" cy="21" r="15.915" fill="transparent" 
                        stroke="#10B981" strokeWidth="4.5" 
                        strokeDasharray={`${activePct * 100} ${100 - (activePct * 100)}`} 
                        strokeDashoffset="0"
                      />
                      <circle 
                        cx="21" cy="21" r="15.915" fill="transparent" 
                        stroke="#F59E0B" strokeWidth="4.5" 
                        strokeDasharray={`${overduePct * 100} ${100 - (overduePct * 100)}`} 
                        strokeDashoffset={`-${activePct * 100}`}
                      />
                    </>
                  )}
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-xl font-black text-[#0A1A36] leading-none font-mono">{totalLoansCount}</span>
                  <span className="text-[8px] text-slate-400 font-black uppercase mt-1">Packets</span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></div>
                  <span className="text-slate-500 font-medium">Active: {activeLoansCount}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-amber-500 rounded-full"></div>
                  <span className="text-slate-500 font-medium">Overdue: {overdueLoansCount}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-slate-300 rounded-full"></div>
                  <span className="text-slate-500 font-medium">Closed: {closedLoansCount}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Live Rates */}
          <div className="bg-[#0A1A36] text-white p-5 rounded-3xl border border-[#1B2B4C]/40 text-left space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-black flex items-center gap-1.5">
                <Landmark className="w-4 h-4 text-amber-400" />
                Live Gold Desk (Market Rate)
              </h4>
              <span className="text-[8px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-black uppercase">Live</span>
            </div>
            
            <div className="space-y-2">
              {[
                { purity: '24K Fine Gold', rate: '₹ 7,400', pct: '+0.42%', up: true },
                { purity: '22K Standard Purity', rate: '₹ 6,850', pct: '+0.38%', up: true },
                { purity: '18K Ornaments Slab', rate: '₹ 5,500', pct: '-0.12%', up: false }
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0 last:pb-0 font-sans">
                  <div>
                    <span className="text-[10px] text-slate-400 block">{item.purity}</span>
                    <span className="text-xs font-black font-mono">{item.rate}/gm</span>
                  </div>
                  <div className={`flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    item.up ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                  }`}>
                    {item.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    <span>{item.pct}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Audit Logs Registry */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/60 shadow-xs text-left">
        <h4 className="text-sm font-black text-[#0A1A36] mb-4">Live System Audit & Operations Feed</h4>
        <div className="space-y-3 font-sans text-xs">
          {activities.slice(0, 5).map((act) => (
            <div key={act.id} className="flex items-center justify-between border-b border-slate-50 pb-2 last:border-0 last:pb-0">
              <span className="text-slate-600">{act.text}</span>
              <span className="text-slate-400 text-[10px] font-mono">{act.time || 'Just now'}</span>
            </div>
          ))}
          {activities.length === 0 && (
            <p className="text-slate-400 font-bold italic py-4 text-center">No system operations logged yet today.</p>
          )}
        </div>
      </div>

    </div>
  );
}
