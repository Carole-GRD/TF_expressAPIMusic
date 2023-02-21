
const { Sequelize } = require('sequelize');

// Récupération des variables d'environnement
const { DB_SERVER, DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;

// Initialisation Sequelize
const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_SERVER,
    dialect: 'mssql'
}) 


// Création de l'objet db
const db = {}


// Ajout de l'instance sequelize créée prcédemment sur l'objet db
db.sequelize = sequelize;


// Liaison modèles  <--> db


// éefinition des relations

// export de db
module.exports = db;