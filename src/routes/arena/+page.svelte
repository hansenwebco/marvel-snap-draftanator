<script>
	import Footer from '../components/footer.svelte';
	import Header from '../components/header.svelte';
    import ArenaPicker from '../components/arena-picker.svelte';
	import Deck from '../components/deck-view.svelte';
</script>

<svelte:head>
	<title>Marvel Snap - Draftanator</title>
</svelte:head>

<div>
	<Header />
</div>
<div>
	<Deck/>
</div>
<div>
    <ArenaPicker />
</div>
<div>
	<Footer />
</div>
