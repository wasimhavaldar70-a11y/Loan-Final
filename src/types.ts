export interface Customer {
  id: string;
  name: string;
  phone: string;
  kycStatus: 'Verified' | 'Pending' | 'Rejected';
  activeLoansCount: number;
  totalPledgedWeight: number; // in grams
  totalLoanAmount: number;
  avatar: string;
}

export interface GoldLoan {
  id: string;
  customerName: string;
  customerId: string;
  amount: number;
  interestRate: number; // monthly %
  weight: number; // grams
  purity: '24K' | '22K' | '18K';
  pledgedItem: string;
  dueDate: string;
  status: 'Active' | 'Overdue' | 'Closed';
}

export interface DemoBooking {
  name: string;
  phone: string;
  email: string;
  shopName: string;
  date: string;
  time: string;
}

export interface DBCustomer {
  id: string;
  name: string;
  phone: string;
  kyc_status: 'Verified' | 'Pending' | 'Rejected';
  active_loans_count: number;
  total_pledged_weight: number;
  total_loan_amount: number;
  avatar: string | null;
  created_at?: string;
}

export interface DBGoldLoan {
  id: string;
  customer_name: string;
  customer_id: string;
  amount: number;
  interest_rate: number;
  weight: number;
  purity: '24K' | '22K' | '18K';
  pledged_item: string;
  due_date: string;
  status: 'Active' | 'Overdue' | 'Closed';
  created_at?: string;
}

export interface DBActivity {
  id: string;
  title: string;
  amount: number | null;
  time_ago: string;
  type: string;
  created_at?: string;
}

export interface DBShopOwner {
  id: string;
  owner_name: string;
  shop_name: string;
  email: string;
  phone: string;
  pin: string;
  password?: string;
  plan: 'Standard' | 'Premium Enterprise' | 'Sovereign Pro';
  status: 'Active' | 'Suspended';
  date_joined: string;
  created_at?: string;
}

export interface Database {
  public: {
    Tables: {
      customers: {
        Row: DBCustomer;
        Insert: Omit<DBCustomer, 'id' | 'created_at'> & { id?: string };
        Update: Partial<DBCustomer>;
      };
      gold_loans: {
        Row: DBGoldLoan;
        Insert: DBGoldLoan;
        Update: Partial<DBGoldLoan>;
      };
      activities: {
        Row: DBActivity;
        Insert: Omit<DBActivity, 'id' | 'created_at'> & { id?: string };
        Update: Partial<DBActivity>;
      };
      shop_owners: {
        Row: DBShopOwner;
        Insert: DBShopOwner;
        Update: Partial<DBShopOwner>;
      };
    };
  };
}
