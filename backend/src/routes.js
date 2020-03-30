const express = require('express');

//Validação: vídeo "Funcionalidades Avançadas" (4:10 - 21:15)
const { celebrate, Segments, Joi } = require('celebrate');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', celebrate({
   [Segments.BODY]: Joi.object().keys({
      id: Joi.string().length(8).required(),
   })
}), SessionController.create);

routes.get('/ongs', OngController.index);
routes.post('/ongs', celebrate({
   [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      whatsapp: Joi.number().required().min(10).max(11),
      city: Joi.string().required(),
      uf: Joi.string().required().length(2),
   })
}), OngController.create);

routes.get('/incidents', celebrate({
   [Segments.QUERY]: Joi.object().keys({
      page: Joi.number(),
   })
}), IncidentController.index);
routes.post('/incidents', celebrate({
   [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
   }).unknown(),
   [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
   })
}), IncidentController.create);
routes.delete('/incidents/:id', celebrate({
   [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
   }).unknown(),
   [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      value: Joi.number().required(),
   })
}), IncidentController.delete);

routes.get('/profile', celebrate({
   [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
   }).unknown(), // Usamos o 'unknown' pois não sabemos quais são tudo o que vai ser enviado no header. Mesmo que enviemos apenas um parâmetro pelo header, não sabemos quais são os obrigatórios.
}), ProfileController.index);

module.exports = routes;