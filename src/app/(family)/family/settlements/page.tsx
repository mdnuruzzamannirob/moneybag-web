import type { Metadata } from 'next';
import { FamilySettlementsView } from '@/components/family/family-settlements-view';

export const metadata: Metadata = {
  title: 'Family Settlements | MoneyBag',
  description: 'View settlement history and clear member debts.',
};

export default function SettlementsPage() {
  return <FamilySettlementsView />;
}
