const { AlbumDTO } = require('../dto/album.dto');
const db = require('../models');

const albumService = {
    getAll : async (offset, limit) => {
        // const tracks = await db.Track.findAll();
        // return tracks.map(track => new TrackDTO(track));

        const { rows, count } = await db.Album.findAndCountAll({
            distinct: true,
            offset,  
            limit
        });
        return {
            albums : rows.map(album => new AlbumDTO(album)),
            count
        }
    },

    getById : async (id) => {
        const album = await db.Album.findByPk(id);
        return album ? new AlbumDTO(album) : null;
    },

    create : async (albumToAdd) => {
        const track = await db.Album.create(albumToAdd);
        return track ? new AlbumDTO(track) : null;
    },

    update : async (id, albumToUpdate) => {
        const updatedRow = await db.Album.update(albumToUpdate, {
            where : { id }
        });
        return updatedRow[0] === 1;
    },

    delete : async (id) => {
        const nbDeleteRow = await db.Album.destroy({
            where : { id }
        });
        return nbDeleteRow === 1;
    }
}

module.exports = albumService;