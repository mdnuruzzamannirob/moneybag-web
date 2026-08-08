import { baseApi } from './base-api';
import type { SystemSubscription } from '@/types/admin';
import type { PaginatedResponse, PaginationParams } from '@/types/api';

export const subscriptionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubscriptions: builder.query<PaginatedResponse<SystemSubscription>, PaginationParams | void>(
      {
        query: (params) => ({
          url: '/admin/subscriptions',
          params: params || {},
        }),
        providesTags: ['Subscription'],
      },
    ),
  }),
});

export const { useGetSubscriptionsQuery } = subscriptionsApi;
