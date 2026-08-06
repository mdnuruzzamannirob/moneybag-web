import { PublicShell } from '@/components/layout/PublicShell';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <PublicShell>{children}</PublicShell>;
}
