import type { Metadata } from 'next';
import { AdminUsersView } from '@/components/admin/admin-users-view';

export const metadata: Metadata = {
  title: 'User Management | MoneyBag Admin',
  description: 'View accounts, manage access roles, suspensions, and impersonate users.',
};

export default function UsersPage() {
  return <AdminUsersView />;
}
