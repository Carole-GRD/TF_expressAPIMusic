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
            include : [ Genre, Album ]
            // TODO rajout artists
        });

        console.log(rows);

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
            include : [ Genre, Album ]
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


            // #region Explication fonctions add autogénérées par Sequelize
            // Sequelize, à partir des relations qu'on lui a renseignées et des models qu'on lui a fourni nous a créée 3 méthodes
            // Album.addTrack()
            // Artist.addTrack()
            // Track.addAlbum()
            // Track.addArtist()
            // #endregion

            // TODO ajouter liens artists

            
            // Validation des modifications en DB
            await transaction.commit();
            
            
            // Récupérer en db la track avec artists et albums
            const addedTrack = await db.Track.findByPk(track.id, {
                include: [ Genre, Album ]
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
    }
}

module.exports = trackService;