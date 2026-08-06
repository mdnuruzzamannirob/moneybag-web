'use client';

import {
  CalendarDays,
  Download,
  Filter,
  Goal,
  Landmark,
  Plus,
  ReceiptText,
  Search,
  Target,
  TrendingDown,
  TrendingUp,
  Upload,
  WalletCards,
  X,
} from 'lucide-react';
import type { ComponentType, ReactNode } from 'react';
import { useEffect, useMemo, useState } from 'react';

import {
  AppBadge,
  AppButton,
  AppCard,
  AppEmptyState,
  AppInput,
  AppPageHeader,
  AppPagination,
  AppProgress,
  AppSegmentedControl,
  AppSelect,
  AppStatCard,
  AppTable,
  type AppTableColumn,
} from '@/components/app-ui';
import {
  FinanceDialog,
  RowMenu,
  type FinanceDialogKind,
} from '@/components/personal/finance-dialog';
import { cn } from '@/lib/utils';

const nf = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
const money = (value: number) => `৳${nf.format(value)}`;

type Transaction = {
  id: number;
  title: string;
  category: string;
  wallet: string;
  date: string;
  amount: number;
  note: string;
  type: 'income' | 'expense';
  icon: string;
  color: string;
};
type Budget = {
  id: number;
  category: string;
  icon: string;
  spent: number;
  limit: number;
  color: string;
  rollover: boolean;
  alert: number;
};
type SavingsGoal = {
  id: number;
  title: string;
  icon: string;
  saved: number;
  target: number;
  deadline: string;
  color: string;
  note: string;
};

const txSeed: Transaction[] = [
  {
    id: 1,
    title: 'Monthly salary',
    category: 'Salary',
    wallet: 'BRAC Bank',
    date: '28 Jul, 2026',
    amount: 85000,
    note: 'Monthly salary deposit',
    type: 'income',
    icon: 'S',
    color: '#10b981',
  },
  {
    id: 2,
    title: 'Grocery shopping at Agora',
    category: 'Food',
    wallet: 'Cash',
    date: '26 Jul, 2026',
    amount: 2450,
    note: 'Weekly grocery run',
    type: 'expense',
    icon: 'F',
    color: '#f59e0b',
  },
  {
    id: 3,
    title: 'Uber ride to Dhanmondi',
    category: 'Transport',
    wallet: 'bKash',
    date: '25 Jul, 2026',
    amount: 320,
    note: 'Ride to client meeting',
    type: 'expense',
    icon: 'T',
    color: '#3b82f6',
  },
  {
    id: 4,
    title: 'Freelance project payment',
    category: 'Freelance',
    wallet: 'BRAC Bank',
    date: '24 Jul, 2026',
    amount: 18200,
    note: 'July freelance invoice',
    type: 'income',
    icon: 'F',
    color: '#8b5cf6',
  },
  {
    id: 5,
    title: 'Netflix subscription',
    category: 'Entertainment',
    wallet: 'City Bank Card',
    date: '24 Jul, 2026',
    amount: 650,
    note: 'Monthly entertainment plan',
    type: 'expense',
    icon: 'E',
    color: '#ec4899',
  },
  {
    id: 6,
    title: 'Electricity bill',
    category: 'Bills',
    wallet: 'bKash',
    date: '22 Jul, 2026',
    amount: 1840,
    note: 'July utility payment',
    type: 'expense',
    icon: 'B',
    color: '#ef4444',
  },
];
const budgetSeed: Budget[] = [
  {
    id: 1,
    category: 'Food & dining',
    icon: 'F',
    spent: 6830,
    limit: 9000,
    color: '#f59e0b',
    rollover: true,
    alert: 80,
  },
  {
    id: 2,
    category: 'Transport',
    icon: 'T',
    spent: 820,
    limit: 3000,
    color: '#3b82f6',
    rollover: false,
    alert: 80,
  },
  {
    id: 3,
    category: 'Shopping',
    icon: 'S',
    spent: 4850,
    limit: 5000,
    color: '#ec4899',
    rollover: false,
    alert: 90,
  },
  {
    id: 4,
    category: 'Entertainment',
    icon: 'E',
    spent: 1450,
    limit: 2500,
    color: '#8b5cf6',
    rollover: true,
    alert: 80,
  },
];
const goalSeed: SavingsGoal[] = [
  {
    id: 1,
    title: 'Emergency fund',
    icon: 'E',
    saved: 32500,
    target: 50000,
    deadline: '31 Dec, 2026',
    color: '#10b981',
    note: '17,500 left to reach your safety net',
  },
  {
    id: 2,
    title: 'New MacBook Pro',
    icon: 'M',
    saved: 95000,
    target: 180000,
    deadline: '15 Nov, 2026',
    color: '#6366f1',
    note: 'You are ahead of your monthly plan',
  },
  {
    id: 3,
    title: "Cox's Bazar trip",
    icon: 'C',
    saved: 25000,
    target: 25000,
    deadline: '30 Aug, 2026',
    color: '#06b6d4',
    note: 'Goal completed - ready to go!',
  },
  {
    id: 4,
    title: 'Home down payment',
    icon: 'H',
    saved: 120000,
    target: 500000,
    deadline: '30 Jun, 2027',
    color: '#ec4899',
    note: 'Set aside BDT 25,000 each month',
  },
];

