<script>
	import Footer from '../components/footer.svelte';
	import Header from '../components/header.svelte';
	import Deck from '../components/deck-view.svelte';

	import SealedPicker from '../components/sealed/sealed-picker.svelte';
	import OpenedCards from '../components/sealed/sealed-opened.svelte';
	import { DECK } from '$lib/store.js';
	import { SEALED_CARDS } from '$lib/store.js';

	let cardsDrafted = 0;
	SEALED_CARDS.subscribe((c) => {
		cardsDrafted = c.length;
		console.log(c);
	});

	let cards = [];
	DECK.subscribe((c) => {
		cards = c;
	});
</script>

<svelte:head>
	<title>Marvel Snap! Draftanator - Sealed Draft</title>
    <meta name="title" content="Marvel Snap! Draftanator - Sealed Draft">
    <meta name="description" content="The original Marvel Snap site for drafting decks.  Mavel Snap Draftanator supports sealed and arena formats and even allows you to draft decks with friends!">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://www.marvelsnapdraft.com/">
    <meta property="og:title" content="Marvel Snap! Draftanator - Draft Marvel Snap Decks - Sealed and Arena Formats">
    <meta property="og:description" content="The original Marvel Snap site for drafting decks.  Mavel Snap Draftanator supports sealed and arena formats and even allows you to draft decks with friends!">
    <meta property="og:image" content="https://www.marvelsnapdraft.com/images/preview.png">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://www.marvelsnapdraft.com/">
    <meta property="twitter:title" content="Marvel Snap! Draftanator - Draft Marvel Snap Decks - Sealed and Arena Formats">
    <meta property="twitter:description" content="The original Marvel Snap site for drafting decks.  Mavel Snap Draftanator supports sealed and arena formats and even allows you to draft decks with friends!">
    <meta property="twitter:image" content="https://www.marvelsnapdraft.com/images/preview.png">	
</svelte:head>

<div>
	<Header />
</div>

{#if cardsDrafted == 0}
	<div>
		<SealedPicker />
	</div>
{/if}

{#if cardsDrafted > 0}
	<div>
		<Deck cards={cards} />
	</div>
{/if}

{#if cardsDrafted > 0}
	<div>
		<OpenedCards />
	</div>
{/if}

<div>
	<Footer />
</div>
