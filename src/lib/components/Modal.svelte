<script>
	import { createEventDispatcher, getContext } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { t } from 'svelte-i18n';
	import ButtonGeneral from './ButtonGeneral.svelte';
	import ButtonIcon from './ButtonIcon.svelte';

	export let title = '';
	export let disabled = false;
	export let exchange = false;

	const closeModal = getContext('closeModal');

	const dispatch = createEventDispatcher();
	const cancel = () => dispatch('cancel');
	const confirm = () => dispatch('confirm');
</script>

<div
	class="modal"
	class:exchange
	aria-label=""
	on:mousedown|self={closeModal}
	in:fade={{ duration: 200 }}
	out:fade={{ duration: 80 }}
>
	<div
		class="container"
		in:fly={{ y: 20, duration: 250, opacity: 1 }}
		out:fly={{ y: 50, duration: 100, opacity: 1 }}
	>
		<div class="row">
			{#if exchange}
				<div class="item-picture">
					<div class="wrapper">
						<slot name="picture" />
					</div>
				</div>
			{/if}

			<div class="content">
				<div class="header">
					<h1>{title}</h1>
					<div class="close">
						<ButtonIcon on:click={closeModal} dark />
					</div>
				</div>

				<div class="body">
					<slot />
				</div>
			</div>
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

	.row {
		display: flex;
		width: 100%;
	}

	/* Modal Picture */
	.item-picture {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		flex-basis: 30%;
		width: 30%;
		padding: 7.5% 0;
	}

	.item-picture .wrapper {
		width: 60%;
		margin-right: 12.5%;
		border-radius: 100%;
		aspect-ratio: 1/1;
		background-image: linear-gradient(#a7785e, #cda46e);
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.wrapper::before,
	.wrapper::after,
	.wrapper :global(picture)::before {
		width: 100%;
		aspect-ratio: 1/1;
		position: absolute;
		bottom: -2%;
		content: '';
		border-radius: 100%;
		transform-origin: bottom;
		border: 0.05rem dashed rgba(160, 97, 19, 0.85);
		z-index: -1;
		opacity: 0.6;
	}

	.wrapper::before {
		transform: scale(1.065);
	}

	.wrapper::after {
		border-style: solid;
		transform: scale(1.17);
	}

	.wrapper :global(picture)::before {
		border-style: solid;
		transform: scale(1.7);
		bottom: -15%;
		opacity: 0.075;
		border-width: 0.01rem;
	}

	.wrapper :global(picture) {
		display: flex;
		width: 100%;
		justify-content: center;
		align-items: center;
		position: relative;
	}
	.wrapper :global(picture) :global(img) {
		width: 75%;
	}

	.wrapper :global(picture)::after {
		content: '';
		border-radius: 100%;
		position: absolute;
		bottom: -120%;
		width: 100%;
		height: 100%;
		background-color: rgba(160, 97, 19, 0.1);
		mask-image: linear-gradient(black, transparent 30%);
	}

	/* Modal Content */
	.content {
		width: 100%;
	}

	.exchange .content {
		flex-basis: 68%;
		width: 68%;
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

	@media screen and (max-width: 700px) {
		.container {
			border-top-right-radius: 5vw;
		}
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

	.exchange h1 {
		text-align: left;
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
