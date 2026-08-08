'use client';

import { useMemo } from 'react';

import { EChartCanvas } from '@/components/shared/charts/echart-canvas';

export function BudgetGaugeChart({ value }: { value: number }) {
  const safeValue = Math.max(0, Math.min(100, value));
  const option = useMemo(
    () => ({
      series: [
        {
          type: 'gauge' as const,
          startAngle: 210,
          endAngle: -30,
          min: 0,
          max: 100,
          pointer: { show: false },
          progress: {
            show: true,
            width: 12,
            roundCap: true,
            itemStyle: { color: safeValue > 85 ? '#ef4444' : '#6366f1' },
          },
          axisLine: { lineStyle: { width: 12, color: [[1, '#e2e8f0']] } },
          axisTick: { show: false },
          splitLine: { show: false },
          axisLabel: { show: false },
          detail: {
            valueAnimation: true,
            formatter: '{value}%',
            color: '#0f172a',
            fontSize: 22,
            offsetCenter: [0, '5%'],
          },
          data: [{ value: safeValue }],
        },
      ],
    }),
    [safeValue],
  );

  return (
    <EChartCanvas ariaLabel={`Budget is ${safeValue}% used`} className="h-44" option={option} />
  );
}
