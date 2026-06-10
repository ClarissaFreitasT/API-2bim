import axios from "axios";

const API_URL = "http://localhost:3000/filmes";

export async function listarFilmes() {
  const response = await axios.get(API_URL);
  return response.data;
}

export async function buscarFilmePorId(id) {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
}

export async function cadastrarFilme(dados) {
  const response = await axios.post(API_URL, dados);
  return response.data;
}

export async function atualizarFilme(id, dados) {
  const response = await axios.patch(`${API_URL}/${id}`, dados);
  return response.data;
}

export async function excluirFilme(id) {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
}
