# Backend - Lista de Filmes e Séries

Backend em Node.js/Express para gerenciar uma lista pessoal de filmes e séries com autenticação JWT e banco de dados PostgreSQL.

## Tecnologias

- **Node.js** com Express
- **PostgreSQL** com 2 tabelas relacionadas (usuarios, filmes_series)
- **JWT** para autenticação
- **bcryptjs** para hash de senha
- **CORS** para integração com frontend

## Estrutura do Projeto

```
src/
├── config/
│   └── database.js          # Configuração do PostgreSQL
├── controllers/
│   ├── UsuarioController.js # Lógica de autenticação
│   └── FilmeSerieController.js # Lógica de CRUD
├── models/
│   ├── Usuario.js           # Modelo de usuário
│   └── FilmeSerie.js        # Modelo de filme/série
├── routes/
│   ├── usuarioRoutes.js     # Rotas de autenticação
│   └── filmeSerieRoutes.js  # Rotas de CRUD
├── middlewares/
│   └── auth.js              # Middleware de JWT
├── database/
│   └── init.sql             # Script de inicialização
└── server.js                # Entrada da aplicação
```

## Instalação

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Configure o arquivo `.env`:
```
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_NAME=lista_filmes_db
DB_USER=postgres
DB_PASSWORD=postgres
JWT_SECRET=sua_chave_secreta_aqui
NODE_ENV=development
FRONTEND_URL=
```

`FRONTEND_URL` deve conter a URL do frontend publicado (ex: `https://seu-front.vercel.app`),
usada para liberar o CORS em produção. Em desenvolvimento local, as origens
`http://localhost:5500` e `http://127.0.0.1:5500` (padrão do Live Server) já são liberadas
automaticamente — ajuste em `src/server.js` se usar outra porta.

4. Crie o banco de dados PostgreSQL e execute o script `init.sql`:
```bash
psql -U postgres -d lista_filmes_db -f src/database/init.sql
```

## Executar

```bash
npm start
```

O servidor rodará em `http://localhost:3001`

## Usuário de teste

Rode o script de seed para criar um usuário já cadastrado, pronto para login na avaliação:

```bash
npm run seed
```

Credenciais criadas:

| Campo | Valor |
|---|---|
| Email | `teste@teste.com` |
| Senha | `teste123` |

Se preferir, também é possível cadastrar um novo usuário direto pela tela de registro do frontend.

## Endpoints

### Autenticação

- **POST** `/api/usuarios/registrar` - Registrar novo usuário
- **POST** `/api/usuarios/login` - Fazer login
- **GET** `/api/usuarios/perfil` - Obter perfil (requer token)

### Filmes/Séries (requer autenticação)

- **POST** `/api/filmes-series` - Criar novo item
- **GET** `/api/filmes-series` - Listar todos os itens
- **GET** `/api/filmes-series/:id` - Obter item específico
- **PUT** `/api/filmes-series/:id` - Atualizar item
- **DELETE** `/api/filmes-series/:id` - Deletar item
- **PATCH** `/api/filmes-series/:id/favorito` - Toggle favorito

## Banco de Dados

### Tabela: usuarios
- `id` (PK)
- `nome`
- `email` (UNIQUE)
- `senha` (hash)
- `criado_em`

### Tabela: filmes_series
- `id` (PK)
- `usuario_id` (FK → usuarios.id)
- `titulo`
- `tipo` (filme/serie)
- `status` (quero-assistir/assistindo/assistido)
- `favorito`
- `criado_em`
- `atualizado_em`

## Autenticação JWT

Envie o token no header:
```
Authorization: Bearer {token}
```

## Exemplos de Uso

### Registrar
```bash
curl -X POST http://localhost:3001/api/usuarios/registrar \
  -H "Content-Type: application/json" \
  -d '{"nome":"João","email":"joao@example.com","senha":"senha123"}'
```

### Login
```bash
curl -X POST http://localhost:3001/api/usuarios/login \
  -H "Content-Type: application/json" \
  -d '{"email":"joao@example.com","senha":"senha123"}'
```

### Criar Filme
```bash
curl -X POST http://localhost:3001/api/filmes-series \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {token}" \
  -d '{"titulo":"Inception","tipo":"filme","status":"assistido"}'
```

## Licença

MIT
