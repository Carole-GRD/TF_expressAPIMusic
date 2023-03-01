const { Request, Response } = require('express');
const trackService = require('../services/track.service')
const { SuccessArrayResponse, SuccessResponse } = require('../utils/success.response');

const trackController = {

    // Doc qui premet d'accéder aux différentes propriétés des méthodes
    /** 
     * Get ALL
     * @param { Request } req
     * @param { Response } res
     */
    getAll : async (req, res) => {
        // res.sendStatus(501);   // 501 : Not Implemented (La route existe mais ne renvoie pas encore de résultat, elle est en cours de construction)
        
        const { offset, limit } = req.pagination;

        const { tracks, count } = await trackService.getAll(offset, limit);
        res.status(200).json(new SuccessArrayResponse(tracks, count));
    },

    /** 
     * Get By Id
     * @param { Request } req
     * @param { Response } res
     */
    getById : async (req, res) => {
        // res.sendStatus(501);

        const { id } = req.params;
        const track = await trackService.getById(id);
        if (!track) {
            res.sendStatus(404);
            return;
        }
        res.status(200).json(new SuccessResponse(track));
    },

    /** 
     * Create
     * @param { Request } req
     * @param { Response } res
     */
    create : async (req, res) => {
        // res.sendStatus(501);

        const data = req.body;
        const track = await trackService.create(data);
        res.location('/track/' + track.id);
        res.status(201).json(new SuccessResponse(track, 201));
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

        const isUpdated = await trackService.update(id, data);

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
        const isDeleted = await trackService.delete(id);

        if (!isDeleted) {
            res.sendStatus(404);
            return;
        }
        res.sendStatus(204);
    },

    /** 
     * Like a Track
     * @param { Request } req
     * @param { Response } res
     */
    like : async (req, res) => {
        res.sendStatus(501);
    }
}

module.exports = trackController;