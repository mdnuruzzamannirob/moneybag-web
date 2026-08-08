import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  ChevronDown,
  CircleHelp,
  CreditCard,
  Lock,
  Settings2,
  Users,
} from 'lucide-react';
import { FeatureIcon, PageHero } from '@/components/public/public-ui';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Answers to common questions about MoneyBag accounts, plans, security, and family sharing.',
};
const sections = [
  {
    icon: Settings2,
    title: 'Using MoneyBag',
    items: [
      [
        'What can I track?',
        'Wallets, income, expenses, transfers, category budgets, savings goals, and recurring transactions.',
      ],
      [
        'Can I import existing data?',
        'Yes. Pro plans include CSV import for bringing in transaction history.',
      ],
      [
        'Which currencies are supported?',
        'You can choose your preferred display currency in settings. Family groups share a consistent base currency.',
      ],
    ],
  },
  {
    icon: CreditCard,
    title: 'Plans & billing',
    items: [
      [
        'Is there a free plan?',
        'Yes. The Free plan includes one wallet, 50 monthly transactions, two budgets, one goal, and basic reports.',
      ],
      ['Do I need a card for the trial?', 'No. The 14-day Pro trial starts without a card.'],
      [
        'Can I cancel any time?',
        'Yes. A cancellation applies at the end of the active billing period.',
      ],
    ],
  },
  {
    icon: Users,
    title: 'Family sharing',
    items: [
      ['How many people can join?', 'A Pro family group supports up to five members.'],
      [
        'Can everyone edit?',
        'The owner can assign Viewer or Editor roles so access stays appropriate.',
      ],
      [
        'How are expenses split?',
        'Use equal, percentage, or exact splits and settle balances with a recorded history.',
      ],
    ],
  },
  {
    icon: Lock,
    title: 'Security & privacy',
    items: [
      ['Do you sell financial data?', 'No. We do not sell personal or financial data.'],
      ['Can I export my data?', 'Yes. You can export your account data from settings.'],
      [
        'Can I delete my account?',
        'Yes. Permanent account deletion is available in settings and removes associated data.',
      ],
    ],
  },
];
export default function FaqPage() {
  return (
    <>
      <PageHero
        compact
        eyebrow="Help center"
        icon={<CircleHelp className="size-3.5" />}
        title="Questions, answered."
        description="Everything you need to know before making MoneyBag part of your money routine."
      />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
        {sections.map(({ icon: Icon, title, items }, index) => (
          <div className="rounded-lg border border-border bg-card p-6 sm:p-7" key={title}>
            <FeatureIcon
              tone={
                ['primary', 'accent', 'info', 'success'][index] as
                  'primary' | 'accent' | 'info' | 'success'
              }
            >
              <Icon className="size-5" />
            </FeatureIcon>
            <h2 className="mt-4 text-xl font-bold">{title}</h2>
            <div className="mt-5 space-y-3">
              {items.map(([question, answer]) => (
                <details
                  className="group border-t border-border pt-4 first:border-0 first:pt-0"
                  key={question}
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 font-medium marker:hidden">
                    {question}
                    <ChevronDown className="size-4 shrink-0 text-primary transition-transform duration-200 group-open:rotate-180" />
                  </summary>
                  <p className="mt-2 pr-6 text-sm leading-6 text-muted-foreground">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        ))}
      </section>
      <section className="border-t border-border bg-card/60">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:py-20">
          <h2 className="text-3xl font-bold">Still have a question?</h2>
          <p className="mt-3 text-muted-foreground">We are happy to help you find the answer.</p>
          <Link
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary"
            href="/contact"
          >
            Contact the team <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
