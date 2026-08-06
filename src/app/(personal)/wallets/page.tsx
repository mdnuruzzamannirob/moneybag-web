'use client';

import {
  AppBadge,
  AppButton,
  AppCard,
  AppConfirmDialog,
  AppDropdownMenu,
  AppEmptyState,
  AppInput,
  AppPageHeader,
  AppSegmentedControl,
  AppStatCard,
  AppTable,
  type AppTableColumn,
} from '@/components/app-ui';
import {
  ArrowLeftRight,
  CreditCard,
  Edit3,
  Eye,
  Landmark,
  MoreHorizontal,
  Plus,
  Search,
  Star,
  Trash2,
  WalletCards,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import {
  formatWalletMoney,
  walletActivities,
  wallets,
  type Wallet,
  type WalletKind,
} from '@/components/user/wallet-data';
import { WalletFormDialog, type WalletDialogKind } from '@/components/user/wallet-modal';
import { cn } from '@/lib/utils';

export default function Page() {
  const sourceWalletId =
    typeof window === 'undefined'
      ? null
      : new URLSearchParams(window.location.search).get('transfer');
  const editWalletId =
    typeof window === 'undefined' ? null : new URLSearchParams(window.location.search).get('edit');
  const requestedWallet = wallets.find(
    (wallet) => wallet.id === sourceWalletId || wallet.id === editWalletId,
  );
  const [dialog, setDialog] = useState<WalletDialogKind>(() =>
    requestedWallet ? (sourceWalletId ? 'transfer' : 'edit') : null,
  );
  const [deleting, setDeleting] = useState<Wallet | null>(null);
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(
    () => requestedWallet ?? null,
  );
  const [query, setQuery] = useState('');
  const [kind, setKind] = useState<'all' | WalletKind>('all');

  const assetBalance = wallets
    .filter((wallet) => wallet.kind === 'asset')
    .reduce((total, wallet) => total + wallet.balance, 0);
  const creditDue = wallets
    .filter((wallet) => wallet.kind === 'credit')
    .reduce((total, wallet) => total + wallet.balance, 0);
  const netPosition = assetBalance - creditDue;
  const filteredWallets = wallets.filter(
    (wallet) =>
      (kind === 'all' || wallet.kind === kind) &&
      `${wallet.name} ${wallet.type}`.toLowerCase().includes(query.trim().toLowerCase()),
  );

  const openEdit = (wallet: Wallet) => {
    setSelectedWallet(wallet);
    setDialog('edit');
  };

  return (
    <main className="space-y-6">
      <AppPageHeader
        actions={
          <>
            <AppButton onClick={() => setDialog('transfer')} size="sm" tone="secondary">
              <ArrowLeftRight /> Transfer
            </AppButton>
            <AppButton
              onClick={() => {
                setSelectedWallet(null);
                setDialog('add');
              }}
              size="sm"
            >
              <Plus /> Add wallet
            </AppButton>
          </>
        }
        description="Manage accounts, balances and internal transfers in one place."
        title="Wallets & accounts"
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AppStatCard
          icon={<WalletCards />}
          label="Net wallet position"
          value={formatWalletMoney(netPosition)}
          variant="featured"
        />
        <AppStatCard
          icon={<Landmark />}
          label="Available funds"
          tone="success"
          value={formatWalletMoney(assetBalance)}
        />
        <AppStatCard
          icon={<CreditCard />}
          label="Credit card due"
          tone="danger"
          value={formatWalletMoney(creditDue)}
        />
        <AppStatCard
          change={`${wallets.filter((wallet) => wallet.isDefault).length} default`}
          icon={<WalletCards />}
          label="Active wallets"
          tone="info"
          value={`${wallets.length}`}
        />
      </section>

      <AppCard padding="none">
        <div className="flex flex-col gap-3 border-b border-border p-4 lg:flex-row lg:items-center lg:justify-between">
          <AppSegmentedControl
            className="w-full sm:w-72 lg:w-64 lg:shrink-0"
            onValueChange={(value) => {
              if (value === 'all' || value === 'asset' || value === 'credit') setKind(value);
            }}
            options={[
              { label: 'All', value: 'all' },
              { label: 'Assets', value: 'asset' },
              { label: 'Credit', value: 'credit' },
            ]}
            value={kind}
          />
          <AppInput
            className="pr-8!"
            containerClassName="w-full sm:w-80"
            leading={<Search />}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search wallets"
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
            {filteredWallets.map((wallet) => (
              <WalletCard
                key={wallet.id}
                onDelete={() => setDeleting(wallet)}
                onEdit={() => openEdit(wallet)}
                onTransfer={() => {
                  setSelectedWallet(wallet);
                  setDialog('transfer');
                }}
                wallet={wallet}
              />
            ))}
          </div>
        ) : (
          <AppEmptyState
            action={
              <AppButton
                onClick={() => {
                  setKind('all');
                  setQuery('');
                }}
                tone="secondary"
              >
                Clear filters
              </AppButton>
            }
            description="Try another name or wallet type."
            icon={<Search />}
            title="No wallets found"
          />
        )}
      </AppCard>

      <AppCard padding="none">
        <div className="flex items-center justify-between gap-3 p-4">
          <div>
            <h2 className="font-semibold">Recent wallet activity</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Latest movements across all wallets
            </p>
          </div>
          <AppButton
            nativeButton={false}
            render={<Link href="/transactions" />}
            size="sm"
            tone="secondary"
          >
            View all
          </AppButton>
        </div>
        <AppTable
          className="rounded-none border-x-0 border-b-0 border-t border-border"
          columns={activityColumns}
          getRowKey={(row) => row.id}
          rows={walletActivities.slice(0, 4)}
        />
      </AppCard>

      <WalletFormDialog
        editing={selectedWallet}
        key={`${dialog}-${selectedWallet?.id ?? 'new'}`}
        kind={dialog}
        onClose={() => {
          setDialog(null);
          setSelectedWallet(null);
        }}
      />
      <AppConfirmDialog
        confirmLabel="Delete wallet"
        description="This wallet can only be deleted after its transactions are moved or removed."
        onConfirm={() => setDeleting(null)}
        onOpenChange={(open) => !open && setDeleting(null)}
        open={Boolean(deleting)}
        title={`Delete ${deleting?.name ?? 'wallet'}?`}
      />
    </main>
  );
}

