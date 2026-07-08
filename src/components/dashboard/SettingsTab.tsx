import React from 'react';

interface Settings {
  shopName: string;
  defaultInterestRate: string;
  maxLtvRatio: string;
  gracePeriodDays: string;
  autoSmsAlerts: boolean;
  secureBackup: boolean;
}

interface SettingsTabProps {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
  setActivities: React.Dispatch<React.SetStateAction<any[]>>;
  activities: any[];
}

export default function SettingsTab({
  settings,
  setSettings,
  setActivities,
  activities
}: SettingsTabProps) {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("ERP System settings updated successfully!");
    setActivities([{ id: `act-${Date.now()}`, text: `Adjusted system parameters & grace periods`, amount: null, time: 'Just now', type: 'update' }, ...activities]);
  };

  return (
    <div className="space-y-6 text-left">
      <div>
        <h3 className="text-lg font-black text-[#0A1A36]">ERP Global Settings</h3>
        <p className="text-xs text-slate-400">Configure parameters, grace periods, LTV limits and company credentials dynamically</p>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-xs max-w-2xl text-slate-700">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase">Jewellery Shop Name *</label>
              <input
                type="text"
                required
                value={settings.shopName}
                onChange={(e) => setSettings({ ...settings, shopName: e.target.value })}
                className="w-full text-xs p-2.5 border border-slate-200 bg-slate-50 rounded-xl font-bold font-sans"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase">Default Base Interest (% Monthly) *</label>
              <input
                type="number"
                step="0.01"
                required
                value={settings.defaultInterestRate}
                onChange={(e) => setSettings({ ...settings, defaultInterestRate: e.target.value })}
                className="w-full text-xs p-2.5 border border-slate-200 bg-slate-50 rounded-xl font-bold font-sans"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase">Maximum LTV Limit Percentage *</label>
              <input
                type="number"
                required
                value={settings.maxLtvRatio}
                onChange={(e) => setSettings({ ...settings, maxLtvRatio: e.target.value })}
                className="w-full text-xs p-2.5 border border-slate-200 bg-slate-50 rounded-xl font-bold font-sans"
                placeholder="e.g. 85"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase">Overdue Grace Period (Days) *</label>
              <input
                type="number"
                required
                value={settings.gracePeriodDays}
                onChange={(e) => setSettings({ ...settings, gracePeriodDays: e.target.value })}
                className="w-full text-xs p-2.5 border border-slate-200 bg-slate-50 rounded-xl font-bold font-sans"
              />
            </div>
          </div>

          <div className="pt-2 space-y-3 font-sans">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-black block text-[#0B1E43]">Automated Customer SMS Alerts</span>
                <span className="text-[10px] text-slate-400 mt-0.5 block">Sends WhatsApp/SMS triggers automatically when due dates are within 3 days.</span>
              </div>
              <button
                type="button"
                onClick={() => setSettings({ ...settings, autoSmsAlerts: !settings.autoSmsAlerts })}
                className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                  settings.autoSmsAlerts ? 'bg-amber-400' : 'bg-slate-200'
                }`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  settings.autoSmsAlerts ? 'translate-x-5' : ''
                }`} />
              </button>
            </div>

            <hr className="border-slate-100" />

            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-black block text-[#0B1E43]">Durable Cloud Backup Storage</span>
                <span className="text-[10px] text-slate-400 mt-0.5 block">Pushes incremental transactions continuously to your cloud cluster.</span>
              </div>
              <button
                type="button"
                onClick={() => setSettings({ ...settings, secureBackup: !settings.secureBackup })}
                className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                  settings.secureBackup ? 'bg-amber-400' : 'bg-slate-200'
                }`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  settings.secureBackup ? 'translate-x-5' : ''
                }`} />
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button type="submit" className="bg-gradient-to-r from-[#DF9F28] to-[#D28F1B] text-[#0A1A36] px-6 py-2.5 rounded-xl text-xs font-black uppercase cursor-pointer">
              Save System Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
