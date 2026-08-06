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
  AppSegmentedControl,
  AppTable,
  type AppTableColumn,
  AppField,
  AppSelect,
} from '@/components/app-ui';
import {
  Eye,
  MoreHorizontal,
  Search,
  ShieldAlert,
  UserCheck,
  UserX,
  UserPlus,
  Shield,
} from 'lucide-react';
import type { AdminUserListItem } from '@/types/admin';

const sampleUsers: AdminUserListItem[] = [
  {
    id: 'usr-1',
    name: 'Anika Tahsin',
    email: 'anika@moneybag.app',
    role: 'superadmin',
    status: 'active',
    familyGroupsCount: 2,
    walletsCount: 5,
    lastLoginAt: '10 mins ago',
    createdAt: '12 Jan, 2026',
  },
  {
    id: 'usr-2',
    name: 'Tanvir Rahman',
    email: 'tanvir@example.com',
    role: 'admin',
    status: 'active',
    familyGroupsCount: 1,
    walletsCount: 3,
    lastLoginAt: '2 hours ago',
    createdAt: '15 Jan, 2026',
  },
  {
    id: 'usr-3',
    name: 'Sadia Islam',
    email: 'sadia@example.com',
    role: 'user',
    status: 'active',
    familyGroupsCount: 1,
    walletsCount: 2,
    lastLoginAt: '1 day ago',
    createdAt: '01 Feb, 2026',
  },
  {
    id: 'usr-4',
    name: 'Mahmudul Hassan',
    email: 'mahmud@example.com',
    role: 'user',
    status: 'suspended',
    familyGroupsCount: 0,
    walletsCount: 1,
    lastLoginAt: '5 days ago',
    createdAt: '10 Feb, 2026',
  },
];

export function AdminUsersView() {
  const [users, setUsers] = useState<AdminUserListItem[]>(sampleUsers);
  const [query, setQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [suspendingUser, setSuspendingUser] = useState<AdminUserListItem | null>(null);
  const [impersonatingUser, setImpersonatingUser] = useState<AdminUserListItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = users.filter((u) => {
    const matchQuery =
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.email.toLowerCase().includes(query.toLowerCase());
    const matchRole = roleFilter === 'all' || u.role === roleFilter;
    return matchQuery && matchRole;
  });

  const columns: readonly AppTableColumn<AdminUserListItem>[] = [
    {
      key: 'user',
      header: 'User',
      render: (row) => (
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
            {row.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </span>
          <div>
            <p className="font-semibold text-foreground">{row.name}</p>
            <p className="text-xs text-muted-foreground">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      header: 'Role',
      render: (row) => (
        <AppBadge
          status={row.role === 'superadmin' ? 'info' : row.role === 'admin' ? 'warning' : 'neutral'}
        >
          {row.role}
        </AppBadge>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => (
        <AppBadge
          status={
            row.status === 'active' ? 'success' : row.status === 'suspended' ? 'danger' : 'warning'
          }
        >
          {row.status}
        </AppBadge>
      ),
    },
    {
      key: 'familyGroupsCount',
      header: 'Groups',
      render: (row) => <span className="text-muted-foreground">{row.familyGroupsCount}</span>,
    },
    {
      key: 'walletsCount',
      header: 'Wallets',
      render: (row) => <span className="text-muted-foreground">{row.walletsCount}</span>,
    },
    {
      key: 'lastLogin',
      header: 'Last active',
      render: (row) => <span className="text-muted-foreground">{row.lastLoginAt ?? 'Never'}</span>,
    },
    {
      align: 'right',
      key: 'actions',
      header: 'Actions',
      render: (row) => (
        <AppDropdownMenu
          items={[
            {
              icon: <Eye />,
              label: 'View details',
              onSelect: () => {},
            },
            {
              icon: <Shield />,
              label: 'Impersonate user',
              onSelect: () => setImpersonatingUser(row),
            },
            {
              icon: row.status === 'active' ? <UserX /> : <UserCheck />,
              label: row.status === 'active' ? 'Suspend account' : 'Activate account',
              onSelect: () => setSuspendingUser(row),
              separatorBefore: true,
              variant: row.status === 'active' ? 'destructive' : 'default',
            },
          ]}
          trigger={
            <AppButton size="icon-sm" tone="secondary">
              <MoreHorizontal />
            </AppButton>
          }
        />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <AppPageHeader
        title="User management"
        description="View accounts, assign roles, manage access suspensions, and audit activity."
        actions={
          <AppButton onClick={() => setModalOpen(true)} size="sm">
            <UserPlus /> Create user
          </AppButton>
        }
      />

      <AppCard padding="none">
        <div className="flex flex-col gap-3 p-4 lg:flex-row lg:items-center lg:justify-between border-b border-border">
          <AppSegmentedControl
            onValueChange={(val) => val && setRoleFilter(val)}
            options={[
              { label: 'All roles', value: 'all' },
              { label: 'Users', value: 'user' },
              { label: 'Admins', value: 'admin' },
              { label: 'Superadmins', value: 'superadmin' },
            ]}
            value={roleFilter}
          />
          <AppInput
            leading={<Search />}
            placeholder="Search by name or email..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            containerClassName="w-full sm:w-80"
          />
        </div>

        <AppTable<AdminUserListItem> columns={columns} rows={filtered} getRowKey={(r) => r.id} />
      </AppCard>

      <AppModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title="Create new user account"
        description="Register an account directly with role privileges."
        footer={
          <>
            <AppButton tone="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </AppButton>
            <AppButton onClick={() => setModalOpen(false)}>Create user</AppButton>
          </>
        }
      >
        <div className="space-y-4">
          <AppField label="Full name" required>
            <AppInput placeholder="e.g. Rahim Ahmed" />
          </AppField>
          <AppField label="Email address" required>
            <AppInput placeholder="rahim@example.com" type="email" />
          </AppField>
          <AppField label="Role" required>
            <AppSelect
              options={[
                { label: 'User — standard access', value: 'user' },
                { label: 'Admin — platform operations', value: 'admin' },
              ]}
              value="user"
            />
          </AppField>
        </div>
      </AppModal>

      <AppConfirmDialog
        confirmLabel={suspendingUser?.status === 'active' ? 'Suspend account' : 'Activate account'}
        description={`Are you sure you want to ${suspendingUser?.status === 'active' ? 'suspend' : 'activate'} ${suspendingUser?.name}?`}
        onConfirm={() => setSuspendingUser(null)}
        onOpenChange={(open) => !open && setSuspendingUser(null)}
        open={Boolean(suspendingUser)}
        title={`${suspendingUser?.status === 'active' ? 'Suspend' : 'Activate'} user account?`}
      />

      <AppConfirmDialog
        confirmLabel="Start impersonation session"
        description={`You are about to view MoneyBag as ${impersonatingUser?.name}. All actions during this session will be logged to audit trails.`}
        onConfirm={() => setImpersonatingUser(null)}
        onOpenChange={(open) => !open && setImpersonatingUser(null)}
        open={Boolean(impersonatingUser)}
        title={`Impersonate ${impersonatingUser?.name}?`}
      />
    </div>
  );
}
