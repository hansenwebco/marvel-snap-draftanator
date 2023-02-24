<script>
  
    import { DECK } from '$lib/store.js';

    let cards;
    DECK.subscribe(c => {
        cards = c
    })
    
</script>

{#each cards as card}
    {card.name} -
{/each}
<p>cards {cards.length}</p>