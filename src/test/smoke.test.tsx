import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderWithProviders } from './helpers';

import PublicPage from '@/app/(public)/page';
import OnboardingPage from '@/app/onboarding/page';
import MaintenancePage from '@/app/maintenance/page';
import PersonalDashboardPage from '@/app/(dashboard)/dashboard/page';
import FamilyDashboardPage from '@/app/family/dashboard/page';
import AdminDashboardPage from '@/app/admin/dashboard/page';

describe('Application Context Smoke Tests', () => {
  it('renders Public Landing page without crashing', () => {
    const { container } = renderWithProviders(<PublicPage />);
    expect(container).toBeDefined();
  });

  it('renders Onboarding page without crashing', () => {
    const { container } = renderWithProviders(<OnboardingPage />);
    expect(container).toBeDefined();
  });

  it('renders Maintenance page without crashing', () => {
    const { container } = renderWithProviders(<MaintenancePage />);
    expect(container).toBeDefined();
  });

  it('renders Personal Dashboard page without crashing', () => {
    const { container } = renderWithProviders(<PersonalDashboardPage />);
    expect(container).toBeDefined();
  });

  it('renders Family Dashboard page without crashing', () => {
    const { container } = renderWithProviders(<FamilyDashboardPage />);
    expect(container).toBeDefined();
  });

  it('renders Admin Dashboard page without crashing', () => {
    const { container } = renderWithProviders(<AdminDashboardPage />);
    expect(container).toBeDefined();
  });
});
