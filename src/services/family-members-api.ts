import { baseApi } from './base-api';
import type { FamilyMemberSummary } from '@/types/family';

export const familyMembersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFamilyMembers: builder.query<FamilyMemberSummary[], string>({
      query: (groupId) => `/family/groups/${groupId}/members`,
      providesTags: ['FamilyMember'],
    }),
    inviteFamilyMember: builder.mutation<
      void,
      { groupId: string; email: string; role: 'editor' | 'viewer' }
    >({
      query: ({ groupId, ...body }) => ({
        url: `/family/groups/${groupId}/members/invite`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['FamilyMember'],
    }),
  }),
});

export const { useGetFamilyMembersQuery, useInviteFamilyMemberMutation } = familyMembersApi;
