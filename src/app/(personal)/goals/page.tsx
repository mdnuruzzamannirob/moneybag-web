import type { Metadata } from 'next';
import { GoalsPage } from '@/components/personal/finance-pages';

export const metadata: Metadata = {
  title: 'Savings Goals | MoneyBag',
  description: 'Track progress towards your savings milestones.',
};

export default function Page() {
  return <GoalsPage />;
}
