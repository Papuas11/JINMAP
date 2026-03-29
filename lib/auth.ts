'use client';

const ADMIN_KEY = 'jinja_maps_admin_logged_in';

export function getAdminCreds() {
  return {
    email: process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? 'admin@jinjamaps.local',
    password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? 'changeme123',
  };
}

export const adminAuth = {
  isLoggedIn() {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(ADMIN_KEY) === 'true';
  },
  login(email: string, password: string) {
    const creds = getAdminCreds();
    const valid = email === creds.email && password === creds.password;
    if (valid && typeof window !== 'undefined') {
      localStorage.setItem(ADMIN_KEY, 'true');
    }
    return valid;
  },
  logout() {
    if (typeof window !== 'undefined') localStorage.removeItem(ADMIN_KEY);
  },
};
