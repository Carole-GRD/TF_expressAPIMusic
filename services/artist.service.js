const { ArtistDTO } = require('../dto/artist.dto');
const db = require('../models');

const artistService = {
    getAll: async () => {
        const { rows, count } = await db.Artist.findAndCountAll({
            distinct: true
        });
        return {
            artists : rows.map(artist => new ArtistDTO(artist)),
            count
        }
    },

    getById: async (id) => {
        const artist = await db.Artist.findByPk(id);
        return artist ? new ArtistDTO(artist) : null;
    },

    create: async (artistToAdd) => {
        const artist = await db.Artist.create(artistToAdd);
        return artist ? new ArtistDTO(artist) : null;
    },

    update: async (id, artistToUpdate) => {
        const updatedRow = await db.Artist.update(artistToUpdate, {
            where : { id }
        });
        return updatedRow[0] === 1;
    },

    delete: async (id) => {
        const nbDeleteRow = await db.Artist.destroy({
            where : { id }
        });
        return nbDeleteRow === 1;
    }
}

module.exports = artistService;