import { FindManyUserUseCase } from "@/modules/users/application/useCases/findMany-user-useCase";
import { PrismaUserRepository } from "@/modules/users/infra/database/prisma/user-prisma-repository";
import { HttpResponseMapper } from "@/shared/kernel/mappers/http-response.mapper";
import type { FastifyReply, FastifyRequest } from "fastify";

const prismaUserRespository = new PrismaUserRepository();
const findManyUserUseCase = new FindManyUserUseCase(prismaUserRespository);

export async function FindManyUserController(
	_request: FastifyRequest,
	reply: FastifyReply
) {
	const result = await findManyUserUseCase.execute();
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
			message: "Usuários encontrados com sucesso.",
			data: result.value,
		})
	);
}
