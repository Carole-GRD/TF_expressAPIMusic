const userRouter = require('express').Router();
const userController = require('../controllers/user.controller');
const pagination = require('../middlewares/pagination.middleware');

const bodyValidator = require('../middlewares/body.validator');
const updateUserValidator = require('../validators/user.validator');

userRouter.route('/')
    .get(pagination(), userController.getAll)


userRouter.route('/:id')
    .get(userController.getById)
    .put (bodyValidator(updateUserValidator) , userController.update)
    .delete(userController.delete)

module.exports = userRouter;