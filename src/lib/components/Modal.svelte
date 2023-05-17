<script>
	import { createEventDispatcher, getContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import ButtonGeneral from './ButtonGeneral.svelte';
	import ButtonIcon from './ButtonIcon.svelte';
	import { t } from 'svelte-i18n';

	export let title = '';
	export let disabled = false;
	const closeModal = getContext('closeModal');

	const dispatch = createEventDispatcher();
	const cancel = () => dispatch('cancel');
	const confirm = () => dispatch('confirm');
</script>

<div class="modal" on:mousedown|self={closeModal} transition:fade={{ duration: 200 }}>
	<div class="container">
		<div class="header">
			<h1>{title}</h1>
			<div class="close">
				<ButtonIcon on:click={closeModal} dark />
			</div>
		</div>

		<div class="body">
			<slot />
		</div>
		<div class="footer">
			<ButtonGeneral icon="times" on:click={cancel}>
				{$t('cancel')}
			</ButtonGeneral>
			<ButtonGeneral icon="check" on:click={confirm} {disabled}>
				{$t('confirm')}
			</ButtonGeneral>
		</div>
	</div>
</div>

<style>
	.modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: var(--screen-height);
		background-color: rgba(0, 0, 0, 0.3);
		backdrop-filter: blur(10px);
		z-index: 500;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.header {
		padding: 3% 5%;
		position: relative;
	}

	.body {
		padding: 0% 5% 3%;
		min-height: 100px;
		display: flex;
		align-items: center;
		position: relative;
		z-index: +1;
	}

	.container {
		max-width: 90%;
		width: 600px;
		position: relative;
		color: #000;
		background-color: rgba(255, 255, 255, 0.8);
		backdrop-filter: blur(10px);
		border-top-right-radius: 5vh;
		z-index: 2;
	}

	:global(.mobileLandscape) .container {
		min-width: 400px;
		width: 50%;
	}

	.container::before {
		content: '';
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		border: 2px solid var(--color-second);
		mask-image: linear-gradient(45deg, black 50%, transparent 80%);
		transform: translate(-1.5%, 3%);
		opacity: 0.35;
	}

	h1 {
		font-size: 150%;
		padding: 0 0 1.5%;
		border-bottom: 0.1rem solid #aaa;
		text-align: center;
	}

	.close {
		position: absolute;
		top: 50%;
		right: 5%;
		transform: translateY(-70%);
	}

	.footer {
		background-color: rgba(0, 0, 0, 0.85);
		padding: 2%;
		text-align: center;
	}
</style>