function WalletCard({
  onDelete,
  onEdit,
  onTransfer,
  wallet,
}: {
  onDelete: () => void;
  onEdit: () => void;
  onTransfer: () => void;
  wallet: Wallet;
}) {
  const Icon = wallet.icon;
  const router = useRouter();
  return (
    <AppCard className="relative h-full overflow-hidden">
      <div className={cn('absolute inset-x-0 top-0 h-1 bg-linear-to-r', wallet.color)} />
      <div className="flex items-start justify-between gap-3">
        <span
          className={cn(
            'grid size-10 place-items-center rounded-lg bg-linear-to-br text-white',
            wallet.color,
          )}
        >
          <Icon className="size-5" />
        </span>
        <AppDropdownMenu
          items={[
            {
              icon: <Eye />,
              label: 'View details',
              onSelect: () => router.push(`/wallets/${wallet.id}`),
            },
            { icon: <ArrowLeftRight />, label: 'Transfer money', onSelect: onTransfer },
            { icon: <Edit3 />, label: 'Edit wallet', onSelect: onEdit },
            { disabled: wallet.isDefault, icon: <Star />, label: 'Set as default' },
            {
              disabled: wallet.isDefault,
              icon: <Trash2 />,
              label: 'Delete wallet',
              onSelect: onDelete,
              separatorBefore: true,
              variant: 'destructive',
            },
          ]}
          trigger={
            <AppButton aria-label={`${wallet.name} actions`} size="icon-sm" tone="secondary">
              <MoreHorizontal />
            </AppButton>
          }
        />
      </div>
      <div className="mt-5 flex items-center gap-2">
        <Link className="font-semibold hover:text-primary" href={`/wallets/${wallet.id}`}>
          {wallet.name}
        </Link>
        {wallet.isDefault ? <AppBadge status="info">Default</AppBadge> : null}
      </div>
      <p className="mt-1 text-xs text-muted-foreground">
        {wallet.type} · {wallet.currency}
      </p>
      <p
        className={cn(
          'mt-4 text-2xl font-semibold tracking-tight',
          wallet.kind === 'credit' && 'text-danger',
        )}
      >
        {formatWalletMoney(wallet.balance)}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        {wallet.kind === 'credit' ? 'Amount due' : 'Current balance'}
      </p>
      <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
        <span>{wallet.transactions} transactions</span>
        <span>{wallet.updated}</span>
      </div>
    </AppCard>
  );
}

const activityColumns: readonly AppTableColumn<(typeof walletActivities)[number]>[] = [
  {
    key: 'activity',
    header: 'Activity',
    render: (row) => (
      <div>
        <p className="font-medium">{row.title}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{row.note}</p>
      </div>
    ),
  },
  {
    key: 'wallet',
    header: 'Wallet',
    render: (row) => (
      <Link
        className="text-muted-foreground hover:text-foreground"
        href={`/wallets/${row.walletId}`}
      >
        {wallets.find((wallet) => wallet.id === row.walletId)?.name}
      </Link>
    ),
  },
  {
    key: 'type',
    header: 'Type',
    render: (row) => (
      <AppBadge
        status={row.type === 'income' ? 'success' : row.type === 'expense' ? 'danger' : 'info'}
      >
        {row.type === 'income' ? 'Income' : row.type === 'expense' ? 'Expense' : 'Transfer'}
      </AppBadge>
    ),
  },
  {
    key: 'date',
    header: 'Date',
    render: (row) => <span className="text-muted-foreground">{row.date}</span>,
  },
  {
    align: 'right',
    key: 'amount',
    header: 'Amount',
    render: (row) => (
      <span
        className={cn(
          'font-semibold',
          row.type === 'income'
            ? 'text-success'
            : row.type === 'expense'
              ? 'text-danger'
              : 'text-info',
        )}
      >
        {row.type === 'income' ? '+' : row.type === 'expense' ? '-' : ''}
        {formatWalletMoney(row.amount)}
      </span>
    ),
  },
];
