<script>
	import { onMount } from 'svelte';
	import Footer from '../components/footer.svelte';
	import Header from '../components/header.svelte';
	import { io } from 'socket.io-client';

    let roomId = "";
	let gameId = '';
    let socket;
    let timer = 0;
    
    //const SIGNALIO_SERVER = "wss://stone-donkey.onrender.com"
    const SIGNALIO_SERVER = 'ws://localhost:3000';

	onMount(async () => {
		socket = io(SIGNALIO_SERVER);
		socket.on('init', async (arg) => {
			gameId = arg;
		});
	});

	function createGame() {
		socket.emit('generateGame', '');
	}
    function joinGame() {
        socket.emit("joinGame", roomId);
    }
</script>

<svelte:head>
	<title>Marvel Snap! Draftanator - Bid Draft</title>
	<meta name="title" content="Marvel Snap! Draftanator - Arena Draft" />
	<meta name="description" content="The original Marvel Snap site for drafting decks.  Mavel Snap Draftanator supports sealed and arena formats and even allows you to draft decks with friends!" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://www.marvelsnapdraft.com/" />
	<meta property="og:title" content="Marvel Snap! Draftanator - Draft Marvel Snap Decks - Sealed and Arena Formats" />
	<meta property="og:description" content="The original Marvel Snap site for drafting decks.  Mavel Snap Draftanator supports sealed and arena formats and even allows you to draft decks with friends!" />
	<meta property="og:image" content="https://www.marvelsnapdraft.com/images/preview.png" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://www.marvelsnapdraft.com/" />
	<meta property="twitter:title" content="Marvel Snap! Draftanator - Draft Marvel Snap Decks - Sealed and Arena Formats" />
	<meta property="twitter:description" content="The original Marvel Snap site for drafting decks.  Mavel Snap Draftanator supports sealed and arena formats and even allows you to draft decks with friends!" />
	<meta property="twitter:image" content="https://www.marvelsnapdraft.com/images/preview.png" />
</svelte:head>

<div>
	<Header />
</div>

<div>
	GameID: {gameId}
</div>

<div>
	<input type="button" on:click={createGame} value="Create Draft" />
</div>

<div>
	<input id="roomId" bind:value={roomId} type="text" />
	<input type="button" on:click={joinGame} value="Join Draft" />
</div>

<div>
  
</div>

<div>
	<Footer />
</div>
