'use client';

import { useState } from 'react';
import {
  AppBadge,
  AppButton,
  AppCard,
  AppPageHeader,
  AppTable,
  type AppTableColumn,
  AppModal,
  AppField,
  AppInput,
} from '@/components/app-ui';
import { Plus, Tag } from 'lucide-react';

type CouponRecord = {
  id: string;
  code: string;
  discountPercent: number;
  maxRedemptions: number;
  timesRedeemed: number;
  expiresAt: string;
  status: 'active' | 'expired';
};

const sampleCoupons: CouponRecord[] = [
  {
    id: 'c-1',
    code: 'WELCOME20',
    discountPercent: 20,
    maxRedemptions: 500,
    timesRedeemed: 184,
    expiresAt: '31 Dec, 2026',
    status: 'active',
  },
  {
    id: 'c-2',
    code: 'EID50',
    discountPercent: 50,
    maxRedemptions: 100,
    timesRedeemed: 100,
    expiresAt: '01 Jul, 2026',
    status: 'expired',
  },
];

export function AdminCouponsView() {
  const [coupons] = useState<CouponRecord[]>(sampleCoupons);
  const [modalOpen, setModalOpen] = useState(false);

  const columns: readonly AppTableColumn<CouponRecord>[] = [
    {
      key: 'code',
      header: 'Coupon code',
      render: (row) => (
        <span className="font-mono font-bold text-primary bg-primary/10 px-2 py-1 rounded-md text-xs">
          {row.code}
        </span>
      ),
    },
    {
      key: 'discount',
      header: 'Discount',
      render: (row) => (
        <span className="font-semibold text-foreground">{row.discountPercent}% OFF</span>
      ),
    },
    {
      key: 'redemptions',
      header: 'Redemptions',
      render: (row) => (
        <span className="text-muted-foreground">
          {row.timesRedeemed} / {row.maxRedemptions}
        </span>
      ),
    },
    {
      key: 'expiresAt',
      header: 'Expires',
      render: (row) => <span className="text-muted-foreground">{row.expiresAt}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => (
        <AppBadge status={row.status === 'active' ? 'success' : 'neutral'}>{row.status}</AppBadge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <AppPageHeader
        title="Promotions & coupons"
        description="Create discount codes, redemption limits, and promotional pricing."
        actions={
          <AppButton onClick={() => setModalOpen(true)} size="sm">
            <Plus /> Create coupon
          </AppButton>
        }
      />

      <AppCard padding="none">
        <AppTable<CouponRecord> columns={columns} rows={coupons} getRowKey={(r) => r.id} />
      </AppCard>

      <AppModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title="Create promotion coupon"
        description="Generate a promo code with percentage discount."
        footer={
          <>
            <AppButton tone="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </AppButton>
            <AppButton onClick={() => setModalOpen(false)}>Create coupon</AppButton>
          </>
        }
      >
        <div className="space-y-4">
          <AppField label="Coupon code" required>
            <AppInput placeholder="e.g. SUMMER2026" />
          </AppField>
          <AppField label="Discount percentage (%)" required>
            <AppInput placeholder="20" type="number" />
          </AppField>
          <AppField label="Max redemptions" required>
            <AppInput placeholder="100" type="number" />
          </AppField>
        </div>
      </AppModal>
    </div>
  );
}
