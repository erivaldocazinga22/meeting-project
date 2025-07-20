import { UpdateUserUseCase } from "@/modules/users/application/useCases/update-user-useCase";
import { PrismaUserRepository } from "@/modules/users/infra/database/prisma/user-prisma-repository";
import { HttpResponseMapper } from "@/shared/kernel/mappers/http-response.mapper";
import type { FastifyReply, FastifyRequest } from "fastify";
import type { UpdateUserInput } from "../validators/user.shema";

const prismaUserRespository = new PrismaUserRepository();
const updateUserUseCase = new UpdateUserUseCase(prismaUserRespository);

export async function UpdateUserController(
	request: FastifyRequest<{ Body: UpdateUserInput; Params: { id: string } }>,
	reply: FastifyReply
) {
	const result = await updateUserUseCase.execute(request.params.id, {
		email: request.body.email,
		name: request.body.name,
	});

	const httpResponseMapper = new HttpResponseMapper();
	if (result.isLeft()) {
		return reply.status(400).send(
			httpResponseMapper.toHttp({
				message: result.value.message,
				status: 400,
			})
		);
	}

	reply.status(200).send(
		httpResponseMapper.toHttp({
			status: 200,
			message: "Usuário actualizado com sucesso.",
		})
	);
}
