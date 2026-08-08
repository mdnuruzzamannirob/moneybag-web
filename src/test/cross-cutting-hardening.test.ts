import { describe, it, expect } from 'vitest';
import { normalizeError, TAG_TYPES } from '@/services/base-api';
import { loginSchema, registerSchema, twoFactorSchema } from '@/schemas/auth.schema';
import { createWalletSchema, transferMoneySchema } from '@/schemas/wallet.schema';
import { createTransactionSchema } from '@/schemas/transaction.schema';
import { createBudgetSchema } from '@/schemas/budget.schema';
import { createGoalSchema } from '@/schemas/goal.schema';
import { createFamilyGroupSchema, inviteMemberSchema } from '@/schemas/family.schema';
import { createCouponSchema } from '@/schemas/coupon.schema';

describe('Phase 9 — Cross-Cutting Hardening & Security Audits', () => {
  describe('API & Network Security Normalisation', () => {
    it('normalises 401 unauthenticated response properly', () => {
      const error = normalizeError({ status: 401, data: { message: 'Unauthorized session' } });
      expect(error.status).toBe(401);
      expect(error.message).toBe('Unauthorized session');
    });

    it('normalises 403 forbidden response properly', () => {
      const error = normalizeError({ status: 403, data: { message: 'Permission denied' } });
      expect(error.status).toBe(403);
      expect(error.message).toBe('Permission denied');
    });

    it('contains all required RTK Query cache tags', () => {
      expect(TAG_TYPES).toContain('Auth');
      expect(TAG_TYPES).toContain('Wallet');
      expect(TAG_TYPES).toContain('FamilyGroup');
      expect(TAG_TYPES).toContain('AuditLog');
    });
  });

  describe('Form Validation & Security Input Hardening', () => {
    it('rejects invalid email and short passwords on login/register', () => {
      const loginResult = loginSchema.safeParse({ email: 'invalid-email', password: '' });
      expect(loginResult.success).toBe(false);

      const regResult = registerSchema.safeParse({
        name: 'A',
        email: 'test@example.com',
        password: 'short',
        terms: false,
      });
      expect(regResult.success).toBe(false);
    });

    it('validates 6-digit 2FA OTP codes', () => {
      expect(twoFactorSchema.safeParse({ code: '123456' }).success).toBe(true);
      expect(twoFactorSchema.safeParse({ code: '1234' }).success).toBe(false);
      expect(twoFactorSchema.safeParse({ code: 'abc123' }).success).toBe(false);
    });

    it('rejects negative wallet initial balances and zero transfers', () => {
      const walletRes = createWalletSchema.safeParse({
        name: 'Test',
        type: 'bank',
        initialBalance: -100,
      });
      expect(walletRes.success).toBe(false);

      const transferRes = transferMoneySchema.safeParse({
        sourceWalletId: 'w1',
        destinationWalletId: 'w2',
        amount: 0,
      });
      expect(transferRes.success).toBe(false);
    });

    it('validates transaction schemas strictly', () => {
      const txRes = createTransactionSchema.safeParse({
        type: 'expense',
        amount: 500,
        category: 'Food',
        walletId: 'w1',
        date: '2026-07-28',
      });
      expect(txRes.success).toBe(true);

      const invalidTx = createTransactionSchema.safeParse({
        type: 'invalid_type',
        amount: -50,
      });
      expect(invalidTx.success).toBe(false);
    });

    it('validates coupon discount percent within 1-100%', () => {
      expect(
        createCouponSchema.safeParse({ code: 'SAVE', discountPercent: 20, maxRedemptions: 10 })
          .success,
      ).toBe(true);
      expect(
        createCouponSchema.safeParse({ code: 'SAVE', discountPercent: 150, maxRedemptions: 10 })
          .success,
      ).toBe(false);
    });
  });
});
