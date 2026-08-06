'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

import { AppSelect } from '@/components/app-ui';
import type {
  DistributionItem,
  IncomeExpensePoint,
  UserGrowthPoint,
} from '@/types/dashboard-models';

function ChartSkeleton({ className = 'h-72' }: { className?: string }) {
  return (
    <div
      className={`${className} animate-pulse rounded-lg bg-linear-to-b from-muted/80 to-muted/30`}
    />
  );
}

const IncomeExpenseChart = dynamic(
  () =>
    import('@/components/shared/charts/income-expense-bar-chart').then(
      (module) => module.IncomeExpenseBarChart,
    ),
  { ssr: false, loading: () => <ChartSkeleton /> },
);

const DistributionChart = dynamic(
  () =>
    import('@/components/shared/charts/category-pie-chart').then(
      (module) => module.CategoryPieChart,
    ),
  { ssr: false, loading: () => <ChartSkeleton className="h-64" /> },
);

const UserGrowthChart = dynamic(
  () =>
    import('@/components/shared/charts/daily-trend-line-chart').then(
      (module) => module.DailyTrendLineChart,
    ),
  { ssr: false, loading: () => <ChartSkeleton /> },
);

export function IncomeExpenseBarChart({
  dataByYear,
}: {
  dataByYear: Record<string, IncomeExpensePoint[]>;
}) {
  const [year, setYear] = useState(() => getYears(dataByYear)[0]);

  return (
    <YearChartFrame onYearChange={setYear} year={year} years={getYears(dataByYear)}>
      <IncomeExpenseChart data={dataByYear[year] ?? []} />
    </YearChartFrame>
  );
}

export function CategoryPieChart({
  data,
  centerLabel,
  centerValue,
  valuePrefix = '',
}: {
  data: DistributionItem[];
  centerLabel: string;
  centerValue: string;
  valuePrefix?: string;
}) {
  return (
    <DistributionChart
      centerLabel={centerLabel}
      centerValue={centerValue}
      data={data}
      valuePrefix={valuePrefix}
    />
  );
}

export function DailyTrendLineChart({
  dataByYear,
}: {
  dataByYear: Record<string, UserGrowthPoint[]>;
}) {
  const [year, setYear] = useState(() => getYears(dataByYear)[0]);

  return (
    <YearChartFrame onYearChange={setYear} year={year} years={getYears(dataByYear)}>
      <UserGrowthChart data={dataByYear[year] ?? []} />
    </YearChartFrame>
  );
}

function getYears<T>(dataByYear: Record<string, T[]>) {
  return Object.keys(dataByYear).sort((a, b) => Number(b) - Number(a));
}

function YearChartFrame({
  children,
  year,
  years,
  onYearChange,
}: {
  children: React.ReactNode;
  year: string;
  years: string[];
  onYearChange: (year: string) => void;
}) {
  return (
    <div className="relative -mt-15 pt-15">
      <div className="absolute right-0 top-0 flex justify-end">
        <AppSelect
          ariaLabel="Select chart year"
          onValueChange={(value) => value && onYearChange(value)}
          options={years.map((option) => ({ label: option, value: option }))}
          size="sm"
          triggerClassName="!h-8 !min-h-8 w-24 px-2.5 text-xs font-medium"
          value={year}
        />
      </div>
      {children}
    </div>
  );
}
