import type { Metadata } from 'next';
import { AdminReportsView } from '@/components/admin/admin-reports-view';

export const metadata: Metadata = {
  title: 'Platform Reports | MoneyBag Admin',
  description: 'View platform growth, MRR analytics, and subscriber charts.',
};

export default function ReportsPage() {
  return <AdminReportsView />;
}
