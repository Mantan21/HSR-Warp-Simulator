<script>
	import { getContext } from 'svelte';
	import { isMobileLandscape, viewportWidth } from '$lib/stores/app-store';
	import { HOST } from '$lib/data/site-setup.json';

	import ButtonIcon from '$lib/components/ButtonIcon.svelte';
	import Header from '$lib/components/Header.svelte';
	import Sidebar from './_sidebar.svelte';

	export let show = false;
	const chatToggle = getContext('chatToggle');
	window.disqus_config = function () {
		this.page.url = HOST + '/feedback';
	};
</script>

<svelte:head>
	<script src="https://hsr-warpsim.disqus.com/embed.js" data-timestamp={+new Date()} async>
	</script>
</svelte:head>

<section class:show class:landscape={$isMobileLandscape}>
	<Header icon="chat" h2="Chat">
		<div class="close">
			<ButtonIcon on:click={chatToggle} />
		</div>
	</Header>

	<div class="container">
		{#if $viewportWidth > 640 || $isMobileLandscape}
			<Sidebar />
		{/if}
		<div class="chatroom">
			<div class="chats">
				<div id="disqus_thread" />
			</div>
		</div>
	</div>
</section>

<style>
	section {
		position: fixed;
		top: 0;
		left: 0;
		width: var(--screen-width);
		height: var(--screen-height);
		background-color: rgba(68, 68, 68, 0.75);
		backdrop-filter: blur(20px);
		pointer-events: none;
		opacity: 0;
		transition: opacity 0.25s;
		z-index: -100;
	}

	section.show {
		z-index: 100;
		pointer-events: unset;
		opacity: 1;
	}

	.container {
		width: 100%;
		height: 100%;
		display: flex;
	}
	.container > :global(div) {
		padding-top: 75px;
	}
	.landscape .container > :global(div) {
		padding-top: 45px;
	}

	.chatroom {
		width: 70%;
		padding-left: 2%;
	}

	.chats {
		padding: 5%;
		display: flex;
		flex-direction: column;
		height: 100%;
		position: relative;
		overflow-y: auto;
	}
	.chats::-webkit-scrollbar {
		display: none;
	}

	@media screen and (max-width: 640px) {
		.chatroom {
			width: 100%;
		}
	}
</style>
