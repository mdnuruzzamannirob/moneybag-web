import { baseApi } from './base-api';
import type { Budget, CreateBudgetRequest } from '@/types/budget';

export const budgetsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBudgets: builder.query<Budget[], void>({
      query: () => '/budgets',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Budget' as const, id })),
              { type: 'Budget', id: 'LIST' },
            ]
          : [{ type: 'Budget', id: 'LIST' }],
    }),
    createBudget: builder.mutation<Budget, CreateBudgetRequest>({
      query: (body) => ({
        url: '/budgets',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Budget', id: 'LIST' }],
    }),
    deleteBudget: builder.mutation<void, string>({
      query: (id) => ({
        url: `/budgets/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Budget', id },
        { type: 'Budget', id: 'LIST' },
      ],
    }),
  }),
});

export const { useGetBudgetsQuery, useCreateBudgetMutation, useDeleteBudgetMutation } = budgetsApi;
