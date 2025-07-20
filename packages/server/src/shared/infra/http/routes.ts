import { UserRoutes } from "@/modules/users/interface/http/routes";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export const MainRoute: FastifyPluginAsyncZod = async server => {
	server.get(
		"/",
		{
			schema: {
				description:
					"Página inicial da aplicação (interface de boas-vindas).",
				tags: ["Home"],
				summary: "Págin inicial",
			},
		},
		(_request, reply) => {
			return reply.type("text/html").sendFile("index.html");
		}
	);

	server.register(UserRoutes, { prefix: "/users" });
};
