const connection = require('../database/connection');

module.exports = {
   async index(req, res) {
      const ong_id = req.headers.authorization;

      const incidents = await connection('incident')
         .where('ong_id', ong_id)
         .select('*');

      return res.json(incidents);
   }
}

/**
 * A metodologia do MVC diz que não devemos ter mais que 5 métodos em um controller. Devemos ter:
 * Método para listagem (index);
 * Método para retornar um único ítem;
 * Método para criar (create);
 * Método para deletar (delete);
 * Método para atualizar (update).
 * 
 * Caso tenhamos mais que 5 funções em um controller ou uma das funções está repetida, devemos criar um novo controller. Por isso criei este ProfileController.
 * Nele temos a função de listar os casos para uma determinada ONG. Index já existia em IncidentController. Logo não poderia existir outro index para listar os casos de uma ong em IncidentController.
 */