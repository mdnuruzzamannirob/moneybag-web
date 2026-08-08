import {
  BarChart3,
  Download,
  Image as ImageIcon,
  Layers3,
  Mail,
  Newspaper,
  Users,
} from 'lucide-react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { AppBadge, AppButton } from '@/components/app-ui';
import Logo from '@/components/shared/Logo';
import {
  ButtonLink,
  FeatureIcon,
  MarketingCard,
  PageHero,
  PublicSection,
  SectionHeading,
} from '@/components/public/public-ui';

export const metadata: Metadata = {
  title: 'Press Kit',
  description: 'MoneyBag company facts, approved brand assets, and media contact information.',
};

const facts = [
  ['2024', 'Founded'],
  ['50K+', 'People supported'],
  ['12+', 'Countries reached'],
  ['99.99%', 'Platform uptime'],
] as const;

const storyAngles = [
  {
    icon: Users,
    title: 'Money without the shame',
    description:
      'How a calmer, collaborative product can help people build healthier financial habits.',
  },
  {
    icon: BarChart3,
    title: 'The new household finance stack',
    description: 'Why modern money tools need to work for partners, families, and shared goals.',
  },
  {
    icon: Layers3,
    title: 'Designing trust into fintech',
    description:
      'The product and security decisions behind a transparent, privacy-first experience.',
  },
] as const;

export default function PressPage() {
  // Disabled until approved press assets and company facts are available.
  notFound();

  return (
    <>
      <PageHero
        description="Company facts, approved brand assets, and a direct line to our team for media enquiries."
        eyebrow="PRESS"
        icon={<Newspaper className="size-3.5" />}
        title={
          <>
            The MoneyBag story, <span className="text-info">ready to share</span>
          </>
        }
        tone="info"
      />

      <PublicSection className="bg-card/30">
        <h2 className="sr-only">MoneyBag at a glance</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map(([value, label]) => (
            <MarketingCard className="text-center" key={label} padding="md">
              <p className="text-3xl font-bold tracking-tight text-info">{value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{label}</p>
            </MarketingCard>
          ))}
        </div>
      </PublicSection>

      <PublicSection muted>
        <SectionHeading
          description="Download the approved primary logo or contact us when you need a tailored media pack."
          eyebrow="BRAND ASSETS"
          title="Use the MoneyBag brand with confidence"
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <MarketingCard
            className="flex min-h-64 flex-col justify-between overflow-hidden"
            padding="none"
          >
            <div className="grid min-h-40 place-items-center bg-primary px-8">
              <Logo href="/" inverse />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 p-6">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">Primary logo</h3>
                  <AppBadge size="sm" status="success">
                    Approved
                  </AppBadge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">PNG · transparent background</p>
              </div>
              <AppButton
                nativeButton={false}
                render={<a download="moneybag-logo.png" href="/logo.png" />}
                tone="secondary"
              >
                <Download className="size-4" /> Download
              </AppButton>
            </div>
          </MarketingCard>

          <MarketingCard className="flex flex-col justify-between">
            <div>
              <FeatureIcon tone="info">
                <ImageIcon />
              </FeatureIcon>
              <h3 className="mt-5 text-xl font-bold">Need screenshots or interviews?</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Tell us about your publication, deadline, and the angle you&apos;re exploring.
                We&apos;ll send the most relevant material.
              </p>
            </div>
            <AppButton
              className="mt-8 w-fit"
              nativeButton={false}
              render={<a href="mailto:press@moneybag.app" />}
            >
              <Mail className="size-4" /> Email press team
            </AppButton>
          </MarketingCard>
        </div>
      </PublicSection>

      <PublicSection>
        <SectionHeading
          centered
          description="Our team can contribute product, design, and consumer-finance perspectives."
          eyebrow="STORY IDEAS"
          title="Three conversations we care about"
          tone="accent"
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {storyAngles.map(({ description, icon: Icon, title }) => (
            <MarketingCard key={title}>
              <FeatureIcon tone="accent">
                <Icon />
              </FeatureIcon>
              <h3 className="mt-5 text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
            </MarketingCard>
          ))}
        </div>
        <div className="mt-12 text-center">
          <ButtonLink href="/about" tone="secondary">
            Read our company story
          </ButtonLink>
        </div>
      </PublicSection>
    </>
  );
}
