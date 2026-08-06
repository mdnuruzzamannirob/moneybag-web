import { Home, Search } from 'lucide-react';

import { PublicShell } from '@/components/public/PublicShell';
import { ButtonLink, DotPattern } from '@/components/public/public-ui';

export default function NotFound() {
  return (
    <PublicShell>
      <section className="relative isolate grid min-h-[70vh] place-items-center overflow-hidden border-b border-border px-4 py-24 text-center">
        <DotPattern className="opacity-65" />
        <div className="relative z-10 mx-auto max-w-2xl">
          <p className="text-8xl font-bold tracking-tighter text-primary/15 sm:text-9xl">404</p>
          <p className="mt-2 text-xs font-bold tracking-[0.22em] text-primary">PAGE NOT FOUND</p>
          <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
            This page slipped out of the budget
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            The link may be outdated, or the page may have moved. Let&apos;s get you back somewhere
            useful.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/">
              <Home className="size-4" /> Back home
            </ButtonLink>
            <ButtonLink href="/help-center" tone="secondary">
              <Search className="size-4" /> Visit help center
            </ButtonLink>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
