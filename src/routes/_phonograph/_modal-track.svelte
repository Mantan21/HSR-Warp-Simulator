<script>
	import { getContext, setContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import { t } from 'svelte-i18n';
	import { musics } from '$lib/stores/phonograph-store';
	import { customTracks } from '$lib/helpers/dataAPI/api-localstorage';
	import { playSfx } from '$lib/helpers/sounds/audiofx';
	import { fetchMedia } from '$lib/helpers/dataAPI/api-fetcher';

	import LoadingIcon from '$lib/components/LoadingIcon.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Input from '$lib/components/Input.svelte';
	import ButtonGeneral from '$lib/components/ButtonGeneral.svelte';
	import Toast from '$lib/components/Toast.svelte';
	import Scrollable from '$lib/components/Scrollable.svelte';

	export let show = false;

	const handleModal = getContext('handleModal');
	const cancelModal = () => {
		handleModal(false);
		playSfx('modal-close');
	};
	setContext('closeModal', cancelModal);

	let youtubeURL = '';
	$: videoID = youtubeURLCheck(youtubeURL);

	const youtubeURLCheck = (url) => {
		if (!url) return '';
		try {
			const re =
				/(https?:\/\/)?(((m|www)\.)?(youtube(-nocookie)?|youtube.googleapis)\.com.*(v\/|v=|vi=|vi\/|e\/|embed\/|user\/.*\/u\/\d+\/)|youtu\.be\/)([_0-9a-z-]+)/i;
			const id = url.match(re)[8];
			return typeof id === 'string' ? id : '';
		} catch (e) {
			return '';
		}
	};

	let showToast = false;
	let message = '';
	setContext('closeToast', () => (showToast = false));

	let onCheckProgress = false;
	let data = {};

	const checkDuplicate = () => {
		const music = $musics.filter(({ album }) => album !== 'custom-musics');
		const findTrack = music.findIndex((m) => m.sourceID === videoID);
		if (findTrack < 0) return false;
		return music[findTrack];
	};

	const checkAudio = async () => {
		playSfx();
		onCheckProgress = true;
		try {
			const isDuplicate = checkDuplicate();

			if (isDuplicate) {
				showToast = true;
				const albumName = $t(`phonograph.${isDuplicate.album}`);
				message = $t('duplicatedTrack', { values: { trackTitle: isDuplicate.title, albumName } });
			} else {
				// Fetch Audio
				data = await fetchMedia(videoID);
				if (data.message !== 'ok') throw new Error('Server Error');
			}
			onCheckProgress = false;
		} catch (e) {
			console.error(e);
			onCheckProgress = false;
			showToast = true;
			message = $t('failedToFetch');
		}
	};

	const confirmAddTrack = () => {
		playSfx();
		const { title, description } = data;
		const dataToAdd = { album: 'custom-musics', sourceID: videoID, title, description };
		musics.update((m) => {
			const findTrack = m.findIndex((t) => t.sourceID === videoID);
			if (findTrack < 0) return [...m, dataToAdd];

			m[findTrack] = dataToAdd;
			return m;
		});
		customTracks.put(dataToAdd);
		handleModal(false);
		data = {};
		youtubeURL = '';
	};
</script>

{#if showToast}
	<Toast>{message}</Toast>
{/if}

{#if show}
	<Modal
		title={$t('phonograph.addTrack')}
		disabled={data.message !== 'ok'}
		on:confirm={confirmAddTrack}
		on:cancel={cancelModal}
	>
		<div class="addtrack">
			{#if onCheckProgress}
				<div class="loader">
					<LoadingIcon />
				</div>
			{:else if data.message === 'ok'}
				{@const { author, title, description, images } = data}
				<div class="row" in:fade={{ duration: 250 }}>
					<div class="thumb">
						<picture>
							<img src={images[0]?.url} alt="Thumbnail" />
						</picture>
					</div>
					<div class="info">
						<div class="title">{title}</div>
						<div class="channel">
							<i class="hsr-character" />
							{author}
						</div>
						{#if description}
							<div class="description">
								<Scrollable dark>
									<p>
										{@html description.replace(/\n/g, '<br/>')}
									</p>
								</Scrollable>
							</div>
						{/if}
					</div>
				</div>
			{:else}
				<span>{$t('phonograph.inputURL')}</span>
				<Input
					placeholder="https://www.youtube.com/watch?v=..."
					on:input={(e) => (youtubeURL = e.detail.target.value)}
					value={youtubeURL}
				/>
				<div class="button">
					<ButtonGeneral dark icon="play" on:click={checkAudio} disabled={!videoID}>
						{$t('phonograph.check')}
					</ButtonGeneral>
				</div>
			{/if}
		</div>
	</Modal>
{/if}

<style>
	.addtrack {
		width: 100%;
		text-align: center;
	}

	.button {
		margin-top: 2%;
	}

	.row {
		display: flex;
		align-items: center;
		width: 100%;
	}

	.thumb {
		flex-basis: 35%;
	}

	.thumb img {
		width: 80%;
	}

	.info {
		text-align: left;
		flex-basis: 65%;
	}
	.info .title {
		font-size: 150%;
	}

	.info .channel {
		text-decoration: underline;
	}
	.info .description {
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		margin-top: 3%;
		height: 10vh;
	}
</style>
