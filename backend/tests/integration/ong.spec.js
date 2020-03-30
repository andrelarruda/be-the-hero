const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {

   // original do vídeo é beforeEach (antes de cada teste)
   beforeAll(async () => {
      // é sempre bom zerar o BD de testes antes de rodar os testes novamente, pois um teste pode influenciar no resultado do outro que virá depois, se isso não for feito.
      await connection.migrate.rollback();
      await connection.migrate.latest();
   });

   // A conexão com o BD fica aberta, mesmo dps de efetuar transações nele. Para não apresentar um warning, devemos fechá-la após todos os testes serem executados.
   afterAll(async () => {
      await connection.destroy();
   });

   it('should be able to create a new ONG', async () => {
      const response = await request(app)
         .post('/ongs')
         .send({
            name: "APAD",
            email: "contato@test.com",
            whatsapp: "4700000000",
            city: "Rio do Sul",
            uf: "SC",
         });

      expect(response.body).toHaveProperty('id');
      expect(response.body.id).toHaveLength(8);
   });

   it('should not be able to create a new ONG', async () => {
      const response = await request(app)
         .post('/ongs')
         .send({
            name: "APAD",
            email: "contato@test.com",
            whatsapp: "4700000000",
            city: "Rio do Sul",
            uf: "SC",
         });

      expect(response.body).toHaveProperty('message');
   })
})

// sobre incluir o header: 51:50

// TESTE DE INTEGRAÇÃO:
/**Testes de integração fazem o teste da aplicação como um todo.
 * Logo ele fará chamadas à API, como se fosse o frontend interagindo com ela.
 *
 * O axios não é recomendado para testes. É Recomendado para chamadas de um frontend.
 * Para testes, será usada a biblioteca chamada supertest (DevDependencies)
 */
