
const  { Request, Response, NextFunction } = require('express');
const userService = require('../services/user.service');
const { ErrorResponse } = require('../utils/error.response');
const jwt = require('../utils/jwt.utils');

// roles, contiendra un tableau avec les différents roles autorisés (ou ne sera pas existant si pas de role précisé et juste besoin d'être connecté)
const authJwt = (roles) => {
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
            // const token = bearerToken.split(' ')[1];
            // console.log(bearerToken);
            const token = bearerToken?.split(' ')[1];
            // console.log(token);

            // Si pas de token -> l'utilisateur n'est pas connecté
            // On lui renvoie une erreur Unauthorized 401
            if (!token || token === '' || token === 'undefined') {
                res.status(401).json(new ErrorResponse('Non autorisé : Vous devez être connecté', 401));
            }
            
            // on essaie de décoder le token
            const payload = await jwt.decode(token);

            
            // Si on a reçu un tableau de roles, on doit vérifier le role de l'utilisateur connecté pour voir s'il est présent dans le tableau
            if (roles) {
                // #region Explication pourquoi recherhe en db plutôt que sur payload.id
                // Nous avons accès dans payload.role, au rôle de l'utilisateur au moment où le token a été crée
                // Si la personne était admin à ce moment-là, mais qu'on lui a retiré ce droit en db entre temps, elle aura accès à la requête alors qu'elle n'est pas sensée y avoir accès
                // On fera donc toujours une vérif en db, plutôt que sur le payload
                // #endregion

                // Comme on accès à l'id via payload.id, on peut faire une requête en db pour récupérer l'utilisateru
                const connectedUser = await userService.getById(payload.id);
                // Est-ce que le rôle de connectedUser est present dans le tableau de rôles reçu en paramètre
                // tableau roles inclut le role user ?
                roles = roles.map(r => r.toLowerCase());  // On transforme le tableau de role reçu en paramètre tout en minuscule comme cela on pourra comparer au role connectedUser converti en minuscule aussi (plus de souci de casse)
                const canAcces = roles.includes(connectedUser.role.toLowerCase());

                if (!canAcces) {
                    res.status(403).json(new ErrorResponse('Acces Interdit', 403));
                    return;
                }

            }

            req.user = payload;

            next();
    }
}

module.exports = authJwt;