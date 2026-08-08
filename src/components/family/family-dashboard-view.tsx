'use client';

import {
  ArrowRight,
  CircleDollarSign,
  HandCoins,
  Plus,
  Target,
  TrendingDown,
  TrendingUp,
  WalletCards,
} from 'lucide-react';
import Link from 'next/link';

import {
  AppBadge,
  AppButton,
  AppCard,
  AppPageHeader,
  AppProgress,
  AppStatCard,
} from '@/components/app-ui';
import {
  CategoryPieChart,
  IncomeExpenseBarChart,
} from '@/components/shared/charts/dashboard-charts';
import { cn } from '@/lib/utils';
import type {
  BudgetSummary,
  FamilyActivityItem,
  FamilyBalanceSummary,
  FamilyDashboardData,
} from '@/types/dashboard-models';

const metricIcons = [WalletCards, TrendingUp, TrendingDown, Target];
const numberFormatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
const formatCurrency = (value: number) => `৳${numberFormatter.format(value)}`;

export function FamilyDashboardView({ data }: { data: FamilyDashboardData }) {
  const categoryTotal = data.categories.reduce((total, category) => total + category.value, 0);
  const netBalance = data.balances.reduce(
    (total, balance) => total + (balance.type === 'owes_you' ? balance.amount : -balance.amount),
    0,
  );

  return (
    <div className="space-y-6">
      <AppPageHeader
        actions={
          <>
            <AppButton
              nativeButton={false}
              render={<Link href="/family/balances" />}
              size="sm"
              tone="secondary"
            >
              <HandCoins />
              Settle up
            </AppButton>
            <AppButton nativeButton={false} render={<Link href="/family/transactions" />} size="sm">
              <Plus />
              Add transaction
            </AppButton>
          </>
        }
        description={`${data.family.name} · ${data.family.memberCount} members · Shared finances for ${data.family.period}.`}
        title="Family dashboard"
      />

      <section aria-label="Family summary" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {data.metrics.map((metric, index) => {
          const Icon = metricIcons[index] ?? WalletCards;
          return (
            <AppStatCard
              change={metric.change}
              icon={<Icon />}
              key={metric.id}
              label={metric.label}
              tone={metric.tone === 'accent' ? 'primary' : metric.tone}
              value={metric.value}
            />
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)]">
        <FamilyCard description="Combined shared-wallet activity" title="Income vs expense">
          <IncomeExpenseBarChart dataByYear={data.cashFlowByYear} />
        </FamilyCard>
        <FamilyCard
          action="Open reports"
          description="This month · by category"
          href="/family/reports"
          title="Family spending"
        >
          <CategoryPieChart
            centerLabel="Spent"
            centerValue={formatCurrency(categoryTotal)}
            data={data.categories}
            valuePrefix="৳"
          />
        </FamilyCard>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <FamilyCard
          action="Manage"
          description="Pooled category limits for the group"
          href="/family/budgets"
          title="Budget status"
        >
          <div className="space-y-5 pt-1">
            {data.budgets.map((budget) => (
              <BudgetProgress budget={budget} key={budget.id} />
            ))}
          </div>
        </FamilyCard>

        <FamilyCard
          action="View balances"
          description="Who owes whom after shared expenses"
          href="/family/balances"
          title="Balance summary"
        >
          <div className="mb-4 flex items-center justify-between rounded-lg bg-muted/40 p-4">
            <div>
              <p className="text-xs text-muted-foreground">Your net balance</p>
              <p className="mt-1 text-xl font-semibold text-success">
                +{formatCurrency(netBalance)}
              </p>
            </div>
            <AppBadge status="success">You are owed</AppBadge>
          </div>
          <div className="-mx-5 -mb-5 divide-y divide-border">
            {data.balances.map((balance) => (
              <BalanceRow balance={balance} key={balance.id} />
            ))}
          </div>
        </FamilyCard>
      </section>

      <FamilyCard
        action="View all"
        description="Latest entries and settlements from family members"
        href="/family/transactions"
        title="Recent family activity"
      >
        <div className="-mx-5 -mb-5 divide-y divide-border">
          {data.activities.map((activity) => (
            <ActivityRow activity={activity} key={activity.id} />
          ))}
        </div>
      </FamilyCard>
    </div>
  );
}

function FamilyCard({
  action,
  children,
  description,
  href,
  title,
}: {
  action?: string;
  children: React.ReactNode;
  description: string;
  href?: string;
  title: string;
}) {
  return (
    <AppCard className="min-w-0">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="font-semibold">{title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
        {href && action ? (
          <AppButton nativeButton={false} render={<Link href={href} />} size="sm" tone="secondary">
            {action}
            <ArrowRight />
          </AppButton>
        ) : null}
      </div>
      {children}
    </AppCard>
  );
}

function BudgetProgress({ budget }: { budget: BudgetSummary }) {
  const progress = Math.min(100, Math.round((budget.spent / budget.limit) * 100));
  const remaining = Math.max(0, budget.limit - budget.spent);
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3 text-sm">
        <span className="font-medium">
          {budget.icon} {budget.category}
        </span>
        <span className="text-xs text-muted-foreground">{formatCurrency(remaining)} left</span>
      </div>
      <AppProgress
        label={`${formatCurrency(budget.spent)} of ${formatCurrency(budget.limit)}`}
        tone={progress >= 70 ? 'warning' : 'primary'}
        value={progress}
      />
    </div>
  );
}

function BalanceRow({ balance }: { balance: FamilyBalanceSummary }) {
  const positive = balance.type === 'owes_you';
  return (
    <div className="flex items-center gap-3 px-5 py-3.5">
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
        {balance.initials}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium">{balance.name}</span>
        <span className="mt-0.5 block text-xs text-muted-foreground">
          {positive ? 'Owes you' : 'You owe'}
        </span>
      </span>
      <span
        className={cn('shrink-0 text-sm font-semibold', positive ? 'text-success' : 'text-danger')}
      >
        {positive ? '+' : '−'}
        {formatCurrency(balance.amount)}
      </span>
    </div>
  );
}

function ActivityRow({ activity }: { activity: FamilyActivityItem }) {
  const positive = activity.type === 'income';
  const settlement = activity.type === 'settlement';
  return (
    <div className="flex items-center gap-3 px-5 py-3.5">
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
        {activity.initials}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm">
          <strong className="font-medium">{activity.member}</strong>{' '}
          <span className="text-muted-foreground">{activity.action}</span>
        </span>
        <span className="mt-0.5 block truncate text-xs text-muted-foreground">
          {activity.meta} · {activity.timestamp}
        </span>
      </span>
      <span
        className={cn(
          'shrink-0 text-sm font-semibold',
          positive ? 'text-success' : settlement ? 'text-info' : 'text-danger',
        )}
      >
        {positive ? '+' : settlement ? '' : '−'}
        {formatCurrency(activity.amount)}
      </span>
      {settlement ? (
        <CircleDollarSign className="hidden size-4 shrink-0 text-info sm:block" />
      ) : null}
    </div>
  );
}
