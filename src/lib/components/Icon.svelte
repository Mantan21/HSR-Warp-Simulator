<script>
	export let type = '';
	export let style = '';

	$: pic = {
		regularpass: '/images/utils/regular-pass.webp',
		specialpass: '/images/utils/special-pass.webp'
	};
</script>

<img src={pic[type]} alt={type} {style} />

<style>
	img {
		width: 30px;
	}
</style>
