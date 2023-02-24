const { TrackDTO } = require('../dto/track.dto');
const db = require('../models');

const trackService = {
    getAll : async () => {
        // const tracks = await db.Track.findAll();
        // return tracks.map(track => new TrackDTO(track));

        const { rows, count } = await db.Track.findAndCountAll({
            distinct :true,
            // TODO rajout genre
            // TODO rajout albums
            // TODO rajout artists
        });
        return {
            tracks : rows.map(track => new TrackDTO(track)),
            count
        }
    },

    getById : async (id) => {
        const track = await db.Track.findByPk(id, {
            // TODO rajout genre
            // TODO rajout albums
            // TODO rajout artists
        });
        return track ? new TrackDTO(track) : null;
    },

    create : async (trackToAdd) => {
        // TODO créer une transaction pour pouvoir faire plusieurs actions db et rollback si problème

        const track = await db.Track.create(trackToAdd);
        // TODO ajouter liens artists
        // TODO ajouter liens albums

        // Récupérer en db la track avec artists et albums

        return track ? new TrackDTO(track) : null;
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