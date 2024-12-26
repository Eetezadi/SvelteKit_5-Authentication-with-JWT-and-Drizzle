<script lang="ts">
	let { data } = $props();
</script>

<h1>SvelteKit 5 JWT User Auth Demo</h1>

{#if data?.user}
	<h1>Logged in as user: {data?.user?.email}</h1>
	<form method="POST" action="?/logout">
		<button type="submit">Log Out</button>
	</form>
{:else}
	<a href="/login">Login</a>
	<a href="/register">Register</a>
{/if}
