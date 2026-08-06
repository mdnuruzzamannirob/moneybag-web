import type { Metadata } from 'next';
import { AdminContentView } from '@/components/admin/admin-content-view';

export const metadata: Metadata = {
  title: 'FAQ Management | MoneyBag Admin',
  description: 'Manage platform FAQ questions and answers.',
};

export default function FaqPage() {
  return <AdminContentView defaultTab="faq" />;
}
