'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Footer } from './Footer';
import SiteHeader from './Header';

const authRoutes = [
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/verify-email',
  '/2fa',
  '/callback',
  '/error',
];

export function PublicShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  if (authRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`)))
    return children;

  return (
    <div className="flex min-h-dvh flex-col overflow-x-clip bg-background">
      <SiteHeader pathname={pathname} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
