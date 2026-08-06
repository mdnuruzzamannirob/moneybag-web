import type { Metadata } from 'next';
import { MaintenanceView } from '@/components/maintenance/maintenance-view';

export const metadata: Metadata = {
  title: 'System Maintenance | MoneyBag',
  description: 'MoneyBag is currently undergoing scheduled maintenance.',
};

export default function MaintenancePage() {
  return <MaintenanceView />;
}
