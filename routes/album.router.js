const albumRouter = require('express').Router();

albumRouter.route('/')
    .get(() => {})
    .post(() => {})

albumRouter.route('/:id')
    .get(() => {})
    .put(() => {})
    .delete(() => {})

module.exports = albumRouter;