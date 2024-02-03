<script>
	import { t } from 'svelte-i18n';
	import { fly } from '$lib/helpers/transition';
	import { assets } from '$lib/stores/app-store';
	import Path from '$lib/components/Path.svelte';

	export let name;
	export let path;
	export let combatType;
	export let rarity;
	export let isNew = false;
	export let animate = false;

	const customFly = (node, args) => {
		if (!args?.animate) return;
		return fly(node, args);
	};
</script>

<div class="info">
	<div class="info-wrapper" in:customFly={{ animate, x: 70, delay: 600, duration: 400 }}>
		<div class="row">
			<div class="left" class:lightcone={!combatType}>
				{#if !combatType}
					<span class="lightcone-path">
						<Path {path} />
					</span>
				{:else}
					<img src={$assets[`combat-${combatType}.webp`]} alt={combatType} />
				{/if}
			</div>
			<div class="right">
				<div class="item-type">
					{#if !combatType}
						<span>{$t('lightcone')} </span> <small>Lightcone</small>
					{:else}
						<span>{$t('character')} </span> <small>Character</small>
					{/if}
				</div>
				<div class="name">{$t(name)}</div>
				<div class="rarity">
					{#each Array(rarity) as _}
						<i class="hsr-star" />
					{/each}
				</div>

				{#if isNew}
					<div class="new">
						<span>
							{$t('new')}
							<i class="hsr-star" />
						</span>
					</div>
				{/if}

				{#if combatType}
					<div class="path">
						<i class="hsr-{path}" />
						<span>{$t(`path.the-${path}`)}</span>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	.info {
		width: 30%;
		position: absolute;
		top: 53%;
		left: 8%;
	}

	.info-wrapper {
		width: 100%;
		padding: 0 calc(0.025 * var(--screen-width));
		transform: translateY(-50%);
		background-image: linear-gradient(
			to right,
			rgba(0, 0, 0, 0),
			rgba(0, 0, 0, 0.5) 15%,
			rgba(0, 0, 0, 0.5) 85%,
			rgba(0, 0, 0, 0)
		);
	}

	.row {
		width: 100%;
		display: flex;
		align-items: center;
	}

	.row .left {
		min-width: calc(0.055 * var(--screen-width));
		/* font-size: calc(0.045 * var(--screen-width)); */
		line-height: 0;
		padding: 2% 0;
		position: relative;
	}

	.row .left img {
		width: 90%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.lightcone {
		width: calc(0.055 * var(--screen-width));
	}
	.lightcone-path {
		width: 100%;
		display: block;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.row .right {
		position: relative;
		padding-left: 3%;
		max-width: 70%;
		min-height: calc(0.055 * var(--screen-width));
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.item-type {
		position: absolute;
		left: 5%;
		top: 0;
		transform: translateY(-125%);
		background-color: rgba(255, 255, 255, 0.9);
		color: #1b1b1b;
		padding: calc(0.0015 * var(--screen-width)) calc(0.005 * var(--screen-width));
		white-space: nowrap;
		font-size: calc(0.01 * var(--screen-width));
	}
	.item-type small {
		font-family: var(--hsr-neue);
		font-size: calc(0.0075 * var(--screen-width));
	}

	.name {
		font-size: calc(0.02 * var(--screen-width));
		padding-bottom: calc(0.001 * var(--screen-width));
	}

	.rarity i {
		font-size: calc(0.011 * var(--screen-width));
		margin-right: -1.5%;
		line-height: 0;
	}

	.new {
		display: inline-block;
		border-radius: 5rem;
		font-size: calc(0.01 * var(--screen-width));
		position: absolute;
		top: 0;
		right: 0;
		transform: translate(150%, 50%);
		background-color: #442818;
		color: #fee28b;
		text-shadow: 0 0 1rem rgb(253, 248, 176);
		box-shadow: 0 0 0.5rem rgb(255, 209, 81);
		border-top: calc(0.0015 * var(--screen-width)) dotted #ffd34f;
		border-bottom: calc(0.002 * var(--screen-width)) solid #ffd34f;
		border-right: calc(0.0015 * var(--screen-width)) dashed #ffd34f;
		border-left: calc(0.0015 * var(--screen-width)) dashed #ffd34f;
		padding: calc(0.001 * var(--screen-width)) calc(0.007 * var(--screen-width));
	}

	.new .hsr-star {
		position: absolute;
		top: 0;
		right: 0;
		transform: translate(50%, -30%);
	}

	.path {
		position: absolute;
		left: 3%;
		background-color: #1b1b1b;
		bottom: 0;
		font-size: calc(0.0125 * var(--screen-width));
		color: #ddd;
		padding: 0 2%;
		display: flex;
		align-items: center;
		transform: translateY(120%);
	}
	.path span {
		width: fit-content;
		display: block;
		padding-left: 5%;
		padding-right: 1rem;
		white-space: nowrap;
	}

	.path i {
		line-height: 0;
		font-size: calc(0.016 * var(--screen-width));
	}
</style>
