
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
db.Genre = require('./genre.model')(sequelize);
db.Album = require('./album.model')(sequelize);
db.Artist = require('./artist.model')(sequelize);
db.Track = require('./track.model')(sequelize);
db.MM_Artist_Track = require('./mm_artist_track.model')(sequelize);
db.User = require('./user.model')(sequelize);



// Définition des relations
// Track <-> Genre(One to Many)
db.Genre.hasMany(db.Track);
// A.hasMany(B) indique une relation entre A et B où la foreign key sera côté B
db.Track.belongsTo(db.Genre);
// A.belongsTo(B) indique une relation en A et B où la foreign key sera côté A

// Track <-> Album(Many to Many)
db.Track.belongsToMany(db.Album, { through : 'MM_Album_Track' });
db.Album.belongsToMany(db.Track, { through : 'MM_Album_Track' });
// A.belongsToMany(B, { through : C }) indique une relation entre A et B via une table intermédiaire où on aura deux foreign key, renvoyant à A (et B)

// (Many to Many avec attribut)
// Comme on a un attribut en plus, on crée un model, on l'associe à db dans le lien, plutôt que de mettre un nom pour la table intermédiaire, on met notre modèle
db.Track.belongsToMany(db.Artist, { through : db.MM_Artist_Track});
db.Artist.belongsToMany(db.Track, { through : db.MM_Artist_Track});


// Track <-> User (Many to many)
db.User.belongsToMany(db.Track, { through : 'MM_User_Track' });
db.Track.belongsToMany(db.User, { through : 'MM_User_Track' });



// export de db
module.exports = db;