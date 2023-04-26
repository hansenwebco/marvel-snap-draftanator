<script>
	
	let cardsDrafted = 0;

	import Footer from '../components/footer.svelte';
	import Header from '../components/header.svelte';
	import Deck from '../components/deck-view.svelte';
	import DraftComplete from '../components/draft-complete.svelte';
	import SealedPicker from '../components/sealed-picker.svelte';
</script>


<svelte:head>
	<title>Marvel Snap - Draftanator - Sealed Draft</title>
</svelte:head>

<div>
	<Header />
</div>

{#if cardsDrafted >= 12}
<div>
	<Deck />
</div>
{/if}

<div>
	<SealedPicker/>
</div>


{#if cardsDrafted >= 12}
	<div>
		<DraftComplete />
	</div>
{/if}

<div>
	<Footer />
</div>
