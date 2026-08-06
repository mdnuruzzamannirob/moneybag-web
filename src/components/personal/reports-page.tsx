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

import {
  AppBadge,
  AppButton,
  AppCard,
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
import type { DistributionItem } from '@/types/dashboard-models';
import type { ReportTransaction, ReportView } from '@/types/report-models';

const numberFormatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
const formatCurrency = (value: number) => `৳${numberFormatter.format(value)}`;

const reportViews = [
  { label: 'Monthly', value: 'monthly' },
  { label: 'Yearly', value: 'yearly' },
  { label: 'Categories', value: 'category' },
  { label: 'Daily trend', value: 'trend' },
] as const;

const firstMonthKey = Object.values(reportMonths)[0]?.key ?? '2026-07';

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
      <div>
        <p className="text-sm font-medium text-foreground">{row.title}</p>
        <p className="text-xs text-muted-foreground">{row.wallet}</p>
      </div>
    ),
  },
  {
    header: 'Category',
    key: 'category',
    render: (row) => (
      <AppBadge className="rounded-md" status="neutral">
        {row.category}
      </AppBadge>
    ),
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
        className={cn('font-semibold', row.type === 'income' ? 'text-success' : 'text-foreground')}
      >
        {row.type === 'income' ? '+' : '-'}
        {formatCurrency(row.amount)}
      </span>
    ),
  },
];

export function ReportsPage() {
  const [activeView, setActiveView] = useState<ReportView>('monthly');
  const [selectedMonth, setSelectedMonth] = useState(firstMonthKey);
  const [selectedYear, setSelectedYear] = useState('2026');

  const monthReport = reportMonths[selectedMonth] ?? Object.values(reportMonths)[0];
  const yearReport = yearlyCashFlow[selectedYear] ?? yearlyCashFlow['2026'];

  const categoryDistribution = useMemo(() => {
    const map = new Map<string, { color: string; value: number }>();
    if (!monthReport) return [];
    monthReport.transactions.forEach((tx) => {
      if (tx.type === 'expense') {
        const existing = map.get(tx.category);
        const currentVal = existing?.value ?? 0;
        map.set(tx.category, {
          color: tx.color,
          value: currentVal + tx.amount,
        });
      }
    });
    const result: DistributionItem[] = [];
    map.forEach((data, categoryName) => {
      result.push({
        color: data.color,
        name: categoryName,
        value: data.value,
      });
    });
    return result;
  }, [monthReport]);

  const netSavings = monthReport ? monthReport.income - monthReport.expense : 0;
  const savingsRate =
    monthReport && monthReport.income > 0 ? Math.round((netSavings / monthReport.income) * 100) : 0;

  return (
    <div className="space-y-6">
      <AppPageHeader
        actions={
          <>
            <AppButton size="sm" tone="secondary">
              <Download /> Export PDF
            </AppButton>
            <AppButton size="sm">
              <FileDown /> Export CSV
            </AppButton>
          </>
        }
        description="Detailed breakdown of income, expenses, trends, and category distribution."
        title="Reports & Analytics"
      />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <AppSegmentedControl
          onValueChange={(val) => val && setActiveView(val as ReportView)}
          options={reportViews.map((v) => ({ label: v.label, value: v.value }))}
          value={activeView}
        />
        {activeView === 'monthly' && (
          <AppSelect
            onValueChange={(val) => val && setSelectedMonth(val)}
            options={monthOptions}
            value={selectedMonth}
          />
        )}
        {activeView === 'yearly' && (
          <AppSelect
            onValueChange={(val) => val && setSelectedYear(val)}
            options={yearOptions}
            value={selectedYear}
          />
        )}
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AppStatCard
          icon={<TrendingUp />}
          label="Total Income"
          tone="success"
          value={formatCurrency(monthReport.income)}
        />
        <AppStatCard
          icon={<TrendingDown />}
          label="Total Expense"
          tone="danger"
          value={formatCurrency(monthReport.expense)}
        />
        <AppStatCard
          icon={<PiggyBank />}
          label="Net Savings"
          tone={netSavings >= 0 ? 'primary' : 'danger'}
          value={formatCurrency(netSavings)}
        />
        <AppStatCard
          icon={<Landmark />}
          label="Savings Rate"
          tone="warning"
          value={`${savingsRate}%`}
        />
      </section>

      {activeView === 'monthly' && (
        <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
          <AppCard>
            <h3 className="mb-4 text-base font-semibold">Category Distribution</h3>
            <CategoryPieChart
              centerLabel="Total Spent"
              centerValue={formatCurrency(monthReport.expense)}
              data={categoryDistribution}
              valuePrefix="৳"
            />
          </AppCard>

          <AppCard>
            <h3 className="mb-4 text-base font-semibold">Recent Report Transactions</h3>
            <AppTable<ReportTransaction>
              columns={transactionColumns}
              rows={monthReport.transactions}
              getRowKey={(r) => r.id}
            />
          </AppCard>
        </div>
      )}

      {activeView === 'yearly' && (
        <AppCard>
          <h3 className="mb-4 text-base font-semibold">Yearly Cash Flow ({selectedYear})</h3>
          <FinanceBarChart data={yearReport} />
        </AppCard>
      )}

      {activeView === 'trend' && (
        <AppCard>
          <h3 className="mb-4 text-base font-semibold">Daily Spending Trend</h3>
          <FinanceTrendChart data={dailyTrend} />
        </AppCard>
      )}
    </div>
  );
}
