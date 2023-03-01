const artistRouter = require('express').Router();
const artistController = require('../controllers/artist.controller');
const pagination = require('../middlewares/pagination.middleware');

const bodyValidator = require('../middlewares/body.validator');
const artistValidator = require('../validators/artist.validator');
const authJwt = require('../middlewares/auth.jwt.middleware');

artistRouter.route('/')
    .get(pagination( { defaultLimit : 25 } ), artistController.getAll)
    // .post(bodyValidator(artistValidator), artistController.create)
    .post(authJwt(['Admin']), bodyValidator(artistValidator), artistController.create)

artistRouter.route('/:id')
    .get(artistController.getById)
    // .put(bodyValidator(artistValidator), artistController.update)
    .put(authJwt(['Admin']), bodyValidator(artistValidator), artistController.update)
    // .delete(artistController.delete)
    .delete(authJwt(['Admin']), artistController.delete)

module.exports = artistRouter;