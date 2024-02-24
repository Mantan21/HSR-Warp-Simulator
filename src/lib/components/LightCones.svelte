<script>
	import { t } from 'svelte-i18n';
	import { fade, fly } from 'svelte/transition';
	import { assets, liteMode, liveconeList } from '$lib/stores/app-store';
	import { lazyLoad } from '$lib/helpers/lazyload';
	import { fetchMedia } from '$lib/helpers/dataAPI/api-fetcher';

	export let item = '';
	export let size = 'medium';
	export let animate = false;
	export let animationID = null;

	const transitionFly = (node, args) => {
		if (!animate) return;
		return fly(node, args);
	};

	const loadVideo = async (vID) => {
		const storedURL = $liveconeList[vID];
		if (storedURL) return { ...storedURL, success: true };

		// fetch New
		const { status, formats = {} } = await fetchMedia(vID, 'video');
		if (status === 'error') return { success: false };

		const videoURL = { mp4: formats['video/mp4'], webm: formats['video/webm'] };
		liveconeList.update((v) => {
			v[vID] = videoURL;
			return v;
		});
		return { ...videoURL, success: true };
	};
</script>

<div
	class="light-cone"
	class:lite={$liteMode}
	class:small={size === 'small'}
	in:transitionFly={{ y: -300, x: -30, duration: 500 }}
>
	{#if size !== 'small'}
		<div class="layer layer-back" in:transitionFly={{ y: 200, x: 30, duration: 300, opacity: 1 }} />
	{/if}
	<img use:lazyLoad={$assets[`lc/${size}/${item}`]} crossorigin="anonymous" alt={$t(item)} />

	{#if animationID && size !== 'small'}
		{#await loadVideo(animationID) then { webm, success }}
			{#if success}
				<div class="videoWrapper" in:fade>
					<video autoplay loop>
						<source src={webm} type="video/webm" crossorigin="anonymous" />
						<track kind="captions" />
					</video>
				</div>
			{/if}
		{/await}
	{/if}
	<div
		class="layer layer-front"
		in:transitionFly={{ y: -300, x: -30, duration: 500, opacity: 1 }}
	/>
</div>

<style>
	.light-cone {
		width: 100%;
		height: auto;
		aspect-ratio: 53/74;
		position: relative;
	}

	.videoWrapper {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		overflow: hidden;
		border: 0.3rem solid #fff;
	}

	video {
		width: inherit;
		height: auto;
		position: absolute;
		top: 0;
		left: 0;
		/* top: 50%;
		left: 50%;
		transform: translate(-50%, -50%); */
	}

	img {
		width: 100%;
		position: relative;
	}

	.layer {
		position: absolute;
		border-radius: 0.4rem;
		width: 94%;
		border-color: rgba(255, 255, 255, 0.8);
		border-right-color: #eee;
		border-style: solid;
	}

	.layer-front {
		height: 99%;
		width: 99%;
		background-image: linear-gradient(135deg, rgba(255, 255, 255, 0.6), transparent 50%);
		border-width: 0.25rem 0.275rem 0.2rem 0.15rem;
		top: -4%;
		left: -5.5%;
	}

	.small .layer-front {
		border-width: 0.12rem 0.15rem 0.1rem;
		top: -2%;
		left: -4%;
	}

	.layer-front::after {
		content: '';
		width: 95%;
		height: 97%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border-radius: 0.5rem;
		border-right: 0.1rem solid var(--color-second);
		border-bottom: 0.1rem solid var(--color-second);
	}

	.light-cone:not(.small) .layer-front::after {
		mask-image: linear-gradient(135deg, transparent 40%, black);
	}

	.layer-back {
		height: 97%;
		bottom: -3%;
		right: -5%;
		background-image: linear-gradient(-45deg, rgba(255, 255, 255, 0.2), transparent 50%);
		border-width: 0.25rem 0.3rem 0.2rem 0.15rem;
		border-radius: 0.5rem;
	}

	.lite .layer-back,
	.lite .layer-front {
		background-image: unset;
	}
</style>
