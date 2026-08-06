import { AppBadge } from '@/components/app-ui';
import {
  FeatureIcon,
  MarketingCard,
  PageHero,
  TextLink,
  TrialCta,
} from '@/components/public/public-ui';
import { CalendarDays, CheckCircle2, FileSpreadsheet, PlugZap, Webhook } from 'lucide-react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Integrations',
  description: 'Connect banks, import CSV files, and connect MoneyBag to the tools you use.',
};

const banks = [
  ['CH', 'Chase'],
  ['BA', 'Bank of America'],
  ['WF', 'Wells Fargo'],
  ['CO', 'Capital One'],
  ['HS', 'HSBC'],
  ['BR', 'Barclays'],
  ['DB', 'Deutsche Bank'],
  ['SG', 'Société Générale'],
  ['RV', 'Revolut'],
  ['N2', 'N26'],
  ['MZ', 'Monzo'],
  ['+', '2,489 more'],
] as const;

const stack = [
  {
    icon: FileSpreadsheet,
    name: 'Google Sheets',
    text: 'Push transactions to your own spreadsheet.',
    status: 'Available',
    badge: 'success' as const,
    tone: 'success' as const,
  },
  {
    icon: CalendarDays,
    name: 'Google Calendar',
    text: 'Put bill reminders on your calendar.',
    status: 'Coming Q3',
    badge: 'warning' as const,
    tone: 'accent' as const,
  },
  {
    icon: PlugZap,
    name: 'Zapier',
    text: 'Connect to thousands of apps without code.',
    status: 'Beta',
    badge: 'info' as const,
    tone: 'info' as const,
  },
  {
    icon: Webhook,
    name: 'Public API',
    text: 'REST endpoints and webhooks for custom tools.',
    status: 'Coming Q4',
    badge: 'warning' as const,
    tone: 'warning' as const,
  },
] as const;

export default function IntegrationsPage() {
  // Disabled until post-MVP integrations such as bank sync are available.
  notFound();

  return (
    <>
      <PageHero
        description="Connect your banks, import from anywhere, and keep MoneyBag in step with the tools you already use."
        eyebrow="INTEGRATIONS"
        icon={<PlugZap className="size-3.5" />}
        title={
          <>
            Works with <span className="text-info">everything you use.</span>
          </>
        }
        tone="info"
      />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <AppBadge status="info">PRO</AppBadge>
            <h2 className="mt-3 text-2xl font-bold">Bank connections</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Read-only connections can automatically import new transactions.
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">2,500+</strong> banks supported
          </p>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {banks.map(([initials, name]) => (
            <MarketingCard className="text-center" key={name} padding="sm">
              <span className="mx-auto grid size-10 place-items-center rounded-lg bg-secondary text-xs font-bold text-muted-foreground">
                {initials}
              </span>
              <p className="mt-2 text-xs font-bold">{name}</p>
            </MarketingCard>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-end justify-between gap-4 lg:mt-20">
          <div>
            <AppBadge status="success">ALL PLANS</AppBadge>
            <h2 className="mt-3 text-2xl font-bold">CSV import</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Works with exports from any bank. MoneyBag helps detect the right columns.
            </p>
          </div>
          <TextLink className="text-sm" href="/help">
            See how it works
          </TextLink>
        </div>
        <MarketingCard className="mt-6 grid gap-6 lg:grid-cols-2" padding="lg">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Your CSV · any format
            </p>
            <pre className="overflow-x-auto rounded-lg bg-secondary p-4 font-mono text-xs leading-7 text-muted-foreground">{`date,desc,amount
2026-07-29,Starbucks,-5.20
2026-07-28,Salary,4200.00
2026-07-27,Amazon,-42.99`}</pre>
          </div>
          <div>
            <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              After import <CheckCircle2 className="size-4 text-success" />
            </p>
            <div className="space-y-2">
              {[
                ['Starbucks · Jul 29', '−$5.20', 'text-danger'],
                ['Salary · Jul 28', '+$4,200.00', 'text-success'],
                ['Amazon · Jul 27', '−$42.99', 'text-danger'],
              ].map(([label, amount, color]) => (
                <div
                  className="flex justify-between gap-4 rounded-lg bg-secondary p-3 text-sm"
                  key={label}
                >
                  <span>{label}</span>
                  <span className={`font-mono font-semibold ${color}`}>{amount}</span>
                </div>
              ))}
            </div>
          </div>
        </MarketingCard>

        <h2 className="mb-6 mt-16 text-2xl font-bold lg:mt-20">And connects to your stack</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stack.map(({ icon: Icon, name, text, status, badge, tone }) => (
            <MarketingCard key={name} padding="md">
              <FeatureIcon tone={tone}>
                <Icon />
              </FeatureIcon>
              <h3 className="mt-4 font-bold">{name}</h3>
              <p className="mt-1 min-h-10 text-xs leading-5 text-muted-foreground">{text}</p>
              <AppBadge className="mt-4" size="sm" status={badge}>
                {status}
              </AppBadge>
            </MarketingCard>
          ))}
        </div>
      </section>
      <TrialCta
        description="Start with CSV today and connect more of your financial life as you grow."
        title="Bring your money into one clear view."
      />
    </>
  );
}
