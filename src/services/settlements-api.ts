import { baseApi } from './base-api';

export interface Settlement {
  id: string;
  groupId: string;
  fromUserId: string;
  fromUserName: string;
  toUserId: string;
  toUserName: string;
  amountInCents: number;
  currency: string;
  isSettled: boolean;
  settledAt?: string;
  createdAt: string;
}

export const settlementsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSettlements: builder.query<Settlement[], string>({
      query: (groupId) => `/family/groups/${groupId}/settlements`,
      providesTags: ['Settlement'],
    }),
    markSettled: builder.mutation<void, { settlementId: string }>({
      query: ({ settlementId }) => ({
        url: `/family/settlements/${settlementId}/settle`,
        method: 'POST',
      }),
      invalidatesTags: ['Settlement'],
    }),
  }),
});

export const { useGetSettlementsQuery, useMarkSettledMutation } = settlementsApi;
