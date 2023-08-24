<script>
	import { afterUpdate, onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { API_URL } from '$lib/store.js';
	import { DECK_EVENT } from '$lib/store.js';
	import PowerTable from '../components/power-table.svelte';
	import tippy from 'tippy.js';
	import 'tippy.js/dist/tippy.css';
	import 'tippy.js/themes/light-border.css';

	let cdn = get(API_URL);

	export let showPowerTable = true;
	export let cards = [];

	afterUpdate(() => {
		bindToolTips();
	});

	let tippyInstance = null;
	function bindToolTips() {
		if (tippyInstance) {
			tippyInstance.forEach((instance) => instance.destroy());
		}
		tippyInstance = new tippy('[data-tippy-content]', {
			theme: 'light-border',
			delay: [200, 200],
			maxWidth: 200,
			placement: 'bottom'
		});
	}

	// I don't love this, we're creating an event other child components can sub too so we can remove cards when clicked within this component
	// looking for a better way but for now this seems resonable.
	function cardClicked(card) {
		$DECK_EVENT = card.id;
	}
</script>

<div id="flex-container">
	<div id="deck-view">
		{#each Array(12) as _, index (index)}
			{#if index < cards.length}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
				<img id="card{index + 1}" on:click={cardClicked(cards[index])} data-tippy-content={cards[index].desc} class="cards cursor" alt="" src="{cdn}/images/cards/{cards[index].id}.webp" />
			{:else}
				<img id="card{index + 1}" class="cards" alt="Card 1" src="/images/deck-blank.png" />
			{/if}
		{/each}
	</div>
	{#if showPowerTable}
		<div>
			<PowerTable />
		</div>
	{/if}
</div>

<style>
	.cards {
		max-width: 92px;
		padding: 4px;
	}
	#deck-view {
		max-width: 600px;
	}
	#flex-container {
		display: flex;
		max-width: 800px;
		margin: auto;
		align-items: center;
	}
	.cursor {
		cursor: pointer;
	}
</style>
