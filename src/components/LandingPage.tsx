import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, Phone, Play, Calendar, ChevronDown, Award, Users, 
  Scale, Database, Lock, Clock, FileText, BarChart2, CheckCircle2,
  ChevronRight, Info, Heart, ArrowRight, ArrowLeft, Sparkles, Building, Check, X,
  Calculator, UserCheck, CheckCircle, Zap
} from 'lucide-react';
import GoldLoanCalculator from './GoldLoanCalculator';
import { FAQ_ITEMS } from '../data';

interface LandingPageProps {
  isLoggedIn: boolean;
  userRole: 'superadmin' | 'owner' | null;
  onLoginClick: () => void;
  onSignUpClick: () => void;
  onDashboardClick: () => void;
  onLogout: () => void;
}

export default function LandingPage({
  isLoggedIn,
  userRole,
  onLoginClick,
  onSignUpClick,
  onDashboardClick,
  onLogout
}: LandingPageProps) {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [tourStep, setTourStep] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const tourSlides = [
    {
      title: "1. Smart KYC & Customer Registration",
      description: "Instantly register customers, capture photo IDs, and verify Aadhaar/PAN details with automated KYC checks directly from the mobile scanner or desktop cam.",
      badge: "Compliance",
      metric: "Avg. onboarding: < 2 mins"
    },
    {
      title: "2. Precision Weight & Purity Pledge",
      description: "Pledge gold items with granular records: purity (18K to 24K), weight in grams, gross/net weight calculation, and automatic market valuation sync.",
      badge: "Valuation",
      metric: "Direct weighing scale sync supported"
    },
    {
      title: "3. Automated Interest Disbursal Cycles",
      description: "Select monthly interest rates (0.8% to 2.5%), set custom repayment schedules, grace periods, slab interest, or penalty rates. It automatically computes totals daily.",
      badge: "Ledger Automation",
      metric: "Eliminates calculations errors"
    },
    {
      title: "4. Multi-Branch Operations & Vault Auditing",
      description: "Manage physical vaults, branch vaults, cash ledgers, employee logs, and print itemized barcode receipts and invoices for your clients.",
      badge: "Enterprise Vaulting",
      metric: "Real-time auditing & daily backups"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans antialiased relative overflow-x-hidden">
      
      {/* GLOBAL BANNER */}
      <div className="bg-gradient-to-r from-orange-600 via-rose-700 to-amber-500 text-white text-[11px] font-bold py-2 px-4 flex items-center justify-center gap-1.5 border-b border-amber-500/20 shadow-xs">
        <Sparkles className="w-3.5 h-3.5 text-yellow-200 animate-pulse" />
        <span className="tracking-wide">SuvarnaLoan ERP v2.4 Festive Release: Try the interactive Gold Calculator below!</span>
      </div>

      {/* HERO SECTION */}
      <section className="relative px-4 pt-10 pb-16 lg:pt-16 lg:pb-24 overflow-hidden text-left bg-gradient-to-b from-amber-500/5 to-transparent">
        <div className="max-w-7xl mx-auto lg:grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content Column */}
          <div className="lg:col-span-5 text-left space-y-6">
            
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/5 via-white to-emerald-500/5 px-4.5 py-2.5 rounded-full border border-orange-500/20 shadow-xs">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold text-slate-800 tracking-wider flex items-center gap-1.5 uppercase">
                <span className="text-orange-500">🇮🇳</span> India's Trusted <span className="text-emerald-600">Gold Loan ERP</span>
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
              Transform Your <br />
              <span className="text-slate-800">Jewellery Shop Into</span> <br />
              <span className="text-amber-500 block mt-1.5 bg-gradient-to-r from-amber-600 via-orange-500 to-amber-500 bg-clip-text text-transparent drop-shadow-2xs">
                A Smart Gold Loan <br />
                Business
              </span>
            </h1>

            <p className="text-slate-500 text-sm leading-relaxed max-w-lg">
              Manage customers, gold loans, KYC, payments, monthly interest, invoices and reports – all from one secure platform built for Indian jewellers.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button 
                onClick={() => onSignUpClick()}
                className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs py-3 px-6 rounded-full flex items-center gap-2 shadow-xl shadow-amber-500/15 transition-all group cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-amber-100" />
                <span>Start Free Trial</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button 
                onClick={() => setIsTourOpen(true)}
                className="bg-white hover:bg-slate-50 border border-amber-500/30 text-amber-600 font-bold text-xs py-3 px-6 rounded-full flex items-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>Watch Product Tour</span>
              </button>
            </div>
          </div>

          {/* Hero Right Placeholder Column */}
          <div className="lg:col-span-7 mt-12 lg:mt-0 flex items-center justify-center">
            <div className="w-full max-w-xl bg-white/60 rounded-3xl border border-slate-200/80 p-8 sm:p-12 text-center shadow-lg relative overflow-hidden group">
              <div className="relative z-10 flex flex-col items-center justify-center space-y-6">
                <div className="w-20 h-20 bg-gradient-to-tr from-amber-100 to-orange-100 text-amber-600 rounded-2xl flex items-center justify-center shadow-md">
                  <Scale className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-800">Suvarna Gold Loan Panel</h3>
                  <p className="text-slate-500 text-xs max-w-sm mx-auto leading-relaxed font-sans">
                    Secure real-time dashboard tracking daily accrued interest, branch cash ceilings, and pawned bullion transactions.
                  </p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={onLoginClick}
                    className="bg-[#0A1A36] text-white hover:bg-slate-800 font-bold text-xs py-2 px-4 rounded-xl cursor-pointer"
                  >
                    Log In to Dashboard
                  </button>
                  <button 
                    onClick={onSignUpClick}
                    className="border border-amber-500/30 text-amber-600 bg-amber-50 hover:bg-amber-100 font-bold text-xs py-2 px-4 rounded-xl cursor-pointer"
                  >
                    Register Shop
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* GOLD CALCULATOR SECTION */}
      <section id="calculator" className="py-16 bg-white border-y border-slate-100 text-left">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1E43]">Interactive Gold Valuation Engine</h2>
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Estimate LTV thresholds and standard monthly interest accrual</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8">
              <GoldLoanCalculator />
            </div>
            <div className="lg:col-span-4 bg-[#0A1A36] text-white p-6 rounded-3xl border border-[#1B2B4C]/40 space-y-4">
              <h4 className="text-sm font-black flex items-center gap-1.5">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                RBI Compliance Guidelines
              </h4>
              <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                Suvarna's calculations mirror the regulatory parameters specified under Section 45-L of the Reserve Bank of India pawn acts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-16 bg-slate-50 text-left">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-black text-[#0B1E43]">Frequently Answered Questions</h3>
            <p className="text-slate-400 text-xs font-bold uppercase">Get answers to standard pricing, compliance, and security questions</p>
          </div>

          <div className="space-y-3 pt-6">
            {FAQ_ITEMS.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-slate-200/60 rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full px-5 py-4 flex items-center justify-between font-bold text-slate-800 hover:bg-slate-50 text-xs text-left cursor-pointer"
                >
                  <span>{item.question}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transform transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-5 pb-4 text-[11px] text-slate-500 leading-relaxed border-t border-slate-50 pt-2 font-sans"
                    >
                      {item.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT TOUR MODAL */}
      <AnimatePresence>
        {isTourOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[#0A1A36]/60 backdrop-blur-xs" onClick={() => setIsTourOpen(false)}></div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-xl w-full p-6 relative z-10 shadow-2xl border border-slate-200 text-left text-slate-700"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-sm font-black text-[#0A1A36] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  Guided Product Tour ({tourStep + 1}/4)
                </h3>
                <button onClick={() => setIsTourOpen(false)} className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="py-6 space-y-4 font-sans">
                <span className="px-2 py-0.5 bg-amber-50 text-[#D28F1B] rounded text-[10px] font-black uppercase tracking-wider">
                  {tourSlides[tourStep].badge}
                </span>
                <h4 className="text-base font-black text-[#0A1A36]">{tourSlides[tourStep].title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{tourSlides[tourStep].description}</p>
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-extrabold text-blue-600">
                  📈 Mapped KPI: {tourSlides[tourStep].metric}
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                <button 
                  onClick={() => setTourStep(prev => Math.max(0, prev - 1))}
                  disabled={tourStep === 0}
                  className="text-xs font-bold text-slate-400 hover:text-slate-600 disabled:opacity-30 cursor-pointer"
                >
                  Previous
                </button>
                <div className="flex gap-1">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className={`w-2 h-2 rounded-full ${tourStep === i ? 'bg-amber-500' : 'bg-slate-200'}`} />
                  ))}
                </div>
                {tourStep === 3 ? (
                  <button 
                    onClick={() => { setIsTourOpen(false); onSignUpClick(); }}
                    className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs py-2 px-4 rounded-xl shadow cursor-pointer"
                  >
                    Try It Now
                  </button>
                ) : (
                  <button 
                    onClick={() => setTourStep(prev => Math.min(3, prev + 1))}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2 px-4 rounded-xl cursor-pointer"
                  >
                    Next Step
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
