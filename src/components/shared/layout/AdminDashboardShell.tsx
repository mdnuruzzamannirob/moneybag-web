'use client';

import { useState } from 'react';
import {
  BarChart3,
  CircleDollarSign,
  CreditCard,
  FileText,
  Gauge,
  HelpCircle,
  History,
  Mail,
  Megaphone,
  Settings,
  Shield,
  Ticket,
  Users,
  WalletCards,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { NavSection } from './DashboardShell';

export const adminNavSections: NavSection[] = [
  {
    label: 'Main',
    items: [{ href: '/admin/dashboard', label: 'Dashboard', icon: Gauge }],
  },
  {
    label: 'Users & Subscriptions',
    items: [
      { href: '/admin/users', label: 'Users', icon: Users },
      { href: '/admin/subscriptions', label: 'Subscriptions', icon: WalletCards },
      { href: '/admin/coupons', label: 'Coupons', icon: CreditCard },
      { href: '/admin/plans', label: 'Plans', icon: CircleDollarSign },
    ],
  },
  {
    label: 'Reports',
    items: [{ href: '/admin/reports', label: 'Reports', icon: BarChart3 }],
  },
  {
    label: 'Content',
    items: [
      { href: '/admin/announcements', label: 'Announcements', icon: Megaphone },
      { href: '/admin/blog', label: 'Blog', icon: FileText },
      { href: '/admin/faq', label: 'FAQ', icon: HelpCircle },
      { href: '/admin/email-templates', label: 'Email Templates', icon: Mail },
    ],
  },
  {
    label: 'Support',
    items: [{ href: '/admin/tickets', label: 'Tickets', icon: Ticket }],
  },
  {
    label: 'System & Security',
    items: [
      { href: '/admin/system-health', label: 'System Health', icon: Shield },
      { href: '/admin/audit-logs', label: 'Audit Logs', icon: History },
      { href: '/admin/settings', label: 'Settings', icon: Settings },
    ],
  },
];

export function AdminDashboardShell({ children }: { children: React.ReactNode }) {
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
          isAdmin={true}
          isFamily={false}
          sections={adminNavSections}
          onNavigate={() => setOpen(false)}
        />
      </aside>

      <div className="lg:pl-65">
        <Topbar onMenuClick={() => setOpen(true)} sections={adminNavSections} />
        <main className="w-full px-4 py-4 sm:px-6 lg:px-8 lg:py-6">{children}</main>
      </div>
    </div>
  );
}
