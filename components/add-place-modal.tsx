'use client';

import { useActionState, useState } from 'react';
import { submitPlace } from '@/app/actions';

const initialState = { ok: false, message: '' };

export function AddPlaceModal() {
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState(async (_state: typeof initialState, formData: FormData) => {
    const result = await submitPlace(formData);
    if (result.ok) {
      setOpen(false);
    }
    return result;
  }, initialState);

  return (
    <>
      <button className="btn-primary" onClick={() => setOpen(true)}>
        Add Place
      </button>

      {open && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal-card">
            <div className="modal-header">
              <h2>Submit a New Place</h2>
              <button onClick={() => setOpen(false)} className="btn-ghost">
                Close
              </button>
            </div>
            <form action={formAction} className="form-grid">
              <label>
                Company Name
                <input name="company_name" required />
              </label>
              <label>
                Category
                <input name="category" required />
              </label>
              <label>
                Phone Number
                <input name="phone_number" required />
              </label>
              <label>
                Exact Address
                <input name="exact_address" required />
              </label>
              <label>
                Latitude
                <input name="latitude" type="number" step="any" required />
              </label>
              <label>
                Longitude
                <input name="longitude" type="number" step="any" required />
              </label>
              <button disabled={pending} className="btn-primary" type="submit">
                {pending ? 'Sending...' : 'Submit for Moderation'}
              </button>
            </form>
          </div>
        </div>
      )}

      {state.message && (
        <p className={state.ok ? 'status-ok' : 'status-error'}>
          {state.message}
        </p>
      )}
    </>
  );
}
