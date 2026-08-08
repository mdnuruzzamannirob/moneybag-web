'use client';

import { useEffect, useMemo, useState } from 'react';

import { EChartCanvas } from '@/components/shared/charts/echart-canvas';
import type {
  DistributionItem,
  IncomeExpensePoint,
  UserGrowthPoint,
} from '@/types/dashboard-models';

type ChartTheme = {
  card: string;
  border: string;
  primary: string;
  text: string;
  textMuted: string;
  textSubtle: string;
  success: string;
  danger: string;
};

const fallbackChartTheme: ChartTheme = {
  card: '#ffffff',
  border: '#e2e8f0',
  primary: '#4f46e5',
  text: '#0f172a',
  textMuted: '#64748b',
  textSubtle: '#94a3b8',
  success: '#10b981',
  danger: '#ef4444',
};

function readChartTheme() {
  const styles = getComputedStyle(document.documentElement);
  const token = (name: string, fallback: string) =>
    styles.getPropertyValue(name).trim() || fallback;
  return {
    card: token('--color-card', fallbackChartTheme.card),
    border: token('--color-border', fallbackChartTheme.border),
    primary: token('--color-primary', fallbackChartTheme.primary),
    text: token('--color-text', fallbackChartTheme.text),
    textMuted: token('--color-text-muted', fallbackChartTheme.textMuted),
    textSubtle: token('--color-text-subtle', fallbackChartTheme.textSubtle),
    success: token('--color-success', fallbackChartTheme.success),
    danger: token('--color-danger', fallbackChartTheme.danger),
  };
}

function useChartTheme() {
  const [theme, setTheme] = useState(fallbackChartTheme);

  useEffect(() => {
    const update = () => setTheme(readChartTheme());
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return theme;
}

function withAlpha(color: string, alpha: number) {
  if (!color.startsWith('#')) return color;
  const hex = color.slice(1);
  const normalized =
    hex.length === 3
      ? hex
          .split('')
          .map((part) => part + part)
          .join('')
      : hex;
  const value = Number.parseInt(normalized, 16);
  return `rgba(${value >> 16}, ${(value >> 8) & 255}, ${value & 255}, ${alpha})`;
}

function getAxisLabel(theme: ChartTheme) {
  return { color: theme.textMuted, fontSize: 11 };
}

function getSplitLine(theme: ChartTheme) {
  return { lineStyle: { color: withAlpha(theme.border, 0.8), type: 'dashed' as const } };
}

function getTooltip(theme: ChartTheme) {
  return {
    trigger: 'axis' as const,
    backgroundColor: theme.card,
    borderColor: theme.border,
    borderWidth: 1,
    textStyle: { color: theme.text, fontSize: 12 },
  };
}

export function IncomeExpenseChartModule({ data }: { data: IncomeExpensePoint[] }) {
  const theme = useChartTheme();
  const option = useMemo(
    () => ({
      animationDuration: 550,
      color: [theme.success, theme.danger],
      grid: { left: 8, right: 8, top: 16, bottom: 32, containLabel: true },
      legend: {
        bottom: 0,
        left: 'center',
        itemWidth: 9,
        itemHeight: 9,
        textStyle: getAxisLabel(theme),
      },
      tooltip: {
        ...getTooltip(theme),
        valueFormatter: (value: number | null | undefined) =>
          value == null ? 'No data' : '\u09F3' + String(value.toLocaleString('en-US')),
      },
      xAxis: {
        type: 'category' as const,
        data: data.map((point) => point.label),
        axisLabel: getAxisLabel(theme),
        axisLine: { lineStyle: { color: theme.border } },
        axisTick: { show: false },
      },
      yAxis: {
        type: 'value' as const,
        axisLabel: {
          ...getAxisLabel(theme),
          formatter: (value: number) => (value >= 1000 ? `${value / 1000}k` : value),
        },
        splitLine: getSplitLine(theme),
      },
      series: [
        {
          name: 'Income',
          type: 'bar' as const,
          data: data.map((point) => point.income),
          barMaxWidth: 14,
          itemStyle: { borderRadius: [4, 4, 0, 0] },
        },
        {
          name: 'Expense',
          type: 'bar' as const,
          data: data.map((point) => point.expense),
          barMaxWidth: 14,
          itemStyle: { borderRadius: [4, 4, 0, 0] },
        },
      ],
    }),
    [data, theme],
  );

  return <EChartCanvas ariaLabel="Income and expense grouped bar chart" option={option} />;
}

export function FinanceTrendChartModule({ data }: { data: IncomeExpensePoint[] }) {
  const theme = useChartTheme();
  const option = useMemo(
    () => ({
      animationDuration: 600,
      color: [theme.success, theme.danger],
      grid: { left: 8, right: 12, top: 24, bottom: 36, containLabel: true },
      legend: {
        bottom: 0,
        left: 'center',
        itemWidth: 9,
        itemHeight: 9,
        textStyle: getAxisLabel(theme),
      },
      tooltip: {
        ...getTooltip(theme),
        valueFormatter: (value: number | null | undefined) =>
          value == null ? 'No data' : `৳${value.toLocaleString('en-US')}`,
      },
      xAxis: {
        type: 'category' as const,
        boundaryGap: false,
        data: data.map((point) => point.label),
        axisLabel: { ...getAxisLabel(theme), hideOverlap: true },
        axisLine: { lineStyle: { color: theme.border } },
        axisTick: { show: false },
      },
      yAxis: {
        type: 'value' as const,
        axisLabel: {
          ...getAxisLabel(theme),
          formatter: (value: number) => (value >= 1000 ? `${value / 1000}k` : value),
        },
        splitLine: getSplitLine(theme),
      },
      series: [
        {
          name: 'Income',
          type: 'line' as const,
          smooth: 0.35,
          symbol: 'circle',
          symbolSize: 6,
          lineStyle: { width: 2.5 },
          itemStyle: { borderWidth: 2, borderColor: theme.card },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: withAlpha(theme.success, 0.24) },
                { offset: 1, color: withAlpha(theme.success, 0.01) },
              ],
            },
          },
          data: data.map((point) => point.income),
        },
        {
          name: 'Expense',
          type: 'line' as const,
          smooth: 0.35,
          symbol: 'circle',
          symbolSize: 6,
          lineStyle: { width: 2.5 },
          itemStyle: { borderWidth: 2, borderColor: theme.card },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: withAlpha(theme.danger, 0.18) },
                { offset: 1, color: withAlpha(theme.danger, 0.01) },
              ],
            },
          },
          data: data.map((point) => point.expense),
        },
      ],
    }),
    [data, theme],
  );

  return <EChartCanvas ariaLabel="Income and expense daily trend chart" option={option} />;
}

