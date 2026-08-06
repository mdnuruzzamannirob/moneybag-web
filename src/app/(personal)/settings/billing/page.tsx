import type { Metadata } from 'next';
import { SettingsPanel } from '@/components/personal/settings-panel';

export const metadata: Metadata = {
  title: 'Billing Settings | MoneyBag',
  description: 'Manage subscription plan and payment methods.',
};

export default function Page() {
  return <SettingsPanel section="billing" />;
}
