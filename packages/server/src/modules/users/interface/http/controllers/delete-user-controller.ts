import { DeleteUserUseCase } from "@/modules/users/application/useCases/delete-user-useCase";
import { PrismaUserRepository } from "@/modules/users/infra/database/prisma/user-prisma-repository";
import { HttpResponseMapper } from "@/shared/kernel/mappers/http-response.mapper";
import type { FastifyReply, FastifyRequest } from "fastify";

const prismaUserRespository = new PrismaUserRepository();
const deleteUserUseCase = new DeleteUserUseCase(prismaUserRespository);

export async function DeleteUserController(
	request: FastifyRequest<{ Params: { id: string } }>,
	reply: FastifyReply
) {
	const result = await deleteUserUseCase.execute(request.params.id);
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
			message: "Usuário deletado com sucesso.",
		})
	);
}
