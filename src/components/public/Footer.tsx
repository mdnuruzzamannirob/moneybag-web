'use client';

import { AppButton } from '@/components/app-ui';
import { cn } from '@/lib/utils';
import { useTheme, type Theme } from '@/providers/theme-provider';
import { Code2, Laptop, Mail, Moon, Network, Sun } from 'lucide-react';
import Link from 'next/link';

import Logo from '../shared/Logo';

const columns = [
  {
    links: [
      ['Features', '/features'],
      ['Pricing', '/pricing'],
      // ['Integrations', '/integrations'], // Post-MVP
      // ['Changelog', '/changelog'], // Enable with real release data
    ],
    title: 'Product',
  },
  {
    links: [
      ['About', '/about'],
      ['Customers', '/customers'],
      ['Blog', '/blog'],
      // ['Careers', '/careers'], // Enable when hiring begins
    ],
    title: 'Company',
  },
  {
    links: [
      ['Help center', '/help-center'],
      ['FAQ', '/faq'],
      ['Security', '/security'],
      // ['System status', '/status'], // Enable with a verified status service
    ],
    title: 'Resources',
  },
  {
    links: [
      ['Terms', '/terms'],
      ['Privacy', '/privacy'],
      // ['Press kit', '/press'], // Enable when approved press assets are available
      ['Contact', '/contact'],
    ],
    title: 'Legal',
  },
] as const;

export function Footer() {
  const { setTheme, theme } = useTheme();

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-6 lg:px-8">
        <div className="sm:col-span-2">
          <Logo className="font-sans" href="/" />
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
            Your money, your control. Personal and family finance, beautifully simple.
          </p>
          <div className="mt-5 flex gap-2">
            <AppButton
              aria-label="Email MoneyBag"
              nativeButton={false}
              render={<a href="mailto:hello@moneybag.app" />}
              size="icon"
              tone="secondary"
            >
              <Mail className="size-4" />
            </AppButton>
            <AppButton
              aria-label="MoneyBag on GitHub"
              nativeButton={false}
              render={<a href="#" />}
              size="icon"
              tone="secondary"
            >
              <Code2 className="size-4" />
            </AppButton>
            <AppButton
              aria-label="MoneyBag on LinkedIn"
              nativeButton={false}
              render={<a href="#" />}
              size="icon"
              tone="secondary"
            >
              <Network className="size-4" />
            </AppButton>
          </div>
        </div>
        {columns.map((column) => (
          <FooterColumn key={column.title} links={column.links} title={column.title} />
        ))}
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© 2026 MoneyBag. All rights reserved.</p>
          <ThemeSelector onChange={setTheme} theme={theme} />
        </div>
      </div>
    </footer>
  );
}

const themeOptions = [
  { icon: Sun, label: 'Light', value: 'light' },
  { icon: Moon, label: 'Dark', value: 'dark' },
  { icon: Laptop, label: 'System', value: 'system' },
] as const satisfies readonly { icon: typeof Sun; label: string; value: Theme }[];

function ThemeSelector({ onChange, theme }: { onChange: (theme: Theme) => void; theme: Theme }) {
  return (
    <div
      aria-label="Theme preference"
      className="flex w-fit self-start items-center rounded-md border border-border bg-secondary p-0.5 sm:self-auto"
      role="group"
    >
      {themeOptions.map(({ icon: Icon, value }) => (
        <AppButton
          aria-pressed={theme === value}
          className={cn(
            'h-6! gap-1 px-1.5! text-[11px] rounded-md',
            theme === value &&
              'bg-primary! text-primary-foreground! shadow-xs hover:bg-primary-hover! hover:text-primary-foreground!',
          )}
          key={value}
          onClick={() => onChange(value)}
          size="xs"
          tone="ghost"
        >
          <Icon className="size-3" />
        </AppButton>
      ))}
    </div>
  );
}

function FooterColumn({
  links,
  title,
}: {
  links: readonly (readonly [string, string])[];
  title: string;
}) {
  return (
    <div>
      <h2 className="text-sm font-bold">{title}</h2>
      <ul className="mt-4 space-y-2.5 text-sm">
        {links.map(([label, href]) => (
          <li key={href}>
            <Link
              className="text-muted-foreground transition-colors hover:text-foreground"
              href={href}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
