
import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params, fetch }) => {
  const { id } = params;
  
  try {
    const res = await fetch(`/api/forms/${id}`);
    if (!res.ok) {
        throw error(res.status, 'Form not found');
    }
    const form = await res.json();
    return { form };
  } catch (e) {
    console.error('Failed to load form', e);
    throw error(404, 'Form not found');
  }
};
