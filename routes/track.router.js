const trackRouter = require('express').Router();
const trackController = require('../controllers/track.controller');
const pagination = require('../middlewares/pagination.middleware');

const bodyValidator = require('../middlewares/body.validator');
const {createTrackValidator, updateTrackValidator} = require('../validators/track.validator');
const authJwt = require('../middlewares/auth.jwt.middleware');



trackRouter.route('/')
    .get(pagination( { defaultLimit : 10, maxLimit : 100  } ), trackController.getAll)
    .post(bodyValidator(createTrackValidator), trackController.create)
    // .post(authJwt(['Admin']), bodyValidator(createTrackValidator), trackController.create)



// ----------------------------------------------------
trackRouter.route('/like')
    .get(authJwt(), trackController.getByLike)
    // .get(trackController.getByLike)
    // .get((req, res) => { res.sendStatus(501); })
// ----------------------------------------------------



trackRouter.route('/:id')
    .get(trackController.getById)
    .put(bodyValidator(updateTrackValidator), trackController.update)
    // .put(authJwt(['Admin']), bodyValidator(updateTrackValidator), trackController.update)
    .delete(trackController.delete)
    // .delete(authJwt(['Admin']), trackController.delete)


trackRouter.route('/:id/like')      // .../api/track/4/like    -> où 4 est l'id de la track liké
    // .post(trackController.like)
    .post(authJwt(), trackController.like)


trackRouter.route('/:id/dislike')
    .delete(authJwt(), trackController.dislike)




// trackRouter.route('/genre/:id')
//     .get(trackController.getByGenre)


// trackRouter.route('/search')
//     .get(trackController.getByGenre)


module.exports = trackRouter;