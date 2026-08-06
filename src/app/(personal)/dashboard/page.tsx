import { UserDashboard } from '@/components/user/user-dashboard';
import { userDashboardDemoData } from '@/lib/dashboard-data';

export default function DashboardPage() {
  return <UserDashboard data={userDashboardDemoData} />;
}
