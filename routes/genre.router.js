const genreRouter = require('express').Router();
const genreController = require('../controllers/genre.controller')

// genreRouter.get('/', () => {})
// genreRouter.get('/:id', () => {})
// genreRouter.post('/', () => {})
// genreRouter.put('/:id', () => {})
// genreRouter.delete('/:id', () => {});

genreRouter.route('/')
    .get(genreController.getAll)
    .post(genreController.create)

genreRouter.route('/:id')
    .get(genreController.getById)
    .put(genreController.update)
    .delete(genreController.delete)

module.exports = genreRouter;