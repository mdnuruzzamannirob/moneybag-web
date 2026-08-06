import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { baseApi, normalizeError, TAG_TYPES } from '@/services/base-api';
import { makeStore } from '@/store/store';
import {
  authSlice,
  setCredentials,
  setUser,
  logout,
  selectAuthUser,
  selectIsAuthenticated,
  selectAuthToken,
} from '@/store/slices/auth-slice';
import type { UserProfile } from '@/types/user';

describe('Phase 4 — Error Normalization', () => {
  it('normalizes RTK Query error with status code and data message', () => {
    const error = {
      status: 404,
      data: { message: 'Wallet not found', code: 'WALLET_NOT_FOUND', details: { walletId: 'w-1' } },
    };
    const normalized = normalizeError(error);
    expect(normalized).toEqual({
      message: 'Wallet not found',
      status: 404,
      code: 'WALLET_NOT_FOUND',
      details: { walletId: 'w-1' },
    });
  });

  it('normalizes standard JS Error instance', () => {
    const error = new Error('Network failure');
    const normalized = normalizeError(error);
    expect(normalized.message).toBe('Network failure');
    expect(normalized.status).toBe(500);
  });

  it('handles null or unknown errors gracefully', () => {
    const normalized = normalizeError(null);
    expect(normalized.message).toBe('An unexpected network error occurred.');
    expect(normalized.status).toBe(500);
  });
});

describe('Phase 4 — Base API Configuration & Cache Tags', () => {
  it('defines all required domain cache tag types', () => {
    expect(TAG_TYPES).toContain('Auth');
    expect(TAG_TYPES).toContain('Wallet');
    expect(TAG_TYPES).toContain('Transaction');
    expect(TAG_TYPES).toContain('Budget');
    expect(TAG_TYPES).toContain('FamilyGroup');
    expect(TAG_TYPES).toContain('AuditLog');
  });

  it('configures baseApi with reducerPath "baseApi"', () => {
    expect(baseApi.reducerPath).toBe('baseApi');
  });
});

describe('Phase 4 — Redux Store & Auth Slice', () => {
  const dummyUser: UserProfile = {
    id: 'usr-1',
    email: 'test@example.com',
    name: 'Test User',
    role: 'user',
    isEmailVerified: true,
    twoFactorEnabled: false,
    currency: 'USD',
    locale: 'en-US',
    createdAt: '2026-08-06T00:00:00Z',
    updatedAt: '2026-08-06T00:00:00Z',
  };

  it('sets credentials correctly in auth slice', () => {
    const store = makeStore();
    store.dispatch(setCredentials({ user: dummyUser, token: 'jwt-token-123' }));

    const state = store.getState();
    expect(selectAuthUser(state)).toEqual(dummyUser);
    expect(selectIsAuthenticated(state)).toBe(true);
    expect(selectAuthToken(state)).toBe('jwt-token-123');
  });

  it('handles logout by clearing auth state', () => {
    const store = makeStore();
    store.dispatch(setCredentials({ user: dummyUser, token: 'jwt-token-123' }));
    store.dispatch(logout());

    const state = store.getState();
    expect(selectAuthUser(state)).toBeNull();
    expect(selectIsAuthenticated(state)).toBe(false);
    expect(selectAuthToken(state)).toBeNull();
  });
});
