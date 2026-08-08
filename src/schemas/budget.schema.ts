import { z } from 'zod';

export const createBudgetSchema = z.object({
  category: z.string().min(1, 'Category is required'),
  limit: z.coerce.number().positive('Budget limit must be greater than 0'),
  period: z.enum(['monthly', 'yearly']).default('monthly'),
});

export const updateBudgetSchema = createBudgetSchema.partial();

export type CreateBudgetValues = z.infer<typeof createBudgetSchema>;
export type UpdateBudgetValues = z.infer<typeof updateBudgetSchema>;
