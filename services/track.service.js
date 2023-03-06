const { TrackDTO } = require('../dto/track.dto');
const { Genre, Album, Artist, Track } = require('../models');
const db = require('../models');

const trackService = {
    getAll : async (offset, limit) => {
        // const tracks = await db.Track.findAll();
        // return tracks.map(track => new TrackDTO(track));

        const { rows, count } = await db.Track.findAndCountAll({
            distinct :true,
            offset,  
            limit,
            // TODO rajout genre
            // include : Genre
            // TODO rajout albums
            // TODO rajout artists
            include : [ Genre, Album, Artist ]
            // include : [ Genre, Album, { model : Artist, through : { attributes : ['feat'] } }]
        });

        // console.log(rows);

        return {
            tracks : rows.map(track => new TrackDTO(track)),
            count
        }
    },

    getById : async (id) => {
        const track = await db.Track.findByPk(id, {
            // TODO rajout genre
            // TODO rajout albums
            // include : ['Genre', 'Album']
            include : [ Genre, Album, Artist ]
            // TODO rajout artists
        });
        return track ? new TrackDTO(track) : null;
    },

    create : async (trackToAdd) => {
    
        // TODO créer une transaction pour pouvoir faire plusieurs actions db et rollback si problème
        // Ajout de la transaction -> Sécurité pour s'assurer que toutes les opérations en DB à venir soient réalisées ou aucune
        const transaction = await db.sequelize.transaction();

        try {

            // Pour rajouter le genre à la track, il suffit de rajouter dans le body GenreId: value
            const track = await db.Track.create(trackToAdd);
            // console.log("Track To Add : ", trackToAdd);

            // #region Explication fonctions add autogénérées par Sequelize
             // Sequelize, à partir des relations qu'on lui a renseignées et des models qu'on lui a fourni nous a créée 3 méthodes
            // Album.addTrack()
            // Artist.addTrack()
            // Track.addAlbum()
            // Track.addArtist()
            // #endregion

            // TODO ajouter liens albums
            await track.addAlbum(trackToAdd.albums, { transaction });

            // #region Explication du ".albums "
            // ↑ la propriété ".albums" correspond à la propriété dans insomnia (voir track -> create -> json)
            // {
            //     "title":  "Yes yes",
            //     "duration": 145,
            //     "GenreId": 1,
            //     "albums": [3]
            // }
            // #endregion

            // TODO ajouter liens artists
            // Pour chacun des artists reçus
            for (const artist of trackToAdd.artists) {
                await track.addArtists(artist.id, { through : { feat : artist.feat } }, transaction);
            }
            
            // Validation des modifications en DB
            await transaction.commit();
            
            
            // Récupérer en db la track avec artists et albums
            const addedTrack = await db.Track.findByPk(track.id, {
                include: [ Genre, Album, Artist ]
            })
            // console.log("ADDED TRACK : ", addedTrack);


            // return track ? new TrackDTO(track) : null;
            return addedTrack ? new TrackDTO(addedTrack) : null;
        }

        catch (err) {
            // Retrour à l'état initial
            await transaction.rollback();
            return null;
        }
    },

    update : async (id, trackToUpdate) => {
        const updatedRow = await db.Track.update(trackToUpdate, {
            where : { id }
        });
        return updatedRow[0] === 1;
    },

    delete : async (id) => {
        const nbDeleteRow = await db.Track.destroy({
            where : { id }
        });
        return nbDeleteRow === 1;
    },


    like : async (trackId, userId) => {
        const transaction = await db.sequelize.transaction();

        try {
            const track = await db.Track.findByPk(trackId);
            const user = await db.User.findByPk(userId);

            const like = await track.addUser(user, { transaction });
            // ↕ OU BIEN ...
            // const like = await user.addTrack(track, { transaction });

            await transaction.commit();

            return like;
        }
        catch (err) {
            await transaction.rollback();
            return null;        
        }
    },


    dislike : async (trackId, userId) => {
        
        const transaction = await db.sequelize.transaction();

        try {
            const track = await db.Track.findByPk(trackId);
            const user = await db.User.findByPk(userId);

            const link = await user.hasTrack(track);
            // const link = await track.hasUser(user);
            console.log(link);
            if (!link) {
                await transaction.commit();
                return null;
            }

            const nbRows = await user.removeTrack(track,  { transaction });
            // const something = await user.removeTrack(track,  { transaction });
            // console. log(something);
            // await track.removeUser(user,  { transaction });

            await transaction.commit();

            return nbRows === 1;
        }
        catch (err) {
            await transaction.rollback();
            return null; 
        }

    },

    // ---------------------------------------------------------------------
    getByLike : async (userId) => {
        const transaction = await db.sequelize.transaction();

        try {
            const user = await db.User.findByPk(userId);
            const tracks = await user.getTracks();
            
            const tracksId = tracks.map(track => track.id );
            // console.log('trackdId : ', tracksId);

        
            const { rows, count } = await db.Track.findAndCountAll({
                where: {
                    id: tracksId
                },
                distinct : true,
                include : [ Genre, Album, Artist ]
            });
            
            // console.log('rows : ', rows);
         
            
            await transaction.commit();

            return {
                likedTracks : rows.map(likedTrack => new TrackDTO(likedTrack)),
                count
            }
    
        }
        catch (err) {
            await transaction.rollback();
            return null; 
        }

    }
    // ---------------------------------------------------------------------
    
}

module.exports = trackService;