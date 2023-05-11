<div class="loader-ripple">
	<span />
	<span />
</div>

<style>
	.loader-ripple {
		display: inline-block;
		position: relative;
		width: 80px;
		height: 80px;
	}
	.loader-ripple span {
		position: absolute;
		border: 4px solid rgb(230, 156, 20);
		opacity: 1;
		border-radius: 50%;
		animation: loader-ripple 1.2s cubic-bezier(0, 0.2, 0.8, 1) infinite;
	}
	.loader-ripple span:nth-child(2) {
		animation-delay: -0.5s;
	}
	@keyframes loader-ripple {
		0% {
			top: 36px;
			left: 36px;
			width: 0;
			height: 0;
			opacity: 0;
		}
		4.9% {
			top: 36px;
			left: 36px;
			width: 0;
			height: 0;
			opacity: 0;
		}
		5% {
			top: 36px;
			left: 36px;
			width: 0;
			height: 0;
			opacity: 1;
		}
		100% {
			top: 0px;
			left: 0px;
			width: 72px;
			height: 72px;
			opacity: 0;
		}
	}
</style>
