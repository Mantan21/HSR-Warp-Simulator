<script>
	let asideWidth = 0;
</script>

<div class="sidebar" bind:clientWidth={asideWidth} style="--width: {asideWidth}px">
	<nav>
		<div class="nav-item">
			<div class="pfp">
				<img src="/icons/icon-72x72.png" alt="PFP" />
			</div>
			<div class="text">
				<span class="chat-target">HSR Warp Sim</span>
				<span class="online">• Online</span>
			</div>
			<i class="hsr-honor" />
		</div>
	</nav>
</div>

<style>
	.sidebar {
		max-width: 450px;
		width: 30%;
		min-width: 220px;
		padding-left: 2%;
		padding-right: 1%;
		background-color: rgba(40, 40, 40, 0.3);
		border-right: 1px solid rgba(255, 255, 255, 0.5);
	}

	.nav-item {
		display: flex;
		align-items: center;
		background-color: #e2e1e6;
		color: #323234;
		position: relative;
		padding: 2%;
	}
	.pfp {
		width: 15%;
		aspect-ratio: 1/1;
		border-radius: 100%;
		overflow: hidden;
	}
	img {
		width: 100%;
		height: 100%;
	}

	.nav-item .text {
		display: flex;
		flex-direction: column;
		padding-left: 3%;
	}
	span.chat-target {
		display: block;
		font-size: larger;
	}
	span.online {
		color: green;
		display: block;
		margin-top: 5%;
	}

	.nav-item i {
		right: 0;
		top: 0;
		position: absolute;
		font-size: calc(0.2 * var(--width));
		color: #ccc;
		mask-image: linear-gradient(to top, transparent 25%, rgba(0, 0, 0, 0.8));
	}
</style>
