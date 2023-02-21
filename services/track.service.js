const { TrackDTO } = require('../dto/track.dto');
const db = require('../models');

const trackService = {
    getAll : async () => {
        // const tracks = await db.Track.findAll();
        // return tracks.map(track => new TrackDTO(track));

        const { rows, count } = await db.Track.findAndCountAll();
        return {
            tracks : rows.map(track => new TrackDTO(track)),
            count
        }
    },

    getById : async (id) => {
        const track = await db.Track.findByPk(id);
        return track ? new TrackDTO(track) : null;
    },

    create : async (trackToAdd) => {
        const track = await db.Track.create(trackToAdd);
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