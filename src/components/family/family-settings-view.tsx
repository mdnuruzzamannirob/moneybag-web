'use client';

import { useState } from 'react';
import {
  AppButton,
  AppCard,
  AppConfirmDialog,
  AppField,
  AppInput,
  AppPageHeader,
  AppSelect,
  AppSwitch,
} from '@/components/app-ui';

export function FamilySettingsView() {
  const [groupName, setGroupName] = useState('Rahman Family');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <AppPageHeader
        title="Family group settings"
        description="Configure group details, currency, permissions, and group deletion."
      />

      <form onSubmit={handleSave} className="space-y-6">
        <AppCard>
          <h2 className="mb-6 text-base font-semibold text-foreground">Group profile</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <AppField label="Family group name" required>
              <AppInput value={groupName} onChange={(e) => setGroupName(e.target.value)} />
            </AppField>

            <AppField label="Group currency" required>
              <AppSelect
                options={[
                  { label: '৳ BDT — Taka', value: 'bdt' },
                  { label: '$ USD — Dollar', value: 'usd' },
                ]}
                value="bdt"
              />
            </AppField>
          </div>

          <div className="mt-6 border-t border-border pt-5">
            <AppField label="Default transaction split rule">
              <AppSelect
                options={[
                  { label: 'Split equally among all members', value: 'equal' },
                  { label: 'Do not split automatically', value: 'none' },
                ]}
                value="equal"
              />
            </AppField>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
            {saved ? (
              <span className="text-xs font-medium text-success">Settings saved successfully!</span>
            ) : (
              <span />
            )}
            <AppButton type="submit" size="sm">
              Save settings
            </AppButton>
          </div>
        </AppCard>
      </form>

      <AppCard>
        <h2 className="mb-4 text-base font-semibold text-foreground">Danger zone</h2>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-border pt-4">
          <div>
            <p className="text-sm font-medium text-foreground">Delete family group</p>
            <p className="text-xs text-muted-foreground">
              Permanently remove this group, shared wallets, and transaction history.
            </p>
          </div>
          <AppButton tone="danger" onClick={() => setConfirmDelete(true)}>
            Delete group
          </AppButton>
        </div>
      </AppCard>

      <AppConfirmDialog
        confirmLabel="Delete group"
        description="Are you sure you want to delete this family group? All shared budgets and transactions will be deleted."
        onConfirm={() => setConfirmDelete(false)}
        onOpenChange={setConfirmDelete}
        open={confirmDelete}
        title="Delete family group?"
      />
    </div>
  );
}
