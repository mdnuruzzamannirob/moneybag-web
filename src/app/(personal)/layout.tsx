import { PersonalDashboardShell } from '@/components/shared/layout/PersonalDashboardShell';

export default function PersonalLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <PersonalDashboardShell>{children}</PersonalDashboardShell>;
}
