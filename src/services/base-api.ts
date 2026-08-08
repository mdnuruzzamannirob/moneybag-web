import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

import type { AppError } from '@/types/api';

export const TAG_TYPES = [
  'Auth',
  'Wallet',
  'Transaction',
  'Category',
  'Budget',
  'Goal',
  'Report',
  'FamilyGroup',
  'FamilyMember',
  'Settlement',
  'Billing',
  'User',
  'Subscription',
  'Plan',
  'Coupon',
  'AuditLog',
] as const;

export function normalizeError(error: unknown): AppError {
  if (!error || typeof error !== 'object') {
    return {
      message: 'An unexpected network error occurred.',
      status: 500,
    };
  }

  const errObj = error as Record<string, unknown>;

  // RTK Query FetchBaseQueryError
  if ('status' in errObj) {
    const status = typeof errObj.status === 'number' ? errObj.status : 500;
    const data = errObj.data as Record<string, unknown> | undefined;

    return {
      message:
        (typeof data?.message === 'string' && data.message) ||
        (typeof errObj.error === 'string' && errObj.error) ||
        `HTTP Request failed with status ${status}`,
      status,
      code: typeof data?.code === 'string' || typeof data?.code === 'number' ? data.code : status,
      details:
        typeof data?.details === 'object' && data.details
          ? (data.details as Record<string, unknown>)
          : undefined,
    };
  }

  // Standard JS Error
  if (error instanceof Error) {
    return {
      message: error.message,
      status: 500,
    };
  }

  return {
    message: String(errObj.message || 'An unknown error occurred.'),
    status: 500,
  };
}

const rawBaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as { auth?: { token?: string | null } };
    const token = state.auth?.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    headers.set('content-type', 'application/json');
    return headers;
  },
});

let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

function onRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    if (!isRefreshing) {
      isRefreshing = true;

      try {
        const refreshResult = await rawBaseQuery(
          { url: '/auth/refresh', method: 'POST' },
          api,
          extraOptions,
        );

        if (refreshResult.data) {
          const data = refreshResult.data as { token?: string };
          if (data.token) {
            api.dispatch({ type: 'auth/setCredentials', payload: { token: data.token } });
            onRefreshed(data.token);
            result = await rawBaseQuery(args, api, extraOptions);
          } else {
            api.dispatch({ type: 'auth/logout' });
          }
        } else {
          api.dispatch({ type: 'auth/logout' });
        }
      } finally {
        isRefreshing = false;
      }
    } else {
      await new Promise<string>((resolve) => {
        refreshSubscribers.push(resolve);
      });
      result = await rawBaseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: TAG_TYPES,
  endpoints: () => ({}),
});
