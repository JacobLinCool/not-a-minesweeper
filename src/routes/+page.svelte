<script lang="ts">
	import { PLAYER_COUNT_MAX, PLAYER_COUNT_MIN } from "$lib/constants";
	import Game from "$lib/game/Game.svelte";
	import Ready from "$lib/game/Ready.svelte";
	import type { User } from "$lib/types";

	let users: User[] = [];

	let started = false;
	function start() {
		if (users.length < PLAYER_COUNT_MIN || users.length > PLAYER_COUNT_MAX) {
			return;
		}
		started = true;
	}
</script>

<div class="flex h-full w-full flex-col items-center justify-center gap-4 p-2">
	{#if !started}
		<Ready bind:users on:start={start} />
	{:else}
		<Game bind:users />
	{/if}
</div>
