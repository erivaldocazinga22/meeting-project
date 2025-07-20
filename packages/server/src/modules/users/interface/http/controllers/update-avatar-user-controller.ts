import { UpdateAvatarUserUseCase } from "@/modules/users/application/useCases/update-avatar-user-useCase";
import { PrismaUserRepository } from "@/modules/users/infra/database/prisma/user-prisma-repository";
import { HttpResponseMapper } from "@/shared/kernel/mappers/http-response.mapper";
import type { FastifyReply, FastifyRequest } from "fastify";

const prismaUserRespository = new PrismaUserRepository();
const updateAvatarUserUseCase = new UpdateAvatarUserUseCase(
	prismaUserRespository
);

export async function UpdateAvatarUserController(
	request: FastifyRequest,
	reply: FastifyReply
) {
	const data = await request.file();

	if (!data) {
		return reply
			.code(400)
			.send({ message: "No file uploaded", status: 400 });
	}

	const buffer = await data.toBuffer();

	const httpResponseMapper = new HttpResponseMapper();
	/* const result = await updateAvatarUserUseCase.execute(request.params.id, {
		image: file,
	}); 

	if (result.isLeft()) {
		return reply.status(400).send(
			httpResponseMapper.toHttp({
				message: result.value.message,
				status: 400,
			})
		);
	}
		*/

	reply.status(200).send(
		httpResponseMapper.toHttp({
			status: 200,
			message: "Avatar actualizado com sucesso.",
			data: buffer,
		})
	);
}
