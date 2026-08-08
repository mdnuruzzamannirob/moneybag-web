import React, { PropsWithChildren } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { vi } from 'vitest';

// 1. Fixed time and timezone helper
export function setTestClock(isoDateString = '2026-08-06T12:00:00.000Z') {
  const mockDate = new Date(isoDateString);
  vi.setSystemTime(mockDate);
  return mockDate;
}

export function resetTestClock() {
  vi.useRealTimers();
}

// 2. Deterministic currency helper
export function createTestAmount(cents: number, currency = 'USD') {
  return {
    amountInCents: cents,
    currency,
    formatted: (cents / 100).toLocaleString('en-US', {
      style: 'currency',
      currency,
    }),
  };
}

import { makeStore, AppStore } from '@/store/store';

// 3. Redux / RTK Query Provider render helper
export function createTestStore(preloadedState = {}) {
  return makeStore(preloadedState);
}

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Record<string, unknown>;
  store?: ReturnType<typeof createTestStore>;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = createTestStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({ children }: PropsWithChildren): React.JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

// 4. Router/Navigation test helper
export function createMockRouter(overrides = {}) {
  return {
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    ...overrides,
  };
}

// 5. API response helpers
export function mockSuccessResponse<T>(data: T, message = 'Success') {
  return {
    data,
    status: 'success',
    message,
    code: 200,
  };
}

export function mockErrorResponse(
  message = 'An unexpected error occurred',
  code = 400,
  details: Record<string, unknown> = {},
) {
  return {
    error: {
      status: code,
      data: {
        message,
        code,
        details,
      },
    },
  };
}
