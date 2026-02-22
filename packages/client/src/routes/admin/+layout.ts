import { redirect } from '@sveltejs/kit';
import { authClient } from '$lib/auth-client';

export const load: any = async () => {
    try {
        const { data: session } = await authClient.getSession();

        if (!session?.user) {
            throw redirect(302, '/login');
        }

        // @ts-ignore - Better auth custom fields typing might be missing
        if (session.user.role !== 'admin') {
            throw redirect(302, '/dashboard');
        }

        return { session };
    } catch (e: any) {
        if (e.status === 302) throw e;
        throw redirect(302, '/login');
    }
};
