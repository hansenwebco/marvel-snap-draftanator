<script>
	import { onMount } from 'svelte';
	import Footer from '../components/footer.svelte';
	import Header from '../components/header.svelte';
	import DeckHost from '../components/deck-view.svelte';
	import DeckGuest from '../components/deck-view.svelte';
	import { io } from 'socket.io-client';

	let roomId = '';
	let gameState = '';
	let socket;
	let mode;
	let debug = false;

	const modes = {
		Host: 'Host',
		Guest: 'Guest'
	};

	//const SIGNALIO_SERVER = "wss://stone-donkey.onrender.com"
	const SIGNALIO_SERVER = 'ws://localhost:3000';
	socket = io(SIGNALIO_SERVER);

	onMount(async () => {
		// socket.on('init', async (arg) => {
		// 	gameState = arg;
		//     roomId = arg.game_id;
		// });
	});

	socket.on('syncGameState', (serverGameState) => {
		console.log('sync game state');
		roomId = roomId = serverGameState.game_id;
		gameState = serverGameState;
	});

	function createGame() {
		socket.emit('hostGame', '');
		mode = modes.Host;
	}
	function joinGame() {
		socket.emit('joinGame', roomId);
		mode = modes.Guest;
	}

	function bid(bidAmount) {
		if (mode === modes.Host) gameState.bid_host = gameState.bid_host + bidAmount;
		else gameState.bid_guest = gameState.bid_guest + bidAmount;

		socket.emit('updateGame', { mode: mode, bid: bidAmount, roomId: roomId });
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

<table style="margin:auto;">
	<tr>
		<td align="center">Your Deck<br /><br /></td>
		<td align="center" >Round 1</td>
		<td align="center">Opponent's Deck<br /><br /></td>
	</tr>
	<tr>
		<td align="center" style="min-width:400px;width:400px;"><DeckHost showPowerTable={false} /></td>
		<td align="center"><img alt="" src="https://snapdata-cdn.stonedonkey.com/images/cards/53.webp" /></td>
		<td align="center" style="min-width:400px;width:400px;"><DeckGuest showPowerTable={false} /></td>
	</tr>
	<tr>
        <td align="center">
            <div class="component-ui" style="min-height: 125px;">
            Your Gold: 10<br/><br/>
            </div>
        </td>
		<td align="center">
			<div class="component-ui"  style="min-height: 125px;">
                <div style="clear:both;width:100%;">
                    Your Bid: 4<br/>
                </div>
                
                <button class="round">-5</button>
				<button class="round">-1</button>
				<button class="round">0</button>
				<button class="round">+1</button>
				<button class="round">+5</button>

                <div style="clear:both;width:100%;margin-top:20px">
					<button>Lock Bid</button>
				</div>
			</div>
		</td>
        <td align="center" class="component-ui"  style="min-height: 125px;">
            Opponent Gold: 10<br/><br/>
            Status: Bidding
        </td>
	</tr>
</table>

{#if mode != undefined}
	<div class="component-ui">
		<input type="button" on:click={createGame} value="Create Draft" />
	</div>

	<div class="component-ui">
		<input id="roomId" bind:value={roomId} type="text" />
		<input type="button" on:click={joinGame} value="Join Draft" />
	</div>

	<div class="component-ui">
		<div style="width: 100%;">
			Mode: {mode}
			{modes.Host}
			{mode == mode.Host}<br />
			Your Gold : {mode == modes.Host ? gameState.gold_host : gameState.gold_guest}<br />
			Your Bid : {mode == modes.Host ? gameState.bid_host : gameState.bid_guest}<br /><br />
		</div>
		<div>
			<input type="button" on:click={() => bid(-1)} value="Bid Down" />
			<input type="button" on:click={() => bid(1)} value="Bid Up" />
		</div>
	</div>
	<div />
{/if}

{#if debug}
	<div>
		ID: <input type="text" value={gameState.game_id} onclick="this.select()" /><br />
		Mode: {mode}<br />
		JSON: {JSON.stringify(gameState)};
	</div>
{/if}

<div>
	<Footer />
</div>

<style>
	button.round {
		background-color: #48abe0;
		color: white;
		border: none;
		padding: 5px;
		font-size: 14px;
		height: 35px;
		width: 35px;
		box-shadow: 0 2px 4px darkslategray;
		border-radius: 50%;
		margin-right: 5px;
		margin-left: 5px;
	}
</style>
