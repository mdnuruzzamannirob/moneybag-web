import { SettingsNavigation } from '@/components/personal/settings-navigation';
import { AppPageHeader } from '@/components/app-ui';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-w-0">
      <div className="mb-7">
        <AppPageHeader description="Manage your account and preferences." title="Settings" />
      </div>
      <div className="grid min-w-0 gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="min-w-0 lg:sticky lg:top-22 lg:self-start">
          <SettingsNavigation />
        </aside>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
