import type { Metadata } from 'next';
import { FamilyDashboardView } from '@/components/family/family-dashboard-view';
import { familyDashboardDemoData } from '@/lib/dashboard-data';

export const metadata: Metadata = {
  title: 'Family Dashboard | MoneyBag',
  description: 'Track shared family balances, budgets, contributions, and activity.',
};

export default function FamilyPage() {
  return <FamilyDashboardView data={familyDashboardDemoData} />;
}
