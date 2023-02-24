const { Request, Response } = require('express');
const artistService = require('../services/artist.service');
const { SuccessArrayResponse, SuccessResponse } = require('../utils/success.response');


const artistController = {

    // Doc qui premet d'accéder aux différentes propriétés des méthodes
    /** 
     * Get ALL
     * @param { Request } req
     * @param { Response } res
     */
    getAll : async (req, res) => {
        // res.sendStatus(501);   // 501 : Not Implemented (La route existe mais ne renvoie pas encore de résultat, elle est en cours de construction)
        const { artists, count } = await artistService.getAll();
        res.status(200).json(new SuccessArrayResponse(artists, count));
    },

    /** 
     * Get By Id
     * @param { Request } req
     * @param { Response } res
     */
    getById : async (req, res) => {
        // res.sendStatus(501);
        const { id } = req.params;
        const artist = await artistService.getById(id);
        if (!artist) {
            res.sendStatus(404);
            return;
        }
        res.status(200).json(new SuccessResponse(artist));
    },

    /** 
     * Create
     * @param { Request } req
     * @param { Response } res
     */
    create : async (req, res) => {
        // res.sendStatus(501);
        const data = req.body;
        const artist = await artistService.create(data);
        res.location('/artist/' + artist.id);
        res.status(201).json(new SuccessResponse(artist, 201));
    },

    /** 
     * Update
     * @param { Request } req
     * @param { Response } res
     */
    update : async (req, res) => {
        // res.sendStatus(501);
        const { id } = req.params;
        const data = req.body;
        const isUpdated = await artistService.update(id, data);
        if (!isUpdated) {
            res.sendStatus(404);
            return;
        }
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
        const isDeleted = await artistService.delete(id);
        if (!isDeleted) {
            res.sendStatus(404);
            return;
        }
        res.sendStatus(204);
    }
}

module.exports = artistController;