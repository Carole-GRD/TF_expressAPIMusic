const { AlbumDTO } = require("./album.dto");

class TrackDTO {
    constructor({ id, title, duration, Genre, Albums }){
        this.id = id;
        this.title = title;
        this.duration = duration;

        // TODO rajouter le genre
        this.genre = Genre;

        // TODO rajouter la liste des albums  
        // this.albums = Albums  
        // ↑ Albums sera un tableau qui contiendra toutesles infos possibles en db sur albums
        this.albums = Albums.map(album => new AlbumDTO(album));
        // ↑ albums sera un tableau qui ne contiendra que les infos prévues par notre AlbumDTO
        
        // TODO rajouter la liste des artistes
    }
}

module.exports = { TrackDTO };