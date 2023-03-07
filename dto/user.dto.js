
// Attention, onne veut jamais transmttre le password, il ne sera donc pas present
class UserDTO {
    constructor( { id, firstname, lastname, email, role, avatar } ) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.role = role;
        this.avatar = avatar;
    }
}

// Si vous avez une gestion d'ajout de contacts à faire, souvent, on fait un dto en omettant les infos un peu perso (email, adresse, etc ) et on ne rend dispo que les infos permettant de trouver le contact/savoir qui c'est (avatar, id, pseudo, prénom, nom...)

module.exports = { UserDTO };