export function DistributionChartModule({
  data,
  centerLabel,
  centerValue,
  valuePrefix,
}: {
  data: DistributionItem[];
  centerLabel: string;
  centerValue: string;
  valuePrefix: string;
}) {
  const theme = useChartTheme();
  const option = useMemo(
    () => ({
      animationDuration: 550,
      color: data.map((item) => item.color),
      tooltip: {
        trigger: 'item' as const,
        backgroundColor: theme.card,
        borderColor: theme.border,
        borderWidth: 1,
        textStyle: { color: theme.text, fontSize: 12 },
        valueFormatter: (value: number) => `${valuePrefix}${value.toLocaleString('en-US')}`,
      },
      title: {
        text: centerValue,
        subtext: centerLabel,
        left: '34%',
        top: '39%',
        textAlign: 'center' as const,
        textStyle: { color: theme.textMuted, fontSize: 18, fontWeight: 600 },
        subtextStyle: { color: theme.textSubtle, fontSize: 11 },
      },
      legend: {
        orient: 'vertical' as const,
        right: 0,
        top: 'middle',
        icon: 'circle',
        itemWidth: 8,
        itemHeight: 8,
        itemGap: 13,
        formatter: (name: string) => `{name|${name}}`,
        textStyle: {
          ...getAxisLabel(theme),
          rich: {
            name: { color: theme.textSubtle, fontSize: 11 },
          },
        },
      },
      series: [
        {
          name: centerLabel,
          type: 'pie' as const,
          radius: ['56%', '78%'],
          center: ['34%', '50%'],
          avoidLabelOverlap: true,
          label: { show: false },
          emphasis: { scaleSize: 5 },
          data,
        },
      ],
    }),
    [centerLabel, centerValue, data, theme, valuePrefix],
  );

  return <EChartCanvas ariaLabel={`${centerLabel} donut chart`} className="h-64" option={option} />;
}

export function UserGrowthChartModule({ data }: { data: UserGrowthPoint[] }) {
  const theme = useChartTheme();
  const option = useMemo(
    () => ({
      animationDuration: 600,
      color: [theme.primary],
      grid: { left: 8, right: 12, top: 18, bottom: 4, containLabel: true },
      tooltip: {
        ...getTooltip(theme),
        valueFormatter: (value: number | null | undefined) =>
          value == null ? 'No data' : String(value.toLocaleString('en-US')) + ' users',
      },
      xAxis: {
        type: 'category' as const,
        boundaryGap: false,
        data: data.map((point) => point.label),
        axisLabel: getAxisLabel(theme),
        axisLine: { lineStyle: { color: theme.border } },
        axisTick: { show: false },
      },
      yAxis: {
        type: 'value' as const,
        axisLabel: getAxisLabel(theme),
        splitLine: getSplitLine(theme),
      },
      series: [
        {
          name: 'New users',
          type: 'line' as const,
          smooth: 0.35,
          symbol: 'circle',
          symbolSize: 7,
          lineStyle: { width: 3 },
          itemStyle: { borderWidth: 2, borderColor: theme.card },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: withAlpha(theme.primary, 0.32) },
                { offset: 1, color: withAlpha(theme.primary, 0.02) },
              ],
            },
          },
          data: data.map((point) => point.users),
        },
      ],
    }),
    [data, theme],
  );

  return <EChartCanvas ariaLabel="Monthly user growth line chart" option={option} />;
}
