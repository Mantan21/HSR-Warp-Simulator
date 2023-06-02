<script>
	export let rarity = 3;

	const removeAfterComplete = (el) => {
		el.addEventListener('animationend', () => el.remove());
	};
</script>

<div class="light anim star{rarity}" use:removeAfterComplete>
	<div class="border anim" use:removeAfterComplete />
</div>
<div class="light anim star{rarity}">
	<div class="donut donut1 anim" use:removeAfterComplete />
</div>

<div class="light anim star{rarity}" use:removeAfterComplete>
	<div class="donut donut2 anim" use:removeAfterComplete />
</div>

<div class="light anim star{rarity}" use:removeAfterComplete>
	<div class="dotted-border anim" use:removeAfterComplete />
</div>

<div class="anim overlay star{rarity}" use:removeAfterComplete />
<div class="anim shadow" use:removeAfterComplete />

<style>
	.light {
		pointer-events: none;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		animation: lightOpacity 0.8s ease forwards;
	}

	.light > div {
		border-radius: 100%;
		aspect-ratio: 1/1;
	}

	.border {
		width: 80%;
		border: calc(0.003 * var(--screen-width)) solid #fff;
		animation: border 0.8s cubic-bezier(0.27, 0.785, 0.905, 0.295) forwards;
	}

	.star3 .border,
	.star3 .border::after,
	.star3 .border::before {
		/* prettier-ignore */
		box-shadow: 0 0 calc(0.005 * var(--screen-width)) #a3d3ef,
						0 0 calc(0.005 * var(--screen-width)) #a3d3ef,
						0 0 calc(0.02 * var(--screen-width)) rgba(109, 160, 237, 0.3),
						0 0 calc(0.05 * var(--screen-width)) rgba(109, 160, 237, .7),
						inset 0 0 calc(0.02 * var(--screen-width)) rgba(109, 160, 237, 0.3),
						inset 0 0 calc(0.05 * var(--screen-width)) rgba(109, 160, 237, 0.7);
	}
	.star4 .border,
	.star4 .border::after,
	.star4 .border::before {
		/* prettier-ignore */
		box-shadow: 0 0 calc(0.005 * var(--screen-width)) #daa3ef,
						0 0 calc(0.005 * var(--screen-width)) #daa3ef,
						0 0 calc(0.02 * var(--screen-width)) rgba(188, 19, 254, 0.3),
						0 0 calc(0.05 * var(--screen-width)) rgba(188, 19, 254, .7),
						inset 0 0 calc(0.02 * var(--screen-width)) rgba(188, 19, 254, 0.3),
						inset 0 0 calc(0.05 * var(--screen-width)) rgba(188, 19, 254, 0.7);
	}
	.star5 .border,
	.star5 .border::after,
	.star5 .border::before {
		/* prettier-ignore */
		box-shadow: 0 0 calc(0.005 * var(--screen-width)) #efe5a3,
						0 0 calc(0.005 * var(--screen-width)) #efe5a3,
						0 0 calc(0.02 * var(--screen-width)) rgba(255, 205, 56, 0.3),
						0 0 calc(0.05 * var(--screen-width)) rgba(255, 205, 56, .7),
						inset 0 0 calc(0.02 * var(--screen-width)) rgba(255, 205, 56, 0.3),
						inset 0 0 calc(0.05 * var(--screen-width)) rgba(255, 205, 56, 0.7);
	}

	.border::after,
	.border::before {
		content: '';
		position: absolute;
		width: 2%;
		top: 50%;
		aspect-ratio: 1/1;
		background-color: #fff;
		border-radius: 100%;
		z-index: +1;
	}
	.border::after {
		transform: translate(-60%, -50%);
		left: 0;
	}
	.border::before {
		right: 0;
		transform: translate(60%, -50%);
	}

	.donut {
		width: 80%;
		opacity: 0.3;
		mask-image: radial-gradient(circle farthest-side at center, transparent 70%, white 31%);
	}
	.star3 .donut {
		background-color: #5e9fff;
	}
	.star4 .donut {
		background-color: #c848fb;
	}
	.star5 .donut {
		background-color: #fdc828;
	}

	.donut1 {
		animation: donut1 0.8s cubic-bezier(0.27, 0.785, 0.905, 0.295) forwards;
	}
	.donut2 {
		animation: donut2 0.8s cubic-bezier(0.27, 0.785, 0.905, 0.295) forwards;
	}

	.dotted-border {
		width: 24%;
		border: calc(0.0035 * var(--screen-width)) dashed;
		opacity: 0.2;
		animation: borderDotted 0.8s cubic-bezier(0.27, 0.785, 0.905, 0.295) forwards;
	}
	.star3 .dotted-border {
		border-color: #5e9fff;
	}
	.star4 .dotted-border {
		border-color: #c848fb;
	}
	.star5 .dotted-border {
		border-color: #fdc828;
	}

	.overlay,
	.shadow {
		width: 100vw;
		height: 100vh;
		top: 0;
		left: 0;
		position: fixed;
	}
	.overlay {
		animation: overlay 0.8s ease forwards;
	}
	.star3.overlay {
		background-image: linear-gradient(45deg, rgba(109, 160, 237, 0.5), rgba(109, 160, 237, 0.15));
	}
	.star4.overlay {
		background-image: linear-gradient(45deg, rgba(188, 19, 254, 0.5), rgba(188, 19, 254, 0.15));
	}
	.star5.overlay {
		background-image: linear-gradient(45deg, rgba(255, 222, 122, 0.5), rgba(255, 222, 122, 0.15));
	}

	.shadow {
		background-color: #000;
		opacity: 0;
		animation: reverseOpacity 0.8s ease forwards;
		z-index: +1;
	}

	@keyframes border {
		0% {
			transform: scale(0) rotate(60deg);
			opacity: 1;
		}
		100% {
			transform: scale(2) rotate(-60deg);
			opacity: 0;
		}
	}

	@keyframes borderDotted {
		0% {
			transform: scale(1) rotate(0deg);
		}
		100% {
			transform: scale(1.7) rotate(60deg);
		}
	}

	@keyframes donut1 {
		0% {
			transform: scale(0);
		}
		80% {
			transform: scale(1.2);
		}
		100% {
			transform: scale(1.5);
		}
	}

	@keyframes donut2 {
		0% {
			transform: scale(0);
		}
		70% {
			transform: scale(1.2);
		}
		100% {
			transform: scale(1.5);
		}
	}

	@keyframes lightOpacity {
		0% {
			opacity: 1;
		}

		70% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}

	@keyframes overlay {
		0% {
			opacity: 0;
		}

		40% {
			opacity: 0;
		}
		70% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}

	@keyframes reverseOpacity {
		0% {
			opacity: 0.5;
		}
		100% {
			opacity: 0;
		}
	}
</style>
