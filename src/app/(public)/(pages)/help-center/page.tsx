import { AppBadge, AppInput } from '@/components/app-ui';
import { ButtonLink, FeatureIcon, MarketingCard, PageHero } from '@/components/public/public-ui';
import {
  ArrowRight,
  BookOpen,
  CircleDollarSign,
  FileText,
  Search,
  UserRound,
  Users,
  WalletCards,
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Help Center',
  description: 'Browse MoneyBag setup, billing, feature, and family help resources.',
};

const categories = [
  {
    icon: UserRound,
    title: 'Account',
    text: 'Login, registration, and password reset',
    tone: 'primary' as const,
    count: '12 articles',
  },
  {
    icon: CircleDollarSign,
    title: 'Billing',
    text: 'Plans, upgrades, refunds, and invoices',
    tone: 'accent' as const,
    count: '9 articles',
  },
  {
    icon: WalletCards,
    title: 'Features',
    text: 'Wallets, budgets, goals, and CSV import',
    tone: 'success' as const,
    count: '28 articles',
  },
  {
    icon: Users,
    title: 'Family',
    text: 'Invites, expense splits, and shared wallets',
    tone: 'info' as const,
    count: '14 articles',
  },
] as const;

const articles = [
  [
    'How do I import transactions from my bank?',
    'Learn how to use the CSV importer with a statement from any bank.',
  ],
  [
    'How do I create a family group?',
    'Set up family sharing, invite members, and choose their permissions.',
  ],
  ['How do I upgrade to Pro?', 'Choose a plan, apply a coupon code, and start your free trial.'],
  [
    'How do I delete my account?',
    'Export your data first, then permanently remove the account and its records.',
  ],
] as const;

export default function HelpPage() {
  return (
    <>
      <PageHero
        compact
        description="Search our knowledge base or browse help by category."
        eyebrow="HELP CENTER"
        icon={<BookOpen className="size-3.5" />}
        title="How can we help?"
      >
        <div className="mx-auto mt-7 max-w-lg text-left">
          <AppInput
            aria-label="Search help articles"
            className="h-12"
            leading={<Search />}
            name="query"
            placeholder="Search for answers..."
          />
        </div>
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map(({ icon: Icon, title, text, tone, count }) => (
            <MarketingCard className="text-center" key={title} padding="md">
              <FeatureIcon className="mx-auto" tone={tone}>
                <Icon />
              </FeatureIcon>
              <h2 className="mt-4 font-bold">{title}</h2>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">{text}</p>
              <AppBadge className="mt-4" size="sm">
                {count}
              </AppBadge>
            </MarketingCard>
          ))}
        </div>

        <div className="mt-16 lg:mt-20">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-bold">Popular articles</h2>
            <AppBadge status="info">MOST READ</AppBadge>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {articles.map(([title, text]) => (
              <MarketingCard key={title} padding="md">
                <div className="flex items-start gap-3">
                  <FeatureIcon className="size-9 rounded-lg" tone="primary">
                    <FileText className="size-4" />
                  </FeatureIcon>
                  <div>
                    <h3 className="text-sm font-bold">{title}</h3>
                    <p className="mt-2 text-xs leading-5 text-muted-foreground">{text}</p>
                  </div>
                </div>
              </MarketingCard>
            ))}
          </div>
        </div>

        <div className="mt-16 rounded-lg border border-primary/20 bg-linear-to-r from-primary/10 to-brand-accent-soft p-8 text-center lg:mt-20">
          <h2 className="text-2xl font-bold">Still need help?</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Our support team is here Monday to Friday, 9am–6pm CET.
          </p>
          <ButtonLink className="mt-5" href="/contact">
            Contact support <ArrowRight className="size-4" />
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
