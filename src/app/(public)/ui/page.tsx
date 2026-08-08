'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { AppBreadcrumb, AppPageHeader, AppSegmentedControl } from '@/components/app-ui';
import { DataDisplaySection } from './_components/data-display-section';
import { FormControlsSection } from './_components/form-controls-section';
import { NavigationSection } from './_components/navigation-section';

// Lazy-load feedback overlays section
const FeedbackOverlaysSection = dynamic(
  () => import('./_components/feedback-overlays-section').then((m) => m.FeedbackOverlaysSection),
  {
    loading: () => (
      <div className="p-8 text-center text-sm text-muted-foreground animate-pulse">
        Loading overlays...
      </div>
    ),
  },
);

export default function UICatalogPage() {
  const [activeTab, setActiveTab] = useState('data');

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      <AppBreadcrumb
        items={[{ label: 'Public Application', href: '/' }, { label: 'UI Catalog' }]}
      />

      <AppPageHeader
        description="MoneyBag Design System & Component Library. Review app-ui primitives, variants, and design tokens."
        title="UI Component Catalog"
      />

      <AppSegmentedControl
        onValueChange={(val) => setActiveTab(val ?? 'data')}
        options={[
          { label: 'Data Display', value: 'data' },
          { label: 'Form Controls', value: 'forms' },
          { label: 'Navigation & Actions', value: 'nav' },
          { label: 'Feedback & Overlays', value: 'feedback' },
          { label: 'All Components', value: 'all' },
        ]}
        value={activeTab}
      />

      <main className="pt-4">
        {(activeTab === 'data' || activeTab === 'all') && (
          <section className="space-y-6">
            <h2 className="text-xl font-bold tracking-tight text-foreground border-b border-border pb-2">
              Data Display Primitives
            </h2>
            <DataDisplaySection />
          </section>
        )}

        {(activeTab === 'forms' || activeTab === 'all') && (
          <section className="mt-12 space-y-6">
            <h2 className="text-xl font-bold tracking-tight text-foreground border-b border-border pb-2">
              Form Controls & Inputs
            </h2>
            <FormControlsSection />
          </section>
        )}

        {(activeTab === 'nav' || activeTab === 'all') && (
          <section className="mt-12 space-y-6">
            <h2 className="text-xl font-bold tracking-tight text-foreground border-b border-border pb-2">
              Navigation & Actions
            </h2>
            <NavigationSection />
          </section>
        )}

        {(activeTab === 'feedback' || activeTab === 'all') && (
          <section className="mt-12 space-y-6">
            <h2 className="text-xl font-bold tracking-tight text-foreground border-b border-border pb-2">
              Feedback & Overlays
            </h2>
            <FeedbackOverlaysSection />
          </section>
        )}
      </main>
    </div>
  );
}
