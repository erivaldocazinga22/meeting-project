import { User } from "@/modules/users/domain/user.entity";
import type { UserRepository } from "@/modules/users/domain/user.repository";
import type { UpdateUserInput } from "@/modules/users/interface/http/validators/user.shema";
import { Prisma as prisma } from "@/shared/infra/database/prisma/prisma-client";

export class PrismaUserRepository implements UserRepository {
	async create(
		data: Omit<User, "id" | "createdAt" | "updatedAt">
	): Promise<User> {
		const user = await prisma.user.create({ data });
		return new User(
			user.id,
			user.name,
			user.image ?? "",
			user.email,
			user.password,
			user.createdAt,
			user.updatedAt
		);
	}

	async findById(id: string): Promise<User | null> {
		const user = await prisma.user.findUnique({ where: { id } });
		return user
			? new User(
					user.id,
					user.name,
					user.email,
					user.image ?? "",
					user.password,
					user.createdAt,
					user.updatedAt
				)
			: null;
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = await prisma.user.findUnique({ where: { email } });
		return user
			? new User(
					user.id,
					user.name,
					user.email,
					user.image ?? "",
					user.password,
					user.createdAt,
					user.updatedAt
				)
			: null;
	}

	async findMany(): Promise<User[] | null> {
		const users = await prisma.user.findMany();
		if (!users) return null;

		const listUsers: User[] = [];
		for (const user in users) {
			if (Object.prototype.hasOwnProperty.call(users, user)) {
				listUsers.push(users[user]);
			}
		}

		return listUsers;
	}

	async delete(id: string): Promise<User | null> {
		const user = await prisma.user.delete({ where: { id } });
		return user
			? new User(
					user.id,
					user.name,
					user.email,
					user.image ?? "",
					user.password,
					user.createdAt,
					user.updatedAt
				)
			: null;
	}

	async update(id: string, data: UpdateUserInput): Promise<User | null> {
		const user = await prisma.user.update({
			where: { id },
			data: {
				name: data.name,
				email: data.email,
			},
		});
		return user
			? new User(
					user.id,
					user.name,
					user.email,
					user.image ?? "",
					user.password,
					user.createdAt,
					user.updatedAt
				)
			: null;
	}

	async updateAvatar(id: string, url: string): Promise<User | null> {
		const user = await prisma.user.update({
			where: { id },
			data: {
				image: url,
			},
		});
		return user
			? new User(
					user.id,
					user.name,
					user.email,
					user.image ?? "",
					user.password,
					user.createdAt,
					user.updatedAt
				)
			: null;
	}
}
