<script>
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	import { API_URL } from '$lib/store.js';
	import { DECK } from '$lib/store.js';

	let cardsDrafted = 0;
	let allCards = [];
	const DATA_URL = get(API_URL);
	const displayedCards = [null, null, null,null, null];
	let revealed = 0;
	let clicks = 0;

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
		console.log(cardsDrafted);
	});


	function handleClick(index) {
    if (displayedCards[index] != null || revealed === 5) return;

    const randomIndex = Math.floor(Math.random() * allCards.length);

    displayedCards[index] = `https://snapdata-cdn.stonedonkey.com/images/cards/${randomIndex}.webp`;

		revealed += 1;
	}

	// define a function to handle clicking on the deal button
	function handleDeal() {
    if (revealed !== 5) return;

		if (clicks >= 4) return;

		// reset the displayed cards array and the revealed count
		displayedCards.fill(null);
		displayedCards.forEach((card, index) => {
			displayedCards[index] = null;
		});

		revealed = 0;
		clicks += 1;
	}
</script>

<!-- /images/cardback-full-animalsassemble.png -->
<!-- /images/CardPack-AnimalsAssemble.png -->
<div class="component-ui">
	<div class="card-pack-container">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<img src="/images/CardPack-AnimalsAssemble.png" on:click={() => handleDeal()} alt="Card Pack " class="card-pack-image" />
		<div class="card-images-container">
			{#each displayedCards as card, index}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<img src={card ? card : '/images/cardback-full-animalsassemble.png'} class="card-image" alt={`Card ${index}`} on:click={() => handleClick(index)} />
			{/each}
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
