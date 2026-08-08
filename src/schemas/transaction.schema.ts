import { z } from 'zod';

export const createTransactionSchema = z.object({
  type: z.enum(['income', 'expense', 'transfer']),
  amount: z.coerce.number().positive('Amount must be greater than 0'),
  category: z.string().min(1, 'Category is required'),
  walletId: z.string().min(1, 'Wallet selection is required'),
  date: z.string().min(1, 'Date is required'),
  note: z.string().max(250, 'Note must not exceed 250 characters').optional(),
  recipient: z.string().max(100).optional(),
});

export const updateTransactionSchema = createTransactionSchema.partial();

export type CreateTransactionValues = z.infer<typeof createTransactionSchema>;
export type UpdateTransactionValues = z.infer<typeof updateTransactionSchema>;
