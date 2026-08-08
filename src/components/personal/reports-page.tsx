'use client';

import {
  CalendarRange,
  Download,
  FileDown,
  Landmark,
  Layers3,
  PiggyBank,
  ReceiptText,
  TrendingDown,
  TrendingUp,
  WalletCards,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import type { DateRange } from 'react-day-picker';

import {
  AppBadge,
  AppButton,
  AppCard,
  AppDateRangePicker,
  AppPageHeader,
  AppSegmentedControl,
  AppSelect,
  AppStatCard,
  AppTable,
  type AppTableColumn,
} from '@/components/app-ui';
import { CategoryPieChart } from '@/components/shared/charts/dashboard-charts';
import { FinanceBarChart, FinanceTrendChart } from '@/components/shared/charts/finance-charts';
import { dailyTrend, reportMonths, yearlyCashFlow } from '@/lib/report-data';
import { cn } from '@/lib/utils';
import type { DistributionItem, IncomeExpensePoint } from '@/types/dashboard-models';
import type { ReportTransaction, ReportView, TrendPoint } from '@/types/report-models';

const numberFormatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
const formatCurrency = (value: number) => `৳${numberFormatter.format(value)}`;

const reportViews = [
  { label: 'Monthly', value: 'monthly' },
  { label: 'Yearly', value: 'yearly' },
  { label: 'Categories', value: 'category' },
  { label: 'Daily trend', value: 'trend' },
] as const;

const monthOptions = Object.values(reportMonths).map((month) => ({
  label: month.label,
  value: month.key,
}));

const yearOptions = Object.keys(yearlyCashFlow)
  .sort((a, b) => Number(b) - Number(a))
  .map((year) => ({ label: year, value: year }));

const transactionColumns: readonly AppTableColumn<ReportTransaction>[] = [
  {
    header: 'Transaction',
    key: 'transaction',
    render: (row) => (
      <div className="flex items-center gap-3">
        <span
          className="grid size-9 shrink-0 place-items-center rounded-md text-xs font-semibold"
          style={{ backgroundColor: `${row.color}18`, color: row.color }}
        >
          {row.category.slice(0, 1)}
        </span>
        <div className="min-w-0">
          <p className="truncate font-medium">{row.title}</p>
          <p className="mt-0.5 truncate text-xs text-muted-foreground">{row.wallet}</p>
        </div>
      </div>
    ),
  },
  {
    header: 'Category',
    key: 'category',
    render: (row) => <AppBadge>{row.category}</AppBadge>,
  },
  {
    header: 'Date',
    key: 'date',
    render: (row) => <span className="text-muted-foreground">{row.date}</span>,
  },
  {
    align: 'right',
    header: 'Amount',
    key: 'amount',
    render: (row) => (
      <span
        className={cn(
          'font-semibold tabular-nums',
          row.type === 'income' ? 'text-success' : 'text-danger',
        )}
      >
        {row.type === 'income' ? '+' : '−'}
        {formatCurrency(row.amount)}
      </span>
    ),
  },
];

const trendColumns: readonly AppTableColumn<TrendPoint>[] = [
  {
    header: 'Date',
    key: 'date',
    render: (row) => <span className="font-medium">{row.fullLabel}</span>,
  },
  {
    header: 'Income',
    key: 'income',
    render: (row) => (
      <span className="font-medium text-success">+{formatCurrency(row.income ?? 0)}</span>
    ),
  },
  {
    header: 'Expense',
    key: 'expense',
    render: (row) => (
      <span className="font-medium text-danger">−{formatCurrency(row.expense ?? 0)}</span>
    ),
  },
  {
    align: 'right',
    header: 'Net flow',
    key: 'net',
    render: (row) => {
      const net = (row.income ?? 0) - (row.expense ?? 0);
      return (
        <span
          className={cn('font-semibold tabular-nums', net >= 0 ? 'text-success' : 'text-danger')}
        >
          {net >= 0 ? '+' : '−'}
          {formatCurrency(Math.abs(net))}
        </span>
      );
    },
  },
];

export function ReportsPage() {
  const [view, setView] = useState<ReportView>('monthly');
  const [monthKey, setMonthKey] = useState('2026-07');
  const [year, setYear] = useState('2026');
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(2026, 6, 15),
    to: new Date(2026, 6, 28),
  });

  const month = reportMonths[monthKey] ?? reportMonths['2026-07'];
  const yearData = yearlyCashFlow[year] ?? [];
  const yearSummary = getCashFlowSummary(yearData);
  const filteredTrend = useMemo(() => filterTrend(dailyTrend, range), [range]);
  const trendSummary = getCashFlowSummary(filteredTrend);

  const exportCsv = () => {
    const csv = buildCsv(view, month, yearData, filteredTrend);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `moneybag-${view}-report.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <AppPageHeader
        actions={
          <>
            <AppButton onClick={() => window.print()} size="sm" tone="secondary">
              <FileDown />
              Export PDF
            </AppButton>
            <AppButton onClick={exportCsv} size="sm">
              <Download />
              Export CSV
            </AppButton>
          </>
        }
        description="Review monthly and yearly summaries, category breakdowns, and daily trends."
        title="Reports"
      />

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 lg:w-auto">
          <AppSegmentedControl
            className="w-full **:data-[slot=toggle-group-item]:px-1.5 **:data-[slot=toggle-group-item]:text-xs sm:**:data-[slot=toggle-group-item]:px-3 sm:**:data-[slot=toggle-group-item]:text-sm lg:w-145"
            onValueChange={(value) => value && setView(value as ReportView)}
            options={reportViews}
            value={view}
          />
        </div>
        <div className="flex w-full shrink-0 flex-col gap-2 sm:flex-row lg:w-auto">
          {view === 'trend' ? (
            <AppDateRangePicker className="sm:w-64" onValueChange={setRange} value={range} />
          ) : null}
          {view === 'monthly' || view === 'category' ? (
            <AppSelect
              ariaLabel="Select report month"
              leading={<CalendarRange />}
              onValueChange={(value) => value && setMonthKey(value)}
              options={monthOptions}
              triggerClassName="sm:w-44"
              value={monthKey}
            />
          ) : null}
          {view === 'yearly' ? (
            <AppSelect
              ariaLabel="Select report year"
              leading={<CalendarRange />}
              onValueChange={(value) => value && setYear(value)}
              options={yearOptions}
              triggerClassName="sm:w-32"
              value={year}
            />
          ) : null}
        </div>
      </div>

      {view === 'monthly' ? <MonthlyReportContent month={month} /> : null}
      {view === 'yearly' ? (
        <YearlyReportContent data={yearData} summary={yearSummary} year={year} />
      ) : null}
      {view === 'category' ? <CategoryReportContent month={month} /> : null}
      {view === 'trend' ? <TrendReportContent data={filteredTrend} summary={trendSummary} /> : null}
    </div>
  );
}

function MonthlyReportContent({ month }: { month: (typeof reportMonths)[string] }) {
  const net = month.income - month.expense;
  const savingsRate = month.income ? Math.round((net / month.income) * 100) : 0;

  return (
    <>
      <SummaryGrid
        items={[
          {
            change: month.label,
            icon: <TrendingUp />,
            label: 'Total income',
            tone: 'success',
            value: formatCurrency(month.income),
          },
          {
            change: `${month.expenseTransactions} transactions`,
            icon: <TrendingDown />,
            label: 'Total expense',
            tone: 'danger',
            value: formatCurrency(month.expense),
          },
          {
            change: `${savingsRate}% of income saved`,
            icon: <PiggyBank />,
            label: 'Net savings',
            tone: 'primary',
            value: formatCurrency(net),
          },
          {
            change: `${month.incomeTransactions + month.expenseTransactions} total entries`,
            icon: <ReceiptText />,
            label: 'Average expense',
            tone: 'info',
            value: formatCurrency(month.averageExpense),
          },
        ]}
      />

      <section className="grid gap-6 xl:grid-cols-2">
        <ReportCard
          badge={month.label}
          description="Key figures for this reporting period"
          title="Month summary"
        >
          <SummaryRows
            rows={[
              ['Total transactions', month.incomeTransactions + month.expenseTransactions],
              ['Income transactions', month.incomeTransactions],
              ['Expense transactions', month.expenseTransactions],
              ['Average expense', formatCurrency(month.averageExpense)],
              ['Largest expense', formatCurrency(month.largestExpense)],
              ['Most used category', month.mostUsedCategory],
            ]}
          />
        </ReportCard>

        <ReportCard description="Expense categories ranked by total spent" title="Top categories">
          <CategoryBars categories={month.categories} />
        </ReportCard>
      </section>

      <ReportCard
        badge={`${month.transactions.length} recent`}
        description={`Entries included in the ${month.label} summary`}
        padding="none"
        title="Report transactions"
      >
        <AppTable
          columns={transactionColumns}
          getRowKey={(row) => row.id}
          rows={month.transactions}
        />
      </ReportCard>
    </>
  );
}

function YearlyReportContent({
  data,
  summary,
  year,
}: {
  data: IncomeExpensePoint[];
  summary: CashFlowSummary;
  year: string;
}) {
  const populated = data.filter((point) => point.income != null || point.expense != null);
  const bestMonth = populated.reduce<IncomeExpensePoint | undefined>((best, point) => {
    if (!best) return point;
    const pointNet = (point.income ?? 0) - (point.expense ?? 0);
    const bestNet = (best.income ?? 0) - (best.expense ?? 0);
    return pointNet > bestNet ? point : best;
  }, undefined);
  const quarters = buildQuarterRows(data);

  return (
    <>
      <SummaryGrid
        items={[
          {
            change: `${populated.length} months recorded`,
            icon: <TrendingUp />,
            label: `Income · ${year}`,
            tone: 'success',
            value: formatCurrency(summary.income),
          },
          {
            change: `${formatCurrency(summary.averageExpense)} monthly average`,
            icon: <TrendingDown />,
            label: `Expense · ${year}`,
            tone: 'danger',
            value: formatCurrency(summary.expense),
          },
          {
            change: `${summary.savingsRate}% savings rate`,
            icon: <PiggyBank />,
            label: 'Net savings',
            tone: 'primary',
            value: formatCurrency(summary.net),
          },
          {
            change: 'Highest positive cash flow',
            icon: <Landmark />,
            label: 'Best month',
            tone: 'info',
            value: bestMonth?.label ?? '—',
          },
        ]}
      />

      <section className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
        <ReportCard
          badge={year}
          description="Monthly income and expense comparison"
          title="Yearly cash flow"
        >
          <FinanceBarChart data={data} />
        </ReportCard>
        <ReportCard description="A compact view of annual performance" title="Year at a glance">
          <SummaryRows
            rows={[
              ['Months recorded', populated.length],
              ['Average income', formatCurrency(summary.averageIncome)],
              ['Average expense', formatCurrency(summary.averageExpense)],
              ['Best savings month', bestMonth?.label ?? '—'],
              ['Savings rate', `${summary.savingsRate}%`],
            ]}
          />
        </ReportCard>
      </section>

      <ReportCard
        description="Quarterly totals and net performance"
        padding="none"
        title="Quarterly summary"
      >
        <AppTable columns={quarterColumns} getRowKey={(row) => row.quarter} rows={quarters} />
      </ReportCard>
    </>
  );
}

function CategoryReportContent({ month }: { month: (typeof reportMonths)[string] }) {
  const largest = month.categories[0];
  const average = month.categories.length ? Math.round(month.expense / month.categories.length) : 0;

  return (
    <>
      <SummaryGrid
        items={[
          {
            change: month.label,
            icon: <TrendingDown />,
            label: 'Categorized expense',
            tone: 'danger',
            value: formatCurrency(month.expense),
          },
          {
            change: largest
              ? `${Math.round((largest.value / month.expense) * 100)}% of spending`
              : 'No data',
            icon: <Layers3 />,
            label: 'Largest category',
            tone: 'warning',
            value: largest?.name ?? '—',
          },
          {
            change: 'Expense categories used',
            icon: <ReceiptText />,
            label: 'Active categories',
            tone: 'info',
            value: month.categories.length,
          },
          {
            change: 'Across active categories',
            icon: <WalletCards />,
            label: 'Average per category',
            tone: 'primary',
            value: formatCurrency(average),
          },
        ]}
      />

      <section className="grid min-w-0 gap-6 xl:grid-cols-[minmax(300px,1fr)_minmax(0,1.4fr)]">
        <ReportCard
          badge={month.label}
          description="Share of total monthly expenses"
          title="Category mix"
        >
          <CategoryPieChart
            centerLabel="Spent"
            centerValue={formatCurrency(month.expense)}
            data={month.categories}
            valuePrefix="৳"
          />
        </ReportCard>
        <ReportCard description="Every category ranked by spending" title="Category breakdown">
          <CategoryBars categories={month.categories} detailed />
        </ReportCard>
      </section>
    </>
  );
}

function TrendReportContent({ data, summary }: { data: TrendPoint[]; summary: CashFlowSummary }) {
  const activeDays = data.filter((point) => (point.income ?? 0) || (point.expense ?? 0)).length;

  return (
    <>
      <SummaryGrid
        items={[
          {
            change: `${data.length} calendar days`,
            icon: <TrendingUp />,
            label: 'Income in range',
            tone: 'success',
            value: formatCurrency(summary.income),
          },
          {
            change: `${formatCurrency(summary.averageExpense)} daily average`,
            icon: <TrendingDown />,
            label: 'Expense in range',
            tone: 'danger',
            value: formatCurrency(summary.expense),
          },
          {
            change: `${summary.savingsRate}% savings rate`,
            icon: <PiggyBank />,
            label: 'Net cash flow',
            tone: 'primary',
            value: formatCurrency(summary.net),
          },
          {
            change: `${data.length - activeDays} no-spend days`,
            icon: <CalendarRange />,
            label: 'Active days',
            tone: 'info',
            value: activeDays,
          },
        ]}
      />

      <ReportCard
        badge={`${data.length} days`}
        description="Income and expense movement for the selected range"
        title="Daily cash-flow trend"
      >
        <FinanceTrendChart data={data} />
      </ReportCard>

      <ReportCard
        description="Day-by-day totals in the selected range"
        padding="none"
        title="Daily details"
      >
        <AppTable
          columns={trendColumns}
          empty="No financial activity in this date range"
          getRowKey={(row) => row.date}
          rows={[...data].reverse()}
        />
      </ReportCard>
    </>
  );
}

type SummaryItem = {
  change: React.ReactNode;
  icon: React.ReactNode;
  label: React.ReactNode;
  tone: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  value: React.ReactNode;
};

function SummaryGrid({ items }: { items: SummaryItem[] }) {
  return (
    <section aria-label="Report summary" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <AppStatCard {...item} key={String(item.label)} />
      ))}
    </section>
  );
}

function ReportCard({
  badge,
  children,
  description,
  padding = 'md',
  title,
}: {
  badge?: string;
  children: React.ReactNode;
  description: string;
  padding?: 'none' | 'md';
  title: string;
}) {
  return (
    <AppCard className="min-w-0" padding={padding}>
      <div
        className={cn(
          'flex items-start justify-between gap-4',
          padding === 'none' ? 'p-5' : 'mb-4',
        )}
      >
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

function SummaryRows({ rows }: { rows: Array<[string, React.ReactNode]> }) {
  return (
    <div className="divide-y divide-border">
      {rows.map(([label, value]) => (
        <div
          className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
          key={label}
        >
          <span className="text-sm text-muted-foreground">{label}</span>
          <span className="text-sm font-semibold tabular-nums">{value}</span>
        </div>
      ))}
    </div>
  );
}

function CategoryBars({
  categories,
  detailed = false,
}: {
  categories: DistributionItem[];
  detailed?: boolean;
}) {
  const total = categories.reduce((sum, category) => sum + category.value, 0);

  return (
    <div className="space-y-4">
      {categories.map((category) => {
        const share = total ? Math.round((category.value / total) * 100) : 0;
        return (
          <div key={category.name}>
            <div className="mb-2 flex items-center gap-2 text-sm">
              <span className="size-2.5 rounded-full" style={{ backgroundColor: category.color }} />
              <span className="min-w-0 flex-1 truncate font-medium">{category.name}</span>
              {detailed ? <span className="text-xs text-muted-foreground">{share}%</span> : null}
              <span className="font-semibold tabular-nums">{formatCurrency(category.value)}</span>
            </div>
            <div
              aria-label={`${category.name}: ${share}%`}
              aria-valuemax={100}
              aria-valuemin={0}
              aria-valuenow={share}
              className="h-2 overflow-hidden rounded-full bg-muted"
              role="progressbar"
            >
              <div
                className="h-full rounded-full"
                style={{ backgroundColor: category.color, width: `${share}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

type CashFlowSummary = {
  averageExpense: number;
  averageIncome: number;
  expense: number;
  income: number;
  net: number;
  savingsRate: number;
};

function getCashFlowSummary(data: IncomeExpensePoint[]): CashFlowSummary {
  const populated = data.filter((point) => point.income != null || point.expense != null);
  const income = populated.reduce((sum, point) => sum + (point.income ?? 0), 0);
  const expense = populated.reduce((sum, point) => sum + (point.expense ?? 0), 0);
  const net = income - expense;
  return {
    income,
    expense,
    net,
    averageIncome: populated.length ? Math.round(income / populated.length) : 0,
    averageExpense: populated.length ? Math.round(expense / populated.length) : 0,
    savingsRate: income ? Math.round((net / income) * 100) : 0,
  };
}

function filterTrend(data: TrendPoint[], range: DateRange | undefined) {
  if (!range?.from) return data;
  const from = new Date(range.from);
  from.setHours(0, 0, 0, 0);
  const to = range.to ? new Date(range.to) : new Date(range.from);
  to.setHours(23, 59, 59, 999);
  return data.filter((point) => {
    const date = new Date(`${point.date}T00:00:00`);
    return date >= from && date <= to;
  });
}

type QuarterRow = {
  expense: number;
  income: number;
  net: number;
  quarter: string;
  status: 'Complete' | 'In progress' | 'Upcoming';
};

function buildQuarterRows(data: IncomeExpensePoint[]): QuarterRow[] {
  return [0, 1, 2, 3].map((quarterIndex) => {
    const points = data.slice(quarterIndex * 3, quarterIndex * 3 + 3);
    const summary = getCashFlowSummary(points);
    const recorded = points.filter((point) => point.income != null || point.expense != null).length;
    return {
      quarter: `Q${quarterIndex + 1}`,
      income: summary.income,
      expense: summary.expense,
      net: summary.net,
      status: recorded === 3 ? 'Complete' : recorded > 0 ? 'In progress' : 'Upcoming',
    };
  });
}

const quarterColumns: readonly AppTableColumn<QuarterRow>[] = [
  {
    header: 'Quarter',
    key: 'quarter',
    render: (row) => <span className="font-semibold">{row.quarter}</span>,
  },
  {
    header: 'Status',
    key: 'status',
    render: (row) => (
      <AppBadge
        status={
          row.status === 'Complete' ? 'success' : row.status === 'In progress' ? 'info' : 'neutral'
        }
      >
        {row.status}
      </AppBadge>
    ),
  },
  {
    align: 'right',
    header: 'Income',
    key: 'income',
    render: (row) => <span className="font-medium text-success">{formatCurrency(row.income)}</span>,
  },
  {
    align: 'right',
    header: 'Expense',
    key: 'expense',
    render: (row) => <span className="font-medium text-danger">{formatCurrency(row.expense)}</span>,
  },
  {
    align: 'right',
    header: 'Net',
    key: 'net',
    render: (row) => (
      <span className={cn('font-semibold', row.net >= 0 ? 'text-success' : 'text-danger')}>
        {formatCurrency(row.net)}
      </span>
    ),
  },
];

function buildCsv(
  view: ReportView,
  month: (typeof reportMonths)[string],
  yearData: IncomeExpensePoint[],
  trend: TrendPoint[],
) {
  if (view === 'yearly') {
    return [
      'Month,Income,Expense,Net',
      ...yearData.map(
        (point) =>
          `${point.label},${point.income ?? ''},${point.expense ?? ''},${(point.income ?? 0) - (point.expense ?? 0)}`,
      ),
    ].join('\n');
  }
  if (view === 'category') {
    return [
      'Category,Amount,Share',
      ...month.categories.map(
        (category) =>
          `${category.name},${category.value},${Math.round((category.value / month.expense) * 100)}%`,
      ),
    ].join('\n');
  }
  if (view === 'trend') {
    return [
      'Date,Income,Expense,Net',
      ...trend.map(
        (point) =>
          `${point.date},${point.income ?? 0},${point.expense ?? 0},${(point.income ?? 0) - (point.expense ?? 0)}`,
      ),
    ].join('\n');
  }
  return [
    'Date,Description,Category,Wallet,Type,Amount',
    ...month.transactions.map(
      (transaction) =>
        `${transaction.date},"${transaction.title}",${transaction.category},${transaction.wallet},${transaction.type},${transaction.amount}`,
    ),
  ].join('\n');
}
