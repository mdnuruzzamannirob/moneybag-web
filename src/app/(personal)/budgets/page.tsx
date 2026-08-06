import type { Metadata } from 'next';
import { BudgetsPage } from '@/components/personal/finance-pages';

export const metadata: Metadata = {
  title: 'Budgets | MoneyBag',
  description: 'Set and track category spending limits.',
};

export default function Page() {
  return <BudgetsPage />;
}
