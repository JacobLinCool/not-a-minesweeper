<script lang="ts">
	import { MAP_COLS, MAP_ROWS } from "$lib/constants";
	import { passable } from "$lib/passable";
	import { Stage, type User } from "$lib/types";
	import { t } from "svelte-i18n";
	import GameBoard from "./GameBoard.svelte";

	export let users: [User, User];
	export let cheat = false;
	let stage = Stage.Prepare;
	let map = create_map();

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
			stage = Stage.Move;
		} else {
			stage = Stage.Finish;
		}
	}
</script>

{#if stage !== Stage.Finish}
	{#key `${stage}`}
		<GameBoard
			bind:map
			bind:user={users[1]}
			moving={stage === Stage.Move}
			hide={stage === Stage.Move && !cheat}
			compact={true}
			on:finish={forward}
		/>
	{/key}
{:else}
	<div class="prose">
		<p>{$t("user-died", { values: { name: users[1].name, time: users[1].died } })}</p>
	</div>
{/if}

{#if stage === Stage.Prepare}
	<div>
		<button
			class="btn btn-primary"
			on:click={forward}
			disabled={stage === Stage.Prepare && !passable(map)}
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
