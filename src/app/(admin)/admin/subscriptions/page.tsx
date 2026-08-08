import type { Metadata } from 'next';
import { AdminSubscriptionsView } from '@/components/admin/admin-subscriptions-view';

export const metadata: Metadata = {
  title: 'Subscriptions | MoneyBag Admin',
  description: 'Manage active subscriber billing, renewals, and plan memberships.',
};

export default function SubscriptionsPage() {
  return <AdminSubscriptionsView />;
}
