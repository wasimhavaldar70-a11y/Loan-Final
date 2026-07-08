import { describe, it, expect } from 'vitest';
import { 
  calculateGoldValue, 
  calculateEligibleLtvAmount, 
  calculateMonthlyInterest, 
  calculateDailyInterestAccrual,
  calculateDaysOverdue,
  parseDateString
} from './calculations';

describe('Gold Valuation & Interest Calculations', () => {
  
  it('should calculate gold market valuation accurately based on weight and purity', () => {
    // 10 grams of 22K (rate 6850) = 68500
    const valuation = calculateGoldValue(10, '22K');
    expect(valuation).toBe(68500);

    // 0 grams of gold = 0
    expect(calculateGoldValue(0, '24K')).toBe(0);
  });

  it('should calculate max sanctionable loan amount based on LTV ratio limit', () => {
    // Valuation of 100,000 at 80% LTV = 80,000
    const eligibleAmount = calculateEligibleLtvAmount(100000, 80);
    expect(eligibleAmount).toBe(80000);
  });

  it('should calculate simple monthly interest correctly', () => {
    // Principal 1,00,000 at 1.2% = 1200
    const interest = calculateMonthlyInterest(100000, 1.2);
    expect(interest).toBe(1200);
  });

  it('should compute parsed date fields gracefully', () => {
    const parsed = parseDateString('20 May 2026');
    expect(parsed.getDate()).toBe(20);
    expect(parsed.getMonth()).toBe(4); // May is 4 (0-indexed)
    expect(parsed.getFullYear()).toBe(2026);
  });

  it('should calculate daily accrued interest accurately for partial cycles', () => {
    // Principal 1,00,000 at 1.2% monthly, for 15 days = 600
    const dailyInterest = calculateDailyInterestAccrual(100000, 1.2, 15);
    expect(dailyInterest).toBe(600);
  });

  it('should compute overdue days relative to due date correctly', () => {
    const dueDate = '15 May 2026';
    const relativeDate = new Date(2026, 4, 25); // 25 May 2026
    const overdueDays = calculateDaysOverdue(dueDate, relativeDate);
    expect(overdueDays).toBe(10);
  });

});
