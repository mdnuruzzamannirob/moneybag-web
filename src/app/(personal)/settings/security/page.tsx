import type { Metadata } from 'next';
import { SettingsPanel } from '@/components/personal/settings-panel';

export const metadata: Metadata = {
  title: 'Security Settings | MoneyBag',
  description: 'Manage password, 2FA, and active sessions.',
};

export default function Page() {
  return <SettingsPanel section="security" />;
}
