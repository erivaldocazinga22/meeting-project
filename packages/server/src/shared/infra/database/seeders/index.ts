import { Prisma as prisma } from "../prisma/prisma-client";

async function seedDatabase() {
	console.log("🌱 Iniciando seed do banco de dados...");
}

seedDatabase()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async error => {
		console.error("❌ Erro durante o seed:", error);
		await prisma.$disconnect();
	});
