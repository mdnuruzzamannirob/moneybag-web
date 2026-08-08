import type { Metadata } from 'next';
import { FamilyTransactionsView } from '@/components/family/family-transactions-view';

export const metadata: Metadata = {
  title: 'Family Transactions | MoneyBag',
  description: 'Track shared family transactions and member contributions.',
};

export default function TransactionsPage() {
  return <FamilyTransactionsView />;
}
