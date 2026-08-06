'use client';

import { useState } from 'react';
import {
  AppBadge,
  AppButton,
  AppCard,
  AppConfirmDialog,
  AppDropdownMenu,
  AppInput,
  AppModal,
  AppPageHeader,
  AppSelect,
} from '@/components/app-ui';
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  Copy,
  Crown,
  Edit3,
  Link2,
  Mail,
  MoreHorizontal,
  Plus,
  Settings2,
  Trash2,
  UserPlus,
  Users,
  WalletCards,
} from 'lucide-react';

const familyMembers = [
  {
    id: 1,
    name: 'Ayesha Rahman',
    relation: 'Self',
    email: 'ayesha@example.com',
    role: 'Owner',
    initials: 'AR',
    spend: '৳ 18,400',
    share: '44%',
    status: 'Active',
    color: 'bg-primary/15 text-primary',
  },
  {
    id: 2,
    name: 'Tanvir Rahman',
    relation: 'Spouse',
    email: 'tanvir@example.com',
    role: 'Admin',
    initials: 'TR',
    spend: '৳ 14,280',
    share: '34%',
    status: 'Active',
    color: 'bg-emerald-100 text-emerald-700',
  },
  {
    id: 3,
    name: 'Nabila Rahman',
    relation: 'Sibling',
    email: 'nabila@example.com',
    role: 'Viewer',
    initials: 'NR',
    spend: '৳ 9,620',
    share: '22%',
    status: 'Active',
    color: 'bg-violet-100 text-violet-700',
  },
];

