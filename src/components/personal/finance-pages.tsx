'use client';

import {
  CalendarDays,
  Check,
  ChevronDown,
  Download,
  Edit3,
  Filter,
  FolderOpen,
  Goal,
  Hash,
  Landmark,
  Plus,
  ReceiptText,
  Search,
  ShoppingBag,
  Target,
  Trash2,
  TrendingDown,
  TrendingUp,
  Upload,
  Utensils,
  WalletCards,
  X,
} from 'lucide-react';
import type { ComponentType, ReactNode } from 'react';
import { useEffect, useMemo, useState } from 'react';

import {
  AppBadge,
  AppButton,
  AppCard,
  AppConfirmDialog,
  AppEmptyState,
  AppField,
  AppInput,
  AppModal,
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

const categorySeed = [
  {
    id: 1,
    name: 'Food & Dining',
    type: 'Expense',
    icon: Utensils,
    color: 'bg-orange-100 text-orange-600',
    transactions: 24,
    amount: '৳ 12,450',
    totalTransactions: 86,
    totalAmount: '৳ 48,920',
  },
  {
    id: 2,
    name: 'Transport',
    type: 'Expense',
    icon: ChevronDown,
    color: 'bg-blue-100 text-blue-600',
    transactions: 18,
    amount: '৳ 5,280',
    totalTransactions: 64,
    totalAmount: '৳ 21,450',
  },
  {
    id: 3,
    name: 'Shopping',
    type: 'Expense',
    icon: ShoppingBag,
    color: 'bg-pink-100 text-pink-600',
    transactions: 12,
    amount: '৳ 8,920',
    totalTransactions: 42,
    totalAmount: '৳ 31,780',
  },
  {
    id: 4,
    name: 'Salary',
    type: 'Income',
    icon: WalletCards,
    color: 'bg-emerald-100 text-emerald-600',
    transactions: 2,
    amount: '৳ 85,000',
    totalTransactions: 18,
    totalAmount: '৳ 765,000',
  },
  {
    id: 5,
    name: 'Bills & Utilities',
    type: 'Expense',
    icon: Hash,
    color: 'bg-violet-100 text-violet-600',
    transactions: 9,
    amount: '৳ 7,650',
    totalTransactions: 35,
    totalAmount: '৳ 28,650',
  },
  {
    id: 6,
    name: 'Entertainment',
    type: 'Expense',
    icon: FolderOpen,
    color: 'bg-amber-100 text-amber-600',
    transactions: 7,
    amount: '৳ 3,200',
    totalTransactions: 27,
    totalAmount: '৳ 14,900',
  },
];

export function CategoriesPage() {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('all');
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [editing, setEditing] = useState<(typeof categorySeed)[number] | null>(null);
  const [deleting, setDeleting] = useState<(typeof categorySeed)[number] | null>(null);
  const [categoryName, setCategoryName] = useState('');

  const filtered = useMemo(
    () =>
      categorySeed.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) &&
          (type === 'all' || item.type.toLowerCase() === type),
      ),
    [query, type],
  );
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, pageCount);
  const visible = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  const expenseCount = categorySeed.filter((c) => c.type === 'Expense').length;
  const incomeCount = categorySeed.filter((c) => c.type === 'Income').length;

  return (
    <div className="space-y-6">
      <AppPageHeader
        title="Categories"
        description="Organize your income and expenses to understand your spending better."
        actions={
          <AppButton
            onClick={() => {
              setEditing(null);
              setCategoryName('');
              setOpen(true);
            }}
            size="sm"
          >
            <Plus /> Add category
          </AppButton>
        }
      />
      <div className="grid gap-4 sm:grid-cols-3">
        <AppStatCard icon={<Hash />} label="Total categories" value={`${categorySeed.length}`} />
        <AppStatCard
          icon={<Hash />}
          label="Expense categories"
          tone="danger"
          value={`${expenseCount}`}
        />
        <AppStatCard
          icon={<Hash />}
          label="Income categories"
          tone="success"
          value={`${incomeCount}`}
        />
      </div>
      <AppCard padding="none" className="overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-border p-4 lg:flex-row lg:items-center lg:justify-between">
          <AppSegmentedControl
            className="w-full sm:w-72 lg:w-64 lg:shrink-0"
            onValueChange={(value) => {
              if (value === 'all' || value === 'expense' || value === 'income') {
                setType(value);
                setPage(1);
              }
            }}
            options={[
              { label: 'All', value: 'all' },
              { label: 'Expense', value: 'expense' },
              { label: 'Income', value: 'income' },
            ]}
            value={type}
          />
          <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center lg:justify-end">
            <AppInput
              className="pr-8!"
              containerClassName="w-full sm:w-80"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search categories"
              leading={<Search />}
              trailing={
                query ? (
                  <AppButton
                    aria-label="Clear category search"
                    className="size-5! rounded-sm! p-0!"
                    onClick={() => setQuery('')}
                    tone="ghost"
                  >
                    <X />
                  </AppButton>
                ) : null
              }
            />
          </div>
        </div>
        <AppTable
          className="rounded-none border-x-0 border-b-0"
          rows={visible}
          getRowKey={(row) => row.id}
          columns={[
            {
              key: 'name',
              header: 'Category',
              render: (row) => (
                <div className="flex items-center gap-3">
                  <span className={`grid size-9 place-items-center rounded-lg ${row.color}`}>
                    <row.icon className="size-4" />
                  </span>
                  <div>
                    <p className="font-medium">{row.name}</p>
                  </div>
                </div>
              ),
            },
            {
              key: 'type',
              header: 'Type',
              render: (row) => (
                <AppBadge status={row.type === 'Income' ? 'success' : 'danger'}>
                  {row.type}
                </AppBadge>
              ),
            },
            {
              key: 'amount',
              header: 'This month amount',
              render: (row) => <span className="font-semibold">{row.amount}</span>,
            },
            {
              key: 'transactions',
              header: 'This month transactions',
              render: (row) => <span className="text-muted-foreground">{row.transactions}</span>,
            },
            {
              key: 'totalAmount',
              header: 'Total amount',
              render: (row) => <span className="font-semibold">{row.totalAmount}</span>,
            },
            {
              key: 'totalTransactions',
              header: 'Total transactions',
              render: (row) => <span className="font-semibold">{row.totalTransactions}</span>,
            },
            {
              key: 'actions',
              header: '',
              align: 'right',
              render: (row) => (
                <div className="flex justify-end gap-1">
                  <AppButton
                    size="icon-sm"
                    tone="info"
                    aria-label={`Edit ${row.name}`}
                    onClick={() => {
                      setEditing(row);
                      setCategoryName(row.name);
                      setOpen(true);
                    }}
                  >
                    <Edit3 />
                  </AppButton>
                  <AppButton
                    size="icon-sm"
                    tone="danger"
                    aria-label={`Delete ${row.name}`}
                    onClick={() => setDeleting(row)}
                  >
                    <Trash2 />
                  </AppButton>
                </div>
              ),
            },
          ]}
        />
        <footer className="flex flex-col gap-3 border-t border-border px-4 py-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span>Rows</span>
            <AppSelect
              onValueChange={(value) => {
                setPageSize(Number(value ?? 5));
                setPage(1);
              }}
              options={[5, 10, 20, 30, 50].map((value) => ({
                label: `${value}`,
                value: `${value}`,
              }))}
              size="sm"
              triggerClassName="w-20"
              value={`${pageSize}`}
            />
            <span>
              Showing {visible.length} of {filtered.length}
            </span>
          </div>
          <AppPagination onPageChange={setPage} page={safePage} totalPages={pageCount} />
        </footer>
      </AppCard>
      <AppModal
        open={open}
        onOpenChange={setOpen}
        title={editing ? 'Edit category' : 'Add category'}
        description={
          editing ? 'Update this category details.' : 'Create a category for your transactions.'
        }
        footer={
          <>
            <AppButton
              tone="secondary"
              onClick={() => {
                setOpen(false);
                setEditing(null);
                setCategoryName('');
              }}
            >
              Cancel
            </AppButton>
            <AppButton
              onClick={() => {
                setOpen(false);
                setEditing(null);
                setCategoryName('');
              }}
            >
              <Check /> {editing ? 'Save changes' : 'Create category'}
            </AppButton>
          </>
        }
      >
        <div className="space-y-4">
          <AppField label="Category name" required>
            <AppInput
              onChange={(event) => setCategoryName(event.target.value)}
              placeholder="e.g. Health & wellness"
              value={categoryName}
            />
          </AppField>
          <AppField label="Category type">
            <AppSelect
              ariaLabel="Category type"
              options={[
                { label: 'Expense', value: 'expense' },
                { label: 'Income', value: 'income' },
              ]}
              placeholder="Select type"
            />
          </AppField>
        </div>
      </AppModal>
      <AppConfirmDialog
        open={Boolean(deleting)}
        onOpenChange={(nextOpen) => !nextOpen && setDeleting(null)}
        title="Delete category?"
        description={`This will remove ${deleting?.name ?? 'this category'} from your workspace.`}
        confirmLabel="Delete category"
        onConfirm={() => setDeleting(null)}
      />
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
