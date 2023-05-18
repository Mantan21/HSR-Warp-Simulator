<script>
	import { createEventDispatcher } from 'svelte';

	export let active = false;
	export let icon = '';

	const dispatch = createEventDispatcher();
	const click = () => {
		dispatch('click');
	};
</script>

<div class="item">
	<button class:active on:click={click}>
		<div class="icon-wrapper">
			<div class="icon">
				<div class="ornament"><span /></div>
				<i class="hsr-{icon}" />
			</div>
		</div>
		<span> <slot /> </span>
	</button>
</div>

<style>
	.item {
		padding: 1%;
	}

	button {
		padding: calc(0.005 * var(--screen-width)) calc(0.015 * var(--screen-width));
		padding-left: calc(0.005 * var(--screen-width));
		display: inline-flex;
		align-items: center;
		width: 100%;
		color: #fff;
		font-size: 130%;
	}

	button.active {
		opacity: 1;
	}

	button span {
		padding-left: 7.5%;
		opacity: 0.7;
		transition: 0.5s all;
		text-align: left;
		width: 100%;
	}
	button.active span,
	button:hover span {
		opacity: 1;
	}

	.icon-wrapper {
		width: 25%;
		max-width: 3.5rem;
	}

	:global(.notext) .icon-wrapper {
		width: 25rem;
		transform: scale(0.9);
	}

	.icon {
		font-size: 180%;
		width: 100%;
		aspect-ratio: 1/1;
		border-radius: 100%;
		position: relative;
		transition: all 0.5s;
		line-height: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	button.active .icon {
		background-color: #fff;
		color: #000;
	}

	.ornament {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 50%;
		left: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		transform: translate(-50%, -50%) scale(1.3);
		opacity: 0;
		transition: all 0.5s;
	}

	button.active .ornament {
		opacity: 1;
	}

	.ornament span {
		width: 100%;
		height: 100%;
		border-radius: 100%;
		border: 1px dashed rgba(255, 255, 255, 0.4);
		position: relative;
		animation: rotate 10s linear forwards infinite;
	}

	.ornament span::before,
	.ornament span::after {
		content: '';
		width: 7%;
		border-radius: 100%;
		aspect-ratio: 1/1;
		background-color: #fff;
		content: 0;
		position: absolute;
	}
	.ornament span::before {
		top: 50%;
		left: 0;
		transform: translate(-50%, -50%);
	}
	.ornament span::after {
		top: 50%;
		right: 0;
		transform: translate(50%, -50%);
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
