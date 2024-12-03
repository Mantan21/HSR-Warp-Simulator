<script>
	import Abundance from './path/abundance.svelte';
	import Destruction from './path/destruction.svelte';
	import Erudition from './path/erudition.svelte';
	import Harmony from './path/harmony.svelte';
	import Hunt from './path/hunt.svelte';
	import Nihility from './path/nihility.svelte';
	import Preservation from './path/preservation.svelte';
	import Remembrance from './path/remembrance.svelte';

	export let path = '';
	export let dark = false;

	const paths = {
		abundance: Abundance,
		destruction: Destruction,
		erudition: Erudition,
		harmony: Harmony,
		hunt: Hunt,
		nihility: Nihility,
		preservation: Preservation,
		remembrance: Remembrance
	};
</script>

{#if path in paths}
	<svelte:component this={paths[path]} {dark} />
{/if}
