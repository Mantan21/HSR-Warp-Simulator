<script>
	import { fly } from '$lib/helpers/transition';
</script>

<div class="character-group">
	<div class="gepard character" in:fly={{ x: -30, duration: 1500, delay: 250 }}>
		<img src="/images/banners/starter/1.0/gepard.webp" alt="gepard" />
	</div>
	<div class="bailu character" in:fly={{ x: -15, duration: 1500, delay: 250 }}>
		<img src="/images/banners/starter/1.0/bailu.webp" alt="bailu" />
	</div>
	<div class="yanqing character" in:fly={{ x: -15, duration: 1500, delay: 250 }}>
		<img src="/images/banners/starter/1.0/yanqing.webp" alt="Yanqing" />
	</div>
	<div class="clara character" in:fly={{ x: -30, duration: 1500, delay: 250 }}>
		<img src="/images/banners/starter/1.0/clara.webp" alt="clara" />
	</div>
	<div class="bronya character" in:fly={{ x: -15, duration: 1500, delay: 250 }}>
		<img src="/images/banners/starter/1.0/bronya.webp" alt="bronya" />
	</div>
	<div class="himeko character" in:fly={{ x: -15, duration: 1500, delay: 250 }}>
		<img src="/images/banners/starter/1.0/himeko.webp" alt="Himeko" />
	</div>
	<div class="welt character" in:fly={{ x: -30, duration: 1500, delay: 250 }}>
		<img src="/images/banners/starter/1.0/welt.webp" alt="Welt" />
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
		width: 71%;
		top: -3%;
		left: 38%;
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
