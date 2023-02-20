const genreRouter = require('express').Router();

// genreRouter.get('/', () => {})
// genreRouter.get('/:id', () => {})
// genreRouter.post('/', () => {})
// genreRouter.put('/:id', () => {})
// genreRouter.delete('/:id', () => {})

genreRouter.route('/')
    .get(() => {})
    .post(() => {})

genreRouter.route('/:id')
    .get(() => {})
    .put(() => {})
    .delete(() => {})

module.exports = genreRouter;