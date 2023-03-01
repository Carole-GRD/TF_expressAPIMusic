const userRouter = require('express').Router();
const userController = require('../controllers/user.controller');
const pagination = require('../middlewares/pagination.middleware');

// Middleware
const bodyValidator = require('../middlewares/body.validator');
const updateUserValidator = require('../validators/user.validator');
const authJwt = require('../middlewares/auth.jwt.middleware');

userRouter.route('/')
    .get(pagination(), userController.getAll)


userRouter.route('/:id')
    .get(authJwt(), userController.getById)
    .put (bodyValidator(updateUserValidator) , userController.update)
    .delete(userController.delete)

module.exports = userRouter;