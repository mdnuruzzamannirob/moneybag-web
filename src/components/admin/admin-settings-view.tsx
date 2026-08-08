'use client';

import {
  AdminSettingsPanel,
  AdminSettingsSection,
  type AdminSettingsSectionName,
} from './admin-settings-panel';

export function AdminSettingsView({ section = 'general' }: { section?: AdminSettingsSectionName }) {
  return <AdminSettingsSection section={section} />;
}

export { AdminSettingsPanel, AdminSettingsSection };
