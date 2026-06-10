import { Link } from "react-router-dom";

function Sobre() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <header className="bg-slate-900 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">AV1 - DSW</p>
            <h1 className="text-2xl font-semibold">Sobre o projeto</h1>
          </div>

          <nav className="flex gap-2">
            <Link className="rounded-full bg-slate-800 px-4 py-2 text-sm font-medium text-slate-300" to="/">
              Catálogo
            </Link>
            <Link className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white" to="/sobre">
              Sobre
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <section className="rounded-2xl bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold">Sobre o projeto</h2>
          <p className="mt-4 text-slate-600">
            Este projeto mostra um fluxo completo de dados entre React, API REST, Prisma e MySQL, com cadastro e listagem de filmes.
          </p>
          <p className="mt-3 text-slate-600">
            A interface consome os endpoints da API e permite cadastrar, visualizar, editar e excluir registros diretamente no banco.
          </p>
        </section>
      </main>
    </div>
  );
}

export default Sobre;
