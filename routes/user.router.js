const userRouter = require('express').Router();
const userController = require('../controllers/user.controller');
const pagination = require('../middlewares/pagination.middleware');

// Middlewares
const bodyValidator = require('../middlewares/body.validator');
const updateUserValidator= require('../validators/user.validator');
// const { updateUserValidator, updateAvatarValidator } = require('../validators/user.validator');
const authJwt = require('../middlewares/auth.jwt.middleware');


// -----------   CONFIG MULTER  --------------
const multer = require('multer');
const uuid = require('uuid');

const storage = multer.diskStorage({ 
    destination : (req, file, callback) => {
        callback(null, 'public/images/avatars');
    },
    filename : (req, file, callback) => {
        console.log('multer file : ', file);
            const name = uuid.v4();
            const ext = file.originalname.split('.').at(-1);     
            callback(null, name + '.' + ext);
    }
    });
const upload = multer({ storage });
// ---------   FIN CONFIG MULTER  ------------



userRouter.route('/')
    .get(pagination(), userController.getAll)
    // .get(authJwt(), pagination(), userController.getAll)


userRouter.route('/:id')
    // .get(userController.getById)
    .get(authJwt(), userController.getById)
    // TODO : dans getById, vérifier si Admin, si pas, vérifier id similaire
    .put (userController.update)
    // .put (bodyValidator(updateUserValidator), userController.update)
    // .put (authJwt(), bodyValidator(updateUserValidator) , userController.update)
    // TODO : dans le update , vérifier si Admin, si  pas, vérifier id similaire
    .patch(authJwt(), upload.single('avatar'), userController.updateAvatar)
    // .patch(authJwt(), bodyValidator(updateAvatarValidator), upload.single('avatar'), userController.updateAvatar)
    // .delete(userController.delete)
    .delete(authJwt(['Admin']),userController.delete)

module.exports = userRouter;