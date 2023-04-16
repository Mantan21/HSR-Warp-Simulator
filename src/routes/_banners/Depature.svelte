<script>
</script>

<section>
	<img src="/images/background/depature-bg.webp" alt="Background" class="bg" />

	<div class="character-group">
		<div class="gepard character">
			<img src="/images/banners/depature/1.0/gepard.webp" alt="gepard" />
		</div>
		<div class="bailu character">
			<img src="/images/banners/depature/1.0/bailu.webp" alt="bailu" />
		</div>
		<div class="yanqing character">
			<img src="/images/banners/depature/1.0/yanqing.webp" alt="Yanqing" />
		</div>
		<div class="clara character">
			<img src="/images/banners/depature/1.0/clara.webp" alt="clara" />
		</div>
		<div class="bronya character">
			<img src="/images/banners/depature/1.0/bronya.webp" alt="bronya" />
		</div>
		<div class="himeko character">
			<img src="/images/banners/depature/1.0/himeko.webp" alt="Himeko" />
		</div>
		<div class="welt character">
			<img src="/images/banners/depature/1.0/welt.webp" alt="Welt" />
		</div>
	</div>
</section>

<style>
	section {
		width: 100%;
		height: 100%;
		background-image: url('/images/background/beginner.jpg');
		background-size: cover;
		background-position: center;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	img.bg {
		width: 100vw;
		height: 100%;
		object-fit: cover;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) scale(1.1);
		filter: blur(10px);
		-webkit-filter: blur(10px);
	}

	.character-group {
		width: 95%;
		height: 100%;
		max-height: 50vw;
		max-width: 190vh;
		position: relative;
		margin-left: 5%;
	}
	.character-group .character {
		position: absolute;
	}

	.character-group img {
		object-fit: contain;
		width: 100%;
	}

	.welt {
		width: 47%;
		top: -5%;
		left: 53%;
		transform: translateX(-50%);
		mask-image: linear-gradient(black 70%, transparent 90%);
	}

	.himeko {
		width: 53%;
		top: 9%;
		left: 44%;
		mask-image: linear-gradient(black 70%, transparent 90%);
	}
	.bronya {
		width: 38%;
		left: 14%;
		top: 4%;
		mask-image: linear-gradient(black 70%, transparent 90%);
	}
	.clara {
		width: 23%;
		left: 68%;
		top: 9%;
		mask-image: linear-gradient(black 50%, transparent 80%);
	}
	.yanqing {
		left: -6%;
		top: 4%;
		width: 49%;
	}
	.bailu {
		left: 74%;
		width: 23%;
		top: 22%;
	}
	.gepard {
		left: 25%;
		width: 20%;
		top: 4%;
	}
</style>
