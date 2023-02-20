const albumRouter = require('express').Router();
const albumController = require('../controllers/album.controller');

albumRouter.route('/')
    .get(albumController.getAll)
    .post(albumController.create)

albumRouter.route('/:id')
    .get(albumController.getById)
    .put(albumController.update)
    .delete(albumController.delete)

module.exports = albumRouter;