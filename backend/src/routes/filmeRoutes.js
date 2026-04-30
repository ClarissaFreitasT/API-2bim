// ========================================
// ROUTES - CAMADA DE ROTAS
// ========================================
// Esta camada é responsável por:
// - Definir as rotas da aplicação
// - Mapear URLs para os controllers correspondentes
// - Organizar as rotas por recurso/entidade

import express from "express";
import * as FilmeController from "../controllers/tarefaController.js";

// Cria um roteador do Express
const router = express.Router();

// ========================================
// DEFINIÇÃO DAS ROTAS DE FILMES
// ========================================

/**
 * GET /filmes - Lista todos os filmes
 */
router.get("/filmes", FilmeController.listarFilmes);

/**
 * GET /filmes/:id - Obtém um filme específico
 */
router.get("/filmes/:id", FilmeController.obterFilme);

/**
 * POST /filmes - Cria um novo filme
 */
router.post("/filmes", FilmeController.criarFilme);

/**
 * PATCH /filmes/:id - Atualiza um filme parcialmente
 */
router.patch("/filmes/:id", FilmeController.atualizarFilme);

/**
 * DELETE /filmes/:id - Remove um filme
 */
router.delete("/filmes/:id", FilmeController.excluirFilme);

// Exporta o roteador para ser usado no app principal
export default router;
