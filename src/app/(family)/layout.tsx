import { FamilyDashboardShell } from '@/components/shared/layout/FamilyDashboardShell';

export default function FamilyRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <FamilyDashboardShell>{children}</FamilyDashboardShell>;
}
