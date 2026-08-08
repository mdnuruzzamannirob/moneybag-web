import type { Metadata } from 'next';
import { SettingsPanel } from '@/components/personal/settings-panel';

export const metadata: Metadata = {
  title: 'Privacy & Data | MoneyBag',
  description: 'Manage data exports and account deletion.',
};

export default function Page() {
  return <SettingsPanel section="privacy" />;
}
