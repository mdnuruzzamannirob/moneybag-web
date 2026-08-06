import type { Metadata } from 'next';
import { FamilySettingsView } from '@/components/family/family-settings-view';

export const metadata: Metadata = {
  title: 'Family Settings | MoneyBag',
  description: 'Manage family group settings, currency, and group permissions.',
};

export default function SettingsPage() {
  return <FamilySettingsView />;
}
