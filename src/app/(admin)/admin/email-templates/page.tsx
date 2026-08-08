import type { Metadata } from 'next';
import { AdminContentView } from '@/components/admin/admin-content-view';

export const metadata: Metadata = {
  title: 'Email Templates | MoneyBag Admin',
  description: 'Manage automated email notification templates.',
};

export default function EmailTemplatesPage() {
  return <AdminContentView defaultTab="templates" />;
}
