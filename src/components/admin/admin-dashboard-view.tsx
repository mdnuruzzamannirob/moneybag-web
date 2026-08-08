'use client';

import { Activity, ArrowRight, BadgeDollarSign, Server, UserMinus, Users } from 'lucide-react';
import Link from 'next/link';

import { CategoryPieChart, DailyTrendLineChart } from '@/components/shared/charts/dashboard-charts';
import { AppBadge, AppButton, AppCard, AppPageHeader, AppStatCard } from '@/components/app-ui';
import type { AdminActivityItem, AdminDashboardData } from '@/types/dashboard-models';

const metricIcons = [Users, BadgeDollarSign, Activity, UserMinus];
const currencyFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 0,
});

export function AdminDashboardView({ data }: { data: AdminDashboardData }) {
  const userTotal = data.plans.reduce((total, plan) => total + plan.value, 0);

  return (
    <div className="space-y-6">
      <AppPageHeader
        description="Monitor MoneyBag growth, subscriptions and system health."
        title={
          <>
            <span className="mb-1 block text-sm font-medium text-primary">
              Tuesday, July 28, 2026
            </span>
            Admin dashboard
          </>
        }
        actions={
          <AppButton nativeButton={false} render={<Link href="/admin/reports" />} size="sm">
            Open full report
          </AppButton>
        }
      />

      <section aria-label="Platform metrics" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {data.metrics.map((metric, index) => {
          const Icon = metricIcons[index] ?? Activity;
          return (
            <AppStatCard
              icon={<Icon />}
              key={metric.id}
              label={metric.label}
              value={metric.value}
              change={metric.change}
              tone={metric.tone === 'accent' ? 'primary' : metric.tone}
            />
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
        <AdminCard description="New registrations · last 12 months" title="User growth">
          <DailyTrendLineChart dataByYear={data.userGrowthByYear} />
        </AdminCard>
        <AdminCard
          action="View plans"
          description="Current subscriber mix"
          href="/admin/plans"
          title="Plan distribution"
        >
          <CategoryPieChart
            centerLabel="Subscribers"
            centerValue={userTotal.toLocaleString()}
            data={data.plans}
          />
        </AdminCard>
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <AdminCard
          action="Manage users"
          description="Latest account creations"
          href="/admin/users"
          title="Recent signups"
        >
          <div className="-mx-5 -mb-5 divide-y divide-border">
            {data.recentSignups.map((item) => (
              <ActivityRow activity={item} key={item.id} />
            ))}
          </div>
        </AdminCard>

        <AdminCard
          action="View log"
          description="Successful subscription charges"
          href="/admin/subscriptions"
          title="Recent payments"
        >
          <div className="-mx-5 -mb-5 divide-y divide-border">
            {data.recentPayments.map((item) => (
              <PaymentRow activity={item} key={item.id} />
            ))}
          </div>
        </AdminCard>

        <AdminCard
          action="System health"
          description="Core platform components"
          href="/admin/system-health"
          title="Service status"
        >
          <div className="-mx-5 -mb-5 divide-y divide-border">
            {data.services.map((service) => (
              <ServiceRow key={service.id} service={service} />
            ))}
          </div>
        </AdminCard>
      </section>
    </div>
  );
}

function AdminCard({
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

function ActivityRow({ activity }: { activity: AdminActivityItem }) {
  return (
    <div className="flex items-center gap-3 px-5 py-3.5">
      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
        {activity.initials}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{activity.name}</p>
        <p className="truncate text-xs text-muted-foreground">{activity.meta}</p>
      </div>
      <span className="shrink-0 text-xs text-muted-foreground">{activity.timestamp}</span>
    </div>
  );
}

function PaymentRow({ activity }: { activity: AdminActivityItem & { amount?: number } }) {
  return (
    <div className="flex items-center gap-3 px-5 py-3.5">
      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-success/10 text-xs font-semibold text-success">
        {activity.initials}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{activity.name}</p>
        <p className="truncate text-xs text-muted-foreground">{activity.meta}</p>
      </div>
      <div className="text-right">
        {activity.amount !== undefined ? (
          <p className="text-sm font-semibold text-success">
            ৳{currencyFormatter.format(activity.amount)}
          </p>
        ) : null}
        <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
      </div>
    </div>
  );
}

function ServiceRow({ service }: { service: AdminDashboardData['services'][number] }) {
  return (
    <div className="flex items-center gap-3 px-5 py-3.5">
      <Server className="size-4 shrink-0 text-muted-foreground" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{service.name}</p>
        <p className="truncate text-xs text-muted-foreground">{service.detail}</p>
      </div>
      <AppBadge status={service.status === 'healthy' ? 'success' : 'warning'}>
        {service.status}
      </AppBadge>
    </div>
  );
}

export { AdminDashboardView as AdminDashboard };
