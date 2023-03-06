const albumRouter = require('express').Router();
const albumController = require('../controllers/album.controller');
const pagination = require('../middlewares/pagination.middleware');

const bodyValidator = require('../middlewares/body.validator');
const { albumValidator, albumCoverValidator } = require('../validators/album.validator');
const authJwt = require('../middlewares/auth.jwt.middleware');


// -----------   CONFIG MULTER  --------------

// Import de multer
const multer = require('multer');
// Import de uuid
const uuid = require('uuid');

// Basique
    // On choisit juste la destination, et multer se charge du nom de fichier etc
    // const upload = multer({ dest : 'public/images/covers'});

// Pimpée
    // On choisit la destination et on se charge du nom du fichier etc
    const storage = multer.diskStorage({ 
        // configuration de la destination
        destination : (req, file, callback) => {
            callback(null, 'public/images/covers');
        },
        // configuration du nom de fichier
        filename : (req, file, callback) => {
            console.log('multer file : ', file);
            // Création du nom de fichier
                // Générer un uuid
                const name = uuid.v4();
                // Récupération de l'extension
                // On découpe le nom du fichier
                // ex. : "bad-habits.jpg" mais pourrait être "bad.habits.jpg"
                // on récupère donc ensuite la dernière case du tableau, qui contient l'extension
                const ext = file.originalname.split('.').at(-1);     
                // Renvoi du nom de fichier ainsi créé
                callback(null, name + '.' + ext);
        }
     });
    // const upload = multer({ storage : storage });
    const upload = multer({ storage });


// ---------   FIN CONFIG MULTER  ------------




albumRouter.route('/')
    .get(pagination(), albumController.getAll)
    .post(bodyValidator(albumValidator)  , albumController.create)
    // .post(authJwt(['Admin']), bodyValidator(albumValidator)  , albumController.create)


albumRouter.route('/:id')
    .get(albumController.getById)
    .put(bodyValidator(albumValidator)  , albumController.update)
    // .put(authJwt(['Admin']), bodyValidator(albumValidator)  , albumController.update)
    // Attention la validation du body, doit toujours se faire avant le middleware multer
    // .patch(upload.single('cover'), albumController.updateCover)
    .patch(bodyValidator(albumCoverValidator), upload.single('cover'), albumController.updateCover)
    .delete(albumController.delete)
    // .delete(authJwt(['Admin']), albumController.delete)

    

module.exports = albumRouter;