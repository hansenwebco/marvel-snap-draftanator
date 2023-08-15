<script>
	import Footer from '../components/footer.svelte';
	import Header from '../components/header.svelte';
	import Deck from '../components/deck-view.svelte';
	import DraftComplete from '../components/draft-complete.svelte';
	import SealedPicker from '../components/sealed/sealed-picker.svelte';
	import OpenedCards from '../components/sealed/sealed-opened.svelte';
</script>


<svelte:head>
	<title>Marvel Snap - Draftanator - Sealed Draft</title>
</svelte:head>

<div>
	<Header />
</div>

<div>
	<SealedPicker/>
</div>

<div>
	<Deck />
</div>

<div>
	<OpenedCards/>
</div>

<div>
	<DraftComplete />
</div>


<div>
	<Footer />
</div>
