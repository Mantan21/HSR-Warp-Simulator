<script>
	import LightCones from '$lib/components/LightCones.svelte';
	import { fade, fly } from '$lib/helpers/transition';
	import { assets } from '$lib/stores/app-store';
	import RateupLightones from '../RateupLightones.svelte';

	const lightcones = [
		{ name: 'the-moles-welcome-you', rarity: 4 },
		{ name: 'good-night-and-sleep-well', rarity: 4 },
		{ name: 'post-op-conversation', rarity: 4 }
	];
</script>

<div class="content">
	<div class="banner-name">Light Cone Event Warp</div>

	<!-- Left Pane -->
	<div class="wrapper-info">
		<div class="info-body" in:fade={{ duration: 500, delay: 250 }}>
			<div class="short-detail">
				<h1>Brillian Fixation</h1>
				<div class="time"><i class="hsr-time" /> <caption> ∞ days ∞ hours</caption></div>
				<div class="description">
					<p>Every <span>10</span> Warps guarantees a <span>4</span>-star or above entity</p>
					<p>Featured Light Cone</p>
				</div>
			</div>
			<RateupLightones {lightcones} />
		</div>
	</div>

	<!-- Right Pane -->
	<div class="item-name">
		<div class="row" in:fade={{ duration: 1000, delay: 250 }}>
			<div class="path">
				<img src={$assets['the-hunt.svg']} alt="The Hunt" />
			</div>
			<div class="name">In the Night</div>
			<span class="stars">
				{#each Array(5) as _}
					<i class="hsr-star" />
				{/each}
			</span>
		</div>
	</div>
	<div class="featured-lighcone" in:fly={{ duration: 1000, delay: 250, x: -20 }}>
		<LightCones item="in-the-night" />
	</div>
</div>

<style>
	.content {
		width: 100%;
		height: 100%;
		position: relative;
		display: flex;
	}

	.banner-name {
		position: absolute;
		top: 2%;
		left: -1.1%;
		font-size: calc(0.015 * var(--bw));
		padding: 0.45% 1.5%;
		border-top-right-radius: 2rem;
		border-bottom-right-radius: 2rem;
		background-color: #3d81ce;
	}

	.wrapper-info {
		width: 30%;
		height: 100%;
		color: #333;
		padding: 1.3%;
		position: relative;
	}

	.info-body {
		height: 100%;
		border-left: 1px solid #aaa;
		padding: 5%;
		display: flex;
		flex-direction: column;
	}

	:global(.mobileLandscape) .info-body {
		padding: 5% 5% 5% 7%;
	}

	.description,
	.time {
		display: flex;
		align-items: center;
	}

	.time i {
		line-height: 0;
		margin-right: 2%;
		font-size: calc(0.024 * var(--bw));
	}

	.time {
		font-size: calc(0.018 * var(--bw));
		margin-bottom: 2%;
	}

	.description {
		padding: 6% 0 0 1%;
		align-items: flex-start;
		flex-direction: column;
		height: calc(0.09 * var(--bw));
		overflow: auto;
		mask-image: linear-gradient(black 80%, transparent);
	}

	.description::-webkit-scrollbar {
		display: none;
	}

	.description p,
	.time {
		line-height: 130%;
	}

	.description p {
		font-size: calc(0.017 * var(--bw));
		margin-bottom: 5%;
	}

	:global(.mobileLandscape) .description p {
		font-size: calc(0.016 * var(--bw));
	}

	.description span,
	.time {
		color: #e6993d;
	}

	h1 {
		margin-top: 5%;
		font-size: calc(0.041 * var(--bw));
		height: calc(0.16 * var(--bw));
		display: flex;
		align-items: center;
	}

	:global(.mobileLandscape) h1 {
		margin-top: 13%;
		font-size: calc(0.022 * var(--bw));
		height: calc(0.07 * var(--bw));
		line-height: 100%;
	}

	/* Right Pane */
	.featured-lighcone {
		position: absolute;
		width: 24%;
		right: 25%;
		top: 22%;
		transform: rotate(7deg);
	}

	:global(.mobileLandscape) .featured-lighcone {
		width: 21.5%;
		right: 27%;
	}

	.item-name {
		position: absolute;
		bottom: 34.5%;
		left: 34.5%;
		width: 20%;
		display: flex;
		flex-direction: column;
	}

	.path {
		width: 45%;
		padding-bottom: 5%;
	}
	.path img {
		width: 100%;
	}

	.item-name .name {
		font-size: calc(0.022 * var(--bw));
		color: #333;
		font-weight: bold;
	}

	.stars {
		padding: 0 4%;
		height: calc(0.02 * var(--bw));
		width: 100%;
		display: flex;
		align-items: center;
		font-size: calc(0.012 * var(--bw));
		margin-top: 3%;
		background-image: linear-gradient(to right, rgba(0, 0, 0, 0.65) 70%, rgba(0, 0, 0, 0));
		line-height: 0;
	}
</style>
