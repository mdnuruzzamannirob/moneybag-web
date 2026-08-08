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
    id: 'getting-started',
    title: 'Getting started',
    description: 'Set up MoneyBag and learn the basics',
    icon: Sparkles,
    tone: 'primary',
  },
  {
    id: 'wallets-transactions',
    title: 'Wallets & transactions',
    description: 'Accounts, transfers, records and imports',
    icon: WalletCards,
    tone: 'info',
  },
  {
    id: 'budgets-goals',
    title: 'Budgets & goals',
    description: 'Plan spending and track your savings',
    icon: Target,
    tone: 'success',
  },
  {
    id: 'family',
    title: 'Family sharing',
    description: 'Invites, roles and shared finances',
    icon: Users,
    tone: 'accent',
  },
  {
    id: 'account-security',
    title: 'Account & security',
    description: 'Profile, privacy and secure sign-in',
    icon: ShieldCheck,
    tone: 'warning',
  },
  {
    id: 'plans-billing',
    title: 'Plans & billing',
    description: 'Subscriptions, limits and payments',
    icon: CreditCard,
    tone: 'danger',
  },
] as const;

const articles: readonly HelpArticle[] = [
  {
    id: 'first-account-setup',
    category: 'getting-started',
    title: 'Set up your MoneyBag account',
    summary: 'Choose your preferences and get your workspace ready in a few minutes.',
    readTime: '3 min read',
    steps: [
      'Open Settings and add your name and profile details.',
      'Choose your preferred currency and date format under Preferences.',
      'Add your first wallet so transactions have a place to live.',
    ],
    route: '/settings',
    actionLabel: 'Open settings',
  },
  {
    id: 'dashboard-overview',
    category: 'getting-started',
    title: 'Understand your dashboard overview',
    summary: 'See how balances, cash flow, budgets and goals work together.',
    readTime: '4 min read',
    steps: [
      'Use the summary cards to review your balance, income, expense and savings.',
      'Compare monthly income and expenses in the cash-flow chart.',
      'Review recent activity, budget health and savings progress below the charts.',
    ],
    route: '/dashboard',
    actionLabel: 'View dashboard',
  },
  {
    id: 'add-wallet',
    category: 'wallets-transactions',
    title: 'Add and manage a wallet',
    summary: 'Track bank, cash, mobile banking and credit accounts in one place.',
    readTime: '3 min read',
    steps: [
      'Go to Wallets & accounts and select Add wallet.',
      'Choose the wallet type, enter its name and current balance.',
      'Set a default wallet if you want it preselected for new transactions.',
    ],
    route: '/wallets',
    actionLabel: 'Manage wallets',
    popular: true,
  },
  {
    id: 'import-bank-csv',
    category: 'wallets-transactions',
    title: 'Import transactions from a bank CSV',
    summary: 'Bring an existing statement into MoneyBag without entering every row.',
    readTime: '5 min read',
    steps: [
      'Export a CSV statement from your bank and open Transactions.',
      'Select Import CSV, upload the file and map the date, description and amount columns.',
      'Review the preview carefully, then confirm the rows you want to import.',
    ],
    route: '/transactions',
    actionLabel: 'Open transactions',
    popular: true,
  },
  {
    id: 'create-budget',
    category: 'budgets-goals',
    title: 'Create your first monthly budget',
    summary: 'Set a category limit and get a clear view of what is left to spend.',
    readTime: '3 min read',
    steps: [
      'Open Budgets and select Create budget.',
      'Choose a category, monthly limit and the alert threshold you prefer.',
      'Save the budget and check its progress as new transactions are added.',
    ],
    route: '/budgets',
    actionLabel: 'Create a budget',
    popular: true,
  },
  {
    id: 'savings-goal',
    category: 'budgets-goals',
    title: 'Build and fund a savings goal',
    summary: 'Turn a target amount and deadline into visible, trackable progress.',
    readTime: '4 min read',
    steps: [
      'Open Savings Goals and add the target amount, deadline and an optional note.',
      'Record contributions whenever you move money toward the goal.',
      'Review the progress bar to see how much remains before your deadline.',
    ],
    route: '/goals',
    actionLabel: 'View savings goals',
  },
  {
    id: 'join-family',
    category: 'family',
    title: 'Join a family group',
    summary: 'Accept an invitation and start collaborating on shared finances.',
    readTime: '3 min read',
    steps: [
      'Open the invitation link sent by your family group owner.',
      'Sign in with the email address that received the invitation.',
      'Review the group and your assigned role, then accept the invitation.',
    ],
    route: '/family/join',
    actionLabel: 'Open family invite',
  },
  {
    id: 'family-roles',
    category: 'family',
    title: 'Understand family roles and access',
    summary: 'Learn what owners, editors and viewers can do inside a family group.',
    readTime: '4 min read',
    steps: [
      'Owners manage the group, invite people and assign member roles.',
      'Editors can add and update shared financial records.',
      'Viewers can review shared activity without changing group data.',
    ],
    route: '/family/join',
    actionLabel: 'Review family access',
  },
  {
    id: 'enable-2fa',
    category: 'account-security',
    title: 'Protect your account with two-factor authentication',
    summary: 'Add a verification step and store backup codes for safer sign-in.',
    readTime: '5 min read',
    steps: [
      'Open Security settings and choose Set up beside two-factor authentication.',
      'Scan the QR code with an authenticator app and enter the generated code.',
      'Save your backup codes somewhere private before completing setup.',
    ],
    route: '/settings/security',
    actionLabel: 'Open security settings',
    popular: true,
  },
  {
    id: 'export-account-data',
    category: 'account-security',
    title: 'Export a copy of your account data',
    summary: 'Download your wallets, transactions, budgets and goals for safekeeping.',
    readTime: '2 min read',
    steps: [
      'Open Privacy & data from Settings.',
      'Select Export data and confirm the requested format.',
      'Keep the downloaded file secure because it may contain sensitive financial details.',
    ],
    route: '/settings/privacy',
    actionLabel: 'Open privacy settings',
  },
  {
    id: 'manage-plan',
    category: 'plans-billing',
    title: 'Manage your plan and payment method',
    summary: 'Review your current plan, upgrade access or update billing details.',
    readTime: '3 min read',
    steps: [
      'Open Plan & billing from Settings to review your current subscription.',
      'Choose Upgrade plan to compare available features and billing periods.',
      'Add or update a payment method before confirming a paid subscription.',
    ],
    route: '/settings/billing',
    actionLabel: 'Manage billing',
    popular: true,
  },
  {
    id: 'free-plan-limits',
    category: 'plans-billing',
    title: 'Understand Free plan limits',
    summary: 'See what is included and when upgrading may be useful for you.',
    readTime: '3 min read',
    steps: [
      'The Free plan includes one wallet and up to 50 transactions each month.',
      'You can also create two budgets, one savings goal and use basic reports.',
      'Upgrade when you need higher limits, imports, family sharing or priority support.',
    ],
    route: '/settings/billing',
    actionLabel: 'Compare plan options',
  },
];

