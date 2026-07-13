const routes = require('express').Router();
const temples = require('../controllers/temple.js');


/*
 #swagger.tags = ['Temples']
 #swagger.summary = 'Get all temples'
*/
routes.get('/', temples.findAll);

/*
 #swagger.tags = ['Temples']
 #swagger.summary = 'Get a temple by ID'
*/
routes.get('/:temple_id', temples.findOne);

/*
 #swagger.tags = ['Temples']
 #swagger.summary = 'Create a new temple'
*/
routes.post('/', temples.create);

module.exports = routes;
