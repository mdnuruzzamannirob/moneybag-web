import { baseApi } from './base-api';
import type { SystemPlan } from '@/types/admin';

export const plansApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPlans: builder.query<SystemPlan[], void>({
      query: () => '/admin/plans',
      providesTags: ['Plan'],
    }),
    updatePlan: builder.mutation<SystemPlan, Partial<SystemPlan> & { id: string }>({
      query: ({ id, ...body }) => ({
        url: `/admin/plans/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Plan'],
    }),
  }),
});

export const { useGetPlansQuery, useUpdatePlanMutation } = plansApi;
