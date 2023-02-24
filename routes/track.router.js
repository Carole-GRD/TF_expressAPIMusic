const trackRouter = require('express').Router();
const trackController = require('../controllers/track.controller');
const pagination = require('../middlewares/pagination.middleware');

trackRouter.route('/')
    .get(pagination( { defaultLimit : 10, maxLimit : 100  } ), trackController.getAll)
    .post(trackController.create)

trackRouter.route('/:id')
    .get(trackController.getById)
    .put(trackController.update)
    .delete(trackController.delete)

module.exports = trackRouter;