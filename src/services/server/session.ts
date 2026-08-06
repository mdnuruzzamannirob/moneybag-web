import 'server-only';
import { cookies } from 'next/headers';
import type { UserProfile } from '@/types/user';

export async function getServerSessionToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('moneybag_session')?.value;
  return token || null;
}

export async function getServerSessionUser(): Promise<UserProfile | null> {
  const token = await getServerSessionToken();
  if (!token) return null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'}/auth/me`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
      },
    );

    if (!res.ok) return null;
    const data = (await res.json()) as { data?: UserProfile } | UserProfile;
    return 'data' in data && data.data ? data.data : (data as UserProfile);
  } catch {
    return null;
  }
}
