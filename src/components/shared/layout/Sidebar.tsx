import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import Logo from '../Logo';

import {
  AppButton,
  AppField,
  AppInput,
  AppModal,
  AppPopover,
  AppTooltip,
} from '@/components/app-ui';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown, Plus, Settings, UserRound, UsersRound, X } from 'lucide-react';
import Link from 'next/link';
import { NavSection } from './DashboardShell';

export default function Sidebar({
  sections,
  onNavigate,
  isAdmin,
  isFamily,
}: {
  sections: NavSection[];
  onNavigate: () => void;
  isAdmin: boolean;
  isFamily: boolean;
}) {
  const pathname = usePathname();

  return (
    <>
      <div className="flex h-16 items-center gap-3 border-b border-border px-5">
        <Logo onNavigate={onNavigate} />
        <button
          className="ml-auto grid size-8 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-muted lg:hidden"
          onClick={onNavigate}
          type="button"
        >
          <X className="size-4" />
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-3">
        {sections.map((section) => (
          <div className="mb-3" key={section.label}>
            <div className="mb-2 px-3 text-[11px] font-medium uppercase text-muted-foreground/70">
              {section.label}
            </div>
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <div key={item.href}>
                    <Link
                      className={cn(
                        'flex h-9 items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors',
                        active
                          ? 'bg-accent text-accent-foreground'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                      )}
                      href={item.href}
                      onClick={onNavigate}
                    >
                      <Icon className="size-4.5 shrink-0" />
                      <span className="min-w-0 flex-1 truncate">{item.label}</span>
                      {item.count ? (
                        <span
                          className={cn(
                            'rounded-full px-2 py-0.5 text-xs font-semibold leading-none',
                            active
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground',
                          )}
                        >
                          {item.count}
                        </span>
                      ) : null}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
      <DashboardSwitcher isAdmin={isAdmin} isFamily={isFamily} onNavigate={onNavigate} />
    </>
  );
}

function DashboardSwitcher({
  isAdmin,
  isFamily,
  onNavigate,
}: {
  isAdmin: boolean;
  isFamily: boolean;
  onNavigate: () => void;
}) {
  const router = useRouter();
  const [hasFamily, setHasFamily] = useState(
    () =>
      isFamily ||
      (typeof window !== 'undefined' &&
        window.localStorage.getItem('moneybag-family-created') === 'true'),
  );
  const [createOpen, setCreateOpen] = useState(false);
  const [familyName, setFamilyName] = useState('');
  if (isAdmin)
    return (
      <div className="mt-auto flex items-center gap-3 border-t border-border px-4 py-3">
        <div className="grid size-9 shrink-0 place-items-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
          AD
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-semibold">Moneybag Admin</div>
          <div className="truncate text-xs text-muted-foreground">Administrator</div>
        </div>
        <AppTooltip content="Profile settings">
          <Link
            aria-label="Open admin profile settings"
            className="grid size-8 shrink-0 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            href="/admin/profile"
            onClick={onNavigate}
          >
            <Settings className="size-4" />
          </Link>
        </AppTooltip>
      </div>
    );
  const go = (href: string) => {
    onNavigate();
    router.push(href);
  };
  const createFamily = () => {
    window.localStorage.setItem('moneybag-family-created', 'true');
    window.localStorage.setItem('moneybag-family-name', familyName.trim() || 'Rahman Family');
    setHasFamily(true);
    setCreateOpen(false);
    go('/family/dashboard');
  };
  const trigger = (
    <button
      className="mt-auto flex w-full items-center gap-3 border-t border-border px-4 py-2.5 text-left outline-none hover:bg-muted"
      type="button"
    >
      <div className="grid size-9 shrink-0 place-items-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
        {isFamily ? 'FM' : 'AT'}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-semibold">
          {isFamily ? 'Rahman Family' : 'Anika Tahsin'}
        </div>
        <div className="truncate text-xs text-muted-foreground">
          {isFamily ? 'Family dashboard' : 'Personal dashboard'}
        </div>
      </div>
      <ChevronsUpDown className="size-4 shrink-0 text-muted-foreground" />
    </button>
  );
  return (
    <>
      <AppPopover trigger={trigger} side="top" contentClassName="w-64 p-0">
        <div className="border-b border-border px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
          Switch to
        </div>
        <div className="space-y-0 pb-3">
          <button
            className={cn(
              'm-0 flex w-full items-center gap-3 px-3 py-2.5 text-left leading-tight transition-colors hover:bg-muted',
              !isFamily && 'bg-muted/70',
            )}
            onClick={() => go('/dashboard')}
            type="button"
          >
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-emerald-500 text-white">
              <UserRound className="size-4" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold text-foreground">Personal</span>
              <span className="block truncate text-[11px] text-muted-foreground">
                Your private finance
              </span>
            </span>
            {!isFamily ? <Check className="size-4 text-emerald-600" /> : null}
          </button>

          {hasFamily ? (
            <button
              className={cn(
                'm-0 flex w-full items-center gap-3 px-3 py-2.5 text-left leading-tight transition-colors hover:bg-muted',
                isFamily && 'bg-muted/70',
              )}
              onClick={() => go('/family/dashboard')}
              type="button"
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-amber-500 text-white">
                <UsersRound className="size-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-foreground">Family</span>
                <span className="block truncate text-[11px] text-muted-foreground">
                  Rahman Family · 4 members
                </span>
              </span>
              {isFamily ? <Check className="size-4 text-emerald-600" /> : null}
            </button>
          ) : (
            <button
              className="flex w-full items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setCreateOpen(true)}
              type="button"
            >
              <Plus className="size-4" />
              Create a family group
            </button>
          )}
        </div>
      </AppPopover>
      <AppModal
        bodyClassName="space-y-4"
        footer={
          <>
            <AppButton onClick={() => setCreateOpen(false)} tone="secondary" type="button">
              Cancel
            </AppButton>
            <AppButton onClick={createFamily} type="button">
              Create family
            </AppButton>
          </>
        }
        onOpenChange={setCreateOpen}
        open={createOpen}
        title="Create your family group"
        description="Create one shared space for your family finances."
      >
        <AppField label="Family name">
          <AppInput
            autoFocus
            id="family-name"
            onChange={(event) => setFamilyName(event.target.value)}
            placeholder="e.g. Rahman Family"
            value={familyName}
          />
        </AppField>
      </AppModal>
    </>
  );
}
