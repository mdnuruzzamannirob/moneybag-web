import { z } from 'zod';

export const createWalletSchema = z.object({
  name: z.string().trim().min(1, 'Wallet name is required').max(50, 'Name is too long'),
  type: z.enum(['bank', 'cash', 'mobile'], {
    message: 'Select a valid wallet type',
  }),
  currency: z.string().default('BDT'),
  initialBalance: z.coerce.number().min(0, 'Initial balance cannot be negative'),
  isDefault: z.boolean().default(false),
});

export const updateWalletSchema = createWalletSchema.partial();

export const transferMoneySchema = z.object({
  sourceWalletId: z.string().min(1, 'Select a source wallet'),
  destinationWalletId: z.string().min(1, 'Select a destination wallet'),
  amount: z.coerce.number().positive('Transfer amount must be greater than zero'),
  note: z.string().max(200, 'Note is too long').optional(),
});

export type CreateWalletValues = z.infer<typeof createWalletSchema>;
export type UpdateWalletValues = z.infer<typeof updateWalletSchema>;
export type TransferMoneyValues = z.infer<typeof transferMoneySchema>;
