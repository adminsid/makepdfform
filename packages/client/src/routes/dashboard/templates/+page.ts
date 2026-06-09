export const load = async ({ fetch }: { fetch: typeof window.fetch }) => {
  try {
    const res = await fetch('/api/forms');
    if (!res.ok) return { forms: [] };
    const forms = await res.json();
    return { forms };
  } catch {
    return { forms: [] };
  }
};
