<script>
	import Scrollable from '$lib/components/Scrollable.svelte';
</script>

<div class="controller">
	<div class="information">
		<span class="onplay">"Embers"</span>
		<div class="description">
			<Scrollable>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis nesciunt sunt earum
					fugiat tenetur sequi voluptatem quam. Quidem odit atque, molestias dolore consectetur
					tempora beatae qui, ducimus, veritatis earum voluptatibus!
				</p>
			</Scrollable>
		</div>
	</div>
	<div class="controls">
		<button class="active"> <i class="hsr-loop" /> Loop </button>
		<button> <i class="hsr-suffle" /> Suffle </button>
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

	button:hover {
		opacity: 1;
	}
	button:active {
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
