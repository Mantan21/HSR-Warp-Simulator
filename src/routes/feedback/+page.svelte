<script>
	import { assets } from '$lib/stores/app-store';
	import { playSfx } from '$lib/helpers/sounds/audiofx';

	import ButtonIcon from '$lib/components/ButtonIcon.svelte';
	import Header from '$lib/components/Header.svelte';
	import Scrollable from '$lib/components/Scrollable.svelte';
	import { fade } from 'svelte/transition';
	const random = (min, max) => {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	const back = () => {
		playSfx();
		window.close();
	};
</script>

<svelte:head>
	<script src="https://hsr-warpsim.disqus.com/embed.js" data-timestamp={+new Date()} async>
	</script>
</svelte:head>

<section in:fade={{ duration: 250 }}>
	<img class="bg" src={$assets[`bg${random(1, 10)}.webp`]} alt="background" />
	<Header icon="bug" h2="Feedbacks" relative>
		<div class="close">
			<ButtonIcon icon="back" on:click={back} />
		</div>
	</Header>
	<div class="container">
		<Scrollable>
			<div class="wrapper">
				<div id="disqus_thread" />
			</div>
		</Scrollable>
	</div>
</section>

<style>
	section {
		width: 100%;
		height: 100%;
		position: relative;
	}
	section::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.2);
	}

	.bg {
		width: 100vw;
		height: 100%;
		object-fit: cover;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) scale(1.1);
		filter: blur(10px) brightness(0.8);
	}

	.container {
		width: 100%;
		height: calc(var(--screen-height) - 80px);
		position: relative;
		z-index: +1;
	}

	.wrapper {
		height: 100%;
		width: 900px;
		max-width: 90%;
		padding: 0 2%;
		margin: auto;
	}
</style>
