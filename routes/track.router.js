const trackRouter = require('express').Router();

trackRouter.route('/')
    .get(() => {})
    .post(() => {})

trackRouter.route('/:id')
    .get(() => {})
    .put(() => {})
    .delete(() => {})

module.exports = trackRouter;