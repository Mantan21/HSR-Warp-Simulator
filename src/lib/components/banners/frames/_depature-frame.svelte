<script>
	const chars = [
		{
			name: 'welt',
			combat_type: 'imaginary'
		},
		{
			name: 'bronya',
			combat_type: 'wind'
		},
		{
			name: 'himeko',
			combat_type: 'fire'
		},
		{
			name: 'yanqing',
			combat_type: 'ice'
		},
		{
			name: 'gepard',
			combat_type: 'ice'
		},
		{
			name: 'clara',
			combat_type: 'physical'
		},
		{
			name: 'bailu',
			combat_type: 'lightning'
		}
	];
</script>

<div class="content">
	{#each chars as { combat_type, name }}
		<div class="char-group {name}">
			<div class="name">
				<i class="hsr-{combat_type} icon-gradient {combat_type}" />
				<span>{name}</span>
			</div>
			<div class="stars">
				{#each Array(5) as _} <i class="hsr-star" />{/each}
			</div>
		</div>
	{/each}

	<div class="info">
		<span class="banner-name"> Starter Warp </span>
		<h1 class="banner-title">Depature Warp</h1>
		<div class="description">
			<p>
				20% off for set of Warps, and a <span>5</span>-star character is guaranteed within
				<span>50</span> Warps
			</p>
		</div>
	</div>
</div>

<style>
	.content {
		width: 100%;
		height: 100%;
		position: relative;
	}

	.info {
		position: absolute;
		bottom: 0;
		left: 0;
		padding-bottom: 3%;
	}

	.banner-name {
		font-size: calc(0.015 * var(--bw));
		padding: 1% 2.5%;
		border-top-right-radius: 2rem;
		border-bottom-right-radius: 2rem;
		background-color: #3d81ce;
	}

	h1.banner-title {
		font-size: calc(0.035 * var(--bw));
		padding: 2.5%;
		filter: drop-shadow(0.1rem 0.1rem 0.5rem #000);
	}

	.description {
		background-color: rgba(0, 0, 0, 0.5);
		padding: 2.5%;
		width: calc(0.425 * var(--bw));
		aspect-ratio: 5/1;
		display: flex;
		align-items: center;
	}
	.description p {
		font-size: calc(0.022 * var(--bw));
		font-weight: bold;
		line-height: normal;
	}

	.description span {
		color: #e6993d;
	}

	/* Char Name */
	.char-group {
		position: absolute;
	}
	.name {
		background-color: rgba(0, 0, 0, 0.65);
		height: calc(0.0235 * var(--bw));
		display: flex;
		align-items: center;
	}
	.name i {
		padding: 0 calc(0.01 * var(--bw));
		font-size: calc(0.025 * var(--bw));
	}
	.name span {
		display: block;
		padding-right: calc(0.01 * var(--bw));
		font-size: calc(0.02 * var(--bw));
		text-transform: capitalize;
	}

	.stars {
		padding-left: 17%;
		text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
		height: calc(0.025 * var(--bw));
		display: flex;
		align-items: center;
		font-size: calc(0.014 * var(--bw));
		line-height: 0;
	}

	.welt {
		left: 40%;
		top: 39.3%;
	}

	.himeko {
		left: 58.8%;
		top: 44.8%;
	}

	.bailu {
		right: 0;
		top: 43.3%;
	}
	.clara {
		left: 74%;
		top: 32.5%;
	}

	.gepard {
		top: 22.5%;
		left: 16.3%;
	}
	.yanqing {
		top: 29.8%;
		left: -0.5%;
	}
	.bronya {
		top: 44%;
		left: 20.8%;
	}
</style>
