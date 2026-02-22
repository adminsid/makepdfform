<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "$lib/components/ui/card/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Label } from "$lib/components/ui/label/index.js";
	import { Checkbox } from "$lib/components/ui/checkbox/index.js";
	import { Loader2 } from "lucide-svelte";
	import { signIn } from "$lib/auth-client.js";
	import { cn } from "$lib/utils.js";
	import { toast } from "svelte-sonner";

	let email = $state("");
	let password = $state("");
	let loading = $state(false);
	// Removed rememberMe for simplicity/MVP focus
</script>

<div class="flex min-h-screen flex-col items-center justify-center p-4 bg-muted/30">
	<div class="mb-8 text-center">
		<h1 class="text-3xl font-bold tracking-tight">MakePDFForm</h1>
		<p class="text-muted-foreground mt-2">Professional PDF Forms</p>
	</div>
    <Card class="max-w-[400px] w-full shadow-lg border-2">
        <CardHeader class="space-y-1">
            <CardTitle class="text-2xl font-bold text-center">Sign In</CardTitle>
            <CardDescription class="text-center">
                Enter your email regarding your account
            </CardDescription>
        </CardHeader>
        <CardContent class="grid gap-4">
            <div class="grid gap-2">
                <Label for="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    bind:value={email}
                />
            </div>
            <div class="grid gap-2">
                <Label for="password">Password</Label>
                <Input
                    id="password"
                    type="password"
                    required
                    bind:value={password}
                />
            </div>
			<div class="flex items-center justify-between">
				<div class="text-sm">
					<a href="/register" class="font-medium text-primary hover:underline">
						Don't have an account?
					</a>
				</div>
                <button type="button" class="text-sm text-muted-foreground hover:underline">
                    Forgot password?
                </button>
			</div>
            <Button
                type="submit"
                class="w-full mt-2"
                disabled={loading}
                onclick={async () => {
                    await signIn.email({
                        email,
                        password,
                        fetchOptions: {
                            onRequest: () => {
                                loading = true;
                            },
                            onResponse: () => {
                                loading = false;
                            },
                            onError: (ctx) => {
                                toast.error(ctx.error.message);
                            }
                        },
                    });
                }}
            >
                {#if loading}
                    <Loader2 size={16} class="animate-spin mr-2" />
                    Signing in...
                {:else}
                    Sign In
                {/if}
            </Button>
            
            <div class="relative">
                <div class="absolute inset-0 flex items-center">
                    <span class="w-full border-t"></span>
                </div>
                <div class="relative flex justify-center text-xs uppercase">
                    <span class="bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
                <Button variant="outline" disabled={loading} onclick={async () => {
                    await signIn.social({
                        provider: "github",
                        callbackURL: "/dashboard"
                    });
                }}>
                    <svg role="img" viewBox="0 0 24 24" class="mr-2 h-4 w-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.419-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                    GitHub
                </Button>
                <Button variant="outline" disabled={loading} onclick={async () => {
                     await signIn.social({
                        provider: "google",
                        callbackURL: "/dashboard"
                    });
                }}>
                   <svg role="img" viewBox="0 0 24 24" class="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg"><title>Google</title><path fill="#EA4335" d="M24 12.276c0-.887-.066-1.762-.225-2.608H12v4.938h6.736c-.288 1.553-1.163 2.91-2.458 3.791v3.138h3.938C22.565 19.347 24 16.035 24 12.276z" /><path fill="#34A853" d="M12 24c3.24 0 5.957-1.074 7.965-2.915l-3.938-3.138c-1.087.729-2.484 1.15-4.027 1.15-3.134 0-5.787-2.115-6.736-4.943H1.275v3.138C3.257 21.05 7.327 24 12 24z" /><path fill="#FBBC05" d="M5.264 14.154c-.254-.741-.397-1.533-.397-2.354s.143-1.613.397-2.354V6.308H1.275a11.97 11.97 0 0 0 0 9.384l3.989-3.138z" /><path fill="#4285F4" d="M12 4.75c1.77 0 3.357.608 4.608 1.802l3.432-3.419C17.954 1.205 15.237 0 12 0 7.327 0 3.257 2.95 1.275 6.308l3.989 3.138C6.213 6.64 8.866 4.75 12 4.75z" /></svg>
                   Google
                </Button>
            </div>
        </CardContent>
    </Card>
</div>
