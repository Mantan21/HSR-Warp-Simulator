<script>
	import { t } from 'svelte-i18n';
	import { localPity } from '$lib/helpers/dataAPI/api-localstorage';
	import { userCurrencies } from '$lib/helpers/shop-price';
	import Icon from '$lib/components/Icon.svelte';

	export let banner = '';
	export let dataLength = 0;

	let pity4, pity5, totalSpend;
	$: {
		pity5 = localPity.get(`pity5${banner}`);
		pity4 = localPity.get(`pity4${banner}`);
		totalSpend = userCurrencies.getTotalSpend(dataLength);
	}
</script>

<div class="cell">
	{$t('history.currentPity')} &nbsp;
	<span>
		<strong class="star5"> {pity5} </strong> &nbsp; - &nbsp;
		<strong class="star4"> {pity4} </strong>
	</span>
	<br />
	{$t('history.totalPull')}
	<span>
		<strong> {dataLength} </strong>
	</span>
</div>
<div class="cell">
	{$t('history.totalSpend')}
	<span class="jadeSpend">
		<strong style="position:relative">
			{dataLength * 160}
			<Icon type="stellarJade" />
		</strong>
	</span>
	<br />
	Est. <span> <strong> {totalSpend} </strong> </span>
</div>

<style>
	.star4 {
		color: #a256e1;
	}
	.star5 {
		color: #bd6932;
	}

	span {
		color: #dd7a00;
	}

	.jadeSpend strong {
		background-image: linear-gradient(#9160d9, #4b90ff);
		background-clip: text;
		text-fill-color: transparent;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-size: 180%;
		background-position: top;
	}

	.cell {
		width: 33.33333333333%;
		font-size: calc(0.014 * var(--content-width));
	}

	.cell :global(img) {
		width: 20px;
		position: absolute;
		right: 0;
		top: 0;
		border-radius: 100%;
		aspect-ratio: 1/1;
		border: 1px solid orange;
		transform: translate(125%, -20%);
	}

	@media screen and (max-width: 550px) {
		span {
			display: block;
			width: 100%;
		}
		.cell :global(img) {
			width: 15px;
		}
	}
</style>
