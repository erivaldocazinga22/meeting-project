import type { User } from "@/modules/users/domain/user.entity";

export class UserMapper {
	toHttp(user: User) {
		return {
			id: user.id,
			name: user.name,
			email: user.email,
			image: user.image,
			createdAt: user.createdAt,
		};
	}
}
