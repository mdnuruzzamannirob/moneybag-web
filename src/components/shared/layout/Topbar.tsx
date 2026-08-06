import { useTheme, type Theme } from '@/providers/theme-provider';
import { Bell, Check, Laptop, Link, LogOut, Menu, Moon, Search, Sun } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import {
  AppBreadcrumb,
  AppButton,
  AppConfirmDialog,
  AppInput,
  AppKbd,
  AppPopover,
  AppTooltip,
} from '@/components/app-ui';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { NavSection } from './DashboardShell';
import { wallets } from '@/components/user/wallet-data';
import { cn } from '@/lib/utils';

const themeOptions = [
  { icon: Sun, label: 'Light', value: 'light' },
  { icon: Moon, label: 'Dark', value: 'dark' },
  { icon: Laptop, label: 'System', value: 'system' },
] as const satisfies readonly {
  icon: typeof Sun;
  label: string;
  value: Theme;
}[];

export default function Topbar({
  onMenuClick,
  sections,
}: {
  onMenuClick: () => void;
  sections: NavSection[];
}) {
  const { setTheme, theme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const items = sections.flatMap((section) =>
    section.items.map((item) => ({ ...item, section: section.label })),
  );
  const matches = items.filter((item) =>
    (item.label + ' ' + item.section).toLowerCase().includes(query.toLowerCase()),
  );
  const active = items.find(
    (item) => pathname === item.href || pathname.startsWith(item.href + '/'),
  );
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing = target?.matches('input,textarea,[contenteditable="true"]');
      const isHelpCenter = pathname === '/help';
      if (
        ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') ||
        (event.key === '/' && !typing && !isHelpCenter)
      ) {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [pathname]);
  useEffect(() => {
    if (searchOpen) window.setTimeout(() => inputRef.current?.focus(), 0);
  }, [searchOpen]);
  const base = pathname.startsWith('/admin')
    ? { href: '/admin/dashboard', label: 'Administrator' }
    : pathname.startsWith('/family')
      ? { href: '/family/dashboard', label: 'Family' }
      : { href: '/dashboard', label: 'Personal' };
  const walletId = pathname.startsWith('/wallets/') ? pathname.split('/')[2] : null;
  const wallet = walletId ? wallets.find((item) => item.id === walletId) : null;
  const breadcrumbItems = wallet
    ? [base, { href: '/wallets', label: 'Wallets' }, { label: wallet.name }]
    : [base, { label: active?.label || 'Dashboard' }];
  const currentLabel = wallet?.name ?? active?.label ?? 'Dashboard';
  const selectedTheme = themeOptions.find((option) => option.value === theme) ?? themeOptions[2];
  const ThemeIcon = selectedTheme.icon;
  const notifications = [
    {
      title: 'Budget reminder',
      detail: 'Your July spending is near the planned limit.',
      time: '5m ago',
    },
    {
      title: 'Savings goal',
      detail: 'Emergency fund received a new contribution.',
      time: '1h ago',
    },
  ];
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-border bg-card/95 px-4 backdrop-blur sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          aria-label="Open navigation"
          className="grid size-8 shrink-0 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-muted lg:hidden"
          onClick={onMenuClick}
          type="button"
        >
          <Menu className="size-4" />
        </button>
        <div className="hidden min-w-0 lg:block">
          <AppBreadcrumb items={breadcrumbItems} />
        </div>
        <span className="max-w-28 truncate text-sm font-medium lg:hidden">{currentLabel}</span>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <AppButton
          aria-label="Search pages"
          className="sm:hidden"
          onClick={() => setSearchOpen(true)}
          size="icon-sm"
          tone="secondary"
        >
          <Search className="size-4" />
        </AppButton>
        <AppInput
          aria-label="Search pages"
          className="hidden h-8 bg-muted/40 shadow-none sm:block"
          leading={<Search />}
          containerClassName="hidden shrink-0 sm:block"
          onClick={() => setSearchOpen(true)}
          onChange={(event) => {
            setQuery(event.target.value);
            setSearchOpen(true);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              setSearchOpen(true);
            }
          }}
          placeholder="Search..."
          value={query}
          trailing={
            <AppTooltip content="Shortcut">
              <AppKbd>⌘K</AppKbd>
            </AppTooltip>
          }
        />
        <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
          <DialogContent className="top-20 max-w-xl translate-y-0 gap-4 sm:top-24">
            <DialogHeader className="pr-12">
              <DialogTitle>Search MoneyBag</DialogTitle>
              <DialogDescription>Find a page or finance section quickly.</DialogDescription>
            </DialogHeader>
            <AppInput
              ref={inputRef}
              leading={<Search />}
              placeholder="Search pages..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <div className="max-h-72 overflow-y-auto">
              {matches.length ? (
                matches.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm hover:bg-muted"
                      href={item.href}
                      key={item.href}
                      onClick={() => setSearchOpen(false)}
                    >
                      <Icon className="size-4" />
                      {item.label}
                      <span className="ml-auto text-xs text-muted-foreground">{item.section}</span>
                    </Link>
                  );
                })
              ) : (
                <p className="px-2 py-5 text-center text-sm text-muted-foreground">
                  No matching pages found.
                </p>
              )}
            </div>
          </DialogContent>
        </Dialog>
        {/* {showAddButton ? (
          <AppPopover
            align="end"
            contentClassName="w-64 gap-2 p-2"
            trigger={
              <AppButton size="sm">
                <Plus className="size-4" />
                <span className="hidden sm:inline">Quick actions</span>
              </AppButton>
            }
          >
            <Link
              className="flex rounded-md px-2 py-2 text-sm hover:bg-muted"
              href="/transactions?type=income"
            >
              Add income
            </Link>
            <Link
              className="flex rounded-md px-2 py-2 text-sm hover:bg-muted"
              href="/transactions?type=expense"
            >
              Add expense
            </Link>
            <Link className="flex rounded-md px-2 py-2 text-sm hover:bg-muted" href="/wallets">
              Transfer between wallets
            </Link>
          </AppPopover>
        ) : null} */}
        <AppPopover
          align="end"
          contentClassName="w-80 gap-2 p-2"
          trigger={
            <AppButton aria-label="Notifications" size="icon-sm" tone="secondary">
              <Bell className="size-4" />
            </AppButton>
          }
        >
          <div className="px-2 pb-1 pt-1">
            <div className="text-sm font-semibold">Notifications</div>
            <p className="text-xs text-muted-foreground">Latest activity from your workspace.</p>
          </div>
          <div className="space-y-1">
            {notifications.map((item) => (
              <div className="rounded-md px-2 py-2.5 hover:bg-muted" key={item.title}>
                <div className="flex items-start gap-3">
                  <span className="mt-1 size-2 rounded-full bg-primary" />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium">{item.title}</div>
                    <div className="truncate text-xs text-muted-foreground">{item.detail}</div>
                  </div>
                  <span className="shrink-0 text-[11px] text-muted-foreground">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </AppPopover>

        <AppPopover
          align="end"
          contentClassName="w-40 gap-0 p-1"
          onOpenChange={setThemeMenuOpen}
          open={themeMenuOpen}

          trigger={
            <AppButton aria-label={`Theme: ${selectedTheme.label}`} size="icon-sm" tone="secondary">
              <ThemeIcon className="size-4" />
            </AppButton>
          }
        >
          <div className="mt-0.5 space-y-0.5">
            {themeOptions.map(({ icon: Icon, label, value }) => {
              const selected = theme === value;
              return (
                <button
                  aria-pressed={selected}
                  className={cn(
                    'flex h-8 w-full items-center gap-2 rounded-md px-2 text-left text-xs font-medium transition-colors hover:bg-muted',
                    selected && 'bg-primary/10 text-primary hover:bg-primary/10',
                  )}
                  key={value}
                  onClick={() => {
                    setTheme(value);
                    setThemeMenuOpen(false);
                  }}
                  type="button"
                >
                  <Icon className="size-4 shrink-0" />
                  <span className="min-w-0 flex-1 truncate">{label}</span>
                  {selected ? <Check className="size-4 shrink-0" /> : null}
                </button>
              );
            })}
          </div>
        </AppPopover>
        <AppButton
          aria-label="Log out"
          onClick={() => setLogoutOpen(true)}
          size="icon-sm"
          tone="secondary"
        >
          <LogOut className="size-4" />
        </AppButton>
        <AppConfirmDialog
          cancelLabel="Stay"
          confirmLabel="Log out"
          description="You will be signed out of this account."
          onConfirm={() => {
            setLogoutOpen(false);
            router.push('/login');
          }}
          onOpenChange={setLogoutOpen}
          open={logoutOpen}
          title="Confirm logout"
          variant="danger"
        />
      </div>
    </header>
  );
}
