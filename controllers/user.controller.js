const { Request, Response } = require('express');
const userService = require('../services/user.service');
const { SuccessArrayResponse, SuccessResponse } = require('../utils/success.response');
// ---------------------------------------------------
// A SUPPRIMER -> VOIR AUTHENTICATION
// -------------------------------
const argon2 = require('argon2');
const { ErrorResponse } = require('../utils/error.response');
// ---------------------------------------------------

const userController = {
    /**
     * Get All
     * @param { Request } req 
     * @param { Response } res 
     */
    getAll : async (req, res) => {
        // res.sendStatus(501)

        // const { users, count } = await userService.getAll();
        // res.status(200).json(new SuccessArrayResponse(users, count));

        const { offset, limit } = req.pagination;

        const { users, count } = await userService.getAll(offset, limit);
        res.status(200).json(new SuccessArrayResponse(users, count));
        
    },

    /**
     * Get By Id
     * @param { Request } req 
     * @param { Response } res 
     */
    getById : async (req, res) => {
        const { id } = req.params;

        // Vérification sur les autorisations de l'utilisateur
        // Le role Admin -> On va le chercher dans le token : req.user.role
        // Les id -> dans le token : req.user.id
        const connectedUserRole = req.user.role;
        const connectedUserId = req.user.id;

        if (connectedUserRole !== 'Admin' && connectedUserId !== parseInt(id)) {
            res.status(403).json(new ErrorResponse('Accès interdit, vous n\'êtes ni Admin, ni l\'utilisateur lié au profil',403));
            return;
        }

        const user = await userService.getById(id);
        if (!user) {
            res.sendStatus(404);
            return;
        }
        res.status(200).json(new SuccessResponse(user));
    },

    /**
     * Udate
     * @param { Request } req
     * @param { Response } res
     */
    update : async (req, res) => {
        const { id } = req.params;
        const data = req.body;
        const isUpdated = await userService.update(id, data);
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
        const { id } = req.params;
        const isDeleted = await userService.delete(id);
        if (!isDeleted) {
            res.sendStatus(404);
            return;
        }
        res.sendStatus(204);
    }
}

module.exports = userController;