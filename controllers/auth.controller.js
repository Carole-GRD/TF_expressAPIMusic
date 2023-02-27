const { Request, Response } = require('express');
const authService = require('../services/auth.service');
const { ErrorResponse } = require('../utils/error.response');
const { SuccessResponse } = require('../utils/success.response');


const authController = {
    
    /**
     * Register
     * @param { Request } req
     * @param { Response } res
     */
    register : async (req, res) => {
        // On récupère le user à ajouter dans le body
        const data = req.body;

        const user = await authService.register(data);
        if (!user) {
            res.sendStatus(400);   // Bad Request : Les données ne sont pas bonnes
            return;
        }
        res.status(201).json(new SuccessResponse(user, 201))
    },

    /**
     * Login
     * @param { Request } req
     * @param { Response } res
     */
    login : async (req, res) => {
        // on récupère du body, les deux infos qui nous intéressent
        const { email, password } = req.body;

        // Appel du service
        const user = await authService.login(email, password);

        // Si pas de user -> erreur de login
        if (!user) {
            res.status(400).json(new ErrorResponse('Bad credentials'));    
            // Bad Request : plus spécifiquement un bad credential pour indiquer que les données de connection ne sont pas bonnes
            return;
        }

        res.status(200).json(new SuccessResponse(user));
    }

}

module.exports = authController;