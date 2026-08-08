import type { Metadata } from 'next';
import { BellRing, FileUp, Goal, MessageSquareText, Split, Users } from 'lucide-react';
import { Check } from 'lucide-react';
import { Eyebrow, FeatureIcon, PageHero, TrialCta } from '@/components/public/public-ui';

export const metadata: Metadata = {
  title: 'Features',
  description:
    'Explore MoneyBag wallets, budgets, savings goals, reports, automation, and family finance features.',
};

const highlights = [
  {
    eyebrow: 'TRACKING',
    title: 'Multi-wallet, multi-currency',
    text: 'Track every account in one place—checking, savings, credit cards, cash, investments, or your favourite mobile banking app.',
    points: [
      'Unlimited wallets on Pro plans',
      '30+ currencies supported',
      'Custom icons and colours per wallet',
    ],
    tone: 'primary' as const,
    preview: 'wallets',
  },
  {
    eyebrow: 'BUDGETS',
    title: 'Smart budgets that work',
    text: 'Set monthly limits per category. Track spending in real time, get alerts before you overspend, and roll unused amounts into next month.',
    points: ['Per-category limits', 'Alerts at 80% and 100%', 'Budget rollover'],
    tone: 'accent' as const,
    preview: 'budgets',
  },
  {
    eyebrow: 'REPORTS',
    title: 'Know where every taka goes',
    text: 'Beautiful charts, monthly breakdowns, category insights, and trends over time help you spot your spending patterns at a glance.',
    points: ['Pie, bar, and line charts', 'Month-over-month comparison', 'Category deep-dives'],
    tone: 'info' as const,
    preview: 'reports',
  },
] as const;

