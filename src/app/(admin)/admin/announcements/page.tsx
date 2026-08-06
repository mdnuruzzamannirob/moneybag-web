import type { Metadata } from 'next';
import { AdminContentView } from '@/components/admin/admin-content-view';

export const metadata: Metadata = {
  title: 'Announcements | MoneyBag Admin',
  description: 'Manage platform announcements and notifications.',
};

export default function AnnouncementsPage() {
  return <AdminContentView defaultTab="announcements" />;
}
