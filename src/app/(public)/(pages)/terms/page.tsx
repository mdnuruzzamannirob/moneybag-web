import type { Metadata } from 'next';
import { LegalPage, type LegalSection } from '@/components/public/legal-page';
export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'The terms that govern your use of MoneyBag.',
};
const sections: LegalSection[] = [
  {
    id: 'acceptance',
    title: 'Acceptance of terms',
    content: (
      <p>
        By accessing or using MoneyBag, you confirm that you can form a binding contract with us,
        accept these Terms, and will comply with them. If you do not agree, do not use the Service.
      </p>
    ),
  },
  {
    id: 'accounts',
    title: 'Accounts & security',
    content: (
      <>
        <p>
          You agree to provide accurate information and safeguard your credentials. You are
          responsible for activity under your account.
        </p>
        <ul>
          <li>Use a strong, unique password.</li>
          <li>Tell us promptly if you suspect unauthorized access.</li>
          <li>We will never ask for your password by email, chat, or phone.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'subscriptions',
    title: 'Subscriptions & billing',
    content: (
      <>
        <p>
          MoneyBag offers Free, Pro Monthly, Pro Yearly, and Unlimited Lifetime plans. Paid plans
          are billed in advance through our payment provider.
        </p>
        <p>
          You may cancel at any time. Cancellation takes effect at the end of the current billing
          period unless applicable law requires otherwise.
        </p>
      </>
    ),
  },
  {
    id: 'trial',
    title: 'Free trial',
    content: (
      <p>
        New accounts receive a 14-day Pro trial without a credit card. If you do not upgrade, your
        account returns to Free and your existing data is preserved subject to Free plan limits.
      </p>
    ),
  },
  {
    id: 'use',
    title: 'Acceptable use',
    content: (
      <>
        <p>You agree not to misuse the Service. You may not:</p>
        <ul>
          <li>Use MoneyBag for an unlawful purpose.</li>
          <li>Probe or disrupt our systems without written consent.</li>
          <li>Reverse engineer the Service or upload malicious content.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'family',
    title: 'Family groups',
    content: (
      <p>
        Pro users may invite up to five members. Owners are responsible for the group they create
        and the access they grant. Members may leave, while owners must transfer ownership or delete
        the group.
      </p>
    ),
  },
  {
    id: 'data',
    title: 'Data & privacy',
    content: (
      <p>
        Our <a href="/privacy">Privacy Policy</a> explains what we collect, why we collect it, and
        the choices available to you.
      </p>
    ),
  },
  {
    id: 'termination',
    title: 'Termination',
    content: (
      <p>
        We may suspend access for a material breach, security risk, or legal requirement. You may
        delete your account from settings; account deletion is permanent.
      </p>
    ),
  },
  {
    id: 'disclaimers',
    title: 'Disclaimers',
    content: (
      <p>
        The Service is provided “as is.” MoneyBag does not provide financial, tax, or investment
        advice. Charts and insights are informational only.
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes',
    content: (
      <p>
        We may update these Terms. We will provide reasonable notice for material changes. Continued
        use after the effective date means you accept the update.
      </p>
    ),
  },
  {
    id: 'contact',
    title: 'Contact',
    content: (
      <p>
        Questions about these Terms? Email{' '}
        <a href="mailto:legal@moneybag.app">legal@moneybag.app</a>.
      </p>
    ),
  },
];
export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="July 29, 2026"
      intro="These Terms govern access to MoneyBag websites, applications, and related services. By creating an account or using the Service, you agree to these Terms."
      sections={sections}
    />
  );
}
