<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle,
	} from "$lib/components/ui/card/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Label } from "$lib/components/ui/label/index.js";
	import { Loader2, X } from "lucide-svelte";
	import { signUp } from "$lib/auth-client.js";
	import { toast } from "svelte-sonner";
	import { goto } from "$app/navigation";

	let firstName = $state("");
	let lastName = $state("");
	let email = $state("");
	let password = $state("");
	let passwordConfirmation = $state("");
	let image = $state<File | null>(null);
	let imagePreview = $state<string | null>(null);
	let loading = $state(false);

	async function convertImageToBase64(file: File): Promise<string> {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onloadend = () => resolve(reader.result as string);
			reader.onerror = reject;
			reader.readAsDataURL(file);
		});
	}

	const handleImageChange = (e: Event) => {
		const file = (e.target as HTMLInputElement)?.files?.[0];
		if (file) {
			image = file;
			const reader = new FileReader();
			reader.onloadend = () => {
				imagePreview = reader.result as string;
			};
			reader.readAsDataURL(file);
		}
	};
</script>

<div class="flex min-h-screen items-center justify-center p-4">
    <Card class="z-50 rounded-md max-w-md w-full">
        <CardHeader>
            <CardTitle class="text-lg md:text-xl">Sign Up</CardTitle>
            <CardDescription class="text-xs md:text-sm">
                Enter your information to create an account
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div class="grid gap-4">
                <div class="grid grid-cols-2 gap-4">
                    <div class="grid gap-2">
                        <Label for="first-name">First Name</Label>
                        <Input
                            id="first-name"
                            placeholder="Max"
                            required
                            bind:value={firstName}
                        />
                    </div>
                    <div class="grid gap-2">
                        <Label for="last-name">Last Name</Label>
                        <Input
                            id="last-name"
                            placeholder="Robinson"
                            required
                            bind:value={lastName}
                        />
                    </div>
                </div>
                <div class="grid gap-2">
                    <Label for="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        bind:value={email}
                    />
                </div>
                <div class="grid gap-2">
                    <Label for="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="Password"
                        autocomplete="new-password"
                        bind:value={password}
                    />
                </div>
                <div class="grid gap-2">
                    <Label for="password_confirmation">Confirm Password</Label>
                    <Input
                        id="password_confirmation"
                        type="password"
                        placeholder="Confirm Password"
                        autocomplete="new-password"
                        bind:value={passwordConfirmation}
                    />
                </div>
                <div class="grid gap-2">
                    <Label for="image">Profile Image (optional)</Label>
                    <div class="flex items-end gap-4">
                        {#if imagePreview}
                            <div class="relative w-16 h-16 rounded-sm overflow-hidden">
                                <img
                                    src={imagePreview}
                                    alt="Profile preview"
                                    class="object-cover w-full h-full"
                                />
                            </div>
                        {/if}
                        <div class="flex items-center gap-2 w-full">
                            <Input
                                id="image"
                                type="file"
                                accept="image/*"
                                onchange={handleImageChange}
                                class="w-full"
                            />
                            {#if imagePreview}
                                <X
                                    class="cursor-pointer"
                                    onclick={() => {
                                        image = null;
                                        imagePreview = null;
                                    }}
                                />
                            {/if}
                        </div>
                    </div>
                </div>
                <Button
                    type="submit"
                    class="w-full"
                    disabled={loading}
                    onclick={async () => {
                        await signUp.email({
                            email,
                            password,
                            name: `${firstName} ${lastName}`,
                            image: image ? await convertImageToBase64(image) : "",
                            callbackURL: "/dashboard",
                            fetchOptions: {
                                onResponse: () => {
                                    loading = false;
                                },
                                onRequest: () => {
                                    loading = true;
                                },
                                onError: (ctx) => {
                                    toast.error(ctx.error.message);
                                },
                                onSuccess: () => {
                                    goto("/dashboard");
                                },
                            },
                        });
                    }}
                >
                    {#if loading}
                        <Loader2 size={16} class="animate-spin" />
                    {:else}
                        <span>Create your Account</span>
                    {/if}
                </Button>
                <div class="mt-4 text-center text-sm">
                    Already have an account? <a href="/login" class="underline">Login</a>
                </div>
            </div>
        </CardContent>
    </Card>
</div>
