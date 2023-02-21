

class ArtistDTO {
    constructor({ id, firstname, lastname, birthdate, deathdate }){
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.birthdate = birthdate;
        this.deathdate = deathdate;
    }
}

module.exports = { ArtistDTO };