const frequentlyAsked: readonly {
  category: CategoryId;
  question: string;
  answer: string;
}[] = [
  {
    category: 'wallets-transactions',
    question: 'Do I need to connect my bank account?',
    answer:
      'No. You can add transactions manually or import a CSV statement, so your bank login details never need to be shared.',
  },
  {
    category: 'getting-started',
    question: 'Can I change my currency later?',
    answer:
      'Yes. Open Settings, then Preferences, to change the display currency used across your MoneyBag account.',
  },
  {
    category: 'family',
    question: 'How many people can join a family group?',
    answer:
      'A Pro family group supports up to five members, with owner, editor and viewer access levels.',
  },
  {
    category: 'account-security',
    question: 'Can I download or delete my data?',
    answer:
      'Yes. Both data export and permanent account deletion are available from the Privacy & data section in Settings.',
  },
  {
    category: 'getting-started',
    question: 'What should I set up first?',
    answer:
      'Start with your preferred currency and primary wallet, then add recent transactions so the dashboard can show a useful overview.',
  },
  {
    category: 'wallets-transactions',
    question: 'Can I import the same CSV more than once?',
    answer:
      'Review the import preview before confirming. If a statement overlaps with existing records, skip repeated rows to avoid duplicates.',
  },
  {
    category: 'budgets-goals',
    question: 'When does budget progress update?',
    answer:
      'Budget progress updates as categorized expense transactions are added, edited or removed during the active budget period.',
  },
  {
    category: 'budgets-goals',
    question: 'Can I contribute to a savings goal gradually?',
    answer:
      'Yes. Record contributions whenever you save money and MoneyBag will track the remaining amount and overall progress.',
  },
  {
    category: 'family',
    question: 'Can every family member edit shared data?',
    answer:
      'Not necessarily. The owner can assign editor or viewer access so each member has the right level of control.',
  },
  {
    category: 'account-security',
    question: 'What if I lose access to my authenticator app?',
    answer:
      'Use one of the backup codes saved during two-factor authentication setup, then update your security settings after signing in.',
  },
  {
    category: 'plans-billing',
    question: 'What is included in the Free plan?',
    answer:
      'The Free plan includes one wallet, up to 50 monthly transactions, two budgets, one savings goal and basic reports.',
  },
  {
    category: 'plans-billing',
    question: 'What happens when I cancel a paid plan?',
    answer:
      'Your paid access continues until the end of the active billing period. After that, the account returns to the available Free plan limits.',
  },
] as const;

