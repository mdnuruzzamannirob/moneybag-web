import { AdminDashboard } from '@/components/admin/admin-dashboard';
import { adminDashboardDemoData } from '@/lib/dashboard-data';

export default function AdminDashboardPage() {
  return <AdminDashboard data={adminDashboardDemoData} />;
}
