// ========================================
// MODEL - CAMADA DE DADOS
// ========================================
// Esta camada é responsável por:
// - Armazenar os dados (em memória, banco de dados, etc.)
// - Implementar a lógica de negócio
// - Realizar operações CRUD (Create, Read, Update, Delete)

/**
 * Array que armazena os filmes temporariamente
 * Observação: esses dados somem quando o servidor reinicia
 * Futuramente, isso será substituído por um banco de dados
 */
const filmes = [
    {
        id: 1,
        nome: "O Poderoso Chefão",
        data: "1972",
        genero: "Crime, Drama"
    },

    {
        id: 2,
        nome: "O Senhor dos Anéis: O Retorno do Rei",
        data: "2003",
        genero: "Fantasia"
    },

    {
        id: 3,
        nome: "Titanic",
        data: "1997",
        genero: "Romance"
    },

    {
        id: 4,
        nome: "O Rei Leão",
        data: "1994",
        genero: "Animação"
    },

    {
        id: 5,
        nome: "Jurassic Park",
        data: "1993",
        genero: "Aventura"
    },

    {
        id: 6,
        nome: "Os Vingadores",
        data: "2012",
        genero: "Ação"
    },

    {
        id: 7,
        nome: "Toy Story",
        data: "1995",
        genero: "Animação"
    },

    {
        id: 8,
        nome: "Pousando no Amor",
        data: "2019",
        genero: "Comédia romântica"
    },

    {
        id: 9,
        nome: "O Itaewon Class",
        data: "2020",
        genero: "Drama"
    },

    {
        id: 10,
        nome: "A O Amor Mora ao Lado",
        data: "2024",
        genero: "Comédia romântica"
    },

    {
        id: 11,
        nome: "Sweet Home",
        data: "2020",
        genero: "Terror"
    },

    {
        id: 12,
        nome: "Pretendente Surpresa",
        data: "2022",
        genero: "Comédia romântica"
    }
];

// ========================================
// FUNÇÕES AUXILIARES
// ========================================

/**
 * Procura o índice de um filme no array com base no id
 * @param {number} id - ID do filme a ser encontrado
 * @returns {number} - Índice do filme ou -1 se não encontrar
 */
function encontrarIndiceFilme(id) {
  for (let i = 0; i < filmes.length; i++) {
    if (filmes[i].id === id) {
      return i;
    }
  }
  return -1;
}

/**
 * Gera um novo id para o próximo filme
 * Se o array estiver vazio, começa com 1
 * Caso contrário, pega o maior id existente e soma 1
 * @returns {number} - Novo ID gerado
 */
function gerarNovoId() {
  if (filmes.length === 0) return 1;

  let maiorId = 0;
  for (let i = 0; i < filmes.length; i++) {
    if (filmes[i].id > maiorId) {
      maiorId = filmes[i].id;
    }
  }

  return maiorId + 1;
}

// ========================================
// OPERAÇÕES CRUD
// ========================================

/**
 * Retorna todos os filmes cadastrados
 * @returns {Array} - Array com todos os filmes
 */
export function obterTodosFilmes() {
  return filmes;
}

/**
 * Procura um filme específico pelo id
 * @param {number} id - ID do filme a ser buscado
 * @returns {Object|null} - O filme encontrado ou null
 */
export function obterFilmePorId(id) {
  const indice = encontrarIndiceFilme(id);

  if (indice === -1) return null;

  return filmes[indice];
}

/**
 * Cria um novo filme
 * Os campos são limpos com trim() para remover espaços extras
 * @param {string} nome - Nome do filme
 * @param {string} data - Ano ou data do filme
 * @param {string} genero - Gênero do filme
 * @returns {Object} - O filme criado
 */
export function criarNovoFilme(nome, data, genero) {
  const novoFilme = {
    id: gerarNovoId(),
    nome: nome.trim(),
    data: data.trim(),
    genero: genero.trim()
  };

  filmes.push(novoFilme);
  return novoFilme;
}

/**
 * Atualiza um filme existente
 * Pode atualizar nome, data e/ou gênero
 * @param {number} id - ID do filme a ser atualizado
 * @param {string} novoNome - Novo nome (opcional)
 * @param {string} novaData - Nova data (opcional)
 * @param {string} novoGenero - Novo gênero (opcional)
 * @returns {Object|null} - O filme atualizado ou null se não encontrar
 */
export function atualizarFilme(id, novoNome, novaData, novoGenero) {
  const indice = encontrarIndiceFilme(id);

  if (indice === -1) return null;

  const filme = filmes[indice];

  if (novoNome !== undefined) {
    filme.nome = novoNome.trim();
  }

  if (novaData !== undefined) {
    filme.data = novaData.trim();
  }

  if (novoGenero !== undefined) {
    filme.genero = novoGenero.trim();
  }

  return filme;
}

/**
 * Exclui um filme pelo id
 * @param {number} id - ID do filme a ser excluído
 * @returns {Object|null} - O filme removido ou null se não encontrar
 */
export function excluirFilme(id) {
  const indice = encontrarIndiceFilme(id);

  if (indice === -1) return null;

  const filmeRemovido = filmes[indice];

  filmes.splice(indice, 1);

  return filmeRemovido;
}
