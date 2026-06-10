import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FilmeCard from "../components/FilmeCard";
import {
  atualizarFilme,
  buscarFilmePorId,
  cadastrarFilme,
  excluirFilme,
  listarFilmes,
} from "../services/filmeService";

function Home() {
  const [filmes, setFilmes] = useState([]);
  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const [genero, setGenero] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filmeSelecionado, setFilmeSelecionado] = useState(null);
  const [filmeEditandoId, setFilmeEditandoId] = useState(null);

  const carregarFilmes = async () => {
    setLoading(true);
    setError("");

    try {
      const filmesCarregados = await listarFilmes();
      setFilmes(filmesCarregados);
    } catch (err) {
      setError("Não foi possível carregar os filmes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarFilmes();
  }, []);

  const resetarFormulario = () => {
    setNome("");
    setData("");
    setGenero("");
    setFilmeEditandoId(null);
    setFilmeSelecionado(null);
  };

  const handleCadastrarFilme = async (event) => {
    event.preventDefault();

    if (!nome.trim() || !data.trim() || !genero.trim()) {
      setError("Preencha todos os campos para cadastrar ou editar um filme.");
      return;
    }

    try {
      if (filmeEditandoId) {
        await atualizarFilme(filmeEditandoId, { nome, data, genero });
      } else {
        await cadastrarFilme({ nome, data, genero });
      }

      resetarFormulario();
      await carregarFilmes();
    } catch (err) {
      setError(filmeEditandoId ? "Erro ao atualizar o filme." : "Erro ao cadastrar o filme.");
    }
  };

  const handleSelecionarFilme = async (id) => {
    try {
      const filme = await buscarFilmePorId(id);
      setFilmeSelecionado(filme);
      setFilmeEditandoId(null);
      setNome(filme.nome);
      setData(filme.data);
      setGenero(filme.genero);
    } catch (err) {
      setError("Erro ao buscar detalhes do filme.");
    }
  };

  const handleEditarFilme = async (filme) => {
    try {
      const filmeAtualizado = await buscarFilmePorId(filme.id);
      setFilmeEditandoId(filme.id);
      setNome(filmeAtualizado.nome);
      setData(filmeAtualizado.data);
      setGenero(filmeAtualizado.genero);
      setFilmeSelecionado(filmeAtualizado);
    } catch (err) {
      setError("Erro ao buscar detalhes do filme.");
    }
  };

  const handleExcluirFilme = async (id) => {
    try {
      await excluirFilme(id);
      setFilmes((filmesAtuais) => filmesAtuais.filter((filme) => filme.id !== id));
    } catch (err) {
      setError("Erro ao excluir o filme.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <header className="bg-slate-900 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">AV1 - DSW</p>
            <h1 className="text-2xl font-semibold">Catálogo de Filmes</h1>
          </div>

          <nav className="flex gap-2">
            <Link className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white" to="/">
              Catálogo
            </Link>
            <Link className="rounded-full bg-slate-800 px-4 py-2 text-sm font-medium text-slate-300" to="/sobre">
              Sobre
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold">Cadastrar novo filme</h2>
              <p className="mt-2 text-sm text-slate-500">Adicione um filme para aparecer na lista.</p>

              <form className="mt-5 space-y-3" onSubmit={handleCadastrarFilme}>
                <input
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  type="text"
                  placeholder="Nome do filme"
                  value={nome}
                  onChange={(event) => setNome(event.target.value)}
                />

                <input
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  type="text"
                  placeholder="Data de lançamento"
                  value={data}
                  onChange={(event) => setData(event.target.value)}
                />

                <input
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                  type="text"
                  placeholder="Gênero"
                  value={genero}
                  onChange={(event) => setGenero(event.target.value)}
                />

                <div className="flex gap-2">
                  <button className="flex-1 rounded-xl bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700" type="submit">
                    {filmeEditandoId ? "Salvar alterações" : "Cadastrar Filme"}
                  </button>
                  {filmeEditandoId ? (
                    <button
                      className="rounded-xl border border-slate-300 px-4 py-3 font-medium text-slate-600 transition hover:bg-slate-100"
                      type="button"
                      onClick={resetarFormulario}
                    >
                      Cancelar
                    </button>
                  ) : null}
                </div>
              </form>
            </section>

            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Filmes cadastrados</h2>
                  <p className="text-sm text-slate-500">Listagem consumida pela API REST.</p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">{filmes.length} itens</span>
              </div>

              {error ? (
                <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
              ) : null}

              {loading ? (
                <p className="mt-6 text-sm text-slate-500">Carregando filmes...</p>
              ) : filmes.length === 0 ? (
                <p className="mt-6 text-sm text-slate-500">Nenhum filme cadastrado ainda.</p>
              ) : (
                <div className="mt-6 space-y-3">
                  {filmes.map((filme) => (
                    <FilmeCard
                      key={filme.id}
                      filme={filme}
                      onSelect={handleSelecionarFilme}
                      onEdit={handleEditarFilme}
                      onDelete={handleExcluirFilme}
                    />
                  ))}
                </div>
              )}

              {filmeSelecionado ? (
                <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <h3 className="font-semibold text-slate-800">Detalhes do filme</h3>
                  <p className="mt-2 text-sm text-slate-600">Nome: {filmeSelecionado.nome}</p>
                  <p className="text-sm text-slate-600">Data: {filmeSelecionado.data}</p>
                  <p className="text-sm text-slate-600">Gênero: {filmeSelecionado.genero}</p>
                </div>
              ) : null}
            </section>
          </div>
      </main>
    </div>
  );
}

export default Home;
