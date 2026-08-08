import type { Metadata } from 'next';
import { AdminAuditLogsView } from '@/components/admin/admin-audit-logs-view';

export const metadata: Metadata = {
  title: 'Audit Logs | MoneyBag Admin',
  description: 'View administrative audit logs and security event records.',
};

export default function AuditLogsPage() {
  return <AdminAuditLogsView />;
}
