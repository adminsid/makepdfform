import { createAuthClient } from "better-auth/svelte";
// import { PUBLIC_APP_URL } from "$env/static/public"; // Removing static import to avoid build error
import { env } from '$env/dynamic/public'; // Use dynamic if needed, or just fallback
import { passkeyClient } from "@better-auth/passkey/client";
import { polarClient } from "@polar-sh/better-auth/client";

export const authClient = createAuthClient({
    baseURL: env.PUBLIC_APP_URL || (typeof window !== "undefined" ? window.location.origin + "/api/auth" : "http://localhost:8787/api/auth"),
    plugins: [passkeyClient(), polarClient()],
});

export const { signIn, signOut, signUp, useSession } = authClient;