function PageHeader({
  children,
  description,
  title,
}: {
  children?: ReactNode;
  description: string;
  title: string;
}) {
  return <AppPageHeader actions={children} description={description} title={title} />;
}

function Stat({
  icon: Icon,
  label,
  tone = 'primary',
  value,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  tone?: 'primary' | 'success' | 'danger' | 'warning';
  value: string;
}) {
  return <AppStatCard icon={<Icon />} label={label} tone={tone} value={value} />;
}

export function TransactionsPage() {
  const [items] = useState(txSeed);
  const [type, setType] = useState<'all' | 'income' | 'expense'>('all');
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const [dialog, setDialog] = useState<FinanceDialogKind | null>(null);

  useEffect(() => {
    const timeout = window.setTimeout(() => setDebouncedQuery(query), 300);
    return () => window.clearTimeout(timeout);
  }, [query]);

  const categoryOptions = [
    { label: 'All categories', value: 'all' },
    ...Array.from(new Set(items.map((item) => item.category))).map((item) => ({
      label: item,
      value: item,
    })),
  ];

  const filtered = useMemo(
    () =>
      items.filter(
        (item) =>
          (type === 'all' || item.type === type) &&
          (category === 'all' || item.category === category) &&
          `${item.title} ${item.category} ${item.wallet}`
            .toLowerCase()
            .includes(debouncedQuery.toLowerCase()),
      ),
    [items, type, category, debouncedQuery],
  );

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, pageCount);
  const visible = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  const columns: readonly AppTableColumn<Transaction>[] = [
    {
      key: 'description',
      header: 'Description',
      render: (item) => <TransactionIdentity item={item} />,
    },
    {
      key: 'category',
      header: 'Category',
      render: (item) => (
        <AppBadge className="rounded-md" status="neutral">
          {item.category}
        </AppBadge>
      ),
    },
    {
      key: 'type',
      header: 'Type',
      render: (item) => (
        <AppBadge className="rounded-md" status={item.type === 'income' ? 'success' : 'danger'}>
          {item.type === 'income' ? 'Income' : 'Expense'}
        </AppBadge>
      ),
    },
    {
      key: 'wallet',
      header: 'Wallet',
      render: (item) => <span className="text-muted-foreground">{item.wallet}</span>,
    },
    {
      key: 'date',
      header: 'Date',
      render: (item) => <span className="text-muted-foreground">{item.date}</span>,
    },
    {
      align: 'right',
      key: 'amount',
      header: 'Amount',
      render: (item) => <TransactionAmount item={item} />,
    },
    {
      align: 'right',
      key: 'actions',
      header: '',
      render: () => <RowMenu kind="transaction" />,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        description="Review, search, and manage every money movement."
        title="Transactions"
      >
        <AppButton onClick={() => setDialog('import')} size="sm" tone="secondary">
          <Upload />
          Import CSV
        </AppButton>
        <AppButton onClick={() => setDialog('export')} size="sm" tone="secondary">
          <Download />
          Export
        </AppButton>
        <AppButton onClick={() => setDialog('transaction')} size="sm">
          <Plus />
          Add transaction
        </AppButton>
      </PageHeader>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat icon={ReceiptText} label="All transactions" value={`${items.length}`} />
        <Stat icon={TrendingUp} label="Income - July" tone="success" value={money(103200)} />
        <Stat icon={TrendingDown} label="Expenses - July" tone="danger" value={money(13200)} />
        <Stat icon={CalendarDays} label="This week" tone="warning" value="6 entries" />
      </section>

      <AppCard padding="none">
        <div className="flex flex-col gap-3 p-4 lg:flex-row lg:items-center lg:justify-between">
          <AppSegmentedControl
            className="w-full sm:w-72 lg:w-64 lg:shrink-0"
            onValueChange={(value) => {
              if (value === 'all' || value === 'income' || value === 'expense') {
                setType(value);
                setPage(1);
              }
            }}
            options={[
              { label: 'All', value: 'all' },
              { label: 'Income', value: 'income' },
              { label: 'Expense', value: 'expense' },
            ]}
            value={type}
          />
          <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center lg:justify-end">
            <AppInput
              containerClassName="w-full sm:w-80"
              className="pr-8!"
              leading={<Search />}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
              placeholder="Search transactions"
              trailing={
                query ? (
                  <AppButton
                    aria-label="Clear search"
                    className="size-5! rounded-sm! p-0!"
                    onClick={() => {
                      setQuery('');
                      setPage(1);
                    }}
                    tone="ghost"
                  >
                    <X />
                  </AppButton>
                ) : null
              }
              value={query}
            />
            <AppSelect
              triggerClassName="w-full sm:w-48"
              onValueChange={(value) => {
                setCategory(value ?? 'all');
                setPage(1);
              }}
              options={categoryOptions}
              value={category}
            />
          </div>
        </div>

        {visible.length === 0 ? (
          <AppEmptyState
            action={
              <AppButton onClick={() => setDialog('transaction')} size="sm">
                <Plus /> Add transaction
              </AppButton>
            }
            description="Try clearing your search query or changing filters."
            icon={<Filter />}
            title="No transactions found"
          />
        ) : (
          <AppTable<Transaction> columns={columns} rows={visible} getRowKey={(row) => row.id} />
        )}

        <div className="border-t border-border p-4">
          <AppPagination onPageChange={setPage} page={safePage} totalPages={pageCount} />
        </div>
      </AppCard>

      {dialog ? <FinanceDialog kind={dialog} onClose={() => setDialog(null)} /> : null}
    </div>
  );
}

