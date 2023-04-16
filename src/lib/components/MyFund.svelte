<script>
	export let type = 'stellarjade';
	const allowAddition = type === 'stellarjade';

	const iconList = {
		stellarjade: 'stellar-jade.webp',
		regularpass: 'regular-pass-clean.webp',
		specialpass: 'special-pass-clean.webp'
	};
</script>

<button class={type}>
	<div class="icon">
		<img src="/images/utils/{iconList[type]}" alt="Icon" />
	</div>
	<span class="amount">
		<slot />
	</span>
	{#if allowAddition}
		<span class="plus"> <i class="hsr-plus" /> </span>
	{/if}
</button>

<style>
	button {
		display: inline-flex;
		align-items: center;
		justify-content: space-between;
		width: fit-content;
		height: 1.7rem;
		background-color: rgba(0, 0, 0, 0.3);
		border-radius: 50px;
		color: #fff;
		vertical-align: middle;
		text-align: center;
		position: relative;
		margin: 0 1.5rem 0 0;
		padding: 0 0.5rem 0 0;
		border: 0.7px solid #656565;
	}
	:global(.mobileLandscape) button {
		height: 1.4rem;
	}

	span.amount {
		min-width: 3.5rem;
		font-size: 130%;
		opacity: 0.8;
	}

	:global(.mobileLandscape) span.amount {
		font-size: 120%;
		min-width: 2.5rem;
	}

	span.plus {
		color: var(--color-second);
		line-height: 0;
		font-size: 130%;
	}

	img {
		width: 2.5rem;
		aspect-ratio: 1/1;
	}
	:global(.mobileLandscape) img {
		width: 2rem;
	}

	@media screen and (max-width: 900px) {
		button {
			margin: 0.3rem 0;
		}
	}
</style>
