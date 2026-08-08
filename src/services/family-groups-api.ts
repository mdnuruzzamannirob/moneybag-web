import { baseApi } from './base-api';

export interface FamilyGroup {
  id: string;
  name: string;
  currency: string;
  memberCount: number;
  createdAt: string;
}

export const familyGroupsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFamilyGroups: builder.query<FamilyGroup[], void>({
      query: () => '/family/groups',
      providesTags: ['FamilyGroup'],
    }),
    createFamilyGroup: builder.mutation<FamilyGroup, { name: string; currency?: string }>({
      query: (body) => ({
        url: '/family/groups',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['FamilyGroup'],
    }),
  }),
});

export const { useGetFamilyGroupsQuery, useCreateFamilyGroupMutation } = familyGroupsApi;
