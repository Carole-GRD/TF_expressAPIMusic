const { Request, Response } = require('express');
const genreService = require('../services/genre.service');

const genreController = {

    // Doc qui premet d'accéder aux différentes propriétés des méthodes
    /** 
     * Get ALL
     * @param { Request } req
     * @param { Response } res
     */
    getAll :async (req, res) => {
        // res.sendStatus(501);   // 501 : Not Implemented (La route existe mais ne renvoie pas encore de résultat, elle est en cours de construction)

        // Récupération des genres, format DTO (grâce au service)
        const genres = await genreService.getAll();
        res.status(200).json(genres);
    },

    /** 
     * Get By Id
     * @param { Request } req
     * @param { Response } res
     */
    getById : async (req, res) => {
        // res.sendStatus(501);

        // Récupération de l'id dans la requête
        const { id } = req.params;
        const genre = await genreService.getById(id);
        
        // Vérifier si genre est null
        if (!genre) {
            res.sendStatus(404);
            return;
        }
        // Si on a bien récupérer un genre
        res.status(200).json(genre);

    },

    /** 
     * Create
     * @param { Request } req
     * @param { Response } res
     */
    create : async (req, res) => {
        // res.sendStatus(501);

        // Récupération des données qu'on veut créer
        const data = req.body;
        console.log(req.body);
        // TODO -> Mettre en place un middleware qui valide ces données

        const genre = await genreService.create(data);

        // Onva allermodifier la response, pour ajouter le lien vers la requête sur le genre qui vient d'être crée (getById)
        res.location('/genre/' + genre.id)

        // 201 - Created
        res.status(201).json(genre);
    },

    /** 
     * Update
     * @param { Request } req
     * @param { Response } res
     */
    update : async (req, res) => {
        // res.sendStatus(501);

        // Récupération de l'id
        const { id } = req.params;

        // Récupération du body
        const data = req.body;

        const isUpdated = await genreService.update(id, data);

        // Si l'ipdate n'a pas eu lieu, id non trouvé
        if (!isUpdated) {
            res.sendStatus(404);
            return;
        }
        // 204 - No Content (Ok tout s'est bien passé et onn'a pas de contenu à renvoyer)
        res.sendStatus(204);
    },

    /** 
     * Delete
     * @param { Request } req
     * @param { Response } res
     */
    delete : async (req, res) => {
        // res.sendStatus(501);

        const { id } = req.params;
        const isDeleted = await genreService.delete(id);

        if (!isDeleted) {
            res.sendStatus(404);
            return;
        }
        res.sendStatus(204);
    }
}

module.exports = genreController;