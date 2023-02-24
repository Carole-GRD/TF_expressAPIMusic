
class AlbumDTO {
    constructor({ id, title, cover}){
        this.id = id;
        this.title = title;
        this.cover = cover ?? null;  // Coalesce
        // TODO rajouter la liste de toutes les tracks présentes sur l'album
    }
}

module.exports = { AlbumDTO };