'use client';

import { Edit3, Ellipsis, Trash2 } from 'lucide-react';
import { useState } from 'react';

import {
  AppAlert,
  AppButton,
  AppConfirmDialog,
  AppCurrencyInput,
  AppDatePicker,
  AppDropdownMenu,
  AppField,
  AppFileUpload,
  AppInput,
  AppModal,
  AppSegmentedControl,
  AppSelect,
  AppSwitch,
} from '@/components/app-ui';

export type FinanceDialogKind =
  'transaction' | 'import' | 'export' | 'budget' | 'goal' | 'contribution';

const dialogTitles: Record<FinanceDialogKind, string> = {
  transaction: 'Add transaction',
  import: 'Import transactions',
  export: 'Export transactions',
  budget: 'Create budget',
  goal: 'Create savings goal',
  contribution: 'Add contribution',
};

const categoryOptions = [
  { label: 'Food & dining', value: 'food' },
  { label: 'Transport', value: 'transport' },
  { label: 'Shopping', value: 'shopping' },
  { label: 'Entertainment', value: 'entertainment' },
  { label: 'Bills', value: 'bills' },
];

export function FinanceDialog({
  editing = false,
  kind,
  onClose,
}: {
  editing?: boolean;
  kind: FinanceDialogKind;
  onClose: () => void;
}) {
  const [saved, setSaved] = useState(false);
  const title = editing ? getEditTitle(kind) : dialogTitles[kind];
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    setSaved(true);
  };

  return (
    <AppModal
      description={saved ? undefined : getDialogDescription(kind)}
      footer={
        saved ? (
          <AppButton onClick={onClose}>Done</AppButton>
        ) : (
          <>
            <AppButton onClick={onClose} tone="secondary">
              Cancel
            </AppButton>
            <AppButton form="finance-form" type="submit">
              {submitLabel(kind, editing)}
            </AppButton>
          </>
        )
      }
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      open={Boolean(kind)}
      title={saved ? 'Saved successfully' : title}
    >
      {saved ? (
        <AppAlert title="Changes saved" tone="success">
          Your financial record has been updated and your workspace metrics will reflect it
          immediately.
        </AppAlert>
      ) : (
        <form className="space-y-4" id="finance-form" onSubmit={submit}>
          {kind === 'transaction' ? <TransactionFields /> : null}
          {kind === 'import' ? <ImportFields /> : null}
          {kind === 'export' ? <ExportFields /> : null}
          {kind === 'budget' ? <BudgetFields /> : null}
          {kind === 'goal' ? <GoalFields /> : null}
          {kind === 'contribution' ? <ContributionFields /> : null}
        </form>
      )}
    </AppModal>
  );
}

export function RowMenu({ kind }: { kind: 'transaction' | 'budget' | 'goal' }) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  return (
    <>
      <AppDropdownMenu
        items={[
          {
            icon: <Edit3 />,
            label: 'Edit',
            onSelect: () => setEditOpen(true),
          },
          {
            icon: <Trash2 />,
            label: 'Delete',
            onSelect: () => setDeleteOpen(true),
            separatorBefore: true,
            variant: 'destructive',
          },
        ]}
        trigger={
          <AppButton aria-label="Row menu" size="icon-sm" tone="secondary">
            <Ellipsis />
          </AppButton>
        }
      />
      {editOpen ? <FinanceDialog editing kind={kind} onClose={() => setEditOpen(false)} /> : null}
      <AppConfirmDialog
        confirmLabel="Delete entry"
        description="Are you sure you want to delete this record? This action cannot be undone."
        onConfirm={() => setDeleteOpen(false)}
        onOpenChange={setDeleteOpen}
        open={deleteOpen}
        title="Confirm deletion"
      />
    </>
  );
}

function TransactionFields() {
  const [txType, setTxType] = useState('expense');
  return (
    <>
      <AppField label="Transaction type" required>
        <AppSegmentedControl
          onValueChange={(val) => val && setTxType(val)}
          options={[
            { label: 'Expense', value: 'expense' },
            { label: 'Income', value: 'income' },
            { label: 'Transfer', value: 'transfer' },
          ]}
          value={txType}
        />
      </AppField>
      <AppField label="Amount" required>
        <AppCurrencyInput currency="BDT" placeholder="0.00" />
      </AppField>
      <AppField label="Title / Description" required>
        <AppInput placeholder="e.g. Grocery shopping" />
      </AppField>
      <div className="grid gap-4 sm:grid-cols-2">
        <AppField label="Category" required>
          <AppSelect options={categoryOptions} placeholder="Select category" />
        </AppField>
        <AppField label="Wallet" required>
          <AppSelect
            options={[
              { label: 'Cash wallet', value: 'cash' },
              { label: 'BRAC Bank', value: 'brac' },
              { label: 'bKash', value: 'bkash' },
            ]}
            placeholder="Select wallet"
          />
        </AppField>
      </div>
      <AppField label="Date" required>
        <AppDatePicker value={new Date()} />
      </AppField>
      <AppField label="Notes">
        <AppInput placeholder="Add optional details..." />
      </AppField>
    </>
  );
}

