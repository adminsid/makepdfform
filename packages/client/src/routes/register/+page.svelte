<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "$lib/components/ui/card/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Label } from "$lib/components/ui/label/index.js";
	import { Loader2 } from "lucide-svelte";
	import { signUp } from "$lib/auth-client.js";
	import { toast } from "svelte-sonner";
	import { goto } from "$app/navigation";

	let name = $state("");
	let email = $state("");
	let password = $state("");
    let passwordConfirmation = $state("");
	let loading = $state(false);
</script>

<div class="flex min-h-screen flex-col items-center justify-center p-4 bg-muted/30">
	<div class="mb-8 text-center">
		<h1 class="text-3xl font-bold tracking-tight">MakePDFForm</h1>
		<p class="text-muted-foreground mt-2">Get Started for Free</p>
	</div>
    <Card class="max-w-[400px] w-full shadow-lg border-2">
        <CardHeader class="space-y-1">
            <CardTitle class="text-2xl font-bold text-center">Create an account</CardTitle>
            <CardDescription class="text-center">
                Enter your details below to create your account
            </CardDescription>
        </CardHeader>
        <CardContent class="grid gap-4">
             <div class="grid gap-2">
                <Label for="name">Name</Label>
                <Input
                    id="name"
                    placeholder="Full Name"
                    required
                    bind:value={name}
                />
            </div>
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
            <div class="grid gap-2">
                <Label for="password_confirmation">Confirm Password</Label>
                <Input
                    id="password_confirmation"
                    type="password"
                    required
                    bind:value={passwordConfirmation}
                />
            </div>

            <Button
                type="submit"
                class="w-full mt-2"
                disabled={loading}
                onclick={async () => {
                    if (password !== passwordConfirmation) {
                        toast.error("Passwords do not match");
                        return;
                    }
                    await signUp.email({
                        email,
                        password,
                        name,
                        callbackURL: "/dashboard",
                        fetchOptions: {
                            onRequest: () => {
                                loading = true;
                            },
                            onResponse: () => {
                                loading = false;
                            },
                            onError: (ctx) => {
                                toast.error(ctx.error.message);
                            },
                            onSuccess: () => {
                                goto("/dashboard");
                            }
                        },
                    });
                }}
            >
                {#if loading}
                    <Loader2 size={16} class="animate-spin mr-2" />
                    Creating account...
                {:else}
                    Create account
                {/if}
            </Button>
            
             <div class="mt-4 text-center text-sm">
                Already have an account? <a href="/login" class="underline font-medium text-primary">Sign in</a>
            </div>
        </CardContent>
    </Card>
</div>
