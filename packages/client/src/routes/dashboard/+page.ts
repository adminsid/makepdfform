
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  try {
    const res = await fetch('/api/forms');
    if (!res.ok) {
        if (res.status === 401) {
            // Can handle redirect here or letting layout handle it?
            // Layout usually handles global auth state, but data fetching might fail.
            return { forms: [] };
        }
        return { forms: [] };
    }
    const forms = await res.json();
    return { forms };
  } catch (e) {
    console.error('Failed to load forms', e);
    return { forms: [] };
  }
};
