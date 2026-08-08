'use client';

import { useEffect, useRef } from 'react';

import { echarts, type EChartsCoreOption } from '@/lib/echarts-client';
import { cn } from '@/lib/utils';

type EChartCanvasProps = {
  option: EChartsCoreOption;
  className?: string;
  ariaLabel: string;
};

export function EChartCanvas({ option, className, ariaLabel }: EChartCanvasProps) {
  const chartElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = chartElementRef.current;
    if (!element) return;

    const chart = echarts.init(element, undefined, { renderer: 'canvas' });
    chart.setOption(option);

    const resizeObserver = new ResizeObserver(() => chart.resize());
    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
      chart.dispose();
    };
  }, [option]);

  return (
    <div
      aria-label={ariaLabel}
      className={cn('h-72 min-w-0 w-full', className)}
      ref={chartElementRef}
      role="img"
    />
  );
}
