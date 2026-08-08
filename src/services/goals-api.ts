import { baseApi } from './base-api';

export interface SavingsGoal {
  id: string;
  name: string;
  targetAmountInCents: number;
  currentAmountInCents: number;
  currency: string;
  targetDate: string;
  isCompleted: boolean;
}

export const goalsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getGoals: builder.query<SavingsGoal[], void>({
      query: () => '/goals',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Goal' as const, id })),
              { type: 'Goal', id: 'LIST' },
            ]
          : [{ type: 'Goal', id: 'LIST' }],
    }),
    createGoal: builder.mutation<SavingsGoal, Omit<SavingsGoal, 'id' | 'isCompleted'>>({
      query: (body) => ({
        url: '/goals',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Goal', id: 'LIST' }],
    }),
  }),
});

export const { useGetGoalsQuery, useCreateGoalMutation } = goalsApi;
