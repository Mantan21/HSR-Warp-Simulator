<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { t } from 'svelte-i18n';
	import { musics } from '$lib/stores/phonograph-store';
	import { cookie } from '$lib/stores/cookies';
	import { playSfx } from '$lib/helpers/audio';
	import Scrollable from '$lib/components/Scrollable.svelte';

	export let playedSID;

	let online;
	let isLoop = cookie.get('loopTrack');
	let isSuffle = cookie.get('suffleTrack');
	$: playedTrack = $musics.find(({ sourceID }) => sourceID === playedSID);

	const handleLoop = () => {
		playSfx();
		isLoop = !isLoop;
		cookie.set('loopTrack', isLoop);
	};
	const handleSuffle = () => {
		playSfx();
		isSuffle = isSuffle === undefined ? false : !isSuffle;
		cookie.set('suffleTrack', isSuffle);
	};

	onMount(() => {
		online = window.navigator.onLine;
		window.addEventListener('online', () => {
			online = true;
		});
		window.addEventListener('offline', () => {
			online = false;
		});
	});
</script>

<div class="controller">
	<div class="information">
		<span class="onplay">"{playedTrack.title}"</span>
		<div class="description">
			<Scrollable>
				<p>
					{playedTrack.description || ''}
				</p>
			</Scrollable>
		</div>
	</div>
	<div class="controls">
		<button class:active={isLoop} on:click={handleLoop} title="Loop This Music">
			<i class="hsr-loop" />
			{$t('phonograph.loop')}
		</button>
		{#if !isLoop}
			<button
				title="Suffle Playlist"
				class:active={isSuffle === undefined || isSuffle}
				on:click={handleSuffle}
				transition:fade={{ duration: 250 }}
			>
				<i class="hsr-suffle" />
				{$t('phonograph.suffle')}
			</button>
		{/if}
		{#if online}
			<button title="Choose Musics' Server"> <i class="hsr-server" /> Google </button>
		{:else}
			<button title="Cant't connect to Server" disabled>
				<i class="hsr-server" />
				{$t('noInternet')}
			</button>
		{/if}
	</div>
</div>

<style>
	.controller {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 45%;
		font-size: 150%;
		padding: 0 0 0 2.75%;
	}

	.onplay {
		display: block;
		font-size: 120%;
		color: var(--color-second);
	}
	p {
		line-height: 120%;
	}

	/* Mobile Landscape */
	.controller {
		font-size: 120%;
	}

	.controls {
		padding: 1rem 0;
	}
	button {
		color: #fff;
		display: inline-flex;
		align-items: center;
		margin-right: 1rem;
		border: 0.1rem solid #fff;
		padding: 0.1rem 1.5rem;
		border-radius: 2rem;
		opacity: 0.5;
		transition: 0.25s all;
		font-size: 100%;
	}
	button i {
		line-height: 0;
		font-size: 200%;
		margin-right: 0.5rem;
		position: relative;
	}

	i.hsr-loop::after {
		content: '1';
		position: absolute;
		top: 50%;
		left: 50%;
		font-style: normal;
		font-size: 45%;
		line-height: 0;
		transform: translate(-50%, -50%);
	}

	button:not(:disabled):hover {
		opacity: 1;
	}
	button:not(:disabled):active {
		transform: scale(0.95);
		filter: brightness(0.5);
	}
	button.active {
		opacity: 1;
		background-color: rgba(255, 255, 255, 0.85);
		color: #000;
	}

	:global(.mobileLandscape) button {
		font-size: 80%;
	}

	/* Mobile Portrait */
	@media screen and (max-width: 620px) {
		.controller {
			position: relative;
			width: 100%;
			font-size: 120%;
		}

		.description {
			height: 5vh;
		}
	}
</style>
