import type { Metadata } from 'next';
import { FamilyBudgetsView } from '@/components/family/family-budgets-view';

export const metadata: Metadata = {
  title: 'Family Budgets | MoneyBag',
  description: 'Manage pooled family budget limits and category targets.',
};

export default function BudgetsPage() {
  return <FamilyBudgetsView />;
}
