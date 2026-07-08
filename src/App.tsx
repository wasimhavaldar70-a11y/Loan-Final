import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import SuperAdminDashboard from './components/SuperAdminDashboard';
import LoginModal, { ShopOwner } from './components/LoginModal';
import SignUpModal from './components/SignUpModal';
import LiveToastHub from './components/LiveToastHub';
import AdminLoginPage from './components/AdminLoginPage';

export default function App() {
  // Path routing
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname);

  // Authentication & Session States
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('suvarna_logged_in') === 'true';
  });
  const [userRole, setUserRole] = useState<'superadmin' | 'owner' | null>(() => {
    return localStorage.getItem('suvarna_user_role') as 'superadmin' | 'owner' | null;
  });
  const [currentOwner, setCurrentOwner] = useState<ShopOwner | null>(() => {
    const stored = localStorage.getItem('suvarna_current_owner');
    return stored ? JSON.parse(stored) : null;
  });
  const [isImpersonating, setIsImpersonating] = useState<boolean>(() => {
    return localStorage.getItem('suvarna_is_impersonating') === 'true';
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState<boolean>(false);
  const [view, setView] = useState<'landing' | 'dashboard'>(() => {
    const logged = localStorage.getItem('suvarna_logged_in') === 'true';
    return logged ? 'dashboard' : 'landing';
  });

  // Handle back/forward browser navigation
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleLoginSuccess = (role: 'superadmin' | 'owner', ownerData?: ShopOwner) => {
    setIsLoggedIn(true);
    localStorage.setItem('suvarna_logged_in', 'true');
    setUserRole(role);
    localStorage.setItem('suvarna_user_role', role);
    if (ownerData) {
      setCurrentOwner(ownerData);
      localStorage.setItem('suvarna_current_owner', JSON.stringify(ownerData));
    }
    setView('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('suvarna_logged_in');
    setUserRole(null);
    localStorage.removeItem('suvarna_user_role');
    setCurrentOwner(null);
    localStorage.removeItem('suvarna_current_owner');
    setIsImpersonating(false);
    localStorage.removeItem('suvarna_is_impersonating');
    setView('landing');
    
    // Redirect back to home root path on logout
    if (window.location.pathname !== '/') {
      window.history.pushState({}, '', '/');
      setCurrentPath('/');
    }
  };

  const navigateToRoot = () => {
    window.history.pushState({}, '', '/');
    setCurrentPath('/');
    setView('landing');
  };

  const isAdminRoute = currentPath === '/admin' || currentPath === '/admin/';

  // 1. Route: /admin (Super Admin Portal)
  if (isAdminRoute) {
    if (isLoggedIn && userRole === 'superadmin') {
      return (
        <SuperAdminDashboard 
          onLogout={handleLogout}
          onImpersonateOwner={(owner) => {
            setCurrentOwner(owner);
            localStorage.setItem('suvarna_current_owner', JSON.stringify(owner));
            setUserRole('owner');
            localStorage.setItem('suvarna_user_role', 'owner');
            setIsImpersonating(true);
            localStorage.setItem('suvarna_is_impersonating', 'true');
            // Navigate to owner view
            window.history.pushState({}, '', '/');
            setCurrentPath('/');
            setView('dashboard');
          }}
        />
      );
    } else {
      return (
        <AdminLoginPage 
          onLoginSuccess={(role) => handleLoginSuccess(role)}
          onBackToHome={navigateToRoot}
        />
      );
    }
  }

  // 2. Standard Session Routing (Dashboard vs. Landing)
  if (view === 'dashboard' && isLoggedIn) {
    if (userRole === 'superadmin') {
      return (
        <SuperAdminDashboard 
          onLogout={handleLogout}
          onImpersonateOwner={(owner) => {
            setCurrentOwner(owner);
            localStorage.setItem('suvarna_current_owner', JSON.stringify(owner));
            setUserRole('owner');
            localStorage.setItem('suvarna_user_role', 'owner');
            setIsImpersonating(true);
            localStorage.setItem('suvarna_is_impersonating', 'true');
            setView('dashboard');
          }}
        />
      );
    } else {
      return (
        <div className="flex flex-col min-h-screen bg-slate-900">
          {isImpersonating && (
            <div className="bg-gradient-to-r from-amber-500 via-orange-600 to-amber-500 text-white px-4 py-2 text-xs font-black flex items-center justify-between gap-4 shadow-xl relative z-50 shrink-0 font-sans border-b border-amber-600/30 text-left">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping shrink-0" />
                <span className="tracking-wide uppercase text-[10px]">Super Admin Workspace: Impersonating <strong>{currentOwner?.shopName}</strong></span>
              </div>
              <button
                onClick={() => {
                  setIsImpersonating(false);
                  localStorage.removeItem('suvarna_is_impersonating');
                  setUserRole('superadmin');
                  localStorage.setItem('suvarna_user_role', 'superadmin');
                  setCurrentOwner(null);
                  localStorage.removeItem('suvarna_current_owner');
                  
                  // Go back to admin panel view
                  window.history.pushState({}, '', '/admin');
                  setCurrentPath('/admin');
                }}
                className="bg-white hover:bg-slate-100 text-slate-950 px-3 py-1 rounded-lg font-black text-[10px] uppercase tracking-wider transition-all cursor-pointer shadow-md"
              >
                Exit Impersonation
              </button>
            </div>
          )}
          <Dashboard 
            currentOwner={currentOwner}
            onBackToLanding={() => setView('landing')} 
            onLogout={handleLogout}
          />
        </div>
      );
    }
  }

  // 3. Fallback Landing view
  return (
    <>
      <LandingPage 
        isLoggedIn={isLoggedIn}
        userRole={userRole}
        onLoginClick={() => setIsLoginModalOpen(true)}
        onSignUpClick={() => setIsSignUpModalOpen(true)}
        onDashboardClick={() => setView('dashboard')}
        onLogout={handleLogout}
      />
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        onToggleSignUp={() => {
          setIsLoginModalOpen(false);
          setIsSignUpModalOpen(true);
        }}
      />
      <SignUpModal 
        isOpen={isSignUpModalOpen}
        onClose={() => setIsSignUpModalOpen(false)}
        onSignUpSuccess={(owner) => handleLoginSuccess('owner', owner)}
      />
      <LiveToastHub />
    </>
  );
}
