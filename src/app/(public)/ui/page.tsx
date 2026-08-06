'use client';

import {
  AppAlert,
  AppAvatar,
  AppBadge,
  AppBreadcrumb,
  AppButton,
  AppCard,
  AppCardSkeleton,
  AppCheckbox,
  AppCombobox,
  AppConfirmDialog,
  AppCurrencyInput,
  AppDatePicker,
  AppDateRangePicker,
  AppDropdownMenu,
  AppEmptyState,
  AppField,
  AppFileUpload,
  AppInput,
  AppKbd,
  AppModal,
  AppMultiSelect,
  AppNumberInput,
  AppPageHeader,
  AppPagination,
  AppPopover,
  AppProgress,
  AppRadioGroup,
  AppRangeSlider,
  AppSegmentedControl,
  AppSelect,
  AppSheet,
  AppSkeleton,
  AppStatCard,
  AppSwitch,
  AppTable,
  AppTabs,
  AppTextarea,
  AppTimePicker,
  AppTooltip,
} from '@/components/app-ui';
import { cn } from '@/lib/utils';
import {
  ArrowUpRight,
  Bell,
  Car,
  Check,
  CreditCard,
  Edit3,
  Eye,
  LayoutGrid,
  List,
  Mail,
  MoreHorizontal,
  ReceiptText,
  Search,
  ShoppingBasket,
  SlidersHorizontal,
  Trash2,
  TrendingDown,
  TrendingUp,
  WalletCards,
} from 'lucide-react';
import { useState } from 'react';

const tabs = [
  'Alert',
  'Avatar',
  'Badge',
  'Breadcrumb',
  'Button',
  'Card',
  'Checkbox',
  'Combobox',
  'Confirm Dialog',
  'Currency Input',
  'Date Picker',
  'Date Range Picker',
  'Dropdown Menu',
  'Empty State',
  'Field',
  'File Upload',
  'Input',
  'Keyboard Key',
  'Select',
  'Multi Select',
  'Number Input',
  'Page Header',
  'Pagination',
  'Popover',
  'Progress',
  'Radio Group',
  'Range Slider',
  'Segmented Control',
  'Modal',
  'Sheet',
  'Skeleton',
  'Stat Card',
  'Switch',
  'Table',
  'Tabs',
  'Textarea',
  'Time Picker',
  'Tooltip',
] as const;
type CatalogueTab = (typeof tabs)[number];
const options = [
  {
    description: 'Groceries, restaurants and delivery',
    icon: <ShoppingBasket />,
    label: 'Food & dining',
    value: 'food',
  },
  {
    description: 'Fuel, rides and public transport',
    icon: <Car />,
    label: 'Transport',
    value: 'transport',
  },
  {
    description: 'Utilities and subscriptions',
    icon: <CreditCard />,
    label: 'Bills & payments',
    value: 'bills',
  },
];
const accountOptions = [
  { icon: <WalletCards />, label: 'Cash wallet', value: 'cash' },
  { icon: <CreditCard />, label: 'Bank account', value: 'bank' },
  { icon: <CreditCard />, label: 'Credit card', value: 'card' },
];
const statusOptions = [
  { label: 'All transactions', value: 'all' },
  { label: 'Income only', value: 'income' },
  { label: 'Expenses only', value: 'expense' },
];
const rows = [
  {
    amount: '-৳2,450',
    category: 'Food',
    date: '28 Jul',
    id: 1,
    title: 'Agora grocery',
  },
  {
    amount: '+৳85,000',
    category: 'Salary',
    date: '27 Jul',
    id: 2,
    title: 'Monthly salary',
  },
  {
    amount: '-৳1,840',
    category: 'Bills',
    date: '25 Jul',
    id: 3,
    title: 'Electricity bill',
  },
];

export default function UiComponentsPage() {
  const [active, setActive] = useState<CatalogueTab>('Button');
  const [modal, setModal] = useState(false);
  const [sheet, setSheet] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [page, setPage] = useState(2);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-375 items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-2.5">
            <span className="grid size-8 place-items-center rounded-md bg-primary text-sm font-semibold text-primary-foreground">
              UI
            </span>
            <div>
              <p className="text-sm font-semibold">Moneybag Design System</p>
              <p className="text-xs text-muted-foreground">Components · Patterns · States</p>
            </div>
          </div>
          <AppBadge status="success">{tabs.length} components</AppBadge>
        </div>
      </header>
      <main className="mx-auto max-w-375 bg-background px-4 py-5 lg:px-6">
        <div className="grid min-w-0 items-start gap-6 md:grid-cols-[180px_minmax(0,1fr)] lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-8">
          <aside className="sticky top-19 z-40 overflow-x-auto md:max-h-[calc(100vh-6rem)] md:overflow-y-auto md:pr-2">
            <p className="mb-2 hidden px-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground md:block">
              Components
            </p>
            <nav className="flex min-w-max gap-1 border-b border-border pb-2 md:min-w-0 md:flex-col md:border-b-0 md:pb-0">
              {tabs.map((tab) => (
                <button
                  className={cn(
                    'flex h-8 items-center rounded-md px-2.5 text-left text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:w-full',
                    active === tab &&
                      'bg-primary/10 font-medium text-primary hover:bg-primary/10 hover:text-primary',
                  )}
                  key={tab}
                  onClick={() => setActive(tab)}
                  type="button"
                >
                  {tab}
                </button>
              ))}
            </nav>
          </aside>
          <div className="min-w-0">
            <ComponentDemo
              active={active}
              openConfirm={() => setConfirm(true)}
              openModal={() => setModal(true)}
              openSheet={() => setSheet(true)}
              page={page}
              setPage={setPage}
            />
          </div>
        </div>
      </main>
      <AppModal
        description="A production form using shared App UI controls."
        footer={
          <>
            <AppButton onClick={() => setModal(false)} tone="secondary">
              Cancel
            </AppButton>
            <AppButton onClick={() => setModal(false)}>Save transaction</AppButton>
          </>
        }
        onOpenChange={setModal}
        open={modal}
        title="Add transaction"
      >
        <div className="space-y-4">
          <AppField label="Title">
            <AppInput placeholder="Transaction title" />
          </AppField>
          <AppField label="Category">
            <AppSelect options={options} />
          </AppField>
          <AppDatePicker />
        </div>
      </AppModal>
      <AppSheet
        description="Responsive filters and secondary workflows."
        footer={<AppButton onClick={() => setSheet(false)}>Apply filters</AppButton>}
        onOpenChange={setSheet}
        open={sheet}
        title="Advanced filters"
      >
        <div className="space-y-4">
          <AppInput leading={<Search />} placeholder="Search" />
          <AppDateRangePicker />
          <AppSwitch defaultChecked label="Only recurring" />
        </div>
      </AppSheet>
      <AppConfirmDialog
        confirmLabel="Delete transaction"
        description="This transaction will be permanently removed."
        onConfirm={() => setConfirm(false)}
        onOpenChange={setConfirm}
        open={confirm}
        title="Delete transaction?"
      />
    </>
  );
}

