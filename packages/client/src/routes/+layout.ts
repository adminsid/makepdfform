export const ssr = false;
export const prerender = false;

import type { LayoutLoad } from './$types';

import { authClient } from '$lib/auth-client';

export const load: LayoutLoad = async ({ fetch }) => {
  try {
    const { data: session } = await authClient.getSession({
      fetchOptions: {
        headers: {
          // If needed, but authClient handles credentials usually
        }
      }
    });
    return { session };
  } catch (e) {
    return { session: null };
  }
};
