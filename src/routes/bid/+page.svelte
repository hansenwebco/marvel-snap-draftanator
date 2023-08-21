<script>
	import { onMount } from 'svelte';
	import Footer from '../components/footer.svelte';
	import Header from '../components/header.svelte';
	import DeckHost from '../components/deck-view.svelte';
	import DeckGuest from '../components/deck-view.svelte';
	import { io } from 'socket.io-client';
	import { sortCards } from '$lib/global.js';
	import { buildDeckCode } from '../../lib/global';

	let roomId = '';
	let gameState = '';
	let socket;
	let mode = '';
	let debug = false;

	const modes = {
		Host: 'Host',
		Guest: 'Guest'
	};

	//const SIGNALIO_SERVER = "wss://stone-donkey.onrender.com"
	const SIGNALIO_SERVER = 'ws://localhost:3000';
	socket = io(SIGNALIO_SERVER);

	onMount(async () => {});

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
		var result = socket.emit('joinGame', roomId);
		mode = modes.Guest;
	}

	function bid(bidAmount) {
		if (mode === modes.Host) {
			gameState.bid_host = gameState.bid_host + bidAmount;
		} else {
			gameState.bid_guest = gameState.bid_guest + bidAmount;
		}

		socket.emit('updateBid', { mode: mode, bid: bidAmount, roomId: roomId });
	}
	function readyToDraft() {
		socket.emit('readyGame', { mode: mode, gameId: roomId });
	}

	function copyGameId(elm) {
		navigator.clipboard.writeText(document.getElementById(elm).value);
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
{#if gameState.client_count == undefined || gameState.client_count < 2}
	<div class="start-container">
		<div class="component-ui start-option">
			<div class="start-directions">To host a draft click "Create Draft" below and provide the id to the other participant.</div>
			{#if gameState.game_id == null}
				<input type="button" class="button" on:click={createGame} value="Create Draft" />
			{:else}
				<input id="game-code" class="game-code-input" onclick="this.select();" bind:value={gameState.game_id} type="text" /><br /><br />
				<input type="button" class="button" on:click={copyGameId("game-code")} value="Copy Code" />
				<br />
				Waiting on opponent to connect...
			{/if}
		</div>
		{#if mode != modes.Host}
			<div class="component-ui start-option">
				<div class="start-directions">Enter the draft code from from the user who created the draft and click "Join Draft" to begin.</div>
				<input id="roomId" class="game-code-input" onclick="this.select();" bind:value={roomId} type="text" /><br /><br />
				<input type="button" class="button" on:click={joinGame} value="Join Draft" />
			</div>
		{/if}
	</div>
{/if}

{#if gameState.client_count == 2}
	<table style="margin:auto;">
		<tr>
			<td align="center">Your Deck<br /><br /></td>
			<td align="center">Round 1 - Timer: {gameState.timer}</td>
			<td align="center">Opponent's Deck<br /><br /></td>
		</tr>
		<tr>
			<td align="center" style="min-width:400px;width:400px;"><DeckHost cards={mode == modes.Host ? sortCards(gameState.deck_host) : sortCards(gameState.deck_guest)} showPowerTable={false} /></td>
			{#if gameState.current_card != 'undefined'}
				<td align="center">
					<img alt="" src="https://snapdata-cdn.stonedonkey.com/images/cards/{gameState.current_card.id}.webp" />
					<div id="card-desc">{gameState.current_card.desc}</div>
				</td>
			{:else}
				<td align="center"><img alt="" src="https://snapdata-cdn.stonedonkey.com/images/cards/1.webp" /></td>
			{/if}
			<td align="center" style="min-width:400px;width:400px;"><DeckGuest cards={mode == modes.Host ? sortCards(gameState.deck_guest) : sortCards(gameState.deck_host)} showPowerTable={false} /></td>
		</tr>
		<tr>
			<td align="center">
				<div class="component-ui" style="min-height: 125px;">
					{#if (mode == modes.Host && gameState.deck_host.length >= 2) || (mode == modes.Guest && gameState.deck_guest.length >= 2)}
						Draft Complete
						<input id="deck-id-left" class="game-code-input" value={buildDeckCode(mode == modes.Host ? gameState.deck_host : gameState.deck_guest)} onclick="this.select();" type="text" />
						<input type="button" class="button" on:click={copyGameId("deck-id-left")} value="Copy Deck Code" />
					{:else if gameState.ready_guest == true && gameState.ready_host == true}
						<div style="clear:both;width:100%;">
							Your Gold: {mode == modes.Host ? gameState.gold_host : gameState.gold_guest} - Your Bid: {mode == modes.Host ? gameState.bid_host : gameState.bid_guest}<br /><br />
						</div>
						<button on:click={() => bid(1)} class="round">+1</button>
						<button on:click={() => bid(3)} class="round">+3</button>
						<button on:click={() => bid(5)} class="round">+5</button>
						<div style="clear:both;width:100%;margin-top:20px">
							<button class="button">Pass</button>
						</div>
					{:else}
						<input type="button" on:click={readyToDraft} class="button" value="Ready to Draft!" />
					{/if}
				</div>
			</td>
			<td align="center">
				<div class="component-ui" style="min-height: 125px;">
					<div>Current Bid</div>
					<div class="current-bid">{gameState.bid_host > gameState.bid_guest ? gameState.bid_host : gameState.bid_guest}</div>
				</div>
			</td>
			<td align="center" class="component-ui" style="min-height: 125px;">
				{#if (mode == modes.Guest && gameState.deck_host.length >= 2) || (mode == modes.Host && gameState.deck_guest.length >= 2)}
					Draft Complete
					<input id="deck-id-right" class="game-code-input" value={buildDeckCode(mode == modes.Guest ? gameState.deck_host : gameState.deck_guest)} onclick="this.select();" type="text" />
					<input type="button" class="button" on:click={copyGameId("deck-id-right")} value="Copy Deck Code" />
				{:else if gameState.ready_guest == true && gameState.ready_host == true}
					Opponent Gold: {mode == modes.Host ? gameState.gold_guest : gameState.gold_host}<br /><br />
				{:else if mode == modes.Host}
					Status: {gameState.ready_guest == true ? 'Ready' : 'Not Ready'}
				{:else if mode == modes.Guest}
					Status: {gameState.ready_host == true ? 'Ready' : 'Not Ready'}
				{/if}
			</td>
		</tr>
	</table>


{/if}

{#if debug}
	<br /><br />
	<div style="font-size:10px;width:90%;margin:auto;background:#222;border:solid 1px #222;padding:20px;border-radius:10px;">
		Mode: {mode}<br /><br />
		<textarea style="width:90%;height:200px;background:#333;border-radius:10px;padding:5px;font-size:10px;color:white;">{JSON.stringify(gameState, null, 2)};</textarea>
	</div>
{/if}
<div>
	<Footer />
</div>

<style>
	.start-container {
		margin-top: 50px;
		display: inline-flex;
		flex-flow: wrap;
		align-items: center;
		justify-content: center;
		width: 100%;
	}
	.start-option {
		width: 300px;
		text-align: center;
		margin: 20px;
	}

	#card-desc {
		font-size: 10px;
		width: 200px;
	}
	.game-code-input {
		width: 100%;
		border-radius: 4px;
		font-size: 12px;
		padding: 5px;
		margin-right: 0px;
		border: none;
		text-align: center;
	}
	.start-directions {
		font-size: 13px;
		text-align: left;
		margin-bottom: 20px;
	}

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
	.current-bid {
		font-size: 55px;
		width: 100%;
	}
</style>
