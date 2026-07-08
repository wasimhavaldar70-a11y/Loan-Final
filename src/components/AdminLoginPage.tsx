import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, Eye, EyeOff, AlertCircle, RefreshCw, Landmark, ArrowLeft, ShieldCheck } from 'lucide-react';
import { getSupabase, isSupabaseConfigured } from '../lib/supabase';
import { hashSHA256 } from '../utils/auth';

interface AdminLoginPageProps {
  onLoginSuccess: (role: 'superadmin' | 'owner') => void;
  onBackToHome: () => void;
}

export default function AdminLoginPage({ onLoginSuccess, onBackToHome }: AdminLoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shake, setShake] = useState(false);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const supabase = getSupabase() as any;
    const isOnline = isSupabaseConfigured && supabase !== null;

    try {
      const inputUser = username.trim().toLowerCase();
      const inputPasswordHash = await hashSHA256(password);

      if (isOnline) {
        // Authenticate with Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
          email: inputUser,
          password: password
        });

        if (authError) {
          // Check if Super Admin fallback matches (whitelisted credentials)
          if (
            (inputUser === 'admin@suvarnaloan.com' || 
             inputUser === 'superadmin' || 
             inputUser === 'wasimhavaldar70@gmail.com' ||
             inputUser === 'superadmin@suvarnaloan.com') && 
            password === 'superadmin123'
          ) {
            onLoginSuccess('superadmin');
            setIsSubmitting(false);
            return;
          }
          setError(authError.message || 'Invalid credentials.');
          triggerShake();
          setIsSubmitting(false);
          return;
        }

        if (authData.user) {
          // Check role metadata or email whitelist
          const isSuper = 
            authData.user.email === 'admin@suvarnaloan.com' || 
            authData.user.email === 'superadmin@suvarnaloan.com' ||
            authData.user.email === 'wasimhavaldar70@gmail.com' ||
            authData.user.user_metadata?.role === 'superadmin' ||
            authData.user.user_metadata?.is_superadmin === true;

          if (isSuper) {
            onLoginSuccess('superadmin');
          } else {
            // Check if they are a shop owner instead
            const { data: owner } = await supabase
              .from('shop_owners')
              .select('*')
              .eq('email', authData.user.email)
              .maybeSingle();

            if (owner) {
              setError('Access Denied: This portal is reserved for Super Admin users only. Please use the standard login panel.');
            } else {
              // Default fallback for auth users without shop profiles
              onLoginSuccess('superadmin');
            }
            triggerShake();
          }
        }
      } else {
        // Offline check
        if (
          (inputUser === 'superadmin' || 
           inputUser === 'wasimhavaldar70@gmail.com' || 
           inputUser === 'admin@suvarnaloan.com') && 
          password === 'superadmin123'
        ) {
          onLoginSuccess('superadmin');
        } else {
          setError('Incorrect Username/Email or Password.');
          triggerShake();
        }
      }
    } catch (err: any) {
      console.error('Admin portal login failed:', err);
      setError(err.message || 'Connection failed.');
      triggerShake();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#030914] text-slate-100 flex flex-col justify-between items-center p-6 relative overflow-hidden font-sans">
      
      {/* Decorative ambient background glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] bg-amber-500/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[80vw] h-[80vw] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none"></div>

      {/* Top Navbar */}
      <header className="w-full max-w-7xl flex items-center justify-between z-10">
        <button 
          onClick={onBackToHome}
          className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
          <span className="text-[10px] uppercase font-black text-amber-500 tracking-wider">Secure Operations Portal</span>
        </div>
      </header>

      {/* Main Login Card */}
      <main className="w-full max-w-md my-auto z-10 text-left">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ x: shake ? [0, -10, 10, -10, 10, 0] : 0 }}
          transition={shake ? { duration: 0.5 } : { type: "spring", duration: 0.5 }}
          className="bg-[#0A111E]/80 backdrop-blur-md p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6"
        >
          {/* Logo & Heading */}
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-14 h-14 bg-gradient-to-tr from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center border border-amber-400/20 shadow-xl shadow-amber-500/10">
              <Lock className="w-7 h-7 text-[#030914] stroke-[2.5]" />
            </div>
            <div>
              <h1 className="text-lg font-black text-white uppercase tracking-wider">Super Admin Login</h1>
              <p className="text-xs text-slate-400 mt-1 font-medium">Access the Suvarna Cloud Control Room</p>
            </div>
          </div>

          {/* Connection Status indicator */}
          <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/80 flex items-center justify-between text-[10px]">
            <span className="text-slate-400 font-bold">Relay Node Status:</span>
            <div className="flex items-center gap-1.5 font-black uppercase">
              <span className={`w-2 h-2 rounded-full ${isSupabaseConfigured ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
              <span className={isSupabaseConfigured ? 'text-emerald-400' : 'text-amber-400'}>
                {isSupabaseConfigured ? 'Cloud Sync Online' : 'Local Offline Sandbox'}
              </span>
            </div>
          </div>

          {error && (
            <div className="p-3.5 bg-rose-950/30 border border-rose-800/50 text-rose-300 rounded-xl text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span className="font-sans leading-relaxed">{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4 font-sans text-xs">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Super Admin Email / Username</label>
              <input
                type="text"
                required
                disabled={isSubmitting}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="wasimhavaldar70@gmail.com"
                className="w-full px-4 py-3 bg-[#111A2E]/50 border border-slate-800 focus:border-amber-500 focus:bg-[#111A2E] outline-none rounded-xl text-white font-bold transition-all placeholder-slate-600"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Security Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  disabled={isSubmitting}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-4 pr-11 py-3 bg-[#111A2E]/50 border border-slate-800 focus:border-amber-500 focus:bg-[#111A2E] outline-none rounded-xl text-white font-bold transition-all placeholder-slate-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white p-0.5 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-[#030914] rounded-xl font-black uppercase tracking-widest shadow-lg shadow-amber-500/10 active:scale-[0.98] transition-all disabled:opacity-40 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <span>Access Dashboard</span>
              )}
            </button>
          </form>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-4 z-10">
        <p className="text-[10px] text-slate-500 font-sans flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
          Suvarna Cryptographic Security System • SSL Secured Sessions
        </p>
      </footer>

    </div>
  );
}
