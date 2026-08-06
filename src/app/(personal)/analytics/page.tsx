import { AnalyticsPage } from '@/components/user/analytics-page';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Analytics',
  description: 'Explore income, expenses, spending patterns, and savings performance.',
};

export default function Page() {
  return <AnalyticsPage />;
}
