# API-2bim

Projeto prático de AV1 com frontend React, backend Node.js/Express e banco MySQL com Prisma.

## Objetivo

Este projeto apresenta um fluxo completo de dados entre frontend, API REST e banco de dados, com cadastro, listagem, edição e exclusão de filmes.

## Estrutura

- backend/: API REST com CRUD de filmes
- frontend/: interface React com Tailwind CSS

## Como rodar

### Backend
```bash
cd backend
npm install
copy .env.example .env
npx prisma migrate dev
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Acesso

- Frontend: http://localhost:5173
- Backend: http://localhost:3000
