import type { Metadata } from 'next';
import { SettingsPanel } from '@/components/personal/settings-panel';

export const metadata: Metadata = {
  title: 'Profile Settings | MoneyBag',
  description: 'Manage your profile information.',
};

export default function Page() {
  return <SettingsPanel section="profile" />;
}
