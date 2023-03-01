
// Import de jsonwebtoken pour pouvoir utiliser la librairie et les méthodes associées
const jsonwebtoken = require('jsonwebtoken');

const jwt = {
    // Génération d'un token à partir des infos du user, d'options et d'un secret
    // fonction généralement appelée generate ou encode
    generate : ({id, role}) => {

        // La génération du token pouvant potentiellement échouer, on va renvoyer une promesse lors de la génération pour gérer les erreurs
        return new Promise((resolve, reject) => {

            // #region Explication payload, secret, headers (options)
            // La méthode sign() de jsonwebtoken, nous permet de créer un token à partir de plusioeurs informations
            // sign(payload, secret, options/headers)
            // payload : les informations qui proviennent de l'utilisateur qu'on veut aller stocker dans notre token
            // secret : une chaine de caractères qui va servir pour le hash, souvent généré aléatoirement, c'est l'API qui détient ce secret pour encoder et décoder le token et cette information ne doit JAMAIS apparaitre en clair dans le code (on utilisera les variables d'environnement, ET ON N'OUBLIE PAS LE GITIGNORE)
            // options/headers : les deux noms sont souvent rencontrés, contiendra toutes les options qu'on fournir pour créer le token, nous allons utiliser :
                // algorithm : méthode de hash  
                // expiresIn : durée de vie du token
                // issuer : MusicAPI -> de qui provient le token (notre application API)
                // audience :  -> à qui est destiné le token (la ou les appli qui vont l'utiliser), peut être une chaine (si appli) : "AngularSpotify", un tableau (si plein d'appli) : ["AngularSpotify", "ILoveMusic"]
            // #endregion
            
            const { JWT_SECRET, JWT_ISSUER, JWT_AUDIENCE } = process.env;

            const payload = { id, role };
    
            const secret = JWT_SECRET;
    
            const options = {
                algorithm : 'HS512',  // 'HS256', 'HS384', 'HS512' (default HS512)
                expressIn : '365d',   // https://github.com/vercel/ms
                issuer : JWT_ISSUER,
                audience : JWT_AUDIENCE
            };
            
            // En plus du payload, secret, options, on aura en 4e paramètre, un callback avec gestion d'erreur ou token si pas d'erreur
            jsonwebtoken.sign(payload, secret, options, (error, token) => {

                if (error) {
                    reject(error);
                }
                
                resolve(token);
            });

        });

    },

    // Renvoie des infos du user (payload), à partir d'un token (décodé), d'options et d'un secret
    decode : (token) => {
        const user = {};
        return user;
    }
}

module.exports = jwt;