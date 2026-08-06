'use client';

import {
  ArrowRight,
  BookOpenText,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  Clock3,
  CreditCard,
  FileText,
  MessageCircleMore,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Target,
  ThumbsDown,
  ThumbsUp,
  Ticket,
  Users,
  WalletCards,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';

import {
  AppBadge,
  AppButton,
  AppCard,
  AppEmptyState,
  AppField,
  AppFileUpload,
  AppInput,
  AppModal,
  AppPageHeader,
  AppSelect,
  AppTextarea,
} from '@/components/app-ui';
import { cn } from '@/lib/utils';

type CategoryId =
  | 'getting-started'
  | 'wallets-transactions'
  | 'budgets-goals'
  | 'family'
  | 'account-security'
  | 'plans-billing';

type HelpArticle = {
  id: string;
  category: CategoryId;
  title: string;
  summary: string;
  readTime: string;
  steps: readonly string[];
  route: string;
  actionLabel: string;
  popular?: boolean;
};

type SupportStatus = 'open' | 'waiting' | 'resolved';

type SupportRequest = {
  id: string;
  subject: string;
  topic: string;
  status: SupportStatus;
  updatedAt: string;
};

const categories = [
  {
    id: 'getting-started' as const,
    title: 'Getting started',
    description: 'Set up MoneyBag and learn the basics',
    icon: Sparkles,
    tone: 'primary',
  },
  {
    id: 'wallets-transactions' as const,
    title: 'Wallets & Transactions',
    description: 'Manage accounts, transfers, and imports',
    icon: WalletCards,
    tone: 'info',
  },
  {
    id: 'budgets-goals' as const,
    title: 'Budgets & Savings',
    description: 'Set targets, limits, and rollover rules',
    icon: Target,
    tone: 'warning',
  },
  {
    id: 'family' as const,
    title: 'Family Sharing',
    description: 'Invite members and manage shared expenses',
    icon: Users,
    tone: 'success',
  },
  {
    id: 'account-security' as const,
    title: 'Security & Privacy',
    description: 'Manage 2FA, passwords, and data exports',
    icon: ShieldCheck,
    tone: 'danger',
  },
  {
    id: 'plans-billing' as const,
    title: 'Billing & Plans',
    description: 'Subscriptions, invoices, and payment methods',
    icon: CreditCard,
    tone: 'accent',
  },
];

const articles: HelpArticle[] = [
  {
    id: 'create-first-wallet',
    category: 'getting-started',
    title: 'How to create your first wallet',
    summary: 'Add bank accounts, credit cards, or mobile banking wallets to start tracking.',
    readTime: '2 min read',
    steps: [
      'Navigate to Wallets from the sidebar menu.',
      'Click Add Wallet button at top right.',
      'Select your wallet type (Bank, Mobile Banking, Cash, Card).',
      'Enter the starting balance and click Save.',
    ],
    route: '/wallets',
    actionLabel: 'Go to Wallets',
    popular: true,
  },
  {
    id: 'setup-recurring-transactions',
    category: 'wallets-transactions',
    title: 'Setting up recurring payments and income',
    summary: 'Automate recurring bills, rent, or salary deposits so you never miss an entry.',
    readTime: '3 min read',
    steps: [
      'Go to Transactions -> Recurring tab.',
      'Click New Recurring Transaction.',
      'Set frequency (monthly, weekly, yearly) and start date.',
      'Save recurring rule.',
    ],
    route: '/transactions/recurring',
    actionLabel: 'Manage Recurring',
    popular: true,
  },
  {
    id: 'budget-rollover-rules',
    category: 'budgets-goals',
    title: 'How rollover budgets work',
    summary: 'Unspent category budget automatically carries forward to the following month.',
    readTime: '2 min read',
    steps: [
      'Go to Budgets screen.',
      'Edit or create a budget rule.',
      'Toggle "Rollover unspent amount to next month".',
    ],
    route: '/budgets',
    actionLabel: 'View Budgets',
    popular: true,
  },
];

const sampleRequests: SupportRequest[] = [
  {
    id: 'TICK-1042',
    subject: 'Bank CSV import column mapping issue',
    topic: 'wallets-transactions',
    status: 'waiting',
    updatedAt: '2 hours ago',
  },
  {
    id: 'TICK-0988',
    subject: 'Family member invite link expired',
    topic: 'family',
    status: 'resolved',
    updatedAt: 'Yesterday',
  },
];

export function UserHelpCenter() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryId | 'all'>('all');
  const [ticketModal, setTicketModal] = useState(false);

  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      const matchCat = activeCategory === 'all' || art.category === activeCategory;
      const matchQuery =
        !query ||
        art.title.toLowerCase().includes(query.toLowerCase()) ||
        art.summary.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [query, activeCategory]);

  return (
    <div className="space-y-6">
      <AppPageHeader
        actions={
          <AppButton onClick={() => setTicketModal(true)} size="sm">
            <Ticket /> Submit support ticket
          </AppButton>
        }
        description="Find guides, search articles, or reach out to our support team."
        title="Help Center"
      />

      <AppCard className="p-6 bg-primary/5 border-primary/20">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-xl font-semibold text-foreground">How can we help you today?</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Search our knowledge base for instant answers and tutorials.
          </p>
          <div className="mt-4 relative">
            <AppInput
              leading={<Search className="size-4 text-muted-foreground" />}
              placeholder="Search help articles..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </AppCard>

      <section>
        <h3 className="mb-4 text-base font-semibold">Categories</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const selected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(selected ? 'all' : cat.id)}
                className={cn(
                  'flex items-start gap-3 rounded-lg border p-4 text-left transition-colors',
                  selected
                    ? 'border-primary bg-primary/10'
                    : 'border-border bg-card hover:bg-muted/50',
                )}
              >
                <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">{cat.title}</h4>
                  <p className="mt-1 text-xs text-muted-foreground">{cat.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-base font-semibold">
          {activeCategory === 'all' ? 'Popular Articles' : 'Articles'}
        </h3>
        {filteredArticles.length === 0 ? (
          <AppEmptyState
            icon={<CircleHelp />}
            title="No help articles found"
            description="Try searching with different keywords or submit a ticket."
          />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((art) => (
              <AppCard key={art.id} className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                    <span className="font-medium text-primary uppercase tracking-wider">
                      {art.category}
                    </span>
                    <span>{art.readTime}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground">{art.title}</h4>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {art.summary}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                  <Link
                    href={art.route}
                    className="text-xs font-medium text-primary hover:underline inline-flex items-center gap-1"
                  >
                    {art.actionLabel} <ArrowRight className="size-3" />
                  </Link>
                </div>
              </AppCard>
            ))}
          </div>
        )}
      </section>

      <AppModal
        open={ticketModal}
        onOpenChange={setTicketModal}
        title="Submit a Support Ticket"
        description="Describe your question or issue and our team will get back to you shortly."
        footer={
          <>
            <AppButton tone="secondary" onClick={() => setTicketModal(false)}>
              Cancel
            </AppButton>
            <AppButton onClick={() => setTicketModal(false)}>
              <Send className="size-4 mr-1" /> Submit Ticket
            </AppButton>
          </>
        }
      >
        <div className="space-y-4">
          <AppField label="Topic" required>
            <AppSelect
              options={categories.map((c) => ({ label: c.title, value: c.id }))}
              placeholder="Select topic"
            />
          </AppField>

          <AppField label="Subject" required>
            <AppInput placeholder="Brief summary of your question..." />
          </AppField>

          <AppField label="Description" required>
            <AppTextarea
              placeholder="Include any error messages or details to help us assist you..."
              rows={4}
            />
          </AppField>

          <AppField label="Attachments">
            <AppFileUpload accept="image/*,.pdf" />
          </AppField>
        </div>
      </AppModal>
    </div>
  );
}