const faqFilters: readonly { label: string; value: CategoryId | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Getting started', value: 'getting-started' },
  { label: 'Transactions', value: 'wallets-transactions' },
  { label: 'Planning', value: 'budgets-goals' },
  { label: 'Family', value: 'family' },
  { label: 'Security', value: 'account-security' },
  { label: 'Billing', value: 'plans-billing' },
];

const supportTopics = [
  { label: 'Wallets & transactions', value: 'wallets-transactions' },
  { label: 'Budgets & savings goals', value: 'budgets-goals' },
  { label: 'Family sharing', value: 'family' },
  { label: 'Account & security', value: 'account-security' },
  { label: 'Plans & billing', value: 'plans-billing' },
  { label: 'Something else', value: 'other' },
] as const;

const initialSupportRequests: readonly SupportRequest[] = [
  {
    id: 'MB-4792',
    subject: 'Imported transactions are missing categories',
    topic: 'Wallets & transactions',
    status: 'waiting',
    updatedAt: '2 hours ago',
  },
  {
    id: 'MB-4651',
    subject: 'Question about my Pro renewal date',
    topic: 'Plans & billing',
    status: 'resolved',
    updatedAt: '18 Jul, 2026',
  },
];

const toneClasses = {
  primary: 'bg-primary/10 text-primary',
  info: 'bg-info-soft text-info',
  success: 'bg-success-soft text-success',
  accent: 'bg-brand-accent-soft text-brand-accent',
  warning: 'bg-warning-soft text-warning',
  danger: 'bg-danger-soft text-danger',
} as const;

