'use client';

import { Camera, Download, LogOut } from 'lucide-react';
import { useState } from 'react';

import {
  AppAvatar,
  AppButton,
  AppCard,
  AppConfirmDialog,
  AppField,
  AppInput,
  AppSelect,
  AppSwitch,
} from '@/components/app-ui';

type Section = 'profile' | 'security' | 'preferences' | 'notifications' | 'billing' | 'privacy';

function Row({ action, hint, label }: { action: React.ReactNode; hint: string; label: string }) {
  return (
    <div className="flex min-w-0 flex-col gap-4 border-b border-border py-5 first:pt-0 last:border-b-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">{hint}</p>
      </div>
      <div className="flex shrink-0 items-center max-sm:w-full max-sm:[&>button]:w-full">
        {action}
      </div>
    </div>
  );
}

function SettingsCard({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <AppCard>
      <h2 className="mb-6 text-base font-semibold text-foreground">{title}</h2>
      {children}
    </AppCard>
  );
}

export function SettingsPanel({ section }: { section: Section }) {
  if (section === 'profile') return <Profile />;
  if (section === 'security') return <Security />;
  if (section === 'preferences') return <Preferences />;
  if (section === 'notifications') return <Notifications />;
  if (section === 'billing') return <Billing />;
  return <Privacy />;
}

function Security() {
  return (
    <SettingsCard title="Security & sign-in">
      <Row
        action={
          <AppButton size="sm" tone="secondary">
            Change password
          </AppButton>
        }
        hint="Last changed: 12 June 2026"
        label="Password"
      />
      <Row
        action={
          <AppButton size="sm" tone="secondary">
            Set up
          </AppButton>
        }
        hint="Add a verification code on top of your password for extra safety"
        label="Two-factor authentication (2FA)"
      />
      <Row
        action={
          <AppButton size="sm" tone="secondary">
            Connect
          </AppButton>
        }
        hint="Sign in faster with your Google account"
        label="Google account"
      />
      <Row
        action={
          <AppButton tone="secondary">
            <LogOut />
            Manage sessions
          </AppButton>
        }
        hint="You’re currently signed in on 2 devices"
        label="Active sessions"
      />
    </SettingsCard>
  );
}

function Preferences() {
  return (
    <SettingsCard title="Preferences">
      <Row
        action={
          <AppSelect
            defaultValue="bdt"
            options={[
              { label: '৳ BDT — Taka', value: 'bdt' },
              { label: '$ USD — Dollar', value: 'usd' },
              { label: '€ EUR — Euro', value: 'eur' },
            ]}
            triggerClassName="w-full sm:w-52"
          />
        }
        hint="Used throughout the app"
        label="Currency"
      />
      <Row
        action={
          <AppSelect
            defaultValue="dd"
            options={[
              { label: 'DD MMM, YYYY', value: 'dd' },
              { label: 'MM/DD/YYYY', value: 'mm' },
            ]}
            triggerClassName="w-full sm:w-52"
          />
        }
        hint="How dates are displayed"
        label="Date format"
      />
      <div className="pt-5">
        <AppSwitch
          defaultChecked
          description="Use smaller spacing across the dashboard"
          label="Compact mode"
        />
      </div>
    </SettingsCard>
  );
}

function Notifications() {
  return (
    <SettingsCard title="Notifications">
      <div className="space-y-3">
        <AppSwitch
          defaultChecked
          description="Notify me when I reach 80% of a budget"
          label="Budget warnings"
        />
        <AppSwitch
          defaultChecked
          description="Notify me of transactions over ৳5,000"
          label="Large transactions"
        />
        <AppSwitch
          description="Receive a spending summary every Sunday morning"
          label="Weekly summary"
        />
      </div>
    </SettingsCard>
  );
}

function Billing() {
  return (
    <SettingsCard title="Plan & billing">
      <Row
        action={<AppButton>Upgrade plan</AppButton>}
        hint="Free plan · Your next billing date is not set"
        label="Current plan"
      />
      <Row
        action={<AppButton tone="secondary">Add payment method</AppButton>}
        hint="Add a card to start a paid subscription"
        label="Payment method"
      />
    </SettingsCard>
  );
}

function Privacy() {
  const [confirmDelete, setConfirmDelete] = useState(false);
  return (
    <>
      <SettingsCard title="Privacy & data">
        <Row
          action={
            <AppButton tone="secondary">
              <Download />
              Export data
            </AppButton>
          }
          hint="Download your wallets, transactions and budgets as a JSON file"
          label="Export all data"
        />
        <Row
          action={
            <AppButton onClick={() => setConfirmDelete(true)} tone="danger">
              Delete account
            </AppButton>
          }
          hint="Permanently remove your account and all associated data. This cannot be undone."
          label="Delete account"
        />
      </SettingsCard>
      <AppConfirmDialog
        confirmLabel="Delete account"
        description="Your account, transactions, budgets, and savings goals will be permanently deleted."
        onConfirm={() => setConfirmDelete(false)}
        onOpenChange={setConfirmDelete}
        open={confirmDelete}
        title="Delete your account?"
      />
    </>
  );
}

function Profile() {
  const [name, setName] = useState('Anika Tahsin');
  const [email, setEmail] = useState('anika@moneybag.app');
  return (
    <SettingsCard title="Your profile">
      <div className="mb-7 flex flex-wrap items-center gap-4 border-b border-border pb-6">
        <AppAvatar alt="Anika Tahsin" fallback="AT" size="xl" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium">Profile photo</p>
          <p className="mt-1 text-xs text-muted-foreground">JPG, GIF or PNG. Max size 2MB.</p>
        </div>
        <AppButton size="sm" tone="secondary">
          <Camera />
          Change photo
        </AppButton>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <AppField label="Full name">
          <AppInput onChange={(event) => setName(event.target.value)} value={name} />
        </AppField>
        <AppField label="Email address">
          <AppInput onChange={(event) => setEmail(event.target.value)} type="email" value={email} />
        </AppField>
      </div>
      <div className="mt-7 flex justify-end border-t border-border pt-5 max-sm:[&_button]:w-full">
        <AppButton size="sm">Save changes</AppButton>
      </div>
    </SettingsCard>
  );
}
