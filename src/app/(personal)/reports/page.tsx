import type { Metadata } from 'next';
import { ReportsPage } from '@/components/personal/reports-page';

export const metadata: Metadata = {
  title: 'Reports | MoneyBag',
  description: 'Financial reporting and monthly breakdowns.',
};

export default function Page() {
  return <ReportsPage />;
}
