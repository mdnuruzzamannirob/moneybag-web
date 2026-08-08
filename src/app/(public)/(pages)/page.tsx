import {
  ButtonLink,
  DotPattern,
  Eyebrow,
  FaqList,
  FeatureIcon,
  MarketingCard,
  SectionHeading,
  Stars,
  TextLink,
  TrialCta,
  TrustPoints,
} from '@/components/public/public-ui';
import {
  ArrowRight,
  BarChart3,
  Check,
  PiggyBank,
  Repeat2,
  Target,
  TrendingUp,
  Users,
  Wallet,
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Take control of your money. Together.',
  description:
    'Track wallets, transactions, budgets, savings, and shared family finances with MoneyBag.',
};

const features = [
  {
    icon: Wallet,
    tone: 'primary' as const,
    title: 'Multiple wallets',
    text: 'Track bank, cash, mobile, cards, and investments in separate wallets with their own balances.',
  },
  {
    icon: Repeat2,
    tone: 'accent' as const,
    title: 'Recurring transactions',
    text: 'Set rent, salary, or subscriptions once. We create entries on the schedule you choose.',
  },
  {
    icon: Target,
    tone: 'success' as const,
    title: 'Budgets that roll over',
    text: 'Set monthly limits per category. Unspent budget automatically carries forward.',
  },
  {
    icon: PiggyBank,
    tone: 'warning' as const,
    title: 'Savings goals',
    text: 'See every goal move forward. Contribute or withdraw any time with a clear history.',
  },
  {
    icon: BarChart3,
    tone: 'info' as const,
    title: 'Beautiful reports',
    text: 'See monthly, yearly, category, and daily trends. Export PDF or CSV in one click.',
  },
  {
    icon: Users,
    tone: 'accent' as const,
    title: 'Family on Pro',
    text: 'Share a wallet, split expenses, settle balances, and pool budgets with up to 5 members.',
  },
];

const testimonials = [
  {
    initials: 'SM',
    name: 'Sarah Mitchell',
    role: 'Designer · Berlin',
    quote:
      'MoneyBag finally gave our family one calm place to talk about money. We saved $4,200 in our first year.',
  },
  {
    initials: 'FK',
    name: 'Fatima Khan',
    role: 'Freelancer · Dubai',
    quote:
      'The CSV importer saved me hours, and the reports finally show where every invoice goes.',
  },
  {
    initials: 'AT',
    name: 'Ahmed Tariq',
    role: 'Developer · Karachi',
    quote:
      'Clean budgets, no ads, and family sharing that makes sense. It paid for itself immediately.',
  },
] as const;

const homeFaq = [
  {
    question: 'Is MoneyBag free to use?',
    answer:
      'Yes. The Free plan includes one wallet, 50 monthly transactions, two budgets, one savings goal, and basic reports.',
  },
  {
    question: 'Can I use MoneyBag with my family?',
    answer:
      'Yes. Pro plans include a family group for up to five members, shared wallets, pooled budgets, expense splits, and settle-up balances.',
  },
  {
    question: 'Do I need a credit card for the trial?',
    answer:
      'No. Start the full 14-day Pro trial without a credit card and choose a plan only if MoneyBag works for you.',
  },
  {
    question: 'Can I import transactions from my bank?',
    answer:
      'Yes. Upload a CSV from any bank and MoneyBag will help map the date, description, and amount columns.',
  },
] as const;

export default function HomePage() {
  return (
    <>
      <section className="home-hero relative isolate overflow-hidden">
        <DotPattern className="home-hero-dots opacity-55" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-1 h-56 bg-linear-to-b from-transparent via-background/75 to-background"
        />

        <div className="relative z-2 mx-auto grid min-h-full max-w-7xl items-center gap-14 px-4 pb-24 pt-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
          <div>
            {/* <Eyebrow
              className="bg-card px-4! py-1! text-xs! normal-case tracking-normal shadow-sm"
              icon={<span className="size-2.5 rounded-full bg-primary" />}
            >
              Your money, your control
            </Eyebrow> */}
            <h1 className="mt-6 max-w-3xl text-5xl font-bold leading-[1.04] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Take control of your finances — <span className="text-primary">together.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              Track income, expenses, budgets, and savings. Share with family. Built for simplicity,
              designed for the long term.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/register">
                Start 14-day free trial <ArrowRight className="size-4" />
              </ButtonLink>
              <ButtonLink href="/features" tone="secondary">
                See how it works
              </ButtonLink>
            </div>
            <div className="mt-6">
              <TrustPoints items={['No credit card', 'GDPR compliant', 'Cancel anytime']} />
            </div>
          </div>
          <div className="relative">
            <DashboardPreview />
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto -mt-20 -translate-y-32 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 divide-x divide-y divide-border overflow-hidden rounded-lg border border-border bg-card shadow-sm sm:grid-cols-4 sm:divide-y-0">
          {[
            ['10k+', 'Active users'],
            ['$2M+', 'Tracked monthly'],
            ['4.8 ★', 'Average rating'],
            ['99.9%', 'Uptime'],
          ].map(([value, label]) => (
            <div className="p-6 text-center sm:text-left" key={label}>
              <p className="text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">
                {value}
              </p>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <SectionHeading
          centered
          eyebrow="FEATURES"
          title="Everything you need to manage money"
          description="From daily tracking to family budgets—all in one calm, focused place."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, tone, title, text }) => (
            <MarketingCard key={title}>
              <FeatureIcon tone={tone}>
                <Icon className="size-5" />
              </FeatureIcon>
              <h3 className="mt-4 text-lg font-semibold">{title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{text}</p>
            </MarketingCard>
          ))}
        </div>
        <div className="mt-8 text-center">
          <TextLink href="/features">Explore all features</TextLink>
        </div>
      </section>

      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
          <div>
            <FamilyCard />
          </div>
          <div>
            <Eyebrow tone="accent">FOR FAMILIES</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Manage money together, <span className="text-primary">without the drama.</span>
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Create a family group, share wallets, split bills, and see who owes whom at a glance.
              Everyone gets the right level of access.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                'Shared wallets everyone can see',
                'Equal, percentage, or exact expense splits',
                'Pooled budgets with helpful alerts',
                'One-tap settlements with full history',
              ].map((item) => (
                <li className="flex items-start gap-3" key={item}>
                  <Check className="mt-0.5 size-5 text-success" />
                  {item}
                </li>
              ))}
            </ul>
            <TextLink className="mt-7" href="/features">
              Explore family features
            </TextLink>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card/60">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <SectionHeading
            centered
            eyebrow="LOVED BY USERS"
            title="Real people, real money"
            tone="warning"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <MarketingCard key={testimonial.name}>
                <Stars />
                <blockquote className="mt-4 text-sm leading-7">“{testimonial.quote}”</blockquote>
                <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                  <span className="grid size-10 place-items-center rounded-full bg-primary text-xs font-bold text-white">
                    {testimonial.initials}
                  </span>
                  <div>
                    <p className="text-sm font-bold">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </MarketingCard>
            ))}
          </div>
          <div className="mt-8 text-center">
            <TextLink href="/customers">Read customer stories</TextLink>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <SectionHeading centered title="Frequently asked" />
          <div className="mt-8">
            <FaqList items={homeFaq} />
          </div>
          <div className="mt-7 text-center">
            <TextLink href="/faq">See every question</TextLink>
          </div>
        </div>
      </section>

      <TrialCta />
    </>
  );
}

