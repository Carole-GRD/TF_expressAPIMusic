const { Request, Response } = require('express');
const db = require('../models');
const trackService = require('../services/track.service');
const { ErrorResponse } = require('../utils/error.response');
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
        // res.sendStatus(501);

        // const trackId = parseInt(req.params.id);   //  -> parseInt() pas indispensable
        const trackId = req.params.id;     
        // ↑ const { id } = req.params;  -> moins performant si req.params est un grand objet (avec beaucoup de données)

        const userId = req.user.id;
        // ↑ const { id } = req.user; 
        console.log('trackId', trackId);
        console.log('userId', userId);

        const like = await trackService.like(trackId, userId);

        if (!like) {
            res.status(404).json(new ErrorResponse('TrackId or UserId not found', 404));
            return;
        }

        // Ajout du lien vers la track qui vient d'être likée dans la response
        res.location('/track/' + trackId);  

        res.status(201).json(new SuccessResponse({ msg : 'Like success' }, 201));
        
    },

    dislike : async (req,res) => {
        // res.sendStatus(501);

        const trackId = req.params.id;     
        const userId = req.user.id;
        const disLike = await trackService.dislike(trackId, userId);

        if (!disLike) {
            res.status(404).json(new ErrorResponse('TrackId or UserId not found or link is not present', 404));
            return;
        }

        res.status(204).json(new SuccessResponse({ msg : 'Dislike success' }, 204));
    },

    // ---------------------------------------------------------------------
    // getByLike : async (req, res) => {
    //     const userId = req.user.id;
    //     console.log('User id : ', userId);
    //     res.sendStatus(501);
    //     const tracks = await trackService.getByLike(userId);
    //     // console.log(tracks);
    //     res.status(200).json(tracks);
    //     // res.status(200).json(new SuccessArrayResponse(tracks, count));
    // }
    // ---------------------------------------------------------------------


}

module.exports = trackController;