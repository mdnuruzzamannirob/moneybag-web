'use client';

import { AppButton, AppSheet } from '@/components/app-ui';
import { cn } from '@/lib/utils';
import { ArrowRight, ChevronDown, ContactRound, Menu, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

import Logo from '../shared/Logo';

const primaryNavigation = [
  { href: '/', label: 'Home' },
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/customers', label: 'Customers' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
] as const;

const moreNavigation = [
  {
    href: '/security',
    icon: ShieldCheck,
    iconClassName: 'text-[#10b981] dark:text-[#4ade80]',
    label: 'Security',
  },
  // Post-MVP public pages. Restore these links when the corresponding product areas launch.
  // { href: '/integrations', icon: PlugZap, iconClassName: 'text-info', label: 'Integrations' },
  // { href: '/changelog', icon: Sparkles, iconClassName: 'text-brand-accent', label: 'Changelog' },
  // { href: '/press', icon: Newspaper, iconClassName: 'text-warning', label: 'Press kit' },
  { href: '/about', icon: ContactRound, iconClassName: 'text-primary', label: 'About' },
  // { href: '/careers', icon: BriefcaseBusiness, iconClassName: 'text-primary', label: 'Careers' },
] as const;

const resourceNavigation = [
  { href: '/help-center', label: 'Help center' },
  // Enable after a verified public status service is available.
  // { href: '/status', label: 'System status' },
  { href: '/faq', label: 'FAQ' },
] as const;

function isActive(pathname: string, href: string) {
  return href === '/' ? pathname === href : pathname.startsWith(href);
}

export default function SiteHeader({
  menuOpen,
  pathname,
  setMenuOpen,
}: {
  menuOpen: boolean;
  pathname: string;
  setMenuOpen: (open: boolean) => void;
}) {
  const moreIsActive = moreNavigation.some((item) => isActive(pathname, item.href));

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo className="font-sans" href="/" />
        <nav
          className="hidden items-center gap-6 text-sm font-semibold lg:flex"
          aria-label="Main navigation"
        >
          {primaryNavigation.map((item) => (
            <Link
              className={cn(
                'relative transition-colors',
                isActive(pathname, item.href)
                  ? 'text-primary hover:text-primary after:absolute after:inset-x-0 after:-bottom-5.5 after:h-0.5 after:rounded-t-full after:bg-primary'
                  : 'text-muted-foreground hover:text-foreground',
              )}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
          <div className="group relative">
            <AppButton
              aria-haspopup="menu"
              className={cn(
                'text-sm font-semibold',
                moreIsActive &&
                  'text-primary after:absolute after:inset-x-0 after:-bottom-4 after:h-0.5 after:rounded-t-full after:bg-primary',
              )}
              size="sm"
              tone="ghost"
              type="button"
            >
              More
              <ChevronDown className="size-3.5 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
            </AppButton>
            <div
              className="invisible absolute right-0 top-full z-50 w-56 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
              role="menu"
            >
              <div className="rounded-lg border border-border bg-card p-2 shadow-[0_8px_24px_rgba(15,23,42,0.08),0_20px_48px_rgba(15,23,42,0.10)]">
                {moreNavigation.map((item) => (
                  <Link
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition-colors hover:bg-secondary"
                    href={item.href}
                    key={item.href}
                    role="menuitem"
                  >
                    <item.icon className={cn('size-4', item.iconClassName)} />
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>

        <div className="flex items-center gap-2">
          <AppButton
            className="hidden sm:inline-flex"
            nativeButton={false}
            render={<Link href="/login" />}
            tone="secondary"
          >
            Log in
          </AppButton>
          <AppButton
            className="h-8! px-2.5! text-xs sm:h-9! sm:px-3! sm:text-sm"
            nativeButton={false}
            render={<Link href="/register" />}
          >
            Get started <ArrowRight className="size-3.5 sm:size-4" />
          </AppButton>
          <AppButton
            aria-label="Open navigation"
            className="lg:hidden"
            onClick={() => setMenuOpen(true)}
            size="icon-lg"
            tone="ghost"
          >
            <Menu className="size-5" />
          </AppButton>
        </div>
      </div>

      <AppSheet
        bodyClassName="overscroll-contain p-4"
        footer={
          <div className="grid w-full grid-cols-2 gap-2">
            <AppButton nativeButton={false} render={<Link href="/login" />} tone="secondary">
              Log in
            </AppButton>
            <AppButton nativeButton={false} render={<Link href="/register" />}>
              Get started
            </AppButton>
          </div>
        }
        footerClassName="p-4"
        headerClassName="p-4"
        onOpenChange={setMenuOpen}
        open={menuOpen}
        title={<Logo className="font-sans" href="/" />}
      >
        <MobileNavGroup
          items={primaryNavigation}
          label="Navigation"
          onNavigate={() => setMenuOpen(false)}
          pathname={pathname}
        />
        <MobileNavGroup
          className="mt-6 border-t border-border pt-6"
          items={moreNavigation}
          label="Explore"
          onNavigate={() => setMenuOpen(false)}
          pathname={pathname}
        />
        <MobileNavGroup
          className="mt-6 border-t border-border pt-6"
          items={resourceNavigation}
          label="Resources"
          onNavigate={() => setMenuOpen(false)}
          pathname={pathname}
        />
      </AppSheet>
    </header>
  );
}

function MobileNavGroup({
  className,
  items,
  label,
  onNavigate,
  pathname,
}: {
  className?: string;
  items: readonly { href: string; label: string }[];
  label: string;
  onNavigate: () => void;
  pathname: string;
}) {
  return (
    <div className={className}>
      <p className="mb-2 px-3 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <nav className="space-y-1" aria-label={label}>
        {items.map((item) => (
          <Link
            className={cn(
              'flex items-center rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground',
              isActive(pathname, item.href) && 'bg-primary/10 text-primary',
            )}
            href={item.href}
            key={item.href}
            onClick={onNavigate}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
