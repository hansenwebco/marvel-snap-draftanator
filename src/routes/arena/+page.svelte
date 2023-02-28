<script>
	import Footer from '../components/footer.svelte';
	import Header from '../components/header.svelte';
	import Deck from '../components/deck-view.svelte';
	import DraftComplete from '../components/draft-complete.svelte';
	import ArenaPicker from '../components/arena-picker.svelte';

	import { DECK } from '$lib/store.js';

	let cardsDrafted = 0;
	DECK.subscribe((c) => {
		cardsDrafted = c.length;
	});
</script>

<svelte:head>
	<title>Marvel Snap - Draftanator</title>
</svelte:head>

<div>
	<Header />
</div>
<div>
	<Deck />
</div>

{#if cardsDrafted < 12}
	<div>
		<ArenaPicker />
	</div>
{/if}

{#if cardsDrafted >= 12}
	<div>
		<DraftComplete />
	</div>
{/if}

<div>
	<Footer />
</div>
