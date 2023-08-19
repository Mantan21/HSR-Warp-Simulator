<script>
	import { getContext, createEventDispatcher } from 'svelte';
	import { playSfx } from '$lib/helpers/sounds/audiofx';

	export let max;
	export let min;
	export let value;
	export let disabled = false;
	export let controller = false;
	export let dark = false;

	$: rangeStyle = `--min: ${min || 0}; --max: ${max || 0}; --val: ${value || 0}`;

	const dispatch = createEventDispatcher();
	const setValue = getContext('setValue');
	const changeRange = (e) => {
		const { value } = e.target;
		dispatch('input', { value });
		setValue(parseInt(value));
	};

	let timeout;
	let interval;
	const rangeControl = (plusOrMinus = 'plus') => {
		const change = plusOrMinus === 'plus' ? plus : minus;
		change();
		timeout = setTimeout(() => {
			interval = setInterval(change, 50);
		}, 500);

		const isMinRange = plusOrMinus === 'min' && value <= 1;
		const isMaxRange = plusOrMinus === 'plus' && value >= max;
		if (isMinRange || isMaxRange) return;
		playSfx('click2');
	};

	const plus = () => {
		if (value >= max) return clearTimers();
		changeRange({ target: { value: value + 1 } });
	};

	const minus = () => {
		if (value <= 1) return clearTimers();
		changeRange({ target: { value: value - 1 } });
	};

	const clearTimers = () => {
		clearTimeout(timeout);
		clearInterval(interval);
	};
</script>

<div class="range" class:dark>
	{#if controller}
		<div class="btn">
			<button
				disabled={isNaN(value) || value <= 1}
				on:touchstart|preventDefault|nonpassive={() => rangeControl('min')}
				on:mousedown|preventDefault={() => rangeControl('min')}
				on:mouseleave={clearTimers}
				on:mouseup={clearTimers}
				on:touchend={clearTimers}
			>
				<i class="hsr-minus" />
			</button>
		</div>
	{/if}
	<span>{min}</span>

	<input
		class="range"
		type="range"
		max={max || 0}
		min={min || 0}
		value={value || 0}
		on:input={changeRange}
		style={rangeStyle}
		{disabled}
	/>

	<span>{max}</span>

	{#if controller}
		<div class="btn">
			<button
				on:touchstart|preventDefault|nonpassive={() => rangeControl('plus')}
				on:mousedown|preventDefault={() => rangeControl('plus')}
				on:mouseleave={clearTimers}
				on:mouseup={clearTimers}
				on:touchend={clearTimers}
				disabled={isNaN(value) || value >= max}
			>
				<i class="hsr-plus" />
			</button>
		</div>
	{/if}
</div>

<style>
	.range {
		width: 100%;
		display: flex;
		align-items: center;
	}

	[type='range'] {
		--range: calc(var(--max) - var(--min));
		--ratio: calc((var(--val) - var(--min)) / var(--range));
		--sx: calc(0.5 * 1.5em + var(--ratio) * (100% - 1.5em));
		margin: 0;
		padding: 0;
		height: 1.5rem;
		background: transparent;
		font: 1rem/1 arial, sans-serif;
	}

	[type='range'],
	[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
	}

	[type='range']::-webkit-slider-runnable-track {
		box-sizing: border-box;
		border: none;
		width: 100%;
		height: 0.4rem;
		background: linear-gradient(to right, #a7785e, #cda46e) 0 / var(--sx) 100% no-repeat #bcbcbc;
		border-radius: 10px;
	}

	.dark [type='range']::-webkit-slider-runnable-track {
		background: linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1)) 0 / var(--sx) 100%
			no-repeat #bcbcbc;
	}

	[type='range']::-webkit-slider-thumb {
		box-sizing: border-box;
		border: none;
		border-radius: 0;
		width: 1.2rem;
		height: 1.2rem;
		background: #fff;
		margin-top: -0.45rem;
		border: 0.2rem solid #cda46e;
		border-radius: 100%;
	}

	.dark [type='range']::-webkit-slider-thumb {
		border: none;
		background-color: #000;
	}

	.range span {
		padding: 1% 2.5%;
		opacity: 0.7;
	}

	.btn button {
		background-color: rgba(255, 255, 255, 0.5);
		box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.2);
		padding: 0.1rem 1rem;
		line-height: 0;
		font-size: 120%;
		border-radius: 1rem;
		transition: 0.2s all;
		transform: scale(1.000001);
		border: 1px solid transparent;
	}

	.btn button:disabled {
		border: 1px solid #aaa;
		background-color: transparent;
	}

	.btn button:not(:disabled):active {
		transform: scale(0.9);
	}
</style>
