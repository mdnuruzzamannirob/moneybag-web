import { AdminProfileNavigation } from '@/components/admin/admin-profile-navigation';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-w-0">
      <div className="mb-6 sm:mb-7">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Admin profile
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Manage your administrator identity and account security.
        </p>
      </div>
      <div className="grid min-w-0 gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="min-w-0 lg:sticky lg:top-22 lg:self-start">
          <AdminProfileNavigation />
        </aside>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
