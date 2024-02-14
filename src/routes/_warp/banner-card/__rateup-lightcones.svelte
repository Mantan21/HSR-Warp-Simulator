<script>
	import { t } from 'svelte-i18n';
	import { scale, fade } from '$lib/helpers/transition';
	import LightCones from '$lib/components/LightCones.svelte';

	export let lightcones = [];
	export let showCaption = false;
</script>

<div class="featured-lightcones">
	<div class="lightcones-list">
		{#each lightcones as { name, rarity }, i}
			<div in:scale={{ delay: 300 + i * 100, start: 2 }} class="lc-item lc{i + 1}">
				<LightCones item={name} size="small" />
			</div>
		{/each}
	</div>
	{#if showCaption}
		<div class="lightcones-info" in:fade={{ delay: 300 }}>
			<div class="lightcones-name">
				{$t('something-irreplaceable')}
				<span>{$t('etc')}</span>
			</div>
			<div class="stars">
				{#each Array(5) as _} <i class="hsr-star" /> {/each}
			</div>
		</div>
	{/if}
</div>

<style>
	.featured-lightcones {
		width: 100%;
		height: 100%;
		position: relative;
	}

	.lightcones-info {
		position: absolute;
		top: 49%;
		width: 100%;
		padding: 0 3%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.lightcones-name {
		background-color: rgba(0, 0, 0, 0.7);
		height: calc(0.052 * var(--bw));
		width: 100%;
		text-align: center;
		padding: 2% 12% 2% 2%;
		font-size: calc(0.018 * var(--bw));
		color: var(--color-text);
		position: relative;
		z-index: +2;
	}

	.lightcones-name span {
		position: absolute;
		right: 3%;
		bottom: 5%;
		font-size: calc(0.013 * var(--bw));
	}

	.lightcones-info .stars {
		background-color: rgba(0, 0, 0, 0.7);
		margin-top: 2%;
		padding: 0 2%;
		display: inline-flex;
		align-items: center;
		line-height: 0;
		height: calc(0.023 * var(--bw));
		font-size: calc(0.014 * var(--bw));
	}

	.lightcones-list {
		position: relative;
		width: 100%;
		height: 50%;
	}
	.lc-item {
		position: absolute;
		width: 70%;
	}

	.lc1 {
		left: 13%;
		top: -12%;
		transform: scale(0.65) rotate(9deg);
	}
	.lc2 {
		left: -12%;
		top: 10%;
		transform: scale(0.55) rotate(-15deg);
	}
	.lc3 {
		left: 40%;
		top: 20%;
		transform: scale(0.48) rotate(25deg);
	}
</style>
