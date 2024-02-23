<script>
	import { fade } from 'svelte/transition';
	import { t } from 'svelte-i18n';
	import { musics } from '$lib/stores/phonograph-store';
	import { cookie } from '$lib/helpers/dataAPI/api-cookie';
	import { playSfx } from '$lib/helpers/sounds/audiofx';

	export let playedSID;

	let isLoop = cookie.get('loopTrack');
	let isSuffle = cookie.get('suffleTrack');
	$: playedTrack = $musics.find(({ sourceID }) => sourceID === playedSID) || {};

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
</script>

<div class="controller">
	<div class="information">
		<span class="onplay">"{playedTrack.title}"</span>
		{#if playedTrack.description}
			<div class="description">
				<p>
					{@html (playedTrack.description || '')?.replace(/\n/g, '<br/>')}
				</p>
			</div>
		{/if}
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
	</div>
</div>

<style>
	.onplay {
		display: block;
		font-size: 120%;
		color: var(--color-second);
	}
	.description {
		max-height: 15vh;
		overflow-y: auto;
	}

	.description::-webkit-scrollbar {
		display: none;
	}

	p {
		line-height: 120%;
	}

	/* Mobile Landscape */
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
		.description {
			height: 5vh;
		}
	}
</style>
