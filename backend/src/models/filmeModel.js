import { prisma } from "../config/prisma.js";

export async function obterTodosFilmes() {
  return await prisma.filme.findMany();
}

export async function obterFilmePorId(id) {
  return await prisma.filme.findUnique({
    where: { id }
  });
}

export async function criarNovoFilme(nome, data, genero) {
  return await prisma.filme.create({
    data: {
      nome: nome.trim(),
      data: data.trim(),
      genero: genero.trim()
    }
  });
}

export async function atualizarFilme(id, novoNome, novaData, novoGenero) {
  const dadosAtualizados = {};

  if (novoNome !== undefined) {
    dadosAtualizados.nome = novoNome.trim();
  }

  if (novaData !== undefined) {
    dadosAtualizados.data = novaData.trim();
  }

  if (novoGenero !== undefined) {
    dadosAtualizados.genero = novoGenero.trim();
  }

  if (Object.keys(dadosAtualizados).length === 0) {
    return await obterFilmePorId(id);
  }

  try {
    return await prisma.filme.update({
      where: { id },
      data: dadosAtualizados
    });
  } catch (error) {
    return null;
  }
}

export async function excluirFilme(id) {
  try {
    return await prisma.filme.delete({
      where: { id }
    });
  } catch (error) {
    return null;
  }
}
