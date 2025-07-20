import { readFileSync } from "node:fs";
import { join } from "node:path";
import readline from "node:readline";
import { env } from "@/shared/infra/config/env.config";
import kleur from "kleur";

const packageJson = JSON.parse(
	readFileSync(join(process.cwd(), "package.json"), "utf-8")
);
const appName = packageJson.name || "App";
const appVersion = packageJson.version || "1.0.0";

export const serverRunning = () => {
	const startTime = Date.now();
	const serverUrl = `http://127.0.0.1:${env.PORT}`;
	const docsUrl = `${serverUrl}/docs`;
	const timeReady = Date.now() - startTime;

	console.log(
		`\n${kleur.bold(
			`${kleur.green(appName.toUpperCase())} ${kleur.green(`v${appVersion}`)} ${kleur.gray("ready in")} ${timeReady} ms`
		)}`
	);
	console.log(kleur.white(`  ➜  Local: ${serverUrl}`));
	console.log(kleur.dim(`  ➜  Docs:  ${docsUrl}`));
	console.log(" ");
	console.log(
		kleur.cyan(
			`  ➜  Press ${kleur.bold("'d' + Enter")} to open the docs in your browser\n`
		)
	);

	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	rl.on("line", async input => {
		if (input.trim().toLowerCase() === "d") {
			try {
				const { default: open } = await import("open");
				await open(docsUrl);
			} catch (err) {
				console.error(kleur.red("Erro ao abrir a documentação:"), err);
			} finally {
				rl.close();
			}
		}
	});
};
