import { Customer, GoldLoan } from './types';

export const INITIAL_CUSTOMERS: Customer[] = [];

export const INITIAL_LOANS: GoldLoan[] = [];


export const GOLD_RATES = {
  "24K": 7450, // per gram (realistic 2026 INR gold rate)
  "22K": 6830,
  "18K": 5585,
};

export const FAQ_ITEMS = [
  {
    question: "How does the automatic interest calculation work?",
    answer: "SuvarnaLoan ERP automatically calculates monthly simple or compound interest based on custom schemes (fixed, slab-based, or penalty-enhanced). It runs daily cron jobs to flag overdue loans and auto-generates payment reminders."
  },
  {
    question: "Is our jewellery shop data safe and private?",
    answer: "Absolutely. We use end-to-end industry-grade encryption, ISO 27001 compliant cloud databases, and hourly automated encrypted backups. You can also enforce role-based access control (RBAC) so employees can only see required features."
  },
  {
    question: "Can we manage multiple branches from a single account?",
    answer: "Yes! SuvarnaLoan ERP supports multi-branch management. You can track cash flows, gold inventory, vaults, and ledger audits across all branches in real-time from a centralized dashboard."
  },
  {
    question: "What hardware is required for the system?",
    answer: "Our cloud-native platform runs on any device (Desktop, Tablet, or Mobile) via modern web browsers. We also support direct integration with digital weighing scales and thermal bill printers."
  }
];
