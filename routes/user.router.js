const userRouter = require('express').Router();
const userController = require('../controllers/user.controller');
const pagination = require('../middlewares/pagination.middleware');

// Middlewares
const bodyValidator = require('../middlewares/body.validator');
const updateUserValidator = require('../validators/user.validator');
const authJwt = require('../middlewares/auth.jwt.middleware');

userRouter.route('/')
    .get(pagination(), userController.getAll)


userRouter.route('/:id')
    .get(authJwt(['Admin']), userController.getById)
    .put (bodyValidator(updateUserValidator) , userController.update)
    .delete(userController.delete)

module.exports = userRouter;