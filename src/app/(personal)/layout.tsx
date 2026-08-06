import { PersonalDashboardShell } from '@/components/layout/PersonalDashboardShell';

export default function PersonalLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <PersonalDashboardShell>{children}</PersonalDashboardShell>;
}
