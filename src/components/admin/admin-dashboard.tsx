import { Activity, ArrowRight, BadgeDollarSign, Server, UserMinus, Users } from 'lucide-react';
import Link from 'next/link';

import { CategoryPieChart, DailyTrendLineChart } from '@/components/shared/charts/dashboard-charts';
import { AppBadge, AppButton, AppCard, AppPageHeader, AppStatCard } from '@/components/app-ui';
import type { AdminActivityItem, AdminDashboardData } from '@/types/dashboard-models';

const metricIcons = [Users, BadgeDollarSign, Activity, UserMinus];
const currencyFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 0,
});

export function AdminDashboard({ data }: { data: AdminDashboardData }) {
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
            centerLabel="Users"
            centerValue={currencyFormatter.format(userTotal)}
            data={data.plans}
          />
        </AdminCard>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <ActivityCard
          action="View all"
          description="Newest members joining MoneyBag"
          href="/admin/users"
          items={data.recentSignups}
          title="Recent signups"
        />
        <ActivityCard
          action="Subscriptions"
          description="Latest successful payments"
          href="/admin/subscriptions"
          items={data.recentPayments}
          title="Recent payments"
        />
      </section>

      <AdminCard
        action="Open health monitor"
        description="Live status of platform dependencies"
        href="/admin/system-health"
        title="System health"
      >
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {data.services.map((service) => (
            <AppCard className="bg-muted/35" key={service.id} padding="sm">
              <div className="flex items-center justify-between gap-3">
                <span className="grid size-9 place-items-center rounded-lg bg-success-soft text-success">
                  <Server className="size-4" />
                </span>
                <AppBadge className="gap-1.5" status="success">
                  <i className="size-1.5 rounded-full bg-success" />
                  {service.status}
                </AppBadge>
              </div>
              <p className="mt-4 text-sm font-semibold">{service.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">{service.detail}</p>
            </AppCard>
          ))}
        </div>
      </AdminCard>
    </div>
  );
}

function AdminCard({
  title,
  description,
  href,
  action,
  children,
}: {
  title: string;
  description: string;
  href?: string;
  action?: string;
  children: React.ReactNode;
}) {
  return (
    <AppCard className="min-w-0" padding="md">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="font-semibold">{title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
        {href && action ? (
          <AppButton nativeButton={false} render={<Link href={href} />} size="sm" tone="secondary">
            {action}
            <ArrowRight data-icon="inline-end" />
          </AppButton>
        ) : null}
      </div>
      {children}
    </AppCard>
  );
}

function ActivityCard({
  title,
  description,
  href,
  action,
  items,
}: {
  title: string;
  description: string;
  href: string;
  action: string;
  items: AdminActivityItem[];
}) {
  return (
    <AdminCard action={action} description={description} href={href} title={title}>
      <div className="-mx-5 -mb-5 divide-y divide-border">
        {items.map((item) => (
          <div className="flex items-center gap-3 px-5 py-3.5" key={item.id}>
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
              {item.initials}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium">{item.name}</span>
              <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                {item.meta} · {item.timestamp}
              </span>
            </span>
            {item.amount ? (
              <span className="shrink-0 text-sm font-semibold text-success">
                +৳{currencyFormatter.format(item.amount)}
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </AdminCard>
  );
}
