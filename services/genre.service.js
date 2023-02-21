const { GenreDTO } = require('../dto/genre.dto');
const db = require('../models');

const genreService = {
    getAll : async () => {
        // Récupération des genres, tels qu'ils sont en db
        // const genres = await db.Genre.findAll();
        // Avec la méthode findAndCountAll, on obtiendraun object avec les lignes (rows) et le count (toutes les lignes de la table)
        const { rows, count } = await db.Genre.findAndCountAll({
            distinct: true,
        });

        // Transformation en GenreDTO
        // return genres.map(genre => new GenreDTO(genre.id, genre.name));
        // return genres.map(genre => new GenreDTO(genre));
        return {
            genres : rows.map(genre => new GenreDTO(genre)),
            count
        }
    },

    getById : async (id) => {
        // const genre = await db.Genre.findOne({ name : 'Pop' });
        // const genre = await db.Genre.findOne({ id : id });
        // const genre = await db.Genre.findOne({ id });  // Recherche via un WHERE
        const genre = await db.Genre.findByPk(id);   // Recherche directement sur la primary key

        return genre ? new GenreDTO(genre) : null;   
        // Si le genre n'est pas undefined,on renvoie le DTO, sinon, on envoie null
    },

    create : async (genreToAdd) => {
        const genre = await db.Genre.create(genreToAdd);
        return genre ? new GenreDTO(genre) : null;   
    },

    update : async (id, genreToUpdate) => {
        const updatedRow = await db.Genre.update(genreToUpdate, {
            where : { id }
        });
        // updatedRow est un tableau qui contient :
        // - dans la première case, le ligne de nombres affectées
        // - dans la deuxième case, les lignes affectées
        return updatedRow[0] === 1; // Est-ce nb row affectées = 1 ? si oui update réussi (return true), si non update raté (return false)
    },

    delete :async (id) => {
        const nbDeleteRow = await db.Genre.destroy({
            where : { id }
        });
        return nbDeleteRow === 1;  // Est-ce nb row supprimées = 1 ? si oui delete réussi (return true), si non delete raté (return false)
    }
}

module.exports = genreService;