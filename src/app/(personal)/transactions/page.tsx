import type { Metadata } from 'next';
import { TransactionsPage } from '@/components/personal/finance-pages';

export const metadata: Metadata = {
  title: 'Transactions | MoneyBag',
  description: 'Review and manage your income and expenses.',
};

export default function Page() {
  return <TransactionsPage />;
}
