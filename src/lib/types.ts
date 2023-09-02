export interface User {
	name: string;
	died: number;
	x: number;
	y: number;
}

export enum Stage {
	Prepare,
	Move,
	Finish,
}
