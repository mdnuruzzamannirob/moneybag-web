import type { Metadata } from 'next';
import { FamilyMembersView } from '@/components/family/family-members-view';

export const metadata: Metadata = {
  title: 'Family Members | MoneyBag',
  description: 'Manage family members, roles, invitations, and permissions.',
};

export default function MembersPage() {
  return <FamilyMembersView />;
}
