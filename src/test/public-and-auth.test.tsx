import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { makeStore } from '@/store/store';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { OnboardingFlow } from '@/components/onboarding/onboarding-flow';
import { MaintenanceView } from '@/components/maintenance/maintenance-view';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

function renderWithStore(ui: React.ReactElement) {
  const store = makeStore();
  return render(<Provider store={store}>{ui}</Provider>);
}

describe('Phase 5 — Public and Auth Components', () => {
  it('renders LoginForm with email and password fields', () => {
    renderWithStore(<LoginForm />);
    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign in/i })).toBeInTheDocument();
  });

  it('renders RegisterForm with name, email, password fields', () => {
    renderWithStore(<RegisterForm />);
    expect(screen.getByLabelText(/Full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Create account/i })).toBeInTheDocument();
  });

  it('renders OnboardingFlow step wizard and navigates steps', async () => {
    renderWithStore(<OnboardingFlow />);
    expect(screen.getByText(/Welcome to MoneyBag!/i)).toBeInTheDocument();
    expect(screen.getByText(/Step 1 of 3/i)).toBeInTheDocument();

    const continueButton = screen.getByRole('button', { name: /Continue/i });
    fireEvent.click(continueButton);

    await waitFor(() => {
      expect(screen.getByText(/Set up your first wallet/i)).toBeInTheDocument();
      expect(screen.getByText(/Step 2 of 3/i)).toBeInTheDocument();
    });
  });

  it('renders MaintenanceView with status information and refresh button', () => {
    renderWithStore(<MaintenanceView />);
    expect(screen.getByText(/System Maintenance/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Check Status/i })).toBeInTheDocument();
  });
});
