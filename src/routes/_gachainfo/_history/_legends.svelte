<script>
	import { t } from 'svelte-i18n';

	export let banner;
</script>

{#if !['starter', 'regular'].includes(banner)}
	<div class="legend">
		{#each ['win', 'lose', 'guaranteed'] as v}
			<div class="item">
				<span class="star5">
					<i class="hsr-{v}" style="font-size: larger;" />
				</span>
				&nbsp; : &nbsp; {$t(`history.${v}`)}
			</div>
		{/each}
	</div>
{/if}

<style>
	.star5 {
		color: #bd6932;
	}

	i {
		display: inline-block;
		transform: translateY(10%);
	}

	.legend {
		font-size: calc(0.013 * var(--width));
	}

	.legend {
		display: flex;
		flex-wrap: wrap;
		margin: 1% auto 0;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		font-weight: 600;
	}

	.legend .item {
		padding-left: 1.5rem;
		flex-basis: 33.333333333%;
		text-align: center;
	}

	@media screen and (max-width: 640px) {
		.legend .item {
			flex-basis: 50%;
			text-align: left;
		}
	}
</style>
