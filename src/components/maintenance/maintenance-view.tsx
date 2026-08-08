'use client';

import { Wrench, RefreshCw, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { AppButton, AppCard } from '@/components/app-ui';

export function MaintenanceView() {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <AppCard className="max-w-md p-8 text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-warning/10 text-warning">
          <Wrench className="size-7" />
        </div>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
          System Maintenance
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          MoneyBag is currently undergoing scheduled upgrades to improve system performance and
          stability. We expect to be back online shortly.
        </p>

        <div className="mt-6 rounded-md border border-border bg-muted/30 p-3 text-xs text-muted-foreground">
          <strong>Status:</strong> Scheduled Database & Infrastructure Upgrade
        </div>

        <div className="mt-6 flex items-center justify-center gap-3">
          <AppButton tone="secondary" onClick={handleRefresh}>
            <RefreshCw className="size-4 mr-1.5" />
            Check Status
          </AppButton>
          <Link href="/">
            <AppButton tone="ghost">
              <ArrowLeft className="size-4 mr-1.5" />
              Home
            </AppButton>
          </Link>
        </div>
      </AppCard>
    </div>
  );
}
