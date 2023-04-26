<script>
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { API_URL } from '$lib/store.js';
	import { DECK } from '$lib/store.js';
	import {sortCards , randomNum } from '$lib/global.js';

	const DATA_URL = get(API_URL);
	const displayedCards = [null, null, null, null, null];
	let cardsDrafted = 0;
	let allCards = [];
	let revealed = 0;
	let packs = 5;
	let cardsOpened = [];
	let hideCards = false;

	DECK.subscribe((c) => {
		cardsDrafted = c.length;
	});

	onMount(async () => {
		const response = await fetch(DATA_URL + '/data/snap.json', {
			method: 'GET',
			mode: 'cors'
		});
		const result = await response.json();
		allCards = result.data.cards.card;
	});

	function handleClick(index) {
		if (displayedCards[index] != null || revealed === 5) return;

		let cardPicked = 0;
		do {
			let pickCard = randomNum(0,allCards.length);
			// TODO: do we want duplicates and do we want rarity?
			if (allCards[pickCard].released == true) {
				if (cardsOpened.findIndex((x) => parseInt(x.id) === parseInt(allCards[pickCard].id)) < 0) {
					cardsOpened.push(allCards[pickCard]);
					cardPicked = pickCard;
				} else cardPicked = pickCard;
			}
		} while (cardPicked == 0);

		displayedCards[index] = `https://snapdata-cdn.stonedonkey.com/images/cards/${allCards[cardPicked].id}.webp`;

		console.log(cardsOpened);

		revealed += 1;

	}

	function handleDeal() {
		
		if (!hideCards) {
			hideCards = true;
			packs--;
		}
		
		if (revealed !== 5) return;

		if (packs === 0) return;

		// reset the displayed cards array and the revealed count
		displayedCards.fill(null);
		displayedCards.forEach((card, index) => {
			displayedCards[index] = null;
		});

		revealed = 0;
		packs--;
	}
</script>

<div class="component-ui">
	<div class="card-pack-container">
		<div class="card-pack">
		<img src="/images/CardPack-AnimalsAssemble.png" on:keydown={() => handleDeal()} on:click={() => handleDeal()} alt="Card Pack " class="card-pack-image" />
		<div>{packs} Packs Remaning</div>
	</div>
		<div class="card-images-container">
			{#if hideCards}
			{#each displayedCards as card, index}
				<img src={card ? card : '/images/cardback-full-animalsassemble.png'} class="card-image" alt={`Card ${index}`} on:keydown={() => handleClick(index)} on:click={() => handleClick(index)} />
			{/each}
			{/if}
		</div>
	</div>
</div>

<style>
	.card-pack-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin: 20px;
	}

	.card-pack-image {
		width: 250px;
		height: auto;
		margin-right: 20px;
		cursor: pointer;
	}

	.card-images-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
	
	}

	.card-image {
		width: 180px;
		height: auto;
		margin-right: 10px;
		cursor: pointer;
	}

	.card-pack  {
		text-align: center;
		margin:auto 0px;
	}

	@media screen and (max-width: 768px) {
		.card-pack-container {
			flex-direction: column;
			align-items: flex-start;
		}

		.card-pack-image {
			margin-right: 0;
			margin-bottom: 20px;
		}

		.card-images-container {
			flex-direction: column;
			align-items: flex-start;
		}

		.card-image {
			width: 175px;
			margin-right: 0;
			margin-bottom: 10px;
		}
	}
</style>
