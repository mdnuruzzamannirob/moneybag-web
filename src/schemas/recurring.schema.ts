import { z } from 'zod';

export const createRecurringTransactionSchema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
  amount: z.coerce.number().positive('Amount must be greater than 0'),
  interval: z.enum(['daily', 'weekly', 'monthly', 'yearly']),
  startDate: z.string().min(1, 'Start date is required'),
  walletId: z.string().min(1, 'Wallet selection is required'),
});

export type CreateRecurringTransactionValues = z.infer<typeof createRecurringTransactionSchema>;
