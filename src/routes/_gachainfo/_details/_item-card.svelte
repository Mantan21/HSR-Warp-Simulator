<script>
	import { t } from 'svelte-i18n';
	import { assets } from '$lib/stores/app-store';
	import LightCones from '$lib/components/LightCones.svelte';
	import Path from '$lib/components/Path.svelte';

	export let rarity;
	export let name;
	export let combat_type = null;
	export let path;
	export let rateup = true;
</script>

<div class="card star{rarity}" class:rateup>
	<div class="wrapper">
		<div class="path">
			<Path {path} />
		</div>
		{#if combat_type}
			<picture class="item-pic">
				<img src={$assets[`closeup/${name}`]} alt={$t(name)} crossorigin="anonymous" />
			</picture>
		{:else}
			<div class="item-pic lightcone">
				<LightCones item={name} size="small" />
			</div>
		{/if}

		<div class="icon">
			<i class="hsr-{combat_type} {combat_type} icon-gradient" />
		</div>
		<caption> {$t(name)} </caption>
	</div>
</div>

<style>
	.card {
		width: 100%;
		padding: 1.5%;
	}
	.wrapper {
		width: 100%;
		aspect-ratio: 368/88;
		position: relative;
		overflow: hidden;
	}
	.star5 .wrapper {
		background-image: linear-gradient(to right, #a7785e, #cda46e);
	}
	.star4 .wrapper {
		background-image: linear-gradient(to right, #41497b, #a36ad9);
	}

	.path,
	.item-pic,
	.icon,
	caption {
		position: absolute;
	}

	.path {
		width: 35%;
		opacity: 0.25;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
	}

	picture {
		top: -50%;
		right: 0;
		width: 55%;
		mask-image: linear-gradient(to right, transparent, black 30%);
	}

	.lightcone {
		width: 22.5%;
		right: 10%;
		top: 20%;
		transform: rotate(13deg);
	}

	picture img {
		width: 100%;
	}

	.icon {
		top: 1%;
		left: 1%;
		aspect-ratio: 1/1;
		background-color: rgba(0, 0, 0, 0.5);
		border-radius: 100%;
		display: block;
		line-height: 0;
		font-size: calc(0.02 * var(--width));
	}

	caption {
		width: 65%;
		background-image: linear-gradient(to right, rgba(0, 0, 0, 0.7) 50%, transparent);
		color: #fff;
		bottom: 0;
		left: 0;
		display: block;
		text-align: left;
		padding: 1.5% 5%;
		font-size: calc(0.02 * var(--width));
	}
</style>
