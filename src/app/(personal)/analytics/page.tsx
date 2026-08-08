import type { Metadata } from 'next';
import { AnalyticsPage } from '@/components/personal/analytics-page';

export const metadata: Metadata = {
  title: 'Analytics | MoneyBag',
  description: 'Detailed cash flow and spending analytics.',
};

export default function Page() {
  return <AnalyticsPage />;
}
