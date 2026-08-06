import type { Metadata } from 'next';
import { AdminCouponsView } from '@/components/admin/admin-coupons-view';

export const metadata: Metadata = {
  title: 'Coupons & Promotions | MoneyBag Admin',
  description: 'Manage promo discount codes and redemption limits.',
};

export default function CouponsPage() {
  return <AdminCouponsView />;
}
