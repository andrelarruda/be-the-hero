const connection = require('../database/connection');

module.exports = {
   async create(req, res) {
      const { title, description, value } = req.body;
      const ong_id = req.headers.authorization;

      const [id] = await connection('incident').insert({
         title,
         description,
         value,
         ong_id,
      });

      return res.status(201).json({ id });
   },

   async index(req, res) {
      const { page = 1 } = req.query;

      const [ count ] = await connection('incident')
         .count();

      const incidents = await connection('incident')
         .join('ong', 'ong.id', '=', 'incident.ong_id')
         .limit(5)
         .offset((page - 1) * 5) // esquema de paginação
         .select([
            'incident.*',
            'ong.name',
            'ong.email', 
            'ong.whatsapp', 
            'ong.city', 
            'ong.uf'
         ]);

      // o total de casos deve ser retornado no cabeçalho da resposta
      res.header('X-Total-Count', count['count(*)']);

      return res.send({ incidents });
   },

   async delete(req, res) {
      const { id } = req.params;
      const ong_id = req.headers.authorization;

      const incident = await connection('incident')
         .where('id', id)
         .select('ong_id')
         .first();

      if (!incident || incident.ong_id !== ong_id) {
         return res.status(401).json({ error: "Operation not permitted." })
      }

      // await connection('incident').where('id', id).delete();
      console.log(incident);
      return res.status(204).send();
   }
}