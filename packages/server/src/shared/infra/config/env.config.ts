import { z } from "zod";

const envSchema = z.object({
	PORT: z.coerce.number().default(5500),
	NODE_ENV: z.enum(["production", "development"]).default("production"),
	DATABASE_URL: z
		.string()
		.url(
			"Erro: DATABASE_URL inválida. Forneça uma URL válida de conexão com a base de dados."
		),
	CORS_ORIGIN: z
		.string()
		.min(
			1,
			"Erro: CORS_ORIGIN não pode estar vazio. Defina a origem permitida para requisições."
		),
	JWT_SECRET: z
		.string()
		.min(
			16,
			"Erro: JWT_SECRET deve conter pelo menos 16 caracteres para garantir segurança."
		),
});

export const env = envSchema.parse(process.env);
