import type { Metadata } from 'next';
import { CategoriesPage } from '@/components/personal/finance-pages';

export const metadata: Metadata = {
  title: 'Categories | MoneyBag',
  description: 'Manage spending and income categories.',
};

export default function Page() {
  return <CategoriesPage />;
}
