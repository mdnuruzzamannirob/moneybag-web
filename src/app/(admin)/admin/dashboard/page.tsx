import type { Metadata } from 'next';
import { AdminDashboardView } from '@/components/admin/admin-dashboard-view';
import { adminDashboardDemoData } from '@/lib/dashboard-data';

export const metadata: Metadata = {
  title: 'Admin Dashboard | MoneyBag',
  description: 'Monitor MoneyBag growth, platform subscriptions, and system health.',
};

export default function Page() {
  return <AdminDashboardView data={adminDashboardDemoData} />;
}
