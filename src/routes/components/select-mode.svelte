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
		<div class="vs-wrapper">
			<img style="" class="vs" alt="vs" src="/images/vs.png" />
			<a href="/bid"><span id="btn-sealed" class="material-symbols-outlined icon mode-sealed">gavel</span><br /><br /></a>
		</div>
		<a class="btn btn-primary mode-sealed" id="btn-sealed-2">Auction Mode</a>
		<div class="start-text">1vs1 draft mode, bid on cards and outsmart your opponent in this realtime draft!<br /><br /><i>(Limited Time Mode)</i></div>
	</div>
</div>

<style>
	.vs-wrapper {
		position:relative;padding:0px;margin:0px;
	}
	.vs {
		position: absolute;
		width: 55px;
		left: 190px;
		top: 100px;
		z-index: 50;
	}
	.container {
		margin-top: 50px;
		display: inline-flex;
		flex-flow: wrap;
		align-items: center;
		justify-content: center;
		width: 100%;
		vertical-align: top;
	}
	.mode {
		width: 300px;
		text-align: center;
		margin: 20px;
		height: 300px;
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
