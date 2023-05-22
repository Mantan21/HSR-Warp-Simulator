<script>
	export let dark = false;
	export let visibility = 'auto';
</script>

<div class="scroll {visibility}" class:dark>
	<slot />
</div>

<style>
	.scroll {
		width: 100%;
		height: 100%;
		scroll-behavior: smooth;
		overflow: auto;
	}

	.scroll.hidden::-webkit-scrollbar {
		display: none;
	}

	.scroll::-webkit-scrollbar {
		position: absolute;
		width: 3px;
		height: 3px;
		display: block;
	}

	.scroll::-webkit-scrollbar-track {
		background-color: rgba(210, 198, 156, 0.2);
	}
	.scroll::-webkit-scrollbar-thumb {
		border-radius: 5px;
		transition: background 0.3s;
		background-color: rgba(255, 255, 255, 0.5);
	}

	.scroll::-webkit-scrollbar-thumb:hover {
		background-color: rgba(255, 255, 255, 0.8);
	}

	/* Dark Theme */
	.scroll::-webkit-scrollbar-track {
		background-color: rgba(139, 138, 173, 0.2);
	}
	.scroll.dark::-webkit-scrollbar-thumb {
		background-color: rgba(0, 0, 0, 0.5);
	}
	.scroll.dark::-webkit-scrollbar-thumb:hover {
		background-color: rgba(0, 0, 0, 1);
	}
</style>
