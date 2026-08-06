'use client';

import { AppBadge, AppCard, AppPageHeader, AppStatCard } from '@/components/app-ui';
import { Activity, Database, Cpu, HardDrive, Server, ShieldCheck } from 'lucide-react';
import { adminDashboardDemoData } from '@/lib/dashboard-data';

export function AdminSystemHealthView() {
  const services = adminDashboardDemoData.services;

  return (
    <div className="space-y-6">
      <AppPageHeader
        title="System health & operations"
        description="Monitor service availability, database performance, memory, and workers."
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AppStatCard
          icon={<ShieldCheck />}
          label="Platform status"
          tone="success"
          value="100% Operational"
        />
        <AppStatCard icon={<Cpu />} label="API Uptime" tone="primary" value="99.99%" />
        <AppStatCard icon={<Database />} label="DB Latency" tone="info" value="18 ms" />
        <AppStatCard
          icon={<HardDrive />}
          label="Worker Queue"
          tone="success"
          value="0 Jobs Pending"
        />
      </section>

      <AppCard padding="none">
        <div className="border-b border-border p-4">
          <h2 className="font-semibold text-foreground">Infrastructure status</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Real-time status metrics of underlying platform services
          </p>
        </div>
        <div className="divide-y divide-border">
          {services.map((svc) => (
            <div key={svc.id} className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Server className="size-5" />
                </span>
                <div>
                  <p className="font-semibold text-foreground">{svc.name}</p>
                  <p className="text-xs text-muted-foreground">{svc.detail}</p>
                </div>
              </div>
              <AppBadge status={svc.status === 'healthy' ? 'success' : 'warning'}>
                {svc.status}
              </AppBadge>
            </div>
          ))}
        </div>
      </AppCard>
    </div>
  );
}
