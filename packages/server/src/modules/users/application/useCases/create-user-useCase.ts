import { type Either, left, right } from "@/shared/kernel/errors/either";
import bcrypt from "bcrypt";
import type { User } from "../../domain/user.entity";
import type { UserRepository } from "../../domain/user.repository";
import type { CreateUserInput } from "../../interface/http/validators/user.shema";

export class CreateUserUseCase {
	constructor(private userRepository: UserRepository) {}

	async execute(
		data: CreateUserInput
	): Promise<Either<Error, Omit<User, "updatedAt" | "createAt">>> {
		const userAlreadyExists = await this.userRepository.findByEmail(
			data.email
		);
		if (userAlreadyExists) return left(new Error("Usuário já existe"));

		const hashedPassword = await bcrypt.hash(data.password, 8);

		return right(
			await this.userRepository.create({
				name: data.name,
				email: data.email,
				password: hashedPassword,
				image: null,
			})
		);
	}
}
