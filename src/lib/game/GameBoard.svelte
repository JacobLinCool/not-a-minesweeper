<script lang="ts">
	import type { User } from "$lib/types";
	import Icon from "@iconify/svelte";
	import { createEventDispatcher } from "svelte";
	import { scale } from "svelte/transition";

	const dispatch = createEventDispatcher<{ finish: unknown }>();

	export let moving = true;
	export let hide = false;
	export let map: boolean[][];
	export let user: User;

	function move(x: number, y: number) {
		if (Math.abs(x - user.x) + Math.abs(y - user.y) !== 1) {
			return;
		}

		if (y < 0 || y >= map.length || x < 0 || x >= map[y].length) {
			return;
		}

		if (map[y][x]) {
			user.died++;
			model.showModal();
			return;
		}

		user.x = x;
		user.y = y;

		if (x === map[y].length - 1 && y === map.length - 1) {
			dispatch("finish");
		}
	}

	let model: HTMLDialogElement;
</script>

<div>
	<div class="grid grid-cols-6 gap-4">
		{#each map as row, y}
			{#each row as cell, x}
				<button
					class="rounded-box flex h-12 w-12 items-center justify-center transition-colors"
					class:bg-rose-300={cell && !hide}
					class:bg-base-200={!(
						moving && Math.abs(x - user.x) + Math.abs(y - user.y) === 1
					) && !(cell && !hide)}
					class:bg-emerald-100={moving &&
						!(cell && !hide) &&
						Math.abs(x - user.x) + Math.abs(y - user.y) === 1}
					on:click={() => (moving ? move(x, y) : (cell = !cell))}
				>
					{#if x === user.x && y === user.y}
						<div transition:scale>
							<Icon icon="mdi:hail" inline class="h-6 w-6" />
						</div>
					{:else if x === row.length - 1 && y === map.length - 1}
						<Icon icon="mdi:flag-variant" inline class="h-6 w-6" />
					{/if}
				</button>
			{/each}
		{/each}
	</div>
</div>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={model}
	class="modal"
	on:click={(evt) => {
		if (evt.currentTarget === evt.target) {
			model.close();
		}
	}}
>
	<form method="dialog" class="modal-box">
		<div class="prose">
			Exploded!

			<p>
				You have died {user.died} times.
			</p>
		</div>
	</form>
</dialog>
