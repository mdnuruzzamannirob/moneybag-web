import { AppBadge } from '@/components/app-ui';
import {
  CheckList,
  FeatureIcon,
  MarketingCard,
  PageHero,
  TrialCta,
} from '@/components/public/public-ui';
import {
  AlertTriangle,
  Clock3,
  DatabaseBackup,
  KeyRound,
  LockKeyhole,
  ScanFace,
  ShieldCheck,
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Security',
  description: 'How MoneyBag protects account, payment, and financial data.',
};

const principles = [
  {
    icon: LockKeyhole,
    title: 'Encryption everywhere',
    text: 'Sensitive data is protected in transit and at rest using modern encryption standards.',
    tone: 'primary' as const,
  },
  {
    icon: KeyRound,
    title: 'Strong password storage',
    text: 'Passwords are salted and hashed. Plain-text passwords are never stored.',
    tone: 'accent' as const,
  },
  {
    icon: ScanFace,
    title: 'Short-lived sessions',
    text: 'Access sessions are limited and refresh credentials rotate to reduce exposure.',
    tone: 'success' as const,
  },
  {
    icon: AlertTriangle,
    title: 'Abuse protection',
    text: 'Rate limiting, request validation, and monitoring guard sensitive account actions.',
    tone: 'warning' as const,
  },
  {
    icon: DatabaseBackup,
    title: 'Encrypted backups',
    text: 'Regular encrypted backups are stored separately and tested for recovery.',
    tone: 'info' as const,
  },
  {
    icon: ShieldCheck,
    title: 'Responsible disclosure',
    text: 'Security researchers can report vulnerabilities directly to security@moneybag.app.',
    tone: 'danger' as const,
  },
] as const;

export default function SecurityPage() {
  return (
    <>
      <PageHero
        description="Financial data deserves serious protection. Here is how MoneyBag approaches privacy, access, and resilience."
        eyebrow="SECURITY"
        icon={<ShieldCheck className="size-3.5" />}
        title={
          <>
            Your data. <span className="text-success">Fortress-grade.</span>
          </>
        }
        tone="success"
      />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            [LockKeyhole, 'AES-256', 'Encryption'],
            [ShieldCheck, 'GDPR', 'Data controls'],
            [CheckListIcon, 'SOC 2', 'Readiness'],
            [Clock3, '99.98%', 'Uptime'],
          ].map(([Icon, value, label]) => {
            const I = Icon as typeof LockKeyhole;
            return (
              <MarketingCard className="text-center" key={label as string} padding="md">
                <I className="mx-auto size-8 text-success" />
                <p className="mt-3 text-sm font-bold">{value as string}</p>
                <p className="mt-1 text-xs text-muted-foreground">{label as string}</p>
              </MarketingCard>
            );
          })}
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:mt-20">
          {principles.map(({ icon: Icon, title, text, tone }) => (
            <MarketingCard key={title}>
              <FeatureIcon tone={tone}>
                <Icon />
              </FeatureIcon>
              <h2 className="mt-4 text-lg font-bold">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
            </MarketingCard>
          ))}
        </div>

        <MarketingCard className="mt-16 lg:mt-20" padding="lg">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-bold">Compliance & certifications</h2>
            <AppBadge status="success">PRIVACY FIRST</AppBadge>
          </div>
          <CheckList
            className="mt-7 grid gap-x-8 gap-y-5 sm:grid-cols-2 sm:space-y-0"
            items={[
              <span key="gdpr">
                <strong className="text-foreground">GDPR controls.</strong> Access, correct, export,
                or erase your personal data.
              </span>,
              <span key="pci">
                <strong className="text-foreground">PCI-DSS payments.</strong> Card processing stays
                with a compliant payment provider.
              </span>,
              <span key="soc">
                <strong className="text-foreground">SOC 2 readiness.</strong> Security controls and
                evidence are prepared for external review.
              </span>,
              <span key="ccpa">
                <strong className="text-foreground">CCPA controls.</strong> Clear disclosure and
                deletion pathways for California residents.
              </span>,
            ]}
          />
        </MarketingCard>
      </section>
      <TrialCta
        description="Start without a card, export your data whenever you want, and stay in control."
        title="Security should feel invisible—not uncertain."
      />
    </>
  );
}

function CheckListIcon({ className }: { className?: string }) {
  return <ShieldCheck className={className} />;
}
