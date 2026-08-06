'use client';

import { useState } from 'react';
import {
  AppBadge,
  AppButton,
  AppCard,
  AppPageHeader,
  AppTable,
  type AppTableColumn,
  AppSegmentedControl,
} from '@/components/app-ui';
import type { SystemSubscription } from '@/types/admin';

const sampleSubscriptions: SystemSubscription[] = [
  {
    id: 'sub-1',
    userId: 'usr-1',
    userName: 'Anika Tahsin',
    planId: 'plan-pro',
    planName: 'Pro Monthly',
    status: 'active',
    currentPeriodStart: '12 Jul, 2026',
    currentPeriodEnd: '12 Aug, 2026',
    cancelAtPeriodEnd: false,
  },
  {
    id: 'sub-2',
    userId: 'usr-2',
    userName: 'Tanvir Rahman',
    planId: 'plan-family',
    planName: 'Family Yearly',
    status: 'active',
    currentPeriodStart: '01 Jan, 2026',
    currentPeriodEnd: '01 Jan, 2027',
    cancelAtPeriodEnd: false,
  },
  {
    id: 'sub-3',
    userId: 'usr-3',
    userName: 'Sadia Islam',
    planId: 'plan-pro',
    planName: 'Pro Monthly',
    status: 'trialing',
    currentPeriodStart: '20 Jul, 2026',
    currentPeriodEnd: '03 Aug, 2026',
    cancelAtPeriodEnd: true,
  },
];

export function AdminSubscriptionsView() {
  const [filter, setFilter] = useState('all');
  const filtered = sampleSubscriptions.filter((s) => filter === 'all' || s.status === filter);

  const columns: readonly AppTableColumn<SystemSubscription>[] = [
    {
      key: 'userName',
      header: 'Subscriber',
      render: (row) => <span className="font-semibold text-foreground">{row.userName}</span>,
    },
    {
      key: 'planName',
      header: 'Plan',
      render: (row) => <AppBadge status="info">{row.planName}</AppBadge>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => (
        <AppBadge
          status={
            row.status === 'active' ? 'success' : row.status === 'trialing' ? 'warning' : 'danger'
          }
        >
          {row.status}
        </AppBadge>
      ),
    },
    {
      key: 'currentPeriodEnd',
      header: 'Renewal date',
      render: (row) => <span className="text-muted-foreground">{row.currentPeriodEnd}</span>,
    },
    {
      key: 'cancelAtPeriodEnd',
      header: 'Auto renew',
      render: (row) => (
        <span className="text-xs font-medium text-muted-foreground">
          {row.cancelAtPeriodEnd ? 'Cancels at end' : 'Renews automatically'}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <AppPageHeader
        title="Subscription management"
        description="Monitor active user subscriptions, recurring revenue billing, and trial accounts."
      />

      <AppCard padding="none">
        <div className="border-b border-border p-4">
          <AppSegmentedControl
            onValueChange={(val) => val && setFilter(val)}
            options={[
              { label: 'All status', value: 'all' },
              { label: 'Active', value: 'active' },
              { label: 'Trialing', value: 'trialing' },
              { label: 'Canceled', value: 'canceled' },
            ]}
            value={filter}
          />
        </div>

        <AppTable<SystemSubscription> columns={columns} rows={filtered} getRowKey={(r) => r.id} />
      </AppCard>
    </div>
  );
}
