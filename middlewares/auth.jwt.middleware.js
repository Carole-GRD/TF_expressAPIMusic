
const  { Request, Response, NextFunction } = require('express');
const { ErrorResponse } = require('../utils/error.response');
const jwt = require('../utils/jwt.utils');

const authJwt = () => {
    /**
     * Middleware authJwt
     * @param { Request } req
     * @param { Response } res
     * @param { NextFunction } next
     */
    return async (req, res, next) => {
        // Le token se trouvera normalement dans les headers de la requête, dans une propriété appelée 'authorization', et composée comme telle :
            // 'authorization' : 'Bearer monsupertokentrestreslong'
        
            // etape 1 : Récupérer la valeur dans autorization
            const bearerToken = req.headers.authorization;
            // console.log(req.headers);
            // console.log(bearerToken);
            // etpae 2 : Découper ce qu'on vient de récupérer pour n'obtenir que le token
            const token = bearerToken.split(' ')[1];

            // Si pas de token -> l'utilisateur n'est pas connecté
            // On lui renvoie une erreur Unauthorized 401
            if (!token || token === '') {
                res.status(401).json(new ErrorResponse('No Token', 401));
            }
            
            // on essaie de décoder le token
            const payload = await jwt.decode(token);

            // TODO : Vérifier role

            req.user = payload;

            next();
    }
}

module.exports = authJwt;