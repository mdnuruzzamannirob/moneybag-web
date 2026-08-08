'use client';

import { useState } from 'react';
import {
  AppBadge,
  AppButton,
  AppCard,
  AppPageHeader,
  AppModal,
  AppField,
  AppInput,
  AppSelect,
} from '@/components/app-ui';
import { Check, Edit3, Plus } from 'lucide-react';
import type { SystemPlan } from '@/types/admin';

const samplePlans: SystemPlan[] = [
  {
    id: 'free',
    name: 'Free Starter',
    code: 'starter',
    priceInCents: 0,
    currency: 'BDT',
    billingInterval: 'monthly',
    features: ['1 personal wallet', 'Up to 50 transactions/mo', 'Basic reports'],
    isActive: true,
  },
  {
    id: 'pro-monthly',
    name: 'Pro Monthly',
    code: 'pro_monthly',
    priceInCents: 59900,
    currency: 'BDT',
    billingInterval: 'monthly',
    features: ['Unlimited wallets', 'Unlimited transactions', 'CSV/PDF exports', 'Recurring rules'],
    isActive: true,
  },
  {
    id: 'family-yearly',
    name: 'Family Yearly',
    code: 'family_yearly',
    priceInCents: 499900,
    currency: 'BDT',
    billingInterval: 'yearly',
    features: [
      'Up to 5 family seats',
      'Shared budgets & balances',
      'Internal settlements',
      'Priority support',
    ],
    isActive: true,
  },
];

export function AdminPlansView() {
  const [plans] = useState<SystemPlan[]>(samplePlans);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <AppPageHeader
        title="Subscription plans"
        description="Configure tier prices, features, billing intervals, and plan availability."
        actions={
          <AppButton onClick={() => setModalOpen(true)} size="sm">
            <Plus /> Add plan
          </AppButton>
        }
      />

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((p) => (
          <AppCard key={p.id} className="flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-foreground">{p.name}</h3>
                <AppBadge status={p.isActive ? 'success' : 'neutral'}>
                  {p.isActive ? 'Active' : 'Disabled'}
                </AppBadge>
              </div>

              <div className="mt-4">
                <span className="text-3xl font-extrabold text-foreground">
                  ৳{(p.priceInCents / 100).toLocaleString()}
                </span>
                <span className="text-xs text-muted-foreground"> / {p.billingInterval}</span>
              </div>

              <ul className="mt-6 space-y-2 text-xs text-muted-foreground border-t border-border pt-4">
                {p.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="size-3.5 text-success" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 border-t border-border pt-4">
              <AppButton
                size="sm"
                tone="secondary"
                className="w-full"
                onClick={() => setModalOpen(true)}
              >
                <Edit3 className="size-3.5" /> Edit plan settings
              </AppButton>
            </div>
          </AppCard>
        ))}
      </div>

      <AppModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title="Configure subscription plan"
        description="Update plan name, price tier, and feature entitlements."
        footer={
          <>
            <AppButton tone="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </AppButton>
            <AppButton onClick={() => setModalOpen(false)}>Save plan</AppButton>
          </>
        }
      >
        <div className="space-y-4">
          <AppField label="Plan name" required>
            <AppInput defaultValue="Pro Monthly" placeholder="e.g. Pro Tier" />
          </AppField>
          <AppField label="Price (BDT)" required>
            <AppInput defaultValue="599" type="number" />
          </AppField>
          <AppField label="Billing interval" required>
            <AppSelect
              options={[
                { label: 'Monthly', value: 'monthly' },
                { label: 'Yearly', value: 'yearly' },
              ]}
              value="monthly"
            />
          </AppField>
        </div>
      </AppModal>
    </div>
  );
}
