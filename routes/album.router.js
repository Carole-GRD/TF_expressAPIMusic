const albumRouter = require('express').Router();
const albumController = require('../controllers/album.controller');
const pagination = require('../middlewares/pagination.middleware');

const bodyValidator = require('../middlewares/body.validator');
const albumValidator = require('../validators/album.validator');

albumRouter.route('/')
    .get(pagination(), albumController.getAll)
    .post(bodyValidator(albumValidator)  , albumController.create)

albumRouter.route('/:id')
    .get(albumController.getById)
    .put(bodyValidator(albumValidator)  , albumController.update)
    .delete(albumController.delete)

module.exports = albumRouter;