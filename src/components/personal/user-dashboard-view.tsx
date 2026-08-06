import {
  ArrowRight,
  Download,
  PiggyBank,
  Plus,
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
  SavingsGoalSummary,
  UserDashboardData,
} from '@/types/dashboard-models';

const metricIcons = [WalletCards, TrendingUp, TrendingDown, PiggyBank];
const numberFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 0,
});
const formatCurrency = (value: number) => `৳${numberFormatter.format(value)}`;

export function UserDashboardView({ data }: { data: UserDashboardData }) {
  const categoryTotal = data.categories.reduce((total, category) => total + category.value, 0);

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
              <Download />
              Export
            </AppButton>
            <AppButton nativeButton={false} render={<Link href="/transactions" />} size="sm">
              <Plus />
              Add transaction
            </AppButton>
          </>
        }
        description="Here's your full financial overview—income, expenses, budgets and savings."
        title={
          <>
            <span className="mb-1 block text-sm font-medium text-primary">
              Tuesday, July 28, 2026
            </span>
            Good morning, {data.user.firstName} 👋
          </>
        }
      />

      <section aria-label="Financial summary" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
        <DashboardCard description="Monthly cash flow comparison" title="Income vs expense">
          <IncomeExpenseBarChart dataByYear={data.cashFlowByYear} />
        </DashboardCard>
        <DashboardCard
          action="View all"
          description="This month · by category"
          href="/categories"
          title="Top spending"
        >
          <CategoryPieChart
            centerLabel="Spent"
            centerValue={formatCurrency(categoryTotal)}
            data={data.categories}
            valuePrefix="৳"
          />
        </DashboardCard>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <DashboardCard
          action="View all"
          description="Your five latest entries"
          href="/transactions"
          title="Recent transactions"
        >
          <div className="-mx-5 -mb-5 divide-y divide-border">
            {data.transactions.map((transaction) => (
              <Link
                className="flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-muted/60"
                href="/transactions"
                key={transaction.id}
              >
                <span
                  className="grid size-10 shrink-0 place-items-center rounded-lg text-base"
                  style={{
                    backgroundColor: `${transaction.color}18`,
                    color: transaction.color,
                  }}
                >
                  {transaction.icon}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">{transaction.title}</span>
                  <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                    {transaction.category} · {transaction.wallet} · {transaction.date}
                  </span>
                </span>
                <span
                  className={cn(
                    'shrink-0 text-sm font-semibold',
                    transaction.type === 'income' ? 'text-success' : 'text-danger',
                  )}
                >
                  {transaction.type === 'income' ? '+' : '-'}
                  {formatCurrency(transaction.amount)}
                </span>
              </Link>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard
          action="Manage"
          description="Monthly category limits"
          href="/budgets"
          title="Budget status"
        >
          <div className="space-y-5 pt-1">
            {data.budgets.map((budget) => (
              <BudgetProgress budget={budget} key={budget.id} />
            ))}
          </div>
        </DashboardCard>
      </section>

      <DashboardCard
        action="View all"
        description="Track progress towards what matters most"
        href="/goals"
        title="Savings goals"
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {data.goals.map((goal) => (
            <GoalCard goal={goal} key={goal.id} />
          ))}
        </div>
      </DashboardCard>
    </div>
  );
}

function DashboardCard({
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
        tone={progress >= 80 ? 'warning' : 'primary'}
        value={progress}
      />
    </div>
  );
}

function GoalCard({ goal }: { goal: SavingsGoalSummary }) {
  const progress = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));
  const complete = progress === 100;
  return (
    <AppCard className="bg-muted/35" padding="sm">
      <div className="flex items-center justify-between">
        <span
          className="grid size-10 place-items-center rounded-lg text-lg"
          style={{ backgroundColor: `${goal.color}18` }}
        >
          {goal.icon}
        </span>
        <AppBadge status={complete ? 'success' : 'info'}>
          {complete ? 'Completed' : `${progress}%`}
        </AppBadge>
      </div>
      <h3 className="mt-4 text-sm font-semibold">{goal.title}</h3>
      <p className="mt-1 text-xs text-muted-foreground">
        {formatCurrency(goal.currentAmount)} of {formatCurrency(goal.targetAmount)}
      </p>
      <AppProgress className="mt-4" tone={complete ? 'success' : 'primary'} value={progress} />
      <p className="mt-2 text-xs text-muted-foreground">Target · {goal.deadline}</p>
    </AppCard>
  );
}
