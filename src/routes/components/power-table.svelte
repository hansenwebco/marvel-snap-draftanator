<script>
	import { DECK } from '$lib/store.js';

	let energy1, energy2, energy3, energy4, energy5, energy6;

	let cards = [];
	let energy = new Array(5);  // local variable to bind to the table

	DECK.subscribe((c) => {
		cards = c;
		UpdateTable();
	});

	function UpdateTable() {
		for (let x = 0; x < 6; x++) {
			var count = cards.filter((elm) => {
				if (x == 5) return elm.energy >= x + 1;
				else return elm.energy == x + 1;
			}).length;

			energy[x] = count > 0 ? count * 10 : 1 ;
		}
	}
</script>

<table id="energy-table">
	<tr id="top-table">
		{#each Array(6) as _, index (index)}
			<td valign="bottom"><div class="energy" style="height:{energy[index]}px" /></td>
		{/each}
	</tr>
	<tr>
		<td>1</td>
		<td>2</td>
		<td>3</td>
		<td>4</td>
		<td>5</td>
		<td>6+</td>
	</tr>
</table>

<style>
	#energy-table {
		margin-left: 30px;
		border-collapse: collapse;
	}

	#top-table {
		height: 70px;
		border-left: solid 1px #1e6ff4;
		border-bottom: solid 1px #1e6ff4;
	}
	tr {
		display: table-row;
		vertical-align: inherit;
		border-color: inherit;
	}
	#top-table {
		height: 70px;
		border-left: solid 1px #1e6ff4;
		border-bottom: solid 1px #1e6ff4;
	}
	td {
		font-size: 8px;
		text-align: center;
	}
	.energy {
		width: 10px;
		background-color: #1e6ff4;
	}
</style>
