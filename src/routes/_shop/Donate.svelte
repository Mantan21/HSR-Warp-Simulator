<script>
	import { fade } from 'svelte/transition';
	import { assets } from '$lib/stores/app-store';
	import { supporterList } from '$lib/helpers/donation';

	import ShopGroupItem from './_shop-group-item.svelte';
	import ShopGroup from './_shop-group.svelte';

	let donatorHeight;
</script>

<div class="section" in:fade={{ duration: 250 }}>
	<div class="content-group" style="--option-height:{donatorHeight}px">
		<ShopGroup>
			<ShopGroupItem>
				<a class="donate-method kofi" href="https://ko-fi.com/mantan21" target="_blank">
					<div class="item-pic">
						<picture>
							<img src={$assets['donate-kofi.png']} alt="Ko-Fi" />
						</picture>
						<div class="via">
							<span class="name">Donate Via Ko-Fi</span>
						</div>
					</div>
				</a>
			</ShopGroupItem>

			<ShopGroupItem>
				<a class="donate-method trakteer" href="https://trakteer.id/mantan21" target="_blank">
					<div class="item-pic">
						<picture>
							<img src={$assets['donate-trakteer.png']} alt="Trakteer" />
						</picture>
						<div class="via">
							<span class="name">Donate Via Trakteer</span>
						</div>
					</div>
				</a>
			</ShopGroupItem>
		</ShopGroup>
	</div>
	<div class="donationlist" bind:clientHeight={donatorHeight}>
		{#await supporterList() then listOfSupporters}
			{#if listOfSupporters.length > 0}
				{#each listOfSupporters as { name, message, amount, date, type }, i}
					{@const platform =
						type === 'tip' ? 'trakteer' : type === 'donation' ? 'saweria' : 'ko-fi'}
					<div class="donation-item {platform}" in:fade={{ duration: 300, delay: i * 20 }}>
						<div class="supporter">
							<div class="info">
								<div class="name">New support from <span> {name} </span></div>
								<span class="message">{message ? `"${message}"` : ''}</span>
								<span class="platform">✧ &nbsp; via {platform}</span>
								<span class="time"> ✧ &nbsp; {date}</span>
							</div>
							<div class="amount">
								<span>{amount}</span>
							</div>
						</div>
					</div>
				{/each}
			{/if}
		{/await}
	</div>
</div>

<style>
	.section {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.content-group {
		height: calc(var(--screen-height) - var(--option-height) - 75px);
		flex-grow: 1;
	}

	:global(.mobileLandscape) .content-group {
		height: calc(var(--screen-height) - var(--option-height) - 35px);
	}

	.donate-method {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		text-align: center;
		color: #000;
	}

	.donate-method img {
		transform: translateY(-25%);
	}
	.kofi img {
		width: 30%;
	}
	.trakteer img {
		width: 75%;
	}

	picture {
		display: flex;
		width: 100%;
		aspect-ratio: 1/1;
		overflow: hidden;
		justify-content: center;
		align-items: center;
	}

	.item-pic {
		height: 100%;
		border-top-right-radius: 1.5rem;
		width: 100%;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(255, 255, 255, 0.8);
		transition: all 0.25s;
	}

	.item-pic:hover {
		background-color: #fff;
	}

	.item-pic .via {
		width: 100%;
		bottom: 0;
		left: 0;
		position: absolute;
		display: block;
		font-size: calc(0.075 * var(--item-width));
		text-align: center;
		padding: 10% 5%;
	}

	.donationlist {
		display: flex;
		flex-wrap: wrap;
		overflow: auto;
		height: 100%;
		justify-content: space-between;
		align-items: flex-start;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}

	.donation-item {
		width: 50%;
		margin: 0;
		padding: 0.5%;
	}

	.donation-item .supporter {
		background-color: rgba(255, 255, 255, 0.7);
		width: 100%;
		height: 90px;
		padding: 2%;
		border-top-right-radius: 1rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #000;
	}

	@media screen and (max-width: 640px) {
		.donation-item {
			width: 100%;
		}
		.supporter {
			height: unset !important;
		}
		.info {
			overflow-y: unset !important;
		}
	}

	:global(.mobile) .recent {
		max-height: 50%;
	}
	:global(.mobile) .supporter {
		height: 5rem;
	}
	:global(.mobile) .info {
		overflow-y: auto;
	}

	.info {
		width: 100%;
		height: 100%;
		overflow-y: auto;
	}

	.info::-webkit-scrollbar {
		display: none;
	}

	.info .name {
		margin-left: 0.5rem;
	}
	.info .name span {
		font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode',
			Geneva, Verdana, sans-serif;
		font-size: larger;
		font-weight: bold;
	}

	.message {
		display: block;
		font-weight: 600;
		padding: 0.4rem 1rem;
	}

	.ko-fi .platform {
		color: #127399;
		margin-right: 0.5rem;
	}
	.sociabuzz .platform {
		color: #4f8d28;
		margin-right: 0.5rem;
	}
	.saweria .platform {
		color: rgb(213, 142, 18);
		margin-right: 0.5rem;
	}
	.trakteer .platform {
		color: #be1e2d;
	}

	.time {
		color: #575859;
	}

	.amount span {
		width: fit-content;
		font-size: 1rem;
		white-space: nowrap;
		padding: 0.4rem 0.6rem;
		border-radius: 1rem;
		color: #fff;
		font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode',
			Geneva, Verdana, sans-serif;
		font-weight: bold;
	}

	.donation-item.ko-fi .amount span {
		background-color: #24ade1;
	}
	.donation-item.saweria .amount span {
		background-color: #e2a12d;
	}
	.donation-item.sociabuzz .amount span {
		background-image: linear-gradient(45deg, #3fa9f5 30%, #78c845);
	}
	.donation-item.trakteer .amount span {
		background-color: #be1e2d;
	}
</style>
