<script>
	import Footer from '../components/footer.svelte';
	import Header from '../components/header.svelte';
	import Deck from '../components/deck-view.svelte';
	import DraftComplete from '../components/draft-complete.svelte';
	import SealedPicker from '../components/sealed/sealed-picker.svelte';
	import OpenedCards from '../components/sealed/sealed-opened.svelte';
	
    import { SEALED_CARDS } from '$lib/store.js';
	let cardsDrafted = 0;
	SEALED_CARDS.subscribe((c) => {
		cardsDrafted = c.length;
	});

	function removeCard(card) {
		console.log(card.detail);
	}

</script>


<svelte:head>
	<title>Marvel Snap - Draftanator - Sealed Draft</title>
</svelte:head>

<div>
	<Header />
</div>

{#if cardsDrafted == 0}
<div>
	<SealedPicker/>
</div>
{/if}

{#if cardsDrafted > 0}
<div>
	<Deck />
</div>
{/if}

{#if cardsDrafted > 0}
<div>
	<OpenedCards/>
</div>
{/if}

{#if cardsDrafted > 10000}
<div>
	<DraftComplete />
</div>
{/if}

<div>
	<Footer />
</div>
