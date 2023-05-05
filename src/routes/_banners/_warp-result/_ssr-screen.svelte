<script>
	import Path from '$lib/components/Path.svelte';
	import { fly, scale } from '$lib/helpers/transition';
	export let path;
</script>

<div class="wrapper intro">
	<div class="relative" out:scale={{ start: 0.5, duration: 200 }}>
		<div class="path-icon" in:fly={{ y: 75, duration: 300 }}>
			<Path {path} />
		</div>
		<div class="stars">
			<i class="hsr-star" in:fly={{ y: 75, duration: 250, delay: 25 }} style="--delay: .025s;" />
			<i class="hsr-star" in:fly={{ y: 75, duration: 250, delay: 75 }} style="--delay: .075s;" />
			<i
				class="hsr-star star-center"
				in:fly={{ y: 75, duration: 250, delay: 125 }}
				style="--delay: .125s;"
			/>
			<i class="hsr-star" in:fly={{ y: 75, duration: 250, delay: 75 }} style="--delay: .075s;" />
			<i class="hsr-star" in:fly={{ y: 75, duration: 250, delay: 25 }} style="--delay: .025s;" />
		</div>
	</div>
</div>

<style>
	.relative,
	.wrapper {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.intro {
		background-color: #000;
		position: absolute;
		top: 0;
		left: 0;
		z-index: +15;
	}

	.stars {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 500%;
		display: flex;
		align-items: center;
		line-height: 0;
		text-shadow: 0 0 2rem rgb(253, 248, 176);
		-webkit-text-stroke: 0.25rem rgba(255, 255, 255, 0.7);
	}
	.stars .star-center {
		font-size: 200%;
	}

	.stars i {
		position: relative;
		color: #fee28b;
	}

	.stars i::after {
		z-index: -1;
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: rgba(255, 255, 255, 0.1);
		width: 0%;
		height: var(--screen-height);
		animation-name: scaleW;
		animation-duration: 0.5s;
		animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
		animation-fill-mode: forwards;
		animation-delay: var(--delay);
	}

	@keyframes scaleW {
		0% {
			width: 500%;
		}
		100% {
			width: 0;
		}
	}

	.path-icon {
		min-width: 150px;
		width: calc(0.15 * var(--screen-width));
		height: auto;
		opacity: 0.35;
	}
</style>
