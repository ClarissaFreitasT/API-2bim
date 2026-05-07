// ========================================
// CONTROLLER - CAMADA DE CONTROLE
// ========================================
// Esta camada é responsável por:
// - Receber as requisições HTTP
// - Validar os dados recebidos
// - Chamar os métodos do Model
// - Retornar as respostas adequadas

import * as FilmeModel from "../models/filmeModel.js";

/**
 * Retorna todos os filmes em formato JSON
 * @route GET /filmes
 */
export async function listarFilmes(req, res) {
  const filmes = await FilmeModel.obterTodosFilmes();
  res.json(filmes);
}

/**
 * Retorna um filme específico com base no id enviado na URL
 * @route GET /filmes/:id
 */
export async function obterFilme(req, res) {
  const idNumero = Number(req.params.id);

  if (Number.isNaN(idNumero)) {
    return res.status(400).json({ erro: "ID inválido" });
  }

  const filme = await FilmeModel.obterFilmePorId(idNumero);

  if (!filme) {
    return res.status(404).json({ erro: "Filme não encontrado" });
  }

  res.json(filme);
}

/**
 * Cria um novo filme
 * @route POST /filmes
 */
export async function criarFilme(req, res) {
  const { nome, data, genero } = req.body;

  if (typeof nome !== "string" || nome.trim() === "") {
    return res.status(400).json({ erro: "Nome é obrigatório" });
  }

  if (typeof data !== "string" || data.trim() === "") {
    return res.status(400).json({ erro: "Data é obrigatória" });
  }

  if (typeof genero !== "string" || genero.trim() === "") {
    return res.status(400).json({ erro: "Gênero é obrigatório" });
  }

  const filmeCriado = await FilmeModel.criarNovoFilme(nome, data, genero);

  res.status(201).json({
    mensagem: "Filme criado com sucesso!",
    filme: filmeCriado
  });
}

/**
 * Atualiza parcialmente um filme existente
 * @route PATCH /filmes/:id
 */
export async function atualizarFilme(req, res) {
  const idNumero = Number(req.params.id);
  const { nome, data, genero } = req.body;

  if (Number.isNaN(idNumero)) {
    return res.status(400).json({ erro: "ID inválido" });
  }

  if (
    nome !== undefined &&
    (typeof nome !== "string" || nome.trim() === "")
  ) {
    return res.status(400).json({ erro: "Nome inválido" });
  }

  if (
    data !== undefined &&
    (typeof data !== "string" || data.trim() === "")
  ) {
    return res.status(400).json({ erro: "Data inválida" });
  }

  if (
    genero !== undefined &&
    (typeof genero !== "string" || genero.trim() === "")
  ) {
    return res.status(400).json({ erro: "Gênero inválido" });
  }

  const filmeAtualizado = await FilmeModel.atualizarFilme(
    idNumero,
    nome,
    data,
    genero
  );

  if (!filmeAtualizado) {
    return res.status(404).json({ erro: "Filme não encontrado" });
  }

  res.json({
    mensagem: "Filme atualizado com sucesso!",
    filme: filmeAtualizado
  });
}

/**
 * Remove um filme pelo id
 * @route DELETE /filmes/:id
 */
export async function excluirFilme(req, res) {
  const idNumero = Number(req.params.id);

  if (Number.isNaN(idNumero)) {
    return res.status(400).json({ erro: "ID inválido" });
  }

  const filmeRemovido = await FilmeModel.excluirFilme(idNumero);

  if (!filmeRemovido) {
    return res.status(404).json({ erro: "Filme não encontrado" });
  }

  res.json({
    mensagem: "Filme excluído com sucesso!",
    filme: filmeRemovido
  });
}
