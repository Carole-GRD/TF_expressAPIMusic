const genreRouter = require('express').Router();
const genreController = require('../controllers/genre.controller');
const pagination = require('../middlewares/pagination.middleware');

// genreRouter.get('/', () => {})
// genreRouter.get('/:id', () => {})
// genreRouter.post('/', () => {})
// genreRouter.put('/:id', () => {})
// genreRouter.delete('/:id', () => {});


// pour utiliser un middleware (route, middlewares, controller)
genreRouter.route('/')
    .get(pagination( { defaultLimit : 30, maxLimit : 200 } ), genreController.getAll)
    .post(genreController.create)

genreRouter.route('/:id')
    .get(genreController.getById)
    .put(genreController.update)
    .delete(genreController.delete)

module.exports = genreRouter;