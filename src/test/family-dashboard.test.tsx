import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { makeStore } from '@/store/store';
import { FamilyDashboardView } from '@/components/family/family-dashboard-view';
import { FamilyMembersView } from '@/components/family/family-members-view';
import { FamilyWalletsView } from '@/components/family/family-wallets-view';
import { FamilyTransactionsView } from '@/components/family/family-transactions-view';
import { FamilyBudgetsView } from '@/components/family/family-budgets-view';
import { FamilyBalancesView } from '@/components/family/family-balances-view';
import { familyDashboardDemoData } from '@/lib/dashboard-data';
import { familyWalletsDemoData } from '@/lib/family-data';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/family/dashboard',
}));

function renderWithStore(ui: React.ReactElement) {
  const store = makeStore();
  return render(<Provider store={store}>{ui}</Provider>);
}

describe('Phase 7 — Family Dashboard Components', () => {
  it('renders FamilyDashboardView with shared metrics and cash flow', () => {
    renderWithStore(<FamilyDashboardView data={familyDashboardDemoData} />);
    expect(screen.getByRole('heading', { name: /Family dashboard/i })).toBeInTheDocument();
    expect(screen.getByText(/Rahman Family/i)).toBeInTheDocument();
    expect(screen.getByText(/Recent family activity/i)).toBeInTheDocument();
  });

  it('renders FamilyMembersView with member list and invite button', () => {
    renderWithStore(<FamilyMembersView />);
    expect(
      screen.getByRole('heading', { name: /Family management & members/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Ayesha Rahman/i)).toBeInTheDocument();
    expect(screen.getByText(/Tanvir Rahman/i)).toBeInTheDocument();
  });

  it('renders FamilyWalletsView with shared wallets', () => {
    renderWithStore(<FamilyWalletsView data={familyWalletsDemoData} />);
    expect(screen.getAllByText(/BRAC Family Account/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Household Cash/i).length).toBeGreaterThan(0);
  });

  it('renders FamilyTransactionsView with filter controls', () => {
    renderWithStore(<FamilyTransactionsView />);
    expect(screen.getByRole('heading', { name: /Family transactions/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search family transactions/i)).toBeInTheDocument();
  });

  it('renders FamilyBudgetsView with category limits', () => {
    renderWithStore(<FamilyBudgetsView />);
    expect(screen.getByRole('heading', { name: /Family budgets/i })).toBeInTheDocument();
    expect(screen.getByText(/Active family budgets/i)).toBeInTheDocument();
  });

  it('renders FamilyBalancesView with member balances', () => {
    renderWithStore(<FamilyBalancesView />);
    expect(screen.getByRole('heading', { name: /Family balances/i })).toBeInTheDocument();
    expect(screen.getByText(/Member balance breakdown/i)).toBeInTheDocument();
  });
});
