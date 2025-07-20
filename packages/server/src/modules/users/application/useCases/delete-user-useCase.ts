import type { UserRepository } from "@/modules/users/domain/user.repository";
import { type Either, left, right } from "@/shared/kernel/errors/either";
import type { User } from "../../domain/user.entity";
import { UserMapper } from "../../interface/mappers/user.mapper";

export class DeleteUserUseCase {
	constructor(private userRepository: UserRepository) {}

	async execute(
		userId: string
	): Promise<Either<Error, Omit<User, "password" | "updatedAt">>> {
		if (!userId)
			return left(
				new Error("ERROR: 'userId' é um parametro obrigatório.")
			);
		const user = await this.userRepository.delete(userId);

		if (!user) {
			return left(
				new Error(`Falha ao deletar o usuário com o ID=${userId}.`)
			);
		}

		const userMapper = new UserMapper();
		return right(userMapper.toHttp(user));
	}
}
