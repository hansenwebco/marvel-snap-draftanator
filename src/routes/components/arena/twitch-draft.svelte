<script>
	import tmi from 'tmi.js';

	let card1 = 0;
	let card2 = 0;
	let card3 = 0;
	export let totalCards = 0;
	let voters = [];

	export let connected = false;
	let channel = '';

	function toggleLive() {
		let tab = document.getElementById('live-start');
		tab.style.display = tab.style.display === 'block' ? 'none' : 'block';
		document.getElementById('live-tab').innerHTML = tab.style.display === 'none' ? 'Draft With Twitch' : 'Close';
	}
	export const resetVotes = () => {
		card1 = 0;
		card2 = 0;
		card3 = 0;
		totalCards = 0;
		voters.length = 0;
		if (connected) {
			document.getElementById('vote-1').innerHTML = '0%';
			document.getElementById('vote-2').innerHTML = '0%';
			document.getElementById('vote-3').innerHTML = '0%';
		}
	};
	function connectTwitch() {
		console.log('Connecting to Twitch...');
		channel = document.getElementById('vote-url').value.trim();
		if (channel.length <= 0) {
			alert('Must enter a channel name.');
			return;
		}
		const client = new tmi.Client({
			channels: [channel]
		});

		client.connect();

		client.on('connected', (address, port) => {
			connected = true;
			console.log('Connected to Twitch successfully...');
		});

		client.on('disconnected', (reason) => {
			console.log('Disconnected from Twitch ' + reason);
			alert('Disconnected from Twitch');
			connected = false;
		});

		client.on('message', (channel, tags, message, self) => {
			const username = tags.username;
			if (!voters.includes(username)) {
				if (message.toLowerCase() === '#card1') {
					card1++;
					totalCards++;
				} else if (message.toLowerCase() === '#card2') {
					card2++;
					totalCards++;
				} else if (message.toLowerCase() === '#card3') {
					card3++;
					totalCards++;
				}
				if (totalCards > 0) {
					// no divide by zero plz
					if (connected) {
						document.getElementById('vote-1').innerHTML = Math.round((card1 / totalCards) * 100) + '%';
						document.getElementById('vote-2').innerHTML = Math.round((card2 / totalCards) * 100) + '%';
						document.getElementById('vote-3').innerHTML = Math.round((card3 / totalCards) * 100) + '%';
					}
				}
				//console.log(card1, card2, card3, totalCards);
				voters.push(username);
			} else {
				//console.log(username + ' already voted..');
			}
		});
	}
</script>

<div id="live">
	<div id="live-start" class="live-start">
		{#if !connected}
			Connect to Twitch your chat, enter your channel name:
			<br /><br />
			<div class="input-group mb-3">
				<input type="text" class="form-control text-input" aria-describedby="startStreamVote" value="" style="width:300px;" id="vote-url" />
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<a class="button" id="startStreamVote" on:click={() => connectTwitch()}>Connect</a><br/><br/>
				<span class="small"><i>(no Twitch permissions are required to enable voting)</i></span>
			</div>
		{:else}
			You're connected to Twitch channel {channel}.
		{/if}
	</div>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click={() => toggleLive()} id="live-tab">Draft With Twitch</div>
</div>

<style>
	#live {
		position: absolute;
		right: 30px;
		top: 0px;
		width: 550px;
	}

	#live-tab {
		background-color: red;
		padding: 10px;
		font-size: 10px;
		width: 170px;
		margin: auto;
		text-align: center;
		cursor: pointer;
	}
	.small { 
		font-size:10px;
	}
	.live-start {
		font-size: 12px;
		background-color: #222;
		padding: 30px;
		margin: 0px;
		border-bottom-left-radius: 25px;
		border-bottom-right-radius: 25px;
		border: solid 1px #eee;
		display: none;
		text-align: center;
	}
</style>
