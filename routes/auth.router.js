const authController = require('../controllers/auth.controller');

// Middlewares
const bodyValidator = require('../middlewares/body.validator');
const { registerValidator, loginValidator} = require('../validators/auth.validator');


const authRouter = require('express').Router();

authRouter.route('/register')
    .post(bodyValidator(registerValidator), authController.register)

authRouter.route('/login')
    .post(bodyValidator(loginValidator), authController.login)

module.exports = authRouter;