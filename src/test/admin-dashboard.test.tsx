import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { makeStore } from '@/store/store';
import { AdminDashboardView } from '@/components/admin/admin-dashboard-view';
import { AdminUsersView } from '@/components/admin/admin-users-view';
import { AdminSubscriptionsView } from '@/components/admin/admin-subscriptions-view';
import { AdminPlansView } from '@/components/admin/admin-plans-view';
import { AdminCouponsView } from '@/components/admin/admin-coupons-view';
import { AdminReportsView } from '@/components/admin/admin-reports-view';
import { AdminSystemHealthView } from '@/components/admin/admin-system-health-view';
import { AdminAuditLogsView } from '@/components/admin/admin-audit-logs-view';
import { adminDashboardDemoData } from '@/lib/dashboard-data';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/admin/dashboard',
}));

function renderWithStore(ui: React.ReactElement) {
  const store = makeStore();
  return render(<Provider store={store}>{ui}</Provider>);
}

describe('Phase 8 — Admin Dashboard Components', () => {
  it('renders AdminDashboardView with platform stats and metrics', () => {
    renderWithStore(<AdminDashboardView data={adminDashboardDemoData} />);
    expect(screen.getByRole('heading', { name: /Admin dashboard/i })).toBeInTheDocument();
    expect(screen.getByText(/User growth/i)).toBeInTheDocument();
  });

  it('renders AdminUsersView with user table and controls', () => {
    renderWithStore(<AdminUsersView />);
    expect(screen.getByRole('heading', { name: /User management/i })).toBeInTheDocument();
    expect(screen.getByText(/Anika Tahsin/i)).toBeInTheDocument();
  });

  it('renders AdminSubscriptionsView with subscribers', () => {
    renderWithStore(<AdminSubscriptionsView />);
    expect(screen.getByRole('heading', { name: /Subscription management/i })).toBeInTheDocument();
    expect(screen.getAllByText(/Pro Monthly/i).length).toBeGreaterThan(0);
  });

  it('renders AdminPlansView with plan cards', () => {
    renderWithStore(<AdminPlansView />);
    expect(screen.getByRole('heading', { name: /Subscription plans/i })).toBeInTheDocument();
    expect(screen.getByText(/Free Starter/i)).toBeInTheDocument();
  });

  it('renders AdminCouponsView with promo code table', () => {
    renderWithStore(<AdminCouponsView />);
    expect(screen.getByRole('heading', { name: /Promotions & coupons/i })).toBeInTheDocument();
    expect(screen.getByText(/WELCOME20/i)).toBeInTheDocument();
  });

  it('renders AdminReportsView with growth charts', () => {
    renderWithStore(<AdminReportsView />);
    expect(screen.getByRole('heading', { name: /Platform reports & growth/i })).toBeInTheDocument();
  });

  it('renders AdminSystemHealthView with infrastructure metrics', () => {
    renderWithStore(<AdminSystemHealthView />);
    expect(
      screen.getByRole('heading', { name: /System health & operations/i }),
    ).toBeInTheDocument();
  });

  it('renders AdminAuditLogsView with audit trail records', () => {
    renderWithStore(<AdminAuditLogsView />);
    expect(screen.getByRole('heading', { name: /Audit logs/i })).toBeInTheDocument();
    expect(screen.getByText(/USER_ROLE_UPDATED/i)).toBeInTheDocument();
  });
});
