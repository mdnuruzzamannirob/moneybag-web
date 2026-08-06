import { ReportsPage } from '@/components/user/reports-page';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reports',
  description: 'Review and export monthly, yearly, category, and daily finance reports.',
};

export default function Page() {
  return <ReportsPage />;
}
