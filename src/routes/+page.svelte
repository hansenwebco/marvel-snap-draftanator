<script>
	import Header from './components/header.svelte';
	import Footer from './components/footer.svelte';
	import SelectMode from './components/select-mode.svelte';
    import News from './components/news.svelte'
</script>

<svelte:head>
    <title>Marvel Snap! Draftanator - Draft Marvel Snap Decks - Sealed and Arena Formats</title>
    <meta name="title" content="Marvel Snap! Draftanator - Draft Marvel Snap Decks - Sealed and Arena Formats">
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

<Header />

<SelectMode />

<News/>

<Footer />
