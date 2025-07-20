import "module-alias/register";
import "tsconfig-paths/register";
import { serverRunning } from "@/shared/kernel/server-run";
import { env } from "../config/env.config";
import { MainRoute } from "./routes";
import { buildServer } from "./server";

class App {
	private server = buildServer();
	private port: number;
	private host: string;

	constructor(port: number, host = "0.0.0.0") {
		this.port = port ?? 5500;
		this.host = host;

		this.setupRoutes();
		this.setupGracefulShutdown();
	}

	private setupRoutes() {
		this.server.register(MainRoute, { prefix: "/api" });
	}

	private setupGracefulShutdown() {
		const shutdown = async () => {
			console.log("🔄 Encerrando servidor...");
			await this.server.close();
			console.log("✅ Servidor encerrado com sucesso.");
			process.exit(0);
		};

		process.on("SIGINT", shutdown);
		process.on("SIGTERM", shutdown);
	}

	public async start() {
		try {
			await this.server
				.listen({ port: this.port, host: this.host })
				.then(serverRunning);
		} catch (error) {
			console.error("❌ Erro ao iniciar o servidor:", error);
			process.exit(1);
		}
	}
}

new App(env.PORT).start();
