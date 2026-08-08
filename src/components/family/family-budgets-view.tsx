'use client';

import { useState } from 'react';
import {
  AppBadge,
  AppButton,
  AppCard,
  AppPageHeader,
  AppProgress,
  AppStatCard,
  AppModal,
  AppField,
  AppInput,
  AppSelect,
} from '@/components/app-ui';
import { Plus, Target, TrendingDown, Landmark, WalletCards } from 'lucide-react';
import { familyDashboardDemoData } from '@/lib/dashboard-data';

const numberFormatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
const formatCurrency = (value: number) => `৳${numberFormatter.format(value)}`;

export function FamilyBudgetsView() {
  const [modalOpen, setModalOpen] = useState(false);
  const budgets = familyDashboardDemoData.budgets;
  const totalSpent = budgets.reduce((acc, b) => acc + b.spent, 0);
  const totalLimit = budgets.reduce((acc, b) => acc + b.limit, 0);

  return (
    <div className="space-y-6">
      <AppPageHeader
        title="Family budgets"
        description="Set and track pooled spending limits across the family group."
        actions={
          <AppButton onClick={() => setModalOpen(true)} size="sm">
            <Plus /> Create family budget
          </AppButton>
        }
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AppStatCard icon={<Target />} label="Active family budgets" value={`${budgets.length}`} />
        <AppStatCard
          icon={<TrendingDown />}
          label="Total spent"
          tone="warning"
          value={formatCurrency(totalSpent)}
        />
        <AppStatCard
          icon={<Landmark />}
          label="Total limit"
          tone="success"
          value={formatCurrency(totalLimit)}
        />
        <AppStatCard
          icon={<WalletCards />}
          label="Pooled progress"
          value={`${Math.round((totalSpent / totalLimit) * 100)}%`}
        />
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        {budgets.map((b) => {
          const pct = Math.round((b.spent / b.limit) * 100);
          const remaining = Math.max(0, b.limit - b.spent);
          return (
            <AppCard key={b.id}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className="grid size-10 place-items-center rounded-lg text-sm font-semibold"
                    style={{ backgroundColor: `${b.color}1c`, color: b.color }}
                  >
                    {b.icon}
                  </span>
                  <div>
                    <h3 className="font-semibold text-foreground">{b.category}</h3>
                    <p className="text-xs text-muted-foreground">
                      {formatCurrency(remaining)} remaining of {formatCurrency(b.limit)}
                    </p>
                  </div>
                </div>
                <AppBadge status={pct >= 80 ? 'warning' : 'success'}>{pct}% used</AppBadge>
              </div>

              <AppProgress className="mt-4" tone={pct >= 80 ? 'warning' : 'primary'} value={pct} />

              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span>{formatCurrency(b.spent)} spent</span>
                <span>Limit: {formatCurrency(b.limit)}</span>
              </div>
            </AppCard>
          );
        })}
      </div>

      <AppModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title="Create pooled family budget"
        description="Set a monthly category spending limit for all family members."
        footer={
          <>
            <AppButton tone="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </AppButton>
            <AppButton onClick={() => setModalOpen(false)}>Create budget</AppButton>
          </>
        }
      >
        <div className="space-y-4">
          <AppField label="Category" required>
            <AppSelect
              options={[
                { label: 'Housing & bills', value: 'housing' },
                { label: 'Food & groceries', value: 'food' },
                { label: 'Transport', value: 'transport' },
                { label: 'Entertainment', value: 'entertainment' },
              ]}
              placeholder="Select category"
            />
          </AppField>
          <AppField label="Monthly limit (BDT)" required>
            <AppInput placeholder="0.00" type="number" />
          </AppField>
        </div>
      </AppModal>
    </div>
  );
}
