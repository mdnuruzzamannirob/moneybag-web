export type WalletType = 'bank' | 'cash' | 'mobile_wallet' | 'credit_card' | 'investment';

export interface Wallet {
  id: string;
  name: string;
  type: WalletType;
  balanceInCents: number;
  currency: string;
  isDefault: boolean;
  color?: string;
  icon?: string;
  accountNumber?: string;
  institutionName?: string;
  monthlyIncomeInCents: number;
  monthlyExpenseInCents: number;
  transactionCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateWalletRequest {
  name: string;
  type: WalletType;
  initialBalanceInCents: number;
  currency: string;
  isDefault?: boolean;
  color?: string;
  icon?: string;
  accountNumber?: string;
  institutionName?: string;
}

export interface UpdateWalletRequest extends Partial<CreateWalletRequest> {
  id: string;
}
