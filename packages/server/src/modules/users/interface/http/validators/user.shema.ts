import { z } from "zod";

export const CreateUserSchema = z.object({
	name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
	email: z.string().email("Email inválido"),
	password: z
		.string()
		.min(6, "Palavra-passe deve ter pelo menos 6 caracteres"),
});

export const UpdateUserSchema = z.object({
	name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
	email: z.string().email("Email inválido"),
});

export const UpdateAvatarUserSchema = z.object({
	image: z.instanceof(File),
});

export type CreateUserInput = z.infer<typeof CreateUserSchema>;
export type UpdateUserInput = z.infer<typeof UpdateUserSchema>;
export type UpdateAvatarUserInput = z.infer<typeof UpdateAvatarUserSchema>;
