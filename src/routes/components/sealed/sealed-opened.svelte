<script>
	import { afterUpdate } from 'svelte';
	import { get } from 'svelte/store';
	import { SEALED_CARDS } from '$lib/store.js';
	import { DECK } from '$lib/store.js';
	import { API_URL } from '$lib/store.js';
	import { DECK_EVENT } from '$lib/store.js';
	import { sortCards } from '$lib/global.js';
	import DraftComplete from '../../components/draft-complete.svelte';
	import tippy from 'tippy.js';
	import 'tippy.js/dist/tippy.css';
	import 'tippy.js/themes/light-border.css';
	let cdn = get(API_URL);

	let cards;
	let draftCompleted = false;

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

	SEALED_CARDS.subscribe((c) => {
		cards = c;
	});

	// listens to event generated via the store from the deck-view.svlete component, not sure this is ideal but for now good
	DECK_EVENT.subscribe((cid) => {
		let index = $DECK.findIndex((a) => a.id === cid);
		if (index >= 0 && !draftCompleted) {
			let card = $DECK[index];
			$DECK.splice(index, 1);
			DECK.set($DECK);

			$SEALED_CARDS.push(card);
			SEALED_CARDS.set(sortCards($SEALED_CARDS));

			$DECK_EVENT = 0; // reset our event
		}
	});

	function cardPicked(card) {
		if ($DECK.length < 12) {
			// remove from sealed cards
			$SEALED_CARDS.splice(
				$SEALED_CARDS.findIndex((a) => a.id === card.id),
				1
			);
			cards = $SEALED_CARDS;

			// add to deck
			$DECK.push(card);
			DECK.set(sortCards($DECK));
		}
	}

	function finishDraft() {
		console.log('done');
		draftCompleted = true;
	}
</script>

{#if !draftCompleted}
	{#if $DECK.length > 11}
		<div id="complete-draft">
			<button class="button" on:click={() => finishDraft()}>Complete Your Draft</button>
		</div>
	{/if}

	<div class="component-ui card-align">
		{#each cards as card}
		
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<div><img on:click={cardPicked(card)} data-tippy-content={card.desc} class="card-pick pointer" src="{cdn}/images/cards/{card.id}.webp" alt={card.name} /></div>
			&nbsp;
		{/each}
	</div>
{/if}

{#if draftCompleted}
	<DraftComplete />
{/if}

<style>
	.card-pick {
		width: 110px;
		margin: -2px;
	}

	#complete-draft {
		margin: 10px;
		text-align: center;
	}

	.card-align {
		justify-content: flex-start;
	}
</style>
