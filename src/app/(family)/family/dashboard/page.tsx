import { FamilyDashboard } from '@/components/family/family-dashboard';
import { familyDashboardDemoData } from '@/lib/dashboard-data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Family dashboard',
  description: 'Track shared balances, budgets, contributions, and family activity.',
};

export default function Page() {
  return <FamilyDashboard data={familyDashboardDemoData} />;
}
