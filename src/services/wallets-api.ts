import { baseApi } from './base-api';
import type { Wallet, CreateWalletRequest, UpdateWalletRequest } from '@/types/wallet';

export const walletsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWallets: builder.query<Wallet[], void>({
      query: () => '/wallets',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Wallet' as const, id })),
              { type: 'Wallet', id: 'LIST' },
            ]
          : [{ type: 'Wallet', id: 'LIST' }],
    }),
    getWalletById: builder.query<Wallet, string>({
      query: (id) => `/wallets/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Wallet', id }],
    }),
    createWallet: builder.mutation<Wallet, CreateWalletRequest>({
      query: (body) => ({
        url: '/wallets',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Wallet', id: 'LIST' }],
    }),
    updateWallet: builder.mutation<Wallet, UpdateWalletRequest>({
      query: ({ id, ...body }) => ({
        url: `/wallets/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Wallet', id },
        { type: 'Wallet', id: 'LIST' },
      ],
    }),
    deleteWallet: builder.mutation<void, string>({
      query: (id) => ({
        url: `/wallets/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Wallet', id },
        { type: 'Wallet', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetWalletsQuery,
  useGetWalletByIdQuery,
  useCreateWalletMutation,
  useUpdateWalletMutation,
  useDeleteWalletMutation,
} = walletsApi;
