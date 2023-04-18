<button>
	<slot />
</button>

<style>
	button {
		background-color: var(--color-text);
		color: #222;
		font-weight: bold;
		padding: 0.55rem 0;
		font-size: 120%;
		border-radius: 10rem;
		display: inline-block;
		position: relative;
		margin: 0 0.2rem;
		width: calc(0.138 * var(--width));
		max-width: 10rem;
		min-width: 7rem;
	}

	button::after {
		content: '';
		width: 95%;
		height: 80%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border: 0.08rem solid #bbb;
		border-radius: 5rem;
	}

	@media screen and (max-width: 750px) {
		button {
			font-size: 100%;
			margin: 0;
			padding: 0.45rem 0.7rem;
		}
	}

	:global(.mobileLandscape) button {
		font-size: 100%;
		min-width: unset;
		width: calc(0.13 * var(--width));
		margin: 0 0.1rem;
		padding: 0.45rem 0;
	}
</style>