function TransactionIdentity({ item }: { item: Transaction }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="grid size-9 shrink-0 place-items-center rounded-lg text-xs font-semibold"
        style={{ backgroundColor: `${item.color}1c`, color: item.color }}
      >
        {item.icon}
      </span>
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-foreground">{item.title}</p>
        <p className="truncate text-xs text-muted-foreground">{item.note}</p>
      </div>
    </div>
  );
}

function TransactionAmount({ item }: { item: Transaction }) {
  return (
    <span
      className={cn(
        'text-sm font-semibold',
        item.type === 'income' ? 'text-success' : 'text-foreground',
      )}
    >
      {item.type === 'income' ? '+' : '-'}
      {money(item.amount)}
    </span>
  );
}

export function CategoriesPage() {
  const [dialog, setDialog] = useState<FinanceDialogKind | null>(null);
  return (
    <div className="space-y-6">
      <PageHeader description="Organize your spending into clear categories." title="Categories">
        <AppButton onClick={() => setDialog('budget')} size="sm">
          <Plus />
          Add category
        </AppButton>
      </PageHeader>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat icon={WalletCards} label="Categories" value="12 total" />
        <Stat
          icon={TrendingDown}
          label="Top expense category"
          tone="danger"
          value="Food & dining"
        />
        <Stat icon={TrendingUp} label="Top income category" tone="success" value="Salary" />
        <Stat icon={Target} label="Budgeted categories" tone="warning" value="4 active" />
      </section>
      <AppCard>
        <p className="text-sm text-muted-foreground">Category breakdown and configuration view.</p>
      </AppCard>
      {dialog ? <FinanceDialog kind={dialog} onClose={() => setDialog(null)} /> : null}
    </div>
  );
}

export function BudgetsPage() {
  const [dialog, setDialog] = useState<FinanceDialogKind | null>(null);
  const totalSpent = budgetSeed.reduce((sum, item) => sum + item.spent, 0);
  const totalLimit = budgetSeed.reduce((sum, item) => sum + item.limit, 0);
  return (
    <div className="space-y-6">
      <PageHeader
        description="Keep your spending under control with monthly targets."
        title="Budgets"
      >
        <AppButton onClick={() => setDialog('budget')} size="sm">
          <Plus />
          Create budget
        </AppButton>
      </PageHeader>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat icon={Target} label="Active budgets" value={`${budgetSeed.length}`} />
        <Stat icon={TrendingDown} label="Total spent" tone="warning" value={money(totalSpent)} />
        <Stat icon={Landmark} label="Total limit" tone="success" value={money(totalLimit)} />
        <Stat
          icon={WalletCards}
          label="Overall progress"
          value={`${Math.round((totalSpent / totalLimit) * 100)}%`}
        />
      </section>
      <section className="grid gap-4 md:grid-cols-2">
        {budgetSeed.map((budget) => (
          <BudgetCard budget={budget} key={budget.id} />
        ))}
      </section>
      {dialog ? <FinanceDialog kind={dialog} onClose={() => setDialog(null)} /> : null}
    </div>
  );
}

