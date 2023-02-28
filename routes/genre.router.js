const genreRouter = require('express').Router();
const genreController = require('../controllers/genre.controller');
const pagination = require('../middlewares/pagination.middleware');

const bodyValidator = require('../middlewares/body.validator');
const genreValidator = require('../validators/genre.validator');

// genreRouter.get('/', () => {})
// genreRouter.get('/:id', () => {})
// genreRouter.post('/', () => {})
// genreRouter.put('/:id', () => {})
// genreRouter.delete('/:id', () => {});


// pour utiliser un middleware (route, middlewares, controller)
genreRouter.route('/')
    .get(pagination( { defaultLimit : 30, maxLimit : 200 } ), genreController.getAll)
    .post(bodyValidator(genreValidator)  , genreController.create)

genreRouter.route('/:id')
    .get(genreController.getById)
    .put(bodyValidator(genreValidator)  , genreController.update)
    .delete(genreController.delete)

module.exports = genreRouter;