function ImportFields() {
  return (
    <>
      <AppField
        description="Supports .csv files from major banks and apps."
        label="Upload CSV file"
        required
      >
        <AppFileUpload accept=".csv" />
      </AppField>
      <AppField label="Target Wallet" required>
        <AppSelect
          options={[
            { label: 'Cash wallet', value: 'cash' },
            { label: 'BRAC Bank', value: 'brac' },
          ]}
          placeholder="Select target wallet"
        />
      </AppField>
    </>
  );
}

function ExportFields() {
  const [format, setFormat] = useState('csv');
  return (
    <>
      <AppField label="Date range" required>
        <AppSelect
          options={[
            { label: 'This month', value: 'month' },
            { label: 'Last 3 months', value: '3m' },
            { label: 'Year to date', value: 'ytd' },
            { label: 'All time', value: 'all' },
          ]}
          value="month"
        />
      </AppField>
      <AppField label="Format" required>
        <AppSegmentedControl
          onValueChange={(val) => val && setFormat(val)}
          options={[
            { label: 'CSV', value: 'csv' },
            { label: 'JSON', value: 'json' },
            { label: 'PDF Report', value: 'pdf' },
          ]}
          value={format}
        />
      </AppField>
    </>
  );
}

function BudgetFields() {
  return (
    <>
      <AppField label="Category" required>
        <AppSelect options={categoryOptions} placeholder="Select category" />
      </AppField>
      <AppField label="Monthly limit" required>
        <AppCurrencyInput currency="BDT" placeholder="0.00" />
      </AppField>
      <AppField label="Rollover unspent amount">
        <AppSwitch label="Rollover unused budget to next month" />
      </AppField>
    </>
  );
}

function GoalFields() {
  return (
    <>
      <AppField label="Goal title" required>
        <AppInput placeholder="e.g. Emergency Fund" />
      </AppField>
      <AppField label="Target amount" required>
        <AppCurrencyInput currency="BDT" placeholder="0.00" />
      </AppField>
      <AppField label="Target date" required>
        <AppDatePicker value={new Date()} />
      </AppField>
    </>
  );
}

function ContributionFields() {
  return (
    <>
      <AppField label="Contribution amount" required>
        <AppCurrencyInput currency="BDT" placeholder="0.00" />
      </AppField>
      <AppField label="Source wallet" required>
        <AppSelect
          options={[
            { label: 'Cash wallet', value: 'cash' },
            { label: 'BRAC Bank', value: 'brac' },
          ]}
          placeholder="Select source wallet"
        />
      </AppField>
    </>
  );
}

function getEditTitle(kind: FinanceDialogKind) {
  if (kind === 'transaction') return 'Edit transaction';
  if (kind === 'budget') return 'Edit budget';
  if (kind === 'goal') return 'Edit goal';
  return 'Edit entry';
}

function getDialogDescription(kind: FinanceDialogKind) {
  if (kind === 'transaction') return 'Enter transaction details to track your spending or income.';
  if (kind === 'import') return 'Upload a CSV export to bulk import your transactions.';
  if (kind === 'export') return 'Download your financial records in your preferred format.';
  if (kind === 'budget') return 'Set a spending limit for a specific category.';
  if (kind === 'goal') return 'Set a target savings milestone and completion date.';
  if (kind === 'contribution')
    return 'Add money towards this savings goal from one of your wallets.';
  return '';
}

function submitLabel(kind: FinanceDialogKind, editing: boolean) {
  if (editing) return 'Save changes';
  if (kind === 'transaction') return 'Add transaction';
  if (kind === 'import') return 'Import CSV';
  if (kind === 'export') return 'Download file';
  if (kind === 'budget') return 'Create budget';
  if (kind === 'goal') return 'Create goal';
  if (kind === 'contribution') return 'Add contribution';
  return 'Submit';
}
