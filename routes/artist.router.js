const artistRouter = require('express').Router();

artistRouter.route('/')
    .get(() => {})
    .post(() => {})

artistRouter.route('/:id')
    .get(() => {})
    .put(() => {})
    .delete(() => {})

module.exports = artistRouter;