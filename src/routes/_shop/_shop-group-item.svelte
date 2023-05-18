<div class="item">
	<div class="item-content">
		<slot />
	</div>
</div>

<style>
	.item {
		flex-basis: var(--item-basis);
		width: var(--item-basis);
		aspect-ratio: 160/200;
		padding: calc(0.07 * var(--item-width));
	}

	@media screen and (min-width: 1440px) {
		.item {
			--item-width: 190px;
			flex-basis: unset;
			width: 190px;
		}
	}

	.item-content {
		height: 100%;
		display: flex;
		flex-direction: column;
		text-align: center;
		position: relative;
		border: 0.15rem solid transparent;
		border-top-right-radius: 1.5rem;
		transition: 0.2s all;
	}

	.item-content::before {
		content: '';
		width: 100%;
		height: 100%;
		border: 1px solid var(--color-second);
		top: 3%;
		left: -5%;
		position: absolute;
		z-index: -1;
		border-top-right-radius: 1.5rem;
	}

	.item-content:hover {
		border-color: #fff;
	}
</style>
