import { FamilyDashboardShell } from '@/components/layout/FamilyDashboardShell';

export default function FamilyRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <FamilyDashboardShell>{children}</FamilyDashboardShell>;
}
