import type { UserRepository } from "@/modules/users/domain/user.repository";
import { type Either, left, right } from "@/shared/kernel/errors/either";
import { ZodError } from "zod";
import type { User } from "../../domain/user.entity";
import {
	type UpdateUserInput,
	UpdateUserSchema,
} from "../../interface/http/validators/user.shema";
import { UserMapper } from "../../interface/mappers/user.mapper";

export class UpdateUserUseCase {
	constructor(private userRepository: UserRepository) {}

	async execute(
		userId: string,
		data: UpdateUserInput
	): Promise<Either<Error | ZodError, Omit<User, "password" | "updatedAt">>> {
		const {
			success,
			data: requestBody,
			error,
		} = UpdateUserSchema.safeParse(data);
		if (!success) {
			return left(new ZodError(error.issues));
		}
		if (!userId)
			return left(
				new Error("ERROR: 'userId' é um parametro obrigatório.")
			);
		const user = await this.userRepository.findById(userId);

		if (!user) {
			return left(
				new Error(`Falha na busca do usuário com o ID=${userId}.`)
			);
		}

		const upadatedUser = await this.userRepository.update(user.id, {
			name: requestBody.name,
			email: requestBody.email,
		});

		if (!upadatedUser) {
			return left(
				new Error(
					`Falha na actualização do usuário com o ID=${userId}.`
				)
			);
		}

		const userMapper = new UserMapper();
		return right(userMapper.toHttp(user));
	}
}
