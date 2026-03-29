'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

function val(formData: FormData, key: string) {
  return String(formData.get(key) ?? '').trim();
}

export async function submitPlace(formData: FormData) {
  const supabase = await createClient();

  const payload = {
    company_name: val(formData, 'company_name'),
    category: val(formData, 'category'),
    phone_number: val(formData, 'phone_number'),
    exact_address: val(formData, 'exact_address'),
    latitude: Number(val(formData, 'latitude')),
    longitude: Number(val(formData, 'longitude')),
    status: 'pending',
    source_type: 'user',
  };

  const required = [
    payload.company_name,
    payload.category,
    payload.phone_number,
    payload.exact_address,
  ];

  if (required.some((field) => !field) || Number.isNaN(payload.latitude) || Number.isNaN(payload.longitude)) {
    return { ok: false, message: 'Please complete all fields with valid coordinates.' };
  }

  const { error } = await supabase.from('companies').insert(payload);

  if (error) {
    return { ok: false, message: error.message };
  }

  revalidatePath('/');
  revalidatePath('/admin');

  return {
    ok: true,
    message: 'Submission sent. Our team will review it before publishing.',
  };
}
