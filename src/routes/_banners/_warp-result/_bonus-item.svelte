<script>
	import Icon from '$lib/components/Icon.svelte';
	import { fly } from '$lib/helpers/transition';

	export let eidolon = false;
	export let rarity = 4;

	export let type = 'embers';
	export let qty = 0;
</script>

<div class="bonus" in:fly={{ x: 100, duration: 400, delay: 800 }}>
	{#if eidolon}
		<div class="convert">Converted to</div>
		<div class="item eidolon star{rarity}">
			<div class="icon">
				<picture>
					<Icon type="eidolon{rarity}" style="width:70%" />
				</picture>
			</div>
			<div class="caption">
				<span> Herta's Eidolon x1</span>
			</div>
		</div>
	{/if}

	<div class="item undying star{type === 'embers' ? 4 : 5}">
		<div class="icon">
			<picture>
				<Icon {type} style="width:70%" />
			</picture>
		</div>
		<div class="caption">
			<small> Bonus drop: </small>
			<span> Undying {type} x{qty}</span>
		</div>
	</div>
</div>

<style>
	.bonus {
		position: absolute;
		right: 0;
		bottom: 0;
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
