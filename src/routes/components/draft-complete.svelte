<script>
	import { onMount } from 'svelte';
	import { buildDeckCode } from '../../lib/global';
	import { DECK } from '$lib/store.js';

	let deckcode = '';
	onMount(async () => {
		deckcode = buildDeckCode($DECK);
	});
	
	function copyDeckCode() {
		navigator.clipboard.writeText(deckcode);
	}
</script>

<div class="component-ui">
	<div>By Thor's hammer, congratulations you've completed your draft!</div>
	<div class="break" />
	<div id="deckcode">
		<input type="text" value={deckcode} /><input on:click={copyDeckCode} type="button" value="Copy Deck Code" />
	</div>
	<div class="break" />
	<div id="newdraft">
		<input type="button"  value="Start a New Draft" />
	</div>
</div>

<style>
	#deckcode {
		display: flex;
	}
	#newdraft {
		display: flex;
	}
	.break {
		flex-basis: 100%;
		height: 25px;
	}
</style>
