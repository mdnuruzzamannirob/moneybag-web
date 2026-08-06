'use client';

import {
  ArrowLeftRight,
  Banknote,
  Check,
  Edit3,
  Eye,
  Landmark,
  MoreHorizontal,
  Plus,
  Search,
  Smartphone,
  Trash2,
  TrendingDown,
  TrendingUp,
  Users,
  WalletCards,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import {
  AppAvatar,
  AppBadge,
  AppButton,
  AppCard,
  AppConfirmDialog,
  AppDropdownMenu,
  AppEmptyState,
  AppField,
  AppInput,
  AppModal,
  AppPageHeader,
  AppSegmentedControl,
  AppSelect,
  AppStatCard,
  AppTable,
  type AppTableColumn,
} from '@/components/app-ui';
import { cn } from '@/lib/utils';
import type {
  FamilyMemberSummary,
  FamilyWalletsData,
  SharedWallet,
  SharedWalletActivity,
  SharedWalletType,
} from '@/types/family';

type WalletDialog = 'add' | 'edit' | 'transfer' | null;
type WalletFilter = 'all' | SharedWalletType;

const walletMeta = {
  bank: {
    accent: 'bg-info',
    icon: Landmark,
    label: 'Bank account',
    soft: 'bg-info/15 text-info',
  },
  cash: {
    accent: 'bg-success',
    icon: Banknote,
    label: 'Cash wallet',
    soft: 'bg-success/15 text-success',
  },
  mobile: {
    accent: 'bg-warning',
    icon: Smartphone,
    label: 'Mobile banking',
    soft: 'bg-warning/15 text-warning',
  },
} as const;

const numberFormatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
const formatCurrency = (value: number) => `৳${numberFormatter.format(value)}`;

export function FamilyWalletsView({ data }: { data: FamilyWalletsData }) {
  const router = useRouter();
  const [filter, setFilter] = useState<WalletFilter>('all');
  const [query, setQuery] = useState('');
  const [dialog, setDialog] = useState<WalletDialog>(null);
  const [selectedWallet, setSelectedWallet] = useState<SharedWallet | null>(null);
  const [deletingWallet, setDeletingWallet] = useState<SharedWallet | null>(null);

  const memberMap = useMemo(
    () => new Map(data.members.map((member) => [member.id, member])),
    [data.members],
  );
  const walletMap = useMemo(
    () => new Map(data.wallets.map((wallet) => [wallet.id, wallet])),
    [data.wallets],
  );
  const filteredWallets = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return data.wallets.filter(
      (wallet) =>
        (filter === 'all' || wallet.type === filter) &&
        `${wallet.name} ${walletMeta[wallet.type].label}`.toLowerCase().includes(normalizedQuery),
    );
  }, [data.wallets, filter, query]);

  const totalBalance = data.wallets.reduce((sum, wallet) => sum + wallet.balance, 0);
  const monthlyIncome = data.wallets.reduce((sum, wallet) => sum + wallet.monthlyIncome, 0);
  const monthlyExpense = data.wallets.reduce((sum, wallet) => sum + wallet.monthlyExpense, 0);

  const openDialog = (kind: Exclude<WalletDialog, null>, wallet: SharedWallet | null = null) => {
    setSelectedWallet(wallet);
    setDialog(kind);
  };

  const columns = useMemo<readonly AppTableColumn<SharedWalletActivity>[]>(
    () => [
      {
        key: 'activity',
        header: 'Activity',
        render: (activity) => (
          <div>
            <p className="font-medium text-foreground">{activity.title}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{activity.note}</p>
          </div>
        ),
      },
      {
        key: 'paidBy',
        header: 'Paid by',
        render: (activity) => {
          const member = memberMap.get(activity.paidBy);
          if (!member) return <span className="text-muted-foreground">Unknown</span>;
          return (
            <div className="flex items-center gap-2">
              <span className="grid size-6 place-items-center rounded-full bg-primary/10 text-[10px] font-semibold text-primary">
                {member.initials}
              </span>
              <span className="text-sm font-medium">{member.name}</span>
            </div>
          );
        },
      },
      {
        key: 'wallet',
        header: 'Wallet',
        render: (activity) => {
          const wallet = walletMap.get(activity.walletId);
          if (!wallet) return <span className="text-muted-foreground">—</span>;
          const MetaIcon = walletMeta[wallet.type].icon;
          return (
            <span className="inline-flex items-center gap-1.5 text-muted-foreground">
              <MetaIcon className="size-3.5" />
              {wallet.name}
            </span>
          );
        },
      },
      {
        key: 'split',
        header: 'Split rule',
        render: (activity) => (
          <AppBadge status={activity.splitLabel === 'Split equally' ? 'info' : 'neutral'}>
            {activity.splitLabel}
          </AppBadge>
        ),
      },
      {
        key: 'date',
        header: 'Date',
        render: (activity) => <span className="text-muted-foreground">{activity.date}</span>,
      },
      {
        align: 'right',
        key: 'amount',
        header: 'Amount',
        render: (activity) => (
          <span
            className={cn(
              'font-semibold',
              activity.type === 'income'
                ? 'text-success'
                : activity.type === 'expense'
                  ? 'text-danger'
                  : 'text-info',
            )}
          >
            {activity.type === 'income' ? '+' : activity.type === 'expense' ? '−' : ''}
            {formatCurrency(activity.amount)}
          </span>
        ),
      },
    ],
    [memberMap, walletMap],
  );

  return (
    <div className="space-y-6">
      <AppPageHeader
        actions={
          <>
            <AppButton onClick={() => openDialog('transfer')} size="sm" tone="secondary">
              <ArrowLeftRight /> Internal transfer
            </AppButton>
            <AppButton onClick={() => openDialog('add')} size="sm">
              <Plus /> Add shared wallet
            </AppButton>
          </>
        }
        description="Shared accounts, member access permissions, and wallet activities."
        title="Shared wallets"
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AppStatCard
          icon={<WalletCards />}
          label="Total shared balance"
          value={formatCurrency(totalBalance)}
          variant="featured"
        />
        <AppStatCard
          icon={<TrendingUp />}
          label="Monthly group income"
          tone="success"
          value={formatCurrency(monthlyIncome)}
        />
        <AppStatCard
          icon={<TrendingDown />}
          label="Monthly group expense"
          tone="danger"
          value={formatCurrency(monthlyExpense)}
        />
        <AppStatCard
          change={`${data.members.length} members with access`}
          icon={<Users />}
          label="Active wallets"
          tone="info"
          value={`${data.wallets.length}`}
        />
      </section>

      <AppCard padding="none">
        <div className="flex flex-col gap-3 border-b border-border p-4 lg:flex-row lg:items-center lg:justify-between">
          <AppSegmentedControl
            className="w-full sm:w-80 lg:w-72 lg:shrink-0"
            onValueChange={(val) => val && setFilter(val as WalletFilter)}
            options={[
              { label: 'All', value: 'all' },
              { label: 'Bank', value: 'bank' },
              { label: 'Cash', value: 'cash' },
              { label: 'Mobile', value: 'mobile' },
            ]}
            value={filter}
          />
          <AppInput
            className="pr-8!"
            containerClassName="w-full sm:w-80"
            leading={<Search />}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search shared wallets..."
            trailing={
              query ? (
                <AppButton
                  aria-label="Clear wallet search"
                  className="size-5! rounded-sm! p-0!"
                  onClick={() => setQuery('')}
                  size="icon-xs"
                  tone="ghost"
                >
                  <X />
                </AppButton>
              ) : null
            }
            value={query}
          />
        </div>

        {filteredWallets.length ? (
          <div className="grid gap-4 p-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredWallets.map((wallet) => {
              const meta = walletMeta[wallet.type];
              const Icon = meta.icon;
              return (
                <AppCard className="relative h-full overflow-hidden" key={wallet.id}>
                  <div className={cn('absolute inset-x-0 top-0 h-1', meta.accent)} />
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className={cn(
                        'grid size-10 place-items-center rounded-lg text-foreground',
                        meta.soft,
                      )}
                    >
                      <Icon className="size-5" />
                    </span>
                    <AppDropdownMenu
                      items={[
                        {
                          icon: <Eye />,
                          label: 'View transactions',
                          onSelect: () => router.push('/family/transactions'),
                        },
                        {
                          icon: <ArrowLeftRight />,
                          label: 'Transfer money',
                          onSelect: () => openDialog('transfer', wallet),
                        },
                        {
                          icon: <Edit3 />,
                          label: 'Edit wallet',
                          onSelect: () => openDialog('edit', wallet),
                        },
                        {
                          disabled: wallet.isDefault,
                          icon: <Trash2 />,
                          label: 'Delete wallet',
                          onSelect: () => setDeletingWallet(wallet),
                          separatorBefore: true,
                          variant: 'destructive',
                        },
                      ]}
                      trigger={
                        <AppButton
                          aria-label={`${wallet.name} actions`}
                          size="icon-sm"
                          tone="secondary"
                        >
                          <MoreHorizontal />
                        </AppButton>
                      }
                    />
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{wallet.name}</h3>
                    {wallet.isDefault ? <AppBadge status="info">Default</AppBadge> : null}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {meta.label} · {wallet.currency}
                  </p>
                  <p className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
                    {formatCurrency(wallet.balance)}
                  </p>

                  <div className="mt-4 border-t border-border pt-3">
                    <p className="mb-2 text-xs text-muted-foreground">Members with access:</p>
                    <div className="flex items-center gap-1.5">
                      {wallet.accessedBy.map((memberId) => {
                        const member = memberMap.get(memberId);
                        if (!member) return null;
                        return (
                          <span
                            className="grid size-7 place-items-center rounded-full bg-primary/10 text-[10px] font-semibold text-primary"
                            key={member.id}
                            title={member.name}
                          >
                            {member.initials}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </AppCard>
              );
            })}
          </div>
        ) : (
          <AppEmptyState
            action={
              <AppButton
                onClick={() => {
                  setFilter('all');
                  setQuery('');
                }}
                tone="secondary"
              >
                Clear filters
              </AppButton>
            }
            description="Try searching with a different keyword or filter."
            icon={<Search />}
            title="No shared wallets found"
          />
        )}
      </AppCard>

      <AppCard padding="none">
        <div className="flex items-center justify-between gap-3 p-4">
          <div>
            <h2 className="font-semibold">Recent shared wallet activity</h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Transactions recorded across all shared family wallets
            </p>
          </div>
          <AppButton
            nativeButton={false}
            render={<Link href="/family/transactions" />}
            size="sm"
            tone="secondary"
          >
            View all
          </AppButton>
        </div>
        <AppTable<SharedWalletActivity>
          className="rounded-none border-x-0 border-b-0 border-t border-border"
          columns={columns}
          getRowKey={(row) => row.id}
          rows={data.activities}
        />
      </AppCard>

      <AppModal
        open={Boolean(dialog)}
        onOpenChange={(open) => !open && setDialog(null)}
        title={
          dialog === 'add'
            ? 'Add shared wallet'
            : dialog === 'edit'
              ? `Edit ${selectedWallet?.name}`
              : 'Internal transfer'
        }
        description="Configure wallet details and member access permissions."
        footer={
          <>
            <AppButton tone="secondary" onClick={() => setDialog(null)}>
              Cancel
            </AppButton>
            <AppButton onClick={() => setDialog(null)}>Save wallet</AppButton>
          </>
        }
      >
        <div className="space-y-4">
          <AppField label="Wallet name" required>
            <AppInput defaultValue={selectedWallet?.name} placeholder="e.g. BRAC Family Account" />
          </AppField>
          <AppField label="Account type" required>
            <AppSelect
              options={[
                { label: 'Bank account', value: 'bank' },
                { label: 'Cash wallet', value: 'cash' },
                { label: 'Mobile banking', value: 'mobile' },
              ]}
              value={selectedWallet?.type ?? 'bank'}
            />
          </AppField>
        </div>
      </AppModal>

      <AppConfirmDialog
        confirmLabel="Delete wallet"
        description="Are you sure you want to delete this shared wallet? Existing transactions will remain in activity logs."
        onConfirm={() => setDeletingWallet(null)}
        onOpenChange={(open) => !open && setDeletingWallet(null)}
        open={Boolean(deletingWallet)}
        title={`Delete ${deletingWallet?.name}?`}
      />
    </div>
  );
}

export { FamilyWalletsView as FamilyWallets };
