'use client';

import { Check } from 'lucide-react';
import { useState } from 'react';

import { AppButton, AppField, AppInput, AppModal, AppSelect } from '@/components/app-ui';
import { walletsFixture, type Wallet } from '@/lib/fixtures/wallet-fixtures';

export type WalletDialogKind = 'add' | 'edit' | 'transfer' | null;

export function WalletFormDialog({
  editing,
  kind,
  onClose,
}: {
  editing: Wallet | null;
  kind: WalletDialogKind;
  onClose: () => void;
}) {
  const transfer = kind === 'transfer';
  const [walletType, setWalletType] = useState(editing?.type ?? '');
  const [customType, setCustomType] = useState('');
  const [walletName, setWalletName] = useState(editing?.name ?? '');

  const walletOptions = walletsFixture.map((wallet) => ({ label: wallet.name, value: wallet.id }));
  const typeOptions = [
    { label: 'Cash', value: 'Cash' },
    { label: 'Bank account', value: 'Bank account' },
    { label: 'Mobile banking', value: 'Mobile banking' },
    { label: 'Digital wallet', value: 'Digital wallet' },
    { label: 'Credit card', value: 'Credit card' },
    { label: 'Savings / Goal', value: 'Savings / Goal' },
    { label: 'Investment', value: 'Investment' },
    { label: 'Custom', value: 'Custom' },
  ];

  return (
    <AppModal
      description={
        transfer
          ? 'Move funds between your wallets. Two linked transactions will be created.'
          : editing
            ? 'Update wallet details and preferences.'
            : 'Add an account to track its balance and transactions.'
      }
      footer={
        <>
          <AppButton onClick={onClose} tone="secondary">
            Cancel
          </AppButton>
          <AppButton onClick={onClose}>
            <Check />
            {transfer ? 'Transfer funds' : editing ? 'Save changes' : 'Add wallet'}
          </AppButton>
        </>
      }
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      open={Boolean(kind)}
      title={transfer ? 'Transfer money' : editing ? 'Edit wallet' : 'Add wallet'}
    >
      {transfer ? (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <AppField label="From wallet" required>
              <AppSelect
                defaultValue={editing?.id ?? walletsFixture[0]?.id}
                options={walletOptions}
              />
            </AppField>
            <AppField label="To wallet" required>
              <AppSelect options={walletOptions} placeholder="Select destination" />
            </AppField>
          </div>
          <AppField label="Amount" required>
            <AppInput inputMode="decimal" placeholder="৳0.00" />
          </AppField>
          <AppField label="Note">
            <AppInput placeholder="Optional transfer note" />
          </AppField>
        </div>
      ) : (
        <div className="space-y-4">
          <AppField label="Wallet name" required>
            <AppInput
              onChange={(event) => setWalletName(event.target.value)}
              placeholder="e.g. Dutch-Bangla Bank"
              value={walletName}
            />
          </AppField>
          <div className="grid gap-4 sm:grid-cols-2">
            <AppField label="Wallet type" required>
              <AppSelect
                onValueChange={(value) => setWalletType(value ?? '')}
                options={typeOptions}
                placeholder="Select type"
                value={walletType}
              />
            </AppField>
            <AppField label="Currency" required>
              <AppSelect
                defaultValue="bdt"
                options={[{ label: 'BDT — Bangladeshi taka', value: 'bdt' }]}
              />
            </AppField>
          </div>
          {walletType === 'Custom' ? (
            <AppField label="Custom type name" required>
              <AppInput
                onChange={(event) => setCustomType(event.target.value)}
                placeholder="e.g. Lent to friend"
                value={customType}
              />
            </AppField>
          ) : null}
          <AppField label="Opening balance" required>
            <AppInput inputMode="decimal" placeholder="৳0.00" />
          </AppField>
        </div>
      )}
    </AppModal>
  );
}
