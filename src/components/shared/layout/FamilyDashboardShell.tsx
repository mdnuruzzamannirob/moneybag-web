'use client';

import { useState } from 'react';
import {
  ArrowLeftRight,
  CircleDollarSign,
  FileText,
  Grid2X2,
  ReceiptText,
  Settings,
  Target,
  Users,
  WalletCards,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { NavSection } from './DashboardShell';

export const familyNavSections: NavSection[] = [
  {
    label: 'Overview',
    items: [
      { href: '/family/dashboard', label: 'Dashboard', icon: Grid2X2 },
      { href: '/family/wallets', label: 'Shared Wallets', icon: WalletCards },
    ],
  },
  {
    label: 'Activity',
    items: [
      { href: '/family/transactions', label: 'Transactions', icon: ReceiptText },
      { href: '/family/budgets', label: 'Budgets', icon: Target },
      { href: '/family/balances', label: 'Balances', icon: CircleDollarSign },
      { href: '/family/settlements', label: 'Settlements', icon: ArrowLeftRight },
    ],
  },
  {
    label: 'Members',
    items: [{ href: '/family/members', label: 'Members', icon: Users }],
  },
  {
    label: 'More',
    items: [
      { href: '/family/reports', label: 'Reports', icon: FileText },
      { href: '/family/settings', label: 'Settings', icon: Settings },
    ],
  },
];

export function FamilyDashboardShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div
        className={cn(
          'fixed inset-0 z-40 bg-foreground/50 transition-opacity lg:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={() => setOpen(false)}
      />

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-65 flex-col border-r border-border bg-card transition-transform duration-200 lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <Sidebar
          isAdmin={false}
          isFamily={true}
          sections={familyNavSections}
          onNavigate={() => setOpen(false)}
        />
      </aside>

      <div className="lg:pl-65">
        <Topbar onMenuClick={() => setOpen(true)} sections={familyNavSections} />
        <main className="w-full px-4 py-4 sm:px-6 lg:px-8 lg:py-6">{children}</main>
      </div>
    </div>
  );
}
