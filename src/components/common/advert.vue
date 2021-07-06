<template>
	<div id="advert">
		<header class="head1-top"><span class="head1-color">In less time,learn more</span><span class="glyphicon glyphicon-remove-circle"></span></header>
	</div>
</template>

<script>
	export default {
		mounted() {
			let span = document.querySelector("span:last-child");
			let head = document.querySelector("header:first-child");
			// console.log(span)
			span.addEventListener('click',()=>{
				head.classList.add('head1-top-show');
				setTimeout(()=>head.style.display='none',1100);
				// console.log('hh')
			});
		}
	}
	
	
</script>

<style scoped>
	.head1-top {
		transition: 1s;
		width: auto;
		height: 70px;
		text-align: center;
		font-size: 3.5em;
		font-weight: 600;
		color: #aaaaff;
		background-color: #161544;
		font-style: italic;
		letter-spacing: 5px;
	}

	.head1-color {
		animation-name: color1;
		animation-duration: 1s;
		animation-iteration-count: 2;
		animation-direction: alternate;
		display: inline-block;
	}

	@keyframes color1 {
		50% {
			color: #f1c40f;
			transform: scale(2);
		}

		to {
			color: #e74c3c;
			transform: scale(.5);
		}
	}

	.head1-top-show {
		transform: scaleY(0);
	}

	.head1-top span:last-child {
		font-size: 20px;
		color: #ffffff;
		position: absolute;
		top: 6px;
		right: 2px;
		cursor: pointer;
	}
</style>
