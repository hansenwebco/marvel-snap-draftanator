<script>
	import { get } from 'svelte/store';
	import { API_URL } from '$lib/store.js';
	import { DECK } from '$lib/store.js';

	let cdn = get(API_URL);
	console.log(cdn);
	let cards;
	DECK.subscribe((c) => {
		cards = c;
	});
</script>

<div id="deck-view">
    {#each Array(12) as _, index (index)}
        {#if index < cards.length}
           <img id="card{index+1}" class="cards" alt="" src="{cdn}/images/cards/{cards[index].id}.webp">
        {:else}
        <img id="card{index+1}" class="cards" alt="Card 1" src="/images/deck-blank.png" />
        {/if}
    {/each}
</div>

<style>
	.cards {
		max-width: 92px;
		padding: 4px;
	}
	#deck-view {
		max-width: 600px;
		margin: auto;
	}
</style>
