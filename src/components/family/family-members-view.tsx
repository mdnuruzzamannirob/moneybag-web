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
  AppField,
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
  Settings2,
  Trash2,
  UserPlus,
  Users,
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

export function FamilyMembersView() {
  const [modal, setModal] = useState<'invite' | 'create' | 'join' | 'settings' | null>(null);
  const [removeId, setRemoveId] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  return (
    <div className="space-y-6">
      <AppPageHeader
        title="Family management & members"
        description="Manage access, roles, and member invitations for your shared group."
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
              <code className="rounded-md bg-card px-3 py-1.5 text-xs font-medium shadow-xs border border-border">
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
            <span className="grid size-11 place-items-center rounded-xl bg-success/15 text-success">
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

      <AppCard padding="none" className="overflow-hidden">
        <div className="flex items-center justify-between border-b border-border p-5">
          <div>
            <h2 className="font-semibold">Family members</h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              3 of 5 seats used · Members can log expenses and view shared budgets
            </p>
          </div>
          <AppButton size="sm" onClick={() => setModal('invite')}>
            <UserPlus /> Add member
          </AppButton>
        </div>
        <div className="divide-y divide-border">
          {familyMembers.map((member) => (
            <div
              key={member.id}
              className="flex flex-wrap items-center justify-between gap-4 p-5 transition-colors hover:bg-muted/30"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <span
                  className={`grid size-11 shrink-0 place-items-center rounded-full text-sm font-semibold ${member.color}`}
                >
                  {member.initials}
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-foreground truncate">{member.name}</p>
                    <AppBadge status={member.role === 'Owner' ? 'info' : 'neutral'}>
                      {member.role}
                    </AppBadge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {member.relation} · {member.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right text-xs">
                  <p className="font-medium text-foreground">{member.spend}</p>
                  <p className="text-muted-foreground">{member.share} of total</p>
                </div>
                <AppDropdownMenu
                  items={[
                    {
                      icon: <Edit3 />,
                      label: 'Change role',
                      onSelect: () => setModal('invite'),
                    },
                    {
                      disabled: member.role === 'Owner',
                      icon: <Trash2 />,
                      label: 'Remove member',
                      onSelect: () => setRemoveId(member.id),
                      separatorBefore: true,
                      variant: 'destructive',
                    },
                  ]}
                  trigger={
                    <AppButton aria-label="Member menu" size="icon-sm" tone="secondary">
                      <MoreHorizontal />
                    </AppButton>
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </AppCard>

      <AppModal
        open={modal === 'invite'}
        onOpenChange={(open) => !open && setModal(null)}
        title="Invite a family member"
        description="Send an email invitation or share a direct join code with your family."
        footer={
          <>
            <AppButton tone="secondary" onClick={() => setModal(null)}>
              Cancel
            </AppButton>
            <AppButton onClick={() => setModal(null)}>Send invitation</AppButton>
          </>
        }
      >
        <div className="space-y-4">
          <AppField label="Email address" required>
            <AppInput placeholder="e.g. member@example.com" type="email" />
          </AppField>
          <AppField label="Role" required>
            <AppSelect
              options={[
                { label: 'Editor — Can add transactions and edit budgets', value: 'editor' },
                { label: 'Viewer — Can view balances and activity only', value: 'viewer' },
              ]}
              value="editor"
            />
          </AppField>
        </div>
      </AppModal>

      <AppConfirmDialog
        confirmLabel="Remove member"
        description="Are you sure you want to remove this member from your family group? They will lose access to shared wallets."
        onConfirm={() => setRemoveId(null)}
        onOpenChange={(open) => !open && setRemoveId(null)}
        open={Boolean(removeId)}
        title="Remove family member?"
      />
    </div>
  );
}
