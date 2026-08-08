import { baseApi } from './base-api';
import type {
  Transaction,
  RecurringTransaction,
  CreateTransactionRequest,
  UpdateTransactionRequest,
} from '@/types/transaction';
import type { PaginatedResponse, PaginationParams, DateRangeParams } from '@/types/api';

export type TransactionFilterParams = PaginationParams &
  DateRangeParams & {
    walletId?: string;
    type?: string;
    categoryId?: string;
  };

export const transactionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTransactions: builder.query<PaginatedResponse<Transaction>, TransactionFilterParams | void>({
      query: (params) => ({
        url: '/transactions',
        params: params || {},
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ id }) => ({ type: 'Transaction' as const, id })),
              { type: 'Transaction', id: 'LIST' },
            ]
          : [{ type: 'Transaction', id: 'LIST' }],
    }),
    getTransactionById: builder.query<Transaction, string>({
      query: (id) => `/transactions/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Transaction', id }],
    }),
    createTransaction: builder.mutation<Transaction, CreateTransactionRequest>({
      query: (body) => ({
        url: '/transactions',
        method: 'POST',
        body,
      }),
      invalidatesTags: [
        { type: 'Transaction', id: 'LIST' },
        { type: 'Wallet', id: 'LIST' },
      ],
    }),
    updateTransaction: builder.mutation<Transaction, UpdateTransactionRequest>({
      query: ({ id, ...body }) => ({
        url: `/transactions/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Transaction', id },
        { type: 'Transaction', id: 'LIST' },
        { type: 'Wallet', id: 'LIST' },
      ],
    }),
    deleteTransaction: builder.mutation<void, string>({
      query: (id) => ({
        url: `/transactions/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Transaction', id },
        { type: 'Transaction', id: 'LIST' },
        { type: 'Wallet', id: 'LIST' },
      ],
    }),
    // Recurring transactions capability merged here as specified by conventions
    getRecurringTransactions: builder.query<RecurringTransaction[], void>({
      query: () => '/transactions/recurring',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Transaction' as const, id: `RECURRING_${id}` })),
              { type: 'Transaction', id: 'RECURRING_LIST' },
            ]
          : [{ type: 'Transaction', id: 'RECURRING_LIST' }],
    }),
    createRecurringTransaction: builder.mutation<
      RecurringTransaction,
      Partial<RecurringTransaction>
    >({
      query: (body) => ({
        url: '/transactions/recurring',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Transaction', id: 'RECURRING_LIST' }],
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useGetTransactionByIdQuery,
  useCreateTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
  useGetRecurringTransactionsQuery,
  useCreateRecurringTransactionMutation,
} = transactionsApi;
