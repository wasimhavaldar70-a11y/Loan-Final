import { useState, useEffect } from 'react';
import { getSupabase, isSupabaseConfigured } from '../lib/supabase';
import { ShopOwner } from '../components/LoginModal';

export function useDashboardData(currentOwner: ShopOwner | null) {
  const [loans, setLoans] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [pledgedItems, setPledgedItems] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [dbStatus, setDbStatus] = useState<'connected' | 'connecting' | 'error' | 'unconfigured'>('unconfigured');
  const [usingDemo, setUsingDemo] = useState<boolean>(true);

  // Settings state
  const [settings, setSettings] = useState(() => {
    return {
      shopName: currentOwner?.shopName || 'Suvarna Gold Loan & Jewellery Co.',
      defaultInterestRate: '1.2',
      maxLtvRatio: '85',
      gracePeriodDays: '7',
      autoSmsAlerts: true,
      secureBackup: true
    };
  });

  // Keep shopName in sync if owner changes
  useEffect(() => {
    if (currentOwner) {
      setSettings(prev => ({
        ...prev,
        shopName: currentOwner.shopName
      }));
    }
  }, [currentOwner]);

  // Sync state back from localStorage for local testing
  useEffect(() => {
    const savedLoans = localStorage.getItem('suvarna_loans');
    if (savedLoans) {
      setLoans(JSON.parse(savedLoans));
    }
    const savedCustomers = localStorage.getItem('suvarna_customers');
    if (savedCustomers) {
      setCustomers(JSON.parse(savedCustomers));
    }
    const savedPayments = localStorage.getItem('suvarna_payments');
    if (savedPayments) {
      setPayments(JSON.parse(savedPayments));
    }
    const savedPledged = localStorage.getItem('suvarna_pledged');
    if (savedPledged) {
      setPledgedItems(JSON.parse(savedPledged));
    }
    const savedEmployees = localStorage.getItem('suvarna_employees');
    if (savedEmployees) {
      setEmployees(JSON.parse(savedEmployees));
    }
  }, []);

  // Fetch real data from Supabase if configured
  useEffect(() => {
    async function loadSupabaseData() {
      if (isSupabaseConfigured) {
        setDbStatus('connecting');
        const supabase = getSupabase();
        if (supabase) {
          try {
            const { data: customerData, error: custError } = await supabase
              .from('customers')
              .select('*')
              .limit(1);

            if (custError) {
              console.warn("Supabase connection warning:", custError);
              setDbStatus('error');
              setUsingDemo(true);
            } else {
              setDbStatus('connected');
              setUsingDemo(false);

              // 1. Fetch Loans
              const { data: dbLoans } = await supabase
                .from('gold_loans')
                .select('*')
                .order('created_at', { ascending: false });

              if (dbLoans && dbLoans.length > 0) {
                setLoans(dbLoans.map((l: any) => ({
                  id: l.id,
                  customerName: l.customer_name,
                  amount: Number(l.amount),
                  weight: Number(l.weight),
                  purity: l.purity,
                  pledgedItem: l.pledged_item,
                  loanDate: l.created_at ? new Date(l.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Today',
                  dueDate: l.due_date,
                  status: l.status
                })));
              }

              // 2. Fetch Customers
              const { data: dbCustomers } = await supabase
                .from('customers')
                .select('*')
                .order('created_at', { ascending: false });

              if (dbCustomers && dbCustomers.length > 0) {
                setCustomers(dbCustomers.map((c: any) => ({
                  id: c.id,
                  name: c.name,
                  phone: c.phone,
                  kycStatus: c.kyc_status,
                  activeLoansCount: c.active_loans_count,
                  totalPledgedWeight: c.total_pledged_weight,
                  totalLoanAmount: c.total_loan_amount,
                  avatar: c.avatar
                })));
              }
            }
          } catch (e) {
            console.error("Supabase load failed:", e);
            setDbStatus('error');
            setUsingDemo(true);
          }
        }
      } else {
        setDbStatus('unconfigured');
        setUsingDemo(true);
      }
    }
    loadSupabaseData();
  }, []);

  return {
    loans,
    setLoans,
    activities,
    setActivities,
    customers,
    setCustomers,
    payments,
    setPayments,
    pledgedItems,
    setPledgedItems,
    employees,
    setEmployees,
    notifications,
    setNotifications,
    settings,
    setSettings,
    dbStatus,
    setDbStatus,
    usingDemo,
    setUsingDemo
  };
}
