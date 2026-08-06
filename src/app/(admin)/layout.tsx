import { AdminDashboardShell } from '@/components/shared/layout/AdminDashboardShell';

export default function AdminRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <AdminDashboardShell>{children}</AdminDashboardShell>;
}
