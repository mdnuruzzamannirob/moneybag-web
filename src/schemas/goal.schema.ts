import { z } from 'zod';

export const createGoalSchema = z.object({
  title: z.string().trim().min(1, 'Goal title is required').max(80),
  targetAmount: z.coerce.number().positive('Target amount must be positive'),
  currentAmount: z.coerce.number().min(0, 'Current amount cannot be negative').default(0),
  deadline: z.string().min(1, 'Deadline date is required'),
});

export const updateGoalSchema = createGoalSchema.partial();

export type CreateGoalValues = z.infer<typeof createGoalSchema>;
export type UpdateGoalValues = z.infer<typeof updateGoalSchema>;
