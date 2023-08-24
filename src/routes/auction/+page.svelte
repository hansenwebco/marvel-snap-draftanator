<script>
	import { onMount } from 'svelte';
	import Footer from '../components/footer.svelte';
	import Header from '../components/header.svelte';
	import DeckHost from '../components/deck-view.svelte';
	import DeckGuest from '../components/deck-view.svelte';
	import { io } from 'socket.io-client';
	import { sortCards } from '$lib/global.js';
	import { buildDeckCode } from '../../lib/global';
	import Modal from 'modal-svelte';

	let roomId = '';
	let gameState = '';
	let socket;
	let mode = '';
	let debug = false;
	let deckSize = 12;
	let card_passes = 3;
	let gameStarted = false;
	let gameCompleted = false;
	let open = true;
	let disableBidButtons = false;

	const modes = {
		Host: 'Host',
		Guest: 'Guest'
	};

	const SIGNALIO_SERVER = 'wss://stone-donkey.onrender.com';
	//const SIGNALIO_SERVER = 'ws://localhost:3000';
	socket = io(SIGNALIO_SERVER);

	onMount(async () => {});

	socket.on('syncGameState', (serverGameState) => {
		roomId = roomId = serverGameState.game_id;
		if (gameState != serverGameState) gameState = serverGameState;
		if (gameStarted == false && serverGameState.client_count >= 2) {
			console.log('game started');
			gameStarted = true;
		}
		if (gameCompleted == false && serverGameState.deck_host.length >= deckSize && serverGameState.deck_guest.length >= deckSize) {
			gameCompleted = true;
		}

		if ((mode == modes.Host && gameState.pass_host == true) || (mode == modes.Guest && gameState.pass_guest)) {
			disableBidButtons = true;
		} else {
			disableBidButtons = false;
		}
	});

	function createGame() {
		socket.emit('hostGame', '');
		mode = modes.Host;
	}
	function joinGame() {
		var result = socket.emit('joinGame', roomId);
		mode = modes.Guest;
	}
	function skipCard() {
		card_passes--;
		if (card_passes >= 0) {
			var result = socket.emit('skipCard', roomId);
		}
	}
	function dontHaveCard() {
		var result = socket.emit('skipCard', roomId);
	}
	function takeCard() {
		var result = socket.emit('takeCard', roomId);
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

	function passCard() {
		console.log('pass');
		socket.emit('passCard', { mode: mode, gameId: roomId });
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
{#if gameCompleted == false && gameStarted == false && (gameState.client_count == undefined || gameState.client_count < 2)}
	<div class="start-container">
		<div class="component-ui start-option">
			{#if gameState.game_id == null}
				<div class="start-directions">To host a draft click "Create Draft" below and provide the id to the other participant.</div>
				<input type="button" class="button" on:click={createGame} value="Create Draft" />
			{:else}
				<div class="start-directions">Give the code below to your opponent and they can enter it in the "Join Draft" dialog.</div>
				<input id="game-code" class="game-code-input" onclick="this.select();" bind:value={gameState.game_id} type="text" /><br /><br />
				<input type="button" class="button" on:click={() => copyGameId('game-code')} value="Copy Code" />
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
{:else if gameStarted == true && gameCompleted == false && gameState.client_count < 2}
	<div class="start-container">
		<div class="component-ui start-option" style="width:500px;">
			<div class="start-directions">
				We lost connection to your opponent, they can rejoin the game by with the code below in the "Join Draft" dialog.<br /><br />
			</div>
			<input id="game-code-reconnect" class="game-code-input" onclick="this.select();" bind:value={gameState.game_id} type="text" /><br /><br /><br />
			<input type="button" class="button" on:click={() => copyGameId('game-code-reconnect')} value="Copy Code" />
			<br />
		</div>
	</div>
{/if}

{#if gameState.client_count == 2 || gameCompleted == true}
	{#if open}
		<Modal title="Marvel Snap Draftanator - Bid Draft" onCancel={() => (open = false)} let:focus>
			<style>
				li {
					margin-bottom: 10px;
				}
			</style>
			<p>How to Play</p>
			<div style="font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">
				<ul>
					<li>Players are presented with random cards and participate in an auction-style bidding process to acquire them.</li>
					<li>The winning player obtains the card and pays the bid, while the losing player keeps their bid but also has 3 gold coins added to their bank.</li>
					<li>If both players pass a new card will be put up for auction, there is no alert if your opponent passed.</li>
					<li>You can only pass if you've not made a bid.</li>
					<li>If no player places a bid on a card before the timer expires, that card is skipped and another is drawn and no gold is awarded.</li>
					<li>Each player starts with 10 gold coins and has a maximum bank limit of 20 gold coins.</li>
					<li>When one player completes their deck of 12 cards, the other player continues to receive random cards. They can choose to accept the card or pass (limited to three passes).</li>
					<li>Once both players have completed their decks, deck codes are provided to be pasted into Marvel Snap.</li>
				</ul>
			</div>
		</Modal>
	{/if}
	<table style="margin:auto;">
		<tr>
			<td align="center">Your Deck<br /><br /></td>
			<td align="center">Round {gameState.turn} - Timer: {gameState.timer}</td>
			<td align="center">Opponent's Deck<br /><br /></td>
		</tr>
		<tr>
			<td align="center" style="min-width:400px;width:400px;"><DeckHost cards={mode == modes.Host ? sortCards(gameState.deck_host) : sortCards(gameState.deck_guest)} showPowerTable={false} /></td>
			{#if gameState.current_card.id !== undefined}
				<td align="center">
					<img alt="" src="https://snapdata-cdn.stonedonkey.com/images/cards/{gameState.current_card.id}.webp" />
					<div id="card-desc">{gameState.current_card.desc}</div>
					<button class="button" style="font-size:10px;margin-top:5px;" on:click={dontHaveCard}>Don't Have Card</button>
				</td>
			{:else}
				<td align="center"><img alt="" src="/images/cardback.webp" /></td>
			{/if}
			<td align="center" style="min-width:400px;width:400px;"><DeckGuest cards={mode == modes.Host ? sortCards(gameState.deck_guest) : sortCards(gameState.deck_host)} showPowerTable={false} /></td>
		</tr>
		<tr>
			<td align="center">
				<div class="component-ui" style="min-height: 125px;">
					{#if mode == modes.Host && gameState.deck_guest.length >= deckSize && gameState.deck_host.length < deckSize}
						<div>
							<!-- guest finished host has to finish now -->
							Finish Draft <br /> You Can Pass {card_passes} More Times <br />
							<span style="font-size:10px">(if the timer runs out it will take card automatically)</span><br />
						</div>
						<div><button class="button" disabled={card_passes <= 0} on:click={skipCard}>Pass</button>&nbsp;&nbsp;<button on:click={takeCard} class="button">Take Card</button></div>
					{:else if mode == modes.Guest && gameState.deck_host.length >= deckSize && gameState.deck_guest.length < deckSize}
						<!-- host finished guest has to finish now-->
						<div>
							Finish Draft <br /> You Can Pass {card_passes} More Times <br />
							<span style="font-size:10px">(if the timer runs out it will take card automatically)</span><br />
						</div>
						<div><button class="button" disabled={card_passes <= 0} on:click={skipCard}>Pass</button>&nbsp;&nbsp;<button on:click={takeCard} class="button">Take Card</button></div>
					{:else if (mode == modes.Host && gameState.deck_host.length >= deckSize) || (mode == modes.Guest && gameState.deck_guest.length >= deckSize)}
						Draft Complete
						<input id="deck-id-left" class="game-code-input" value={buildDeckCode(mode == modes.Host ? gameState.deck_host : gameState.deck_guest)} onclick="this.select();" type="text" />
						<input type="button" class="button" on:click={() => copyGameId('deck-id-left')} value="Copy Deck Code" />
					{:else if gameState.ready_guest == true && gameState.ready_host == true}
						<div style="clear:both;width:100%;">
							Your Gold: {mode == modes.Host ? gameState.gold_host : gameState.gold_guest} - Your Bid: {mode == modes.Host ? gameState.bid_host : gameState.bid_guest}<br /><br />
						</div>

						<button disabled={disableBidButtons} on:click={() => bid(1)} class="round">+1</button>
						<button disabled={disableBidButtons} on:click={() => bid(3)} class="round">+3</button>
						<button disabled={disableBidButtons} on:click={() => bid(5)} class="round">+5</button>

						<div style="clear:both;width:100%;margin-top:20px;">
							<input disabled={disableBidButtons} type="button" on:click={passCard} class="button" value="Pass On Card" />
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
					<div style="font-size:20px;color:#95a2e4;">
						{#if mode == modes.Host}
							{#if gameState.bid_host > gameState.bid_guest}
								🢀
							{:else if gameState.bid_host < gameState.bid_guest}
								🢂
							{:else}
								&nbsp;
							{/if}
						{/if}
						{#if mode == modes.Guest}
							{#if gameState.bid_host < gameState.bid_guest}
								🢀
							{:else if gameState.bid_host > gameState.bid_guest}
								🢂
							{:else}
								&nbsp;
							{/if}
						{/if}
					</div>
				</div>
			</td>
			<td align="center" class="component-ui" style="min-height: 125px;">
				{#if (mode == modes.Guest && gameState.deck_host.length >= deckSize) || (mode == modes.Host && gameState.deck_guest.length >= deckSize)}
					Draft Complete
					<input id="deck-id-right" class="game-code-input" value={buildDeckCode(mode == modes.Guest ? gameState.deck_host : gameState.deck_guest)} onclick="this.select();" type="text" />
					<input type="button" class="button" on:click={() => copyGameId('deck-id-right')} value="Copy Deck Code" />
				{:else if gameState.ready_guest == true && gameState.ready_host == true}
					Opponent Gold: {mode == modes.Host ? gameState.gold_guest : gameState.gold_host}<br /><br />
					Opponent Bid: {mode == modes.Host ? gameState.bid_guest : gameState.bid_host}
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
		cursor: pointer;
	}
	button.round:disabled {
		background-color: #092e42;
		box-shadow: 0 2px 4px #000;
		color: white;
		cursor: default;
	}

	.current-bid {
		font-size: 55px;
		width: 100%;
	}
</style>
