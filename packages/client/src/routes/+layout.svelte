<script lang="ts">
	import '../app.css';
	import { setContext } from 'svelte';
	import { page } from '$app/stores';

	let { children, data } = $props();
	
	// Create a reactive session store or just pass it down
	// Using Svelte 5 runes, we can just use the data prop directly in children if passed, 
	// but context is better for deep access.
	
	// Simple global state for current user
	class UserState {
		session = $state<any>(null);
		constructor(d: any) {
			this.session = d.session;
		}
		update(d: any) {
			this.session = d.session;
		}
	}
	
	const userState = new UserState(data);
	
	// Keep it updated if data changes (e.g. after invalidation)
	$effect(() => {
		userState.update(data);
	});

	import { Toaster } from "svelte-sonner";

	setContext('user', userState);
</script>

<div class="app">
	{@render children()}
	<Toaster />
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
</style>
