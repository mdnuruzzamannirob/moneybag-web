import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Billing | MoneyBag',
  description: 'Manage your subscription and billing.',
};

export default function Page() {
  return (
    <div className="flex h-[50vh] items-center justify-center">
      <h1 className="text-2xl font-semibold">Billing</h1>
    </div>
  );
}
