import type { Metadata } from 'next';
import { AdminSystemHealthView } from '@/components/admin/admin-system-health-view';

export const metadata: Metadata = {
  title: 'System Health | MoneyBag Admin',
  description: 'Monitor platform health metrics, DB latency, and infrastructure status.',
};

export default function SystemHealthPage() {
  return <AdminSystemHealthView />;
}
