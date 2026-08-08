import { baseApi } from './base-api';
import type { DateRangeParams } from '@/types/api';

export interface FinancialSummaryReport {
  totalIncomeInCents: number;
  totalExpenseInCents: number;
  netSavingsInCents: number;
  currency: string;
  categoryBreakdown: Array<{ categoryName: string; amountInCents: number }>;
}

export const reportsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFinancialSummary: builder.query<FinancialSummaryReport, DateRangeParams | void>({
      query: (params) => ({
        url: '/reports/summary',
        params: params || {},
      }),
      providesTags: ['Report'],
    }),
  }),
});

export const { useGetFinancialSummaryQuery } = reportsApi;
