/**
 * Pure math calculations for loan valuation, LTV calculations, and interest accruals.
 */

export interface GoldRateMapping {
  '24K': number;
  '22K': number;
  '20K': number;
  '18K': number;
}

export const DEFAULT_GOLD_RATES: GoldRateMapping = {
  '24K': 7400,
  '22K': 6850,
  '20K': 6200,
  '18K': 5500
};

/**
 * Calculates total valuation of gold based on weight, purity, and market rate.
 */
export function calculateGoldValue(weight: number, purity: keyof GoldRateMapping, rates: GoldRateMapping = DEFAULT_GOLD_RATES): number {
  if (weight <= 0) return 0;
  const rate = rates[purity] || 0;
  return Math.round(weight * rate);
}

/**
 * Calculates max loan amount eligible based on value and LTV (Loan-to-Value) ratio.
 */
export function calculateEligibleLtvAmount(goldValue: number, ltvPercentage: number): number {
  if (goldValue <= 0 || ltvPercentage <= 0) return 0;
  return Math.round(goldValue * (ltvPercentage / 100));
}

/**
 * Calculates monthly interest amount.
 */
export function calculateMonthlyInterest(principal: number, monthlyRatePercentage: number): number {
  if (principal <= 0 || monthlyRatePercentage <= 0) return 0;
  return Math.round(principal * (monthlyRatePercentage / 100));
}

/**
 * Computes elapsed days since a given date string (e.g. '12 May 2024').
 */
export function parseDateString(dateStr: string): Date {
  // Gracefully try parsing common Indian format e.g. "20 May 2024" or standard ISO
  const parsed = Date.parse(dateStr);
  if (!isNaN(parsed)) return new Date(parsed);
  
  // Try custom regex fallback for "DD MMM YYYY"
  const match = dateStr.match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/);
  if (match) {
    const day = parseInt(match[1], 10);
    const monthStr = match[2].slice(0, 3).toLowerCase();
    const year = parseInt(match[3], 10);
    
    const months: Record<string, number> = {
      jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
      jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
    };
    
    if (monthStr in months) {
      return new Date(year, months[monthStr], day);
    }
  }
  return new Date();
}

/**
 * Calculates daily interest accrual.
 */
export function calculateDailyInterestAccrual(principal: number, monthlyRatePercentage: number, daysElapsed: number): number {
  if (principal <= 0 || monthlyRatePercentage <= 0 || daysElapsed <= 0) return 0;
  // Standard monthly base: 30 days
  const dailyRate = (monthlyRatePercentage / 100) / 30;
  return Math.round(principal * dailyRate * daysElapsed);
}

/**
 * Calculates overdue days.
 */
export function calculateDaysOverdue(dueDateStr: string, relativeToDate: Date = new Date()): number {
  const dueDate = parseDateString(dueDateStr);
  const diffTime = relativeToDate.getTime() - dueDate.getTime();
  if (diffTime <= 0) return 0;
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}
