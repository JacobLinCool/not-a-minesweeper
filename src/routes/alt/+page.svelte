<script lang="ts">
	import GameAlt from "$lib/game/GameAlt.svelte";
	import type { User } from "$lib/types";

	function create(): [User, User] {
		return [
			{
				name: "Team A",
				died: 0,
				x: 0,
				y: 0,
			},
			{
				name: "Team B",
				died: 0,
				x: 0,
				y: 0,
			},
		];
	}

	const users1 = create();
	const users2 = create().reverse() as [User, User];
</script>

<div class="h-full w-full overflow-auto p-4">
	<div class="flex w-full flex-col items-center justify-center gap-4">
		<GameAlt users={users1} />
		<GameAlt users={users2} />
	</div>
</div>
