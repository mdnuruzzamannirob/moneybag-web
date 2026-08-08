export type BudgetPeriod = 'monthly' | 'yearly' | 'custom';

export interface Budget {
  id: string;
  name: string;
  categoryId: string;
  categoryName?: string;
  amountInCents: number;
  spentInCents: number;
  currency: string;
  period: BudgetPeriod;
  startDate: string;
  endDate: string;
  alertThresholdPercent?: number;
  isExceeded: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBudgetRequest {
  name: string;
  categoryId: string;
  amountInCents: number;
  currency: string;
  period: BudgetPeriod;
  startDate: string;
  endDate?: string;
  alertThresholdPercent?: number;
}
