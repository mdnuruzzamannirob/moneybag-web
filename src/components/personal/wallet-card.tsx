import type { Wallet } from '@/lib/fixtures/wallet-fixtures';
import { AppCard } from '@/components/app-ui';

export function WalletCard({ wallet }: { wallet?: Wallet }) {
  if (!wallet) return null;
  return (
    <AppCard>
      <h3 className="text-sm font-semibold">{wallet.name}</h3>
      <p className="text-xs text-muted-foreground">{wallet.type}</p>
    </AppCard>
  );
}