export function UserHelpCenter() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<CategoryId | 'all'>('all');
  const [selectedArticle, setSelectedArticle] = useState<HelpArticle | null>(null);
  const [supportOpen, setSupportOpen] = useState(false);
  const [supportSubmitted, setSupportSubmitted] = useState(false);
  const [supportTopic, setSupportTopic] = useState('wallets-transactions');
  const [supportSubject, setSupportSubject] = useState('');
  const [attachments, setAttachments] = useState<string[]>([]);
  const [supportRequests, setSupportRequests] = useState<SupportRequest[]>([
    ...initialSupportRequests,
  ]);
  const [allRequestsModalOpen, setAllRequestsModalOpen] = useState(false);
  const [latestRequestId, setLatestRequestId] = useState('MB-4821');
  const [faqCategory, setFaqCategory] = useState<CategoryId | 'all'>('all');
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [articleFeedback, setArticleFeedback] = useState<Record<string, 'helpful' | 'not-helpful'>>(
    {},
  );
  const [feedbackNote, setFeedbackNote] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<Record<string, boolean>>({});
  const supportTriggerRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const nextRequestNumberRef = useRef(4821);

  useEffect(() => {
    const focusSearch = (event: KeyboardEvent) => {
      const activeElement = document.activeElement;
      const isTyping =
        activeElement instanceof HTMLInputElement ||
        activeElement instanceof HTMLTextAreaElement ||
        activeElement instanceof HTMLSelectElement;

      if (event.key === '/' && !isTyping) {
        event.preventDefault();
        searchRef.current?.focus();
      }
    };

    window.addEventListener('keydown', focusSearch);
    return () => window.removeEventListener('keydown', focusSearch);
  }, []);

  const normalizedQuery = query.trim().toLowerCase();
  const visibleArticles = useMemo(
    () =>
      articles.filter((article) => {
        const matchesCategory = category === 'all' || article.category === category;
        const searchableText = [article.title, article.summary, ...article.steps]
          .join(' ')
          .toLowerCase();
        return matchesCategory && (!normalizedQuery || searchableText.includes(normalizedQuery));
      }),
    [category, normalizedQuery],
  );

  const categoryTitle = categories.find((item) => item.id === category)?.title;
  const resultTitle = normalizedQuery
    ? `Search results for “${query.trim()}”`
    : categoryTitle
      ? `${categoryTitle} guides`
      : 'All guides';
  const displayedArticles = visibleArticles;
  const visibleFaqs =
    faqCategory === 'all'
      ? frequentlyAsked
      : frequentlyAsked.filter((item) => item.category === faqCategory);
  const faqColumnSize = Math.ceil(visibleFaqs.length / 2);
  const faqColumns = [visibleFaqs.slice(0, faqColumnSize), visibleFaqs.slice(faqColumnSize)];

  const resetFilters = () => {
    setQuery('');
    setCategory('all');
  };

  const openSupport = () => {
    setSupportSubmitted(false);
    setSupportTopic('wallets-transactions');
    setSupportSubject('');
    setAttachments([]);
    setSupportOpen(true);
  };

  const closeSupport = () => {
    setSupportOpen(false);
    setSupportSubmitted(false);
    window.setTimeout(() => supportTriggerRef.current?.focus(), 0);
  };

  const submitSupportRequest = () => {
    const requestId = `MB-${nextRequestNumberRef.current}`;
    nextRequestNumberRef.current += 1;
    const topic = supportTopics.find((item) => item.value === supportTopic)?.label ?? 'Other';

    setLatestRequestId(requestId);
    setSupportRequests((current) => [
      {
        id: requestId,
        subject: supportSubject,
        topic,
        status: 'open',
        updatedAt: 'Just now',
      },
      ...current,
    ]);
    setSupportSubmitted(true);
  };

  return (
    <div className="min-w-0 space-y-6">
      <AppPageHeader
        actions={
          <AppButton ref={supportTriggerRef} onClick={openSupport} size="sm">
            <MessageCircleMore />
            Contact support
          </AppButton>
        }
        description="Find clear answers, step-by-step guides and the right support when you need it."
        title="Help Center"
      />

      <AppCard className="relative isolate overflow-hidden border-primary/20 bg-linear-to-br from-primary/12 via-card to-info/8 px-5 py-9 sm:px-8 sm:py-11 lg:py-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-24 -z-1 size-64 rounded-full bg-primary/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-28 left-1/4 -z-1 size-56 rounded-full bg-info/10 blur-3xl"
        />
        <div className="mx-auto max-w-2xl text-center">
          <AppBadge className="gap-1.5 bg-primary/10 text-primary" size="lg">
            MONEYBAG SUPPORT
          </AppBadge>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
            How can we help you today?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
            Search the guides or choose a topic below to find the answer you need.
          </p>
          <AppInput
            aria-label="Search help articles"
            className="h-12 border-border bg-card text-sm shadow-sm"
            containerClassName="mx-auto mt-6 max-w-xl text-left"
            leading={<Search />}
            onChange={(event) => {
              setQuery(event.target.value);
              setCategory('all');
            }}
            placeholder="Search help articles..."
            ref={searchRef}
            value={query}
          />
        </div>
      </AppCard>

      <AppCard className="overflow-hidden" padding="none">
        <div className="grid min-w-0 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="border-b border-border bg-muted/30 p-4 lg:border-b-0 lg:border-r lg:p-5">
            <div>
              <h2 className="text-sm font-semibold" id="help-categories-title">
                Help topics
              </h2>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Browse {articles.length} step-by-step guides.
              </p>
            </div>
            <nav
              aria-labelledby="help-categories-title"
              className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1"
            >
              <button
                aria-pressed={category === 'all' && !normalizedQuery}
                className={cn(
                  'flex min-w-0 items-center gap-3 rounded-md border border-transparent px-3 py-2.5 text-left transition-colors',
                  category === 'all' && !normalizedQuery
                    ? 'border-primary/20 bg-primary/10 text-primary'
                    : 'hover:bg-card',
                )}
                onClick={resetFilters}
                type="button"
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
                  <BookOpenText className="size-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium">All guides</span>
                  <span className="block truncate text-[11px] text-muted-foreground">
                    Browse every topic
                  </span>
                </span>
                <span className="text-xs text-muted-foreground">{articles.length}</span>
              </button>
              {categories.map(({ description, icon: Icon, id, title, tone }) => {
                const active = category === id && !normalizedQuery;
                const count = articles.filter((article) => article.category === id).length;
                return (
                  <button
                    aria-pressed={active}
                    className={cn(
                      'flex min-w-0 items-center gap-3 rounded-md border border-transparent px-3 py-2.5 text-left transition-colors',
                      active ? 'border-primary/20 bg-primary/10 text-primary' : 'hover:bg-card',
                    )}
                    key={id}
                    onClick={() => {
                      setQuery('');
                      setCategory(id);
                    }}
                    type="button"
                  >
                    <span
                      className={cn(
                        'grid size-8 shrink-0 place-items-center rounded-md [&>svg]:size-4',
                        active ? 'bg-primary/10 text-primary' : toneClasses[tone],
                      )}
                    >
                      <Icon />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">{title}</span>
                      <span className="block truncate text-[11px] text-muted-foreground">
                        {description}
                      </span>
                    </span>
                    <span className="text-xs text-muted-foreground">{count}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          <section aria-live="polite" className="min-w-0">
            <div className="flex min-h-18 items-center justify-between gap-4 border-b border-border px-4 py-4 sm:px-5">
              <div>
                <h2 className="text-base font-semibold">{resultTitle}</h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  {displayedArticles.length}{' '}
                  {displayedArticles.length === 1 ? 'guide found' : 'guides found'}
                </p>
              </div>
              {category !== 'all' || normalizedQuery ? (
                <AppButton onClick={resetFilters} size="sm" tone="ghost">
                  Clear filter
                </AppButton>
              ) : null}
            </div>

            {displayedArticles.length ? (
              <div className="divide-y divide-border">
                {displayedArticles.map((article) => {
                  const articleCategory = categories.find((item) => item.id === article.category);
                  return (
                    <button
                      className="group flex w-full min-w-0 items-center gap-3 overflow-hidden px-4 py-4 text-left transition-colors hover:bg-muted/55 sm:gap-4 sm:px-5"
                      key={article.id}
                      onClick={() => {
                        setSelectedArticle(article);
                        setFeedbackNote('');
                      }}
                      type="button"
                    >
                      <span className="grid size-9 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
                        <FileText className="size-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex min-w-0 flex-wrap items-center gap-2">
                          <span className="line-clamp-2 min-w-0 text-sm font-medium transition-colors group-hover:text-primary sm:line-clamp-1">
                            {article.title}
                          </span>
                          {article.popular ? (
                            <AppBadge size="sm" status="info">
                              POPULAR
                            </AppBadge>
                          ) : null}
                        </span>
                        <span className="mt-1 line-clamp-2 block text-xs leading-5 text-muted-foreground sm:line-clamp-1 sm:leading-normal">
                          {article.summary}
                        </span>
                        <span className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
                          <span>{articleCategory?.title}</span>
                          <span aria-hidden="true">•</span>
                          <span className="inline-flex items-center gap-1">
                            <Clock3 className="size-3" /> {article.readTime}
                          </span>
                        </span>
                      </span>
                      <ChevronRight className="hidden size-4 shrink-0 text-muted-foreground transition-[color,transform] group-hover:translate-x-0.5 group-hover:text-primary sm:block" />
                    </button>
                  );
                })}
              </div>
            ) : (
              <AppEmptyState
                action={
                  <AppButton onClick={resetFilters} size="sm" tone="secondary">
                    Clear search
                  </AppButton>
                }
                className="min-h-80"
                description="Try a shorter phrase or choose a help topic."
                icon={<Search />}
                title="No matching guides"
              />
            )}
          </section>
        </div>
      </AppCard>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(300px,0.7fr)]">
        <AppCard aria-labelledby="frequently-asked-title">
          <div className="flex items-start gap-3 border-b border-border pb-5">
            <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-info-soft text-info">
              <CircleHelp className="size-5" />
            </span>
            <div>
              <h2 className="text-base font-semibold" id="frequently-asked-title">
                Frequently asked questions
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Quick answers to common MoneyBag questions.
              </p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {faqFilters.map((filter) => (
              <AppButton
                aria-pressed={faqCategory === filter.value}
                key={filter.value}
                onClick={() => {
                  setFaqCategory(filter.value);
                  setOpenFaq(null);
                }}
                size="xs"
                tone={faqCategory === filter.value ? 'primary' : 'secondary'}
              >
                {filter.label}
              </AppButton>
            ))}
          </div>
          <div className="mt-2 grid gap-x-7 lg:grid-cols-2">
            {faqColumns.map((column, columnIndex) => (
              <div className="self-start" key={columnIndex}>
                {column.map(({ answer, question }) => (
                  <details
                    className="group border-b border-border py-4"
                    key={question}
                    onToggle={(event) => {
                      if (event.currentTarget.open) setOpenFaq(question);
                      else if (openFaq === question) setOpenFaq(null);
                    }}
                    open={openFaq === question}
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium marker:hidden">
                      {question}
                      <ChevronRight className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-90" />
                    </summary>
                    <p className="mt-2 max-w-3xl pr-7 text-sm leading-6 text-muted-foreground">
                      {answer}
                    </p>
                  </details>
                ))}
              </div>
            ))}
          </div>
        </AppCard>

        <div className="space-y-6">
          <AppCard aria-live="polite">
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-lg bg-info-soft text-info">
                <Ticket className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="text-sm font-semibold">My support requests</h2>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {supportRequests.length} recent requests
                </p>
              </div>
            </div>
            <div className="mt-4 divide-y divide-border">
              {supportRequests.slice(0, 3).map((request) => (
                <div className="py-3 first:pt-0 last:pb-0" key={request.id}>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[11px] font-medium text-muted-foreground">
                      #{request.id}
                    </span>
                    <AppBadge
                      size="sm"
                      status={
                        request.status === 'resolved'
                          ? 'success'
                          : request.status === 'waiting'
                            ? 'warning'
                            : 'info'
                      }
                    >
                      {request.status === 'resolved'
                        ? 'RESOLVED'
                        : request.status === 'waiting'
                          ? 'WAITING'
                          : 'OPEN'}
                    </AppBadge>
                  </div>
                  <p className="mt-1.5 line-clamp-2 text-sm font-medium leading-5">
                    {request.subject}
                  </p>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    {request.topic} · {request.updatedAt}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4 border-t border-border pt-3">
              <AppButton
                className="w-full"
                onClick={() => setAllRequestsModalOpen(true)}
                size="sm"
                tone="secondary"
              >
                View all requests <ArrowRight className="size-3.5" />
              </AppButton>
            </div>
          </AppCard>

          <AppCard className="ui-gradient-cta-card relative overflow-hidden border-0 text-white">
            <div
              aria-hidden="true"
              className="absolute -right-12 -top-12 size-36 rounded-full border-24 border-white/6"
            />
            <span className="grid size-10 place-items-center rounded-lg bg-white/15 text-white">
              <MessageCircleMore className="size-5" />
            </span>
            <h2 className="mt-4 text-lg font-semibold">Still need help?</h2>
            <p className="mt-2 text-sm leading-6 text-white/75">
              Most questions receive a reply within 2–4 hours on weekdays.
            </p>
            <AppButton
              className="mt-5 ui-light-control"
              onClick={openSupport}
              size="sm"
              tone="ghost"
            >
              Contact support <ArrowRight />
            </AppButton>
          </AppCard>
        </div>
      </section>

      <AppModal
        description="View all your past and active support tickets."
        footer={
          <div className="flex w-full flex-col-reverse gap-2 [&>button]:w-full sm:flex-row sm:justify-between sm:[&>button]:w-auto">
            <AppButton
              onClick={() => {
                setAllRequestsModalOpen(false);
                openSupport();
              }}
              size="sm"
            >
              <MessageCircleMore /> Contact support
            </AppButton>
            <AppButton onClick={() => setAllRequestsModalOpen(false)} tone="secondary">
              Close
            </AppButton>
          </div>
        }
        onOpenChange={setAllRequestsModalOpen}
        open={allRequestsModalOpen}
        title="All support requests"
      >
        <div className="divide-y divide-border">
          {supportRequests.map((request) => (
            <div className="py-3.5 first:pt-0 last:pb-0" key={request.id}>
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-semibold text-muted-foreground">#{request.id}</span>
                <AppBadge
                  size="sm"
                  status={
                    request.status === 'resolved'
                      ? 'success'
                      : request.status === 'waiting'
                        ? 'warning'
                        : 'info'
                  }
                >
                  {request.status === 'resolved'
                    ? 'RESOLVED'
                    : request.status === 'waiting'
                      ? 'WAITING'
                      : 'OPEN'}
                </AppBadge>
              </div>
              <p className="mt-2 text-sm font-medium leading-5">{request.subject}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {request.topic} · Last updated {request.updatedAt}
              </p>
            </div>
          ))}
        </div>
      </AppModal>

      <AppModal
        description={
          supportSubmitted
            ? 'Your request has been added to the support queue.'
            : 'Tell us what happened and our team will reply to your account email.'
        }
        footer={
          supportSubmitted ? (
            <AppButton onClick={closeSupport}>Back to Help Center</AppButton>
          ) : (
            <div className="flex w-full flex-col-reverse gap-2 [&>button]:w-full sm:flex-row sm:justify-end sm:[&>button]:w-auto">
              <AppButton onClick={closeSupport} tone="secondary" type="button">
                Cancel
              </AppButton>
              <AppButton form="support-request-form" type="submit">
                Send request <Send />
              </AppButton>
            </div>
          )
        }
        onOpenChange={(open) => {
          if (open) setSupportOpen(true);
          else closeSupport();
        }}
        open={supportOpen}
        title={supportSubmitted ? 'Request received' : 'Contact support'}
      >
        {supportSubmitted ? (
          <div className="flex flex-col items-center px-3 py-7 text-center">
            <span className="grid size-12 place-items-center rounded-full bg-success-soft text-success">
              <CheckCircle2 className="size-6" />
            </span>
            <h3 className="mt-4 text-base font-semibold">We’re on it</h3>
            <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
              A confirmation has been sent to anika@moneybag.app. Most requests receive a reply
              within 2–4 hours on weekdays.
            </p>
            <AppBadge className="mt-4" status="success">
              Request #{latestRequestId}
            </AppBadge>
          </div>
        ) : (
          <form
            className="space-y-5"
            id="support-request-form"
            onSubmit={(event) => {
              event.preventDefault();
              event.currentTarget.reset();
              submitSupportRequest();
            }}
          >
            <div className="rounded-lg border border-info/20 bg-info-soft p-3.5">
              <div className="flex items-start gap-3">
                <Clock3 className="mt-0.5 size-4 shrink-0 text-info" />
                <div>
                  <p className="text-sm font-medium text-info">Typical reply in 2–4 hours</p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    Replies will be sent to anika@moneybag.app.
                  </p>
                </div>
              </div>
            </div>
            <AppField label="What do you need help with?" required>
              <AppSelect
                ariaLabel="Support topic"
                name="topic"
                onValueChange={(value) => {
                  if (value) setSupportTopic(value);
                }}
                options={supportTopics}
                value={supportTopic}
              />
            </AppField>
            <AppField label="Subject" required>
              <AppInput
                autoFocus
                name="subject"
                onChange={(event) => setSupportSubject(event.target.value)}
                placeholder="Briefly describe the issue"
                required
                value={supportSubject}
              />
            </AppField>
            <AppField
              description="Include what you expected and what happened instead."
              label="Message"
              required
            >
              <AppTextarea
                className="min-h-32 resize-none"
                name="message"
                placeholder="Share the details that will help us investigate..."
                required
              />
            </AppField>
            <AppField label="Attachment">
              <AppFileUpload
                accept=".png,.jpg,.jpeg,.pdf,.csv"
                description="Screenshot, receipt, PDF or CSV · up to 5 MB each"
                files={attachments}
                label="Attach a file"
                multiple
                onFiles={(files) => {
                  if (!files) return;
                  setAttachments(
                    Array.from(files)
                      .filter((file) => file.size <= 5 * 1024 * 1024)
                      .map((file) => file.name),
                  );
                }}
                onRemove={(file) =>
                  setAttachments((current) => current.filter((item) => item !== file))
                }
              />
            </AppField>
            <div className="rounded-md bg-muted/55 px-3 py-2.5 text-xs leading-5 text-muted-foreground">
              We’ll automatically include your current page, account plan and app version so you
              don’t have to repeat that context.
            </div>
          </form>
        )}
      </AppModal>

      <AppModal
        description={
          selectedArticle
            ? `${categories.find((item) => item.id === selectedArticle.category)?.title} · ${selectedArticle.readTime}`
            : undefined
        }
        footer={
          selectedArticle ? (
            <div className="flex w-full flex-col-reverse gap-2 [&>button]:w-full sm:flex-row sm:justify-end sm:[&>button]:w-auto">
              <AppButton onClick={() => setSelectedArticle(null)} tone="secondary">
                Close guide
              </AppButton>
              <AppButton nativeButton={false} render={<Link href={selectedArticle.route} />}>
                {selectedArticle.actionLabel} <ArrowRight />
              </AppButton>
            </div>
          ) : null
        }
        onOpenChange={(open) => {
          if (!open) setSelectedArticle(null);
        }}
        open={Boolean(selectedArticle)}
        title={selectedArticle?.title ?? 'Help guide'}
      >
        {selectedArticle ? (
          <div>
            <div className="flex items-start gap-3 rounded-lg bg-muted/65 p-4">
              <BookOpenText className="mt-0.5 size-5 shrink-0 text-primary" />
              <p className="text-sm leading-6 text-muted-foreground">{selectedArticle.summary}</p>
            </div>
            <ol className="mt-5 space-y-5">
              {selectedArticle.steps.map((step, index) => (
                <li className="flex gap-3" key={step}>
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    {index + 1}
                  </span>
                  <p className="pt-0.5 text-sm leading-6">{step}</p>
                </li>
              ))}
            </ol>
            <div className="mt-6 border-t border-border pt-5">
              <h3 className="text-sm font-semibold">Related guides</h3>
              <div className="mt-3 space-y-2">
                {articles
                  .filter(
                    (article) =>
                      article.category === selectedArticle.category &&
                      article.id !== selectedArticle.id,
                  )
                  .slice(0, 2)
                  .map((article) => (
                    <button
                      className="group flex w-full items-center gap-3 rounded-md border border-border p-3 text-left hover:border-primary/30 hover:bg-muted/45"
                      key={article.id}
                      onClick={() => {
                        setSelectedArticle(article);
                        setFeedbackNote('');
                      }}
                      type="button"
                    >
                      <FileText className="size-4 shrink-0 text-primary" />
                      <span className="min-w-0 flex-1 truncate text-sm font-medium">
                        {article.title}
                      </span>
                      <ChevronRight className="size-4 shrink-0 text-muted-foreground group-hover:text-primary" />
                    </button>
                  ))}
              </div>
            </div>
            <div className="mt-6 border-t border-border pt-5">
              <h3 className="text-sm font-semibold">Was this guide helpful?</h3>
              <div className="mt-3 flex gap-2">
                <AppButton
                  onClick={() => {
                    setArticleFeedback((current) => ({
                      ...current,
                      [selectedArticle.id]: 'helpful',
                    }));
                    setFeedbackSubmitted((current) => ({
                      ...current,
                      [selectedArticle.id]: true,
                    }));
                  }}
                  size="sm"
                  tone={articleFeedback[selectedArticle.id] === 'helpful' ? 'primary' : 'secondary'}
                >
                  <ThumbsUp /> Yes
                </AppButton>
                <AppButton
                  onClick={() => {
                    setArticleFeedback((current) => ({
                      ...current,
                      [selectedArticle.id]: 'not-helpful',
                    }));
                    setFeedbackSubmitted((current) => ({
                      ...current,
                      [selectedArticle.id]: false,
                    }));
                  }}
                  size="sm"
                  tone={
                    articleFeedback[selectedArticle.id] === 'not-helpful' ? 'primary' : 'secondary'
                  }
                >
                  <ThumbsDown /> Not really
                </AppButton>
              </div>
              {articleFeedback[selectedArticle.id] === 'not-helpful' &&
              !feedbackSubmitted[selectedArticle.id] ? (
                <form
                  className="mt-4"
                  onSubmit={(event) => {
                    event.preventDefault();
                    setFeedbackSubmitted((current) => ({
                      ...current,
                      [selectedArticle.id]: true,
                    }));
                  }}
                >
                  <AppTextarea
                    className="min-h-20 resize-none"
                    onChange={(event) => setFeedbackNote(event.target.value)}
                    placeholder="What was missing or unclear?"
                    value={feedbackNote}
                  />
                  <AppButton className="mt-2" size="sm" type="submit">
                    Send feedback
                  </AppButton>
                </form>
              ) : null}
              {feedbackSubmitted[selectedArticle.id] ? (
                <p className="mt-3 flex items-center gap-2 text-xs font-medium text-success">
                  <CheckCircle2 className="size-4" /> Thanks—your feedback helps us improve this
                  guide.
                </p>
              ) : null}
            </div>
          </div>
        ) : null}
      </AppModal>
    </div>
  );
}

export { UserHelpCenter as HelpCenter };
