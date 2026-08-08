import type { Metadata } from 'next';
import { SettingsPanel } from '@/components/personal/settings-panel';

export const metadata: Metadata = {
  title: 'Notification Settings | MoneyBag',
  description: 'Manage budget warnings and spending alerts.',
};

export default function Page() {
  return <SettingsPanel section="notifications" />;
}
