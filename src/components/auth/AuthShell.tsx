import { Check } from 'lucide-react';
import type { ReactNode } from 'react';

import Logo from '../shared/Logo';

export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <main className="grid min-h-dvh bg-background lg:grid-cols-2">
      <section className="ui-gradient-cta-card relative hidden overflow-hidden p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/10" />
        <div className="absolute -bottom-40 -left-24 h-124 w-124 rounded-full bg-white/5" />

        <div className="relative z-10">
          <Logo className="mb-12" href="/" inverse />
          <h1 className="max-w-md text-4xl font-semibold tracking-normal">
            Take control of your money.
          </h1>
          <p className="mt-3 max-w-sm text-base leading-7 text-white/90">
            Track income, manage budgets, smash savings goals, and unlock rich reports - the modern
            personal finance manager built for everyone.
          </p>
        </div>

        <div className="relative z-10 space-y-3">
          {[
            'Track income, expenses & wallets',
            'Budgets, savings goals & alerts',
            'Interactive charts & PDF reports',
            'Family sharing (Pro) & OAuth 2.0',
          ].map((feature) => (
            <div className="flex items-center gap-3 text-sm" key={feature}>
              <span className="grid size-8 shrink-0 place-items-center rounded-md bg-white/20">
                <Check className="size-4" aria-hidden="true" />
              </span>
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <div className="relative z-10 flex gap-8">
          <AuthStat label="Active users" value="12K+" />
          <AuthStat label="Tracked monthly" value="$48M+" />
          <AuthStat label="User rating" value="4.8/5" />
        </div>
      </section>

      <section className="flex items-center justify-center px-4 py-8 sm:px-8">
        <div className="w-full max-w-105">
          <Logo className="mb-8" href="/" />
          {children}
        </div>
      </section>
    </main>
  );
}

function AuthStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-3xl font-medium tracking-normal">{value}</div>
      <div className="text-xs text-white/85">{label}</div>
    </div>
  );
}
