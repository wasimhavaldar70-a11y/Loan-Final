-- ====================================================================
-- SuvarnaLoan ERP - Supabase Database Schema Configuration Script
-- ====================================================================
-- INSTRUCTIONS:
-- 1. Open your Supabase Dashboard (https://supabase.com).
-- 2. Select your project, and navigate to the "SQL Editor" in the left sidebar.
-- 3. Click "New Query", paste this entire script, and click "Run".
-- 4. Ensure Row Level Security (RLS) is disabled for this demonstration,
--    or set up appropriate access rules.
-- ====================================================================

-- 1. Shop Owners Table (linked to Supabase Auth.users)
create table if not exists public.shop_owners (
  id uuid primary key references auth.users(id) on delete cascade,
  owner_name text not null,
  shop_name text not null,
  email text not null unique,
  phone text not null,
  pin text not null, -- SHA-256 hashed PIN
  password text, -- secure hashed password backup
  plan text default 'Standard' check (plan in ('Standard', 'Premium Enterprise', 'Sovereign Pro')),
  status text default 'Active' check (status in ('Active', 'Suspended')),
  date_joined text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Customers Table
create table if not exists public.customers (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  phone text not null,
  kyc_status text default 'Pending' check (kyc_status in ('Verified', 'Pending', 'Rejected')),
  active_loans_count integer default 0,
  total_pledged_weight numeric default 0,
  total_loan_amount numeric default 0,
  avatar text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Gold Loans Table
create table if not exists public.gold_loans (
  id text primary key,
  customer_name text not null,
  customer_id uuid references public.customers(id) on delete cascade,
  amount numeric not null,
  interest_rate numeric not null,
  weight numeric not null,
  purity text check (purity in ('24K', '22K', '18K')),
  pledged_item text not null,
  due_date text not null,
  status text check (status in ('Active', 'Overdue', 'Closed')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Activities / System Logs Table
create table if not exists public.activities (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  amount numeric,
  time_ago text not null,
  type text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Enable replication or realtime events if needed (optional)
alter publication supabase_realtime add table public.customers;
alter publication supabase_realtime add table public.gold_loans;
alter publication supabase_realtime add table public.activities;
alter publication supabase_realtime add table public.shop_owners;
