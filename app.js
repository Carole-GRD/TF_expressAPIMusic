// Configuration des variables d'environnement
require('dotenv').config();

// Import d'express
const express = require('express');
// Importdu middleware express-async-errors
require('express-async-errors');

// Créationdu serveur
const app = express();


// Connection à la db
// Synchrodb



// Middleware app-lvl


// Router
const router = require('./routes');
app.use('/api', router);

// Ecoute serveur
app.listen(process.env.PORT, () => {
    console.log(`Server API started on port : ${process.env.PORT}`);
})