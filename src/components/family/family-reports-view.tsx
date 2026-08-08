'use client';

import { AppBadge, AppButton, AppCard, AppPageHeader, AppStatCard } from '@/components/app-ui';
import { Download, FileDown, Landmark, PiggyBank, TrendingDown, TrendingUp } from 'lucide-react';
import {
  CategoryPieChart,
  IncomeExpenseBarChart,
} from '@/components/shared/charts/dashboard-charts';
import { familyDashboardDemoData } from '@/lib/dashboard-data';

const numberFormatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
const formatCurrency = (value: number) => `৳${numberFormatter.format(value)}`;

export function FamilyReportsView() {
  const data = familyDashboardDemoData;
  const categoryTotal = data.categories.reduce((total, category) => total + category.value, 0);

  return (
    <div className="space-y-6">
      <AppPageHeader
        title="Family reports & analytics"
        description="Comprehensive category breakdowns and member spending analytics."
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
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AppStatCard icon={<TrendingUp />} label="Family income" tone="success" value="৳128,500" />
        <AppStatCard icon={<TrendingDown />} label="Family expense" tone="danger" value="৳42,300" />
        <AppStatCard
          icon={<PiggyBank />}
          label="Net group savings"
          tone="primary"
          value="৳86,200"
        />
        <AppStatCard icon={<Landmark />} label="Savings rate" tone="warning" value="67%" />
      </section>

      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <AppCard>
          <h3 className="mb-4 text-base font-semibold">Income vs Expense Trend</h3>
          <IncomeExpenseBarChart dataByYear={data.cashFlowByYear} />
        </AppCard>

        <AppCard>
          <h3 className="mb-4 text-base font-semibold">Category Breakdown</h3>
          <CategoryPieChart
            centerLabel="Total Spent"
            centerValue={formatCurrency(categoryTotal)}
            data={data.categories}
            valuePrefix="৳"
          />
        </AppCard>
      </div>
    </div>
  );
}
