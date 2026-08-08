import type { Metadata } from 'next';
import { UserDashboardView } from '@/components/personal/user-dashboard-view';
import { userDashboardDemoData } from '@/lib/dashboard-data';

export const metadata: Metadata = {
  title: 'Dashboard | MoneyBag',
  description: 'Your Personal Financial Dashboard overview.',
};

export default function DashboardPage() {
  return <UserDashboardView data={userDashboardDemoData} />;
}
