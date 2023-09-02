export function passable(map: boolean[][]): boolean {
	const rows = map.length;
	const cols = map[0].length;
	const visited = Array.from({ length: rows }, () => new Array(cols).fill(false));
	const queue: [number, number][] = [[0, 0]];

	if (map[0][0]) {
		return false;
	}

	while (queue.length) {
		const [x, y] = queue.shift() as [number, number];
		if (x === rows - 1 && y === cols - 1) {
			return true;
		}
		if (visited[x][y]) {
			continue;
		}
		visited[x][y] = true;
		if (x > 0 && !map[x - 1][y]) {
			queue.push([x - 1, y]);
		}
		if (x < rows - 1 && !map[x + 1][y]) {
			queue.push([x + 1, y]);
		}
		if (y > 0 && !map[x][y - 1]) {
			queue.push([x, y - 1]);
		}
		if (y < cols - 1 && !map[x][y + 1]) {
			queue.push([x, y + 1]);
		}
	}
	return false;
}
