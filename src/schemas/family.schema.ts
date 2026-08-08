import { z } from 'zod';

export const createFamilyGroupSchema = z.object({
  name: z.string().trim().min(1, 'Family name is required').max(50),
  currency: z.string().default('BDT'),
});

export const inviteMemberSchema = z.object({
  email: z.string().email('Enter a valid member email address'),
  role: z.enum(['editor', 'viewer']).default('editor'),
});

export type CreateFamilyGroupValues = z.infer<typeof createFamilyGroupSchema>;
export type InviteMemberValues = z.infer<typeof inviteMemberSchema>;
