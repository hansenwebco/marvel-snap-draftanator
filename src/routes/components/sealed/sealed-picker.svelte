<script>
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { API_URL } from '$lib/store.js';
	import { DECK } from '$lib/store.js';
	import { sortCards, randomNum } from '$lib/global.js';
	import SealedOpened from './sealed-opened.svelte';

	const DATA_URL = get(API_URL);
	const displayedCards = [null, null, null, null, null];
	let cardsDrafted = 0;
	let allCards = [];
	let revealed = 0;
	let packs = 5;
	let cardsOpened = [];
	let hideCards = false;
	let packCards = [null, null, null, null, null];
	let openComplete = false;

	DECK.subscribe((c) => {
		cardsDrafted = c.length;
	});

	onMount(async () => {
		const response = await fetch(DATA_URL + '/data/snap.json', {
			method: 'GET',
			mode: 'cors'
		});
		const { data } = await response.json();
		allCards = data.cards.card;
	});

	function handleClick(index, reroll) {
		if ((displayedCards[index] != null || revealed === 5) && !reroll) return;

		if (reroll) {
			// remove the card already in our hands
			cardsOpened.splice(cardsOpened.findIndex((x) => parseInt(x.id) === parseInt(packCards[index])),1);
			revealed--;
		}

		let cardPicked = 0;
		do {
			let pickCard = randomNum(0, allCards.length);
			// TODO: do we want duplicates and do we want rarity?
			if (allCards[pickCard].released == true) {
				if (cardsOpened.findIndex((x) => parseInt(x.id) === parseInt(allCards[pickCard].id)) < 0) {
					cardsOpened.push(allCards[pickCard]);
					cardPicked = pickCard;
				} else cardPicked = pickCard;
			}
		} while (cardPicked == 0);

		displayedCards[index] = `https://snapdata-cdn.stonedonkey.com/images/cards/${allCards[cardPicked].id}.webp`;
		packCards[index] = allCards[cardPicked].id;

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

		packCards.fill(null);
		packCards.forEach((card, index) => {
			packCards[index] = null;
		});

		revealed = 0;
		packs--;
	}

	function showDrawn() {
		openComplete = true;
	}
</script>

<div class="component-ui">
	{#if !openComplete}
	<div class="card-pack-container">
		<div class="card-pack">
			<img src="/images/CardPack-AnimalsAssemble.png" on:keydown={() => handleDeal()} on:click={() => handleDeal()} alt="Card Pack " class="card-pack-image" />
			<div>{packs} Packs Remaning</div>
			{#if packs == 0 && revealed == 5}
			<div class="build-deck"><button on:click={() => showDrawn()}>Build Deck</button></div>
			{/if}
		</div>
		<div class="card-images-container">
			{#if hideCards}
				{#each displayedCards as card, index}
					<div class="card-image-container">
						<img src={card ? card : '/images/cardback-full-animalsassemble.png'} class="card-image" alt={`Card ${index}`} on:keydown={() => handleClick(index, false)} on:click={() => handleClick(index, false)} />
						{#if card}
							<div class="card-description">{allCards[index].desc}</div>
							<div class="reroll"><button class="button-reroll" on:keydown={() => handleClick(index, true)} on:click={() => handleClick(index, true)}>Don't Have Card</button></div>
						{:else}
							<div class="card-description" />
							<div class="reroll" />
						{/if}
					</div>
				{/each}
			{/if}
		</div>
	</div>
	{/if}
	{#if openComplete}
	<SealedOpened/>
	{/if}
</div>

<style>
	.build-deck {
		margin-top:15px;
	}
	.reroll {
		margin-bottom: 10px;
		min-height: 32px;
	}
	.reroll button {
		font-size: 10px;
		margin-bottom: 10px;
	}
	.card-description {
		text-align: center;
		max-width: 140px;
		font-size: 9px;
		min-height: 40px;
		max-height: 40px;
		margin-left: 5px;
		margin-right: 5px;
		overflow: hidden;
		margin-top: -5px;
	}
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
		flex-wrap: wrap;
		justify-content: center;
	}

	.card-image-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.card-image {
		width: 180px;
		height: auto;
		margin-bottom: 10px;
		cursor: pointer;
	}

	.card-pack {
		text-align: center;
		margin: auto 0px;
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
