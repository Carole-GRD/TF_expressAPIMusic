

class TrackDTO {
    constructor({ id, title, duration}){
        this.id = id;
        this.title = title;
        this.duration = duration;
        // TODO rajouter le genre
        // TODO rajouter la liste des artistes
        // TODO rajouter la liste des albums  
    }
}

module.exports = { TrackDTO };