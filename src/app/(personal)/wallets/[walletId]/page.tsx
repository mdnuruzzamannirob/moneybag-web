import {
  AppBadge,
  AppButton,
  AppCard,
  AppPageHeader,
  AppStatCard,
  AppTable,
  type AppTableColumn,
} from '@/components/app-ui';
import { ArrowUpRight, CalendarDays, ReceiptText, TrendingDown, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import {
  formatWalletMoney,
  walletActivitiesFixture,
  walletsFixture,
  type WalletActivity,
} from '@/lib/fixtures/wallet-fixtures';
import { WalletDetailActions } from '@/components/personal/wallet-detail-actions';
import { cn } from '@/lib/utils';

export function generateStaticParams() {
  return walletsFixture.map((wallet) => ({ walletId: wallet.id }));
}

export default async function WalletDetailPage({
  params,
}: {
  params: Promise<{ walletId: string }>;
}) {
  const { walletId } = await params;
  const wallet = walletsFixture.find((item) => item.id === walletId);
  if (!wallet) notFound();

  const Icon = wallet.icon;
  const activities = walletActivitiesFixture.filter((activity) => activity.walletId === wallet.id);
  const income = activities
    .filter((activity) => activity.type === 'income')
    .reduce((total, activity) => total + activity.amount, 0);
  const expenses = activities
    .filter((activity) => activity.type === 'expense')
    .reduce((total, activity) => total + activity.amount, 0);

  return (
    <main className="space-y-6">
      <AppPageHeader
        actions={<WalletDetailActions walletId={wallet.id} />}
        description={`${wallet.type} · ${wallet.currency} · ${wallet.updated}`}
        title={
          <span className="flex items-center gap-2">
            {wallet.name}
            {wallet.isDefault ? <AppBadge status="info">Default</AppBadge> : null}
          </span>
        }
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AppStatCard
          icon={<Icon />}
          label={wallet.kind === 'credit' ? 'Amount due' : 'Current balance'}
          tone={wallet.kind === 'credit' ? 'danger' : 'primary'}
          value={formatWalletMoney(wallet.balance)}
          variant="featured"
        />
        <AppStatCard
          icon={<TrendingUp />}
          label="Income this month"
          tone="success"
          value={formatWalletMoney(income)}
        />
        <AppStatCard
          icon={<TrendingDown />}
          label="Expenses this month"
          tone="danger"
          value={formatWalletMoney(expenses)}
        />
        <AppStatCard
          icon={<ReceiptText />}
          label="Transactions"
          tone="info"
          value={`${wallet.transactions}`}
        />
      </section>

      <AppCard padding="none">
        <div className="flex items-center justify-between gap-3 p-4">
          <div>
            <h2 className="font-semibold">Wallet transactions</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Activity recorded against {wallet.name}
            </p>
          </div>
          <AppButton
            nativeButton={false}
            render={<Link href={`/transactions?wallet=${wallet.id}`} />}
            size="sm"
            tone="secondary"
          >
            View all <ArrowUpRight />
          </AppButton>
        </div>
        <AppTable<WalletActivity>
          className="rounded-none border-x-0 border-b-0 border-t border-border"
          columns={columns}
          empty="No transactions recorded for this wallet yet."
          getRowKey={(row) => row.id}
          rows={activities}
        />
      </AppCard>
    </main>
  );
}

const columns: readonly AppTableColumn<WalletActivity>[] = [
  {
    key: 'description',
    header: 'Description',
    render: (row) => (
      <div>
        <p className="font-medium">{row.title}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{row.note}</p>
      </div>
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
    render: (row) => (
      <span className="flex items-center gap-1.5 text-muted-foreground">
        <CalendarDays className="size-3.5" />
        {row.date}
      </span>
    ),
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
