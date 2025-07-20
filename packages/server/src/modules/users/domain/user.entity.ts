export class User {
	constructor(
		public readonly id: string,
		public name: string,
		public email: string,
		public image: string | null,
		public password: string,
		public readonly createdAt: Date,
		public readonly updatedAt: Date
	) {}
}
