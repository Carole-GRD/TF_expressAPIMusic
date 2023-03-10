// Lien vers GitLab de Aude
// https://gitlab.com/tfwebfullstack/tfwebfsexpressapimusic


// Configuration des variables d'environnement
require('dotenv').config();

// Import d'express
const express = require('express');

// Import des cors
const cors = require('cors');


// Importdu middleware express-async-errors
require('express-async-errors');

// Créationdu serveur
const app = express();


// Utilisation des cors
app.use(cors());


// Import db
const db = require('./models');
// Connection à la db
db.sequelize.authenticate()
    .then(() => console.log('Connection DB successfull'))
    .catch((err) => console.log(`Connection DB failed : `, err))
// Synchrodb
// A faire seulement si on est en dev
if (process.env.NODE_ENV === 'developement') {
    // db.sequelize.sync({ force : true });
    // ↑ supprime les tables et recrée tout à chaque sync

    // db.sequelize.sync({ alter : { drop : false } });
    // ↑ regarde l'état actuel de la db, ajoute ce qui peut-être ajouté, modifie les colonnes, suppression de colonnes et/ou tables interdites
    
    // db.User.sync({ alter : { drop : false } });
    // ↑ pour sunchro juste un model
}


// Middleware app-lvl
app.use(express.json());  // Permet d'utiliser du json enpost, put, patch (body en json)
app.use(express.static('public'));  // permet de rendre le dossier public consultable sur le serveur


// Router
const router = require('./routes');
app.use('/api', router);

// Ecoute serveur
app.listen(process.env.PORT, () => {
    console.log(`Server API started on port : ${process.env.PORT}`);
})