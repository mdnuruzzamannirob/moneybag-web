'use client';

import {
  ArrowRight,
  CalendarRange,
  CircleGauge,
  Lightbulb,
  PiggyBank,
  ReceiptText,
  TrendingDown,
  TrendingUp,
  WalletCards,
} from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import {
  AppBadge,
  AppButton,
  AppCard,
  AppPageHeader,
  AppSelect,
  AppStatCard,
} from '@/components/app-ui';
import { CategoryPieChart } from '@/components/shared/charts/dashboard-charts';
import { FinanceTrendChart } from '@/components/shared/charts/finance-charts';
import { analyticsPeriodOptions, analyticsSnapshots } from '@/lib/report-data';
import { cn } from '@/lib/utils';
import type { IncomeExpensePoint } from '@/types/dashboard-models';
import type { AnalyticsPeriod } from '@/types/report-models';

const numberFormatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
const formatCurrency = (value: number) => `৳${numberFormatter.format(value)}`;

export function AnalyticsPage() {
  const [period, setPeriod] = useState<AnalyticsPeriod>('30');
  const snapshot = analyticsSnapshots[period];
  const netCashFlow = snapshot.income - snapshot.expense;
  const topCategory = snapshot.categories[0];
  const topCategoryShare = topCategory
    ? Math.round((topCategory.value / snapshot.expense) * 100)
    : 0;
  const recentActivity = useMemo(() => snapshot.trend.slice(-7).reverse(), [snapshot.trend]);

  return (
    <div className="space-y-6">
      <AppPageHeader
        actions={
          <>
            <AppButton
              nativeButton={false}
              render={<Link href="/reports" />}
              size="sm"
              tone="secondary"
            >
              View reports
              <ArrowRight />
            </AppButton>
            <AppSelect
              ariaLabel="Select analytics period"
              leading={<CalendarRange />}
              onValueChange={(value) => value && setPeriod(value as AnalyticsPeriod)}
              options={analyticsPeriodOptions}
              size="sm"
              triggerClassName="w-full sm:w-42"
              value={period}
            />
          </>
        }
        description="Understand how money moves, where it goes, and how your habits are changing."
        title="Analytics"
      />

      <section aria-label="Analytics summary" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AppStatCard
          change={snapshot.periodLabel}
          icon={<TrendingUp />}
          label="Total income"
          tone="success"
          value={formatCurrency(snapshot.income)}
        />
        <AppStatCard
          change="15.6% below prior period"
          icon={<TrendingDown />}
          label="Total expense"
          tone="danger"
          value={formatCurrency(snapshot.expense)}
        />
        <AppStatCard
          change={`${formatCurrency(snapshot.averageDailyExpense)} per day`}
          icon={<CircleGauge />}
          label="Daily average"
          tone="info"
          value={formatCurrency(snapshot.averageDailyExpense)}
        />
        <AppStatCard
          change={snapshot.savingsRate >= 50 ? 'Healthy range' : 'Needs attention'}
          icon={<PiggyBank />}
          label="Savings rate"
          tone="primary"
          value={`${snapshot.savingsRate}%`}
        />
      </section>

      <section className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)]">
        <AnalyticsCard
          badge={snapshot.periodLabel}
          description="Income and expense movement across the selected period"
          title="Cash-flow trend"
        >
          <FinanceTrendChart data={snapshot.trend} />
        </AnalyticsCard>

        <AnalyticsCard description="Your expense mix for this period" title="Spending by category">
          <CategoryPieChart
            centerLabel="Spent"
            centerValue={formatCurrency(snapshot.expense)}
            data={snapshot.categories}
            valuePrefix="৳"
          />
        </AnalyticsCard>
      </section>

      <section className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)]">
        <AnalyticsCard
          description="The latest seven points in your selected range"
          title="Daily activity"
        >
          <div className="-mx-5 -mb-5 divide-y divide-border">
            {recentActivity.map((point) => (
              <ActivityRow key={point.label} point={point} />
            ))}
          </div>
        </AnalyticsCard>

        <AnalyticsCard
          badge="Updated now"
          description="Small signals worth paying attention to"
          title="Money insights"
        >
          <div className="space-y-3">
            <Insight
              description={snapshot.comparison}
              icon={<TrendingDown />}
              title="Spending is trending down"
              tone="success"
            />
            <Insight
              description={`${topCategory?.name ?? 'No category'} accounts for ${topCategoryShare}% of all expenses.`}
              icon={<ReceiptText />}
              title="Your largest category"
              tone="warning"
            />
            <Insight
              description={`${formatCurrency(netCashFlow)} remained after expenses in this period.`}
              icon={<WalletCards />}
              title="Positive cash flow"
              tone="info"
            />
          </div>
        </AnalyticsCard>
      </section>
    </div>
  );
}

function AnalyticsCard({
  badge,
  children,
  description,
  title,
}: {
  badge?: string;
  children: React.ReactNode;
  description: string;
  title: string;
}) {
  return (
    <AppCard className="min-w-0">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="font-semibold">{title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
        {badge ? (
          <AppBadge className="shrink-0" status="info">
            {badge}
          </AppBadge>
        ) : null}
      </div>
      {children}
    </AppCard>
  );
}

function ActivityRow({ point }: { point: IncomeExpensePoint }) {
  const income = point.income ?? 0;
  const expense = point.expense ?? 0;
  const net = income - expense;

  return (
    <div className="grid gap-3 px-5 py-3.5 sm:grid-cols-[minmax(120px,1fr)_minmax(180px,1fr)_auto] sm:items-center">
      <div>
        <p className="text-sm font-medium">{point.label}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">Recorded activity</p>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
        <span className={income ? 'text-success' : 'text-muted-foreground'}>
          {income ? `+${formatCurrency(income)}` : '—'} income
        </span>
        <span className={expense ? 'text-danger' : 'text-muted-foreground'}>
          {expense ? `−${formatCurrency(expense)}` : '—'} expense
        </span>
      </div>
      <span
        className={cn(
          'justify-self-start text-sm font-semibold tabular-nums sm:justify-self-end',
          net >= 0 ? 'text-success' : 'text-danger',
        )}
      >
        {net >= 0 ? '+' : '−'}
        {formatCurrency(Math.abs(net))}
      </span>
    </div>
  );
}

function Insight({
  description,
  icon,
  title,
  tone,
}: {
  description: string;
  icon: React.ReactNode;
  title: string;
  tone: 'info' | 'success' | 'warning';
}) {
  return (
    <div className="flex gap-3 rounded-lg border border-border bg-muted/30 p-3.5">
      <span
        className={cn(
          'grid size-9 shrink-0 place-items-center rounded-md [&>svg]:size-4',
          {
            info: 'bg-info-soft text-info',
            success: 'bg-success-soft text-success',
            warning: 'bg-warning-soft text-warning',
          }[tone],
        )}
      >
        {icon ?? <Lightbulb />}
      </span>
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
