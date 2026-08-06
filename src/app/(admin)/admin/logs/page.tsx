import type { Metadata } from 'next';
import { AdminAuditLogsView } from '@/components/admin/admin-audit-logs-view';

export const metadata: Metadata = {
  title: 'System Logs | MoneyBag Admin',
  description: 'View administrative system logs and security event records.',
};

export default function LogsPage() {
  return <AdminAuditLogsView />;
}
