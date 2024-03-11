<script>
	import { getContext } from 'svelte';
	import { t } from 'svelte-i18n';
	import { fade } from '$lib/helpers/transition';
	import { assets, probEdit, regReward } from '$lib/stores/app-store';
	import RateupLightones from './__rateup-lightcones.svelte';

	const lightcones = [
		{ name: 'night-on-the-milky-way', rarity: 5 },
		{ name: 'something-irreplaceable', rarity: 5 },
		{ name: 'but-the-battle-isnt-over', rarity: 5 }
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

	let rollcount = 0;
	let isClaimed = false;
	$: ({ isClaimed, rollcount } = $regReward);

	const handleModal = getContext('handleShowReward');
</script>

<div class="content" in:fade={{ duration: 500, delay: 250 }}>
	{#if $probEdit}
		<div class="banner-name">
			{$t('banner.regular')} Configuration
		</div>
	{:else}
		<div class="banner-name">{$t('banner.regular')}</div>
	{/if}

	{#if !$probEdit}
		<div class="wrapper-info" transition:fade|local>
			<div class="info-body">
				<h1>{$t('banner.stellar')}</h1>
				<div class="description">
					<p>{@html $t('warp.warpDescription')}</p>
					<p>{@html $t('warp.permanent')}</p>
				</div>

				<RateupLightones {lightcones} showCaption />
			</div>
		</div>

		<div class="character" transition:fade|local>
			{#each chars as { combat_type, name }}
				<div class="char-group {name}">
					<div class="name">
						<i class="hsr-{combat_type} icon-gradient {combat_type}" />
						<span>{$t(name)}</span>
					</div>
					<div class="stars">
						{#each Array(5) as _} <i class="hsr-star" />{/each}
					</div>
				</div>
			{/each}

			{#if !isClaimed}
				<div class="char-group additional">
					<button
						class:ready={rollcount >= 300}
						class:halfReady={rollcount >= 150 && rollcount < 300}
						on:click={handleModal}
					>
						<span class="notice">i</span>
						<img src={$assets['additional-reward.svg']} alt="Additional Rewards" />
					</button>
					<caption>{$t('warp.additional')}</caption>
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	.content {
		width: 100%;
		height: 100%;
		position: relative;
		display: flex;
		z-index: +1;
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
		z-index: +2;
	}

	.wrapper-info {
		width: 30%;
		height: 100%;
		color: #333;
		padding: 1.3%;
		position: relative;
		z-index: +1;
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

	.description {
		padding: 6% 0 0 1%;
		display: flex;
		align-items: flex-start;
		flex-direction: column;
		height: calc(0.2 * var(--bw));
		overflow: auto;
	}
	.description :global(p) {
		font-size: calc(0.017 * var(--bw));
		line-height: 130%;
		margin-bottom: 5%;
		margin-top: 2%;
	}

	:global(.mobileLandscape) .description p {
		font-size: calc(0.016 * var(--bw));
	}

	.description :global(span) {
		color: #e6993d;
	}

	h1 {
		margin-top: 5%;
		font-size: calc(0.041 * var(--bw));
		height: calc(0.2 * var(--bw));
		display: flex;
		align-items: center;
	}
	:global(.ja-JP) h1,
	:global(.zh-CN) h1,
	:global(.zh-TW) h1 {
		font-size: calc(0.055 * var(--bw));
	}

	:global(.mobileLandscape) h1 {
		margin-top: 13%;
		font-size: calc(0.022 * var(--bw));
		height: calc(0.07 * var(--bw));
		line-height: 100%;
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
		font-size: calc(0.023 * var(--bw));
	}
	.name span {
		display: block;
		padding-right: calc(0.01 * var(--bw));
		font-size: calc(0.015 * var(--bw));
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
		width: 10%;
		right: 2%;
		bottom: 9%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
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

	.additional button.ready {
		border: 0.15rem solid #fff;
		box-shadow: 0 0 0.5rem 0.2rem rgba(255, 206, 99, 1);
	}
	.additional button.halfReady {
		border: 0.15rem solid #abd7f2;
		box-shadow: 0 0 0.5rem 0.2rem rgb(200, 227, 255);
	}

	.additional button .notice {
		color: #fff;
		background-color: red;
		position: absolute;
		top: 0;
		right: 0;
		width: calc(0.01 * var(--bw));
		aspect-ratio: 1/1;
		border-radius: 1rem;
		font-size: calc(0.01 * var(--bw));
		display: none;
	}

	.additional button.ready .notice {
		display: unset;
	}

	.additional img {
		width: 80%;
	}

	.additional caption {
		text-align: center;
		font-size: calc(0.014 * var(--bw));
	}
</style>
