<script>
	export let item = '';
</script>

<div class="light-cone">
	<div class="layer layer-back" />
	<img src="/images/light-cones/5star/{item}.webp" alt="Light Cones" />
	<div class="layer layer-front" />
</div>

<style>
	.light-cone {
		width: 100%;
		height: auto;
		aspect-ratio: 53/74;
		position: relative;
	}

	img {
		width: 100%;
		position: relative;
	}

	.layer {
		position: absolute;
		border-radius: 0.4rem;
		width: 94%;
	}

	.layer-front {
		height: 97%;
		background-image: linear-gradient(135deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0) 50%);
		box-shadow: 2px 2px 1px #bbb, 2px -1px 1px rgba(255, 255, 255, 0.8),
			-1px 0px 1px rgba(255, 255, 255, 0.8);
		top: -2%;
		left: -2.5%;
	}

	.layer-back {
		height: 90%;
		bottom: -2%;
		right: -2%;
		background-image: linear-gradient(-45deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0) 50%);
		box-shadow: 2px 2px 1px rgba(255, 255, 255, 0.8), 2px -1px 1px rgba(255, 255, 255, 0.8),
			-1px 0px 1px rgba(255, 255, 255, 0.8);
	}
</style>
