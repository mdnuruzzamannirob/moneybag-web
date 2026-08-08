export type UserRole = 'user' | 'admin' | 'superadmin';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  role: UserRole;
  isEmailVerified: boolean;
  twoFactorEnabled: boolean;
  currency: string;
  locale: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserSession {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
}
