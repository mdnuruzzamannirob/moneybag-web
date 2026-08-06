'use client';

import { useState } from 'react';
import {
  AppBadge,
  AppButton,
  AppCard,
  AppPageHeader,
  AppStatCard,
  AppModal,
  AppField,
  AppInput,
  AppSelect,
} from '@/components/app-ui';
import { CircleDollarSign, HandCoins, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { familyDashboardDemoData } from '@/lib/dashboard-data';
import type { FamilyBalanceSummary } from '@/types/dashboard-models';

const numberFormatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
const formatCurrency = (value: number) => `৳${numberFormatter.format(value)}`;

export function FamilyBalancesView() {
  const [modalOpen, setModalOpen] = useState(false);
  const balances = familyDashboardDemoData.balances;

  const totalOwedToYou = balances
    .filter((b) => b.type === 'owes_you')
    .reduce((sum, b) => sum + b.amount, 0);
  const totalYouOwe = balances
    .filter((b) => b.type === 'you_owe')
    .reduce((sum, b) => sum + b.amount, 0);
  const netPosition = totalOwedToYou - totalYouOwe;

  return (
    <div className="space-y-6">
      <AppPageHeader
        title="Family balances"
        description="Track member balances, split calculations, and who owes whom."
        actions={
          <AppButton onClick={() => setModalOpen(true)} size="sm">
            <HandCoins /> Settle up balance
          </AppButton>
        }
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <AppStatCard
          icon={<CircleDollarSign />}
          label="Net balance position"
          tone={netPosition >= 0 ? 'success' : 'danger'}
          value={`${netPosition >= 0 ? '+' : '−'}${formatCurrency(Math.abs(netPosition))}`}
          variant="featured"
        />
        <AppStatCard
          icon={<ArrowDownRight />}
          label="Total owed to you"
          tone="success"
          value={formatCurrency(totalOwedToYou)}
        />
        <AppStatCard
          icon={<ArrowUpRight />}
          label="Total you owe"
          tone="danger"
          value={formatCurrency(totalYouOwe)}
        />
      </section>

      <AppCard padding="none">
        <div className="border-b border-border p-4">
          <h2 className="font-semibold text-foreground">Member balance breakdown</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Current balance status for each member in Rahman Family
          </p>
        </div>
        <div className="divide-y divide-border">
          {balances.map((b) => {
            const isOwed = b.type === 'owes_you';
            return (
              <div key={b.id} className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    {b.initials}
                  </span>
                  <div>
                    <p className="font-semibold text-foreground">{b.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {isOwed ? 'Owes you for shared expenses' : 'You owe for shared expenses'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <AppBadge status={isOwed ? 'success' : 'danger'}>
                    {isOwed ? 'Owes you' : 'You owe'}
                  </AppBadge>
                  <span
                    className={isOwed ? 'font-semibold text-success' : 'font-semibold text-danger'}
                  >
                    {isOwed ? '+' : '−'}
                    {formatCurrency(b.amount)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </AppCard>

      <AppModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title="Settle up balance"
        description="Record a settlement payment between family members."
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
          <AppField label="Settle with member" required>
            <AppSelect
              options={balances.map((b) => ({ label: b.name, value: `${b.id}` }))}
              placeholder="Select member"
            />
          </AppField>
          <AppField label="Settlement amount (BDT)" required>
            <AppInput placeholder="0.00" type="number" />
          </AppField>
        </div>
      </AppModal>
    </div>
  );
}
