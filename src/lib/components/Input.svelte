<script>
	import { createEventDispatcher } from 'svelte';

	export let value = '';
	export let placeholder = '';
	export let disabled = false;
	export let error = false;
	export let hideValue = false;
	export let proInput = false;

	const dispatch = createEventDispatcher();
	const onInput = (e) => dispatch('input', e);
	const onChange = (e) => dispatch('change', e);
</script>

<input
	class:proInput
	class:error
	class:hideValue
	type="text"
	{value}
	{placeholder}
	{disabled}
	on:change={onChange}
	on:input={onInput}
/>

<style>
	input {
		display: block;
		padding: 0.7rem 1.5rem;
		border-radius: 2rem;
		outline: unset;
		border-color: rgba(0, 0, 0, 0.8);
		border-style: dotted dashed solid;
		border-width: 2px;
		font-size: 120%;
		width: 100%;
		text-align: center;
		background-color: transparent;
		transition: all 0.25s;
	}

	input:disabled {
		opacity: 0.5;
	}

	input:focus {
		background-color: rgba(255, 255, 255, 0.5);
		border-color: orange;
	}

	input::placeholder {
		font-family: var(--hsr-font);
		transform: scale(0.8);
		letter-spacing: 0;
	}

	input.proInput {
		font-size: 180%;
		padding: 2% 8%;
	}

	input.error {
		border-color: #c34b2d;
		color: #c34b2d;
	}
	input.hideValue {
		text-transform: uppercase;
		font-weight: bolder;
		font-family: var(--hsr-neue);
		letter-spacing: 0.5vw;
	}
</style>
