<script>
	import { getContext } from 'svelte';
	import { t } from 'svelte-i18n';
	import { playSfx } from '$lib/helpers/sounds/audiofx';

	let width;

	const navigate = getContext('navigate');
	const goto = (page) => {
		navigate(page);
		playSfx('click');
	};
</script>

<button
	class="shop-button"
	bind:clientWidth={width}
	style="--width: {width}px"
	on:click={() => goto('shop')}
>
	<div class="wrapper">
		<svg xml:space="preserve" viewBox="0 0 590.28 564.49">
			<g id="Layer_x0020_1">
				<path
					class="circle-outline"
					d="M298.41 0c136.96,0 251.09,97.57 276.79,226.98 -0.29,-0.01 -0.58,-0.02 -0.87,-0.02 -2.69,0 -5.28,0.43 -7.7,1.22 -25.1,-125.21 -135.62,-219.54 -268.22,-219.54 -138.47,0 -252.88,102.87 -271.06,236.35 -2.07,-0.25 -4.19,-0.39 -6.33,-0.39 -0.79,0 -1.57,0.02 -2.35,0.06 18.38,-138.11 136.6,-244.67 279.74,-244.67zm275.83 236.93c8.86,0 16.04,7.18 16.04,16.04 0,8.86 -7.18,16.04 -16.04,16.04 -8.86,0 -16.04,-7.18 -16.04,-16.04 0,-8.86 7.18,-16.04 16.04,-16.04zm-551.52 73.17c7.82,0 14.15,6.33 14.15,14.15 0,7.82 -6.33,14.15 -14.15,14.15 -7.82,0 -14.15,-6.33 -14.15,-14.15 0,-7.82 6.33,-14.15 14.15,-14.15zm-1.67 -55.09c11.63,0 21.05,9.42 21.05,21.05 0,11.63 -9.42,21.05 -21.05,21.05 -11.63,0 -21.05,-9.43 -21.05,-21.05 0,-11.63 9.42,-21.05 21.05,-21.05zm559.53 20.96c0.05,2.08 0.07,4.17 0.07,6.26 0,155.88 -126.37,282.24 -282.24,282.24 -133.36,0 -245.09,-92.49 -274.6,-216.83 2.94,-0.16 5.81,-0.56 8.6,-1.19 28.9,120.11 137.01,209.37 266,209.37 151.11,0 273.6,-122.5 273.6,-273.6 0,-1.87 -0.02,-3.73 -0.06,-5.59 0.78,0.07 1.58,0.11 2.38,0.11 2.16,0 4.25,-0.27 6.25,-0.79z"
				/>
			</g>
		</svg>

		<div class="icon">
			<i class="hsr-shop" />
		</div>

		<span class="caption">
			{$t('shop.heading')}
		</span>
	</div>
</button>

<style>
	.shop-button {
		position: fixed;
		z-index: +1;
		left: 4%;
		bottom: 5%;
		transition: all 0.2s;
		width: 8vw;
		max-width: 7.5rem;
		min-width: 5rem;
		aspect-ratio: 1/1;
	}

	@media screen and (max-width: 750px) {
		.shop-button {
			bottom: 10%;
		}
	}

	.wrapper {
		width: 100%;
		height: 100%;
		position: relative;
		color: rgba(255, 255, 255, 0.8);
	}

	svg {
		mask-image: linear-gradient(black 40%, transparent 95%);
	}

	.icon {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -57%);
		width: 100%;
		height: 100%;
		font-size: calc(0.55 * var(--width));
		line-height: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.icon::after {
		content: '';
		display: block;
		background-color: rgba(0, 0, 0, 0.1);
		aspect-ratio: 1/1;
		width: calc(0.7 * var(--width));
		border-radius: 100%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -43%);
		z-index: -1;
	}

	.circle-outline {
		transform-origin: center;
		animation: rotate 60s infinite linear;
		fill: rgba(255, 255, 255, 0.8);
	}

	.caption {
		font-size: calc(0.17 * var(--width));
		transform: translateY(-100%);
		display: block;
	}

	@keyframes rotate {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
