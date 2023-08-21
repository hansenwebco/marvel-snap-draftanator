<div class="container">
	<div class="mode">
		<a href="/arena"><span id="btn-arena" class="material-symbols-outlined icon mode-arena">public</span></a><br /><br />
		<a class="btn btn-primary mode-arena" id="btn-arena-2">Arena Mode</a>
		<div class="start-text">Choose one of three cards for twelve rounds to build your deck!</div>
	</div>

	<div class="mode">
		<a href="/sealed"><span id="btn-sealed" class="material-symbols-outlined icon mode-sealed">batch_prediction</span><br /><br /></a>
		<a class="btn btn-primary mode-sealed" id="btn-sealed-2">Sealed Mode</a>
		<div class="start-text">Open five packs of random cards and build the best deck you can!</div>
	</div>

	<div class="mode">
		<a href="/bid"><span id="btn-sealed" class="material-symbols-outlined icon mode-sealed">gavel</span><br /><br /></a>
		<a class="btn btn-primary mode-sealed" id="btn-sealed-2">Auction Mode</a>
		<div class="start-text">Bid on cards and outsmart your opponent in this realtime draft!</div>
	</div>

</div>

<style>
	.container {
		margin-top: 50px;
		display: inline-flex;
		flex-flow: wrap;
		align-items: center;
		justify-content: center;
		width: 100%;
	}
	.mode {
		width: 300px;
		text-align: center;
		margin: 20px;
	}
	.icon {
		font-size: 120px;
		color: white;
		background-color: #2f4294;
		border-radius: 10px;
		padding: 10px;
		border: solid 3px white;
		filter: drop-shadow(0 0 15px #111);
	}
	.start-text {
		font-size: 12px;
		width: 200px;
		justify-content: center;
		margin: auto;
		margin-top: 35px;
	}
</style>
