# Backend do Catálogo de Filmes

API REST para gerenciamento de filmes, desenvolvida com Node.js, Express, Prisma e MySQL.

## Como executar

1. Entre na pasta do backend:
   ```bash
   cd backend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Crie um arquivo `.env` com a URL do banco MySQL:
   ```env
   PORT=3000
   DATABASE_URL="mysql://usuario:senha@localhost:3306/nome_do_banco"
   ```

4. Execute as migrações:
   ```bash
   npx prisma migrate dev
   ```

5. Inicie a API:
   ```bash
   npm run dev
   ```

A API ficará disponível em http://localhost:3000.

## Arquitetura MVC

### O que é MVC?

MVC é um padrão de arquitetura que separa a aplicação em três camadas principais:

- **Model (Modelo)**: Gerencia os dados e a lógica de negócio
- **View (Visão)**: Apresenta os dados ao usuário (no caso de APIs, são as respostas JSON)
- **Controller (Controlador)**: Processa as requisições e coordena Model e View

### Benefícios

- ✅ **Separação de responsabilidades**: Cada camada tem uma função específica
- ✅ **Manutenibilidade**: Código mais fácil de entender e modificar
- ✅ **Escalabilidade**: Facilita a adição de novos recursos
- ✅ **Testabilidade**: Permite testar cada camada independentemente
- ✅ **Reutilização**: Código pode ser reutilizado em diferentes contextos

## 📂 Estrutura do Projeto

```
backend/
├── src/
│   ├── models/              # Camada de Dados
│   │   └── filmeModel.js    # Lógica de negócio dos filmes + Prisma
│   │
│   ├── controllers/         # Camada de Controle
│   │   └── filmeController.js   # Processa requisições HTTP
│   │
│   ├── routes/              # Definição de Rotas
│   │   └── filmeRoutes.js   # Rotas da API
│   │
│   ├── config/              # Configurações
│   │   └── prisma.js        # Instância do Prisma
│   │
│   ├── views/               # Camada de Apresentação
│   │   └── README.md
│   │
│   ├── app.js               # Configuração do Express
│   └── server.js            # Inicialização do servidor
│
├── prisma/
│   ├── schema.prisma        # Schema do banco de dados
│   ├── migrations/          # Histórico de migrações
│   └── migration_lock.toml
│
├── .env                     # Variáveis de ambiente
├── package.json
└── README.md
```

## 🔄 Fluxo de uma Requisição

```
Cliente → Rota → Controller → Model → Banco (Prisma) → Controller → Resposta JSON (View)
```

**Exemplo prático:**

1. **Cliente** faz uma requisição: `GET /filmes`
2. **Rota** (`filmeRoutes.js`) identifica a rota e chama o controller
3. **Controller** (`filmeController.js`) recebe a requisição
4. **Controller** chama o **Model** (`filmeModel.js`) para buscar os dados
5. **Model** usa o **Prisma** para consultar o banco **MySQL**
6. **Prisma** retorna os dados para o **Model**
7. **Model** retorna os dados para o **Controller**
8. **Controller** envia a resposta JSON de volta ao **Cliente**

## 🚀 Como Executar

### Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd API-2bim/backend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o banco de dados no arquivo `.env`:
```env
PORT=3000
DATABASE_URL = "mysql://usuario:senha@localhost:3306/nome_banco"
NODE_ENV=development
```

4. Execute as migrações do Prisma:
```bash
npx prisma migrate dev
```

5. Inicie o servidor:
```bash
npm run dev
```

O servidor estará rodando em: `http://localhost:3000`

---## 📡 Endpoints da API

### Listar todos os filmes

```http
GET http://localhost:3000/filmes
```

**Resposta (200):**
```json
[
  {
    "id": 1,
    "nome": "Inception",
    "data": "2010-07-16",
    "genero": "Ficção Científica"
  },
  {
    "id": 2,
    "nome": "The Matrix",
    "data": "1999-03-31",
    "genero": "Ficção Científica"
  }
]
```

---

### Obter um filme específico

```http
GET http://localhost:3000/filmes/1
```

**Resposta (200):**
```json
{
  "id": 1,
  "nome": "Inception",
  "data": "2010-07-16",
  "genero": "Ficção Científica"
}
```

**Resposta (404) - Filme não encontrado:**
```json
{
  "erro": "Filme não encontrado"
}
```

---

### Criar um novo filme

```http
POST http://localhost:3000/filmes
Content-Type: application/json

{
  "nome": "Interstellar",
  "data": "2014-11-07",
  "genero": "Ficção Científica"
}
```

**Resposta (201):**
```json
{
  "mensagem": "Filme criado com sucesso!",
  "filme": {
    "id": 3,
    "nome": "Interstellar",
    "data": "2014-11-07",
    "genero": "Ficção Científica"
  }
}
```

---

### Atualizar um filme (PATCH)

```http
PATCH http://localhost:3000/filmes/1
Content-Type: application/json

{
  "nome": "Inception (Atualizado)"
}
```

