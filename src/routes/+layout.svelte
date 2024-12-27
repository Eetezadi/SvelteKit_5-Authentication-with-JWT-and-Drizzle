<script lang="ts">
	let { children } = $props();
</script>

<header>
	<h1>SvelteKit 5 JWT User Auth Demo</h1>
	<nav>
		<ul>
			<li><a href="/">Home</a></li>
			<li><a href="/admin">Admin Dashboard</a></li>
			<li><a href="/login">Login</a></li>
		</ul>
		<ul>
			<li><a href="/register">Register</a></li>
		</ul>
	</nav>
</header>

<main>
	{@render children()}
</main>
