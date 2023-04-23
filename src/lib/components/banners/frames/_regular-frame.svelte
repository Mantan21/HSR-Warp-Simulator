<script>
	import { fade, fly } from '$lib/helpers/transition';
	import { assets } from '$lib/stores/app-store';
	import RateupLightones from '../RateupLightones.svelte';

	const lightcones = [
		{ name: 'night-on-the-milty-way', rarity: 5 },
		{ name: 'something-irreplaceable', rarity: 5 },
		{ name: 'the-battle-isnt-over', rarity: 5 }
	];

	const chars = [
		{
			name: 'bronya',
			combat_type: 'wind'
		},
		{
			name: 'himeko',
			combat_type: 'fire'
		},
		{
			name: 'gepard',
			combat_type: 'ice'
		}
	];
</script>

<div class="content">
	<div class="banner-name">Regular Warp</div>
	<div class="wrapper-info" in:fade={{ duration: 500, delay: 250 }}>
		<div class="info-body">
			<h1>Stellar Warp</h1>
			<div class="description">
				<p>Every <span>10</span> Warps guarantees a <span>4</span>-star or above entity</p>
				<p>Permanent</p>
			</div>

			<RateupLightones {lightcones} showCaption />
		</div>
	</div>
	<div class="character">
		{#each chars as { combat_type, name }}
			<div class="char-group {name}" in:fly={{ duration: 1000, delay: 250, x: -20 }}>
				<div class="name">
					<i class="hsr-{combat_type} icon-gradient {combat_type}" />
					<span>{name}</span>
				</div>
				<div class="stars">
					{#each Array(5) as _} <i class="hsr-star" />{/each}
				</div>
			</div>
		{/each}

		<div class="char-group additional">
			<button in:fade={{ delay: 250, duration: 500 }}>
				<img src={$assets['additional-reward.svg']} alt="Additional Rewards" />
			</button>
			<caption>Additional Rewards</caption>
		</div>
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
	}

	.info-body {
		height: 100%;
		border-left: 1px solid #aaa;
		padding: 5%;
	}

	.description {
		padding: 5% 0 0 1%;
		display: flex;
		align-items: flex-start;
		flex-direction: column;
		height: calc(0.11 * var(--bw));
		overflow: auto;
		margin-bottom: -8%;
	}
	.description p {
		font-size: calc(0.021 * var(--bw));
		font-weight: bold;
		line-height: normal;
		margin-bottom: 5%;
	}

	.description span {
		color: #e6993d;
	}

	h1 {
		padding-top: 10%;
		font-size: calc(0.05 * var(--bw));
	}

	/* Featured Lightcone */
	.featured-lightcones {
		width: 100%;
		height: 100%;
		position: relative;
	}

	.lightcones-info {
		position: absolute;
		top: 31%;
		width: 100%;
		padding: 0 3%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.lightcones-name {
		background-color: rgba(0, 0, 0, 0.7);
		height: calc(0.052 * var(--bw));
		width: 100%;
		text-align: center;
		padding: 0 12% 0 2%;
		font-size: calc(0.023 * var(--bw));
		color: var(--color-text);
		position: relative;
		z-index: +2;
	}

	.lightcones-name span {
		position: absolute;
		right: 3%;
		bottom: 5%;
		font-size: calc(0.013 * var(--bw));
	}

	.lightcones-info .stars {
		background-color: rgba(0, 0, 0, 0.7);
		margin-top: 2%;
		padding: 0 2%;
		display: inline-flex;
		align-items: center;
		line-height: 0;
		height: calc(0.023 * var(--bw));
		font-size: calc(0.014 * var(--bw));
	}

	.lightcones-list {
		position: relative;
		width: 100%;
		height: 50%;
	}
	.lc-item {
		position: absolute;
		width: 70%;
	}

	.lc2 {
		left: -10%;
		top: 10%;
		transform: scale(0.55) rotate(-15deg);
		z-index: +1;
	}
	.lc1 {
		left: 13%;
		top: -2%;
		transform: scale(0.65) rotate(9deg);
	}
	.lc3 {
		left: 35%;
		top: 20%;
		transform: scale(0.5) rotate(25deg);
	}

	/* character name */
	.character {
		width: 70%;
		height: 100%;
		position: relative;
	}
	.char-group {
		position: absolute;
		z-index: +3;
	}
	.name {
		background-color: rgba(0, 0, 0, 0.65);
		height: calc(0.0235 * var(--bw));
		display: flex;
		align-items: center;
	}
	.name i {
		padding: 0 calc(0.01 * var(--bw));
		font-size: calc(0.025 * var(--bw));
	}
	.name span {
		display: block;
		padding-right: calc(0.01 * var(--bw));
		font-size: calc(0.02 * var(--bw));
		text-transform: capitalize;
	}

	.stars {
		padding: 0 10%;
		text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
		height: calc(0.02 * var(--bw));
		width: fit-content;
		display: flex;
		align-items: center;
		font-size: calc(0.014 * var(--bw));
		margin-top: 4%;
		background-color: rgba(0, 0, 0, 0.65);
	}

	.bronya {
		top: 56%;
		left: 55%;
	}
	.gepard {
		top: 36%;
		left: 5%;
	}
	.himeko {
		top: 42.5%;
		right: 11.5%;
	}

	/* Aditional Rewards */
	.additional {
		right: 2%;
		bottom: 9%;
	}

	.additional button {
		width: calc(0.055 * var(--bw));
		aspect-ratio: 1/1;
		border-radius: 100%;
		background-color: rgba(0, 0, 0, 0.2);
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		transition: transform 0.1s;
	}

	.additional button:active {
		transform: scale(0.95);
	}

	.additional img {
		width: 80%;
	}

	.additional caption {
		text-align: center;
		font-size: calc(0.014 * var(--bw));
	}
</style>
