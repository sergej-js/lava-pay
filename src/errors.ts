export class LavaError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'LavaError';
	}
}
