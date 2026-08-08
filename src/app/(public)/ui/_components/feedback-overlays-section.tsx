'use client';

import {
  AppAlert,
  AppButton,
  AppConfirmDialog,
  AppModal,
  AppPopover,
  AppProgress,
  AppSheet,
  AppTooltip,
} from '@/components/app-ui';
import { useState } from 'react';

export function FeedbackOverlaysSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <div className="space-y-12">
      {/* Alerts */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Alert Messages</h3>
        <div className="space-y-3">
          <AppAlert title="Budget Saved" tone="success">
            Your monthly budget limit has been updated.
          </AppAlert>
          <AppAlert title="Budget Notice" tone="warning">
            You have reached 85% of your monthly dining limit.
          </AppAlert>
          <AppAlert title="Sync Error" tone="danger">
            Unable to synchronize latest wallet data with server.
          </AppAlert>
          <AppAlert title="Notification" tone="info">
            New family member joined your shared workspace.
          </AppAlert>
        </div>
      </section>

      {/* Progress */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Progress Bars</h3>
        <div className="space-y-4 rounded-lg border border-border bg-card p-6">
          <div>
            <div className="mb-1.5 flex justify-between text-sm">
              <span>Savings Goal (Car Fund)</span>
              <span>75%</span>
            </div>
            <AppProgress value={75} />
          </div>
          <div>
            <div className="mb-1.5 flex justify-between text-sm text-warning">
              <span>Monthly Budget Used</span>
              <span>88%</span>
            </div>
            <AppProgress value={88} />
          </div>
        </div>
      </section>

      {/* Modals, Sheets & Dialogs */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Modals, Sheets & Confirmations</h3>
        <div className="flex flex-wrap items-center gap-4 rounded-lg border border-border bg-card p-6">
          <AppButton onClick={() => setModalOpen(true)}>Open Modal</AppButton>
          <AppButton onClick={() => setSheetOpen(true)} variant="secondary">
            Open Sheet
          </AppButton>
          <AppButton onClick={() => setConfirmOpen(true)} variant="destructive">
            Delete Wallet
          </AppButton>

          <AppPopover trigger={<AppButton variant="outline">Popover Info</AppButton>}>
            <p className="p-3 text-sm">Additional context information.</p>
          </AppPopover>

          <AppTooltip content="Click to view details">
            <span className="cursor-pointer text-sm underline">Hover for Tooltip</span>
          </AppTooltip>

          {/* Modal */}
          <AppModal onOpenChange={setModalOpen} open={modalOpen} title="App Modal Demonstration">
            <p className="py-4 text-sm text-muted-foreground">
              This is a standard MoneyBag application modal component designed for consistent
              dialogs.
            </p>
            <div className="flex justify-end gap-3 pt-4">
              <AppButton onClick={() => setModalOpen(false)} variant="outline">
                Cancel
              </AppButton>
              <AppButton onClick={() => setModalOpen(false)}>Confirm Action</AppButton>
            </div>
          </AppModal>

          {/* Sheet */}
          <AppSheet onOpenChange={setSheetOpen} open={sheetOpen} title="Quick Filters">
            <div className="py-4 space-y-4">
              <p className="text-sm text-muted-foreground">
                Side sheet drawer panel for quick filters and actions.
              </p>
              <AppButton className="w-full" onClick={() => setSheetOpen(false)}>
                Apply Filters
              </AppButton>
            </div>
          </AppSheet>

          {/* Confirm Dialog */}
          <AppConfirmDialog
            description="Are you sure you want to delete this cash wallet? This operation cannot be undone."
            onConfirm={() => setConfirmOpen(false)}
            onOpenChange={setConfirmOpen}
            open={confirmOpen}
            title="Confirm Wallet Deletion"
          />
        </div>
      </section>
    </div>
  );
}
