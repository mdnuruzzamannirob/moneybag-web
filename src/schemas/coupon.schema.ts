import { z } from 'zod';

export const createCouponSchema = z.object({
  code: z.string().trim().min(3, 'Coupon code must be at least 3 characters').toUpperCase(),
  discountPercent: z.coerce.number().min(1).max(100, 'Discount must be between 1% and 100%'),
  maxRedemptions: z.coerce.number().positive('Max redemptions must be greater than 0'),
  expiresAt: z.string().optional(),
});

export type CreateCouponValues = z.infer<typeof createCouponSchema>;
