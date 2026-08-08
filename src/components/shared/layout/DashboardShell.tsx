'use client';

import {
  ArrowLeftRight,
  BarChart3,
  CircleDollarSign,
  CreditCard,
  FileText,
  Gauge,
  Grid2X2,
  HelpCircle,
  History,
  Mail,
  Megaphone,
  ReceiptText,
  Settings,
  Shield,
  Tags,
  Target,
  Ticket,
  Users,
  WalletCards,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { cn } from '@/lib/utils';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  count?: string;
};

export type NavSection = {
  label: string;
  items: NavItem[];
};

// ========== USER ==========
export const userNavSections: NavSection[] = [
  {
    label: 'Main',
    items: [
      { href: '/dashboard', label: 'Overview', icon: Grid2X2 },
      { href: '/transactions', label: 'Transactions', icon: ReceiptText, count: '20' },
      { href: '/budgets', label: 'Budgets', icon: Target },
      { href: '/goals', label: 'Savings Goals', icon: CircleDollarSign },
    ],
  },
  {
    label: 'Manage',
    items: [
      { href: '/categories', label: 'Categories', icon: Tags },
      { href: '/wallets', label: 'Wallets', icon: WalletCards },
    ],
  },
  {
    label: 'Insights',
    items: [
      { href: '/analytics', label: 'Analytics', icon: BarChart3 },
      { href: '/reports', label: 'Reports', icon: FileText },
    ],
  },
  {
    label: 'Account',
    items: [
      { href: '/settings', label: 'Settings', icon: Settings },
      { href: '/help', label: 'Help Center', icon: HelpCircle },
    ],
  },
];

// ========== FAMILY ==========
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

// ========== ADMIN ==========
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

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');
  const isFamily = pathname.startsWith('/family');
  const sections = isAdmin ? adminNavSections : isFamily ? familyNavSections : userNavSections;

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
          isAdmin={isAdmin}
          isFamily={isFamily}
          sections={sections}
          onNavigate={() => setOpen(false)}
        />
      </aside>

      <div className="lg:pl-65">
        <Topbar onMenuClick={() => setOpen(true)} sections={sections} />
        <main className="w-full px-4 py-4 sm:px-6 lg:px-8 lg:py-6">{children}</main>
      </div>
    </div>
  );
}
