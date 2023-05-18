<script>
	import { assets } from '$lib/stores/app-store';

	export let type = '';
	export let style = '';

	$: pic = {
		regularpass: $assets['regular-pass.webp'],
		specialpass: $assets['special-pass.webp'],
		eidolon4: $assets['eidolon-4star.webp'],
		eidolon5: $assets['eidolon-5star.webp'],
		embers: $assets['undying-embers.webp'],
		starlight: $assets['undying-starlight.webp'],
		oneiric: $assets['oneiric-shard.webp'],
		stellarjade: $assets['stellar-jade.webp']
	};
</script>

<img src={pic[type]} alt={type} {style} crossorigin="anonymous" />

<style>
	img {
		width: 30px;
	}
</style>
