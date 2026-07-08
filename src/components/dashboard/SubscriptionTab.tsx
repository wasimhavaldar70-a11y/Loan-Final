import React from 'react';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { ShopOwner } from '../LoginModal';

interface SubscriptionTabProps {
  currentOwner: ShopOwner | null;
}

export default function SubscriptionTab({ currentOwner }: SubscriptionTabProps) {

  return (
    <div className="space-y-6 text-left">
      <div>
        <h3 className="text-lg font-black text-[#0A1A36]">SaaS Enterprise Subscription</h3>
        <p className="text-xs text-slate-400">View license details, active API modules, and SaaS invoice histories</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-[#0A1A36] text-white p-6 rounded-3xl border border-[#1B2B4C]/40 lg:col-span-2 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 bg-amber-400 text-[#0A1A36] font-black rounded-lg text-[10px] uppercase tracking-wider">Enterprise Plan Active</span>
              <span className="text-xs text-slate-300">Renewal Date: **15 Jun 2027**</span>
            </div>
            <h4 className="text-xl font-serif font-black bg-gradient-to-r from-amber-400 to-yellow-200 bg-clip-text text-transparent">Suvarna ERP Premium Suite</h4>
            <p className="text-xs text-slate-300">Your account is active on the highest business tier. Includes multi-branch cash drawers, secure biometric vaults, real-time SMS relays, and Supabase cloud ledger mirrors.</p>

            <div className="grid grid-cols-2 gap-4 text-xs pt-2 font-sans">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Unlimited Customers & Loans</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Multi-Branch Synchronization</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Dynamic Gold Market API</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Sovereign Security Rules Auditing</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#1B2B4C] flex justify-between items-center text-xs">
            <span className="text-slate-400">Licensed to **Mumbai & Pune Outlets**</span>
            <span className="text-emerald-400 font-bold">💳 Auto-renewal On</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/60 shadow-xs space-y-4">
          <h4 className="text-sm font-black text-[#0A1A36] flex items-center gap-1.5">
            <Sparkles className="w-4.5 h-4.5 text-amber-500" />
            Premium Services Activated
          </h4>
          <div className="space-y-3">
            {[
              { service: 'Gold Market Rates Tracker', status: 'Online' },
              { service: 'Supabase Sync Relay', status: 'Online' },
              { service: 'Bulk SMS Gateway', status: 'Online' },
              { service: 'Physical Locker Sensor Bridge', status: 'Active' }
            ].map((srv, i) => (
              <div key={i} className="flex justify-between items-center p-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs">
                <span className="text-slate-600 font-bold">{srv.service}</span>
                <span className="text-emerald-600 font-black text-[10px] uppercase bg-emerald-50 px-2 py-0.5 rounded-md">{srv.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
