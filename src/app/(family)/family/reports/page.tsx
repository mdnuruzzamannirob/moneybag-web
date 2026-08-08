import type { Metadata } from 'next';
import { FamilyReportsView } from '@/components/family/family-reports-view';

export const metadata: Metadata = {
  title: 'Family Reports | MoneyBag',
  description: 'View family spending reports and category analytics.',
};

export default function ReportsPage() {
  return <FamilyReportsView />;
}
