<script>
	import { getContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import { t } from 'svelte-i18n';
	import { bannerList } from '$lib/stores/app-store';
	import { playSfx } from '$lib/helpers/sounds/audiofx';

	export let banner;

	let showSelectList = false;

	$: list = $bannerList.filter((item, i, arr) => i === arr.findIndex((v) => v.type === item.type));
	//  check if beginner banner already gone, push it to hostory list
	$: if (list.findIndex(({ type }) => type === 'starter') < 0) list.unshift({ type: 'starter' });
	$: nowOpenIndex = list.findIndex(({ type }) => type === banner.toLocaleLowerCase());
	$: selected = nowOpenIndex < 0 ? 2 : nowOpenIndex;

	const selectBanner = getContext('selectBanner');
	const select = (bn) => {
		showSelectList = !showSelectList;
		playSfx('click2');
		selectBanner(bn);
	};

	const bn = (type) => {
		return ['lightcone', 'character'].includes(type) ? `${type}-event` : type;
	};
</script>

<div class="selectType">
	<button
		class="selected"
		on:click={() => {
			showSelectList = !showSelectList;
			playSfx('click2');
		}}
	>
		{@html $t(`banner.${bn(banner)}`)}
		<i class="hsr-caret-{showSelectList ? 'up' : 'down'}" />
	</button>

	{#if showSelectList}
		<div class="select-list" transition:fade={{ duration: 200 }}>
			{#each list as { type }, i}
				<button
					class="item"
					class:active={selected === i}
					on:click|preventDefault={() => select(type)}
				>
					<span>
						{@html $t(`banner.${bn(type)}`)}
					</span>
				</button>
			{/each}
		</div>
	{/if}
</div>

<style>
	.selected {
		width: 100%;
		padding: 0.8% 0;
		font-size: calc(0.02 * var(--width));
		border-bottom: 0.15rem solid #ddd;
		text-align: left;
	}
	.selectType {
		width: 100%;
		display: flex;
		align-items: center;
		position: relative;
	}

	button span {
		color: #000;
	}

	.selected i {
		position: absolute;
		top: 50%;
		right: 1rem;
		line-height: 0;
		transform: translate(-50%, -50%) scale(1.3);
	}

	.select-list {
		background-color: #fff;
		width: 100%;
		top: 110%;
		position: absolute;
		box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.5);
		display: flex;
		flex-direction: column;
		z-index: +2;
	}

	.select-list button {
		padding: 0.2% 1%;
		text-align: left;
		position: relative;
		transition: all 0.2s;
	}
	.select-list span {
		padding: 0.8rem 1.5rem 0.8rem 0.5rem;
		display: block;
		width: 100%;
		border-bottom: 1px solid rgba(0, 0, 0, 0.2);
		transition: all 0.2s;
	}
	.select-list button:last-child span {
		border: none;
	}

	.select-list button:hover {
		box-shadow: 0 0 0.3rem #000;
	}
	.select-list button:hover span {
		border-color: transparent;
	}

	.select-list button::after {
		content: '';
		width: 1rem;
		aspect-ratio: 1/1;
		border-radius: 100%;
		position: absolute;
		top: 50%;
		right: 1rem;
		transform: translate(-50%, -50%);
		outline: 0.1rem solid #aaa;
		transition: all 0.2s;
	}

	.select-list button.active::after {
		width: 0.6rem;
		background-color: orange;
		border: 0.2rem solid white;
		outline: 0.2rem solid orange;
	}
</style>
