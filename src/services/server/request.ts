import 'server-only';
import { getServerSessionToken } from './session';

export async function serverFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const token = await getServerSessionToken();
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

  const headers = new Headers(init?.headers);
  if (token && !headers.has('authorization')) {
    headers.set('authorization', `Bearer ${token}`);
  }
  if (!headers.has('content-type')) {
    headers.set('content-type', 'application/json');
  }

  const response = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || `Server request failed with status ${response.status}`);
  }

  return response.json();
}