function ComponentDemo({
  active,
  openConfirm,
  openModal,
  openSheet,
  page,
  setPage,
}: {
  active: CatalogueTab;
  openConfirm: () => void;
  openModal: () => void;
  openSheet: () => void;
  page: number;
  setPage: (page: number) => void;
}) {
  if (active === 'Button') {
    return (
      <TabLayout title="Button" description="Actions, variants, sizes and interaction states.">
        <Panel title="Variants">
          <Row label="Button tones">
            <AppButton>Primary</AppButton>
            <AppButton tone="secondary">Secondary</AppButton>
            <AppButton tone="ghost">Ghost</AppButton>
            <AppButton tone="success">
              <Check />
              Success
            </AppButton>
            <AppButton tone="danger">
              <Trash2 />
              Delete
            </AppButton>
          </Row>
        </Panel>
        <Panel title="Sizes and states">
          <Row label="Available sizes">
            <AppButton size="xs">Extra small</AppButton>
            <AppButton size="sm">Small</AppButton>
            <AppButton>Default</AppButton>
            <AppButton size="lg">Large</AppButton>
            <AppButton aria-label="Small icon" size="icon-xs">
              <Bell />
            </AppButton>
            <AppButton aria-label="Notifications" size="icon">
              <Bell />
            </AppButton>
            <AppButton aria-label="Large icon" size="icon-lg">
              <Bell />
            </AppButton>
          </Row>
          <div className="mt-5">
            <Row label="Interaction states">
              <AppButton loading>Saving</AppButton>
              <AppButton disabled>Disabled</AppButton>
              <AppButton tone="secondary">Hover me</AppButton>
            </Row>
          </div>
        </Panel>
      </TabLayout>
    );
  }

  if (active === 'Input') {
    return (
      <TabLayout
        title="Input"
        description="Single-line text entry with icon, validation, disabled and sizing states."
      >
        <Panel title="Input examples">
          <div className="grid gap-4 md:grid-cols-2">
            <AppField label="Default">
              <AppInput placeholder="Transaction title" />
            </AppField>
            <AppField label="Search">
              <AppInput leading={<Search />} placeholder="Search transactions" />
            </AppField>
            <AppField label="Email">
              <AppInput leading={<Mail />} placeholder="Email address" />
            </AppField>
            <AppField error="Enter a valid amount" label="Invalid">
              <AppInput aria-invalid value="-20" readOnly />
            </AppField>
            <AppField label="Filled">
              <AppInput defaultValue="Monthly salary" />
            </AppField>
            <AppField label="Disabled">
              <AppInput disabled value="Locked value" />
            </AppField>
          </div>
        </Panel>
        <Panel title="Input sizes">
          <div className="grid items-end gap-4 md:grid-cols-3">
            <AppField label="Small">
              <AppInput className="h-8! text-xs" placeholder="Small input" />
            </AppField>
            <AppField label="Default">
              <AppInput placeholder="Default input" />
            </AppField>
            <AppField label="Large">
              <AppInput className="h-12! text-base" placeholder="Large input" />
            </AppField>
          </div>
        </Panel>
      </TabLayout>
    );
  }

  if (active === 'Select') {
    return (
      <TabLayout
        title="Select"
        description="Single-value menu selection with placeholder, selected and disabled states."
      >
        <Panel title="Select examples">
          <div className="grid gap-4 md:grid-cols-2">
            <AppField label="Placeholder">
              <AppSelect options={options} placeholder="Choose a category" />
            </AppField>
            <AppField label="Selected">
              <AppSelect options={accountOptions} value="bank" />
            </AppField>
            <AppField label="With leading icon">
              <AppSelect leading={<SlidersHorizontal />} options={statusOptions} value="expense" />
            </AppField>
            <AppField label="Disabled">
              <AppSelect disabled options={accountOptions} value="card" />
            </AppField>
          </div>
        </Panel>
        <Panel title="Sizes and widths">
          <div className="grid items-end gap-4 md:grid-cols-3">
            <AppField label="Small — compact filters">
              <AppSelect
                options={options}
                placeholder="Compact"
                size="sm"
                triggerClassName="w-40"
              />
            </AppField>
            <AppField label="Default — form fields">
              <AppSelect options={options} placeholder="Default" triggerClassName="w-full" />
            </AppField>
            <AppField label="Large — primary choice">
              <AppSelect
                options={options}
                placeholder="Large"
                size="lg"
                triggerClassName="w-full"
              />
            </AppField>
          </div>
        </Panel>
      </TabLayout>
    );
  }

  if (active === 'Popover') {
    return (
      <TabLayout
        title="Popover"
        description="Contextual, non-blocking content attached to a trigger."
      >
        <Panel title="Popover examples">
          <Row label="Button triggers">
            <AppPopover
              description="Filter the current transaction list."
              title="Quick filters"
              trigger={
                <AppButton tone="secondary">
                  <SlidersHorizontal />
                  Open popover
                </AppButton>
              }
            >
              <div className="mt-3 space-y-3">
                <AppCheckbox label="Only expenses" />
                <AppCheckbox label="Recurring transactions" />
              </div>
            </AppPopover>
            <AppPopover
              title="Transaction details"
              trigger={
                <AppButton tone="secondary">
                  <ReceiptText />
                  View details
                </AppButton>
              }
            >
              <dl className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                <dt className="text-muted-foreground">Category</dt>
                <dd className="text-right font-medium">Food</dd>
                <dt className="text-muted-foreground">Amount</dt>
                <dd className="text-right font-medium">৳2,450</dd>
              </dl>
            </AppPopover>
          </Row>
        </Panel>
      </TabLayout>
    );
  }

  if (active === 'Modal') {
    return (
      <TabLayout
        title="Modal"
        description="A focused dialog for creating or editing a single record."
      >
        <Panel title="Overlay examples">
          <div className="grid gap-3 md:grid-cols-2">
            <DemoCard description="Form workflow with header, body and footer." label="Modal">
              <AppButton onClick={openModal}>Open modal</AppButton>
            </DemoCard>
            <DemoCard
              description="Secondary trigger style for the same modal workflow."
              label="Secondary trigger"
            >
              <AppButton onClick={openModal} tone="secondary">
                Edit transaction
              </AppButton>
            </DemoCard>
          </div>
        </Panel>
      </TabLayout>
    );
  }

  if (active === 'Skeleton') {
    return (
      <TabLayout
        title="Skeleton"
        description="Content-shaped placeholders shown while data is loading."
      >
        <Panel title="Loading states">
          <div className="grid gap-4 md:grid-cols-2">
            <AppCard>
              <AppSkeleton className="h-4 w-1/3" />
              <AppSkeleton className="mt-4 h-9 w-1/2" />
            </AppCard>
            <AppCardSkeleton />
          </div>
          <div className="mt-5 space-y-3">
            <Row label="Skeleton sizes">
              <AppSkeleton className="size-8 rounded-full" />
              <AppSkeleton className="size-12 rounded-full" />
              <AppSkeleton className="h-3 w-24" />
              <AppSkeleton className="h-5 w-40" />
              <AppSkeleton className="h-10 w-56" />
            </Row>
          </div>
        </Panel>
        <Panel title="Table loading state">
          <div className="space-y-3">
            {Array.from({ length: 4 }, (_, index) => (
              <div
                className="grid grid-cols-[minmax(0,1fr)_5rem_4rem] items-center gap-4"
                key={index}
              >
                <AppSkeleton className="h-4 w-full" />
                <AppSkeleton className="h-4 w-full" />
                <AppSkeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        </Panel>
      </TabLayout>
    );
  }

  return (
    <AdditionalComponentDemo
      active={active}
      openConfirm={openConfirm}
      openSheet={openSheet}
      page={page}
      setPage={setPage}
    />
  );
}

function AdditionalComponentDemo({
  active,
  openConfirm,
  openSheet,
  page,
  setPage,
}: {
  active: CatalogueTab;
  openConfirm: () => void;
  openSheet: () => void;
  page: number;
  setPage: (page: number) => void;
}) {
  let description = `Usage and available states for the ${active} component.`;
  let demo: React.ReactNode;

  switch (active) {
    case 'Alert':
      demo = (
        <div className="grid gap-3 md:grid-cols-2">
          <AppAlert size="sm" title="Small information">
            Your report is ready.
          </AppAlert>
          <AppAlert size="sm" title="Small success" tone="success">
            Payment received.
          </AppAlert>
          <AppAlert title="Default warning" tone="warning">
            Budget is almost full.
          </AppAlert>
          <AppAlert title="Default error" tone="danger">
            Payment failed.
          </AppAlert>
          <AppAlert size="lg" title="Large information">
            Use larger alerts for messages that need more context, supporting text, or a clearer
            visual priority.
          </AppAlert>
          <AppAlert size="lg" title="Large danger" tone="danger">
            This action cannot be undone. Review the details before continuing.
          </AppAlert>
        </div>
      );
      break;
    case 'Avatar':
      demo = (
        <div className="space-y-5">
          <Row label="Fallback scale">
            <AppAvatar alt="User" fallback="MH" size="sm" />
            <AppAvatar alt="User" fallback="MH" />
            <AppAvatar alt="User" fallback="MH" size="lg" />
            <AppAvatar alt="User" fallback="MH" size="xl" />
          </Row>
          <Row label="Different initials">
            <AppAvatar alt="Anika Tahsin" fallback="AT" />
            <AppAvatar alt="MoneyBag Admin" fallback="AD" size="lg" />
            <AppAvatar alt="Family wallet" fallback="FW" size="xl" />
          </Row>
        </div>
      );
      break;
    case 'Badge':
      demo = (
        <div className="space-y-5">
          <Row label="Status colors">
            <AppBadge status="neutral">Neutral</AppBadge>
            <AppBadge status="info">Info</AppBadge>
            <AppBadge status="success">Success</AppBadge>
            <AppBadge status="warning">Warning</AppBadge>
            <AppBadge status="danger">Danger</AppBadge>
          </Row>
          <Row label="Small to large">
            <AppBadge size="sm" status="info">
              Small
            </AppBadge>
            <AppBadge size="md" status="info">
              Default
            </AppBadge>
            <AppBadge size="lg" status="info">
              Large
            </AppBadge>
          </Row>
        </div>
      );
      break;
    case 'Breadcrumb':
      demo = (
        <div className="space-y-5">
          <Row label="Short path">
            <AppBreadcrumb
              items={[{ href: '/dashboard', label: 'Dashboard' }, { label: 'Overview' }]}
            />
          </Row>
          <Row label="Deep path">
            <AppBreadcrumb
              items={[
                { href: '/dashboard', label: 'Dashboard' },
                { href: '/transactions', label: 'Transactions' },
                { href: '/transactions/recurring', label: 'Recurring' },
                { label: 'Details' },
              ]}
            />
          </Row>
        </div>
      );
      break;
    case 'Card':
      demo = (
        <div className="grid gap-3 md:grid-cols-3">
          <AppCard padding="sm">
            <p className="text-xs text-muted-foreground">Small padding</p>
            <p className="mt-1 text-sm font-semibold">Compact card</p>
          </AppCard>
          <AppCard>
            <p className="text-xs text-muted-foreground">Default padding</p>
            <p className="mt-1 font-semibold">Standard card</p>
            <p className="mt-2 text-sm text-muted-foreground">For most dashboard content.</p>
          </AppCard>
          <AppCard padding="lg">
            <p className="text-xs text-muted-foreground">Large padding</p>
            <p className="mt-1 text-lg font-semibold">Comfortable card</p>
            <p className="mt-2 text-sm text-muted-foreground">For prominent content blocks.</p>
          </AppCard>
        </div>
      );
      break;
    case 'Checkbox':
      demo = (
        <div className="space-y-3">
          <Row label="Small to large">
            <AppCheckbox label="Small" size="sm" />
            <AppCheckbox defaultChecked label="Default" />
            <AppCheckbox defaultChecked label="Large" size="lg" />
          </Row>
          <div className="border-t border-border/60 pt-3">
            <AppCheckbox description="This option cannot be changed." disabled label="Disabled" />
          </div>
        </div>
      );
      break;
    case 'Combobox':
      demo = (
        <div className="grid gap-4 md:grid-cols-2">
          <AppField label="Empty">
            <AppCombobox options={options} placeholder="Search a category" />
          </AppField>
          <AppField label="Selected">
            <AppCombobox options={options} value="food" />
          </AppField>
          <AppField label="Interactive">
            <AppCombobox options={options} placeholder="Click, search, then select" />
          </AppField>
        </div>
      );
      break;
    case 'Confirm Dialog':
      demo = (
        <AppButton onClick={openConfirm} tone="danger">
          <Trash2 />
          Open confirmation
        </AppButton>
      );
      break;
    case 'Currency Input':
      demo = (
        <div className="grid gap-4 md:grid-cols-3">
          <AppField label="Bangladeshi taka">
            <AppCurrencyInput placeholder="0.00" />
          </AppField>
          <AppField label="US dollar">
            <AppCurrencyInput currency="$" placeholder="0.00" />
          </AppField>
          <AppField label="Filled amount">
            <AppCurrencyInput defaultValue="12,450.00" />
          </AppField>
        </div>
      );
      break;
    case 'Date Picker':
      demo = (
        <div className="grid gap-4 md:grid-cols-2">
          <AppField label="Empty date">
            <AppDatePicker />
          </AppField>
          <AppField label="Selected date">
            <AppDatePicker value={new Date(2026, 6, 29)} />
          </AppField>
        </div>
      );
      break;
    case 'Date Range Picker':
      demo = (
        <div className="grid gap-4 lg:grid-cols-2">
          <AppField label="Empty range">
            <AppDateRangePicker />
          </AppField>
          <AppField label="Selected range">
            <AppDateRangePicker value={{ from: new Date(2026, 6, 1), to: new Date(2026, 6, 29) }} />
          </AppField>
        </div>
      );
      break;
    case 'Dropdown Menu':
      demo = (
        <AppDropdownMenu
          items={[
            { icon: <Eye />, label: 'View' },
            { icon: <Edit3 />, label: 'Edit' },
            {
              icon: <Trash2 />,
              label: 'Delete',
              separatorBefore: true,
              variant: 'destructive',
            },
          ]}
          trigger={
            <AppButton tone="secondary">
              Open menu
              <MoreHorizontal />
            </AppButton>
          }
        />
      );
      break;
    case 'Empty State':
      demo = (
        <div className="grid gap-3 lg:grid-cols-2">
          <AppCard padding="none">
            <AppEmptyState
              icon={<Search />}
              description="Try changing your filters or search term."
              title="No results found"
            />
          </AppCard>
          <AppCard padding="none">
            <AppEmptyState
              action={<AppButton>Create wallet</AppButton>}
              icon={<WalletCards />}
              description="Add a wallet to begin tracking transactions."
              title="No wallets yet"
            />
          </AppCard>
        </div>
      );
      break;
    case 'Field':
      demo = (
        <div className="grid max-w-2xl gap-4 md:grid-cols-2">
          <AppField description="Use a clear, recognisable name." label="Wallet name" required>
            <AppInput placeholder="Main wallet" />
          </AppField>
          <AppField error="This field is required" label="Invalid field">
            <AppInput aria-invalid />
          </AppField>
        </div>
      );
      break;
    case 'File Upload':
      demo = (
        <div className="grid gap-4 lg:grid-cols-2">
          <AppFileUpload accept=".csv" description="CSV up to 10 MB" label="Import transactions" />
          <AppFileUpload
            accept="image/*"
            description="PNG or JPG up to 5 MB"
            label="Upload receipt"
            multiple
          />
        </div>
      );
      break;
    case 'Keyboard Key':
      demo = (
        <Row label="Shortcuts">
          <AppKbd>⌘</AppKbd>
          <AppKbd>K</AppKbd>
          <span className="text-sm text-muted-foreground">or</span>
          <AppKbd>Ctrl</AppKbd>
          <AppKbd>P</AppKbd>
        </Row>
      );
      break;
    case 'Multi Select':
      demo = (
        <div className="grid gap-4 md:grid-cols-2">
          <AppField label="Empty">
            <AppMultiSelect options={options} placeholder="Select categories" />
          </AppField>
          <AppField label="Multiple selected">
            <AppMultiSelect options={options} value={['food', 'transport']} />
          </AppField>
        </div>
      );
      break;
    case 'Number Input':
      demo = (
        <div className="grid gap-4 md:grid-cols-3">
          <AppNumberInput label="Minimum" max={12} value={0} />
          <AppNumberInput label="Current value" max={12} value={3} />
          <AppNumberInput label="Maximum" max={12} value={12} />
        </div>
      );
      break;
    case 'Page Header':
      demo = (
        <AppPageHeader
          actions={<AppButton size="sm">Add transaction</AppButton>}
          breadcrumb={
            <AppBreadcrumb
              items={[{ href: '/dashboard', label: 'Dashboard' }, { label: 'Transactions' }]}
            />
          }
          description="Review and manage all money movements."
          title="Transactions"
        />
      );
      break;
    case 'Pagination':
      demo = (
        <div className="space-y-5">
          <Row label="First page">
            <AppPagination page={1} totalPages={3} />
          </Row>
          <Row label="Middle page">
            <AppPagination onPageChange={setPage} page={page} totalPages={8} />
          </Row>
          <Row label="Last page">
            <AppPagination page={12} totalPages={12} />
          </Row>
        </div>
      );
      break;
    case 'Progress':
      demo = (
        <div className="grid gap-5 md:grid-cols-2">
          <AppProgress label="Monthly budget" value={68} />
          <AppProgress label="Savings goal" tone="success" value={84} />
          <AppProgress label="Warning level" tone="warning" value={76} />
          <AppProgress label="Overspent" tone="danger" value={92} />
        </div>
      );
      break;
    case 'Radio Group':
      demo = (
        <div className="max-w-md">
          <AppRadioGroup
            defaultValue="monthly"
            options={[
              {
                description: 'Recommended for most budgets',
                label: 'Monthly',
                value: 'monthly',
              },
              { label: 'Weekly', value: 'weekly' },
              { label: 'Yearly', value: 'yearly' },
            ]}
          />
        </div>
      );
      break;
    case 'Range Slider':
      demo = (
        <div className="grid gap-6 md:grid-cols-2">
          <AppRangeSlider defaultValue={25} label="Low value" suffix="%" />
          <AppRangeSlider defaultValue={50} label="Mid value" suffix="%" />
          <AppRangeSlider defaultValue={75} label="Budget alert" suffix="%" />
          <AppRangeSlider defaultValue={100} label="Maximum" suffix="%" />
        </div>
      );
      break;
    case 'Segmented Control':
      description =
        'Use this control for switching between two or three views of the same data, such as Grid/List or Day/Week/Month.';
      demo = (
        <div className="grid gap-5 lg:grid-cols-2">
          <div>
            <p className="mb-2 text-xs font-medium text-muted-foreground">Two options</p>
            <AppSegmentedControl
              options={[
                { icon: <LayoutGrid />, label: 'Grid', value: 'grid' },
                { icon: <List />, label: 'List', value: 'list' },
              ]}
              value="grid"
            />
          </div>
          <div>
            <p className="mb-2 text-xs font-medium text-muted-foreground">Three options</p>
            <AppSegmentedControl
              options={[
                { label: 'Day', value: 'day' },
                { label: 'Week', value: 'week' },
                { label: 'Month', value: 'month' },
              ]}
              value="month"
            />
          </div>
        </div>
      );
      break;
    case 'Sheet':
      demo = (
        <AppButton onClick={openSheet} tone="secondary">
          Open sheet
        </AppButton>
      );
      break;
    case 'Stat Card':
      description =
        'Dashboard metric cards in default, compact, featured and semantic-status styles.';
      demo = (
        <div className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <AppStatCard change="+8.2%" icon={<WalletCards />} label="Balance" value="৳128,450" />
            <AppStatCard icon={<TrendingUp />} label="Income" tone="success" value="৳103,200" />
            <AppStatCard icon={<TrendingDown />} label="Expenses" tone="danger" value="৳24,870" />
            <AppStatCard icon={<ReceiptText />} label="Budget used" tone="warning" value="68%" />
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            <AppStatCard
              change="Live"
              icon={<WalletCards />}
              label="Featured balance"
              value="৳128,450"
              variant="featured"
            />
            <AppStatCard
              icon={<ReceiptText />}
              label="Compact transactions"
              tone="info"
              value="248"
              variant="compact"
            />
            <AppStatCard
              change="This month"
              icon={<TrendingUp />}
              label="Projected income"
              tone="success"
              value="৳103,200"
            />
          </div>
        </div>
      );
      break;
    case 'Switch':
      demo = (
        <div className="grid gap-3 md:grid-cols-2">
          <AppSwitch label="Small switch" size="sm" />
          <AppSwitch
            defaultChecked
            description="Receive a summary every week."
            label="Weekly summary"
          />
          <AppSwitch defaultChecked label="Large switch" size="lg" />
        </div>
      );
      break;
    case 'Table':
      demo = (
        <AppTable
          columns={[
            {
              header: 'Transaction',
              key: 'title',
              render: (row: (typeof rows)[number]) => (
                <span className="font-medium">{row.title}</span>
              ),
            },
            {
              header: 'Category',
              key: 'category',
              render: (row) => <AppBadge>{row.category}</AppBadge>,
            },
            { header: 'Date', key: 'date', render: (row) => row.date },
            {
              align: 'right',
              header: 'Amount',
              key: 'amount',
              render: (row) => row.amount,
            },
          ]}
          getRowKey={(row) => row.id}
          rows={rows}
        />
      );
      break;
    case 'Tabs':
      demo = (
        <div className="space-y-6">
          <div>
            <p className="mb-2 text-xs font-medium text-muted-foreground">Two tabs</p>
            <AppTabs
              items={[
                {
                  content: <p className="text-sm text-muted-foreground">Overview content</p>,
                  label: 'Overview',
                  value: 'overview',
                },
                {
                  content: <p className="text-sm text-muted-foreground">Activity content</p>,
                  label: 'Activity',
                  value: 'activity',
                },
              ]}
            />
          </div>
          <div>
            <p className="mb-2 text-xs font-medium text-muted-foreground">
              Four tabs with disabled state
            </p>
            <AppTabs
              items={[
                { content: 'All transactions', label: 'All', value: 'all' },
                {
                  content: 'Income transactions',
                  label: 'Income',
                  value: 'income',
                },
                {
                  content: 'Expense transactions',
                  label: 'Expense',
                  value: 'expense',
                },
                {
                  content: 'Archived transactions',
                  disabled: true,
                  label: 'Archived',
                  value: 'archived',
                },
              ]}
            />
          </div>
        </div>
      );
      break;
    case 'Textarea':
      demo = (
        <div className="grid gap-4 md:grid-cols-2">
          <AppField label="Default">
            <AppTextarea placeholder="Add an optional note..." />
          </AppField>
          <AppField label="Filled">
            <AppTextarea defaultValue="Monthly grocery and household essentials." />
          </AppField>
          <AppField error="A note cannot exceed 500 characters" label="Invalid">
            <AppTextarea aria-invalid defaultValue="Invalid note" />
          </AppField>
          <AppField label="Disabled">
            <AppTextarea disabled value="This note is locked." />
          </AppField>
        </div>
      );
      break;
    case 'Time Picker':
      demo = (
        <div className="grid gap-4 md:grid-cols-2">
          <AppField label="Empty time">
            <AppTimePicker />
          </AppField>
          <AppField label="Selected time">
            <AppTimePicker value="14:30" />
          </AppField>
        </div>
      );
      break;
    case 'Tooltip':
      demo = (
        <Row label="Hover or focus">
          <AppTooltip content="Notification settings">
            <AppButton size="icon" tone="secondary">
              <Bell />
            </AppButton>
          </AppTooltip>
          <AppTooltip content="Edit transaction">
            <AppButton size="icon" tone="secondary">
              <Edit3 />
            </AppButton>
          </AppTooltip>
          <AppTooltip content="Delete permanently">
            <AppButton size="icon" tone="danger">
              <Trash2 />
            </AppButton>
          </AppTooltip>
        </Row>
      );
      break;
    default:
      demo = null;
      description = 'Component example';
  }

  return (
    <TabLayout description={description} title={active}>
      <Panel title="Example">{demo}</Panel>
    </TabLayout>
  );
}

function OverviewTab() {
  return (
    <TabLayout
      title="Overview"
      description="Foundations, surfaces and the full component inventory."
    >
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <AppStatCard change="+8.2%" icon={<WalletCards />} label="Balance" value="৳128,450" />
        <AppStatCard icon={<TrendingUp />} label="Income" tone="success" value="৳103,200" />
        <AppStatCard icon={<TrendingDown />} label="Expenses" tone="danger" value="৳24,870" />
        <AppStatCard
          change={<ArrowUpRight className="size-4" />}
          icon={<ReceiptText />}
          label="Budget used"
          tone="warning"
          value="68%"
        />
      </div>
      <Panel title="Scale and identity">
        <Row label="Badges">
          <AppBadge size="sm">Small</AppBadge>
          <AppBadge size="md" status="info">
            Medium
          </AppBadge>
          <AppBadge size="lg" status="success">
            Large status
          </AppBadge>
          <AppBadge status="warning">Warning</AppBadge>
          <AppBadge status="danger">Danger</AppBadge>
        </Row>
        <Row label="Avatars">
          <AppAvatar alt="User" fallback="MH" size="sm" />
          <AppAvatar alt="User" fallback="MH" size="md" />
          <AppAvatar alt="User" fallback="MH" size="lg" />
          <AppAvatar alt="User" fallback="MH" size="xl" />
        </Row>
      </Panel>
      <Panel title="Card spacing">
        <div className="grid gap-3 md:grid-cols-3">
          <AppCard padding="sm">Compact card</AppCard>
          <AppCard>Default card</AppCard>
          <AppCard padding="lg">Comfortable card</AppCard>
        </div>
      </Panel>
      <Panel title="Page structure">
        <AppPageHeader
          breadcrumb={
            <AppBreadcrumb
              items={[{ label: 'Transactions', href: '/transactions' }, { label: 'Details' }]}
            />
          }
          description="Reusable breadcrumb, title, description and action alignment."
          title="Transaction details"
          actions={<AppButton size="sm">Edit</AppButton>}
        />
        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          Keyboard shortcut <AppKbd>?</AppKbd>
          <AppKbd>K</AppKbd>
        </div>
      </Panel>
    </TabLayout>
  );
}

function ActionsTab() {
  return (
    <TabLayout
      title="Buttons & actions"
      description="Hierarchy, sizes, semantic intent and contextual actions."
    >
      <Panel title="Button sizes">
        <Row label="Small to large">
          <AppButton size="sm">Small</AppButton>
          <AppButton>Default</AppButton>
          <AppButton size="lg">Large action</AppButton>
          <AppButton size="icon">
            <Bell />
          </AppButton>
        </Row>
      </Panel>
      <Panel title="Intent and states">
        <Row label="All states">
          <AppButton>Primary</AppButton>
          <AppButton tone="secondary">Secondary</AppButton>
          <AppButton tone="success">
            <Check />
            Success
          </AppButton>
          <AppButton tone="danger">
            <Trash2 />
            Delete
          </AppButton>
          <AppButton loading>Saving</AppButton>
          <AppButton disabled>Disabled</AppButton>
        </Row>
      </Panel>
      <Panel title="Context actions">
        <Row label="Menus and helpers">
          <AppDropdownMenu
            items={[
              { icon: <Edit3 />, label: 'Edit' },
              {
                icon: <Trash2 />,
                label: 'Delete',
                separatorBefore: true,
                variant: 'destructive',
              },
            ]}
            trigger={
              <AppButton size="icon" tone="secondary">
                <MoreHorizontal />
              </AppButton>
            }
          />
          <AppTooltip content="Notification settings">
            <AppButton size="icon" tone="secondary">
              <Bell />
            </AppButton>
          </AppTooltip>
          <AppPopover
            title="Quick filters"
            trigger={
              <AppButton tone="secondary">
                <SlidersHorizontal />
                Popover
              </AppButton>
            }
          >
            <AppCheckbox label="Only expenses" />
          </AppPopover>
        </Row>
      </Panel>
    </TabLayout>
  );
}

function FormsTab({
  multi,
  number,
  setMulti,
  setNumber,
}: {
  multi: string[];
  number: number;
  setMulti: (value: string[]) => void;
  setNumber: (value: number) => void;
}) {
  return (
    <TabLayout
      title="Inputs & forms"
      description="Text, selection, date, upload and numeric controls with matched dimensions."
    >
      <Panel title="Input states">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          <AppField label="Default">
            <AppInput placeholder="Transaction title" />
          </AppField>
          <AppField label="Leading icon">
            <AppInput leading={<Mail />} placeholder="Email address" />
          </AppField>
          <AppField label="Trailing action">
            <AppInput
              trailing={<Eye className="size-4" />}
              type="password"
              value="password"
              readOnly
            />
          </AppField>
          <AppField error="Enter a valid amount" label="Invalid">
            <AppInput aria-invalid value="-20" readOnly />
          </AppField>
          <AppField label="Disabled">
            <AppInput disabled value="Read only value" />
          </AppField>
          <AppField label="Search">
            <AppInput leading={<Search />} placeholder="Search transactions" />
          </AppField>
        </div>
      </Panel>
      <Panel title="Select and date controls">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <AppField label="Select">
            <AppSelect options={options} />
          </AppField>
          <AppField label="Multi select">
            <AppMultiSelect onValueChange={setMulti} options={options} value={multi} />
          </AppField>
          <AppField label="Single date">
            <AppDatePicker />
          </AppField>
          <AppField label="Date range">
            <AppDateRangePicker />
          </AppField>
        </div>
      </Panel>
      <Panel title="Additional controls">
        <div className="grid gap-4 lg:grid-cols-3">
          <AppField label="Textarea">
            <AppTextarea placeholder="Optional note" />
          </AppField>
          <AppRangeSlider defaultValue={75} label="Budget alert" suffix="%" />
          <AppNumberInput label="Installments" max={12} onValueChange={setNumber} value={number} />
          <AppField label="Currency">
            <AppCurrencyInput placeholder="0.00" />
          </AppField>
          <AppField label="Time">
            <AppTimePicker />
          </AppField>
          <AppField label="Searchable combobox">
            <AppCombobox options={options} />
          </AppField>
        </div>
        <div className="mt-4">
          <AppFileUpload accept=".csv" description="CSV up to 10 MB" label="Import transactions" />
        </div>
      </Panel>
    </TabLayout>
  );
}

function SelectionTab() {
  return (
    <TabLayout title="Selection" description="Binary, single-choice and view-selection patterns.">
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Checkbox">
          <div className="space-y-4">
            <AppCheckbox label="Unchecked" />
            <AppCheckbox defaultChecked label="Checked" />
            <AppCheckbox disabled label="Disabled" />
          </div>
        </Panel>
        <Panel title="Switch sizes">
          <div className="space-y-3">
            <AppSwitch label="Small" size="sm" />
            <AppSwitch defaultChecked label="Medium active" />
            <AppSwitch defaultChecked label="Large active" size="lg" />
          </div>
        </Panel>
        <Panel title="Radio group">
          <AppRadioGroup
            defaultValue="monthly"
            options={[
              {
                description: 'Recommended',
                label: 'Monthly',
                value: 'monthly',
              },
              { label: 'Weekly', value: 'weekly' },
            ]}
          />
        </Panel>
        <Panel title="Segmented control">
          <AppSegmentedControl
            options={[
              { icon: <LayoutGrid />, label: 'Grid', value: 'grid' },
              { icon: <List />, label: 'List', value: 'list' },
            ]}
            value="grid"
          />
        </Panel>
      </div>
      <Panel title="Tabs">
        <AppTabs
          items={[
            {
              content: <p className="text-sm text-muted-foreground">Overview content</p>,
              label: 'Overview',
              value: 'overview',
            },
            {
              content: <p className="text-sm text-muted-foreground">Activity content</p>,
              label: 'Activity',
              value: 'activity',
            },
            {
              content: <p className="text-sm text-muted-foreground">Settings content</p>,
              label: 'Settings',
              value: 'settings',
            },
          ]}
        />
      </Panel>
    </TabLayout>
  );
}

function DataTab({ page, setPage }: { page: number; setPage: (page: number) => void }) {
  return (
    <TabLayout
      title="Data & feedback"
      description="Status communication, metrics, tables, progress, loading and empty states."
    >
      <Panel title="Alerts">
        <div className="grid gap-3 md:grid-cols-2">
          <AppAlert title="Report ready">Download is available.</AppAlert>
          <AppAlert title="Payment received" tone="success">
            Balance updated.
          </AppAlert>
          <AppAlert title="Budget warning" tone="warning">
            85% used.
          </AppAlert>
          <AppAlert title="Payment failed" tone="danger">
            Try again.
          </AppAlert>
        </div>
      </Panel>
      <Panel title="Progress">
        <div className="grid gap-5 md:grid-cols-2">
          <AppProgress label="Monthly budget" tone="warning" value={68} />
          <AppProgress label="Savings goal" tone="success" value={84} />
        </div>
      </Panel>
      <Panel title="Table and pagination">
        <AppTable
          columns={[
            {
              header: 'Transaction',
              key: 'title',
              render: (row: (typeof rows)[number]) => (
                <span className="font-medium">{row.title}</span>
              ),
            },
            {
              header: 'Category',
              key: 'category',
              render: (row) => <AppBadge>{row.category}</AppBadge>,
            },
            { header: 'Date', key: 'date', render: (row) => row.date },
            {
              align: 'right',
              header: 'Amount',
              key: 'amount',
              render: (row) => row.amount,
            },
          ]}
          getRowKey={(row) => row.id}
          rows={rows}
        />
        <div className="mt-5 flex justify-end">
          <AppPagination onPageChange={setPage} page={page} totalPages={8} />
        </div>
      </Panel>
      <Panel title="Loading and empty">
        <div className="grid gap-4 md:grid-cols-3">
          <AppCard>
            <AppSkeleton className="h-4 w-1/3" />
            <AppSkeleton className="mt-4 h-9 w-1/2" />
          </AppCard>
          <AppCardSkeleton />
          <AppCard padding="none">
            <AppEmptyState
              action={<AppButton tone="secondary">Create wallet</AppButton>}
              icon={<WalletCards />}
              title="No wallets"
            />
          </AppCard>
        </div>
      </Panel>
    </TabLayout>
  );
}

function OverlaysTab({
  openConfirm,
  openModal,
  openSheet,
}: {
  openConfirm: () => void;
  openModal: () => void;
  openSheet: () => void;
}) {
  return (
    <TabLayout
      title="Popover & overlays"
      description="Layered workflows for forms, filters and destructive confirmation."
    >
      <Panel title="Interactive examples">
        <div className="grid gap-3 md:grid-cols-3">
          <DemoCard description="Structured header, scrollable body and deep footer." label="Modal">
            <AppButton onClick={openModal}>Open modal</AppButton>
          </DemoCard>
          <DemoCard description="Responsive side panel for filters and mobile forms." label="Sheet">
            <AppButton onClick={openSheet} tone="secondary">
              Open sheet
            </AppButton>
          </DemoCard>
          <DemoCard
            description="Focused confirmation for destructive actions."
            label="Confirm dialog"
          >
            <AppButton onClick={openConfirm} tone="danger">
              Delete item
            </AppButton>
          </DemoCard>
        </div>
      </Panel>
    </TabLayout>
  );
}

function TabLayout({
  children,
  description,
  title,
}: {
  children: React.ReactNode;
  description: string;
  title: string;
}) {
  return (
    <section>
      <div className="mb-5 border-b border-border pb-4">
        <div className="mb-2 flex items-center gap-2">
          <AppBadge size="sm" status="info">
            App UI
          </AppBadge>
          <span className="text-xs text-muted-foreground">Component reference</span>
        </div>
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        <p className="mt-1 max-w-3xl text-sm leading-6 text-muted-foreground">{description}</p>
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}
function Panel({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <section className="overflow-hidden rounded-lg border border-border bg-card shadow-xs">
      <div className="border-b border-border bg-muted/30 px-4 py-2.5">
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </section>
  );
}
function Row({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div>
      <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </div>
  );
}
function DemoCard({
  children,
  description,
  label,
}: {
  children: React.ReactNode;
  description: string;
  label: string;
}) {
  return (
    <div className="rounded-md border border-border p-4">
      <p className="text-sm font-medium">{label}</p>
      <p className="mt-1 min-h-10 text-sm text-muted-foreground">{description}</p>
      <div className="mt-4">{children}</div>
    </div>
  );
}

// Keep the extended catalogue examples available while the focused component
// navigation above presents one documentation page at a time.
void [OverviewTab, ActionsTab, FormsTab, SelectionTab, DataTab, OverlaysTab];