export function FamilyOverview() {
  const [modal, setModal] = useState<'invite' | 'create' | 'join' | 'settings' | null>(null);
  const [removeId, setRemoveId] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  return (
    <main className="space-y-6">
      <AppPageHeader
        title="Family management"
        description="Share budgets and track spending together with your family."
        actions={
          <>
            <AppButton tone="secondary" onClick={() => setModal('settings')}>
              <Settings2 /> Family settings
            </AppButton>
            <AppButton onClick={() => setModal('invite')}>
              <UserPlus /> Invite member
            </AppButton>
          </>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[1.35fr_1fr]">
        <AppCard className="relative overflow-hidden border-primary/20 bg-gradient-to-br from-primary/10 via-card to-card transition-shadow hover:shadow-md">
          <div className="absolute -right-10 -top-12 size-48 rounded-full bg-primary/10 blur-3xl" />
          <div className="relative flex h-full flex-col justify-between gap-8">
            <div className="flex items-start gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
                <Users className="size-6" />
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl font-semibold">Rahman Family</h2>
                  <AppBadge status="info">
                    <Crown className="mr-1 size-3" /> Pro
                  </AppBadge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Created January 12, 2026 · 3 active members
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <code className="rounded-md bg-card px-3 py-1.5 text-xs font-medium shadow-xs">
                RHM-7K4P-92
              </code>
              <AppButton
                size="icon-xs"
                tone="secondary"
                aria-label="Copy family code"
                onClick={() => {
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1200);
                }}
              >
                {copied ? <Check /> : <Copy />}
              </AppButton>
              <span className="text-xs text-muted-foreground">
                Share this code to invite someone
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <AppButton size="sm" onClick={() => setModal('invite')}>
                <Mail /> Invite by email
              </AppButton>
              <AppButton size="sm" tone="secondary" onClick={() => setModal('join')}>
                <Link2 /> Join another family
              </AppButton>
            </div>
          </div>
        </AppCard>
        <AppCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Family spending</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight">৳ 42,300</p>
              <p className="mt-1 text-sm text-muted-foreground">of ৳ 75,000 monthly limit</p>
            </div>
            <span className="grid size-11 place-items-center rounded-xl bg-success-soft text-success">
              <ArrowDownRight className="size-5" />
            </span>
          </div>
          <div className="mt-6 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">56.4% used</span>
            <AppBadge status="success">Within limit</AppBadge>
          </div>
          <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-muted">
            <div className="h-full w-[56.4%] rounded-full bg-success" />
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-xs text-muted-foreground">Remaining</p>
              <p className="mt-1 font-semibold text-success">৳ 32,700</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Last month</p>
              <p className="mt-1 flex items-center gap-1 font-semibold text-success">
                <ArrowUpRight className="size-3.5" /> 8.4%
              </p>
            </div>
          </div>
        </AppCard>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <AppCard className="transition-all hover:-translate-y-0.5 hover:shadow-md">
          <p className="text-sm text-muted-foreground">Shared balance</p>
          <p className="mt-2 text-2xl font-semibold">৳ 324,850</p>
          <p className="mt-1 text-xs text-muted-foreground">Across 6 wallets</p>
        </AppCard>
        <AppCard className="transition-all hover:-translate-y-0.5 hover:shadow-md">
          <p className="text-sm text-muted-foreground">Family income</p>
          <p className="mt-2 text-2xl font-semibold">৳ 128,500</p>
          <p className="mt-1 text-xs text-success">+12.6% this month</p>
        </AppCard>
        <AppCard className="transition-all hover:-translate-y-0.5 hover:shadow-md">
          <p className="text-sm text-muted-foreground">Member seats</p>
          <p className="mt-2 text-2xl font-semibold">
            3 <span className="text-base font-normal text-muted-foreground">/ 5</span>
          </p>
          <p className="mt-1 text-xs text-muted-foreground">2 seats available</p>
        </AppCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(300px,1fr)]">
        <AppCard padding="none" className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-border p-5">
            <div>
              <h2 className="font-semibold">Family members</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Monthly contribution and access at a glance.
              </p>
            </div>
            <AppButton size="sm" onClick={() => setModal('invite')}>
              <Plus /> Add member
            </AppButton>
          </div>
          <div className="grid gap-3 p-4 sm:grid-cols-2">
            {familyMembers.map((member) => (
              <div
                className="rounded-xl border border-border p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                key={member.id}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className={`grid size-10 place-items-center rounded-full text-xs font-semibold ${member.color}`}
                    >
                      {member.initials}
                    </span>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {member.relation} · {member.email}
                      </p>
                    </div>
                  </div>
                  <AppDropdownMenu
                    trigger={
                      <AppButton
                        size="icon-sm"
                        tone="secondary"
                        aria-label={`Manage ${member.name}`}
                      >
                        <MoreHorizontal />
                      </AppButton>
                    }
                    items={[
                      { label: 'Edit member', icon: <Edit3 />, onSelect: () => undefined },
                      {
                        label: 'Remove member',
                        icon: <Trash2 />,
                        variant: 'destructive',
                        onSelect: () => setRemoveId(member.id),
                      },
                    ]}
                  />
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                  <div>
                    <p className="text-xs text-muted-foreground">This month</p>
                    <p className="mt-1 font-semibold">{member.spend}</p>
                  </div>
                  <div className="text-right">
                    <AppBadge
                      status={
                        member.role === 'Owner'
                          ? 'info'
                          : member.role === 'Admin'
                            ? 'success'
                            : 'neutral'
                      }
                    >
                      {member.role}
                    </AppBadge>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {member.share} of total spend
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <button
              className="flex min-h-44 flex-col items-center justify-center rounded-xl border border-dashed border-border text-muted-foreground transition-colors hover:border-primary hover:bg-primary/5 hover:text-primary"
              onClick={() => setModal('invite')}
              type="button"
            >
              <UserPlus className="size-6" />
              <span className="mt-2 text-sm font-medium">Invite a member</span>
              <span className="mt-1 text-xs">2 seats remaining</span>
            </button>
          </div>
        </AppCard>
        <div className="space-y-6">
          <AppCard>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold">Shared wallets</h2>
                <p className="mt-1 text-sm text-muted-foreground">Accounts shared with family</p>
              </div>
              <AppButton size="icon-sm" tone="secondary" aria-label="Manage wallets">
                <WalletCards />
              </AppButton>
            </div>
            <div className="mt-4 divide-y divide-border">
              {[
                ['BRAC Bank', '৳ 126,800', 'Ayesha'],
                ['Cash wallet', '৳ 18,450', 'Tanvir'],
                ['bKash', '৳ 8,250', 'Ayesha'],
              ].map(([name, amount, owner]) => (
                <div
                  className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
                  key={name}
                >
                  <div>
                    <p className="text-sm font-medium">{name}</p>
                    <p className="text-xs text-muted-foreground">Shared by {owner}</p>
                  </div>
                  <p className="text-sm font-semibold">{amount}</p>
                </div>
              ))}
            </div>
          </AppCard>
          <AppCard>
            <h2 className="font-semibold">Spending by category</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Where your family spent this month.
            </p>
            <div className="mt-5 space-y-4">
              {[
                ['Housing & bills', '৳ 18,400', '44%', 'bg-primary'],
                ['Food & dining', '৳ 12,450', '29%', 'bg-orange-500'],
                ['Transport', '৳ 5,280', '12%', 'bg-emerald-500'],
                ['Other', '৳ 6,170', '15%', 'bg-violet-500'],
              ].map(([name, amount, percent, tone]) => (
                <div key={name}>
                  <div className="mb-1.5 flex justify-between text-sm">
                    <span>{name}</span>
                    <span className="font-medium">{amount}</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div className={`h-full rounded-full ${tone}`} style={{ width: percent }} />
                  </div>
                </div>
              ))}
            </div>
          </AppCard>
        </div>
      </div>

      <AppModal
        open={modal === 'invite'}
        onOpenChange={(open) => !open && setModal(null)}
        title="Invite a family member"
        description="Send a secure invitation to join your family workspace."
        footer={
          <>
            <AppButton tone="secondary" onClick={() => setModal(null)}>
              Cancel
            </AppButton>
            <AppButton onClick={() => setModal(null)}>
              <Mail /> Send invitation
            </AppButton>
          </>
        }
      >
        <div className="space-y-4">
          <label className="block space-y-1.5 text-sm font-medium">
            Member name
            <AppInput placeholder="e.g. Sara Rahman" />
          </label>
          <label className="block space-y-1.5 text-sm font-medium">
            Email address
            <AppInput type="email" placeholder="name@example.com" />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block space-y-1.5 text-sm font-medium">
              Relation
              <AppSelect
                ariaLabel="Relation"
                options={['Spouse', 'Child', 'Sibling', 'Parent', 'Member'].map((value) => ({
                  label: value,
                  value: value.toLowerCase(),
                }))}
                placeholder="Select relation"
              />
            </label>
            <label className="block space-y-1.5 text-sm font-medium">
              Role
              <AppSelect
                ariaLabel="Role"
                options={[
                  { label: 'Admin', value: 'admin' },
                  { label: 'Member', value: 'member' },
                  { label: 'Viewer', value: 'viewer' },
                ]}
                placeholder="Select role"
              />
            </label>
          </div>
        </div>
      </AppModal>
      <AppModal
        open={modal === 'create'}
        onOpenChange={(open) => !open && setModal(null)}
        title="Create a family"
        description="Set up a shared workspace for your household."
        footer={
          <>
            <AppButton tone="secondary" onClick={() => setModal(null)}>
              Cancel
            </AppButton>
            <AppButton onClick={() => setModal(null)}>
              <Check /> Create family
            </AppButton>
          </>
        }
      >
        <div className="space-y-4">
          <label className="block space-y-1.5 text-sm font-medium">
            Family name
            <AppInput placeholder="e.g. The Rahman Family" />
          </label>
          <label className="block space-y-1.5 text-sm font-medium">
            Monthly spending limit
            <AppInput type="number" placeholder="75000" />
          </label>
        </div>
      </AppModal>
      <AppModal
        open={modal === 'join'}
        onOpenChange={(open) => !open && setModal(null)}
        title="Join a family"
        description="Enter the invite code shared by the family owner."
        footer={
          <>
            <AppButton tone="secondary" onClick={() => setModal(null)}>
              Cancel
            </AppButton>
            <AppButton onClick={() => setModal(null)}>
              <Link2 /> Join family
            </AppButton>
          </>
        }
      >
        <label className="block space-y-1.5 text-sm font-medium">
          Invite code
          <AppInput placeholder="RHM-7K4P-92" />
        </label>
      </AppModal>
      <AppModal
        open={modal === 'settings'}
        onOpenChange={(open) => !open && setModal(null)}
        title="Family settings"
        description="Update your family workspace details."
        footer={
          <>
            <AppButton tone="secondary" onClick={() => setModal(null)}>
              Cancel
            </AppButton>
            <AppButton onClick={() => setModal(null)}>
              <Check /> Save changes
            </AppButton>
          </>
        }
      >
        <div className="space-y-4">
          <label className="block space-y-1.5 text-sm font-medium">
            Family name
            <AppInput defaultValue="Rahman Family" />
          </label>
          <label className="block space-y-1.5 text-sm font-medium">
            Monthly spending limit
            <AppInput defaultValue="75000" type="number" />
          </label>
          <div className="rounded-lg border border-danger/20 bg-danger-soft/50 p-3 text-sm text-danger">
            <p className="font-medium">Danger zone</p>
            <p className="mt-1 text-xs">
              Deleting this family removes shared access for every member.
            </p>
            <AppButton className="mt-3" size="sm" tone="danger">
              <Trash2 /> Delete family
            </AppButton>
          </div>
        </div>
      </AppModal>
      <AppConfirmDialog
        open={removeId !== null}
        onOpenChange={(open) => !open && setRemoveId(null)}
        title="Remove family member?"
        description="This member will lose access to shared wallets and family spending."
        confirmLabel="Remove member"
        onConfirm={() => setRemoveId(null)}
      />
    </main>
  );
}

export default FamilyOverview;
