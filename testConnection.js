import  prisma  from "./src/prisma/client.js";

async function testConnection() {
  try {
    console.log("🔌 Testing connection with database...");

    // Só verifica se a conexão consegue rodar uma query simples
    const result = await prisma.$queryRaw`SELECT NOW()`;
    console.log("✅ Connected to database:", result);

  } catch (error) {
    console.error("Error connecting to the database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
