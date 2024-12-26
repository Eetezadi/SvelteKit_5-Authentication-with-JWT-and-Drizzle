<script lang="ts">
	let { data } = $props();
	const user = data.user;
</script>
<h2>Main Menu</h2>
{#if data?.user}
	<h3>Logged in as user: {user?.username} ({user?.email})</h3>
	<form method="POST" action="?/logout">
		<button type="submit">Log Out</button>
	</form>
{:else}
Try to access the admin area, register and login. 
{/if}
