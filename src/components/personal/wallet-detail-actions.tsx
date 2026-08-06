'use client';

import { AppButton, AppConfirmDialog, AppDropdownMenu } from '@/components/app-ui';
import { ArrowLeftRight, Edit3, MoreHorizontal, ReceiptText, Star, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { walletsFixture } from '@/lib/fixtures/wallet-fixtures';
import { WalletFormDialog, type WalletDialogKind } from '@/components/personal/wallet-modal';

export function WalletDetailActions({ walletId }: { walletId: string }) {
  const router = useRouter();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [dialog, setDialog] = useState<WalletDialogKind>(null);
  const wallet = walletsFixture.find((item) => item.id === walletId);

  if (!wallet) return null;

  return (
    <>
      <AppButton onClick={() => setDialog('transfer')} size="sm" tone="secondary">
        <ArrowLeftRight /> Transfer
      </AppButton>
      <AppButton
        nativeButton={false}
        render={<Link href={`/transactions?wallet=${wallet.id}`} />}
        size="sm"
      >
        <ReceiptText /> View transactions
      </AppButton>
      <AppDropdownMenu
        items={[
          {
            icon: <Edit3 />,
            label: 'Edit wallet',
            onSelect: () => setDialog('edit'),
          },
          {
            disabled: wallet.isDefault,
            icon: <Star />,
            label: wallet.isDefault ? 'Default wallet' : 'Set as default',
          },
          {
            disabled: wallet.isDefault,
            icon: <Trash2 />,
            label: 'Delete wallet',
            onSelect: () => setDeleteOpen(true),
            separatorBefore: true,
            variant: 'destructive',
          },
        ]}
        trigger={
          <AppButton aria-label={`${wallet.name} actions`} size="icon-sm" tone="secondary">
            <MoreHorizontal />
          </AppButton>
        }
      />

      <WalletFormDialog editing={wallet} kind={dialog} onClose={() => setDialog(null)} />

      <AppConfirmDialog
        confirmLabel="Delete wallet"
        description="This wallet can only be deleted after its transactions are moved or removed."
        onConfirm={() => {
          setDeleteOpen(false);
          router.push('/wallets');
        }}
        onOpenChange={setDeleteOpen}
        open={deleteOpen}
        title={`Delete ${wallet.name}?`}
      />
    </>
  );
}
