import type { Metadata } from 'next';
import { UserHelpCenter } from '@/components/personal/help-center-view';

export const metadata: Metadata = {
  title: 'Help Center | MoneyBag',
  description: 'Search help guides or contact support.',
};

export default function HelpPage() {
  return <UserHelpCenter />;
}
