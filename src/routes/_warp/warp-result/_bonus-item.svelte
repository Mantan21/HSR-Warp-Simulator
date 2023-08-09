<script>
	import { t } from 'svelte-i18n';
	import { fly } from '$lib/helpers/transition';
	import Icon from '$lib/components/Icon.svelte';

	export let name = '';
	export let eidolon = false;
	export let rarity = 4;

	export let type = 'embers';
	export let qty = 0;
</script>

<div class="bonus hideOnShot" in:fly={{ x: 100, duration: 400, delay: 700 }}>
	{#if eidolon}
		<div class="convert">{$t('converted')}</div>
		<div class="item eidolon star{rarity}">
			<div class="icon">
				<picture>
					<Icon type="eidolon{rarity}" style="width:70%" />
				</picture>
			</div>
			<div class="caption">
				<span> {$t('warp.eidolonBonus', { values: { charName: $t(name) } })}</span>
			</div>
		</div>
	{/if}

	{#if qty > 0}
		<div
			class="item undying star{type === 'embers' ? 4 : 5}"
			in:fly={{ x: 50, duration: 400, delay: 900 }}
		>
			<div class="icon">
				<picture>
					<Icon {type} style="width:70%" />
				</picture>
			</div>
			<div class="caption">
				<small> {$t('warp.bonusdrop')} </small>
				<span>
					{$t('warp.undyingBonus', { values: { undyingType: $t(`item.${type}`), qty } })}
				</span>
			</div>
		</div>
	{/if}
</div>

<style>
	.bonus {
		position: absolute;
		right: 0;
		bottom: 16%;
	}

	.convert {
		background-color: #282924;
		width: 25vw;
		min-width: 250px;
		padding: 1% 3%;
	}
	.item {
		background-color: #fff;
		width: 25vw;
		min-width: 250px;
		margin-bottom: 5vh;
		padding: 3%;
		display: flex;
		align-items: center;
		box-shadow: -0.3rem 0.2rem 0.5rem rgba(0, 0, 0, 0.3);
	}
	.item .icon {
		width: 18%;
	}

	picture {
		width: 100%;
		aspect-ratio: 1/1;
		display: flex;
		justify-content: center;
		align-items: center;
		border-top-right-radius: 1.2rem;
	}

	.star4 picture {
		background-image: linear-gradient(#3e3b66, #8858cc 80%);
	}
	.star5 picture {
		background-image: linear-gradient(#7a514f, #d0a050 80%);
	}

	.caption {
		color: #111;
		padding-left: 4%;
	}

	.caption small {
		font-size: 120%;
	}
	.caption span {
		display: block;
		font-size: 140%;
	}
</style>
