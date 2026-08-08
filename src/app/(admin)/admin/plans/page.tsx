import type { Metadata } from 'next';
import { AdminPlansView } from '@/components/admin/admin-plans-view';

export const metadata: Metadata = {
  title: 'Subscription Plans | MoneyBag Admin',
  description: 'Manage plan pricing tiers, billing cycles, and features.',
};

export default function PlansPage() {
  return <AdminPlansView />;
}
