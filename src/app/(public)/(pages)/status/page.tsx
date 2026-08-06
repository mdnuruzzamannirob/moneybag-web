import { AppBadge, AppProgress } from '@/components/app-ui';
import { notFound } from 'next/navigation';
import { MarketingCard, PageHero } from '@/components/public/public-ui';
import { CheckCircle2 } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'System Status',
  description: 'MoneyBag service availability, uptime, and recent incident history.',
};

const services = [
  ['API', 'moneybag.app/api'],
  ['Web app', 'app.moneybag.app'],
  ['Database', 'PostgreSQL cluster'],
  ['Email delivery', 'Transactional emails'],
  ['Payment processing', 'Secure payment provider'],
  ['File storage', 'Receipt uploads'],
] as const;

export default function StatusPage() {
  // Disabled until metrics come from a verified public status service.
  notFound();

  return (
    <>
      <PageHero
        compact
        description="Current availability across the MoneyBag platform and its supporting services."
        eyebrow="ALL SYSTEMS OPERATIONAL"
        icon={
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-70" />
            <span className="relative inline-flex size-2 rounded-full bg-success" />
          </span>
        }
        title="System status"
        tone="success"
      />

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: 'Overall uptime', note: 'Last 90 days', value: '99.98%', progress: 99.98 },
            { label: 'Avg. response time', note: 'Last 24 hours', value: '12ms', progress: 92 },
            { label: 'Incidents', note: 'No downtime in July', value: '0', progress: 100 },
          ].map((stat) => (
            <MarketingCard className="text-center" key={stat.label} padding="md">
              <p className="text-3xl font-bold text-success">{stat.value}</p>
              <h2 className="mt-1 text-sm font-bold">{stat.label}</h2>
              <p className="mt-1 text-xs text-muted-foreground">{stat.note}</p>
              <AppProgress className="mt-4" tone="success" value={stat.progress} />
            </MarketingCard>
          ))}
        </div>

        <div className="mb-4 mt-10 flex items-center justify-between gap-3">
          <h2 className="text-xl font-bold">Services</h2>
          <AppBadge status="success">6 OPERATIONAL</AppBadge>
        </div>
        <div className="space-y-3">
          {services.map(([name, description]) => (
            <MarketingCard
              className="flex items-center justify-between gap-4"
              key={name}
              padding="sm"
            >
              <div className="flex items-center gap-3">
                <span className="size-3 shrink-0 rounded-full bg-success" />
                <div>
                  <p className="text-sm font-semibold">{name}</p>
                  <p className="text-xs text-muted-foreground">{description}</p>
                </div>
              </div>
              <span className="text-xs font-bold text-success">Operational</span>
            </MarketingCard>
          ))}
        </div>

        <h2 className="mb-4 mt-16 text-xl font-bold lg:mt-20">Incident history</h2>
        <MarketingCard className="text-center">
          <span className="mx-auto grid size-12 place-items-center rounded-full bg-success-soft text-success">
            <CheckCircle2 className="size-6" />
          </span>
          <h3 className="mt-4 font-bold">No incidents in the last 90 days</h3>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
            All services are running smoothly. Status updates will appear here if that changes.
          </p>
        </MarketingCard>
        <p className="mt-5 text-center text-xs text-muted-foreground">
          Status values shown here are the current public product snapshot.
        </p>
      </section>
    </>
  );
}
