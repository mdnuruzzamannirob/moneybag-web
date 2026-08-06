import type { Metadata } from 'next';
import { Check, CreditCard, Mail, RefreshCw, ShieldCheck, X } from 'lucide-react';
import { FaqList, PageHero } from '@/components/public/public-ui';
import { PricingPlanCards } from '@/components/public/pricing-plan-cards';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Simple MoneyBag pricing for personal and family finance.',
};

const comparison = [
  ['Personal wallets', '1', 'Unlimited', 'Unlimited'],
  ['Transactions / month', '50', 'Unlimited', 'Unlimited'],
  ['Budgets', '2', 'Unlimited', 'Unlimited'],
  ['Savings goals', '1', 'Unlimited', 'Unlimited'],
  ['Recurring transactions', false, true, true],
  ['CSV bulk import', false, true, true],
  ['Personal reports', 'Basic', 'Full + exports', 'Full + exports'],
  ['Family members', false, false, 'Up to 5'],
  ['Shared wallets', false, false, true],
  ['Expense splitting and settle-up', false, false, true],
  ['Pooled family budgets', false, false, true],
  ['Family reports and exports', false, false, true],
  ['Priority email support', false, true, true],
];

const pricingFaq = [
  {
    question: 'Can I switch plans anytime?',
    answer:
      'Yes. You can change your plan from billing settings. When downgrading, existing data is preserved, but new items are limited by the lower plan.',
  },
  {
    question: 'How do refunds work?',
    answer:
      'Contact billing support with your request. Approved refunds are returned through the original Stripe payment method.',
  },
  {
    question: 'How many people can use the Family plan?',
    answer:
      'A Family plan supports one family group with up to five members, including shared wallets, pooled budgets, and expense splitting.',
  },
  {
    question: 'Do I need a credit card for the trial?',
    answer: 'No. You can use Pro features free for 14 days without adding a credit card.',
  },
  {
    question: 'Do Monthly and Yearly include the same features?',
    answer:
      'Yes. Both billing options include the same Pro or Family features. Yearly billing simply costs less over a full year.',
  },
  {
    question: 'What happens if I downgrade to Free?',
    answer:
      'Your existing data is preserved. New wallets, transactions, budgets, or goals are blocked until your usage fits the Free plan limits.',
  },
  {
    question: 'Can I export my financial reports?',
    answer:
      'Pro and Family include full reports with PDF and CSV exports. Free includes basic reports without advanced exports.',
  },
  {
    question: 'Can family members edit shared finances?',
    answer:
      'Yes. Family owners can assign Viewer or Editor roles, so each member receives the appropriate level of access.',
  },
] as const;

export default function PricingPage() {
  return (
    <>
      <PageHero
        compact
        eyebrow="PRICING"
        title={
          <>
            Plans that <span className="text-primary">grow with you</span>
          </>
        }
        description="Start free, unlock complete personal finance tools with Pro, or manage money together with Family."
      />
      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <PricingPlanCards />
        <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          {[
            [ShieldCheck, '14-day Pro trial'],
            [CreditCard, 'No card to start'],
            [RefreshCw, 'Cancel anytime'],
            [Mail, 'Priority support'],
          ].map(([Icon, text]) => {
            const I = Icon as typeof Mail;
            return (
              <span className="inline-flex items-center gap-1.5" key={text as string}>
                <I className="size-4 text-success" />
                {text as string}
              </span>
            );
          })}
        </div>
        <section className="mt-24 lg:mt-28">
          <h2 className="text-center text-3xl font-bold tracking-tight">Compare plans</h2>
          <p className="mt-2 text-center text-muted-foreground">
            A quick look at what is included.
          </p>
          <div className="mt-8 overflow-x-auto rounded-lg border border-border bg-card">
            <table className="w-full min-w-3xl text-sm">
              <thead className="bg-secondary text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  {['Feature', 'Free', 'Pro', 'Family'].map((head) => (
                    <th
                      className={cn(
                        'px-5 py-4 font-semibold',
                        head === 'Feature' ? 'text-left' : 'text-center',
                      )}
                      key={head}
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {comparison.map(([name, ...values]) => (
                  <tr key={name as string}>
                    <td className="px-5 py-3.5 font-medium">{name as string}</td>
                    {values.map((value, index) => (
                      <td className="px-5 py-3.5 text-center" key={index}>
                        {typeof value === 'boolean' ? (
                          value ? (
                            <Check className="mx-auto size-4 text-success" />
                          ) : (
                            <X className="mx-auto size-4 text-muted-foreground" />
                          )
                        ) : (
                          value
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className="mx-auto mt-24 max-w-3xl lg:mt-28">
          <h2 className="text-center text-3xl font-bold tracking-tight">Frequently asked</h2>
          <div className="mt-8">
            <FaqList items={pricingFaq} />
          </div>
        </section>
      </div>
    </>
  );
}
