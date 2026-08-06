'use client';

import { ReduxProvider } from './redux-provider';
import { ThemeProvider } from './theme-provider';
import { ToastProvider } from './toast-provider';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <ThemeProvider>
        <ToastProvider>{children}</ToastProvider>
      </ThemeProvider>
    </ReduxProvider>
  );
}
