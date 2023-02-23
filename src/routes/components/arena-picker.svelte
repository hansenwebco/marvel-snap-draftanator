<script>
	import { onMount } from 'svelte';
	import * as global from '$lib/global.js';

	let cards, pick1, pick2, pick3;
	let pickList = '';
	let card1Image, card1Alt;
	let card2Image, card2Alt;
	let card3Image, card3Alt;

	const DATA_URL = 'https://snapdata-cdn.stonedonkey.com/';
	onMount(async () => {
		const response = await fetch(DATA_URL + 'data/snap.json', {
			method: 'GET',
			mode: 'cors'
		});
		const result = await response.json();
		cards = result.data.cards.card;

		pickCards();
	});

	function pickCards() {
		let totalCards = cards.length-1;

		do {
			pick1 = global.randomNum(0, totalCards);
		} while (pickList.indexOf('|' + pick1) >= 0 || cards[pick1].released === false);

		do {
			pick2 = global.randomNum(0, totalCards);
		} while (pick1 === pick2 || pickList.indexOf('|' + pick2) >= 0 || cards[pick2].released === false);

		do {
			pick3 = global.randomNum(1, totalCards);
		} while (pick1 === pick3 || pick2 === pick3 || pickList.indexOf('|' + pick3) >= 0 || cards[pick3].released === false);

		card1Image = 'https://snapdata-cdn.stonedonkey.com/images/cards/' + cards[pick1].id + '.webp';
		card1Alt = cards[pick1].name;

		card2Image = 'https://snapdata-cdn.stonedonkey.com/images/cards/' + cards[pick2].id + '.webp';
		card2Alt = cards[pick2].name;

		card3Image = 'https://snapdata-cdn.stonedonkey.com/images/cards/' + cards[pick3].id + '.webp';
		card3Alt = cards[pick3].name;
	}
	function cardPicked(pick) {
		alert(pick);
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<img on:click={cardPicked(pick1)} src={card1Image} alt={card1Alt} />
<button>Don't Have Card</button>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<img on:click={cardPicked(pick2)} src={card2Image} alt={card2Alt} />
<button>Don't Have Card</button>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<img on:click={cardPicked(pick3)} src={card3Image} alt={card3Alt} />
<button>Don't Have Card</button>
