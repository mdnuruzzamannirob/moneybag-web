import type { Metadata } from 'next';
import { AdminContentView } from '@/components/admin/admin-content-view';

export const metadata: Metadata = {
  title: 'Blog CMS | MoneyBag Admin',
  description: 'Manage blog posts and educational content.',
};

export default function BlogPage() {
  return <AdminContentView defaultTab="blog" />;
}
