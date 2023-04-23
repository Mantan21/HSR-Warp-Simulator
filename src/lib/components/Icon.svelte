<script>
	import { assets } from '$lib/stores/app-store';

	export let type = '';
	export let style = '';

	$: pic = {
		regularpass: $assets['regular-pass.webp'],
		specialpass: $assets['special-pass.webp']
	};
</script>

<img src={pic[type]} alt={type} {style} />

<style>
	img {
		width: 30px;
	}
</style>
