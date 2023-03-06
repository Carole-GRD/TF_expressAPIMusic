const { Request, Response } = require('express');
const db = require('../models');
const albumService = require('../services/album.service');
const { ErrorResponse } = require('../utils/error.response');
const { SuccessArrayResponse, SuccessResponse } = require('../utils/success.response');

const albumController = {

    // Doc qui premet d'accéder aux différentes propriétés des méthodes
    /** 
     * Get ALL
     * @param { Request } req
     * @param { Response } res
     */
    getAll : async (req, res) => {
        // res.sendStatus(501);   // 501 : Not Implemented (La route existe mais ne renvoie pas encore de résultat, elle est en cours de construction)
        
        const { offset, limit } = req.pagination;
        
        const { albums, count } = await albumService.getAll(offset, limit);
        res.status(200).json(new SuccessArrayResponse(albums, count));
    },

    /** 
     * Get By Id
     * @param { Request } req
     * @param { Response } res
     */
    getById : async (req, res) => {
        // res.sendStatus(501);
        const { id } = req.params;
        const album = await albumService.getById(id);
        if (!album) {
            res.sendStatus(404);
            return;
        }
        res.status(200).json(new SuccessResponse(album));
    },

    /** 
     * Create
     * @param { Request } req
     * @param { Response } res
     */
    create : async (req, res) => {
        // res.sendStatus(501);
        const data = req.body;
        const album = await albumService.create(data);
        res.location('/album/' + album.id);
        res.status(201).json(new SuccessResponse(album, 201));
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

        const isUpdated = await albumService.update(id, data);

        if (!isUpdated) {
            res.sendStatus(404);
            return;
        }

        res.location = '/album/' + id;
        res.sendStatus(204);
    },

    /** 
     * UpdateCover
     * @param { Request } req
     * @param { Response } res
     */
    updateCover : async (req, res) => {
        // res.sendStatus(501);
        const { id } = req.params;

        // console.log(req.body);  // Si on avait d'autres choses à modifier en plus de la cover -> body
        console.log('controller file : ', req.file);  
        // Dans file, nous avons toutes les données du fichier, avec son ancien nom (originalname) et le nouveau nom (filename)
        const filename = req.file.filename;

        const isUpdated = await albumService.updateCover(id, filename);

        if (!isUpdated) {
            res.status(404).json(new ErrorResponse('Album not found', 404));
            return;
        }

        res.location = '/album/' + id;
        res.status(204).json( new SuccessResponse({ msg : 'Cover modifée avec succès'}, 204));
        // res.sendStatus(501);
    },

    /** 
     * Delete
     * @param { Request } req
     * @param { Response } res
     */
    delete : async (req, res) => {
        // res.sendStatus(501);
        const { id } = req.params;
        const isDeleted = await albumService.delete(id);

        if (!isDeleted) {
            res.sendStatus(404);
            return;
        }
        res.sendStatus(204);
    }
}

module.exports = albumController;