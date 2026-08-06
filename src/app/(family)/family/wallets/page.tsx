import type { Metadata } from 'next';

import { FamilyWallets } from '@/components/family/family-wallets';
import { familyWalletsDemoData } from '@/lib/family-data';

export const metadata: Metadata = {
  title: 'Shared wallets',
  description: 'Manage family wallets, member access, and shared wallet activity.',
};

export default function Page() {
  return <FamilyWallets data={familyWalletsDemoData} />;
}
