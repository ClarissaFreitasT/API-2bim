// ========================================
// SERVER - INICIALIZAÇÃO DO SERVIDOR
// ========================================
// Este arquivo é responsável por:
// - Importar a aplicação configurada
// - Iniciar o servidor na porta especificada
// - Separar a lógica de configuração da inicialização

import app from "./app.js";
import { prisma } from "./config/prisma.js";

const PORT = process.env.PORT || 3000;

async function main() {
  try {
    await prisma.$connect();
    app.locals.dbReady = true;
    console.log("Conexão bem-sucedida com o banco de dados!");
  } catch (error) {
    app.locals.dbReady = false;
    console.error("Erro ao conectar ao banco de dados:", error.message);
    console.warn("A API foi iniciada em modo de fallback. Configure o MySQL e reinicie o servidor para ativar o CRUD.");
  }
}

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

await main();

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});