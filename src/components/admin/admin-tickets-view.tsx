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
import { Eye, Ticket } from 'lucide-react';

type TicketRecord = {
  id: string;
  subject: string;
  userName: string;
  userEmail: string;
  priority: 'high' | 'medium' | 'low';
  status: 'open' | 'in_progress' | 'resolved';
  createdAt: string;
};

const sampleTickets: TicketRecord[] = [
  {
    id: 'TCK-201',
    subject: 'Cannot export CSV report for July 2026',
    userName: 'Tanvir Rahman',
    userEmail: 'tanvir@example.com',
    priority: 'high',
    status: 'open',
    createdAt: '2 hours ago',
  },
  {
    id: 'TCK-202',
    subject: 'Question regarding Pro Family invitation link',
    userName: 'Sadia Islam',
    userEmail: 'sadia@example.com',
    priority: 'medium',
    status: 'in_progress',
    createdAt: '5 hours ago',
  },
  {
    id: 'TCK-203',
    subject: 'Billing inquiry about yearly plan renewal',
    userName: 'Mahmudul Hassan',
    userEmail: 'mahmud@example.com',
    priority: 'low',
    status: 'resolved',
    createdAt: '1 day ago',
  },
];

export function AdminTicketsView() {
  const [filter, setFilter] = useState('all');
  const filtered = sampleTickets.filter((t) => filter === 'all' || t.status === filter);

  const columns: readonly AppTableColumn<TicketRecord>[] = [
    {
      key: 'subject',
      header: 'Subject',
      render: (row) => (
        <div>
          <p className="font-semibold text-foreground">{row.subject}</p>
          <p className="text-xs text-muted-foreground">Ticket #{row.id}</p>
        </div>
      ),
    },
    {
      key: 'userName',
      header: 'Requester',
      render: (row) => (
        <div>
          <p className="font-medium text-foreground">{row.userName}</p>
          <p className="text-xs text-muted-foreground">{row.userEmail}</p>
        </div>
      ),
    },
    {
      key: 'priority',
      header: 'Priority',
      render: (row) => (
        <AppBadge
          status={
            row.priority === 'high' ? 'danger' : row.priority === 'medium' ? 'warning' : 'neutral'
          }
        >
          {row.priority}
        </AppBadge>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => (
        <AppBadge
          status={
            row.status === 'resolved'
              ? 'success'
              : row.status === 'in_progress'
                ? 'warning'
                : 'danger'
          }
        >
          {row.status}
        </AppBadge>
      ),
    },
    {
      key: 'createdAt',
      header: 'Submitted',
      render: (row) => <span className="text-muted-foreground">{row.createdAt}</span>,
    },
    {
      align: 'right',
      key: 'actions',
      header: 'Actions',
      render: () => (
        <AppButton size="icon-sm" tone="secondary">
          <Eye />
        </AppButton>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <AppPageHeader
        title="Support tickets"
        description="Help users with billing questions, technical assistance, and inquiries."
      />

      <AppCard padding="none">
        <div className="border-b border-border p-4">
          <AppSegmentedControl
            onValueChange={(val) => val && setFilter(val)}
            options={[
              { label: 'All tickets', value: 'all' },
              { label: 'Open', value: 'open' },
              { label: 'In progress', value: 'in_progress' },
              { label: 'Resolved', value: 'resolved' },
            ]}
            value={filter}
          />
        </div>

        <AppTable<TicketRecord> columns={columns} rows={filtered} getRowKey={(r) => r.id} />
      </AppCard>
    </div>
  );
}
