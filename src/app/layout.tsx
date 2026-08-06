import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/providers/theme-provider';
import type { Metadata } from 'next';
import { Ubuntu, Ubuntu_Sans } from 'next/font/google';
import './globals.css';

const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-ubuntu',
});

const ubuntuSans = Ubuntu_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: { default: 'MoneyBag | Personal and family finance', template: '%s | MoneyBag' },
  description: 'Track income, expenses, budgets, savings, and shared family finances.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn('h-full', 'antialiased', ubuntu.variable, ubuntuSans.variable, 'font-sans')}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
