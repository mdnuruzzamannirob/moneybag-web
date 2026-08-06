'use client';

import {
  AppBadge,
  AppButton,
  AppCard,
  AppConfirmDialog,
  AppField,
  AppInput,
  AppModal,
  AppPageHeader,
  AppPagination,
  AppSegmentedControl,
  AppSelect,
  AppStatCard,
  AppTable,
} from '@/components/app-ui';
import {
  Check,
  ChevronDown,
  Edit3,
  FolderOpen,
  Hash,
  Plus,
  Search,
  ShoppingBag,
  Trash2,
  Utensils,
  WalletCards,
  X,
} from 'lucide-react';
import { useMemo, useState } from 'react';

const categories = [
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
    system: false,
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
    system: true,
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
    system: false,
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
    system: true,
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
    system: false,
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
    system: false,
  },
];

export default function Page() {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('all');
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [editing, setEditing] = useState<(typeof categories)[number] | null>(null);
  const [deleting, setDeleting] = useState<(typeof categories)[number] | null>(null);
  const [categoryName, setCategoryName] = useState('');
  const filtered = useMemo(
    () =>
      categories.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) &&
          (type === 'all' || item.type.toLowerCase() === type),
      ),
    [query, type],
  );
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, pageCount);
  const visible = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);
  return (
    <main className="space-y-6">
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
        <AppStatCard icon={<Hash />} label="Total categories" value="18" />
        <AppStatCard icon={<Hash />} label="Expense categories" tone="danger" value="14" />
        <AppStatCard icon={<Hash />} label="Income categories" tone="success" value="4" />
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
                    size="icon-xs"
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
    </main>
  );
}
