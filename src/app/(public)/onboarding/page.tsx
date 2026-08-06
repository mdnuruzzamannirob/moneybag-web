import type { Metadata } from 'next';
import { OnboardingFlow } from '@/components/onboarding/onboarding-flow';

export const metadata: Metadata = {
  title: 'Onboarding | MoneyBag',
  description: 'Set up your currency, initial wallet, and budget preferences in MoneyBag.',
};

export default function OnboardingPage() {
  return <OnboardingFlow />;
}
