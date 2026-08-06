import type { Metadata } from 'next';
import { SettingsPanel } from '@/components/personal/settings-panel';

export const metadata: Metadata = {
  title: 'Preferences | MoneyBag',
  description: 'Manage currency, date formats, and display preferences.',
};

export default function Page() {
  return <SettingsPanel section="preferences" />;
}