**Resposta (200):**
```json
{
  "mensagem": "Filme atualizado com sucesso!",
  "filme": {
    "id": 1,
    "nome": "Inception (Atualizado)",
    "data": "2010-07-16",
    "genero": "Ficção Científica"
  }
}
```

---

### Excluir um filme

```http
DELETE http://localhost:3000/filmes/1
```

**Resposta (200):**
```json
{
  "mensagem": "Filme excluído com sucesso!"
}
```

---

## 🧪 Testando a API

### Opção 1: cURL

```bash
# Listar filmes
curl http://localhost:3000/filmes

# Criar filme
curl -X POST http://localhost:3000/filmes \
  -H "Content-Type: application/json" \
  -d '{"nome":"Novo Filme","data":"2024-01-01","genero":"Ação"}'

# Atualizar filme
curl -X PATCH http://localhost:3000/filmes/1 \
  -H "Content-Type: application/json" \
  -d '{"nome":"Filme Atualizado"}'

# Deletar filme
curl -X DELETE http://localhost:3000/filmes/1
```

### Opção 2: Postman/Insomnia

1. Abra **Postman** ou **Insomnia**
2. Crie um novo projeto
3. Importe as requisições acima ou crie manualmente
4. Defina a URL base: `http://localhost:3000`
5. Teste cada endpoint

---

## 🎯 Detalhes das Camadas

### 📊 Model (`models/filmeModel.js`)

Responsável por:

- Gerenciar dados via **Prisma ORM**
- Implementar lógica de negócio
- Operações CRUD (Create, Read, Update, Delete)
- Comunicar com o banco MySQL

**Funções principais:**

- `obterTodosFilmes()` - Retorna todos os filmes
- `obterFilmePorId(id)` - Busca filme por ID
- `criarNovoFilme(nome, data, genero)` - Cria novo filme
- `atualizarFilme(id, nome, data, genero)` - Atualiza filme
- `excluirFilme(id)` - Deleta filme

### 🎮 Controller (`controllers/filmeController.js`)

Responsável por:

- Receber requisições HTTP
- Validar dados de entrada
- Chamar métodos do Model
- Retornar respostas HTTP apropriadas
- Tratamento de erros

**Funções principais:**

- `listarFilmes(req, res)` - GET /filmes
- `obterFilme(req, res)` - GET /filmes/:id
- `criarFilme(req, res)` - POST /filmes
- `atualizarFilme(req, res)` - PATCH /filmes/:id
- `excluirFilme(req, res)` - DELETE /filmes/:id

### 🛣️ Routes (`routes/filmeRoutes.js`)

Responsável por:

- Definir as rotas da API
- Mapear URLs para controllers
- Organizar endpoints por recurso

### ⚙️ App (`app.js`)

Responsável por:

- Configurar middlewares (JSON parsing, etc)
- Registrar rotas
- Configurar tratamento de erros (404)
- Exportar a aplicação configurada

### 🖥️ Server (`server.js`)

Responsável por:

- Importar a aplicação
- Iniciar o servidor na porta especificada
- Separar lógica de configuração da inicialização

---

## 📦 Banco de Dados - Prisma

### Schema (`prisma/schema.prisma`)

```prisma
model Filme {
  id     Int    @id @default(autoincrement())
  nome   String
  data   String
  genero String
}
```

### Comandos úteis

```bash
# Visualizar o banco em interface web
npx prisma studio

# Criar nova migração após alterar schema
npx prisma migrate dev --name nome_da_migracao

# Aplicar migrações de produção
npx prisma migrate deploy
```

---

## 🔮 Próximos Passos

- [ ] Adicionar autenticação e autorização (JWT)
- [ ] Implementar validação com bibliotecas (Joi, Zod)
- [ ] Criar testes unitários e de integração
- [ ] Adicionar paginação nas listagens
- [ ] Implementar tratamento de erros centralizado
- [ ] Documentar API com Swagger
- [ ] Adicionar relacionamentos entre tabelas
- [ ] Implementar soft delete

---

## 🛠️ Tecnologias

- **Node.js**: Ambiente de execução JavaScript
- **Express.js**: Framework web minimalista
- **Prisma ORM**: ORM para JavaScript/TypeScript
- **MySQL**: Banco de dados relacional
- **dotenv**: Gerenciamento de variáveis de ambiente

---

## 📝 Scripts Disponíveis

```bash
npm run dev     # Inicia o servidor em modo desenvolvimento com nodemon
npm start       # Inicia o servidor em produção
```

---

## ⚠️ Observações Importantes

- A aplicação usa **ES Modules** (import/export ao invés de require)
- Os dados são persistidos no **MySQL** via **Prisma**
- As variáveis de ambiente estão no arquivo `.env`
- Certifique-se de que o MySQL está rodando antes de iniciar a aplicação

---

## 📖 Aprendizado

Este projeto é ideal para entender:

- ✅ Como estruturar uma API REST funcional
- ✅ O que é e como aplicar o padrão MVC
- ✅ Separação de responsabilidades
- ✅ Como usar Prisma com MySQL
- ✅ CRUD completo com validações
- ✅ Boas práticas de organização de código
- ✅ Como preparar um projeto para crescer

---

Desenvolvido para fins educacionais 🎓
