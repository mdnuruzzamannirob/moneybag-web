import { baseApi } from './base-api';
import type { AuditLogItem } from '@/types/admin';
import type { PaginatedResponse, PaginationParams } from '@/types/api';

export const auditLogsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAuditLogs: builder.query<PaginatedResponse<AuditLogItem>, PaginationParams | void>({
      query: (params) => ({
        url: '/admin/audit-logs',
        params: params || {},
      }),
      providesTags: ['AuditLog'],
    }),
  }),
});

export const { useGetAuditLogsQuery } = auditLogsApi;
