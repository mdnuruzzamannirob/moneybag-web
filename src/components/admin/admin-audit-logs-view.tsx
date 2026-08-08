'use client';

import { useState } from 'react';
import {
  AppBadge,
  AppCard,
  AppPageHeader,
  AppTable,
  type AppTableColumn,
  AppInput,
} from '@/components/app-ui';
import { History, Search } from 'lucide-react';
import type { AuditLogItem } from '@/types/admin';

const sampleLogs: AuditLogItem[] = [
  {
    id: 'log-101',
    actorId: 'usr-1',
    actorEmail: 'anika@moneybag.app',
    action: 'USER_ROLE_UPDATED',
    targetType: 'User',
    targetId: 'usr-2',
    timestamp: '28 Jul, 2026 14:32:05',
    ipAddress: '103.14.28.12',
  },
  {
    id: 'log-102',
    actorId: 'usr-1',
    actorEmail: 'anika@moneybag.app',
    action: 'COUPON_CREATED',
    targetType: 'Coupon',
    targetId: 'c-1',
    timestamp: '28 Jul, 2026 12:15:40',
    ipAddress: '103.14.28.12',
  },
  {
    id: 'log-103',
    actorId: 'usr-2',
    actorEmail: 'tanvir@example.com',
    action: 'PLAN_PRICE_CHANGED',
    targetType: 'Plan',
    targetId: 'pro_monthly',
    timestamp: '27 Jul, 2026 18:45:10',
    ipAddress: '103.22.44.81',
  },
];

export function AdminAuditLogsView() {
  const [logs] = useState<AuditLogItem[]>(sampleLogs);
  const [query, setQuery] = useState('');

  const filtered = logs.filter(
    (l) =>
      l.action.toLowerCase().includes(query.toLowerCase()) ||
      l.actorEmail.toLowerCase().includes(query.toLowerCase()) ||
      l.targetType.toLowerCase().includes(query.toLowerCase()),
  );

  const columns: readonly AppTableColumn<AuditLogItem>[] = [
    {
      key: 'action',
      header: 'Action',
      render: (row) => (
        <span className="font-mono font-semibold text-xs text-primary bg-primary/10 px-2 py-1 rounded-md">
          {row.action}
        </span>
      ),
    },
    {
      key: 'actorEmail',
      header: 'Actor email',
      render: (row) => <span className="font-medium text-foreground">{row.actorEmail}</span>,
    },
    {
      key: 'targetType',
      header: 'Target',
      render: (row) => (
        <span className="text-xs text-muted-foreground">
          {row.targetType} #{row.targetId}
        </span>
      ),
    },
    {
      key: 'ipAddress',
      header: 'IP Address',
      render: (row) => (
        <span className="text-xs font-mono text-muted-foreground">{row.ipAddress}</span>
      ),
    },
    {
      key: 'timestamp',
      header: 'Timestamp',
      render: (row) => <span className="text-muted-foreground">{row.timestamp}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <AppPageHeader
        title="Audit logs"
        description="Immutable audit trail of security events, administrative actions, and system modifications."
      />

      <AppCard padding="none">
        <div className="p-4 border-b border-border">
          <AppInput
            leading={<Search />}
            placeholder="Search by action, email, or target..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            containerClassName="w-full sm:w-80"
          />
        </div>

        <AppTable<AuditLogItem> columns={columns} rows={filtered} getRowKey={(r) => r.id} />
      </AppCard>
    </div>
  );
}
