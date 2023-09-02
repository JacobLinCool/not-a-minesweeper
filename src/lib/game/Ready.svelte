<script lang="ts">
	import { PLAYER_COUNT_MAX, PLAYER_COUNT_MIN, PLAYER_NAME_MAX_LENGTH } from "$lib/constants";
	import type { User } from "$lib/types";
	import { createEventDispatcher } from "svelte";
	import { t } from "svelte-i18n";

	const dispatch = createEventDispatcher<{ start: User[] }>();

	export let users: User[] = [];

	let new_name = "";
	$: ok = !(
		new_name.trim() === "" ||
		users.map((u) => u.name).includes(new_name) ||
		new_name.length > PLAYER_NAME_MAX_LENGTH ||
		users.length >= PLAYER_COUNT_MAX
	);

	function add() {
		if (!ok) {
			return;
		}

		users.push({ name: new_name, died: 0, x: 0, y: 0 });
		users = [...users];
		new_name = "";
	}
</script>

<div class="prose w-full max-w-md">
	<h1>{$t("add-player")}</h1>

	{#if users.length > 0}
		<ul class="menu rounded-box w-full bg-base-200">
			{#each users as { name }}
				<li>
					<button
						class="tooltip m-0 hover:bg-error"
						data-tip="Click to remove"
						on:click={() => (users = users.filter((u) => u.name !== name))}
					>
						{name}
					</button>
				</li>
			{/each}
		</ul>
	{/if}

	<div class="join w-full">
		<input
			class="input join-item input-bordered flex-1"
			placeholder={$t("user-name")}
			bind:value={new_name}
			on:keydown={(e) => e.key === "Enter" && add()}
		/>
		<button class="btn btn-primary join-item rounded-r-full" on:click={add} disabled={!ok}>
			{$t("add")}
		</button>
	</div>

	{#if users.length >= PLAYER_COUNT_MIN && users.length <= PLAYER_COUNT_MAX}
		<div class="mt-4 flex w-full justify-end">
			<button class="btn btn-primary" on:click={() => dispatch("start", users)}>
				{$t("start")}
			</button>
		</div>
	{/if}
</div>
