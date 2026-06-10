function FilmeCard({ filme, onSelect, onEdit, onDelete }) {
  return (
    <article
      className="cursor-pointer rounded-xl border border-slate-200 p-4 transition hover:border-blue-400 hover:shadow-sm"
      onClick={() => onSelect(filme.id)}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-slate-800">{filme.nome}</h3>
          <p className="mt-1 text-sm text-slate-500">Data: {filme.data}</p>
          <p className="text-sm text-slate-500">Gênero: {filme.genero}</p>
        </div>
        <div className="flex flex-wrap gap-2" onClick={(event) => event.stopPropagation()}>
          <button
            className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            onClick={() => onEdit(filme)}
          >
            Editar
          </button>
          <button
            className="rounded-lg bg-red-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-600"
            onClick={() => onDelete(filme.id)}
          >
            Excluir
          </button>
        </div>
      </div>
    </article>
  );
}

export default FilmeCard;
