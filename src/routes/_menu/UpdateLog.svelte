<script>
	import { fade } from 'svelte/transition';
	import { logs } from '$lib/data/logs.json';
	import Scrollable from '$lib/components/Scrollable.svelte';
</script>

<div class="log-update" in:fade={{ duration: 250 }}>
	<div class="container">
		<Scrollable dark>
			{#each [...logs].reverse() as { changes, date }, i}
				<div class="item">
					<h2>
						<i class="date">{date}</i>
						{#if i === 0}
							( Latest Update )
						{/if}
					</h2>
					{#each changes as change}
						<p>{@html change}</p>
					{/each}
				</div>
			{/each}
		</Scrollable>
	</div>
</div>

<style>
	.log-update {
		background-color: rgba(255, 255, 255, 0.85);
		width: 100%;
		height: 100%;
		border-top-right-radius: 2rem;
		color: #000;
		padding: 2%;
	}
	.container {
		width: 100%;
		height: 100%;
		mask-image: linear-gradient(to bottom, black 95%, transparent 100%);
	}

	.item {
		padding: 1.2% 0;
		position: relative;
		border-bottom: 1px solid #ccc;
	}

	.item:first-child {
		padding-top: 0;
	}

	.item:last-child {
		border-bottom: none;
	}

	p {
		position: relative;
		padding-left: 2rem;
	}
	p::before {
		content: '';
		display: inline-block;
		line-height: 0;
		position: absolute;
		left: 0.5rem;
		top: 50%;
		transform: translateY(-50%);
		width: 1rem;
		border-bottom: 0.1rem solid #000;
	}

	h2 {
		font-weight: bold;
		color: rgb(189, 123, 0);
		font-size: 110%;
		padding: 0.08rem 0;
	}
</style>
