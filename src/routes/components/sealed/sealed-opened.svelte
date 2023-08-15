<script>
    import { get } from 'svelte/store';
    import { SEALED_CARDS } from '$lib/store.js';
    import { DECK } from '$lib/store.js';
	import { API_URL } from '$lib/store.js';
    import {sortCards } from '$lib/global.js';
    let cdn = get(API_URL);

    let cards;
    SEALED_CARDS.subscribe((c) => {
        cards = c;
    });

    function cardPicked(card) {
		// remove from sealed cards
        $SEALED_CARDS.splice($SEALED_CARDS.findIndex(a=>a.id === card.id),1);
        cards = $SEALED_CARDS;

        // add to deck
        $DECK.push(card);
		$DECK = sortCards($DECK);
		DECK.set($DECK);
	}
</script>

<div class="component-ui">
    {#each cards as card}
        <!-- svelte-ignore a11y-missing-attribute -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div><img on:click={cardPicked(card)}  class="card-pick" src="{cdn}/images/cards/{card.id}.webp" alt="{card.name}"></div>&nbsp;
    {/each}
</div>

<style>
    .card-pick {
        width:110px;
        margin: -2px;
    }
</style>
