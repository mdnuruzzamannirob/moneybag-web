import type { Metadata } from 'next';
import { AdminTicketsView } from '@/components/admin/admin-tickets-view';

export const metadata: Metadata = {
  title: 'Support Tickets | MoneyBag Admin',
  description: 'Manage user support tickets and assistance requests.',
};

export default function TicketsPage() {
  return <AdminTicketsView />;
}
