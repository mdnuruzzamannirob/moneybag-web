import { Banknote, CreditCard, Landmark, Smartphone, TrendingUp } from 'lucide-react';
import type { ComponentType } from 'react';

export type WalletKind = 'asset' | 'credit';
export type WalletType =
  | 'Bank account'
  | 'Cash'
  | 'Credit card'
  | 'Custom'
  | 'Digital wallet'
  | 'Investment'
  | 'Mobile banking'
  | 'Savings / Goal';

export type Wallet = {
  balance: number;
  color: string;
  currency: 'BDT';
  icon: ComponentType<{ className?: string }>;
  id: string;
  isDefault: boolean;
  kind: WalletKind;
  name: string;
  transactions: number;
  type: WalletType;
  updated: string;
};

export type WalletActivity = {
  amount: number;
  date: string;
  id: number;
  note: string;
  title: string;
  type: 'income' | 'expense' | 'transfer';
  walletId: string;
};

export const walletsFixture: Wallet[] = [
  {
    balance: 18_450,
    color: 'from-emerald-500 to-teal-600',
    currency: 'BDT',
    icon: Banknote,
    id: 'cash-wallet',
    isDefault: false,
    kind: 'asset',
    name: 'Cash wallet',
    transactions: 32,
    type: 'Cash',
    updated: 'Updated today',
  },
  {
    balance: 126_800,
    color: 'from-indigo-500 to-violet-600',
    currency: 'BDT',
    icon: Landmark,
    id: 'brac-bank',
    isDefault: true,
    kind: 'asset',
    name: 'BRAC Bank',
    transactions: 18,
    type: 'Bank account',
    updated: 'Updated yesterday',
  },
  {
    balance: 8_250,
    color: 'from-pink-500 to-rose-600',
    currency: 'BDT',
    icon: Smartphone,
    id: 'bkash',
    isDefault: false,
    kind: 'asset',
    name: 'bKash',
    transactions: 12,
    type: 'Mobile banking',
    updated: 'Updated 2 days ago',
  },
  {
    balance: 42_600,
    color: 'from-amber-500 to-orange-600',
    currency: 'BDT',
    icon: CreditCard,
    id: 'city-bank-card',
    isDefault: false,
    kind: 'credit',
    name: 'City Bank card',
    transactions: 9,
    type: 'Credit card',
    updated: 'Updated today',
  },
  {
    balance: 75_000,
    color: 'from-cyan-500 to-blue-600',
    currency: 'BDT',
    icon: TrendingUp,
    id: 'investment-fund',
    isDefault: false,
    kind: 'asset',
    name: 'Investment fund',
    transactions: 6,
    type: 'Investment',
    updated: 'Updated 3 days ago',
  },
];

export const walletActivitiesFixture: WalletActivity[] = [
  {
    amount: 85_000,
    date: '28 Jul, 2026',
    id: 1,
    note: 'Monthly salary deposit',
    title: 'Salary credited',
    type: 'income',
    walletId: 'brac-bank',
  },
  {
    amount: 2_450,
    date: '26 Jul, 2026',
    id: 2,
    note: 'Weekly grocery run',
    title: 'Grocery shopping',
    type: 'expense',
    walletId: 'cash-wallet',
  },
  {
    amount: 5_000,
    date: '25 Jul, 2026',
    id: 3,
    note: 'Moved to primary bank',
    title: 'Wallet transfer',
    type: 'transfer',
    walletId: 'bkash',
  },
  {
    amount: 650,
    date: '24 Jul, 2026',
    id: 4,
    note: 'Monthly subscription',
    title: 'Netflix subscription',
    type: 'expense',
    walletId: 'city-bank-card',
  },
  {
    amount: 12_000,
    date: '22 Jul, 2026',
    id: 5,
    note: 'Monthly investment',
    title: 'Fund contribution',
    type: 'expense',
    walletId: 'investment-fund',
  },
];

export function formatWalletMoney(value: number) {
  return `৳${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(value)}`;
}
