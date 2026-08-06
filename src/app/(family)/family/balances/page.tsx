import type { Metadata } from 'next';
import { FamilyBalancesView } from '@/components/family/family-balances-view';

export const metadata: Metadata = {
  title: 'Family Balances | MoneyBag',
  description: 'Track member balances and who owes whom after shared expenses.',
};

export default function BalancesPage() {
  return <FamilyBalancesView />;
}
