<script>
	import { fly } from '$lib/helpers/transition';
	import { bezier } from '$lib/helpers/easing';
	import { assets, liteMode } from '$lib/stores/app-store';
</script>

<div class="character-group" class:lite={$liteMode}>
	<div
		class="gepard character"
		in:fly={{ y: 50, opacity: 0.8, duration: 2000, easing: bezier(0.13, 0.14, 0, 1) }}
	>
		<img src={$assets['banner/1.0/gepard']} alt="gepard" crossorigin="anonymous" />
	</div>
	<div
		class="bailu character"
		in:fly={{ y: 50, opacity: 0.8, duration: 2000, easing: bezier(0.13, 0.14, 0, 1) }}
	>
		<img src={$assets['banner/1.0/bailu']} alt="bailu" crossorigin="anonymous" />
	</div>
	<div
		class="yanqing character"
		in:fly={{ y: 100, opacity: 0.8, duration: 2000, easing: bezier(0.13, 0.14, 0, 1) }}
	>
		<img src={$assets['banner/1.0/yanqing']} alt="Yanqing" crossorigin="anonymous" />
	</div>
	<div
		class="clara character"
		in:fly={{ y: 100, opacity: 0.8, duration: 2000, easing: bezier(0.13, 0.14, 0, 1) }}
	>
		<img src={$assets['banner/1.0/clara']} alt="clara" crossorigin="anonymous" />
	</div>
	<div
		class="bronya character"
		in:fly={{ y: 125, opacity: 0.8, duration: 2000, easing: bezier(0.13, 0.14, 0, 1) }}
	>
		<img src={$assets['banner/1.0/bronya']} alt="bronya" crossorigin="anonymous" />
	</div>
	<div
		class="himeko character"
		in:fly={{ y: 125, opacity: 0.8, duration: 2000, easing: bezier(0.13, 0.14, 0, 1) }}
	>
		<img src={$assets['banner/1.0/himeko']} alt="Himeko" crossorigin="anonymous" />
	</div>
	<div
		class="welt character"
		in:fly={{ y: 200, opacity: 0.8, duration: 2000, easing: bezier(0.13, 0.14, 0, 1) }}
	>
		<img src={$assets['banner/1.0/welt']} alt="Welt" crossorigin="anonymous" />
	</div>
</div>

<style>
	.character-group {
		width: 100%;
		height: 100%;
		position: relative;
	}

	:global(.mobileLandscape) .character-group {
		transform: scale(0.95);
	}

	.character-group .character {
		position: absolute;
	}
	.lite .character {
		mask-image: unset !important;
	}

	.character-group img {
		object-fit: contain;
		width: 100%;
	}

	.welt {
		width: 58.3%;
		top: -16.7%;
		left: 51.5%;
		transform: translateX(-50%);
		mask-image: linear-gradient(black 70%, transparent 90%);
	}

	.himeko {
		width: 58%;
		top: 3%;
		left: 42%;
		mask-image: linear-gradient(black 70%, transparent 90%);
	}
	.bronya {
		width: 50%;
		left: 0%;
		top: -8%;
		mask-image: linear-gradient(black 70%, transparent 90%);
	}
	.clara {
		width: 30.8%;
		left: 69.5%;
		top: -3%;
		mask-image: linear-gradient(black 50%, transparent 80%);
	}
	.yanqing {
		left: -25%;
		top: -5.5%;
		width: 63%;
	}
	.bailu {
		left: 77.3%;
		width: 31.2%;
		top: 13%;
	}
	.gepard {
		left: 14.5%;
		width: 26%;
		top: -5.7%;
	}
</style>
