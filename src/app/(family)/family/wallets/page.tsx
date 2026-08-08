import type { Metadata } from 'next';
import { FamilyWalletsView } from '@/components/family/family-wallets-view';
import { familyWalletsDemoData } from '@/lib/family-data';

export const metadata: Metadata = {
  title: 'Shared Wallets | MoneyBag',
  description: 'Manage family wallets, member access, and shared wallet activity.',
};

export default function WalletsPage() {
  return <FamilyWalletsView data={familyWalletsDemoData} />;
}
