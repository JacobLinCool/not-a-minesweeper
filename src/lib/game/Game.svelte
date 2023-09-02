<script lang="ts">
	import { MAP_COLS, MAP_ROWS } from "$lib/constants";
	import { passable } from "$lib/passable";
	import { Stage, type User } from "$lib/types";
	import { t } from "svelte-i18n";
	import GameBoard from "./GameBoard.svelte";

	export let users: User[] = [];
	let stage = Stage.Prepare;
	let current_user = 0;
	$: user = users[current_user];

	let maps = users.map(() => create_map());

	function create_map() {
		const map = [];
		for (let y = 0; y < MAP_ROWS; y++) {
			const row = [];
			for (let x = 0; x < MAP_COLS; x++) {
				row.push(false);
			}
			map.push(row);
		}
		return map;
	}

	function forward() {
		if (stage === Stage.Prepare) {
			if (current_user === users.length - 1) {
				stage = Stage.Move;
			}
			current_user = (current_user + 1) % users.length;
		} else {
			if (current_user === users.length - 1) {
				stage = Stage.Finish;
			}
			current_user = (current_user + 1) % users.length;
		}
	}

	let cheat = false;
</script>

{#if stage !== Stage.Finish}
	<div class="prose">
		{#if stage === Stage.Prepare}
			{$t("prepare-description")} <br />
		{/if}
		{$t("user-turn", { values: { user: user.name } })}
	</div>

	{#key `${current_user}-${stage}`}
		<GameBoard
			bind:map={maps[stage === Stage.Move ? 1 - current_user : current_user]}
			bind:user
			moving={stage === Stage.Move}
			hide={stage === Stage.Move && !cheat}
			on:finish={forward}
		/>
	{/key}
{:else}
	<div class="prose">
		<h1>{$t("game-over")}</h1>
		{#each users as { name, died }}
			<p>{$t("user-died", { values: { name, time: died } })}</p>
		{/each}
	</div>
{/if}

{#if stage === Stage.Prepare}
	<div>
		<button
			class="btn btn-primary"
			on:click={forward}
			disabled={stage === Stage.Prepare && maps.some((map) => !passable(map))}
		>
			{$t("next")}
		</button>
	</div>
{/if}

{#if stage === Stage.Move}
	<div class="form-control">
		<label class="label cursor-pointer gap-4">
			<span class="label-text">{$t("cheat-mode")}</span>
			<input type="checkbox" class="toggle toggle-secondary" bind:checked={cheat} />
		</label>
	</div>
{/if}
