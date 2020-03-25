const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();
const PORT = 3333;

app.use(cors());
app.use(express.urlencoded( { extended: false }));
app.use(express.json());

app.use(routes);

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));

/**
 * Métodos HTTP
 * 
 * GET: Buscar/listar uma informação do back-end
 * POST: Criar uma informação no back-end
 * PUT: Alterar uma informação no back-end
 * DELETE: Deletar uma informação no back-end
 * 
 */

/**
 * Tipos de parâmetros:
 * 
 * Query: Parâmetros nomeados enviados na rota após "?" (Filtros, paginação) (http://localhost:3333/users?name=fulano) {acessado através de req.query}
 * Route Params: Parâmetros utilizados para identificar recursos. (http://localhost:3333/users/1) {acessado através de req.params}
 * Request Body: Corpo da requisição, utilizado para criar ou alterar recursos.
 */

/**
 * SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server
 * NoSQL: MongoDB, CouchDB, etc...
 */

/**
 * Driver: SELECT * FROM users;
 * Query Builder: table('users').select('*').where();
 */

/**
 *  Query builder utilizado: Knex
 * Após instalação: 'npx knex init' para criar o arquivo de configuração.
 */

