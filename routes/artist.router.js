const artistRouter = require('express').Router();
const artistController = require('../controllers/artist.controller');
const pagination = require('../middlewares/pagination.middleware');

artistRouter.route('/')
    .get(pagination( { defaultLimit : 25 } ), artistController.getAll)
    .post(artistController.create)

artistRouter.route('/:id')
    .get(artistController.getById)
    .put(artistController.update)
    .delete(artistController.delete)

module.exports = artistRouter;