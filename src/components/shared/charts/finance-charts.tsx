'use client';

import dynamic from 'next/dynamic';

import type { IncomeExpensePoint } from '@/types/dashboard-models';

function ChartSkeleton() {
  return <div className="h-72 animate-pulse rounded-lg bg-linear-to-b from-muted/80 to-muted/30" />;
}

const CashFlowBars = dynamic(
  () =>
    import('@/components/shared/charts/dashboard-chart-modules').then(
      (module) => module.IncomeExpenseChartModule,
    ),
  { ssr: false, loading: () => <ChartSkeleton /> },
);

const CashFlowTrend = dynamic(
  () =>
    import('@/components/shared/charts/dashboard-chart-modules').then(
      (module) => module.FinanceTrendChartModule,
    ),
  { ssr: false, loading: () => <ChartSkeleton /> },
);

export function FinanceBarChart({ data }: { data: IncomeExpensePoint[] }) {
  return <CashFlowBars data={data} />;
}

export function FinanceTrendChart({ data }: { data: IncomeExpensePoint[] }) {
  return <CashFlowTrend data={data} />;
}
