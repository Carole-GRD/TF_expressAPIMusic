const userRouter = require('express').Router();
const userController = require('../controllers/user.controller');
const pagination = require('../middlewares/pagination.middleware');

// Middlewares
const bodyValidator = require('../middlewares/body.validator');
const updateUserValidator = require('../validators/user.validator');
const authJwt = require('../middlewares/auth.jwt.middleware');


userRouter.route('/')
    .get(pagination(), userController.getAll)
    // .get(authJwt(), pagination(), userController.getAll)


userRouter.route('/:id')
    // .get(userController.getById)
    .get(authJwt(), userController.getById)
    // TODO : dans getById, vérifier si Admin, si pas, vérifier id similaire
    // .put (bodyValidator(updateUserValidator) , userController.update)
    .put (authJwt(), bodyValidator(updateUserValidator) , userController.update)
    // TODO : dans le update , vérifier si Admin, si  pas, vérifier id similaire
    // .delete(userController.delete)
    .delete(authJwt(['Admin']),userController.delete)

module.exports = userRouter;