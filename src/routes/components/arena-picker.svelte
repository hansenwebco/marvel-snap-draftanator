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
		}

		if (redrawCardNum == 2 || redrawCardNum == 0) {
			do {
				pick2 = global.randomNum(0, totalCards);
			} while (pick1 === pick2 || pickList.indexOf('|' + pick2) >= 0 || cards[pick2].released === false);
		}

		if (redrawCardNum == 3 || redrawCardNum == 0) {
			do {
				pick3 = global.randomNum(1, totalCards);
			} while (pick1 === pick3 || pick2 === pick3 || pickList.indexOf('|' + pick3) >= 0 || cards[pick3].released === false);
		}

		card1Image = DATA_URL + '/images/cards/' + cards[pick1].id + '.webp';
		card1Alt = cards[pick1].name;

		card2Image = DATA_URL + '/images/cards/' + cards[pick2].id + '.webp';
		card2Alt = cards[pick2].name;

		card3Image = DATA_URL + '/images/cards/' + cards[pick3].id + '.webp';
		card3Alt = cards[pick3].name;
	}

	function cardPicked(cardId) {
		pickList += '|' + cardId;
		pickCards(0);
		console.log(pickList);
	}
</script>


<div>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<img on:click={cardPicked(cards[pick1].id)} src={card1Image} alt={card1Alt} />
	<button on:click={() => pickCards(1)}>Don't Have Card</button>
</div>

<div>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<img on:click={cardPicked(cards[pick2].id)} src={card2Image} alt={card2Alt} />
	<button on:click={() => pickCards(2)}>Don't Have Card</button>
</div>

<div>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<img on:click={cardPicked(cards[pick3].id)} src={card3Image} alt={card3Alt} />
	<button on:click={() => pickCards(3)}>Don't Have Card</button>
</div>
