'use client';

import { AppButton, AppCard, AppPageHeader, AppStatCard } from '@/components/app-ui';
import { Download, FileDown, TrendingUp, Users, DollarSign, Activity } from 'lucide-react';
import { DailyTrendLineChart, CategoryPieChart } from '@/components/shared/charts/dashboard-charts';
import { adminDashboardDemoData } from '@/lib/dashboard-data';

export function AdminReportsView() {
  const data = adminDashboardDemoData;

  return (
    <div className="space-y-6">
      <AppPageHeader
        title="Platform reports & growth"
        description="Monitor user registration velocity, recurring revenue metrics, and system adoption."
        actions={
          <AppButton size="sm">
            <Download /> Export platform report
          </AppButton>
        }
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AppStatCard icon={<Users />} label="Total registrations" tone="primary" value="3,248" />
        <AppStatCard icon={<DollarSign />} label="MRR (Monthly)" tone="success" value="৳486,240" />
        <AppStatCard icon={<Activity />} label="Daily active users" tone="warning" value="1,284" />
        <AppStatCard icon={<TrendingUp />} label="MoM user growth" tone="success" value="+12.4%" />
      </section>

      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <AppCard>
          <h3 className="mb-4 text-base font-semibold">User Growth Over Time</h3>
          <DailyTrendLineChart dataByYear={data.userGrowthByYear} />
        </AppCard>

        <AppCard>
          <h3 className="mb-4 text-base font-semibold">Plan Subscriber Distribution</h3>
          <CategoryPieChart centerLabel="Subscribers" centerValue="3,248" data={data.plans} />
        </AppCard>
      </div>
    </div>
  );
}
