'use client';

import { useActionState } from 'react';
import { signInAdmin } from '@/app/admin/actions';

const initialState = { ok: false, message: '' };

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(async (_state: typeof initialState, formData: FormData) => {
    const result = await signInAdmin(formData);
    return result ?? initialState;
  }, initialState);

  return (
    <main className="auth-page">
      <form action={formAction} className="auth-card">
        <h1>Admin Login</h1>
        <label>
          Email
          <input name="email" type="email" required />
        </label>
        <label>
          Password
          <input name="password" type="password" required />
        </label>
        <button className="btn-primary" disabled={pending} type="submit">
          {pending ? 'Signing in...' : 'Sign In'}
        </button>
        {state.message && <p className="status-error">{state.message}</p>}
      </form>
    </main>
  );
}
