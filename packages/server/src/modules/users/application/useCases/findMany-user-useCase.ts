import type { UserRepository } from "@/modules/users/domain/user.repository";
import { type Either, left, right } from "@/shared/kernel/errors/either";
import type { User } from "../../domain/user.entity";
import { UserMapper } from "../../interface/mappers/user.mapper";

export class FindManyUserUseCase {
	constructor(private userRepository: UserRepository) {}

	async execute(): Promise<
		Either<Error, Omit<User, "password" | "updatedAt">[]>
	> {
		const dbUsers = await this.userRepository.findMany();

		if (!dbUsers) {
			return left(new Error("Falha na busca dos usuários."));
		}

		const userMapper = new UserMapper();
		const users = dbUsers.map(user => userMapper.toHttp(user));

		return right(users);
	}
}
