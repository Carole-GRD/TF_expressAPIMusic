
// Deux façons de faire : 
// - Un service User + un sevrvice Auth (Authentication)
// - Un seul service UserService et deux UserController et AuthController ????


const { UserDTO } = require('../dto/user.dto');
const db = require('../models');

const argon2 = require('argon2');

const authService ={
    
    register : async (userToAdd) => {
        // Hashage du password
        const hashPwd = await argon2.hash(userToAdd.password);

        // Remplacement du password sur le userToAdd
        userToAdd.password = hashPwd;

        // Ajout en db
        const user = await db.User.create(userToAdd);

        // Renvoie du user si crée ou null
        return user ? new UserDTO(user) : null;
    },

    login : async (email, password) => {
        // Récupérer l'utilisateur qui possède cet email
        const user = await db.User.findOne({
            where: { email }
        });
        console.log(user);

        // Si pas d'utilisateur -> return null
        if (!user) {
            return null;
        }

        // Si utilisateur :
        //  Vérifier que le password entré = password hashé
        const isValid = await argon2.verify(user.password, password); //on compare le password en db (hashé) au password entré pour se connecter (en clair), si les deux concordent, argon2.verify renvoie true, sinon false
        console.log(isValid);
        // Si verif pas ok -> return null
        if (!isValid) {
            return null;
        }
        // Si verif ok ->renvoie le user
        return new UserDTO(user);
    }

}

module.exports = authService;