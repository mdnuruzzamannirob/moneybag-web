import type { Metadata } from 'next';

import { HelpCenter } from '@/components/user/help-center';

export const metadata: Metadata = {
  title: 'Help Center',
  description: 'Search MoneyBag guides, browse help topics and contact support.',
};

export default function Page() {
  return <HelpCenter />;
}
