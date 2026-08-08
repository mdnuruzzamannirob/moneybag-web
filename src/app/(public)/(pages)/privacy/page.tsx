import type { Metadata } from 'next';
import { LegalPage, type LegalSection } from '@/components/public/legal-page';
export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How MoneyBag collects, uses, protects, and gives you control over your data.',
};
const sections: LegalSection[] = [
  {
    id: 'collection',
    title: 'Information we collect',
    content: (
      <>
        <h3>Account data</h3>
        <p>
          We collect your name, email address, and an optional avatar. With OAuth sign-in, we
          receive the details you approve.
        </p>
        <h3>Financial data you enter</h3>
        <p>
          This includes wallets, transactions, budgets, savings goals, family groups, members, and
          settlements.
        </p>
        <h3>Payment and technical data</h3>
        <p>
          Our payment provider handles card data. We retain only limited references for billing. We
          may also process IP address, browser details, timestamps, and coarse usage events for
          security and product reliability.
        </p>
      </>
    ),
  },
  {
    id: 'use',
    title: 'How we use information',
    content: (
      <ul>
        <li>Provide, maintain, and improve MoneyBag.</li>
        <li>Authenticate you and protect your account.</li>
        <li>Process payments and prevent fraud.</li>
        <li>Send transactional messages and optional marketing you request.</li>
      </ul>
    ),
  },
  {
    id: 'sharing',
    title: 'Sharing',
    content: (
      <>
        <p>
          We do not sell your data. We share necessary information with vetted providers that
          operate payments, email, hosting, databases, and privacy-respecting analytics.
        </p>
        <p>
          We may disclose information when required by law or necessary to protect MoneyBag, our
          users, or others.
        </p>
      </>
    ),
  },
  {
    id: 'cookies',
    title: 'Cookies & tokens',
    content: (
      <p>
        We use a small number of cookies and similar technologies for authentication, CSRF
        protection, session continuity, and optional product analytics. You can control optional
        cookies through your browser.
      </p>
    ),
  },
  {
    id: 'security',
    title: 'Storage & security',
    content: (
      <>
        <p>
          We use encryption in transit, strong password hashing, session-token rotation, protected
          state-changing requests, and restricted production access.
        </p>
        <p>
          No system is perfectly secure, but we continuously improve safeguards and respond promptly
          to incidents.
        </p>
      </>
    ),
  },
  {
    id: 'rights',
    title: 'Your rights',
    content: (
      <ul>
        <li>
          <strong>Access:</strong> export your account data.
        </li>
        <li>
          <strong>Correction:</strong> update profile and preference details.
        </li>
        <li>
          <strong>Deletion:</strong> permanently delete your account.
        </li>
        <li>
          <strong>Marketing opt-out:</strong> unsubscribe from non-essential email.
        </li>
      </ul>
    ),
  },
  {
    id: 'transfers',
    title: 'International transfers',
    content: (
      <p>
        MoneyBag operates globally. Information may be processed in other countries with contractual
        and technical safeguards appropriate to the transfer.
      </p>
    ),
  },
  {
    id: 'children',
    title: 'Children',
    content: (
      <p>
        MoneyBag is not directed to children under 13 or a higher age where local law requires it.
        Contact us if you believe a child has created an account.
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes',
    content: (
      <p>
        We may update this policy. Material updates will be communicated with the effective date
        shown at the top of this page.
      </p>
    ),
  },
  {
    id: 'contact',
    title: 'Contact',
    content: (
      <p>
        For privacy questions or to exercise your rights, email{' '}
        <a href="mailto:privacy@moneybag.app">privacy@moneybag.app</a>.
      </p>
    ),
  },
];
export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="July 29, 2026"
      intro="This Policy explains how MoneyBag collects, uses, and shares information when you use the Service. We believe in collecting the minimum data necessary and being clear about what we do with it."
      sections={sections}
    />
  );
}
