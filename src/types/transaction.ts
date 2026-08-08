export type TransactionType = 'income' | 'expense' | 'transfer';
export type TransactionStatus = 'completed' | 'pending' | 'cancelled';
export type RecurrenceFrequency = 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface Transaction {
  id: string;
  walletId: string;
  destinationWalletId?: string;
  type: TransactionType;
  amountInCents: number;
  currency: string;
  categoryId: string;
  categoryName?: string;
  note?: string;
  payee?: string;
  date: string;
  status: TransactionStatus;
  isRecurring: boolean;
  recurringTransactionId?: string;
  attachments?: string[];
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface RecurringTransaction {
  id: string;
  walletId: string;
  type: TransactionType;
  amountInCents: number;
  currency: string;
  categoryId: string;
  frequency: RecurrenceFrequency;
  startDate: string;
  endDate?: string;
  nextRunDate: string;
  isActive: boolean;
  note?: string;
  payee?: string;
  createdAt: string;
}

export interface CreateTransactionRequest {
  walletId: string;
  destinationWalletId?: string;
  type: TransactionType;
  amountInCents: number;
  currency: string;
  categoryId: string;
  note?: string;
  payee?: string;
  date: string;
  tags?: string[];
}

export interface UpdateTransactionRequest extends Partial<CreateTransactionRequest> {
  id: string;
}
