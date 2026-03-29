'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export async function signInAdmin(formData: FormData) {
  const supabase = await createClient();

  const email = String(formData.get('email') ?? '').trim();
  const password = String(formData.get('password') ?? '').trim();

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { ok: false, message: 'Invalid credentials. Please try again.' };
  }

  redirect('/admin');
}

export async function signOutAdmin() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/admin/login');
}

export async function approveSubmission(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get('id'));

  await supabase.from('companies').update({ status: 'approved' }).eq('id', id);

  revalidatePath('/');
  revalidatePath('/admin');
}

export async function rejectSubmission(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get('id'));

  await supabase.from('companies').update({ status: 'rejected' }).eq('id', id);

  revalidatePath('/');
  revalidatePath('/admin');
}
