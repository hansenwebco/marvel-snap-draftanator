<script>
	import { onMount } from 'svelte';
	import * as global from '$lib/global.js';
	import { API_URL } from '$lib/store.js';
	import { get } from 'svelte/store';

	let pickList = '';
	let cards, pick1, pick2, pick3;
	let card1Image, card1Alt;
	let card2Image, card2Alt;
	let card3Image, card3Alt;
	let card1Text = '';
	let card2Text = '';
	let card3Text = '';

	const DATA_URL = get(API_URL);
	onMount(async () => {
		const response = await fetch(DATA_URL + '/data/snap.json', {
			method: 'GET',
			mode: 'cors'
		});
		const result = await response.json();
		cards = result.data.cards.card;

		pickCards(0);
	});

	function pickCards(redrawCardNum) {
		let totalCards = cards.length - 1;

		if (redrawCardNum == 1 || redrawCardNum == 0) {
			do {
				pick1 = global.randomNum(0, totalCards);
			} while (pickList.indexOf('|' + pick1) >= 0 || cards[pick1].released === false);

			card1Image = DATA_URL + '/images/cards/' + cards[pick1].id + '.webp';
			card1Alt = cards[pick1].name;
			card1Text = cards[pick1].desc;
		}

		if (redrawCardNum == 2 || redrawCardNum == 0) {
			do {
				pick2 = global.randomNum(0, totalCards);
			} while (pick1 === pick2 || pickList.indexOf('|' + pick2) >= 0 || cards[pick2].released === false);

			card2Image = DATA_URL + '/images/cards/' + cards[pick2].id + '.webp';
			card2Alt = cards[pick2].name;
			card2Text = cards[pick2].desc;
		}

		if (redrawCardNum == 3 || redrawCardNum == 0) {
			do {
				pick3 = global.randomNum(1, totalCards);
			} while (pick1 === pick3 || pick2 === pick3 || pickList.indexOf('|' + pick3) >= 0 || cards[pick3].released === false);

			card3Image = DATA_URL + '/images/cards/' + cards[pick3].id + '.webp';
			card3Alt = cards[pick3].name;
			card3Text = cards[pick3].desc;
		}
	}

	function cardPicked(cardId) {
		pickList += '|' + cardId;
		pickCards(0);
		console.log(pickList);
	}
</script>

<div id="arena-pick-ui">
	<div class="arena-pick">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<img on:click={cardPicked(cards[pick1].id)} src={card1Image} alt={card1Alt} />
		<div class="card-desc" id="card-desc-1">{card1Text}</div>
		<button on:click={() => pickCards(1)}>Don't Have Card</button>
	</div>

	<div class="arena-pick">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<img on:click={cardPicked(cards[pick2].id)} src={card2Image} alt={card2Alt} />
		<div class="card-desc" id="card-desc-2">{card2Text}</div>
		<button on:click={() => pickCards(2)}>Don't Have Card</button>
	</div>

	<div class="arena-pick">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<img on:click={cardPicked(cards[pick3].id)} src={card3Image} alt={card3Alt} />
		<div class="card-desc" id="card-desc-3">{card3Text}</div>
		<button on:click={() => pickCards(3)}>Don't Have Card</button>
	</div>
</div>

<style>
	#arena-pick-ui {
		background-color: #333;
		max-width: 900px;
		margin-left: auto;
		margin-right: auto;
		padding: 30px;
		border-radius: 25px;
		margin-top: 50px;
		box-sizing: content-box;
		border: solid 4px #95a2e4;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-flow: wrap;
	}
	.arena-pick {
		text-align: center;
		margin:0px;
	}

	.card-desc {
		font-size: 10px;
		margin-bottom: 5px;
		max-width: 180px;
		margin-left: auto;
		margin-right: auto;
		min-height: 40px;
		margin-top: 3px;
	}

	img:hover {
		cursor: pointer;
	}
</style>
