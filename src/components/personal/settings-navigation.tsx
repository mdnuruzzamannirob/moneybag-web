'use client';

import { BellRing, LockKeyhole, Settings2, ShieldCheck, UserRound } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

const items = [
  { href: '/settings', label: 'Profile', icon: UserRound },
  { href: '/settings/security', label: 'Security', icon: ShieldCheck },
  { href: '/settings/preferences', label: 'Preferences', icon: Settings2 },
  { href: '/settings/notifications', label: 'Notifications', icon: BellRing },
  { href: '/settings/privacy', label: 'Privacy & data', icon: LockKeyhole },
];

export function SettingsNavigation() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Settings sections"
      className="flex max-w-full min-w-0 gap-1 overflow-x-auto overscroll-x-contain pb-2 lg:flex-col lg:overflow-visible lg:pb-1"
    >
      {items.map(({ href, icon: Icon, label }) => {
        const active = pathname === href;

        return (
          <Link
            className={cn(
              'inline-flex h-9 shrink-0 items-center gap-2.5 rounded-md px-3 text-sm font-medium transition-colors',
              active
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground',
            )}
            href={href}
            key={href}
          >
            <Icon className="size-4" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
