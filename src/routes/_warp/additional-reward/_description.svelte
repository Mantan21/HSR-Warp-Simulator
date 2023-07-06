<script>
	import { t } from 'svelte-i18n';
	import Scrollable from '$lib/components/Scrollable.svelte';
	import { fade } from 'svelte/transition';

	export let charList;
	export let selected = '';
	export let combatType = '';
	export let readyToPick = false;

	$: characters = charList.map(({ name }) => $t(name)).join(', ');
</script>

<div class="description">
	<Scrollable visibility="hidden">
		{#if selected && combatType && readyToPick}
			<caption class="charinfo" in:fade={{ duration: 500 }}>
				<i class="hsr-{combatType} {combatType} icon-gradient" />
				<span>{$t(selected)}</span>
			</caption>
			<p in:fade={{ duration: 500 }}>
				{@html $t(`additionalReward.description.${selected}`)}
			</p>
		{:else}
			<caption class="strong">
				{@html $t('additionalReward.note')}
			</caption>
			<p>
				{$t('additionalReward.detail', { values: { characters } })}
			</p>
		{/if}
	</Scrollable>
</div>

<style>
	.description {
		padding: calc(0.01 * var(--wd)) calc(0.05 * var(--wd));
		text-align: center;
		font-size: calc(0.015 * var(--wd));
		height: calc(0.13 * var(--wd));
	}

	caption {
		display: block;
	}
	.strong {
		font-size: 110%;
		color: #000;
	}
	.strong :global(span),
	p :global(span) {
		color: orange;
	}

	.charinfo {
		background-color: rgba(0, 0, 0, 0.8);
		height: calc(0.0235 * var(--wd));
		width: 40%;
		margin: calc(0.01 * var(--wd)) auto;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 5rem;
	}
	.charinfo i {
		padding: 0 calc(0.01 * var(--wd));
		font-size: calc(0.027 * var(--wd));
	}
	.charinfo span {
		display: block;
		padding-right: calc(0.01 * var(--wd));
		font-size: calc(0.015 * var(--wd));
		color: #fff;
	}

	.description p {
		opacity: 0.5;
	}

	.charinfo + p {
		opacity: 1;
	}
</style>