const moreFeatures = [
  [Goal, 'success', 'Savings goals', 'Visualize and track progress toward what matters.'],
  [FileUp, 'warning', 'CSV import', 'Bring in transactions from any bank statement.'],
  [Users, 'accent', 'Family groups', 'Share with up to five members and split expenses.'],
  [Split, 'info', 'Transaction splitting', 'Split a purchase across categories or members.'],
  [
    MessageSquareText,
    'primary',
    'Notes & attachments',
    'Keep receipts and context with every transaction.',
  ],
  [BellRing, 'danger', 'Helpful alerts', 'Stay ahead of important account activity.'],
] as const;

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        eyebrow="FEATURES"
        title={
          <>
            Every feature you&apos;ll <span className="text-primary">ever need.</span>
          </>
        }
        description="Built for individuals, couples, and families who want a complete view of their money—without the bloat."
      />

      <main className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="space-y-24 lg:space-y-28">
          {highlights.map((feature, index) => (
            <section
              className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
              key={feature.eyebrow}
            >
              <FeatureCopy feature={feature} className={index === 1 ? 'lg:order-2' : ''} />
              <FeaturePreview type={feature.preview} className={index === 1 ? 'lg:order-1' : ''} />
            </section>
          ))}
        </div>

        <section className="mt-24 lg:mt-28">
          <h2 className="text-center text-3xl font-bold tracking-tight">And much more</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {moreFeatures.map(([Icon, tone, title, text]) => (
              <article className="rounded-lg border border-border bg-card p-5" key={title}>
                <FeatureIcon tone={tone}>
                  <Icon className="size-4" />
                </FeatureIcon>
                <h3 className="mt-3 text-sm font-bold">{title}</h3>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <TrialCta
        title="Ready for a calmer money system?"
        description="Start with every Pro feature free for 14 days. No card and no complicated setup."
      />
    </>
  );
}

function FeatureCopy({
  feature,
  className,
}: {
  feature: (typeof highlights)[number];
  className?: string;
}) {
  return (
    <div className={className}>
      <Eyebrow tone={feature.tone}>{feature.eyebrow}</Eyebrow>
      <h2 className="mt-3 text-3xl font-bold tracking-tight lg:text-4xl">{feature.title}</h2>
      <p className="mt-4 leading-7 text-muted-foreground">{feature.text}</p>
      <ul className="mt-5 space-y-2.5 text-sm">
        {feature.points.map((point) => (
          <li className="flex items-start gap-2" key={point}>
            <Check className="mt-0.5 size-4 shrink-0 text-success" />
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}

function FeaturePreview({
  type,
  className,
}: {
  type: 'wallets' | 'budgets' | 'reports';
  className?: string;
}) {
  if (type === 'wallets') return <WalletPreview className={className} />;
  if (type === 'budgets') return <BudgetPreview className={className} />;
  return <ReportPreview className={className} />;
}

function PreviewShell({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6 ${className ?? ''}`}
    >
      {children}
    </div>
  );
}

function WalletPreview({ className }: { className?: string }) {
  const wallets = [
    ['Bank', '$8,420', 'primary'],
    ['Credit', '−$320', 'accent'],
    ['Cash', '$240', 'success'],
    ['Savings', '$4,110', 'warning'],
  ] as const;
  return (
    <PreviewShell className={className}>
      <div className="grid grid-cols-2 gap-3">
        {wallets.map(([name, amount, tone]) => (
          <div
            className={`rounded-lg border p-3 text-center ${tone === 'primary' ? 'border-primary/20 bg-primary/10 text-primary' : tone === 'accent' ? 'border-brand-accent/20 bg-brand-accent-soft text-brand-accent' : tone === 'success' ? 'border-success/20 bg-success-soft text-success' : 'border-warning/20 bg-warning-soft text-warning'}`}
            key={name}
          >
            <p className="text-xs font-bold uppercase tracking-wide">{name}</p>
            <p className="mt-1 text-lg font-extrabold">{amount}</p>
          </div>
        ))}
      </div>
    </PreviewShell>
  );
}

function BudgetPreview({ className }: { className?: string }) {
  const budgets = [
    ['Groceries', '$348 / $425', 'w-[82%]', 'bg-warning'],
    ['Dining out', '$124 / $200', 'w-[62%]', 'bg-success'],
    ['Transport', '$90 / $150', 'w-[60%]', 'bg-success'],
    ['Entertainment', '$195 / $100', 'w-full', 'bg-danger'],
  ] as const;
  return (
    <PreviewShell className={className}>
      <div className="space-y-4">
        {budgets.map(([name, value, width, color]) => (
          <div key={name}>
            <div className="mb-1.5 flex justify-between text-sm">
              <span className="font-semibold">{name}</span>
              <span className="text-muted-foreground">{value}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-secondary">
              <div className={`h-full rounded-full ${width} ${color}`} />
            </div>
            {name === 'Entertainment' && (
              <p className="mt-1 text-xs font-bold text-danger">Over budget by $95</p>
            )}
          </div>
        ))}
      </div>
    </PreviewShell>
  );
}

function ReportPreview({ className }: { className?: string }) {
  const rows = [
    ['Rent', '$1,100', 'w-full', 'bg-primary'],
    ['Groceries', '$348', 'w-[32%]', 'bg-brand-accent'],
    ['Utilities', '$215', 'w-[20%]', 'bg-success'],
    ['Dining', '$124', 'w-[11%]', 'bg-warning'],
    ['Transport', '$90', 'w-[8%]', 'bg-info'],
  ] as const;
  return (
    <PreviewShell className={className}>
      <p className="mb-4 text-xs font-semibold text-muted-foreground">
        Spending by category · July
      </p>
      <div className="space-y-3">
        {rows.map(([name, amount, width, color]) => (
          <div key={name}>
            <div className="mb-1 flex justify-between text-xs">
              <span className="font-semibold">{name}</span>
              <span>{amount}</span>
            </div>
            <div className="h-3 overflow-hidden rounded bg-secondary">
              <div className={`h-full rounded ${width} ${color}`} />
            </div>
          </div>
        ))}
      </div>
    </PreviewShell>
  );
}
