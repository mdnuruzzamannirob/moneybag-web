import type { Metadata } from 'next';
import { SettingsPanel } from '@/components/personal/settings-panel';

export const metadata: Metadata = {
  title: 'Settings | MoneyBag',
  description: 'Manage your profile and account preferences.',
};

export default function Page() {
  return <SettingsPanel section="profile" />;
}
