import { Sparkles } from 'lucide-react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ChangelogFeed } from '@/components/public/changelog-feed';
import { PageHero, PublicSection, TextLink } from '@/components/public/public-ui';

export const metadata: Metadata = {
  title: 'Changelog',
  description: 'New MoneyBag features, product improvements, and fixes.',
};

export default function ChangelogPage() {
  // Disabled until this feed is backed by real MoneyBag release data.
  notFound();

  return (
    <>
      <PageHero
        description="New features, thoughtful improvements, and fixes that make managing money feel lighter."
        eyebrow="CHANGELOG"
        icon={<Sparkles className="size-3.5" />}
        title={
          <>
            What&apos;s new in <span className="text-brand-accent">MoneyBag</span>
          </>
        }
        tone="accent"
      />

      <PublicSection>
        <h2 className="sr-only">Product updates</h2>
        <div className="mx-auto max-w-4xl">
          <ChangelogFeed />
          <div className="mt-12 text-center">
            <TextLink href="/blog">Read the stories behind the product</TextLink>
          </div>
        </div>
      </PublicSection>
    </>
  );
}