function BudgetCard({ budget }: { budget: Budget }) {
  const progress = Math.round((budget.spent / budget.limit) * 100);
  const remaining = budget.limit - budget.spent;
  return (
    <AppCard>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className="grid size-10 place-items-center rounded-lg text-sm font-semibold"
            style={{ backgroundColor: `${budget.color}1c`, color: budget.color }}
          >
            {budget.icon}
          </span>
          <div>
            <h2 className="text-sm font-semibold">{budget.category}</h2>
            <p className="text-xs text-muted-foreground">
              {money(remaining)} remaining of {money(budget.limit)}
            </p>
          </div>
        </div>
        <RowMenu kind="budget" />
      </div>
      <AppProgress
        className="mt-4"
        tone={progress >= 80 ? 'warning' : 'primary'}
        value={progress}
      />
      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <span>{money(budget.spent)} spent</span>
        <span>{progress}% used</span>
      </div>
    </AppCard>
  );
}

export function GoalsPage() {
  const [dialog, setDialog] = useState<FinanceDialogKind | null>(null);
  const saved = goalSeed.reduce((sum, item) => sum + item.saved, 0);
  const target = goalSeed.reduce((sum, item) => sum + item.target, 0);
  const completed = goalSeed.filter((item) => item.saved >= item.target).length;
  return (
    <div className="space-y-6">
      <PageHeader
        description="Build momentum towards the things that matter most."
        title="Savings goals"
      >
        <AppButton onClick={() => setDialog('goal')} size="sm">
          <Plus />
          New goal
        </AppButton>
      </PageHeader>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat icon={Goal} label="Active goals" value={`${goalSeed.length}`} />
        <Stat icon={Landmark} label="Total saved" tone="success" value={money(saved)} />
        <Stat
          icon={Target}
          label="Overall progress"
          value={`${Math.round((saved / target) * 100)}%`}
        />
        <Stat icon={TrendingUp} label="Completed" tone="warning" value={`${completed} goals`} />
      </section>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {goalSeed.map((goal) => (
          <GoalCard goal={goal} key={goal.id} onContribute={() => setDialog('contribution')} />
        ))}
      </section>
      {dialog ? <FinanceDialog kind={dialog} onClose={() => setDialog(null)} /> : null}
    </div>
  );
}

function GoalCard({ goal, onContribute }: { goal: SavingsGoal; onContribute: () => void }) {
  const progress = Math.round((goal.saved / goal.target) * 100);
  const completed = progress >= 100;
  return (
    <AppCard className="h-full">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span
            className="grid size-10 place-items-center rounded-lg text-sm font-semibold"
            style={{ backgroundColor: `${goal.color}1c`, color: goal.color }}
          >
            {goal.icon}
          </span>
          <div className="min-w-0">
            <h2 className="truncate text-sm font-semibold">{goal.title}</h2>
            <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
              <CalendarDays className="size-3" />
              Target {goal.deadline}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <AppBadge status={completed ? 'success' : 'info'}>
            {completed ? 'Completed' : `${progress}%`}
          </AppBadge>
          <RowMenu kind="goal" />
        </div>
      </div>
      <div className="mt-6 flex items-end justify-between gap-3">
        <p className="text-xl font-semibold tracking-tight">{money(goal.saved)}</p>
        <p className="pb-1 text-xs text-muted-foreground">of {money(goal.target)}</p>
      </div>
      <AppProgress className="mt-3" tone={completed ? 'success' : 'primary'} value={progress} />
      <p className={cn('mt-3 text-xs', completed ? 'text-success' : 'text-muted-foreground')}>
        {goal.note}
      </p>
      <div className="mt-5 flex min-h-10 items-center justify-end border-t border-border pt-4">
        <AppButton
          disabled={completed}
          onClick={onContribute}
          size="sm"
          tone={completed ? 'secondary' : 'primary'}
        >
          {completed ? 'Goal completed' : 'Add contribution'}
        </AppButton>
      </div>
    </AppCard>
  );
}
