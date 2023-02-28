const trackRouter = require('express').Router();
const trackController = require('../controllers/track.controller');
const pagination = require('../middlewares/pagination.middleware');

const bodyValidator = require('../middlewares/body.validator');
const {createTrackValidator, updateTrackValidator} = require('../validators/track.validator');


trackRouter.route('/')
    .get(pagination( { defaultLimit : 10, maxLimit : 100  } ), trackController.getAll)
    .post(bodyValidator(createTrackValidator), trackController.create)

trackRouter.route('/:id')
    .get(trackController.getById)
    .put(bodyValidator(updateTrackValidator), trackController.update)
    .delete(trackController.delete)


// trackRouter.route('/Genre/:id')
//     .get(trackController.getByGenre)

module.exports = trackRouter;