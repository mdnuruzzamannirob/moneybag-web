import { z } from 'zod';

export const createAdminUserSchema = z.object({
  name: z.string().trim().min(2, 'Full name is required'),
  email: z.string().email('Valid email required'),
  role: z.enum(['user', 'admin', 'superadmin']).default('user'),
});

export const updateSystemPlanSchema = z.object({
  name: z.string().trim().min(1, 'Plan name required'),
  priceInCents: z.coerce.number().min(0, 'Price cannot be negative'),
  billingInterval: z.enum(['monthly', 'yearly']),
  isActive: z.boolean().default(true),
});

export type CreateAdminUserValues = z.infer<typeof createAdminUserSchema>;
export type UpdateSystemPlanValues = z.infer<typeof updateSystemPlanSchema>;