function DashboardPreview() {
  return (
    <div className="relative">
      <div className="relative rounded-lg border border-border bg-card p-5 shadow-xl sm:p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Total balance
            </p>
            <p className="mt-1 text-3xl font-bold">
              $12,840.<span className="text-muted-foreground">25</span>
            </p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-md bg-success-soft px-2 py-1 text-xs font-medium text-success">
            <TrendingUp className="size-3.5" /> +8.2%
          </span>
        </div>
        <svg viewBox="0 0 320 90" className="mt-5 h-24 w-full" aria-label="Weekly balance trend">
          <defs>
            <linearGradient id="home-area" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity=".3" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0 70L40 55 80 62 120 40 160 48 200 25 240 35 280 18 320 22V90H0Z"
            fill="url(#home-area)"
          />
          <path
            d="M0 70L40 55 80 62 120 40 160 48 200 25 240 35 280 18 320 22"
            fill="none"
            stroke="#6366f1"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-md bg-secondary p-3">
            <p className="text-xs text-muted-foreground">Income</p>
            <p className="mt-0.5 font-semibold text-success">+$4,200</p>
          </div>
          <div className="rounded-md bg-secondary p-3">
            <p className="text-xs text-muted-foreground">Expense</p>
            <p className="mt-0.5 font-semibold text-danger">−$2,180</p>
          </div>
        </div>
      </div>
      <div className="absolute -left-4 -top-7 -rotate-3 rounded-md border border-border bg-card p-3 shadow-lg sm:-left-7">
        <p className="text-[11px] text-muted-foreground">Main wallet</p>
        <p className="text-sm font-semibold">$8,420.10</p>
      </div>
      <div className="absolute -bottom-7 -right-2 rotate-2 rounded-md border border-border bg-card p-3 shadow-lg">
        <p className="text-[11px] text-muted-foreground">Groceries budget</p>
        <p className="text-sm font-semibold">$320 / $500</p>
        <div className="mt-2 h-1.5 w-44 overflow-hidden rounded-full bg-secondary">
          <div className="h-full w-[64%] rounded-full bg-linear-to-r from-primary to-brand-accent" />
        </div>
      </div>
    </div>
  );
}

function FamilyCard() {
  return (
    <div className="rounded-lg border border-border bg-card p-6 shadow-md">
      <div className="flex justify-between">
        <p className="text-sm font-semibold">Family balances</p>
        <span className="text-xs text-muted-foreground">This month</span>
      </div>
      <ul className="mt-4 space-y-3">
        {[
          ['AM', 'Amelia', 'Editor', '+$120.00', 'text-success'],
          ['JR', 'Jordan', 'Editor', '−$48.50', 'text-danger'],
          ['SK', 'Sam', 'Viewer', '$0.00', 'text-muted-foreground'],
        ].map(([initials, name, role, amount, color]) => (
          <li className="flex items-center justify-between" key={name}>
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                {initials}
              </span>
              <div>
                <p className="text-sm font-medium">{name}</p>
                <p className="text-xs text-muted-foreground">{role}</p>
              </div>
            </div>
            <span className={`text-sm font-semibold ${color}`}>{amount}</span>
          </li>
        ))}
      </ul>
      <div className="mt-5 flex items-center justify-between rounded-md bg-secondary p-3">
        <div>
          <p className="text-xs text-muted-foreground">Settle up</p>
          <p className="text-sm font-semibold">Jordan → Amelia</p>
        </div>
        <span className="ui-gradient-primary inline-flex items-center justify-center rounded-md px-3 py-2 text-xs font-semibold">
          Settle $48.50
        </span>
      </div>
    </div>
  );
}
