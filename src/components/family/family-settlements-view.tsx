'use client';

import { useState } from 'react';
import {
  AppBadge,
  AppButton,
  AppCard,
  AppPageHeader,
  AppTable,
  type AppTableColumn,
  AppModal,
  AppField,
  AppInput,
  AppSelect,
} from '@/components/app-ui';
import { ArrowLeftRight, CheckCircle2, HandCoins } from 'lucide-react';

type SettlementRecord = {
  id: string;
  from: string;
  to: string;
  amount: number;
  date: string;
  status: 'settled' | 'pending';
};

const sampleSettlements: SettlementRecord[] = [
  {
    id: 'SET-101',
    from: 'Tanvir Rahman',
    to: 'Ayesha Rahman',
    amount: 5000,
    date: '28 Jul, 2026',
    status: 'settled',
  },
  {
    id: 'SET-102',
    from: 'Nabila Rahman',
    to: 'Ayesha Rahman',
    amount: 3200,
    date: '25 Jul, 2026',
    status: 'settled',
  },
  {
    id: 'SET-103',
    from: 'Ayesha Rahman',
    to: 'Tanvir Rahman',
    amount: 1840,
    date: '20 Jul, 2026',
    status: 'pending',
  },
];

const numberFormatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
const formatCurrency = (value: number) => `৳${numberFormatter.format(value)}`;

export function FamilySettlementsView() {
  const [settlements] = useState(sampleSettlements);
  const [modalOpen, setModalOpen] = useState(false);

  const columns: readonly AppTableColumn<SettlementRecord>[] = [
    {
      key: 'from',
      header: 'Payer',
      render: (row) => <span className="font-medium text-foreground">{row.from}</span>,
    },
    {
      key: 'to',
      header: 'Recipient',
      render: (row) => <span className="font-medium text-foreground">{row.to}</span>,
    },
    {
      key: 'date',
      header: 'Date',
      render: (row) => <span className="text-muted-foreground">{row.date}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => (
        <AppBadge status={row.status === 'settled' ? 'success' : 'warning'}>
          {row.status === 'settled' ? 'Settled' : 'Pending'}
        </AppBadge>
      ),
    },
    {
      align: 'right',
      key: 'amount',
      header: 'Amount',
      render: (row) => (
        <span className="font-semibold text-foreground">{formatCurrency(row.amount)}</span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <AppPageHeader
        title="Settlements history"
        description="Record and verify past balance settlement payments within the family group."
        actions={
          <AppButton onClick={() => setModalOpen(true)} size="sm">
            <HandCoins /> New settlement
          </AppButton>
        }
      />

      <AppCard padding="none">
        <div className="border-b border-border p-4">
          <h2 className="font-semibold text-foreground">Settlement records</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Clear records of internal transfers and balance clearings
          </p>
        </div>
        <AppTable<SettlementRecord> columns={columns} rows={settlements} getRowKey={(r) => r.id} />
      </AppCard>

      <AppModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title="Record new settlement"
        description="Log a payment transfer between members to clear debts."
        footer={
          <>
            <AppButton tone="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </AppButton>
            <AppButton onClick={() => setModalOpen(false)}>Record settlement</AppButton>
          </>
        }
      >
        <div className="space-y-4">
          <AppField label="Paid from member" required>
            <AppSelect
              options={[
                { label: 'Tanvir Rahman', value: 'tanvir' },
                { label: 'Nabila Rahman', value: 'nabila' },
              ]}
              placeholder="Select payer"
            />
          </AppField>
          <AppField label="Paid to member" required>
            <AppSelect options={[{ label: 'Ayesha Rahman', value: 'ayesha' }]} value="ayesha" />
          </AppField>
          <AppField label="Settlement amount (BDT)" required>
            <AppInput placeholder="0.00" type="number" />
          </AppField>
        </div>
      </AppModal>
    </div>
  );
}
