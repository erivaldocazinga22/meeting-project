import type {
	UpdateAvatarUserInput,
	UpdateUserInput,
} from "../interface/http/validators/user.shema";
import type { User } from "./user.entity";

export interface UserRepository {
	findMany(): Promise<User[] | null>;
	create(user: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<User>;
	findById(id: string): Promise<User | null>;
	findByEmail(email: string): Promise<User | null>;
	delete(id: string): Promise<User | null>;
	update(id: string, data: UpdateUserInput): Promise<User | null>;
	updateAvatar(id: string, url: string): Promise<User | null>;
}
