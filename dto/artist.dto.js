
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing

// https://dev.to/this-is-angular/nullish-coalescing-support-in-angular-template-48h6


// ?? vérifie si la valeur est undefined ou null

class ArtistDTO {
    constructor({ id, firstname, lastname, birthdate, deathdate }){
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname ?? null;   // Coalesce  (ternaire raccourcie)
        this.birthdate = birthdate ?? null;
        this.deathdate = deathdate ?? null;
    }
}

class ArtistTrackDTO {
    constructor({ id, firstname, lastname, MM_Artist_Track }){
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname ?? null;   // Coalesce  (ternaire raccourcie)
        this.feat = MM_Artist_Track ? MM_Artist_Track.feat : null;
    }
}

module.exports = { ArtistDTO, ArtistTrackDTO };