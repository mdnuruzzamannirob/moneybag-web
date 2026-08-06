import { AppBadge } from '@/components/app-ui';
import { notFound } from 'next/navigation';
import { ButtonLink, FeatureIcon, MarketingCard, PageHero } from '@/components/public/public-ui';
import {
  ArrowRight,
  BriefcaseBusiness,
  Clock3,
  Heart,
  MapPin,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Join the remote team building a calmer way to manage money.',
};

const roles = [
  {
    department: 'Engineering',
    description:
      'Build fast, accessible product experiences in React and TypeScript, with ownership across performance, design systems, and data visualization.',
    salary: '$120k–$160k',
    title: 'Senior Frontend Engineer',
  },
  {
    department: 'Design',
    description:
      'Shape end-to-end product flows, simplify complex financial ideas, and evolve a design system used across web and mobile.',
    salary: '$100k–$135k',
    title: 'Senior Product Designer',
  },
  {
    department: 'Support',
    description:
      'Help customers solve real money problems, improve our knowledge base, and turn recurring questions into better product decisions.',
    salary: '$65k–$85k',
    title: 'Customer Support Lead',
  },
] as const;

export default function CareersPage() {
  // Disabled until MoneyBag has active, verified job openings.
  notFound();

  return (
    <>
      <PageHero
        compact
        description="We're a small team of six. We move fast, care deeply, and ship things that matter."
        eyebrow="CAREERS"
        icon={<BriefcaseBusiness className="size-3.5" />}
        title="Join the MoneyBag team"
        tone="accent"
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-5 sm:grid-cols-3">
          {[
            {
              icon: ShieldCheck,
              title: 'Fully remote',
              text: 'Work from anywhere. Our team spans Berlin, Austin, and Dhaka.',
              tone: 'primary' as const,
            },
            {
              icon: Heart,
              title: 'Great benefits',
              text: 'Health coverage, 30 days PTO, and a $1,000 annual learning budget.',
              tone: 'accent' as const,
            },
            {
              icon: TrendingUp,
              title: 'Own your work',
              text: 'No layers of bureaucracy. Own projects end-to-end and see the impact.',
              tone: 'success' as const,
            },
          ].map(({ icon: Icon, title, text, tone }) => (
            <MarketingCard className="text-center" key={title} padding="md">
              <FeatureIcon className="mx-auto" tone={tone}>
                <Icon />
              </FeatureIcon>
              <h2 className="mt-4 font-bold">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
            </MarketingCard>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-5xl lg:mt-20">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <AppBadge status="info">3 OPEN ROLES</AppBadge>
              <h2 className="mt-3 text-2xl font-bold">Open positions</h2>
            </div>
            <p className="text-sm text-muted-foreground">All positions are remote and full-time.</p>
          </div>
          <div className="space-y-4">
            {roles.map((role) => (
              <MarketingCard key={role.title}>
                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-bold">{role.title}</h3>
                      <AppBadge>{role.department}</AppBadge>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock3 className="size-4" /> Full-time
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="size-4" /> Remote
                      </span>
                      <span>{role.salary}</span>
                    </div>
                  </div>
                  <ButtonLink href="/contact" size="default">
                    Apply <ArrowRight className="size-4" />
                  </ButtonLink>
                </div>
                <p className="mt-4 max-w-3xl text-sm leading-6 text-muted-foreground">
                  {role.description}
                </p>
              </MarketingCard>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-5xl rounded-lg border border-primary/20 bg-linear-to-r from-primary/10 to-brand-accent-soft p-8 text-center lg:mt-20">
          <h2 className="text-2xl font-bold">Don&apos;t see your role?</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
            Send an open application with the problem you want to help us solve.
          </p>
          <ButtonLink className="mt-5" href="/contact">
            Send open application
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
