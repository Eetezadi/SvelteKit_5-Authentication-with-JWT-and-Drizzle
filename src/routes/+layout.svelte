<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { LayoutData } from './$types';

    let { data, children }: { data: LayoutData, children: Snippet } = $props();
</script>

<h1>SvelteKit 5 JWT User Auth Demo</h1>

<a href="/">Main Menu</a>
<a href="/admin">Admin Dashboard</a>
<a href="/login">Login</a>
<a href="/register">Register</a>

{@render children()}