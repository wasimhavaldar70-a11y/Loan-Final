import React, { useState } from 'react';
import { Plus, X, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface EmployeesTabProps {
  employees: any[];
  setEmployees: React.Dispatch<React.SetStateAction<any[]>>;
  activities: any[];
  setActivities: React.Dispatch<React.SetStateAction<any[]>>;
}

export default function EmployeesTab({
  employees,
  setEmployees,
  activities,
  setActivities
}: EmployeesTabProps) {
  const [isAddEmpOpen, setIsAddEmpOpen] = useState(false);
  const [newEmpForm, setNewEmpForm] = useState({
    name: '',
    role: 'Loan Officer',
    phone: '',
    branch: 'Mumbai Main Branch'
  });

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-black text-[#0A1A36]">Staff & Credentials</h3>
          <p className="text-xs text-slate-400">Control branch user profiles, assign operational responsibilities and monitor shifts</p>
        </div>
        <button
          onClick={() => setIsAddEmpOpen(true)}
          className="flex items-center gap-1.5 bg-gradient-to-r from-[#DF9F28] to-[#D28F1B] text-[#0A1A36] px-4 py-2 rounded-xl text-xs font-black shadow-md hover:opacity-90 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add Employee</span>
        </button>
      </div>

      <div className="bg-white p-5 rounded-3xl border border-slate-200/60 shadow-xs">
        <h4 className="text-sm font-black text-[#0A1A36] mb-4">Active Staff Profiles</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[9px] tracking-wider">
                <th className="pb-2.5">Staff ID</th>
                <th className="pb-2.5">Employee Name</th>
                <th className="pb-2.5">Corporate Role</th>
                <th className="pb-2.5">Assigned Branch</th>
                <th className="pb-2.5">Contact Number</th>
                <th className="pb-2.5">ERP Security Clearance</th>
                <th className="pb-2.5 text-right">Operational Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 font-medium text-slate-600">
              {employees.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5 font-bold text-slate-400">{emp.id}</td>
                  <td className="py-3.5 font-extrabold text-[#0B1E43]">{emp.name}</td>
                  <td className="py-3.5 font-bold">{emp.role}</td>
                  <td className="py-3.5 text-slate-500">{emp.branch}</td>
                  <td className="py-3.5 font-bold">{emp.phone}</td>
                  <td className="py-3.5">
                    <span className="px-2 py-0.5 bg-slate-100 text-[#0B1E43] font-bold rounded-md uppercase text-[9px]">
                      {emp.role === 'Branch Manager' ? 'Full Control' : 'Standard Write'}
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    <button
                      onClick={() => {
                        const updated = employees.map(e => e.id === emp.id ? { ...e, status: e.status === 'Active' ? 'Suspended' : 'Active' } : e);
                        setEmployees(updated);
                        setActivities([{ id: `act-${Date.now()}`, text: `Employee status toggled for ${emp.name}`, amount: null, time: 'Just now', type: 'update' }, ...activities]);
                      }}
                      className={`px-2 py-1 rounded-md text-[10px] font-bold border transition-colors cursor-pointer ${
                        emp.status === 'Active' 
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100' 
                          : 'bg-rose-50 text-rose-600 border-rose-100 hover:bg-rose-100'
                      }`}
                    >
                      {emp.status}
                    </button>
                  </td>
                </tr>
              ))}
              {employees.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-6 text-center text-slate-400 font-bold italic">No staff members configured</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Employee Modal */}
      <AnimatePresence>
        {isAddEmpOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[#0A1A36]/60 backdrop-blur-xs" onClick={() => setIsAddEmpOpen(false)}></div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-md w-full p-6 relative z-10 shadow-2xl border border-slate-200"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-sm font-black text-[#0A1A36] flex items-center gap-2">
                  <Briefcase className="w-4.5 h-4.5 text-[#D28F1B]" />
                  Register New Staff Employee
                </h3>
                <button onClick={() => setIsAddEmpOpen(false)} className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!newEmpForm.name || !newEmpForm.phone) {
                    alert("Please fill in Name and Phone Number.");
                    return;
                  }
                  const newEmp = {
                    id: `EMP-${Math.floor(10 + Math.random() * 90)}`,
                    name: newEmpForm.name,
                    role: newEmpForm.role,
                    phone: newEmpForm.phone,
                    branch: newEmpForm.branch,
                    status: 'Active'
                  };
                  setEmployees([...employees, newEmp]);
                  setActivities([{ id: `act-${Date.now()}`, text: `Registered employee profile ${newEmp.name}`, amount: null, time: 'Just now', type: 'update' }, ...activities]);
                  setNewEmpForm({ name: '', role: 'Loan Officer', phone: '', branch: 'Mumbai Main Branch' });
                  setIsAddEmpOpen(false);
                }}
                className="space-y-4 pt-4 text-slate-700 font-sans"
              >
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Employee Full Name *</label>
                  <input
                    type="text"
                    required
                    value={newEmpForm.name}
                    onChange={(e) => setNewEmpForm({ ...newEmpForm, name: e.target.value })}
                    className="w-full text-xs p-2.5 border border-slate-200 bg-slate-50 rounded-xl font-bold font-sans"
                    placeholder="e.g. Ramesh Chavan"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Corporate Role Type</label>
                  <select
                    value={newEmpForm.role}
                    onChange={(e) => setNewEmpForm({ ...newEmpForm, role: e.target.value })}
                    className="w-full text-xs p-2.5 border border-slate-200 bg-slate-50 rounded-xl font-bold font-sans"
                  >
                    <option value="Loan Officer">Loan Officer (Standard)</option>
                    <option value="Gold Valuer">Gold Appraiser & Valuer</option>
                    <option value="Cashier">Cash Counter Clerk</option>
                    <option value="Branch Manager">Branch Manager (Full clearance)</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Assigned Working Branch</label>
                  <select
                    value={newEmpForm.branch}
                    onChange={(e) => setNewEmpForm({ ...newEmpForm, branch: e.target.value })}
                    className="w-full text-xs p-2.5 border border-slate-200 bg-slate-50 rounded-xl font-bold font-sans"
                  >
                    <option value="Mumbai Main Branch">Mumbai Main Branch</option>
                    <option value="Pune Sub Branch">Pune Sub Branch</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Contact Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={newEmpForm.phone}
                    onChange={(e) => setNewEmpForm({ ...newEmpForm, phone: e.target.value })}
                    className="w-full text-xs p-2.5 border border-slate-200 bg-slate-50 rounded-xl font-bold font-sans"
                    placeholder="e.g. +91 91234 56789"
                  />
                </div>

                <div className="flex gap-2 justify-end pt-2">
                  <button 
                    type="button" 
                    onClick={() => setIsAddEmpOpen(false)}
                    className="text-xs text-slate-500 hover:text-slate-800 font-bold px-3 py-1.5 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs px-4 py-1.5 rounded-lg shadow cursor-pointer"
                  >
                    Register Staff
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
