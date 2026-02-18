import { createAuthClient } from "better-auth/svelte";
import { PUBLIC_APP_URL } from "$env/static/public";
import { passkeyClient } from "@better-auth/passkey/client";

export const authClient = createAuthClient({
    baseURL: PUBLIC_APP_URL,
    plugins: [passkeyClient()],
});

export const { signIn, signOut, signUp, useSession } = authClient;
