import { CreateUserUseCase } from "@/modules/users/application/useCases/create-user-useCase";
import { PrismaUserRepository } from "@/modules/users/infra/database/prisma/user-prisma-repository";
import { HttpResponseMapper } from "@/shared/kernel/mappers/http-response.mapper";
import type { FastifyReply, FastifyRequest } from "fastify";
import type { CreateUserInput } from "../validators/user.shema";

const prismaUserRespository = new PrismaUserRepository();
const createUserUseCase = new CreateUserUseCase(prismaUserRespository);
// <RawServerDefault, IncomingMessage, ServerResponse<IncomingMessage>, RouteGenericInterface, unknown, FastifySchema, ZodTypeProvider, FastifyBaseLogger>

export async function CreateUserController(
	request: FastifyRequest<{ Body: CreateUserInput }>,
	reply: FastifyReply
) {
	const result = await createUserUseCase.execute({
		email: request.body.email,
		name: request.body.name,
		password: request.body.password,
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
			message: "Usuários encontrados com sucesso.",
		})
	);
}
