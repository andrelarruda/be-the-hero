const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/connection');

module.exports = {
   async create(req, res) {
      const { name, email, whatsapp, city, uf } = req.body;

      const busca = await connection('ong').select('*').where({
         name,
      });

      if (busca.length !== 0) {
         return res.status(400).send({ message: "ONG já cadastrada." });
      }

      const id = generateUniqueId();

      await connection('ong').insert({
         id,
         name,
         email,
         whatsapp,
         city,
         uf,
      });

      return res.status(201).send({ id });
   },

   async index(req, res) {
      const ongs = await connection('ong').select('*');

      return res.json(ongs);
   },
}