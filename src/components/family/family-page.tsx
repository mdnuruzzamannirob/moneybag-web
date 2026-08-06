'use client';
import { AppButton, AppCard, AppPageHeader } from '@/components/app-ui';
import { ArrowDownRight, Plus, Users, WalletCards } from 'lucide-react';

const groups = ['Rahman Family', 'Travel Circle'];
export function FamilyPage({
  section,
}: {
  section:
    'dashboard' | 'wallets' | 'transactions' | 'budgets' | 'members' | 'reports' | 'settings';
}) {
  const copy = {
    dashboard: ['Family dashboard', 'A clear view of this group’s money.'],
    wallets: ['Shared wallets', 'Manage accounts used by the group.'],
    transactions: ['Family transactions', 'Review shared spending and who paid.'],
    budgets: ['Family budgets', 'Track pooled limits across this group.'],
    members: ['Family members', 'Manage access and responsibilities.'],
    reports: ['Family reports', 'Understand spending across the group.'],
    settings: ['Family settings', 'Update this group and its defaults.'],
  }[section];
  return (
    <div className="space-y-6">
      <AppPageHeader
        title={copy[0]}
        description={copy[1]}
        actions={
          <div className="flex gap-2">
            <select
              className="h-9 rounded-lg border border-border bg-card px-3 text-sm"
              aria-label="Family group"
            >
              {groups.map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>
            <AppButton>
              <Plus className="size-4" /> Add
            </AppButton>
          </div>
        }
      />
      <div className="grid gap-4 sm:grid-cols-3">
        <AppCard>
          <p className="text-sm text-muted-foreground">Group balance</p>
          <p className="mt-2 text-2xl font-semibold">৳ 324,850</p>
        </AppCard>
        <AppCard>
          <p className="text-sm text-muted-foreground">This month</p>
          <p className="mt-2 text-2xl font-semibold text-danger">৳ 42,300</p>
        </AppCard>
        <AppCard>
          <p className="text-sm text-muted-foreground">Members</p>
          <p className="mt-2 text-2xl font-semibold">3 / 5</p>
        </AppCard>
      </div>
      <AppCard padding="none">
        <div className="border-b border-border p-5">
          <h2 className="font-semibold">{copy[0]}</h2>
          <p className="mt-1 text-sm text-muted-foreground">Rahman Family · shared workspace</p>
        </div>
        <div className="divide-y divide-border">
          {['Groceries', 'BRAC Bank', 'Utilities', 'Monthly contribution'].map((item, i) => (
            <div className="flex items-center justify-between p-5" key={item}>
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
                  {section === 'members' ? (
                    <Users className="size-4" />
                  ) : (
                    <WalletCards className="size-4" />
                  )}
                </span>
                <div>
                  <p className="font-medium">{item}</p>
                  <p className="text-xs text-muted-foreground">Updated today</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">{i % 2 ? '৳ 18,450' : '৳ 12,800'}</p>
                <p className="flex items-center justify-end gap-1 text-xs text-success">
                  <ArrowDownRight className="size-3" /> On track
                </p>
              </div>
            </div>
          ))}
        </div>
      </AppCard>
    </div>
  );
}
