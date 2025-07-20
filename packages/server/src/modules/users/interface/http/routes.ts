import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { CreateUserController } from "./controllers/create-user-controller";
import { DeleteUserController } from "./controllers/delete-user-controller";
import { FindManyUserController } from "./controllers/find-many-user-controller";
import { FindOneUserController } from "./controllers/find-one-user-controller";
import { UpdateAvatarUserController } from "./controllers/update-avatar-user-controller";
import { UpdateUserController } from "./controllers/update-user-controller";
import { CreateUserSchema, UpdateUserSchema } from "./validators/user.shema";

export const UserRoutes: FastifyPluginAsyncZod = async server => {
	server.get(
		"",
		{
			schema: {
				tags: ["User"],
				summary: "Listar todos os utilizadores",
			},
		},
		FindManyUserController
	);

	server.get(
		"/:id",
		{
			schema: {
				tags: ["User"],
				summary: "Listar um utilizador pelo seu id",
			},
		},
		FindOneUserController
	);

	server.post(
		"",
		{
			schema: {
				tags: ["User"],
				summary: "Cadastrar novo utilizador",
				body: CreateUserSchema,
			},
		},
		CreateUserController
	);

	server.delete(
		"/:id",
		{
			schema: {
				tags: ["User"],
				summary: "Apagar um utilizador pelo seu id",
			},
		},
		DeleteUserController
	);

	server.put(
		"/:id",
		{
			schema: {
				tags: ["User"],
				summary: "Actualizar um utilizador pelo seu id",
				params: z.object({ id: z.string() }),
				body: UpdateUserSchema,
			},
		},
		UpdateUserController
	);

	server.put(
		"/:id/avatar",
		{
			schema: {
				tags: ["User"],
				summary: "Actualizar avatar",
			},
		},
		UpdateAvatarUserController
	);
};
