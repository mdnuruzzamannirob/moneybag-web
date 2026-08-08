import { baseApi } from './base-api';

export interface BillingInvoice {
  id: string;
  amountInCents: number;
  currency: string;
  status: 'paid' | 'open' | 'void' | 'uncollectible';
  pdfUrl?: string;
  createdAt: string;
}

export const billingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getInvoices: builder.query<BillingInvoice[], void>({
      query: () => '/billing/invoices',
      providesTags: ['Billing'],
    }),
  }),
});

export const { useGetInvoicesQuery } = billingApi;
