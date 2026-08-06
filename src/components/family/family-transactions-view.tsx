'use client';

import { useState } from 'react';
import {
  AppBadge,
  AppButton,
  AppCard,
  AppEmptyState,
  AppField,
  AppInput,
  AppModal,
  AppPageHeader,
  AppSegmentedControl,
  AppSelect,
  AppTable,
  type AppTableColumn,
} from '@/components/app-ui';
import { Filter, Plus, Search, Upload, Download, X } from 'lucide-react';
import { familyWalletsDemoData } from '@/lib/family-data';
import type { SharedWalletActivity } from '@/types/family';

const numberFormatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
const formatCurrency = (value: number) => `৳${numberFormatter.format(value)}`;

export function FamilyTransactionsView() {
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense' | 'transfer'>('all');
  const [modalOpen, setModalOpen] = useState(false);

  const activities = familyWalletsDemoData.activities;

  const filtered = activities.filter((act) => {
    const matchType = filterType === 'all' || act.type === filterType;
    const matchQuery =
      !query ||
      act.title.toLowerCase().includes(query.toLowerCase()) ||
      act.note.toLowerCase().includes(query.toLowerCase());
    return matchType && matchQuery;
  });

  const columns: readonly AppTableColumn<SharedWalletActivity>[] = [
    {
      key: 'title',
      header: 'Description',
      render: (row) => (
        <div>
          <p className="font-medium text-foreground">{row.title}</p>
          <p className="text-xs text-muted-foreground">{row.note}</p>
        </div>
      ),
    },
    {
      key: 'paidBy',
      header: 'Paid by',
      render: (row) => (
        <AppBadge status="neutral" className="capitalize">
          {row.paidBy}
        </AppBadge>
      ),
    },
    {
      key: 'split',
      header: 'Split rule',
      render: (row) => <AppBadge status="info">{row.splitLabel}</AppBadge>,
    },
    {
      key: 'date',
      header: 'Date',
      render: (row) => <span className="text-muted-foreground">{row.date}</span>,
    },
    {
      align: 'right',
      key: 'amount',
      header: 'Amount',
      render: (row) => (
        <span
          className={
            row.type === 'income'
              ? 'font-semibold text-success'
              : row.type === 'expense'
                ? 'font-semibold text-danger'
                : 'font-semibold text-info'
          }
        >
          {row.type === 'income' ? '+' : row.type === 'expense' ? '−' : ''}
          {formatCurrency(row.amount)}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <AppPageHeader
        title="Family transactions"
        description="Review shared group spending, member contributions, and split rules."
        actions={
          <AppButton onClick={() => setModalOpen(true)} size="sm">
            <Plus /> Add transaction
          </AppButton>
        }
      />

      <AppCard padding="none">
        <div className="flex flex-col gap-3 p-4 lg:flex-row lg:items-center lg:justify-between border-b border-border">
          <AppSegmentedControl
            onValueChange={(val) => val && setFilterType(val as any)}
            options={[
              { label: 'All', value: 'all' },
              { label: 'Expense', value: 'expense' },
              { label: 'Income', value: 'income' },
              { label: 'Transfer', value: 'transfer' },
            ]}
            value={filterType}
          />
          <AppInput
            leading={<Search />}
            placeholder="Search family transactions..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            containerClassName="w-full sm:w-80"
          />
        </div>

        {filtered.length === 0 ? (
          <AppEmptyState
            icon={<Filter />}
            title="No transactions found"
            description="Try clearing search query or changing filters."
          />
        ) : (
          <AppTable<SharedWalletActivity>
            columns={columns}
            rows={filtered}
            getRowKey={(r) => r.id}
          />
        )}
      </AppCard>

      <AppModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title="Add family transaction"
        description="Log a shared expense or income contribution for the family group."
        footer={
          <>
            <AppButton tone="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </AppButton>
            <AppButton onClick={() => setModalOpen(false)}>Add transaction</AppButton>
          </>
        }
      >
        <div className="space-y-4">
          <AppField label="Description" required>
            <AppInput placeholder="e.g. Grocery shopping at Agora" />
          </AppField>
          <AppField label="Amount (BDT)" required>
            <AppInput placeholder="0.00" type="number" />
          </AppField>
          <AppField label="Paid by member" required>
            <AppSelect
              options={[
                { label: 'Ayesha Rahman', value: 'ayesha' },
                { label: 'Tanvir Rahman', value: 'tanvir' },
                { label: 'Nabila Rahman', value: 'nabila' },
              ]}
              value="ayesha"
            />
          </AppField>
          <AppField label="Split rule" required>
            <AppSelect
              options={[
                { label: 'Split equally among all members', value: 'equal' },
                { label: 'Individual contribution', value: 'contribution' },
                { label: 'Do not split', value: 'none' },
              ]}
              value="equal"
            />
          </AppField>
        </div>
      </AppModal>
    </div>
  );
}
