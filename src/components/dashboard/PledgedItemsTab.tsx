import React from 'react';
import { Landmark, ShieldCheck } from 'lucide-react';

interface PledgedItemsTabProps {
  pledgedItems: any[];
  setPledgedItems: React.Dispatch<React.SetStateAction<any[]>>;
  activities: any[];
  setActivities: React.Dispatch<React.SetStateAction<any[]>>;
}

export default function PledgedItemsTab({
  pledgedItems,
  setPledgedItems,
  activities,
  setActivities
}: PledgedItemsTabProps) {

  return (
    <div className="space-y-6 text-left">
      <div>
        <h3 className="text-lg font-black text-[#0A1A36]">Pledge Drawer & Locker Vault</h3>
        <p className="text-xs text-slate-400">Monitor precious metals inventory, drawer assignments and secure vault logs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-3xl border border-slate-200/60 shadow-xs md:col-span-2 space-y-4">
          <h4 className="text-sm font-black text-[#0A1A36] flex items-center gap-1.5">
            <Landmark className="w-4 h-4 text-[#D28F1B]" />
            Active Drawer Registry
          </h4>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[9px] tracking-wider">
                  <th className="pb-2.5">Packet ID</th>
                  <th className="pb-2.5">Description</th>
                  <th className="pb-2.5">Weight / Purity</th>
                  <th className="pb-2.5">Customer Name</th>
                  <th className="pb-2.5">Locker Location</th>
                  <th className="pb-2.5">Vault Status</th>
                  <th className="pb-2.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 font-medium text-slate-600">
                {pledgedItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 font-bold text-slate-400">{item.id}</td>
                    <td className="py-3.5 font-extrabold text-[#0B1E43]">{item.description}</td>
                    <td className="py-3.5">{item.weight} ({item.purity})</td>
                    <td className="py-3.5 font-bold">{item.customer}</td>
                    <td className="py-3.5">
                      <span className="font-mono font-bold text-[#D28F1B] bg-amber-50 px-2 py-0.5 rounded-md text-[10px]">{item.locker}</span>
                    </td>
                    <td className="py-3.5">
                      <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider ${
                        item.status === 'Secured' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-50 text-slate-400 border border-slate-100'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-right">
                      <button
                        onClick={() => {
                          const newLoc = prompt("Enter new locker coordinates (e.g. Locker B-05):", item.locker);
                          if (newLoc) {
                            const updated = pledgedItems.map(p => p.id === item.id ? { ...p, locker: newLoc } : p);
                            setPledgedItems(updated);
                            setActivities([{ id: `act-${Date.now()}`, text: `Transferred ${item.description} to ${newLoc}`, amount: null, time: 'Just now', type: 'update' }, ...activities]);
                          }
                        }}
                        className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-md font-bold text-[10px] cursor-pointer"
                      >
                        Transfer
                      </button>
                    </td>
                  </tr>
                ))}
                {pledgedItems.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-6 text-center text-slate-400 font-bold italic">No physical gold packet stored</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Security Metrics Card */}
        <div className="bg-[#0A1A36] text-white p-5 rounded-3xl border border-[#1B2B4C]/40 flex flex-col justify-between">
          <div className="space-y-4">
            <h4 className="text-sm font-black flex items-center gap-1.5">
              <ShieldCheck className="w-5 h-5 text-emerald-400 animate-pulse" />
              Vault Status: SECURE
            </h4>
            <p className="text-[11px] text-slate-300 font-sans">Biometric lockers are operating in healthy modes. All items logged here match physical lockers A-01 through C-20 with real-time weighing logs.</p>
            <div className="pt-2 text-xs space-y-2 font-sans">
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-slate-400">Total Vaulted Weight</span>
                <span className="font-bold text-white">12.4 kg Gold</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-slate-400">Locked Items</span>
                <span className="font-bold text-amber-400">{pledgedItems.filter(p => p.status === 'Secured').length} Packets</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Last Audit</span>
                <span className="font-bold text-emerald-400">Today 09:00 AM</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => alert("Initiating complete vault audit... Status: Ok. Sensors synced.")}
            className="mt-6 w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold rounded-xl text-center cursor-pointer"
          >
            Trigger Sensor Audit
          </button>
        </div>
      </div>
    </div>
  );
}
