import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { makeStore } from '@/store/store';
import { UserDashboardView } from '@/components/personal/user-dashboard-view';
import { TransactionsPage } from '@/components/personal/finance-pages';
import { SettingsPanel } from '@/components/personal/settings-panel';
import { UserHelpCenter } from '@/components/personal/help-center-view';
import { userDashboardDemoData } from '@/lib/dashboard-data';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/settings',
}));

function renderWithStore(ui: React.ReactElement) {
  const store = makeStore();
  return render(<Provider store={store}>{ui}</Provider>);
}

describe('Phase 6 — Personal Dashboard Components', () => {
  it('renders UserDashboardView with financial metrics and charts', () => {
    renderWithStore(<UserDashboardView data={userDashboardDemoData} />);
    expect(screen.getByText(/Here's your full financial overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Income vs expense/i)).toBeInTheDocument();
    expect(screen.getByText(/Recent transactions/i)).toBeInTheDocument();
  });

  it('renders TransactionsPage with search and filtering', () => {
    renderWithStore(<TransactionsPage />);
    expect(
      screen.getByText(/Review, search, and manage every money movement/i),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search transactions/i)).toBeInTheDocument();
  });

  it('renders SettingsPanel for profile and security sections', () => {
    renderWithStore(<SettingsPanel section="profile" />);
    expect(screen.getByText(/Your profile/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/Anika Tahsin/i)).toBeInTheDocument();

    renderWithStore(<SettingsPanel section="security" />);
    expect(screen.getByText(/Security & sign-in/i)).toBeInTheDocument();
    expect(screen.getByText(/Two-factor authentication/i)).toBeInTheDocument();
  });

  it('renders UserHelpCenter with search and ticket button', () => {
    renderWithStore(<UserHelpCenter />);
    expect(screen.getByText(/How can we help you today?/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search help articles/i)).toBeInTheDocument();
  });
});
