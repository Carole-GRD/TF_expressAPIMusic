const artistRouter = require('express').Router();
const artistController = require('../controllers/artist.controller');
const pagination = require('../middlewares/pagination.middleware');

const bodyValidator = require('../middlewares/body.validator');
const artistValidator = require('../validators/artist.validator');

artistRouter.route('/')
    .get(pagination( { defaultLimit : 25 } ), artistController.getAll)
    .post(bodyValidator(artistValidator), artistController.create)

artistRouter.route('/:id')
    .get(artistController.getById)
    .put(bodyValidator(artistValidator), artistController.update)
    .delete(artistController.delete)

module.exports = artistRouter;