import path from "node:path";
import fastifyCors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import fastifyMultipart from "@fastify/multipart";
import fastifyRateLimit from "@fastify/rate-limit";
import fastifyStatic from "@fastify/static";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { fastify } from "fastify";
import {
	type ZodTypeProvider,
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
} from "fastify-type-provider-zod";
import { env } from "../config/env.config";

export const buildServer = () => {
	const server = fastify().withTypeProvider<ZodTypeProvider>();

	// Configurações globais
	server.setSerializerCompiler(serializerCompiler);
	server.setValidatorCompiler(validatorCompiler);

	// Plugins Fastify
	server.register(fastifyCors, { origin: true });
	server.register(fastifyJwt, { secret: env.JWT_SECRET });
	server.register(fastifyMultipart);
	/*
	 * Registro do Rate limit
	 * max - Máximo de requisições permitidas
	 * timeWindow - Tempo para renovação do limite
	 */
	server.register(fastifyRateLimit, {
		max: 100,
		timeWindow: "1 minute",
		errorResponseBuilder: (_, context) => ({
			status: 429,
			error: "Too Many Requests",
			message: `Você atingiu o limite de ${context.max} requisições por minuto.`,
		}),
	});

	server.register(fastifySwagger, {
		openapi: {
			info: { title: "Meeting Projec", version: "1.0.0" },
			components: {
				securitySchemes: {
					bearerAuth: {
						type: "http",
						scheme: "bearer",
						bearerFormat: "JWT",
					},
				},
			},
			security: [{ bearerAuth: [] }],
		},
		transform: jsonSchemaTransform,
	});

	server.register(fastifySwaggerUi, { routePrefix: "/docs" });
	server.register(fastifyStatic, {
		root: path.join(__dirname, "..", "..", "..", "..", "public"),
	});

	return server;
};
