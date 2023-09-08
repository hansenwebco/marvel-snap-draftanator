<script>
	import { onMount } from 'svelte';
    let version = process.env.GITHUB_RUN_NUMBER ? process.env.GITHUB_RUN_NUMBER : "-" ;

</script>

<div id="footer">
	Created by <a target="_blank" rel="noreferrer" href="https://www.stonedonkey.com">stonedonkey</a> ● Follow on <a target="_blank" rel="noreferrer" href="https://twitch.tv/stonedonkey">Twitch</a> ●
	<a target="_blank" rel="noreferrer" href="https://mastodon.social/@stonedonkey">Mastodon</a>
	<br /><br />
	<a href="https://discord.gg/xXh7kccEbe" target="_blank" rel="noreferrer">Discord</a> ●
	<a target="_blank" rel="noreferrer" href="https://github.com/hansenwebco/marvel-snap-draftanator">Github</a> ●
	<a target="_blank" rel="noreferrer" href="https://github.com/hansenwebco/marvel-snap-draftanator/issues">Bugs</a> ●
	<span id="version">version: {version}</span>
</div>

<style>
	#footer {
		font-family: 'Orbitron', Arial, Helvetica, sans-serif;
		margin-top: 60px;
		font-size: 10px;
		text-align: center;
		margin-bottom: 50px;
	}
</style>
