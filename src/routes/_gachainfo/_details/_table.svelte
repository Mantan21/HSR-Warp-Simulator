<script>
	import { t } from 'svelte-i18n';

	export let type = 'character';
	export let data = [];
</script>

<div class="table">
	<div>
		<div class="row head">
			<div class="cell">{$t(type)}</div>
		</div>

		<div class="body">
			<div class="row">
				{#each data.filter(({ name }) => name) as { name, rateup }}
					<div class="cell">
						{#if rateup}
							<span class="up" />
						{/if}
						{$t(name)}
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	.table {
		width: 100%;
	}
	.row {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		border-left: solid #b4b6b6 0.1rem;
	}

	.row.head {
		background-color: rgba(209, 209, 209, 0.4);
		border: solid #b4b6b6 0.1rem;
		display: flex;
		justify-content: center;
		color: #9d8563;
	}

	.cell {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		align-self: flex-end;
		padding: calc(0.0125 * var(--width));
		text-align: center;
		line-height: calc(0.0175 * var(--width));
		height: calc(0.05 * var(--width));
	}

	.body .cell {
		width: 25%;
		flex-basis: 25%;
		border: solid #b4b6b6;
		border-width: 0 0.1rem 0.1rem 0;
		font-size: calc(0.013 * var(--width));
	}

	span.up {
		display: inline-block;
		background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAWCAMAAAD3n0w0AAAAVFBMVEUAAAD/QSz/U0L/TTn/U0D/UkD/t3r/UT3/uHr/qXD/p3H/W0X/UD3/5pT/4pL/3Y//2Iz/0or/zof/yYT/wH//uHr/dVX/tXn/j2X/lGX/e1j/6ZabIbgrAAAAG3RSTlMABSIQKhuCDIhyZzcW9ujbzL2xp5eURnxgWFG10NE3AAAAgElEQVQY07WOSRLDIAwEgwQYMN6XLPP/fwZSlQLLvnqOrekaPW6NumJEZxy951NRTxNJ2Oxd10rfOMCytEdgFFP8QcreHCCtGa7xYLdDhoOufX7hl3ft0wJsG7CY2u7hSDv0lR89rFGKLAIXe36aVEl0NuXzkFmmgco4/89c5mW+QIEGLvlM+0EAAAAASUVORK5CYII=');
		background-size: contain;
		width: 10%;
		aspect-ratio: 1/1;
	}

	@media screen and (max-width: 550px) {
		.body .cell {
			width: 50%;
			flex-basis: 50%;
		}
	}
</style>
