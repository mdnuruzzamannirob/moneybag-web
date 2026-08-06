'use client';

import { useState } from 'react';
import {
  AppBadge,
  AppButton,
  AppCard,
  AppPageHeader,
  AppTable,
  type AppTableColumn,
  AppSegmentedControl,
  AppModal,
  AppField,
  AppInput,
  AppTextarea,
} from '@/components/app-ui';
import { Edit3, Megaphone, Plus, Trash2 } from 'lucide-react';

type ContentItem = {
  id: string;
  title: string;
  type: 'announcement' | 'blog' | 'faq' | 'template';
  status: 'published' | 'draft';
  updatedAt: string;
};

const sampleContent: ContentItem[] = [
  {
    id: 'cnt-1',
    title: 'New Shared Wallets Feature Released',
    type: 'announcement',
    status: 'published',
    updatedAt: '2 days ago',
  },
  {
    id: 'cnt-2',
    title: 'How to Build a Budget That Actually Works',
    type: 'blog',
    status: 'published',
    updatedAt: '1 week ago',
  },
  {
    id: 'cnt-3',
    title: 'How many family members can I invite?',
    type: 'faq',
    status: 'published',
    updatedAt: '2 weeks ago',
  },
  {
    id: 'cnt-4',
    title: 'Welcome Email Template',
    type: 'template',
    status: 'published',
    updatedAt: '1 month ago',
  },
];

export function AdminContentView({ defaultTab = 'announcements' }: { defaultTab?: string }) {
  const [tab, setTab] = useState(defaultTab);
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = sampleContent.filter((c) => {
    if (tab === 'announcements') return c.type === 'announcement';
    if (tab === 'blog') return c.type === 'blog';
    if (tab === 'faq') return c.type === 'faq';
    if (tab === 'templates') return c.type === 'template';
    return true;
  });

  const columns: readonly AppTableColumn<ContentItem>[] = [
    {
      key: 'title',
      header: 'Title / Subject',
      render: (row) => <span className="font-semibold text-foreground">{row.title}</span>,
    },
    {
      key: 'type',
      header: 'Category',
      render: (row) => (
        <AppBadge status="info" className="capitalize">
          {row.type}
        </AppBadge>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => (
        <AppBadge status={row.status === 'published' ? 'success' : 'neutral'}>
          {row.status}
        </AppBadge>
      ),
    },
    {
      key: 'updatedAt',
      header: 'Last updated',
      render: (row) => <span className="text-muted-foreground">{row.updatedAt}</span>,
    },
    {
      align: 'right',
      key: 'actions',
      header: 'Actions',
      render: () => (
        <div className="flex justify-end gap-2">
          <AppButton size="icon-xs" tone="secondary">
            <Edit3 />
          </AppButton>
          <AppButton size="icon-xs" tone="danger">
            <Trash2 />
          </AppButton>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <AppPageHeader
        title="Content & communications"
        description="Manage announcements, blog articles, FAQs, and email notification templates."
        actions={
          <AppButton onClick={() => setModalOpen(true)} size="sm">
            <Plus /> New item
          </AppButton>
        }
      />

      <AppCard padding="none">
        <div className="border-b border-border p-4">
          <AppSegmentedControl
            onValueChange={(val) => val && setTab(val)}
            options={[
              { label: 'Announcements', value: 'announcements' },
              { label: 'Blog', value: 'blog' },
              { label: 'FAQ', value: 'faq' },
              { label: 'Email Templates', value: 'templates' },
            ]}
            value={tab}
          />
        </div>

        <AppTable<ContentItem> columns={columns} rows={filtered} getRowKey={(r) => r.id} />
      </AppCard>

      <AppModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title="Create content item"
        description="Publish a new announcement, blog article, or FAQ item."
        footer={
          <>
            <AppButton tone="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </AppButton>
            <AppButton onClick={() => setModalOpen(false)}>Publish</AppButton>
          </>
        }
      >
        <div className="space-y-4">
          <AppField label="Title" required>
            <AppInput placeholder="Enter title" />
          </AppField>
          <AppField label="Content body" required>
            <AppTextarea placeholder="Type body content here..." rows={4} />
          </AppField>
        </div>
      </AppModal>
    </div>
  );
}
