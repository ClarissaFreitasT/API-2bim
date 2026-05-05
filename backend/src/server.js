// ========================================
// SERVER - INICIALIZAÇÃO DO SERVIDOR
// ========================================
// Este arquivo é responsável por:
// - Importar a aplicação configurada
// - Iniciar o servidor na porta especificada
// - Separar a lógica de configuração da inicialização

import app from "./app.js";

import prisma from "./config/prisma.js";
// Define a porta em que o servidor vai rodar
// Usa a variável de ambiente PORT se existir, senão usa 3000
const PORT = process.env.PORT || 3000;

prisma.$connect()
  .then(() => {
     console.log("BD conectado!");
  })
  .catch((error) => {
     console.error("Erro ao conectar ao banco de dados:", error)
  });



// ========================================
// INICIALIZAÇÃO DO SERVIDOR
// ========================================

// Faz o servidor começar a escutar a porta definida
app.listen(PORT, () => {
  console.log(`========================================`);
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📁 Arquitetura: MVC`);
  console.log(`========================================`);
});
