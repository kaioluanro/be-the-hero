const express = require('express');
const {celebrate , Segments, Joi} = require('celebrate');

const connection = require('./database/connection');

const routers = express.Router();

const OngController = require('./controllers/OngController');
const incidentController = require('./controllers/incidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

routers.get('/ongs', OngController.index);
routers.post('/session', SessionController.create);

// Primeira rota
routers.post('/ongs',celebrate({
  [Segments.BODY]:Joi.object().keys({
    name:Joi.string().required(),
    email:Joi.string().required().email(),
    whatsapp:Joi.string().required().min(10).max(11),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2),
  })
}), OngController.create);

routers.get('/profile',celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown(),
}), ProfileController.index);

routers.get('/incidents',celebrate({
  [Segments.QUERY]:Joi.object().keys({
    page:Joi.number()
  })
}), incidentController.index);

routers.post('/incidents', incidentController.create);
routers.delete('/incidents/:id',celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  })
}), incidentController.delete);

module.exports = routers;