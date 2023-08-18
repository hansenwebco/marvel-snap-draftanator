<script>
	import { get } from 'svelte/store';
	import { onMount } from 'svelte';
	import { randomNum } from '$lib/global.js';
	import { API_URL } from '$lib/store.js';

	const DATA_URL = get(API_URL);

	let cards;
	onMount(async () => {
		const response = await fetch(DATA_URL + '/data/snap.json', {
			method: 'GET',
			mode: 'cors'
		});
		const result = await response.json();
		cards = result.data.cards.card;

		drawCards();
	});

	let card1, card2, card3, card4, card5, card6, card7, card8, card9;
	function drawCards() {
		let totalCards = cards.length - 1;
		card1 = DATA_URL + '/images/cards/' + cards[pullCard()].id + '.webp';
		card2 = DATA_URL + '/images/cards/' + cards[pullCard()].id + '.webp';
		card3 = DATA_URL + '/images/cards/' + cards[pullCard()].id + '.webp';
		card4 = DATA_URL + '/images/cards/' + cards[pullCard()].id + '.webp';
		card5 = DATA_URL + '/images/cards/' + cards[pullCard()].id + '.webp';
		card6 = DATA_URL + '/images/cards/' + cards[pullCard()].id + '.webp';
		card7 = DATA_URL + '/images/cards/' + cards[pullCard()].id + '.webp';
		card8 = DATA_URL + '/images/cards/' + cards[pullCard()].id + '.webp';
		card9 = DATA_URL + '/images/cards/' + cards[pullCard()].id + '.webp';
		console.log(card1.id);
	}
	function pullCard() {
		let card = 0;
		do {
			card = randomNum(0, cards.length - 1);
		} while (card == 0 || cards[card].released === false);
		return card;
	}
</script>

<div class="component-ui">
	<div id="r1" class="row">
		<img class="grid-image" id="r1c1" src={card1} alt="" />
		<img class="grid-image" id="r1c2" src={card2} alt="" />
		<img class="grid-image" id="r1c3" src={card3} alt="" />
	</div>
	<div id="r2" class="row">
		<img class="grid-image" id="r2c1" src={card4} alt="" />
		<img class="grid-image" id="r2c2" src={card5} alt="" />
		<img class="grid-image" id="r2c3" src={card6} alt="" />
	</div>
	<div id="r3" class="row">
		<img class="grid-image" id="r3c1" src={card7} alt="" />
		<img class="grid-image" id="r3c2" src={card8} alt="" />
		<img class="grid-image" id="r3c3" src={card9} alt="" />
	</div>
</div>

<style>
	.row {
        text-align: center;
		clear: both;
		width: 100%;
	}
	.grid-image {
		width: 130px;
	}
</style>
