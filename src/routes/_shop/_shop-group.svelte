<script>
	import { isMobileLandscape } from '$lib/stores/app-store';
	import Scrollable from '$lib/components/Scrollable.svelte';

	let containerWidth;
	let itemBasis = 100 / 3;
	let itemWidth;

	const setitemBasis = (cwidth, mbl) => {
		if (mbl) {
			itemBasis = 100 / 5;
			itemWidth = cwidth / 5;
			return;
		}

		if (cwidth >= 900) {
			itemBasis = 100 / 6;
			itemWidth = cwidth / 6;
			return;
		}
		if (cwidth >= 650) {
			itemBasis = 100 / 5;
			itemWidth = cwidth / 5;
			return;
		}
		if (cwidth >= 500) {
			itemBasis = 100 / 4;
			itemWidth = cwidth / 4;
			return;
		}
		if (cwidth >= 350) {
			itemBasis = 100 / 3;
			itemWidth = cwidth / 3;
			return;
		}
		itemBasis = 100 / 2;
		itemWidth = cwidth / 2;
		return;
	};
	$: setitemBasis(containerWidth, $isMobileLandscape);
</script>

<Scrollable>
	<div
		class="group-content"
		bind:clientWidth={containerWidth}
		style="--item-basis:{itemBasis}%; --item-width:{itemWidth}px"
	>
		<slot />
	</div>
</Scrollable>

<style>
	.group-content {
		display: flex;
		width: 100%;
		flex-wrap: wrap;
	}
</style>
